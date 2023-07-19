import axios from "axios";

import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000], category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;
      if (category) {
        link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`;
      }
      const { data } = await axios.get(link);

      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        // payload: error.response.data.error,
      });
    }
  };

export const getAdminDetail = () => async (dispatch) => {
  dispatch({ type: ADMIN_PRODUCT_REQUEST });
  const response = await fetch("http://localhost:4000/api/v1/admin/products", {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  console.log(result);

  result.success === false
    ? dispatch({ type: ADMIN_PRODUCT_FAIL, payload: result.error })
    : dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: result.products });
};

export const createProduct = (productData) => async (dispatch) => {
  dispatch({ type: NEW_PRODUCT_REQUEST });
  const response = await fetch(
    "http://localhost:4000/api/v1/admin/product/new",
    {
      method: "POST",
      body: JSON.stringify(productData),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );

  const result = await response.json();
  console.log(result);

  if (result.success === true) {
    dispatch({ type: NEW_PRODUCT_SUCCESS, payload: result });
  } else {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: result.error,
    });
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  const response = await fetch(
    `http://localhost:4000/api/v1/admin/product/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(productData),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );

  const result = await response.json();
  console.log(result);

  if (result.success === true) {
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: result.success });
  } else {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: result.error,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  const response = await fetch(
    `http://localhost:4000/api/v1/admin/product/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const result = await response.json();
  console.log(result);

  if (result.success === true) {
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: result.message });
  } else {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: result.error,
    });
  }
};

export const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/product/${id}`
    );
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const newReview =
  ({ rating, comment, id }) =>
  async (dispatch) => {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const response = await fetch("http://localhost:4000/api/v1/review", {
      method: "PUT",
      body: JSON.stringify({
        rating: rating,
        comment: comment,
        productId: id,
      }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    console.log(result);

    if (result.success === true) {
      dispatch({ type: NEW_REVIEW_SUCCESS, payload: result.success });
    } else {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: result.error,
      });
    }
  };

export const getAllReview = (id) => async (dispatch) => {
  dispatch({ type: ALL_REVIEW_REQUEST });
  const response = await fetch(
    `http://localhost:4000/api/v1/reviews?id=${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await response.json();
  console.log(result);

  if (result.success === true) {
    dispatch({ type: ALL_REVIEW_SUCCESS, payload: result.reviews });
  } else {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: result.error,
    });
  }
};



export const deleteReview = (reviewId, productId) => async (dispatch) => {
  dispatch({ type: DELETE_REVIEW_REQUEST });
  const response = await fetch(
    `http://localhost:4000/api/v1/reviews?id=${reviewId}&productId=${productId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const result = await response.json();
  console.log(result);

  if (result.success === true) {
    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: result.success });
  } else {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: result.error,
    });
  }
};

// Clearing Error
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
