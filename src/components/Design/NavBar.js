import { useState, Fragment } from "react";
import {
  Facebook,
  Twitter,
  Pinterest,
  Instagram,
  Snapchat,
} from "react-bootstrap-icons";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserHandler } from "../../store/auth-actions";
import { NavLink } from "react-router-dom";
import { Search } from "react-bootstrap-icons";
import AuthForm from "../Auth/AuthForm";
import classes from "./Navbar.module.css";

function NavBar() {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.username);
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  const [registerMenu, setRegisterMenu] = useState(true);

  const showRegisterMenu = () => {
    setShowAuthMenu(true);
    setRegisterMenu(true);
  };

  const showLoginMenu = () => {
    setShowAuthMenu(true);
    setRegisterMenu(false);
  };

  const logoutHandler = () => {
    dispatch(logoutUserHandler());
  };

  const closeMenu = () => {
    setShowAuthMenu(false);
  };

  const searchInputHandler = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <Fragment>
      <nav className={classes.darkNav}>
        <Container>
          <Row>
            <Col className={classes.col}>
              <div className={classes["social-handles"]}>
                <a className={classes.first} href="#home">
                  <Facebook />
                </a>
                <a href="#home">
                  <Twitter />
                </a>
                <a href="#home">
                  <Pinterest />
                </a>
                <a href="#home">
                  <Instagram />
                </a>
                <a href="#home">
                  <Snapchat />
                </a>
              </div>
            </Col>
            <Col className={classes.col}>
              <div className={classes.text}>
                <h5 href="#home">PKR 250 is delivery cost all over Pakistan</h5>
              </div>
            </Col>
            <Col className={classes.col}>
              {/* <span>
                <a href="#home">
                  <Coin />
                </a>{" "}
                PKR
              </span> */}
              {username && <span>Welcome, {username}</span>}
            </Col>
          </Row>
        </Container>
      </nav>

      <div className={classes.sticky}>
        <ul>
          <li>
            <img
              src="https://cdn.shopify.com/s/files/1/0259/1427/7936/files/logo_text_200x.jpg?v=1562960893"
              alt="logo"
            />
          </li>
          <li className={classes.home}>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/"
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/products"
            >
              CLOTHING
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/cart"
            >
              CART
            </NavLink>
          </li>

          {isLoggedIn ? (
            <li>
              <NavLink
                onClick={logoutHandler}
                // className={({ isActive }) => (isActive ? classes.active : "")}
                to="/"
              >
                LOGOUT
              </NavLink>
            </li>
          ) : (
            <Fragment>
              <li>
                <NavLink
                  onClick={showRegisterMenu}
                  // className={({ isActive }) => (isActive ? classes.active : "")}
                  to="/"
                >
                  REGISTER
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={showLoginMenu}
                  // className={({ isActive }) => (isActive ? classes.active : "")}
                  to="/"
                >
                  LOGIN
                </NavLink>
              </li>
            </Fragment>
          )}

          <li className={classes.search}>
            <input
              type="text"
              placeholder="Search.."
              onBlur={searchInputHandler}
            />
            {/* <button> */}
            <NavLink
              // className={({ isActive }) => (isActive ? classes.active : "")}
              to={`/products/${searchInput}`}
            >
              <Search size={25} />
            </NavLink>
            {/* </button> */}
          </li>
        </ul>
      </div>

      {showAuthMenu && (
        <AuthForm
          showLogin={showLoginMenu}
          showRegister={showRegisterMenu}
          closeMenu={closeMenu}
          formChange={registerMenu}
        />
      )}
    </Fragment>
  );
}
export default NavBar;
