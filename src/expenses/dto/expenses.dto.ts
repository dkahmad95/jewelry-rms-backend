import { IsEnum, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { Double } from 'typeorm'; // Import Double for floating-point numbers
import { Type } from 'class-transformer';
import { ExpensesEnum } from '../../entites/expensesEntities/expenses.entity';

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsEnum(ExpensesEnum)
  name: ExpensesEnum;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsPositive()
  @Type(() => Double)
  value: number;
}

export class UpdateExpenseDto {
  @IsOptional()
  @IsEnum(ExpensesEnum)
  name: ExpensesEnum;

  @IsOptional()
  description: string;

  @IsOptional()
  @Type(() => Double)
  value: number;
}
