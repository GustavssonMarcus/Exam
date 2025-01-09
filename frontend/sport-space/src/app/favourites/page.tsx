"use client";

import { useCart } from '../context/CartContext';
import { Product } from '../modules/products';


export default function Page() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  // Beräkna total summa
  const totalSum = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
  <div className="cart">
    <h1 className="cart__title">Önskelistan</h1>
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
        <button className='cart-container-checkout-btn' >
          Gå till kassa
        </button>
      </div>
    </div>
  </div>
  );
}