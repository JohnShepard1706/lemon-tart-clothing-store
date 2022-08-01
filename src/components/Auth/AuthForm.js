import { useRef } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../../store/auth-slice";
import { PersonCircle, XLg } from "react-bootstrap-icons";
import classes from "./AuthForm.module.css";
import { addUserHandler, loginUserHandler } from "../../store/auth-actions";

const AuthForm = (props) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const nameInputRef = useRef("");
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  // console.log(nameInputRef.current, emailInputRef.current);

  const loginHandler = (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    dispatch(loginUserHandler(email, password));
  };

  const registerHandler = (event) => {
    event.preventDefault();
    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    dispatch(addUserHandler(name, email, password));
  };

  return (
    <Fragment>
      <div className={classes.modal}>
        <div className={classes.heading}>
          <h4>{props.formChange ? "SIGN UP" : "SIGN IN"}</h4>
          <span onClick={props.closeMenu}>
            <XLg size={25} />
          </span>
        </div>
        <form onSubmit={props.formChange ? registerHandler : loginHandler}>
          <div className={classes.credentials}>
            {props.formChange && (
              <Fragment>
                <label htmlFor="fname">First Name</label>
                <input id="fname" type="text" ref={nameInputRef} required />
                <label htmlFor="lname">Last Name </label>
                <input id="lname" type="text" required />
              </Fragment>
            )}
            <label htmlFor="email">Email </label>
            <input id="email" type="email" ref={emailInputRef} required />
            <label htmlFor="password">Password </label>
            <input
              id="password"
              type="password"
              ref={passwordInputRef}
              required
            />
            <button type="submit" className={classes.confirm}>
              {props.formChange ? "REGISTER" : "LOGIN"}
            </button>

            <hr />

            <PersonCircle size={40} />
            <br />
            <h6>No account yet?</h6>
            <p style={{ color: error ? "red" : "#a0b71e" }}>
              {error
                ? error
                : "Registering for this site allows you to access your order status andhistory. Just fill in the fields below, and we'll get a new account set up for you in no time. We will only ask you for information necessary to make the purchase process faster and easier."}
            </p>
            <button
              type="button"
              onClick={props.formChange ? props.showLogin : props.showRegister}
              className={classes.switch}
            >
              {props.formChange ? "Login" : "Register"}
            </button>
          </div>
        </form>
      </div>
      <div onClick={props.closeMenu} className={classes.backdrop}></div>
    </Fragment>
  );
};
export default AuthForm;
