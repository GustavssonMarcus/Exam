"use client";

import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Product } from '../modules/products';

export default function Page() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Funktion för att skapa en checkout-session
  const handleCheckout = async () => {
    try {
      const products = cart.map(product => ({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
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

  // Beräkna total summa
  const totalSum = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
  <div className="cart">
    <h1 className="cart__title">Kundvagn</h1>
    <div className='cart-container'>
      {cart.length > 0 ? (
        <div className='cart-container-content'>
          <ul>
            {cart.map((product: Product, index: number) => (
              <li key={index}>
                <p>
                  {product.brand} {product.name} -{" "}
                  {(product.price * product.quantity).toFixed(2)} Kr
                </p>
                <div>
                  <div>
                    <button onClick={() => decreaseQuantity(product._id)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => increaseQuantity(product._id)}>+</button>
                  </div>
                    <button onClick={() => removeFromCart(product._id)}>Ta bort</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Inga produkter i önskelistan ännu.</p>
      )}
      <div className='cart-container-checkout'>
        <span className='cart-container-total'>Total: {totalSum.toFixed(2)} Kr</span>
        <button className='cart-container-checkout-btn' onClick={handleCheckout}>
          Gå till kassa
        </button>
      </div>
    </div>
  </div>
  );
}