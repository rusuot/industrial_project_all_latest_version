/** @format */

import { createContext, useReducer } from "react";
const WishContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  deleteItem: () => {},
  clearWish: () => {},
});
function wishReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const updatedItem = {
        ...state.items[existingCartItemIndex],
        quantity: state.items[existingCartItemIndex].quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "DELETE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const updatedItems = [...state.items];
    updatedItems.splice(existingCartItemIndex, 1);
    return { ...state, items: updatedItems };
  }
  if (action.type === "CLEAR_WISH") {
    return { ...state, items: [] };
  }
  return state;
}
export function WishContextProvider({ children }) {
  const [wish, dispatchWishAction] = useReducer(wishReducer, { items: [] });

  function addItem(item) {
    dispatchWishAction({ type: "ADD_ITEM", item: item });
  }
  function removeItem(id) {
    dispatchWishAction({ type: "REMOVE_ITEM", id: id });
  }
  function deleteItem(id) {
    dispatchWishAction({ type: "DELETE_ITEM", id: id });
  }
  function clearWish() {
    dispatchWishAction({ type: "CLEAR_WISH" });
  }
  const cartContext = {
    items: wish.items,
    addItem: addItem,
    removeItem: removeItem,
    deleteItem: deleteItem,
    clearWish: clearWish,
  };
  return (
    <WishContext.Provider value={cartContext}>{children}</WishContext.Provider>
  );
}
export default WishContext;
