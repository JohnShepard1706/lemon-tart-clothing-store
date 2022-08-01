import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Design/NavBar";
import HotItems from "./components/Items/HotItems";
import RecentItems from "./components/Items/RecentItems";
import OnSaleItems from "./components/Items/OnSaleItems";
import Footer from "./components/Design/Footer";
import { useSelector } from "react-redux";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import ProductItem from "./components/Items/ProductItem";
import { Fragment } from "react";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import { useEffect } from "react";
import { updateCartHandler } from "./store/cart-actions";
import SearchPage from "./pages/SearchPage";
import AllProductsPage from "./pages/AllProductsPage";

let initialState = true;
function App() {
  const cart = useSelector((state) => state.cart);
  const userID = useSelector((state) => state.auth.userID);

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
      <Navbar />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route
          element={<ProductDetail />}
          path="/products/:itemCategory/:productTitle"
        />
        <Route element={<CartPage />} path="/cart" />
        <Route element={<SearchPage />} path="/products/:searchInput" />
        <Route element={<AllProductsPage />} path="/products" />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
