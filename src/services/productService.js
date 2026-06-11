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

const COLLECTION_NAME = 'products';
const productsCol = collection(db, COLLECTION_NAME);

export const productService = {
  getProducts: async () => {
    try {
      const q = query(productsCol, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getProductById: async (id) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },

  createProduct: async (productData) => {
    try {
      const docRef = await addDoc(productsCol, {
        productName: productData.productName || '',
        sku: productData.sku || '',
        brand: productData.brand || '',
        category: productData.category || '',
        description: productData.description || '',
        specifications: productData.specifications || '',
        price: Number(productData.price) || 0,
        offerPrice: Number(productData.offerPrice) || 0,
        stockQuantity: Number(productData.stockQuantity) || 0,
        status: productData.status || 'active',
        featured: Boolean(productData.featured) || false,
        image: productData.image || '',
        galleryImages: productData.galleryImages || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...productData,
        price: Number(productData.price) || 0,
        offerPrice: Number(productData.offerPrice) || 0,
        stockQuantity: Number(productData.stockQuantity) || 0,
        featured: Boolean(productData.featured) || false,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteProduct: async (id) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
