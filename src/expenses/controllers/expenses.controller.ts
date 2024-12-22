import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { ExpensesService } from '../services/expenses.service';
import { CreateExpenseDto, UpdateExpenseDto } from '../dto/expenses.dto';
import { ExpensesEntity } from '../../entities/expensesEntities/expenses.entity';

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  // GET ALL EXPENSES
  @Get()
  async findAll() {
    try {
      const data: ExpensesEntity[] = await this.expensesService.findAll();
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // GET EXPENSE BY ID
  @Get(':expenseId')
  async findOne(
    @Param('expenseId', ParseIntPipe) expenseId: number,
  ): Promise<ExpensesEntity> {
    try {
      const data: ExpensesEntity =
        await this.expensesService.findOne(expenseId);
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // CREATE EXPENSE
  @Post()
  async create(
    @Body() createExpenseDto: CreateExpenseDto,
  ): Promise<ExpensesEntity> {
    try {
      return await this.expensesService.createExpense(createExpenseDto);
    } catch (e) {
      console.log(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // UPDATE EXPENSE
  @Patch(':expenseId')
  async update(
    @Param('expenseId', ParseIntPipe) expenseId: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<ExpensesEntity> {
    try {
      return await this.expensesService.updateExpense(
        expenseId,
        updateExpenseDto,
      );
    } catch (e) {
      console.log(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':expenseId')
  async delete(
    @Param('expenseId', ParseIntPipe) expenseId: number,
  ): Promise<string> {
    try {
      return await this.expensesService.deleteExpense(expenseId);
    } catch (e) {
      console.log(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
