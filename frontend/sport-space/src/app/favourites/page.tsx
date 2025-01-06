"use client";

import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Product } from '../modules/products';

export default function Page() {
  const { cart, removeFromCart  } = useCart();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Funktion för att skapa en checkout-session
  const handleCheckout = async () => {
    try {
      const products = cart.map(product => ({
        name: product.name,
        price: product.price,
        quantity: 1,
      }));
  
      const response = await axios.post(`${apiUrl}/create-checkout-session`, { products });
  
      if (response.data.id) {
        window.location.href = `https://checkout.stripe.com/session/${response.data.id}`;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Något gick fel vid betalning. Försök igen senare.');
    }
  };

  return (
    <div className='cart'>
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
              <button onClick={handleCheckout}>
                Betala
              </button>
    </div>
  );
}