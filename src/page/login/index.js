import React, { useEffect, useReducer, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "../../css/login.css";
import logo from "../../assets/images/logo.png";

const initialState = {
  username: "",
  password: "",
  error: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_LOGIN":
      return { ...state, login: !state.login };
    case "SET_SIGNIN_FIELD":
      return {
        ...state,
        signInForm: { ...state.signInForm, [action.field]: action.value },
      };
    case "SET_SIGNUP_FIELD":
      return {
        ...state,
        signUpForm: { ...state.signUpForm, [action.field]: action.value },
      };
    case "RESET_FORM":
      return {
        ...state,
        signInForm: initialState.signInForm,
        signUpForm: initialState.signUpForm,
      };
    case "SET_ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
}

const LoginPage = (props) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const { login } = useContext(AuthContext);
  const { redirect } = props;
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);

  const signUp = (values) => {
    const signUpData = {
      username: state.signUpForm.username,
      email: state.signUpForm.email,
      password: state.signUpForm.password,
    };
    if (state.signUpForm.password !== state.signUpForm.passwordAgain) {
      dispatch({
        type: "SET_ERROR",
        error: "Passwords do not match.",
      });
      return;
    }

    api
      .signUpUser(signUpData)
      .then((res) => {
        localStorage.setItem("access_token", res.data);

        setTimeout(() => {
          login();
          navigate("/");
        }, 500);
      })
      .catch((e) => {
        dispatch({
          type: "SET_ERROR",
          error: e.response.data,
        });
      });
  };


  const signIn = (values) => {
    api
      .loginUser(values)
      .then((res) => {
        localStorage.setItem("access_token", res.data);
        navigate(redirect ? redirect : "/");
        login();
      })
      .catch((e) => {
        dispatch({ type: "SET_ERROR", error: true });
        dispatch({ type: "SET_ERRORS", errors: e.response.data });
      });
  };

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      console.log("login");
      login();
      navigate("/");
    }
  }, [login, navigate]);

  return (
    <div className="login">




      <div
        className={`login__colored-container ${
          state.login
            ? "login__colored-container--left"
            : "login__colored-container--right"
        }`}
      ></div>
      <div
        className={`login__welcome-back ${
          state.login
            ? "login__welcome-back--active"
            : "login__welcome-back--inactive"
        }`}
      >
        <div className="login__welcome-back__logo-container">
          <img
            className="login__welcome-back__logo-container--image"
            src={logo}
            alt=" Drop Note"
          />
          Drop Note
        </div>
        <div className="login__welcome-back__main-container">
          <div className="login__welcome-back__main-container__text-container">
            <span className="login__welcome-back__main-container__text-container--title">
              Already a member?
            </span>
            <span className="login__welcome-back__main-container__text-container--secondary">
              To keep connected with us please login with your personal info
            </span>
          </div>
          <div
            onClick={() => {
              dispatch({ type: "RESET_FORM" });
              dispatch({ type: "TOGGLE_LOGIN" });
            }}
            className="login__welcome-back__main-container__button-container"
          >
            Sign In
          </div>
        </div>
      </div>
      <div
        className={`login__create-container ${
          state.login
            ? "login__create-container--active"
            : "login__create-container--inactive"
        }`}
      >
        Create Account

        <span className="login__create-container--info-text">
          or use email for your registration
        </span>
        <div className="login__create-container__form-container">
          <form
            className="login__create-container__form-container__form"
            onSubmit={(e) => {
              e.preventDefault();
              signUp();
            }}
          >
            <input
              className="login__create-container__form-container__form--name"
              type="text"
              placeholder="Username"
              value={state?.signUpForm?.username}
              onChange={(value) =>
                dispatch({
                  type: "SET_SIGNUP_FIELD",
                  field: "username",
                  value: value.target.value,
                })
              }
              required
            />
            <input
              className="login__create-container__form-container__form--email"
              type="email"
              placeholder="Email"
              value={state?.signUpForm?.email}
              onChange={(value) =>
                dispatch({
                  type: "SET_SIGNUP_FIELD",
                  field: "email",
                  value: value.target.value,
                })
              }
              required
            />
            <input
              className="login__create-container__form-container__form--password"
              type="password"
              placeholder="Password"
              value={state?.signUpForm?.password}
              onChange={(value) =>
                dispatch({
                  type: "SET_SIGNUP_FIELD",
                  field: "password",
                  value: value.target.value,
                })
              }
              required
            />
            <input
              className="login__create-container__form-container__form--password"
              type="password"
              placeholder="Password Again"
              value={state?.signUpForm?.passwordAgain}
              onChange={(value) =>
                dispatch({
                  type: "SET_SIGNUP_FIELD",
                  field: "passwordAgain",
                  value: value.target.value,
                })
              }
              required
            />
            {state.error && (
              <div className="error-message fade-in">
                <span className="error-message__icon">⚠️</span>
                <span className="error-message__text">{state.error}</span>
              </div>
            )}
            <button className="login__create-container__form-container__form--submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div
        className={`login__login-container ${
          !state.login
            ? "login__login-container--active"
            : "login__login-container--inactive"
        }`}
      >
        <div className="login__login-container__logo-container">
          <img
            className="login__login-container__logo-container--image"
            src={logo}
            alt=" Drop Note"
          />
          Drop Note
        </div>
        <div className="login__login-container__main-container">
          <div className="login__login-container__main-container__social-container">
          </div>
          <span className="login__login-container__main-container--info-text">
            or use email for your login
          </span>
          <div className="login__login-container__main-container__form-container">
            <form
              className="login__login-container__main-container__form-container__form"
              onSubmit={(e) => {
                e.preventDefault();
                signIn(state.signInForm);
              }}
            >
              <input
                className="login__login-container__main-container__form-container__form--email"
                type="email"
                placeholder="Email"
                value={state?.signInForm?.email}
                onChange={(value) =>
                  dispatch({
                    type: "SET_SIGNIN_FIELD",
                    field: "email",
                    value: value.target.value,
                  })
                }
                required
              />
              <input
                className="login__login-container__main-container__form-container__form--password"
                type="password"
                placeholder="Password"
                value={state?.signInForm?.password}
                onChange={(value) =>
                  dispatch({
                    type: "SET_SIGNIN_FIELD",
                    field: "password",
                    value: value.target.value,
                  })
                }
                required
              />
              {state.error && (
                <div className="error-message fade-in">
                  <span className="error-message__icon">⚠️</span>
                  <span className="error-message__text">
                    Incorrect email or password
                  </span>
                </div>
              )}

              <button className="login__login-container__main-container__form-container__form--submit">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        className={`login__hello-container ${
          !state.login
            ? "login__hello-container--active"
            : "login__hello-container--inactive"
        }`}
      >
        <div className="login__welcome-back__main-container__text-container">
          <span className="login__welcome-back__main-container__text-container--title">
            Hello, stranger!
          </span>
          <span className="login__welcome-back__main-container__text-container--secondary">
            Join us today! It takes only few steps to create your account
          </span>
        </div>
        <div
          onClick={() => {
            dispatch({ type: "RESET_FORM" });
            dispatch({ type: "TOGGLE_LOGIN" });
          }}
          className="login__welcome-back__main-container__button-container"
        >
          Sign Up
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
