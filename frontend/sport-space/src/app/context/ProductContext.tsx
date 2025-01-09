"use client";
import React, { createContext, useContext, useState } from 'react';

interface ProductContextProps {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  handleSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleColorChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(event.target.value);
  };

  return (
    <ProductContext.Provider
      value={{
        selectedSize,
        setSelectedSize,
        selectedColor,
        setSelectedColor,
        handleSizeChange,
        handleColorChange,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};