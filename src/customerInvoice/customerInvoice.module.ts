import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerInvoiceEntity } from 'src/entities/customerInvoiceEntities/customerInvoice.entity';
import { CustomerInvoiceItemEntity } from 'src/entities/customerInvoiceEntities/customerInvoiceItem.entity';
import { CustomerInvoiceController } from './controllers/customerInvoice.controller';
import { CustomerInvoiceService } from './services/customerInvoice.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerInvoiceEntity,
      CustomerInvoiceItemEntity,
    ]),
  ],
  controllers: [CustomerInvoiceController],
  providers: [CustomerInvoiceService],
})
export class CustomerInvoiceModule {}
