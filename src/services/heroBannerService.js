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

const COLLECTION_NAME = 'heroBanners';
const bannersCol = collection(db, COLLECTION_NAME);

export const heroBannerService = {
  getBanners: async () => {
    try {
      const q = query(bannersCol, orderBy('sortOrder', 'asc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getBannerById: async (id) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Banner not found');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  createBanner: async (bannerData) => {
    try {
      const docRef = await addDoc(bannersCol, {
        title: bannerData.title || '',
        subtitle: bannerData.subtitle || '',
        buttonText: bannerData.buttonText || '',
        buttonLink: bannerData.buttonLink || '',
        imageUrl: bannerData.imageUrl || '',
        mobileImageUrl: bannerData.mobileImageUrl || '',
        sortOrder: Number(bannerData.sortOrder) || 0,
        status: bannerData.status !== undefined ? Boolean(bannerData.status) : true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateBanner: async (id, bannerData) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...bannerData,
        sortOrder: Number(bannerData.sortOrder) || 0,
        status: bannerData.status !== undefined ? Boolean(bannerData.status) : true,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteBanner: async (id) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
