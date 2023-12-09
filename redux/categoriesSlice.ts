import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Expense} from '../models/expense';
import {Category} from '../models/category';

interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: [
    new Category({id: '1', color: '#ff0000', name: 'Anan Manan'}),
    new Category({id: '2', color: '#00ff00', name: 'Coffee'}),
    new Category({id: '3', color: '#0000FF', name: 'Party'}),
    new Category({id: '4', color: '#800080', name: 'Studies'}),
    new Category({id: '5', color: '#953553', name: 'Supplies'}),
    new Category({id: '6', color: '#722F37', name: 'Transportation'}),
  ],
};

const expensesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        category => category.id !== action.payload,
      );
    },
    updateCategory: (
      state,
      action: PayloadAction<{id: string; updatedExpense: Partial<Expense>}>,
    ) => {
      const {id, updatedExpense} = action.payload;
      const index = state.categories.findIndex(category => category.id === id);
      if (index !== -1) {
        state.categories[index] = {
          ...state.categories[index],
          ...updatedExpense,
        };
      }
    },
  },
});

export const {addCategory, removeCategory, updateCategory} =
  expensesSlice.actions;
export default expensesSlice.reducer;
