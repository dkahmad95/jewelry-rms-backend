import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ExpensesEntity } from '../../entities/expensesEntities/expenses.entity';
import { CreateExpenseDto, UpdateExpenseDto } from '../dto/expenses.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(ExpensesEntity)
    private expensesEntityRepository: Repository<ExpensesEntity>,
  ) {}
  // GET ALL EXPENSES
  async findAll() {
    try {
      const allExpenses: ExpensesEntity[] =
        await this.expensesEntityRepository.find();
      return allExpenses;
    } catch (e) {
      throw new Error(`Failed to fetch Expenses: ${e.message}`);
    }
  }

  // GET ONE EXPENSE BY ID
  async findOne(expenseId: number): Promise<ExpensesEntity> {
    try {
      const expense: ExpensesEntity =
        await this.expensesEntityRepository.findOne({
          where: {
            id: expenseId,
          },
        });
      if (!expense) {
        throw new HttpException(
          `Expense with ID ${expenseId} not found.`,
          HttpStatus.NOT_FOUND,
        );
      }
      return expense;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // CREATE EXPENSE
  async createExpense(expense: CreateExpenseDto): Promise<ExpensesEntity> {
    try {
      const expenseEntity: ExpensesEntity =
        this.expensesEntityRepository.create(expense);
      const res = await this.expensesEntityRepository.save(expenseEntity);
      return res;
    } catch (e) {
      throw new HttpException(
        'Error creating expense',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // UPDATE EXPENSE
  async updateExpense(
    expenseId: number,
    updatedExpense: UpdateExpenseDto,
  ): Promise<ExpensesEntity> {
    try {
      const updateResult: UpdateResult =
        await this.expensesEntityRepository.update(
          { id: expenseId },
          updatedExpense,
        );

      if (updateResult.affected === 0) {
        throw new Error(`Expense with ID ${expenseId} not found.`);
      }

      const updatedEntity: ExpensesEntity =
        await this.expensesEntityRepository.findOne({
          where: {
            id: expenseId,
          },
        });
      return updatedEntity;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  // DELETE EXPENSE

  async deleteExpense(expenseId: number): Promise<string> {
    try {
      const deleteResult: DeleteResult =
        await this.expensesEntityRepository.delete(expenseId);

      if (deleteResult.affected === 0) {
        throw new HttpException(
          `Expense with ID ${expenseId} not found.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return `Expense with ID ${expenseId} has been deleted`;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
