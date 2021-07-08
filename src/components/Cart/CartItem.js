import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { id, title, quantity, total, price } = props.item;

  const addHandler = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id,
        quantity: 1,
        title,
        price,
      },
    });
  };

  const removeHandler = () => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: {
        id,
      },
    });
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeHandler}>-</button>
          <button onClick={addHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
