// create cart slice to manage cart actions

import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        // add item to cart
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id)
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({...item, quantity: 1});
            }
        },

        // remove item from cart
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter((item) => item.id !== itemId);
        },

        // update item quantity in cart
        updateItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((i) => i.id === id);
            if (item && quantity > 0) {
                item.quantity = quantity;
            }
        },
    }

});

export const { addToCart, removeFromCart, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
