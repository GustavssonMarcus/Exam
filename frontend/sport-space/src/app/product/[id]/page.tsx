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
    <div>
      <h1>{product.name}</h1>
      <p>Typ: {product.type}</p>
      <p>Pris: {product.price.toString()} Kr</p>
      <p>Storlekar: {Array.isArray(product.size) ? product.size.join(", ") : product.size}</p>
      <p>Färger: {Array.isArray(product.color) ? product.color.join(", ") : product.color}</p>
      <p>Märke: {product.brand}</p>
    </div>
  );
}