//import { useNavigate } from "react-router-dom";

import {
  formatError,
  login,
  runLogoutTimer,
  saveTokenInLocalStorage,
  signUp,
} from "../../services/AuthService";

export const MENU_REDIRECT_ACTION = "[Menu action] redirected menu";

// export function signupAction(email, password, navigate) {
//   return (dispatch) => {
//     signUp(email, password)
//       .then((response) => {
//         saveTokenInLocalStorage(response.data);
//         runLogoutTimer(dispatch, response.data.expiresIn * 1000);
//         dispatch(confirmedSignupAction(response.data));
//         navigate("/dashboard");
//       })
//       .catch((error) => {
//         const errorMessage = formatError(error.response.data);
//         dispatch(signupFailedAction(errorMessage));
//       });
//   };
// }

// export function Logout(navigate) {
//   localStorage.removeItem("userDetails");
//   navigate("/login");

//   return {
//     type: LOGOUT_ACTION,
//   };
// }

// export function loginAction(email, password, navigate) {
//   return (dispatch) => {
//     login(email, password)
//       .then((response) => {
//         saveTokenInLocalStorage(response.data);
//         runLogoutTimer(dispatch, response.data.expiresIn * 1000, navigate);
//         dispatch(loginConfirmedAction(response.data));
//         //console.log('kk------1');
//         //console.log(kk);
//         //console.log(response.data);
//         //console.log('kk------2');
//         //return response.data;
//         //return 'success';
//         //history.push('/dashboard');
//         navigate("/dashboard");
//       })
//       .catch((error) => {
//         const errorMessage = error.response.data.error;
//         dispatch(loginFailedAction(errorMessage));
//       });
//   };
// }

export function redirectToMenuAction(data) {
  return {
    type: MENU_REDIRECT_ACTION,
    payload: data,
  };
}