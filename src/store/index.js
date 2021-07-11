import { applyMiddleware, compose, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

const uiInitialState = {
  isCartVisible: false,
  notification: null,
};
const uiReducer = (state = uiInitialState, action) => {
  if (action.type === "TOGGLE") {
    return {
      ...state,
      isCartVisible: !state.isCartVisible,
    };
  }
  if (action.type === "SHOW_NOTIFICATION") {
    return {
      ...state,
      notification: {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      },
    };
  }
  return state;
};

const cartState = {
  items: [],
  totalQuantity: 0,
  changed: false,
};

const cartReducer = (state = cartState, action) => {
  if (action.type === "REPLACE_CART") {
    return {
      items: action.payload.items,
      totalQuantity: action.payload.totalQuantity,
    };
  }
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
      changed: true,
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
      changed: true,
    };
  }
  return state;
};

const rootReducer = combineReducers({
  cartVisible: uiReducer,
  cart: cartReducer,
});
const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;
