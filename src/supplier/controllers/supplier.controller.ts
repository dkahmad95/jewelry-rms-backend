import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSupplierDto, UpdateSupplierDto } from '../dto/supplier.dto';
import { SupplierService } from '../services/supplier.service';
import { SupplierEntity } from '../../entities/supplierEntities/supplier.entity';

@Controller('supplier')
export class SupplierController {
  constructor(private supplierService: SupplierService) {}

  // GET ALL SUPPLIERS
  @Get()
  async findAll() {
    try {
      const data: SupplierEntity[] = await this.supplierService.findAll();
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // GET SUPPLIER BY ID
  @Get(':supplierId')
  async findOne(
    @Param('supplierId', ParseIntPipe) supplierId: number,
  ): Promise<SupplierEntity> {
    try {
      const data: SupplierEntity =
        await this.supplierService.findOne(supplierId);
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // CREATE SUPPLIER
  @Post()
  async create(
    @Body() createSupplierDto: CreateSupplierDto,
  ): Promise<SupplierEntity> {
    try {
      return await this.supplierService.createSupplier(createSupplierDto);
    } catch (e) {
      console.log(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // UPDATE SUPPLIER
  @Patch(':supplierId')
  async update(
    @Param('supplierId', ParseIntPipe) supplierId: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ): Promise<SupplierEntity> {
    try {
      return await this.supplierService.updateSupplier(
        supplierId,
        updateSupplierDto,
      );
    } catch (e) {
      console.log(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':supplierId')
  async delete(
    @Param('supplierId', ParseIntPipe) supplierId: number,
  ): Promise<string> {
    try {
      return await this.supplierService.deleteSupplier(supplierId);
    } catch (e) {
      console.log(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
