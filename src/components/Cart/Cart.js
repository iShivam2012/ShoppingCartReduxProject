import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const isShowCart = useSelector((state) => state.cartVisible.isCartVisible);
  const items = useSelector((state) => state.cart.items);

  return (
    isShowCart && (
      <Card className={classes.cart}>
        <h2>Your Shopping Cart</h2>
        <ul>
          {items.map((item) => (
            <CartItem
              item={{
                key: item.id,
                id: item.id,
                title: item.title,
                quantity: item.quantity,
                total: item.totalAmount,
                price: item.price,
              }}
            />
          ))}
        </ul>
      </Card>
    )
  );
};

export default Cart;
