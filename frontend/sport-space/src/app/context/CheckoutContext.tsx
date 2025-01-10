"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../modules/products';

type CheckoutContextType = {
  checkoutItems: Product[];
  addToCheckout: (product: Product) => void;
  removeFromCheckout: (_id: string) => void;
  clearCheckout: () => void;
  increaseQuantity: (_id: string) => void;
  decreaseQuantity: (_id: string) => void;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [checkoutItems, setCheckoutItems] = useState<Product[]>([]);

  // Hämta hela produktobjekt från localStorage vid sidladdning
  useEffect(() => {
    const storedCheckout = localStorage.getItem('checkout');
    if (storedCheckout) {
      setCheckoutItems(JSON.parse(storedCheckout));
    }
  }, []);

  // Spara hela produktobjekt i localStorage varje gång kassan uppdateras
  useEffect(() => {
    localStorage.setItem('checkout', JSON.stringify(checkoutItems));
  }, [checkoutItems]);

  // Lägg till produkt i kassan
  const addToCheckout = (product: Product) => {
    setCheckoutItems((prevCheckout) => [...prevCheckout, product]);
  };

  // Ta bort en produkt från kassan
  const removeFromCheckout = (_id: string) => {
    setCheckoutItems((prevCheckout) =>
      prevCheckout.filter((product) => product._id !== _id)
    );
  };

  // Töm hela kassan
  const clearCheckout = () => {
    setCheckoutItems([]);
  };

    //Ökar antalet för en produkt
    const increaseQuantity = (id: string) => {
        setCheckoutItems((prevCheckout) =>
            prevCheckout.map((item) =>
            item._id === id
              ? { ...item, quantity: (item.quantity || 0) + 1 } // Om quantity är null/undefined, sätt till 1
              : item
          )
        );
      };
    
      const decreaseQuantity = (id: string) => {
        setCheckoutItems((prev) =>
          prev.map((product) =>
            product._id === id
              ? { ...product, quantity: Math.max(product.quantity - 1, 1) }
              : product
          )
        );
      };

  return (
    <CheckoutContext.Provider value={{ checkoutItems, addToCheckout, removeFromCheckout, clearCheckout, increaseQuantity, decreaseQuantity }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout måste användas inom en CheckoutProvider');
  }
  return context;
};
