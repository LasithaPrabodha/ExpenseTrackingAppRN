import {Recurrence} from '../types/recurrence';
import {Category} from './category';

export class Expense {
  id: string;
  amount: number;
  recurrence: Recurrence;
  date: Date;
  note: string;
  category: Category;

  constructor({id, amount, recurrence, date, note, category}: Expense) {
    this.id = id;
    this.amount = amount;
    this.recurrence = recurrence;
    this.date = date;
    this.note = note;
    this.category = category;
  }
}
