import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateCustomerInvoiceDto,
  UpdateCustomerInvoiceDto,
} from '../dto/customerInvoice.dto';
import { CustomerInvoiceService } from '../services/customerInvoice.service';
import { CustomerInvoiceEntity } from 'src/entities/customerInvoiceEntities/customerInvoice.entity';

@Controller('customerInvoice')
export class CustomerInvoiceController {
  constructor(private customerInvoiceService: CustomerInvoiceService) {}

  // GET ALL CustomerInvoices
  @Get()
  async findAll() {
    try {
      const data: CustomerInvoiceEntity[] =
        await this.customerInvoiceService.findAll();
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // GET CustomerInvoices BY ID
  @Get(':customerInvoiceId')
  async findOne(
    @Param('customerInvoiceId', ParseIntPipe) customerInvoiceId: number,
  ): Promise<CustomerInvoiceEntity> {
    try {
      const data: CustomerInvoiceEntity =
        await this.customerInvoiceService.findOne(customerInvoiceId);
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // CREATE CustomerInvoice
  @Post()
  async create(
    @Body() createCustomerInvoiceDto: CreateCustomerInvoiceDto,
  ): Promise<CustomerInvoiceEntity> {
    try {
      return await this.customerInvoiceService.createCustomerInvoice(
        createCustomerInvoiceDto,
      );
    } catch (e) {
      console.log(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // UPDATE customerInvoice
  @Patch(':customerInvoiceId')
  async update(
    @Param('customerInvoiceId', ParseIntPipe) customerInvoiceId: number,
    @Body() updateCustomerInvoiceDto: UpdateCustomerInvoiceDto,
  ): Promise<CustomerInvoiceEntity> {
    try {
      return await this.customerInvoiceService.updateCustomerInvoice(
        customerInvoiceId,
        updateCustomerInvoiceDto,
      );
    } catch (e) {
      console.log(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':customerInvoiceId')
  async delete(
    @Param('customerInvoiceId', ParseIntPipe) customerInvoiceId: number,
  ): Promise<string> {
    try {
      return await this.customerInvoiceService.deleteCustomerInvoice(
        customerInvoiceId,
      );
    } catch (e) {
      console.log(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
