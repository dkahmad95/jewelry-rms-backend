import { Module } from '@nestjs/common';
import { SupplierModule } from './supplier/supplier.module';
import { SupplierTransModule } from './supplier-trans/supplier-trans.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './entities/supplierEntities/supplier.entity';
import { SupplierTransactionEntity } from './entities/supplierEntities/supplierTransaction.entity';
import { SupplierTransactionItemEntity } from './entities/supplierEntities/supplierTransactionItem.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { ExpensesModule } from './expenses/expenses.module';
import { ExpensesEntity } from './entities/expensesEntities/expenses.entity';

import * as dotenv from 'dotenv';
import { CustomerInvoiceModule } from './customerInvoice/customerInvoice.module';
import { CustomerInvoiceEntity } from './entities/customerInvoiceEntities/customerInvoice.entity';
import { CustomerInvoiceItemEntity } from './entities/customerInvoiceEntities/customerInvoiceItem.entity';

// Load environment variables from .env file
dotenv.config();

@Module({
  imports: [
    SupplierModule,
    SupplierTransModule,
    CustomerInvoiceModule,
    ExpensesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      ssl: process.env.DATABASE_SSL === 'true',
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        SupplierEntity,
        SupplierTransactionEntity,
        SupplierTransactionItemEntity,
        CustomerInvoiceEntity,
        CustomerInvoiceItemEntity,
        ExpensesEntity,
      ],
      synchronize: true,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
