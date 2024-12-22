import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { SupplierEntity } from './supplier.entity';

@Entity()
export class SupplierTransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', generated: 'uuid' })
  supplierTransactionId: string;

  @ManyToOne(() => SupplierEntity, { onDelete: 'CASCADE' }) // Define a Many-to-One relationship with SupplierEntity
  @JoinColumn({ name: 'supplierId' }) // Define the name of the foreign key column
  supplier?: SupplierEntity; /// will display the supplierEntity

  @Column({ type: 'float', default: 0.0 })
  total18kWeight: number;

  @Column({ type: 'float', default: 0.0 })
  total18kPrice: number = 0.0;

  @Column({ type: 'float', default: 0.0 })
  total21kPrice: number = 0.0;

  @Column({ type: 'float', default: 0.0 })
  total21kWeight: number = 0.0;

  @Column({ type: 'float', default: 0.0 })
  total24kPrice: number = 0.0;

  @Column({ type: 'float', default: 0.0 })
  total24kWeight: number = 0.0;

  @Column({ type: 'float', default: 0.0 })
  totalSilverPrice: number = 0.0;

  @Column({ type: 'float', default: 0.0 })
  totalSilverWeight: number = 0.0;

  @Column({ type: 'float', default: 0.0 })
  total18KWeightToRamli: number = 0;

  @Column({ type: 'float', default: 0.0 })
  total21KWeightToRamli: number = 0;

  @Column({ type: 'float', default: 0.0 })
  totalRamli: number = 0;

  @Column({ type: 'float', default: 0.0 })
  totalRent: number = 0;

  @BeforeInsert()
  calculateTotals() {
    this.total18KWeightToRamli = (this.total18kWeight * 750) / 995;
    this.total21KWeightToRamli = (this.total21kWeight * 875) / 995;
    this.totalRamli =
      this.total18KWeightToRamli +
      this.total21KWeightToRamli +
      this.total24kWeight;
    this.totalRent =
      this.total18kPrice + this.total21kPrice + this.total24kPrice;
  }
}
