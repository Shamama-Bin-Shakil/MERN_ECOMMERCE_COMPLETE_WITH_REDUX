import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productsReducer,
  productReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducer";
import { AllUsersReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { profileReducer } from "./reducers/profileReducer";
import { forgetPasswordReducer } from "./reducers/forgetPasswordReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailReducer,
  allOrdersReducer,
  orderReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  userProfile: profileReducer,
  forgetPassword: forgetPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrder: myOrdersReducer,
  orderDetail: orderDetailReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrder: allOrdersReducer,
  order: orderReducer,
  allUser: AllUsersReducer,
  userDetails: userDetailsReducer,
  productReview: productReviewsReducer,
  review: reviewReducer
  
});

let inititalState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  inititalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
