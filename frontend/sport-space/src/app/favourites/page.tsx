"use client";

import { useCart } from '../context/CartContext';
import { Product } from '../modules/products';

export default function Page() {
  const { cart, removeFromCart  } = useCart();

  return (
    <div>
      <h1>Önskelistan</h1>
      {cart.length > 0 ? (
        <ul>
          {cart.map((product: Product, index: number) => (
            <li key={index}>
              {product.brand} {product.name} - {product.price.toString()} Kr
              <button onClick={() => removeFromCart(product._id)}>
                Ta bort
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Inga produkter i önskelistan ännu.</p>
      )}
    </div>
  );
}