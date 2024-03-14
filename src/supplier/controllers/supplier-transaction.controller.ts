import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateSupplierTransactionDto } from '../dto/supplier.dto';
import { SupplierTransactionService } from '../services/supplier-transaction.service';

@Controller('supplier/transaction')
export class SupplierTransactionController {
  constructor(private supplierTransactionService: SupplierTransactionService) {}

  @Post()
  async create(
    @Body() createSupplierTransactionDto: CreateSupplierTransactionDto,
  ): Promise<any> {
    try {
      // return ' dto ';
      const data: any =
        await this.supplierTransactionService.createSupplierTransaction(
          createSupplierTransactionDto,
        );
      return data;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
