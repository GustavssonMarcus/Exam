"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../modules/products';

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  // Hämta kundvagn från localStorage vid sidladdning
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Spara kundvagn i localStorage varje gång den uppdateras
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  //Lägg till produkt i önskelistan
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };
  //Ta bort produkt från önskelistan
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((product, index) => product.id !== id || index !== prevCart.findIndex((p) => p.id === id)));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart  }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart måste användas inom en CartProvider');
  }
  return context;
};