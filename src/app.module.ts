import { Module } from '@nestjs/common';
import { SupplierModule } from './supplier/supplier.module';
import { SupplierTransModule } from './supplier-trans/supplier-trans.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './entites/supplierEntities/supplier.entity';
import { SupplierTransactionEntity } from './entites/supplierEntities/supplierTransaction.entity';
import { SupplierTransactionItemEntity } from './entites/supplierEntities/supplierTransactionItem.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { ExpensesModule } from './expenses/expenses.module';
import { ExpensesEntity } from './entites/expensesEntities/expenses.entity';

import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

@Module({
  imports: [
    SupplierModule,
    SupplierTransModule,
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
