import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./SearchItems.module.css";

const AllItems = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);

  const filterProducts = async () => {
    setIsLoading(true);
    const allProducts = await fetch(
      "https://lemontart-store-default-rtdb.firebaseio.com/allProducts.json"
    );
    const allProductsData = await allProducts.json();
    const transformedProducts = Object.values(allProductsData);
    transformedProducts.sort((a, b) => a.key - b.key);
    setResults(transformedProducts);
    setIsLoading(false);
  };

  useEffect(() => {
    filterProducts();
  }, []);

  return (
    <Fragment>
      <div className={classes["all-products"]}>
        <div className={classes["grid-title"]}>
          <h2>All Products</h2>
        </div>
        {isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}
        <div className={`${classes["product-grid"]} ${classes["grid-3"]}`}>
          {results.map((product) => (
            <div className={classes["product-item"]}>
              <div className={classes["product-single"]}>
                <div className={classes["product-img"]}>
                  <img src={product.link} alt="Product Image" />
                </div>
                <div className={classes["product-content"]}>
                  <div className={classes["product-title"]}>
                    <h2>
                      <Link
                        to={`/products/${product.category}/${product.title}`}
                      >
                        {product.title}
                      </Link>
                    </h2>
                  </div>
                  <div className={classes["product-ratting"]}>
                    <p>Rs. {product.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
export default AllItems;
