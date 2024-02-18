import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SupplierService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createSupplierDto: Prisma.SupplierCreateInput) {
    return this.databaseService.supplier.create({
      data: createSupplierDto,
    });
  }

  async findAll() {
    return this.databaseService.supplier.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.supplier.findUnique({ where: { id } });
  }

  async update(id: number, updateSupplierDto: Prisma.SupplierUpdateInput) {
    return this.databaseService.supplier.update({
      where: {
        id,
      },
      data: updateSupplierDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.supplier.delete({ where: { id } });
  }
}
