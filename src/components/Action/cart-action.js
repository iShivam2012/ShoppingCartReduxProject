export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_NOTIFICATION",
      payload: {
        status: "pending",
        title: "Sending...",
        message: "Sending the cart data",
      },
    });

    const sendRequest = async () => {
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
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://foodorderingappv1-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const cartData = await response.json();
      return cartData;
    };
    try {
      const cart = await fetchData();
      dispatch({
        type: "REPLACE_CART",
        payload: {
          items: cart.items || [],
          totalQuantity: cart.totalQuantity,
        },
      });
    } catch (error) {
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          status: "error",
          title: "Error!",
          message: "Error occurred",
        },
      });
    }
  };
};
