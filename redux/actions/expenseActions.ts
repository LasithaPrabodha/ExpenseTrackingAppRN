import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDocs, setDoc, writeBatch } from "firebase/firestore";
import { firestore } from "../../database/config";
import { Expense } from "../../models/expense"; 

export const fetchExpensesAction = createAsyncThunk("expenses/fetch", async () => {
  try {
    
    const ref = collection(firestore, "users/test-user/expense-list");
    const querySnapshot = await getDocs(ref);
    let expenses: any[] = [];

    querySnapshot?.forEach((doc) => {
      const data = doc.data();
      const expense = { ...data, id: doc.id, date: new Date(data.date) };
      expenses.push(expense);
    });
 

    return { data: expenses };
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
});

export const addExpenseAction = createAsyncThunk("expenses/add", async (expense: Expense) => {
  try {
    const expenseFire = expense.toFirestoreObject();
    const id = doc(collection(firestore, "users/test-user/expense-list")).id;
 

    // save in firestore
    await setDoc(doc(firestore, "users/test-user/expense-list", id), expenseFire);

    return { data: id };
  } catch (error: any) {
    console.error(error.message);
    return { error: error.message };
  }
});

export const deleteExpense = createAsyncThunk("expenses/fetch", async (expenseId: string) => {
  try {
    await deleteDoc(doc(firestore, "test-user/expense-list", expenseId));

    return { data: null };
  } catch (error: any) {
    console.error(error.message);
    return { error: error.message };
  }
});
