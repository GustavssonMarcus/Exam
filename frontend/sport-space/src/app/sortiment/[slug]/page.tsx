"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../../modules/products';
import { useCart } from '@/app/context/CartContext';
import { useProductContext } from '@/app/context/ProductContext';

type Params = {
  slug: string;
};

export default function ProductPage({ params }: { params: Params }) {
  const { slug } = React.use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const { selectedSize, selectedColor, handleSizeChange, handleColorChange, setSelectedSize, setSelectedColor } = useProductContext();
  const { addToCart } = useCart();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupProduct, setPopupProduct] = useState<Product | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apiUrl}/product/${slug }`);
        setProduct(response.data);
        if (response.data.size && response.data.size.length > 0) {
          setSelectedSize(response.data.size[0]);
        }
        if (response.data.color && response.data.color.length > 0) {
          setSelectedColor(response.data.color[0]);
        }
      } catch (error) {
        console.error('Misslyckades att hämta produktdata:', error);
      }
    };

    fetchProduct();
  }, [slug , setSelectedSize, setSelectedColor]);

  if (!product) {
    return <div>Laddar produkt...</div>;
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setPopupProduct(product);
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 10000);
  };

  return (
    <div className='product'>
      <a className='product-return' href="/sortiment">
        <img src="/svg/arrowLeft.svg" alt="return" /><span>Tillbaka</span>
      </a>
      <div className="product-info">
        <h1>{product.brand} - {product.name}</h1>
        <p className="label product-type">Typ:</p>
        <p className="value">{product.type}</p>
        <p className="label price">Pris:</p>
        <p className="value">{product.price.toString()} Kr</p>
        <p className="label">Storlek:</p>
        <select className="dropdown sizes" value={selectedSize} onChange={handleSizeChange}>
          {Array.isArray(product.size)
            ? product.size.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))
            : <option value={product.size}>{product.size}</option>}
        </select>
        
        <p className="label">Färger:</p>
        <select className="dropdown colors" value={selectedColor} onChange={handleColorChange}>
          {Array.isArray(product.color)
            ? product.color.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))
            : <option value={product.color}>{product.color}</option>}
        </select>
        <button onClick={() => handleAddToCart(product)}>
          <img src="/svg/wishlist.svg" alt="Önskelista" />
        </button>
      </div>
      {popupVisible && popupProduct && (
        <div className="popup">
          <div className="popup-content">
            <h2>Produkt tillagd i kundvagnen!</h2>
            <p>
              <strong>{popupProduct.name}</strong> har lagts till i din önskelista.
            </p>
            <button onClick={() => setPopupVisible(false)}>Stäng</button>
          </div>
        </div>
      )}
    </div>
  );
}