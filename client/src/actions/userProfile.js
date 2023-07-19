import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";
import axios from "axios";

// UPDATE PROFILE
export const updateProfile =
  ({ name, email, avatar }) =>
  async (dispatch) => {
    // try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const response = await fetch("http://localhost:4000/api/v1/me/update", {
      method: "PUT",
      body: JSON.stringify({ email: email, name: name, avatar: avatar }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    console.log(result);

    result.success === false
      ? dispatch({ type: UPDATE_PROFILE_FAIL, payload: result.error })
      : dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: result.success });

  };

export const updatePassword =
  ({ oldPassword, newPassword, confirmPassword }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
      const response = await fetch(
        "http://localhost:4000/api/v1/password/update",
        {
          method: "PUT",
          body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          }),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await response.json();
      console.log(result);

      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: result.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error,
      });
    }
  };

export const asdsad =
  ({ oldPassword, newPassword, confirmPassword }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/password/update`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(data);
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.error,
      });
    }
  };

// Clearing Error
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
