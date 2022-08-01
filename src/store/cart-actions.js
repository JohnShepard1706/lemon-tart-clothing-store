// import { cartSliceActions } from "./cart-slice";
// import { useSelector } from "react-redux";

export const updateCartHandler = async (uID, cart) => {
  const response = await fetch(
    `https://lemontart-store-default-rtdb.firebaseio.com/cartData/${uID}.json`,
    {
      method: "PUT",
      body: JSON.stringify(cart),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseData = await response.json();
  // console.log(responseData);
};
