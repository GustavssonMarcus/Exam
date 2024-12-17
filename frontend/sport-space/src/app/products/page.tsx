"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../modules/products';

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // Gör ett API-anrop till backend
    axios.get<Product[]>(`${apiUrl}/getProducts`)
      .then(response => {
        setProducts(response.data); // Spara datan i state
      })
      .catch(error => {
        console.error('Misslyckades att hämta produkter:', error);
      });
  }, []);

  return (
    <div>
      <h1>Produkter</h1>
      {/* Mappar ut alla produkter */}
        {products.map((product, index) => (
          <div key={index}>
            <ul>
              <li>{product.brand} {product.name}</li>
              <li>{product.price.toString()} Kr</li>
              <li>{product.type}</li>
              <li>{product.size}</li>
              <li>{product.color}</li>
            </ul>

          </div>
        ))}
      
    </div>
  );
  }