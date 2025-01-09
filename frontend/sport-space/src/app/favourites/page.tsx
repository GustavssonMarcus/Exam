"use client";

import { useCart } from '../context/CartContext';
import { Product } from '../modules/products';


export default function Page() {
  const { cart, removeFromCart} = useCart();

  // Beräkna total summa
  const totalSum = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
  <div className="cart">
    <h1 className="cart__title">Önskelistan</h1>
    <div className='cart-container'>
      {cart.length > 0 ? (
        <div className='cart-container-content'>
            {cart.map((product: Product, index: number) => (
              <div className='cart-container-content-products' key={index}>
                <div>
                  <p>{product.brand} {product.name} {" "}</p>
                  <p>{product.price} Kr</p>
                </div>
                <div className='cart-container-content-products-checkout'>
                  <button>Lägg till kassa</button>
                  <button onClick={() => removeFromCart(product._id)}>Ta bort</button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p>Inga produkter i önskelistan ännu.</p>
      )}
    </div>
  </div>
  );
}