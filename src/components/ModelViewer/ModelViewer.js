import React, { useRef, useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import QRCode from "qrcode.react";
import Help from "./Help";
import "./modelViewer.css";

const ModelViewer = ({
  item,
  addToWishlist,
  removeFromWishlist,
  wishlist,
  addToCart,
  removeFromCart,
  cart,
  updateQuantity,  // Added updateQuantity as a prop
}) => {
  const [selectedVariant, setSelectedVariant] = useState("default");
  const [display, setDisplay] = useState(false);
  const [ARSupported, setARSupported] = useState(false);
  const [annotate, setAnnotate] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);  // Local state for quantity

  const model = useRef();
  const variant = useRef(null);

  // Check if AR is supported on user's device
  useEffect(() => {
    if (
      /iPhone|webOS|Android|iPad|iPod|BlackBerry|Windows Phone/i.test(
        navigator.userAgent
      )
    ) {
      setARSupported(true);
    }
  }, []);

  // Set variant options once model is loaded
  useEffect(() => {
    const modelViewer = model.current;
    modelViewer &&
      modelViewer.addEventListener("load", () => {
        const availableVariants = modelViewer?.availableVariants;
        for (const variantName of availableVariants) {
          const option = document.createElement("option");
          option.value = variantName;
          option.textContent = variantName;
          variant?.current?.appendChild(option);
        }

        const defaultOption = document.createElement("option");
        defaultOption.value = "Default";
        defaultOption.textContent = "Default";
        variant?.current?.appendChild(defaultOption);
      });

    variant?.current?.addEventListener("input", (event) => {
      modelViewer.variantName =
        event.target.value === "Default" ? null : event.target.value;
    });
  }, []);

  // Check if the item is in wishlist and cart
  useEffect(() => {
    if (wishlist) {
      const exists = wishlist.some((wishlistItem) => wishlistItem.id === item.id);
      setIsInWishlist(exists);
    }
  }, [wishlist, item]);

  useEffect(() => {
    if (cart) {
      const exists = cart.some((cartItem) => cartItem.id === item.id);
      setIsInCart(exists);
      if (exists) {
        const cartItem = cart.find((cartItem) => cartItem.id === item.id);
        setQuantity(cartItem.quantity); // Set the quantity if already in the cart
      }
    }
  }, [cart, item]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      model.current.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const handleAnnotateClick = (annotation) => {
    const { orbit, target, position } = annotation;
    model.current.cameraTarget = position;
    model.current.orbit = target;
  };

  const handleAddToWishlist = () => {
    isInWishlist ? removeFromWishlist(item.id) : addToWishlist(item);
  };

  const handleCart = () => {
    if (isInCart) {
      removeFromCart(item.id);
    } else {
      addToCart({ ...item, quantity });
    }
  };

  const handleQuantityChange = (operation) => {
    if (operation === "increase") {
      setQuantity(prevQuantity => prevQuantity + 1);
      updateQuantity(item.id, quantity + 1);
    } else if (operation === "decrease" && quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      updateQuantity(item.id, quantity - 1);
    }
  };

  const modelViewerStyle = {
    backgroundColor: "#ecf0f3",
    overflowX: "hidden",
    posterColor: "#eee",
    width: "100%",
    height: ARSupported ? "85%" : "75%",
    borderRadius: 15,
  };

  return (
    <div className="model-view">
      <model-viewer
        key={item.id}
        ref={model}
        style={modelViewerStyle}
        src={item.modelSrc}
        ios-src={item.iOSSrc}
        alt="A 3D model"
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
      >
        {ARSupported && (
          <button slot="ar-button" className="arbutton">
            View in your space
          </button>
        )}

        <button className="fullscreen-btn" onClick={toggleFullscreen}>
          &#x26F6;<span> full screen</span>
        </button>

        {display ? (
          <>
            <button
              className={document.fullscreenElement ? "close fz" : "close"}
              onClick={() => setDisplay(false)}
            >
              &#10006;
            </button>
            <Help />
          </>
        ) : (
          <button className="help-btn" onClick={() => setDisplay(true)}>
            ?<span> help</span>
          </button>
        )}

        <button
          className="annotate-btn"
          onClick={() => setAnnotate((prev) => !prev)}
        >
          i
        </button>

        {annotate &&
          item.annotations?.map((annotate, idx) => (
            <button
              key={idx}
              className="Hotspot"
              slot={annotate.slot}
              data-position={annotate.position}
              data-normal={annotate.normal}
              data-orbit={annotate.orbit}
              data-target={annotate.target}
              data-visibility-attribute="visible"
              onClick={() => handleAnnotateClick(annotate)}
            >
              <div className="HotspotAnnotation">{annotate.title}</div>
            </button>
          ))}

        <div className="controls variant_div">
          <select ref={variant} id="variant"></select>
        </div>
      </model-viewer>

      <LazyLoad>
        <div className="qr-sec">
          {!ARSupported && (
            <QRCode
              id={item.name}
              value={window.location.href}
              size={110}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              includeMargin
            />
          )}

          <div className="product-details">
            <div>
              <div className="pname">{item.name}</div>
              <div className="rating-sec">
                <div>Rating</div>
                <div>
                  <span className="star">&#9733;</span>
                  <span className="star">&#9733;</span>
                  <span className="star">&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                </div>
              </div>
              <div>Rs. 1000</div>
              {!ARSupported && <h5>Scan the QR code for AR View on mobile</h5>}
            </div>

            <div className="button-group">
              <button className="add-icon" onClick={handleAddToWishlist}>
                {isInWishlist ? "-" : "+"}
              </button>
              <button className="cart-icon" onClick={handleCart}>
                {isInCart ? "Remove from Cart" : "Add to Cart"}
              </button>

              {/* Quantity controls */}
              
            </div>
          </div>
        </div>
      </LazyLoad>
    </div>
  );
};

export default ModelViewer;
