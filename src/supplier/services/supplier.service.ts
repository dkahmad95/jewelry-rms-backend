import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSupplierDto, UpdateSupplierDto } from '../dto/supplier.dto';
import { SupplierEntity } from '../../entites/supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(SupplierEntity)
    private supplierEntityRepository: Repository<SupplierEntity>,
  ) {}
  // GET ALL SUPPLIERS
  async findAll() {
    try {
      const allSuppliers: SupplierEntity[] =
        await this.supplierEntityRepository.find();
      return allSuppliers;
    } catch (e) {
      throw new Error(`Failed to fetch suppliers: ${e.message}`);
    }
  }

  // GET ONE SUPPLIER BY ID
  async findOne(supplierId: number): Promise<SupplierEntity> {
    try {
      const supplier: SupplierEntity =
        await this.supplierEntityRepository.findOne({
          where: {
            id: supplierId,
          },
        });
      if (!supplier) {
        throw new HttpException(
          `Supplier with ID ${supplierId} not found.`,
          HttpStatus.NOT_FOUND,
        );
      }
      return supplier;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // CREATE SUPPLIER
  async createSupplier(supplier: CreateSupplierDto): Promise<SupplierEntity> {
    try {
      const supplierEntity: SupplierEntity =
        this.supplierEntityRepository.create(supplier);
      const res = await this.supplierEntityRepository.save(supplierEntity);
      return res;
    } catch (e) {
      throw new HttpException(
        'Error creating supplier',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // UPDATE SUPPLIER
  async updateSupplier(
    supplierId: number,
    updatedSupplier: UpdateSupplierDto,
  ): Promise<SupplierEntity> {
    try {
      const updateResult: UpdateResult =
        await this.supplierEntityRepository.update(
          { id: supplierId },
          updatedSupplier,
        );

      if (updateResult.affected === 0) {
        throw new Error(`Supplier with ID ${supplierId} not found.`);
      }

      const updatedEntity: SupplierEntity =
        await this.supplierEntityRepository.findOne({
          where: {
            id: supplierId,
          },
        });
      return updatedEntity;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  // DELETE SUPPLIER

  async deleteSupplier(supplierId: number): Promise<string> {
    try {
      const deleteResult: DeleteResult =
        await this.supplierEntityRepository.delete(supplierId);

      if (deleteResult.affected === 0) {
        throw new HttpException(
          `Supplier with ID ${supplierId} not found.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return `Supplier with ID ${supplierId} has been deleted`;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
