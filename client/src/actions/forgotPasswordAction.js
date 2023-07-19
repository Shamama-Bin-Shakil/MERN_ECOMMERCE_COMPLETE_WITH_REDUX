import {
  CLEAR_ERRORS,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from "../constants/userConstants";
// import axios from "axios";

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: FORGET_PASSWORD_REQUEST });
  const response = await fetch("http://localhost:4000/api/v1/password/forgot", {
    method: "POST",
    body: JSON.stringify({ email: email }),
    headers: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  if (result.success === true) {
    dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: result.message });
  } else {
    dispatch({
      type: FORGET_PASSWORD_FAIL,
      payload: result.error,
    });
  }
};

export const resetPassword =
  ({ token, newPassword, confirmPassword }) =>
  async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const response = await fetch(
      `http://localhost:4000/api/v1/password/reset/${token}`,
      {
        method: "PUT",
        body: JSON.stringify({
          password: newPassword,
          confirmPassword: confirmPassword,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const result = await response.json();
    console.log(result);
    if (result.success === true) {
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: result.success });
    } else {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: result.error,
      });
    }
  };

// Clearing Error
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
