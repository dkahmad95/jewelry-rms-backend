import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { CustomerInvoiceItemEntity } from './customerInvoiceItem.entity';

@Entity()
export class CustomerInvoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  phoneNumber: string;

  @OneToMany(() => CustomerInvoiceItemEntity, (item) => item.customerInvoice, {
    cascade: true,
  })
  items: CustomerInvoiceItemEntity[];

  @Column({ type: 'float', default: 0.0 })
  totalAmount: number = 0.0;

  @CreateDateColumn({ type: 'date' })
  createdDate: Date;
}
