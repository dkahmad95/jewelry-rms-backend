import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from '../dto/supplier.dto';
import { SupplierEntity } from '../../entites/supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(SupplierEntity)
    private supplierEntityRepository: Repository<SupplierEntity>,
  ) {}

  async createSupplier(supplier: CreateSupplierDto): Promise<SupplierEntity> {
    try {
      const supplierEntity = this.supplierEntityRepository.create(supplier);
      const res = await this.supplierEntityRepository.save(supplierEntity);
      return res;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
