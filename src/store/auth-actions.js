import { authSliceActions } from "./auth-slice";
import { cartSliceActions } from "./cart-slice";

export const loginUserHandler = (email, password) => {
  return async (dispatch) => {
    dispatch(authSliceActions.setError({ error: null }));

    const sendRequest = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDIst_s7jtHulDwLPVOJFxYlhik7lZd0FQ",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        // console.log(responseData.error.message);
        throw new Error(responseData.error.message);
      }
      const responseData = await response.json();
      return responseData;
    };

    try {
      const accountData = await sendRequest();
      // console.log(accountData["localId"]);
      dispatch(
        authSliceActions.login({
          userID: accountData["localId"],
          username: accountData["displayName"],
        })
      );
      try {
        const cart = await fetch(
          `https://lemontart-store-default-rtdb.firebaseio.com/cartData/${accountData["localId"]}.json`
        );
        const cartData = await cart.json();
        if (cartData) {
          // console.log(cartData);
          dispatch(cartSliceActions.loadCart(cartData));
        }
      } catch {
        console.log("Cart fetch failed!");
      }
      // console.log(accountData);
    } catch (error) {
      //   console.log(error.toString());
      dispatch(authSliceActions.setError({ error: error.toString() }));
    }
  };
};

export const addUserHandler = (name, email, password) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDIst_s7jtHulDwLPVOJFxYlhik7lZd0FQ",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        dispatch(
          authSliceActions.setError({ error: responseData.error.message })
        );
        return;
      }

      const responseData = await response.json();
      console.log(responseData);
      const updateResponse = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDIst_s7jtHulDwLPVOJFxYlhik7lZd0FQ",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: responseData.idToken,
            displayName: name,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const updateResponseData = await updateResponse.json();
      console.log(updateResponseData);
    };
    sendRequest();
  };
};

export const logoutUserHandler = () => {
  return async (dispatch) => {
    dispatch(authSliceActions.logout());
  };
};
