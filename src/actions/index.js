import axios from "axios";
import { browserHistory } from "react-router";
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from "./types";
import config from "../../config";
const API_URL = config.API_URL;

export function signinUser({ email, password }) {
  return (dispatch) => {
    //Submit email/password to the server
    axios.post(`${API_URL}/signin`, { email, password })
      .then((response) => {
        //If Request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem("nflevate_token", response.data.token);
        // - Redirect to the route "/feature"
        browserHistory.push("/draft");
      })
      .catch(() => {
        //If Request is bad...
        // - Show an error to the user
        dispatch(authError("Invalid Login Credentials"));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem("nflevate_token", response.data.token);
        browserHistory.push("/draft");
      })
      .catch(response => {
        dispatch(authError(response.data.error));
      })
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  console.log("signout");
  localStorage.removeItem("nflevate_token");
  return {
    type: UNAUTH_USER
  };
}
