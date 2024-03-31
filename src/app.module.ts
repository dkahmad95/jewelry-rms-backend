import { Module } from '@nestjs/common';
import { SupplierModule } from './supplier/supplier.module';
import { SupplierTransModule } from './supplier-trans/supplier-trans.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './entites/supplier.entity';
import { SupplierTransactionEntity } from './entites/supplierTransaction.entity';
import { SupplierTransactionItemEntity } from './entites/supplierTransactionItem.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    SupplierModule,
    SupplierTransModule,
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
