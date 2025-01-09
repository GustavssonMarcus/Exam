"use client";

import { useCart } from '../context/CartContext';
import { Product } from '../modules/products';
import { useProductContext } from '@/app/context/ProductContext';

export default function Page() {
  const { cart, removeFromCart} = useCart();
  const { selectedSize, selectedColor, handleSizeChange, handleColorChange, setSelectedSize, setSelectedColor } = useProductContext();
  
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await axios.get(`${apiUrl}/product/${id}`, {
  //         params: { _id: id },
  //       });
  //       setProduct(response.data);
  //       if (response.data.size && response.data.size.length > 0) {
  //         setSelectedSize(response.data.size[0]);
  //       }
  //       if (response.data.color && response.data.color.length > 0) {
  //         setSelectedColor(response.data.color[0]);
  //       }
  //     } catch (error) {
  //       console.error('Misslyckades att hämta produktdata:', error);
  //     }
  //   };

  //   fetchProduct();
  // }, [id, setSelectedSize, setSelectedColor]);
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
                <p className="label">Storlek:</p>
                <select className="dropdown sizes" value={selectedSize} onChange={handleSizeChange}>
                  {Array.isArray(product.size)
                    ? product.size.map((size, index) => (
                        <option key={index} value={size}>
                          {size}
                        </option>
                      ))
                    : <option value={product.size}>{product.size}</option>}
                </select>
                <p className="label">Färger:</p>
                <select className="dropdown colors" value={selectedColor} onChange={handleColorChange}>
                  {Array.isArray(product.color)
                    ? product.color.map((color, index) => (
                        <option key={index} value={color}>
                          {color}
                        </option>
                      ))
                    : <option value={product.color}>{product.color}</option>}
                </select>
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