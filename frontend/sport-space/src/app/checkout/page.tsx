"use client";

require('dotenv').config();
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useCheckout } from '../context/CheckoutContext';
import { Product } from '../modules/products';
import { useCart } from '../context/CartContext';

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublicKey) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY är inte definierad i miljövariablerna.");
}

const stripePromise = loadStripe(stripePublicKey);

export default function Page() {
  const { checkoutItems, removeFromCheckout, clearCheckout, decreaseQuantity, increaseQuantity } = useCheckout(); 
  const { cart, removeFromCart } = useCart();
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Funktion för att skapa en checkout-session
  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error('Stripe kunde inte laddas.');
      }

      const products = checkoutItems.map(product => ({
        name: product.name,
        price: product.price,
        color: product.color,
        size: product.size,
        quantity: product.quantity,
      }));
      
  
      const response = await axios.post(`${apiUrl}/create-checkout-session`, { products });
  
      if (response.data.id) {
        window.location.href = response.data.id;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Något gick fel vid betalning. Försök igen senare.');
    }
  };

  // Beräkna total summa
  const totalSum = checkoutItems.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
  <div className="checkout">
    <h1 className="checkout__title">Varukorg</h1>
    <div className='checkout-container'>
      {checkoutItems.length > 0 ? (
        <div className='checkout-container-content'>
          <ul>
            {checkoutItems.map((product, index) => (
              <li key={index}>
                <p>
                  {product.brand} {product.name} -{" "}
                  {(product.price * product.quantity).toFixed(2)} Kr
                </p>
                <p>
                Färg: {product.color}
                </p>
                <p>
                Storlek: {product.size}
                </p>
                <div>
                  <div>
                    <button onClick={() => decreaseQuantity(product._id)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => increaseQuantity(product._id)}>+</button>
                  </div>
                    <button onClick={() => removeFromCheckout(product._id)}>Ta bort</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Inga produkter i kassan.</p>
      )}
      <div className='checkout-container-checkout'>
        <span className='checkout-container-checkout-total'><strong>Total</strong> Inkl. moms: {totalSum.toFixed(2)} Kr</span>
        <button className='checkout-container-checkout-btn' onClick={handleCheckout}>
          Gå till kassa
        </button>
      </div>
    </div>
  </div>
  );
}