import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ALL_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstant";

// CREATE ORDER
export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  const response = await fetch("http://localhost:4000/api/v1/order/new", {
    method: "POST",
    body: JSON.stringify(order),
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  console.log(result);

  result.success === false
    ? dispatch({ type: CREATE_ORDER_FAIL, payload: result.success })
    : dispatch({ type: CREATE_ORDER_SUCCESS, payload: result.order });
};

// MY ORDER
export const myOrders = () => async (dispatch) => {
  dispatch({ type: MY_ORDER_REQUEST });
  const response = await fetch("http://localhost:4000/api/v1/orders/me", {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  // console.log(result);

  result.success === false
    ? dispatch({ type: MY_ORDER_FAIL, payload: result.error })
    : dispatch({ type: MY_ORDER_SUCCESS, payload: result.orders });
};

// GET ALL ORDER
export const getAllOrders = () => async (dispatch) => {
  dispatch({ type: ALL_ORDER_REQUEST });
  const response = await fetch("http://localhost:4000/api/v1/admin/orders", {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  const result = await response.json();

  result.success === false
    ? dispatch({ type: ALL_ORDER_FAIL, payload: result.error })
    : dispatch({ type: ALL_ORDER_SUCCESS, payload: result.orders });
};

// UPDATE ORDER
export const updateOrder = (id, status) => async (dispatch) => {
  dispatch({ type: UPDATE_ORDER_REQUEST });
  const response = await fetch(
    `http://localhost:4000/api/v1/admin/order/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({status: status}),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );
  const result = await response.json();
  console.log(result);

  result.success === false
    ? dispatch({ type: UPDATE_ORDER_FAIL, payload: result.success })
    : dispatch({ type: UPDATE_ORDER_SUCCESS, payload: result.success });
};

// DELETE ORDER
export const deleteOrder = (id) => async (dispatch) => {
  dispatch({ type: DELETE_ORDER_REQUEST });
  const response = await fetch(
    `http://localhost:4000/api/v1/admin/order/${id}`,
    { method: "DELETE", credentials: "include" }
  );
  const result = await response.json();
  console.log(result);

  result.success === false
    ? dispatch({ type: DELETE_ORDER_FAIL, payload: result.success })
    : dispatch({ type: DELETE_ORDER_SUCCESS, payload: result.success });
};

// GET ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch) => {
  dispatch({ type: ORDER_DETAILS_REQUEST });
  const response = await fetch(`http://localhost:4000/api/v1/order/${id}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  console.log(result);

  result.success === false
    ? dispatch({ type: ORDER_DETAILS_FAIL, payload: result.error })
    : dispatch({ type: ORDER_DETAILS_SUCCESS, payload: result.order });
};

// Clearing Error
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
