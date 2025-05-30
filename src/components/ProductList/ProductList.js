import React from "react";
import productItems from "../../data/ProductItems";
import ModelViewer from "../ModelViewer/ModelViewer";
import "./ProductList.css";
import LazyLoad from "react-lazyload";

const ProductList = ({
  addToWishlist,
  removeFromWishlist,
  wishlist,
  addToCart,
  removeFromCart,
  updateQuantity,
  cart
}) => {
  return (
    <section className="list-view">
      {productItems.map((item, idx) => (
        <LazyLoad key={idx}>
          <ModelViewer
            item={item}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
            wishlist={wishlist}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            cart={cart}
          />
        </LazyLoad>
      ))}
    </section>
  );
};

export default ProductList;
