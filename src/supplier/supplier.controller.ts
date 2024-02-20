import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { Prisma, Supplier } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';


@SkipThrottle()
@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  create(@Body() createSupplierDto: Prisma.SupplierCreateInput): Promise<Supplier> {
    return this.supplierService.create(createSupplierDto);
  }
  @SkipThrottle({ default: false })
  @Get()
  findAll(): Promise<Supplier[]>  {
    return this.supplierService.findAll();
  }

  @Throttle({ short: {ttl: 1000 , limit: 1}})
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Supplier>  {
    return this.supplierService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupplierDto: Prisma.SupplierUpdateInput,
  ): Promise<Supplier>  {
    return this.supplierService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Supplier>  {
    return this.supplierService.remove(id);
  }
}
