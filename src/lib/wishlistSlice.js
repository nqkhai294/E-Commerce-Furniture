import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
  },
  reducers: {
    // Add item to wishlist
    addToWishlist: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (!existingItem) {
        state.items.push(item);
      } else {
        toast.error("Item already in wishlist", {
          duration: 3000,
          position: "bottom-center",
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
      }
    },
    // Remove item from wishlist
    removeFromWishlist: (state, action) => {
        const itemId = action.payload;
        state.items = state.items.filter((item) => item.id !== itemId);
    }
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;