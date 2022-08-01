import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalAmount: 0, changed: false },
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItemIndex = state.items.findIndex(
        (element) => element.title === item.title
      );
      if (existingItemIndex === -1) {
        state.items.push({
          title: item.title,
          desc: item.desc,
          price: item.price,
          link: item.link,
          totalPrice: item.price * item.quantity,
          quantity: item.quantity,
        });
        state.totalAmount += item.price * item.quantity;
      } else {
        state.items[existingItemIndex].quantity += item.quantity;
        state.items[existingItemIndex].totalPrice += item.price * item.quantity;
        state.totalAmount += item.price * item.quantity;
      }
      state.changed = true;
    },
    removeFromCart(state, action) {
      const item = action.payload;
      const existingItemIndex = state.items.findIndex(
        (element) => element.title === item.title
      );

      if (state.items[existingItemIndex].quantity <= 1) {
        state.items.splice(existingItemIndex, 1);
        state.totalAmount -= item.price;
      } else {
        state.items[existingItemIndex].quantity--;
        state.items[existingItemIndex].totalPrice -= item.price;
        state.totalAmount -= item.price;
      }
      state.changed = true;
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.changed = true;
    },
    loadCart(state, action) {
      if (action.payload.items) {
        state.items = action.payload.items;
      }
      if (action.payload.totalAmount) {
        state.totalAmount = action.payload.totalAmount;
      }
    },
  },
});

export const cartSliceActions = cartSlice.actions;
export default cartSlice.reducer;
