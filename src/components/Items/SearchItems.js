import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./SearchItems.module.css";

const SearchItems = () => {
  const { searchInput } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);

  const filterProducts = async () => {
    setIsLoading(true);
    const searchInputLower = searchInput.toLowerCase();
    const allProducts = await fetch(
      "https://lemontart-store-default-rtdb.firebaseio.com/allProducts.json"
    );
    const allProductsData = await allProducts.json();
    const transformedProducts = Object.values(allProductsData);
    const result = transformedProducts.filter((product) =>
      product.title.toLowerCase().includes(searchInputLower)
    );
    setResults(result);
    setIsLoading(false);
  };

  useEffect(() => {
    filterProducts();
  }, [searchInput]);

  return (
    <Fragment>
      {isLoading && (
        <div className={classes.loading}>
          <LoadingSpinner />
        </div>
      )}
      {results.length === 0 && (
        <div className={classes["grid-title"]}>
          <h2 className={classes.empty}>No Search Results Found!</h2>
        </div>
      )}
      {results.length > 0 && (
        <div className={classes["all-products"]}>
          <div className={classes["grid-title"]}>
            <h2>You searched for "{searchInput}"</h2>
          </div>
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
      )}
    </Fragment>
  );
};

export default SearchItems;
