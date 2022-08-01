import React, { Fragment, useState, useRef } from "react";
import { ProgressBar } from "react-bootstrap";
import { EyeFill } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { cartSliceActions } from "../../store/cart-slice";
import ReactDom from "react-dom";
import "./Modal.css";

function ViewModal(props) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const quantityInputRef = useRef();

  const showModalHandler = () => {
    setShowModal(true);
  };

  const removeModalHandler = () => {
    setShowModal(false);
  };

  const addToCartHandler = () => {
    const itemQuantity = quantityInputRef.current.value;
    if (itemQuantity >= 1) {
      dispatch(
        cartSliceActions.addToCart({
          title: props.title,
          desc: props.desc,
          price: props.price,
          link: props.link,
          quantity: +itemQuantity,
        })
      );
    }
  };

  return (
    <Fragment>
      <button className="show-modal" onClick={showModalHandler}>
        <EyeFill />
      </button>

      {showModal &&
        ReactDom.createPortal(
          <div className="modal123">
            <button className="close-modal" onClick={removeModalHandler}>
              &times;
            </button>
            <div className="row">
              <div className="column">
                <img className="img" src={props.link} />
              </div>
              <div className="column">
                <h5 className="title">{props.desc}</h5>
                <h4>Rs. {props.price}</h4>
                <p className="description">
                  This all new 3 Piece Unstitched Suit is made of lawn. It
                  includes a 2.5 meter shirt and 2.5 meter Pants. 2.5 meter lawn
                  dupatta.
                </p>
                <input
                  className="quantity"
                  min={1}
                  ref={quantityInputRef}
                  defaultValue="1"
                  type="number"
                />
                <br />
                <button className="buy yellow" onClick={addToCartHandler}>
                  ADD TO CART
                </button>
                <br />
                <button className="buy green">BUY NOW</button>
                <p className="hurry">HURRY! ONLY 34 LEFT IN STOCK.</p>
                <ProgressBar
                  className="bar"
                  striped
                  variant="success"
                  animated
                  now={100}
                />
              </div>
            </div>
          </div>,
          document.getElementById("modal-root")
        )}

      {showModal &&
        ReactDom.createPortal(
          <div className="backdrop" onClick={removeModalHandler} />,
          document.getElementById("backdrop-root")
        )}
    </Fragment>
  );
}

export default ViewModal;
