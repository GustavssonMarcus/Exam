"use client";

import { useCart } from '../context/CartContext';
import { Product } from '../modules/products';
import { useCheckout } from '../context/CheckoutContext';
import { useState } from 'react';

export default function Page() {
  const { cart, removeFromCart } = useCart();
  const { addToCheckout } = useCheckout();

  const [selectedOptions, setSelectedOptions] = useState<{
    [productId: string]: { size: string; color: string };
  }>({});

  const handleOptionChange = (productId: string, optionType: "size" | "color", value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [optionType]: value,
      },
    }));
  };

  const handleAddToCheckout = (product: Product) => {
    const selectedSize = selectedOptions[product._id]?.size || (Array.isArray(product.size) ? product.size[0] : product.size);
    const selectedColor = selectedOptions[product._id]?.color || (Array.isArray(product.color) ? product.color[0] : product.color);
  
    addToCheckout(product, selectedSize, selectedColor);
  };
  
  return (
    <div className="cart">
      <h1 className="cart__title">Önskelistan</h1>
      <div className="cart-container">
        {cart.length > 0 ? (
          <div className="cart-container-content">
            {cart.map((product: Product, index: number) => (
              <div className="cart-container-content-products" key={index}>
                <div>
                  <p>{product.brand} {product.name}</p>
                  <p>{product.price} Kr</p>
                </div>
                <p className="label">Storlek:</p>
                <select
                  className="dropdown sizes"
                  value={selectedOptions[product._id]?.size || product.size[0]}
                  onChange={(e) => handleOptionChange(product._id, "size", e.target.value)}
                >
                  {Array.isArray(product.size)
                    ? product.size.map((size, index) => (
                        <option key={index} value={size}>
                          {size}
                        </option>
                      ))
                    : <option value={product.size}>{product.size}</option>}
                </select>
                <p className="label">Färger:</p>
                <select
                  className="dropdown colors"
                  value={selectedOptions[product._id]?.color || product.color[0]}
                  onChange={(e) => handleOptionChange(product._id, "color", e.target.value)}
                >
                  {Array.isArray(product.color)
                    ? product.color.map((color, index) => (
                        <option key={index} value={color}>
                          {color}
                        </option>
                      ))
                    : <option value={product.color}>{product.color}</option>}
                </select>
                <div className="cart-container-content-products-checkout">
                  <button onClick={() => handleAddToCheckout(product)}>Lägg till kassa</button>
                  <button onClick={() => removeFromCart(product._id)}>Ta bort</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Inga produkter i önskelistan ännu.</p>
        )}
      </div>
    </div>
  );
}