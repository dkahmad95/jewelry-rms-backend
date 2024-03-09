import { Module } from '@nestjs/common';
import { SupplierTransController } from './supplier-trans.controller';

@Module({
  controllers: [SupplierTransController],
})
export class SupplierTransModule {}
