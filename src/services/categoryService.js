import { db } from '../config/firebase';
import { 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';

const COLLECTION_NAME = 'categories';
const categoriesCol = collection(db, COLLECTION_NAME);

export const categoryService = {
  getCategories: async () => {
    try {
      const q = query(categoriesCol, orderBy('name', 'asc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getCategoryById: async (id) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Category not found');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  createCategory: async (categoryData) => {
    try {
      const slug = categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const docRef = await addDoc(categoriesCol, {
        name: categoryData.name,
        slug,
        status: categoryData.status || 'active',
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateCategory: async (id, categoryData) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const slug = categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      await updateDoc(docRef, {
        ...categoryData,
        slug,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteCategory: async (id) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
