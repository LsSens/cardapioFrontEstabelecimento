//import { useNavigate } from "react-router-dom";

import {
  formatError,
  login,
  runLogoutTimer,
  saveTokenInLocalStorage,
  signUp,
} from "../../services/AuthService";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";
export const UPDATE_IFOOD_INTEGRATION_ACTION = 'UPDATE_IFOOD_INTEGRATION_ACTION';

export function signupAction(data, navigate) {
  return (dispatch) => {
    signUp(data)
      .then((response) => {
        saveTokenInLocalStorage(response.data);
        runLogoutTimer(dispatch, response.data.expiresIn * 1000, navigate);
        dispatch(confirmedSignupAction(response.data));
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data || 'erro');
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function Logout(navigate) {
  localStorage.removeItem("userDetails");
  navigate("/login");

  return {
    type: LOGOUT_ACTION,
  };
}

export function loginAction(email, password, navigate) {
  return (dispatch) => {
    login(email, password)
      .then((response) => {
        saveTokenInLocalStorage(response.data);
        runLogoutTimer(dispatch, response.data.expiresIn * 1000, navigate);
        dispatch(loginConfirmedAction(response.data));
        //console.log('kk------1');
        //console.log(kk);
        //console.log(response.data);
        //console.log('kk------2');
        //return response.data;
        //return 'success';
        //history.push('/dashboard');
        navigate("/restaurant");
      })
      .catch((error) => {
        const errorMessage = error.response.data.error;
        dispatch(loginFailedAction(errorMessage));
      });
  };
}


export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}

export function updateIfoodIntegrationAction(status) {
  return {
    type: UPDATE_IFOOD_INTEGRATION_ACTION,
    payload: status,
  };
}