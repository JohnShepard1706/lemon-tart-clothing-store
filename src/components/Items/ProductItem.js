import { useState, useEffect, useRef, Fragment } from "react";
import { Card, Col, ProgressBar, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Person } from "react-bootstrap-icons";
import { cartSliceActions } from "../../store/cart-slice";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./ProductItem.module.css";

const ProductItem = () => {
  const dispatch = useDispatch();
  const quantityInputRef = useRef();

  const { itemCategory, productTitle } = useParams();

  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState("");
  const [switchTabs, setSwitchTabs] = useState(true);
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const stock = randomIntFromInterval(10, 25);
  const visitor = randomIntFromInterval(400, 500);
  const today = new Date();
  const onSale = itemCategory === "onSale";

  const setClockLink = () => {
    // console.log("date changed");
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow = tomorrow.toISOString().slice(0, 10);
    setLink(
      `https://free.timeanddate.com/countdown/i8buou0e/n757/cf12/cm0/cu4/ct5/cs0/ca0/co0/cr0/ss0/cac000/cpc000/pcfff/tcfbd9e8/fn3/fs200/szw320/szh135/iso${tomorrow}T00:00:00`
    );
  };

  const fetchItems = async () => {
    setLoading(true);
    const response = await fetch(
      `https://lemontart-store-default-rtdb.firebaseio.com/${itemCategory}.json`
    );

    const responseData = await response.json();
    const currentSuit = responseData[productTitle];

    delete responseData[productTitle];

    setProduct(currentSuit);
    setRelatedProducts(Object.values(responseData));

    setLoading(false);
  };

  useEffect(() => {
    setClockLink();
  }, [today.getDate()]);

  useEffect(() => {
    fetchItems();
  }, [productTitle]);

  const addToCartHandler = () => {
    const itemQuantity = quantityInputRef.current.value;
    if (itemQuantity >= 1) {
      dispatch(
        cartSliceActions.addToCart({
          title: product.title,
          desc: product.desc,
          price: product.price,
          link: product.link,
          quantity: +itemQuantity,
        })
      );
    }
  };

  return (
    <div className={classes.row}>
      <div
        className={`${classes.column} ${classes.column1}`}
        // style={{ "background-color": "#aaa" }}
      >
        {loading ? (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        ) : (
          <img src={product.link} alt="Product" />
        )}
      </div>
      <div
        className={`${classes.column} ${classes.column2}`}
        // style={{ "background-color": "#bbb" }}
      >
        {loading ? (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        ) : (
          <Fragment>
            <h3>{product.title}</h3>
            <h4 className={classes.descrip}>{product.desc}</h4>

            {onSale && (
              <h5 className={classes.redprice}>Rs. {product.redprice}</h5>
            )}
            {!onSale && <h5 className={classes.price}>Rs. {product.price}</h5>}
            <h5 className={classes.sold}>
              {randomIntFromInterval(100, 150)} sold in the last 24 hours
            </h5>
            <p className={classes.text}>
              This all new Unstitched Kurti is made of linen. It is 2.5 meters.
            </p>
            <h6 className={classes.hurry}>
              HURRY! ONLY {stock} LEFT IN STOCK.
            </h6>
            <ProgressBar
              className={classes.bar}
              striped
              variant="success"
              animated
              now={stock}
            />
            <div className={classes.time}>
              <iframe
                src={link}
                allowtransparency="true"
                frameborder="0"
                width="352"
                height="54"
              ></iframe>
            </div>
            <input
              className={classes.quantity}
              defaultValue="1"
              min={1}
              ref={quantityInputRef}
              type="number"
            />
            <button
              className={`${classes.buy} ${classes.yellow}`}
              onClick={addToCartHandler}
            >
              ADD TO CART
            </button>
            <button className={`${classes.buy} ${classes.green}`}>
              BUY NOW
            </button>
            <h6 className={classes.visitor}>
              Real time{" "}
              <span className={classes.visitorNo}>
                {visitor}
                <Person size={17} />
              </span>{" "}
              visitors right now
            </h6>
          </Fragment>
        )}
      </div>
      <div className={classes.description}>
        <span>
          <button
            onClick={() => setSwitchTabs(true)}
            style={{ color: `${switchTabs ? "#f7db02" : "black"}` }}
          >
            DESCRIPTION
          </button>
        </span>
        <span>
          <button
            onClick={() => setSwitchTabs(false)}
            style={{ color: `${!switchTabs ? "#f7db02" : "black"}` }}
          >
            CUSTOM TAB
          </button>
          <div>
            {switchTabs && (
              <p>
                This all new Unstitched Kurti is made of linen. It is 2.5
                meters.
              </p>
            )}
            {!switchTabs && (
              <Fragment>
                <img
                  src="https://cdn.shopify.com/s/files/1/2588/5532/files/care-icon.png?4014196417434054677"
                  alt="warnings"
                />
                <br />
                <br />
                <p>
                  LT01: 70% wool, 15% polyester, 10% polyamide, 5% acrylic 900
                  Grms/mt
                </p>
              </Fragment>
            )}
          </div>
        </span>
      </div>
      <div className={classes["related-products"]}>
        <h4>Related products</h4>
        <p>Top seller in the week</p>

        {loading ? (
          <div className={classes["related-loading"]}>
            <LoadingSpinner />
          </div>
        ) : (
          <Row xs={1} md={2} lg={2} xl={3} className="g-4">
            {relatedProducts.map((product) => (
              <Col>
                <Card>
                  <div className={classes.relimage}>
                    <Card.Img variant="top" src={product.link} />
                  </div>
                  <Card.Body>
                    <Link to={`/products/${itemCategory}/${product.title}`}>
                      <Card.Title>{product.title}</Card.Title>
                    </Link>
                    <br />
                    <Card.Text>{product.desc}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">Rs. {product.price}</small>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};
export default ProductItem;
