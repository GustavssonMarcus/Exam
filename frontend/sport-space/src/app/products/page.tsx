"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../modules/products';

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]); // Alla produkter
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Filtrerade produkter
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]); // Valda typer

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Hämta alla produkter när sidan laddas
    axios.get<Product[]>(`${apiUrl}/getProducts`)
      .then(response => {
        setProducts(response.data); // Spara alla produkter
        setFilteredProducts(response.data); // Visa alla produkter initialt
      })
      .catch(error => {
        console.error('Misslyckades att hämta produkter:', error);
      });
  }, []);

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prevSelectedTypes =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter(t => t !== type)
        : [...prevSelectedTypes, type]
    );
  };

  useEffect(() => {
    if (selectedTypes.length === 0) {
      setFilteredProducts(products);
    } else {
      axios.get<Product[]>(`${apiUrl}/filterProducts`, { params: { type: selectedTypes } })
        .then(response => {
          setFilteredProducts(response.data); // Uppdatera filtrerade produkter
        })
        .catch(error => {
          console.error('Misslyckades att filtrera produkter:', error);
        });
    }
  }, [selectedTypes, products]);

  return (
    <div>
      <h1>Produkter</h1>

      {/* Checkboxar för att välja Kategori */}
      <fieldset>
        <legend>Filtrera efter typ:</legend>
        <label>
          <input
            type="checkbox"
            value="Basket"
            onChange={() => handleTypeChange("Basket")}
            checked={selectedTypes.includes("Basket")}
          />
          Basket
        </label>
        <label>
          <input
            type="checkbox"
            value="Fotboll"
            onChange={() => handleTypeChange("Fotboll")}
            checked={selectedTypes.includes("Fotboll")}
          />
          Fotboll
        </label>
        <label>
          <input
            type="checkbox"
            value="Innebandy"
            onChange={() => handleTypeChange("Innebandy")}
            checked={selectedTypes.includes("Innebandy")}
          />
          Innebandy
        </label>
      </fieldset>

      {/* Lista filtrerade produkter */}
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
          <div key={index}>
            <ul>
              <li>{product.brand} {product.name}</li>
              <li>{product.price.toString()} Kr</li>
              <li>{product.type}</li>
              <li>Storlekar: {Array.isArray(product.size) ? product.size.join(", ") : product.size}</li>
              <li>Färger: {Array.isArray(product.color) ? product.color.join(", ") : product.color}</li>
            </ul>
          </div>
        ))
      ) : (
        <p>Inga produkter matchar de valda filtren.</p>
      )}
    </div>
  );
}
