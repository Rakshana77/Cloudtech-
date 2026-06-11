import { db } from '../config/firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';

const COLLECTION_NAME = 'quotations';
const quotationsCol = collection(db, COLLECTION_NAME);

export const quotationService = {
  getQuotations: async () => {
    try {
      const q = query(quotationsCol, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error(error.message);
    }
  },

  createQuotation: async (quotationData) => {
    try {
      const docRef = await addDoc(quotationsCol, {
        customerName: quotationData.customerName || '',
        company: quotationData.company || '',
        email: quotationData.email || '',
        phone: quotationData.phone || '',
        message: quotationData.message || '',
        status: quotationData.status || 'new',
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateQuotationStatus: async (id, status) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        status,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
