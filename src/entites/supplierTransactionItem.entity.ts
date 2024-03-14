import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsEnum, IsPositive } from 'class-validator';
import { SupplierTransactionEntity } from './supplierTransaction.entity';

export enum ItemsEnum {
  EIGHTEEN_K = '18K',
  TWENTY_ONE_K = '21K',
  TWENTY_FOUR_K = '24K',
  SILVER = 'Silver',
  WATCH = 'Watch',
}

@Entity()
export class SupplierTransactionItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEnum(ItemsEnum)
  item: ItemsEnum;

  // Optional relationship with SupplierTransactionEntity
  @ManyToOne(() => SupplierTransactionEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'supplierTransactionId' })
  supplierTransaction: SupplierTransactionEntity;

  @Column({ type: 'float', default: 0.0 })
  weight: number;

  @Column()
  description: string;

  @Column({ type: 'float', default: 0.0 })
  @IsPositive()
  unitPrice: number;
}
