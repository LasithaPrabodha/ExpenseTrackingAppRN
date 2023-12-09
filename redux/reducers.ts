import {createSlice, ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {Category} from './../models/category';
import {fetchCategoriesAction} from './actions/categoryActions';
import {
  CategoriesState,
  initialCategoriesState,
  ExpensesState,
  initialExpensesState,
  initialUserState,
} from './state';
import {Expense} from './../models/expense';
import {addExpenseAction, fetchExpensesAction} from './actions/expenseActions';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: initialExpensesState,
  reducers: {},
  extraReducers(builder: ActionReducerMapBuilder<ExpensesState>) {
    builder.addCase(fetchExpensesAction.fulfilled, (state, {payload}) => {
      if (payload.error) {
        return state;
      }
      const expenses = (payload as {data: Expense[]}).data as Expense[];
      return {...state, expenses};
    }).addCase(addExpenseAction.fulfilled, (state, {payload}) => {
      if (payload.error) {
        return state;
      }
      const expense = (payload as {data: Expense}).data as Expense;
      const expenses = [...state.expenses, expense] 
      return {...state, expenses};
    })
  },
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialCategoriesState,
  reducers: {},
  extraReducers(builder: ActionReducerMapBuilder<CategoriesState>) {
    builder.addCase(fetchCategoriesAction.fulfilled, (state, {payload}) => {
      if (payload.error) {
        return state;
      }

      const categories = (payload as {data: Category[]}).data as Category[];
      return {...state, categories};
    });
  },
});

const expensesReducer = expensesSlice.reducer;
const categoriesReducer = categoriesSlice.reducer;

export {categoriesReducer, expensesReducer};
