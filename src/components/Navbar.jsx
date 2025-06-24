"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaTruck,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // get cart items from redux store to display the item count
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const wishlistItemCount = wishlistItems.length;

  return (
    <div className="sticky top-0 z-50 bg-slate-50 px-6 py-4 flex items-center justify-between">
      {/* left section: logo */}
      <div className="flex flex-col leading-tight">
        <span className="text-lg md:text-2xl font-bold text-[#a91f64]">
          Rise of Coding
        </span>

        <span className="text-sm text-gray-500 tracking-widest">
          Furniture Store
        </span>
      </div>

      {/* right section: navigation links */}
      <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
        <li>
          <Link href="/" className="hover:text-[#a91f64] cursor-pointer">
            Home
          </Link>
        </li>

        <li>
          <Link href="/" className="hover:text-[#a91f64] cursor-pointer">
            New Arrivals
          </Link>
        </li>

        <li>
          <Link href="/" className="hover:text-[#a91f64] cursor-pointer">
            Top Sellers
          </Link>
        </li>

        <li>
          <Link
            href="/products"
            className="hover:text-[#a91f64] cursor-pointer"
          >
            Products
          </Link>
        </li>
      </ul>

      {/* right section: icon */}
      <div className="flex items-center gap-6 text-gray-700 text-xl">
        <div className="flex gap-6">
          <FaTruck className="hover:text-[#a91f64] cursor-pointer" />
          <Link href="/wishlist" className="relative">
            <FaHeart className="hover:text-[#a91f64] cursor-pointer" />
            <span className="absolute -top-3 -right-4 text-xs bg-[#a91f64] text-white rounded-full px-1.5 py-0.5">
              {wishlistItemCount}
            </span>
          </Link>

          <Link href="/cart" className="relative">
            <FaShoppingCart className="hover:text-[#a91f64] cursor-pointer" />
            <span className="absolute -top-3 -right-4 text-xs bg-[#a91f64] text-white rounded-full px-1.5 py-0.5">
              {cartItemCount}
            </span>
          </Link>
        </div>
      </div>

      {/* menu icon */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {isMenuOpen ? (
            <FaTimes className="text-2xl hover:text-[#a91f64] cursor-pointer" />
          ) : (
            <FaBars className="text-2xl hover:text-[#a91f64] cursor-pointer" />
          )}
        </button>
      </div>

      {/* mobile menu */}
      {isMenuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-white flex flex-col items-center gap-4 py-4 text-gray-700 font-medium md:hidden shadow-md">
          <li>
            <Link
              href="/"
              className="hover:text-[#a91f64] cursor-pointer"
              onClick={toggleMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="hover:text-[#a91f64] cursor-pointer"
              onClick={toggleMenu}
            >
              New Arrivals
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="hover:text-[#a91f64] cursor-pointer"
              onClick={toggleMenu}
            >
              Top Sellers
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="hover:text-[#a91f64] cursor-pointer"
              onClick={toggleMenu}
            >
              Products
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
