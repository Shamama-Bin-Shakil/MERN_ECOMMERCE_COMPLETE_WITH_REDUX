import {
  CLEAR_ERRORS,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from "../constants/userConstants";

export const forgetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGET_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case FORGET_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
