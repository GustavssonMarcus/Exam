"use client";
import { useCart } from '../context/CartContext';

export default function Page() {
  const { cart } = useCart();

  return (
    <div>
      <h1>Önskelistan</h1>
      {cart.length > 0 ? (
        <ul>
          {cart.map((product, index) => (
            <li key={index}>
              {product.brand} {product.name} - {product.price.toString()} Kr
            </li>
          ))}
        </ul>
      ) : (
        <p>Inga produkter i önskelistan ännu.</p>
      )}
    </div>
  );
}