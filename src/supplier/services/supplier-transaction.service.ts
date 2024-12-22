import { Injectable } from '@nestjs/common';
import { CreateSupplierTransactionDto, ItemDto } from '../dto/supplier.dto';
import { SupplierTransactionEntity } from '../../entities/supplierEntities/supplierTransaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ItemsEnum,
  SupplierTransactionItemEntity,
} from '../../entities/supplierEntities/supplierTransactionItem.entity';
import { SupplierEntity } from '../../entities/supplierEntities/supplier.entity';

@Injectable()
export class SupplierTransactionService {
  constructor(
    @InjectRepository(SupplierTransactionItemEntity)
    private supplierTransactionItemEntityRepository: Repository<SupplierTransactionItemEntity>,

    @InjectRepository(SupplierTransactionEntity)
    private supplierTransactionEntityRepository: Repository<SupplierTransactionEntity>,

    @InjectRepository(SupplierEntity)
    private supplierEntityRepository: Repository<SupplierEntity>,
  ) {}

  async createSupplierTransaction(
    supplierTransaction: CreateSupplierTransactionDto,
  ) {
    const supplierId = supplierTransaction.supplierId;

    const supplier = await this.supplierEntityRepository.findOne({
      where: {
        id: supplierId,
      },
    });

    if (supplier) {
      const calculationRes = this.calculateSupplierTransactionValues(
        supplierTransaction.items,
      );

      const supplierTransactionEntity =
        this.supplierTransactionEntityRepository.create(calculationRes);
      const supplierTransactionItemsEntity =
        this.supplierTransactionItemEntityRepository.create(
          supplierTransaction.items,
        );
      const transactionValues =
        await this.supplierTransactionEntityRepository.save(
          supplierTransactionEntity,
        );
      const items = await this.supplierTransactionItemEntityRepository.save(
        supplierTransactionItemsEntity,
      );
      const res = { items, transactionValues };

      return res;
    } else {
      throw new Error('Supplier not found');
    }
  }

  private calculateSupplierTransactionValues(items: ItemDto[]) {
    const supplierTransaction: any = {
      id: 0,
      total18kWeight: 0,
      total18kPrice: 0,
      total21kPrice: 0,
      total21kWeight: 0,
      total24kPrice: 0,
      total24kWeight: 0,
      totalSilverPrice: 0,
      totalSilverWeight: 0,
      total18KWeightToRamli: 0,
      total21KWeightToRamli: 0,
      totalRamli: 0,
      totalRent: 0,
    };

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      switch (item.item) {
        case ItemsEnum.EIGHTEEN_K:
          supplierTransaction.total18kPrice += item.weight * item.unitPrice;
          supplierTransaction.total18kWeight += item.weight;

          break;
        case ItemsEnum.TWENTY_ONE_K:
          supplierTransaction.total21kPrice += item.weight * item.unitPrice;
          supplierTransaction.total21kWeight += item.weight;

          break;
        case ItemsEnum.TWENTY_FOUR_K:
          supplierTransaction.total24kPrice += item.weight * item.unitPrice;
          supplierTransaction.total24kWeight += item.weight;
          break;
        case ItemsEnum.SILVER:
          supplierTransaction.totalSilverPrice += item.weight * item.unitPrice;
          supplierTransaction.totalSilverWeight += item.weight;
          break;
        default:
          // Handle other cases if necessary
          break;
      }
    }

    return supplierTransaction;
  }
}
