import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem('cit_cart');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('cit_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    // Cart is disabled for out of stock or inactive products
    if (product.status === 'inactive' || product.stockQuantity <= 0) return;

    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      const currentQty = existing ? existing.quantity : 0;
      const finalQty = Math.min(product.stockQuantity, currentQty + qty);

      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: finalQty } : item);
      }
      return [...prev, { ...product, quantity: finalQty }];
    });
  };

  const updateQuantity = (id, newQty) => {
    setCart((prev) => 
      prev.map(item => {
        if (item.id === id) {
          const finalQty = Math.max(1, Math.min(item.stockQuantity, newQty));
          return { ...item, quantity: finalQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce((total, item) => {
    const itemPrice = item.offerPrice > 0 ? item.offerPrice : item.price;
    return total + (itemPrice * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
