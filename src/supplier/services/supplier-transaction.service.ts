import { Injectable } from '@nestjs/common';
import { CreateSupplierTransactionDto } from '../dto/supplier.dto';
import { SupplierTransactionEntity } from '../../entites/supplierTransaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierTransactionItemEntity } from '../../entites/supplierTransactionItem.entity';

@Injectable()
export class SupplierTransactionService {
  constructor(
    @InjectRepository(SupplierTransactionItemEntity)
    private supplierTransactionItemEntityRepository: Repository<SupplierTransactionItemEntity>,

    @InjectRepository(SupplierTransactionEntity)
    private supplierTransactionEntityRepository: Repository<SupplierTransactionEntity>,
  ) {}

  async createSupplierTransaction(
    supplierTransaction: CreateSupplierTransactionDto,
  ) {
    const supplierId = supplierTransaction.supplierId;

    const supplierTransactionEntity =
      this.supplierTransactionEntityRepository.create({
        supplierId: supplierId,
        total18kPrice: 0,
        total18kWeight: 0,
      });

    let total18kPrice = 0;

    for (let i = 0; i < supplierTransaction.items.length; i++) {
      const item = supplierTransaction.items[i];

      if (item.item === '18k') {
        total18kPrice += item.weight * item.unitPrice;
      }

      const itemEntity = this.supplierTransactionItemEntityRepository.create({
        supplierTransactionId: supplierTransactionEntity.id,
        item: item.item,
        weight: item.weight,
        description: item.description,
        unitPrice: item.unitPrice,
      });

      const itemEntityRes =
        await this.supplierTransactionItemEntityRepository.save(itemEntity);

      console.log(itemEntityRes);
    }

    supplierTransactionEntity.total18kPrice = total18kPrice;
    const supplierTransactionEntityRes =
      await this.supplierTransactionEntityRepository.save(
        supplierTransactionEntity,
      );
    console.log(supplierTransaction);
    console.log(supplierTransactionEntityRes);
    return ' hello supplier transaction';
  }
}
