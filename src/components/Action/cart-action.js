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

    const sendRequest = () => {
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
