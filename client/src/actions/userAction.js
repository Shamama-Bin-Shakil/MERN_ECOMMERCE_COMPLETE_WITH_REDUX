import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  ALL_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../constants/userConstants";
import axios from "axios";

// Login
export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  const response = await fetch("http://localhost:4000/api/v1/login", {
    method: "POST",
    body: JSON.stringify({ email: email, password: password }),
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  const result = await response.json();

  if (result.success === true) {
    dispatch({ type: LOGIN_SUCCESS, payload: result.user });
  } else {
    dispatch({
      type: LOGIN_FAIL,
      payload: result.error,
    });
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const { data } = await axios.post(
      `http://localhost:4000/api/v1/register`,
      userData
    );
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Load User
export const LoadUserDetail = () => async (dispatch) => {
  dispatch({ type: LOAD_USER_REQUEST });
  const response = await fetch("http://localhost:4000/api/v1/me", {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  const result = await response.json();
  console.log(result);
  if (result.success === true) {
    dispatch({ type: LOAD_USER_SUCCESS, payload: result.user });
  } else {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: result.error,
    });
  }
};

// Logout User
export const logoutUser = () => async (dispatch) => {
  dispatch({ type: LOAD_USER_REQUEST });
  const response = await fetch("http://localhost:4000/api/v1/logout", {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();
  console.log(result);
  if (result.success === true) {
    dispatch({ type: LOGOUT_SUCCESS, payload: result.message });
  } else {
    dispatch({
      type: LOGOUT_FAIL,
      payload: result.error,
    });
  }
};

// GET ALL USER
export const getAllUser = () => async (dispatch) => {
  dispatch({ type: ALL_USER_REQUEST });
  const response = await fetch("http://localhost:4000/api/v1/admin/users", {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();
  console.log(result);
  if (result.success === true) {
    dispatch({ type: ALL_USER_SUCCESS, payload: result.users });
  } else {
    dispatch({
      type: ALL_USER_FAIL,
      payload: result.error,
    });
  }
};

// GET USER DETAIL
export const getUserDetails = (id) => async (dispatch) => {
  dispatch({ type: USER_DETAILS_REQUEST });
  const response = await fetch(
    `http://localhost:4000/api/v1/admin/user/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await response.json();
  console.log(result);
  if (result.success === true) {
    dispatch({ type: USER_DETAILS_SUCCESS, payload: result.user });
  } else {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: result.error,
    });
  }
};

// UPDATE USER
export const updateUser = (id, data) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  const response = await fetch(
    `http://localhost:4000/api/v1/admin/user/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );
  const result = await response.json();
  console.log(result);

  result.success === false
    ? dispatch({ type: UPDATE_USER_FAIL, payload: result.error })
    : dispatch({ type: UPDATE_USER_SUCCESS, payload: result.success });
};



// DELETE USER
export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });
  const response = await fetch(
    `http://localhost:4000/api/v1/admin/user/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  const result = await response.json();
  console.log(result);

  result.success === false
    ? dispatch({ type: DELETE_USER_FAIL, payload: result.error })
    : dispatch({ type: DELETE_USER_SUCCESS, payload: result.success });
};

// Clearing Error
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
