import { Injectable } from '@nestjs/common';
import { Prisma, Supplier } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SupplierService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createSupplierDto: Prisma.SupplierCreateInput) {
    return this.databaseService.supplier.create({
      data: createSupplierDto,
    });
  }

  async findAll(): Promise<Supplier[]> {
    return this.databaseService.supplier.findMany();
  }

  async findOne(id: number): Promise<Supplier> {
    return this.databaseService.supplier.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateSupplierDto: Prisma.SupplierUpdateInput,
  ): Promise<Supplier> {
    return this.databaseService.supplier.update({
      where: {
        id,
      },
      data: updateSupplierDto,
    });
  }

  async remove(id: number): Promise<Supplier> {
    return this.databaseService.supplier.delete({ where: { id } });
  }
}
