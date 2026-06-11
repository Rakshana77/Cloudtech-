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

const COLLECTION_NAME = 'brands';
const brandsCol = collection(db, COLLECTION_NAME);

export const brandService = {
  getBrands: async () => {
    try {
      const q = query(brandsCol, orderBy('name', 'asc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getBrandById: async (id) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Brand not found');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  createBrand: async (brandData) => {
    try {
      const docRef = await addDoc(brandsCol, {
        name: brandData.name,
        logo: brandData.logo || '',
        status: brandData.status || 'active',
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateBrand: async (id, brandData) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...brandData,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteBrand: async (id) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
