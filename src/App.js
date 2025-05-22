import "./App.css";
import "@google/model-viewer/dist/model-viewer.min.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import ProductList from "./components/ProductList/ProductList";
import About from "./components/About/About";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/Signin";
import WishList from "./components/Wishlist/WishList";
import CartPage from "./components/Cart/Cart";

import { useState } from "react";

const App = () => {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  // Wishlist Functions
  const addToWishlist = (item) => {
    if (!wishlist.some((wish) => wish.id === item.id)) {
      setWishlist([...wishlist, item]);
    }
  };

  const handleRemoveItem = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
  };

  // Cart Functions
  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (!existingItem) {
      setCart((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProductList
              addToWishlist={addToWishlist}
              wishlist={wishlist}
              removeFromWishlist={handleRemoveItem}
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/wishlist"
          element={
            <WishList wishlist={wishlist} onRemoveItem={handleRemoveItem} />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          }
        />
        <Route path="/about" element={<About />} />
     
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
