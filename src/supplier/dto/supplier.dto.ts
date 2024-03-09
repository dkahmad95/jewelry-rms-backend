import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { Double } from 'typeorm';

export class CreateSupplierDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsOptional()
  cashBalance: number;

  @IsOptional()
  ramliBalance: number;
}

export class CreateSupplierTransactionDto {
  @IsNotEmpty()
  supplierId: number;

  @IsNotEmpty()
  items: ItemDto[];
}

//TODO : check how to validate nested dto
export class ItemDto {
  @IsNotEmpty()
  item: string;

  @IsNotEmpty()
  weight: number;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsPositive()
  unitPrice: number;
}
