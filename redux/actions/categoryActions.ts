import {createAsyncThunk} from '@reduxjs/toolkit';
import {collection, deleteDoc, doc, getDocs, setDoc} from 'firebase/firestore';
import {auth, firestore} from '../../database/config';
import {Category} from '../../models/category';

export const fetchCategoriesAction = createAsyncThunk(
  'categories/fetch',
  async () => {
    const userid = auth.currentUser?.uid;

    if (!userid) return {data: []};

    try {
      const ref = collection(firestore, 'users/' + userid + '/category-list');
      const querySnapshot = await getDocs(ref);
      let categories: any[] = [];

      querySnapshot?.forEach(doc => {
        const data = doc.data();
        const category = {...data, id: doc.id};
        categories.push(category);
      });

      return {data: categories};
    } catch (error: any) {
      console.error(error);
      return {error: error.message};
    }
  },
);

export const addCategoryAction = createAsyncThunk(
  'categories/add',
  async (category: Category) => {
    const userid = auth.currentUser?.uid;

    if (!userid) return {data: null};
    try {
      const id = doc(
        collection(firestore, 'users/' + userid + '/category-list'),
      ).id;

      // save in firestore
      await setDoc(
        doc(firestore, 'users/' + userid + '/category-list', id),
        category.toFirestoreObject(),
      );

      return {data: id};
    } catch (error: any) {
      console.error(error.message);
      return {error: error.message};
    }
  },
);

export const deleteCategory = createAsyncThunk(
  'categories/fetch',
  async (categoryId: string) => {
    try {
      await deleteDoc(
        doc(firestore, 'users/test-user/category-list', categoryId),
      );

      return {data: null};
    } catch (error: any) {
      console.error(error.message);
      return {error: error.message};
    }
  },
);
