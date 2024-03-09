import { Controller, Get } from '@nestjs/common';

@Controller('supplier-trans')
export class SupplierTransController {
  constructor() {}

  @Get()
  getSupplierTrans() {
    return ' get supplier trans';
  }

  // @Post()
  // create(
  //   @Body() createSupplierTransDto: Prisma.SupplierTransCreateInput,
  // ): Promise<SupplierTrans> {
  //   try {
  //     return this.supplierTransService.create(createSupplierTransDto);
  //   } catch {
  //     //returm 500
  //   }
  // }
  //
  // // make a get method for all supplier trans //
  //
  // @Get()
  // findAll(): Promise<SupplierTrans[] | null> {
  //   return this.supplierTransService.findAll();
  // }
  //
  // @Get(':supplierId')
  // findAllBySupplierId(
  //   @Param('supplierId', ParseIntPipe) supplierId: number,
  // ): Promise<SupplierTrans[] | null> {
  //   return this.supplierTransService.findAllBySupplierId(supplierId);
  // }
  //
  // @Get(':supplierId/:transId/')
  // findOne(
  //   @Param('supplierId', ParseIntPipe) supplierId: number,
  //   @Param('transId', ParseIntPipe) transId: number,
  // ): Promise<SupplierTrans | null> {
  //   return this.supplierTransService.findOne(transId, supplierId);
  // }
  //
  // // @Patch(':supplierId/:transId/')
  // // update(
  // //   @Param('transId', ParseIntPipe) transId: number,
  // //   @Param('supplierId', ParseIntPipe) supplierId: number,
  // //   @Body() updateSupplierDto: any,
  //
  // // ): Promise<SupplierTrans | null> {
  // //   return this.supplierTransService.update(
  // //     transId,
  // //     supplierId,
  // //     updateSupplierDto,
  // //   );
  // // }
  //
  // @Delete(':supplierId/:transId/')
  // remove(
  //   @Param('transId', ParseIntPipe) transId: number,
  //   @Param('supplierId', ParseIntPipe) supplierId: number,
  // ): Promise<SupplierTrans | null> {
  //   return this.supplierTransService.remove(transId, supplierId);
  // }
}
