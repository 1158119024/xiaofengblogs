import { USER_DETAILS_GET_FAILURE, USER_DETAILS_GET_REQUEST, USER_DETAILS_GET_SUCCESS } from './constants';

const initialState = {};

export default function getUserD(state = initialState, action) {
  switch (action.type) {
    case USER_DETAILS_GET_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case USER_DETAILS_GET_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        userDetails: action.payload,
      });
    case USER_DETAILS_GET_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    default:
      return state;
  }
}
