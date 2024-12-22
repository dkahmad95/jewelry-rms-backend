import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateCustomerInvoiceDto,
  UpdateCustomerInvoiceDto,
} from '../dto/customerInvoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CustomerInvoiceEntity } from 'src/entities/customerInvoiceEntities/customerInvoice.entity';
import { CustomerInvoiceItemEntity } from 'src/entities/customerInvoiceEntities/customerInvoiceItem.entity';

@Injectable()
export class CustomerInvoiceService {
  constructor(
    @InjectRepository(CustomerInvoiceEntity)
    private customerInvoiceRepository: Repository<CustomerInvoiceEntity>,
    @InjectRepository(CustomerInvoiceItemEntity)
    private customerInvoiceItemRepository: Repository<CustomerInvoiceItemEntity>,
  ) {}

  // GET ALL CUSTOMER INVOICES
  async findAll() {
    try {
      const allCustomerInvoices: CustomerInvoiceEntity[] =
        await this.customerInvoiceRepository.find({ relations: ['items'] });
      return allCustomerInvoices;
    } catch (e) {
      throw new Error(`Failed to fetch CustomerInvoices: ${e.message}`);
    }
  }

  // GET ONE CustomerInvoice BY ID
  async findOne(CustomerInvoiceId: number): Promise<CustomerInvoiceEntity> {
    try {
      const customerInvoice: CustomerInvoiceEntity =
        await this.customerInvoiceRepository.findOne({
          where: {
            id: CustomerInvoiceId,
          },
          relations: ['items'],
        });
      if (!customerInvoice) {
        throw new HttpException(
          `CustomerInvoice with ID ${CustomerInvoiceId} not found.`,
          HttpStatus.NOT_FOUND,
        );
      }
      return customerInvoice;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // CREATE CustomerInvoice
  async createCustomerInvoice(
    customerInvoice: CreateCustomerInvoiceDto,
  ): Promise<CustomerInvoiceEntity> {
    try {
      // Calculate the total amount for each item and the overall total
      let totalAmount = 0;

      const items = customerInvoice.items.map((item) => {
        const itemTotal = item.weight * item.unitPrice;
        totalAmount += itemTotal;
        return this.customerInvoiceItemRepository.create({
          ...item,
          unitPrice: item.unitPrice,
          weight: item.weight,
          itemTotal: parseFloat(itemTotal.toFixed(2)),
        });
      });

      totalAmount = parseFloat(totalAmount.toFixed(2));

      // Create the customer invoice entity
      const invoice = this.customerInvoiceRepository.create({
        name: customerInvoice.name,
        phoneNumber: customerInvoice.phoneNumber,
        items,
        totalAmount,
      });

      return this.customerInvoiceRepository.save(invoice);
    } catch (e) {
      throw new HttpException(
        'Error creating customerInvoice',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // UPDATE customerInvoice
  async updateCustomerInvoice(
    customerInvoiceId: number,
    updatedCustomerInvoice: UpdateCustomerInvoiceDto,
  ): Promise<CustomerInvoiceEntity> {
    try {
      const updateResult: UpdateResult =
        await this.customerInvoiceRepository.update(
          { id: customerInvoiceId },
          updatedCustomerInvoice,
        );

      if (updateResult.affected === 0) {
        throw new Error(`Invoice with ID ${customerInvoiceId} not found.`);
      }

      const updatedEntity: CustomerInvoiceEntity =
        await this.customerInvoiceRepository.findOne({
          where: {
            id: customerInvoiceId,
          },
        });
      return updatedEntity;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  // DELETE customerInvoice

  async deleteCustomerInvoice(customerInvoiceId: number): Promise<string> {
    try {
      const deleteResult: DeleteResult =
        await this.customerInvoiceRepository.delete(customerInvoiceId);

      if (deleteResult.affected === 0) {
        throw new HttpException(
          `Invoice with ID ${customerInvoiceId} not found.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return `Invoice with ID ${customerInvoiceId} has been deleted`;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
