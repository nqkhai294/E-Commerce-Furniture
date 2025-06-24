"use client";

import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { removeFromCart, updateItemQuantity } from "@/lib/cartSlice";
import { useState } from "react";
import { ProductsType } from "../../../public/data/data";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState("");

  // Tính tổng tiền
  const total = cartItems.reduce(
    (sum: number, item: ProductsType) => sum + item.price * item.quantity,
    0
  );

  // Xử lý tăng/giảm số lượng
  const handleQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateItemQuantity({ id, quantity }));
  };

  // Xử lý xóa sản phẩm
  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-12 px-4 flex flex-col md:flex-row gap-8">
      {/* Danh sách sản phẩm */}
      <div className="flex-1 bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold mb-2">Shopping Bag</h1>
        <p className="mb-6 text-gray-500">
          {cartItems.length} Items in the bag
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Product</th>
                <th className="py-2">Price</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Total Price</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: ProductsType) => (
                <tr key={item.id} className="border-b align-middle">
                  <td className="py-4 flex items-center gap-4 min-w-[220px]">
                    <div className="relative w-16 h-16 rounded overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.text}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">{item.text}</div>
                      <div className="text-sm text-gray-500">
                        {item.category}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 font-medium">${item.price.toFixed(2)}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                        onClick={() =>
                          handleQuantity(item.id, item.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                      >
                        <FaMinus />
                      </button>
                      <span className="px-2 min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                        onClick={() =>
                          handleQuantity(item.id, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="py-4">
                    <button
                      className="p-2 rounded hover:bg-red-100 text-red-500"
                      onClick={() => handleRemove(item.id)}
                      aria-label="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {cartItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">
                    Your cart is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="w-full md:w-96 bg-white rounded-xl shadow p-6 h-fit">
        <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Coupon Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="border rounded px-3 py-2 flex-1"
              placeholder="Enter Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button className="bg-[#a91f64] text-white px-4 py-2 rounded font-semibold hover:bg-[#8c1852]">
              Apply
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6 text-lg font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="w-full bg-[#a91f64] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#8c1852] transition">
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
