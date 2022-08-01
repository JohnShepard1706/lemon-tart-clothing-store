import { Fragment, useEffect } from "react";
import { ProgressBar, ButtonGroup, Button } from "react-bootstrap";
import { Stars } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { updateCartHandler } from "../../store/cart-actions";
import { cartSliceActions } from "../../store/cart-slice";
import classes from "./CartDetail.module.css";

let initialState = true;
const CartDetail = () => {
  const classPBar = `${classes.pbar} bar`;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userID = useSelector((state) => state.auth.userID);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const addToCartHandler = (title, price) => {
    dispatch(
      cartSliceActions.addToCart({
        title: title,
        price: price,
        quantity: 1,
        // desc: product.desc,
        // link: product.link,
      })
    );
  };

  const removeFromCartHandler = (title, price) => {
    dispatch(
      cartSliceActions.removeFromCart({
        title: title,
        price: price,
        // desc: product.desc,
        // link: product.link,
        // quantity: 1,
      })
    );
  };

  const clearCartHandler = () => {
    dispatch(cartSliceActions.clearCart());
  };

  useEffect(() => {
    if (initialState) {
      initialState = false;
      return;
    }
    if (cart.changed) {
      updateCartHandler(userID, cart);
    }
  }, [cart]);

  return (
    <Fragment>
      <div className={classes.heading}>
        <h4>YOUR CART</h4>
      </div>

      {!isLoggedIn && (
        <h1 className={classes.empty}>
          Please login/register to use the cart feature!
        </h1>
      )}
      {!cart.items.length && isLoggedIn && (
        <h1 className={classes.empty}>Cart is empty!</h1>
      )}
      {cart.items.length && isLoggedIn && (
        <Fragment>
          <div className={classes.table}>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => (
                  <tr>
                    <td>
                      <img src={item.link} alt="thumbnail" />
                    </td>
                    <td>{item.desc}</td>
                    <td>Rs. {item.price}</td>
                    <td className={classes.incdec}>
                      <ButtonGroup size="sm" aria-label="Third group">
                        <Button
                          variant="warning"
                          onClick={addToCartHandler.bind(
                            null,
                            item.title,
                            item.price
                          )}
                        >
                          +
                        </Button>
                        <input
                          type="number"
                          readonly="readonly"
                          value={item.quantity}
                        />
                        <Button
                          variant="warning"
                          onClick={removeFromCartHandler.bind(
                            null,
                            item.title,
                            item.price
                          )}
                        >
                          -
                        </Button>
                      </ButtonGroup>
                    </td>
                    <td>Rs. {item.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <button onClick={clearCartHandler}>CLEAR CART</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className={classes.row}>
            <div className={classes.column}>
              <p>SPECIAL INSTRUCTIONS FOR SELLER</p>
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div className={classes.column}>
              <p>CART TOTALS</p>
              <table>
                <thead>
                  <tr>
                    <th>Cart Totals</th>
                    <th>Rs. {cart.totalAmount}</th>
                  </tr>
                </thead>
              </table>
              <span>
                <ProgressBar
                  className={classPBar}
                  striped
                  variant="success"
                  animated
                  now={100}
                />
              </span>
              <span className={classes["free-shipping"]}>
                <p>
                  <Stars /> CONGRATULATIONS! YOU'VE GOT FREE SHIPPING!
                </p>
              </span>
              <table>
                <thead>
                  <tr>
                    <th>Coupon:</th>
                    <th>
                      <input
                        className={classes.coupon}
                        type="text"
                        placeholder="Coupon Code"
                      />
                    </th>
                  </tr>
                </thead>
              </table>
              <p className={classes.warning}>
                * The final price with your coupon code will apply in Checkout
                page
              </p>
              <p className={classes.warning}>
                * All charges are billed in PKR. While the content of your cart
                is currently displayed in PKR, the checkout will use PKR at the
                most current exchange rate.
              </p>
              <div className={classes.terms}>
                <input type="checkbox" name="" id="terms" />
                <label htmlFor="terms">
                  I agree with the terms and conditions.
                </label>
                <button>PROCEED TO CHECKOUT</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default CartDetail;
