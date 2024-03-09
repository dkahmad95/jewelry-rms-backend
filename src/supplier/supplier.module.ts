import { Module } from '@nestjs/common';
import { SupplierController } from './controllers/supplier.controller';
import { SupplierService } from './services/supplier.service';
import { SupplierEntity } from '../entites/supplier.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierTransactionController } from './controllers/supplier-transaction.controller';
import { SupplierTransactionService } from './services/supplier-transaction.service';
import { SupplierTransactionItemEntity } from '../entites/supplierTransactionItem.entity';
import { SupplierTransactionEntity } from '../entites/supplierTransaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SupplierEntity,
      SupplierTransactionItemEntity,
      SupplierTransactionEntity,
    ]),
  ],
  controllers: [SupplierController, SupplierTransactionController],
  providers: [SupplierService, SupplierTransactionService],
})
export class SupplierModule {}
