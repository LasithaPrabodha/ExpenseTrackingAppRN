import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from './config'

export async function save(data: any) {
    try {
        const dbCollection = collection(db, 'expenseList')
        const docRef = await addDoc(dbCollection, data);
        return docRef.id
      } catch (e) {
        return null
      }
}

export async function update(id: string, data: any) {
    try {
        const docRef = doc(db, 'expenseList', id)
        await updateDoc(docRef, data)
        return true
    } catch (e) {
        return false
    }
  }

export async function remove(id: string){
    try {
        const docRef = doc(db, 'expenseList', id)
        await deleteDoc(docRef)
        return true
    } catch (e) {
        return false
    }
    
}