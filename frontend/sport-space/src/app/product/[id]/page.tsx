"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../../modules/products';

type Params = {
  id: string;
};

export default function ProductPage({ params }: { params: Params }) {
  const { id } = React.use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apiUrl}/product/${id}`, {
          params: { _id: id },
        });
        setProduct(response.data);
      } catch (error) {
        console.error('Misslyckades att hämta produktdata:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Laddar produkt...</div>;
  }

  return (
    <div className='product'>
      <a href="/sortiment">
        <img src="/svg/arrowLeft.svg" alt="return" />
      </a>
      <div className="product-info">
        <h1>{product.brand} - {product.name}</h1>
        <p className="label product-type">Typ:</p>
        <p className="value">{product.type}</p>
        <p className="label price">Pris:</p>
        <p className="value">{product.price.toString()} Kr</p>
        <p className="label">Storlekar:</p>
        <p className="sizes">
          {Array.isArray(product.size) ? product.size.join(", ") : product.size}
        </p>
        <p className="label">Färger:</p>
        <p className="colors">
          {Array.isArray(product.color) ? product.color.join(", ") : product.color}
        </p>
      </div>
    </div>
  );
}