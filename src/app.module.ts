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

@Module({
  imports: [
    SupplierModule,
    SupplierTransModule,
    ExpensesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-old-flower-a37zmel0-pooler.il-central-1.aws.neon.tech',
      port: 5432,
      ssl: true,
      username: 'dkahmad95',
      password: 'seVbD30qdzZu',
      database: 'jewelry-rms-db',
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
