"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../modules/products';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]); // Alla produkter
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Filtrerade produkter
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]); // Valda typer
  const { addToCart } = useCart();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupProduct, setPopupProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Aktuell sida
  const [totalPages, setTotalPages] = useState(1); // Totalt antal sidor
  const [totalProducts, setTotalProducts] = useState(0);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const productsPerPage = 10;

  useEffect(() => {
    axios
      .get(`${apiUrl}/getProducts`, {
        params: {
          page: currentPage,
          limit: productsPerPage,
        },
      })
      .then(response => {
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setTotalProducts(response.data.totalProducts);
      })
      .catch(error => {
        console.error('Misslyckades att hämta produkter:', error);
      });
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
          setFilteredProducts(response.data);
        })
        .catch(error => {
          console.error('Misslyckades att filtrera produkter:', error);
        });
    }
  }, [selectedTypes, products]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setPopupProduct(product);
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 10000);
  };

  return (
    <div className='sortiment'>
      <h1 className='sortiment__title'>Produkter</h1>

      {/* Checkboxar för att välja Kategori */}
      <fieldset className='sortiment-category'>
        <label className='sortiment-category-basket'>
          <input
            type="checkbox"
            value="Basket"
            onChange={() => handleTypeChange("Basket")}
            checked={selectedTypes.includes("Basket")}
          />
          <span>Basket</span>
        </label>
        <label className='sortiment-category-fotboll'>
          <input
            type="checkbox"
            value="Fotboll"
            onChange={() => handleTypeChange("Fotboll")}
            checked={selectedTypes.includes("Fotboll")}
          />
          <span>Fotboll</span>
        </label>
        <label className='sortiment-category-innebandy'>
          <input
            type="checkbox"
            value="Innebandy"
            onChange={() => handleTypeChange("Innebandy")}
            checked={selectedTypes.includes("Innebandy")}
          />
          <span>Innebandy</span>
        </label>
        <label className='sortiment-category-innebandy'>
          <input
            type="checkbox"
            value="Golf"
            onChange={() => handleTypeChange("Golf")}
            checked={selectedTypes.includes("Golf")}
          />
          <span>Golf</span>
        </label>
        <label className='sortiment-category-innebandy'>
          <input
            type="checkbox"
            value="Hockey"
            onChange={() => handleTypeChange("Hockey")}
            checked={selectedTypes.includes("Hockey")}
          />
          <span>Hockey</span>
        </label>
        <label className='sortiment-category-innebandy'>
          <input
            type="checkbox"
            value="Racketsport"
            onChange={() => handleTypeChange("Racketsport")}
            checked={selectedTypes.includes("Racketsport")}
          />
          <span>Racketsport</span>
        </label>
        <label className='sortiment-category-innebandy'>
          <input
            type="checkbox"
            value="Fritid"
            onChange={() => handleTypeChange("Fritid")}
            checked={selectedTypes.includes("Fritid")}
          />
          <span>Fritid</span>
        </label>
        <label className='sortiment-category-innebandy'>
          <input
            type="checkbox"
            value="Löpning"
            onChange={() => handleTypeChange("Löpning")}
            checked={selectedTypes.includes("Löpning")}
          />
          <span>Löpning</span>
        </label>
      </fieldset>

      <div className='sortiment-content'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div className='sortiment-content-product' key={index}>
              <div>
                <Link href={`/product/${product._id}`}>
                <ul>
                  <li>{product.type}</li>
                  <li>{product.brand} - {product.name}</li>
                  <li>{product.price.toString()} Kr</li>
                  <li>Storlekar: {Array.isArray(product.size) ? product.size.join(", ") : product.size}</li>
                  <li>Färger: {Array.isArray(product.color) ? product.color.join(", ") : product.color}</li>
                </ul>
                </Link>
              </div>
              <button onClick={() => handleAddToCart(product)}>
                <img src="/svg/wishlist.svg" alt="Önskelista" />
              </button>
            </div>
          ))
        ) : (
          <p>Inga produkter matchar de valda filtren.</p>
        )}
      </div>
      <div className="sortiment-pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Föregående
        </button>
        <span>
          Sida {currentPage} av {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Nästa
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