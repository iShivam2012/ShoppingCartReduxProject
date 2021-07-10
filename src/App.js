import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let inital = true;
function App() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.cartVisible.notification);

  useEffect(() => {
    const sendRequest = async () => {
      if (inital) {
        inital = false;
        return;
      }
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          status: "pending",
          title: "Sending...",
          message: "Sending the cart data",
        },
      });
      const response = await fetch(
        "https://foodorderingappv1-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          status: "success",
          title: "Success!",
          message: "Sent the cart data successfully!",
        },
      });
    };
    sendRequest().catch((error) => {
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          status: "error",
          title: "Error!",
          message: "Error occurred",
        },
      });
    });
  }, [cart]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        <Cart />
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
