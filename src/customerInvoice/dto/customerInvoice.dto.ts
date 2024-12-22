import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ItemsEnum } from 'src/entities/customerInvoiceEntities/customerInvoiceItem.entity';

export class CreateCustomerInvoiceDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsArray()
  @IsNotEmpty()
  @Type(() => ItemDto)
  @ValidateNested({ each: true })
  items: ItemDto[];

  @IsOptional()
  @Type(() => Number)
  totalAmount: number;
}

export class UpdateCustomerInvoiceDto {
  @IsOptional()
  name: string;

  @IsOptional()
  phoneNumber: string;

  @IsArray()
  @IsNotEmpty()
  @Type(() => ItemDto)
  @ValidateNested({ each: true })
  items?: ItemDto[];

  @IsOptional()
  @Type(() => Number)
  totalAmount: number;
}

export class ItemDto {
  @IsNotEmpty()
  @IsEnum(ItemsEnum)
  item: ItemsEnum;

  @IsNotEmpty()
  @Type(() => Number)
  weight: number;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  unitPrice: number;
}
