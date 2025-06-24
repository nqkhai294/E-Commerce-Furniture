"use client";

import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { FaCheck, FaTrash } from "react-icons/fa";
import { addToCart } from "@/lib/cartSlice";
import { removeFromWishlist } from "@/lib/wishlistSlice";
import { products } from "../../../public/data/data.json";
import { ProductsType } from "../../../public/data/data";

const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const clickAddToCart = (item: ProductsType) => {
    dispatch(addToCart(item))
    toast.success("Added to cart", {
      duration: 3000,
      position: "bottom-center",
      icon: <FaCheck className="text-white" />,
      style: {
        background: "#4caf50",
        color: "#fff",
        fontSize: "16px",
        fontWeight: 600,
        padding: "12px 20px",
        borderRadius: "6px",
        transition: "all 0.3s ease",
      },
    });

  };

  const clickRemoveFromWishlist = (id: number) => {
    dispatch(removeFromWishlist(id));
    toast.success("Removed from wishlist", {
      duration: 3000,
      position: "bottom-center",
      icon: <FaCheck className="text-white" />,
      style: {
        background: "#f44336",
        color: "#fff",
        fontSize: "16px",
        fontWeight: 600,
        padding: "12px 20px",
        borderRadius: "6px",
        transition: "all 0.3s ease",
      },
    });
  }

  // Lấy thông tin chi tiết sản phẩm từ data.json
  const getProductDetail = (id: number) => products.find((p) => p.id === id);

  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-4">
      <h1 className="text-4xl font-bold mb-2">Wishlist</h1>
      <p className="mb-6 text-gray-500">
        {wishlistItems.length} item{wishlistItems.length !== 1 && "s"} in your
        wishlist
      </p>
      <div className="bg-white rounded-xl shadow p-6">
        <table className="min-w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Product</th>
              <th className="py-2">Price</th>
              <th className="py-2">Stock</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-400">
                  Your wishlist is currently empty.
                </td>
              </tr>
            )}
            {wishlistItems.map((item: ProductsType) => {
              const detail = getProductDetail(item.id) || item;
              return (
                <tr key={item.id} className="border-b align-middle">
                  <td className="py-4 flex items-center gap-4 min-w-[220px]">
                    <div className="relative w-16 h-16 rounded overflow-hidden">
                      <Image
                        src={detail.image}
                        alt={detail.text}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">{detail.text}</div>
                      <div className="text-sm text-gray-500">
                        {detail.category}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 font-medium">
                    ${detail.price?.toFixed(2) ?? "--"}
                  </td>
                  <td className="py-4">
                    {detail.inStock ? (
                      <span className="text-green-600 font-semibold">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-red-500 font-semibold">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="py-4 flex gap-2">
                    <button
                      className="bg-[#a91f64] text-white px-4 py-2 rounded font-semibold hover:bg-[#8c1852] disabled:opacity-50"
                      onClick={() => clickAddToCart(detail)}
                      disabled={!detail.inStock}
                    >
                      Add to cart
                    </button>
                    <button
                      className="p-2 rounded hover:bg-red-100 text-red-500"
                      onClick={() => clickRemoveFromWishlist(item.id)}
                      aria-label="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WishlistPage;
