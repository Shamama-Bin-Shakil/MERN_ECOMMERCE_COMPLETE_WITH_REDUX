import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

// ADD TO CART
export const addToCartItem = (id, quantity) => async (dispatch, getState) => {
  const response = await fetch(`http://localhost:4000/api/v1/product/${id}`, {
    method: "GET",
    credentials: "include",
  });
  const result = await response.json();
  const { _id, name, price, images, stock } = result.product;
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: _id,
      name: name,
      price: price,
      image: images[0].url,
      stock: stock,
      quantity: quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE CART ITEMS
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
  
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
