import { Module } from '@nestjs/common';

import { ExpensesService } from './services/expenses.service';
import { ExpensesController } from './controllers/expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesEntity } from '../entities/expensesEntities/expenses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpensesEntity])],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
