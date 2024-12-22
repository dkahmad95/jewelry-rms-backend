import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsEnum } from 'class-validator';
export enum ExpensesEnum {
  SALARIES = 'Salaries',
  ELECTRICITY = 'Electricity',
  WATER = 'Water',
  INTERNET = 'Internet',
  MAINTENANCE = 'Maintenance',
  PACKAGING = 'Packaging',
  DISPLAY = 'Display',
  CHARITY = 'Charity',
  SOCIAL_MEDIA = 'Social Media',
  FOOD_AND_BEVERAGE = 'Food & Beverage',
  WITHDRAWALS = 'Withdrawals',
  OTHERS = 'Others',
}
@Entity()
export class ExpensesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEnum(ExpensesEnum)
  name: ExpensesEnum;

  @Column()
  description: string;

  @Column()
  value: number;

  @CreateDateColumn({ type: 'date' })
  createdDate: Date;
}
