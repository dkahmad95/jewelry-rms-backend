import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Double } from 'typeorm'; // Import Double for floating-point numbers
import { Type } from 'class-transformer';
import { ItemsEnum } from '../../entites/supplierEntities/supplierTransactionItem.entity';

export class CreateSupplierDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsOptional()
  @Type(() => Double)
  cashBalance: number;

  @IsOptional()
  @Type(() => Double)
  ramliBalance: number;

  @IsOptional()
  @Type(() => Double)
  silverBalance: number;
}

export class UpdateSupplierDto {
  @IsOptional()
  name: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  @Type(() => Double)
  cashBalance: number;

  @IsOptional()
  @Type(() => Double)
  ramliBalance: number;

  @IsOptional()
  @Type(() => Double)
  silverBalance: number;
}

export class CreateSupplierTransactionDto {
  @IsNotEmpty()
  supplierId: number;

  @IsNotEmpty()
  @Type(() => ItemDto)
  @ValidateNested({ each: true })
  items: ItemDto[];
}

export class ItemDto {
  @IsNotEmpty()
  @IsEnum(ItemsEnum)
  item: ItemsEnum;

  @IsNotEmpty()
  @Type(() => Double)
  weight: number;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsPositive()
  @Type(() => Double)
  unitPrice: number;
}
