import { DocumentSnapshot, collection, getDocs } from "firebase/firestore";
import { db } from './config'
import { Expense } from '../models/expense'

export async function load() {
  const data: Expense[] = [];

  const querySnapshot = await getDocs(collection(db, 'expenseList'));
  querySnapshot.forEach((doc: DocumentSnapshot) => {
    const expenseData = doc.data() as Expense
    expenseData.id = doc.id
    const expenseInstance = new Expense(expenseData)
    data.push(expenseInstance);
  });

  return data;
}