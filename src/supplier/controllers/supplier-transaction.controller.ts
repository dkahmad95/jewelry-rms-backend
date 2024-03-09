import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateSupplierDto, CreateSupplierTransactionDto } from "../dto/supplier.dto";
import { SupplierService } from '../services/supplier.service';
import { SupplierEntity } from '../../entites/supplier.entity';
import { SupplierTransactionService } from "../services/supplier-transaction.service";

@Controller('supplier/transaction')
export class SupplierTransactionController {
  constructor(private supplierTransactionService: SupplierTransactionService) {}

  @Post()
  async create(
    @Body() createSupplierTransactionDto: CreateSupplierTransactionDto,
  ): Promise<any> {
    try {
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
  // @Get()
  // findAll(): Promise<Supplier[]> {
  //   return this.supplierService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number): Promise<Supplier> {
  //   return this.supplierService.findOne(id);
  // }
  //
  // @Patch(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateSupplierDto: Prisma.SupplierUpdateInput,
  // ): Promise<Supplier> {
  //   return this.supplierService.update(id, updateSupplierDto);
  // }
  //
  // @Delete(':id')
  // delete(@Param('id', ParseIntPipe) id: number): Promise<Supplier> {
  //   return this.supplierService.delete(id);
  // }
}
