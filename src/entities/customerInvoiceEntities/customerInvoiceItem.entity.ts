import { IsEnum, IsPositive } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerInvoiceEntity } from './customerInvoice.entity';

export enum ItemsEnum {
  EIGHTEEN_K = '18K',
  TWENTY_ONE_K = '21K',
  TWENTY_FOUR_K = '24K',
  SILVER = 'Silver',
  WATCH = 'Watch',
}

@Entity()
export class CustomerInvoiceItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEnum(ItemsEnum)
  item: ItemsEnum;

  @ManyToOne(() => CustomerInvoiceEntity, (invoice) => invoice.items, {
    onDelete: 'CASCADE',
  })
  customerInvoice: CustomerInvoiceEntity;

  @Column({ type: 'float', default: 0.0 })
  weight: number;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'float', default: 0.0 })
  @IsPositive()
  unitPrice: number;

  @Column({ type: 'float', default: 0.0 })
  itemTotal: number = 0.0;
}
