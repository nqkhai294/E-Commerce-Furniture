"use client";

import { FaCheck, FaHeart, FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@/lib/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/lib/wishlistSlice";

//receive id prop
const ProductCard = ({ id, image, text, price }) => {
  //setup redux dispatch and select cart items to check if product is in cart
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInCart = cartItems.some((item) => item.id === id);
  const isInWishlist = wishlistItems.some((item) => item.id === id);

  //handle cart icon click to toggle add/remove product from cart
  const handleToggleCart = () => {
    if (isInCart) {
      dispatch(removeFromCart(id));
      toast.success("Removed from cart", {
        duration: 3000,
        position: "bottom-center",
        icon: <FaCheck className="text-white" />,
        style: {
          background: "#ef4444",
          color: "#fff",
          fontSize: "16px",
          fontWeight: 600,
          padding: "12px 20px",
          borderRadius: "6px",
          transition: "all 0.3s ease",
        },
      });
    } else {
      dispatch(addToCart({ id, image, text, price, quantity: 1 }));
      toast.success("Successfully added to cart", {
        duration: 3000,
        position: "bottom-center",
        icon: <FaCheck className="text-white" />,
        style: {
          background: "#22c55e",
          color: "#fff",
          fontSize: "16px",
          fontWeight: 600,
          padding: "12px 20px",
          borderRadius: "6px",
          transition: "all 0.3s ease",
        },
      });
    }
  };

  //handle wishlist icon click
  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(id));
      toast.success("Removed from wishlist", {
        duration: 3000,
        position: "bottom-center",
        icon: <FaCheck className="text-white" />,
        style: {
          background: "#ef4444",
          color: "#fff",
          fontSize: "16px",
          fontWeight: 600,
          padding: "12px 20px",
          borderRadius: "6px",
          transition: "all 0.3s ease",
        },
      });
    } else {
      dispatch(addToWishlist({ id, image, text, price }));
      toast.success("Successfully added to wishlist", {
        duration: 3000,
        position: "bottom-center",
        icon: <FaCheck className="text-white" />,
        style: {
          background: "#22c55e",
          color: "#fff",
          fontSize: "16px",
          fontWeight: 600,
          padding: "12px 20px",
          borderRadius: "6px",
          transition: "all 0.3s ease",
        },
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={image}
          alt={text}
          fill
          className="object-cover"
          sizes="auto"
        />
      </div>

      <div className="flex flex-row justify-between">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {text}
          </h3>
          <p className="text-[#a91f64] font-bold">${price}</p>
        </div>

        <div className="flex mt-12 mr-4 gap-4">
          <FaHeart
            onClick={handleToggleWishlist}
            className={`cursor-pointer ${
              isInWishlist ? "text-red-500" : "text-gray-600 hover:text-red-500"
            }`}
          />
          <FaShoppingCart
            onClick={handleToggleCart}
            className={`cursor-pointer ${
              isInCart ? "text-green-500" : "text-gray-600 hover:text-green-500"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
