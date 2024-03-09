import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateSupplierDto } from '../dto/supplier.dto';
import { SupplierService } from '../services/supplier.service';
import { SupplierEntity } from '../../entites/supplier.entity';

@Controller('supplier')
export class SupplierController {
  constructor(private supplierService: SupplierService) {}

  @Post()
  async create(@Body() createSupplierDto: CreateSupplierDto): Promise<SupplierEntity> {
    try {
      const data: SupplierEntity =
        await this.supplierService.createSupplier(createSupplierDto);
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
