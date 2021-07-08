import { combineReducers, createStore } from "redux";

const uiInitialState = {
  isCartVisible: false,
};
const uiReducer = (state = uiInitialState, action) => {
  if (action.type === "TOGGLE") {
    return {
      isCartVisible: !state.isCartVisible,
    };
  }
  return state;
};

const cartState = {
  items: [],
  totalQuantity: 0,
};

const cartReducer = (state = cartState, action) => {
  if (action.type === "ADD_ITEM") {
    const newItem = action.payload;
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === newItem.id
    );
    const existingItem = state.items[existingItemIndex];
    let updatedItem;
    let updatedItems = [...state.items];
    if (existingItem) {
      updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + newItem.quantity,
        totalAmount: existingItem.totalAmount + newItem.price,
      };
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      let updatedItem = { ...newItem, totalAmount: newItem.price };
      updatedItems = updatedItems.concat(updatedItem);
    }
    return {
      items: updatedItems,
      totalQuantity: state.totalQuantity + 1,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const newItem = action.payload;
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === newItem.id
    );
    const existingItem = state.items[existingItemIndex];
    let updatedItem;
    let updatedItems;
    if (existingItem.quantity === 1) {
      updatedItems = state.items.filter((item) => item.id !== newItem.id);
    } else {
      updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
        totalAmount: existingItem.totalAmount - existingItem.price,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalQuantity: state.totalQuantity - 1,
    };
  }
  return state;
};

const rootReducer = combineReducers({
  cartVisible: uiReducer,
  cart: cartReducer,
});
const store = createStore(rootReducer);

export default store;
