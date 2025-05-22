import React from "react";
import "./Cart.css";

const Cart = ({ cart, removeFromCart, updateQuantity }) => {
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.thumbnail || item.image} alt="image" />
                <div>
                  <h4>{item.name}</h4>
                  {/* <p>Rs. {item.price}</p> */}<p>Rs. 1000</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            {/* <p>Subtotal: Rs. {calculateSubtotal()}</p> */}<p>Subtotal: Rs.1000</p>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
