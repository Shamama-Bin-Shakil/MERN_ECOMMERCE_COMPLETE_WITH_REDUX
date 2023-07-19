import {
  CLEAR_ERRORS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_REST,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_REST,
  UPDATE_PASSWORD_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REST,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_REST,
  DELETE_USER_FAIL,
} from "../constants/userConstants";

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_PROFILE_REST:
    case UPDATE_PASSWORD_REST:
    case UPDATE_USER_REST:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_USER_REST:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case UPDATE_USER_FAIL:
    case DELETE_USER_FAIL:
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
