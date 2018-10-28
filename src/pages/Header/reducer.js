import { USER_GET_SUCCESS, USER_GET_REQUEST, USER_GET_FAILURE } from './constants';

const initialState = {};

export default function headerUser(state = initialState, action) {
  switch (action.type) {
    case USER_GET_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case USER_GET_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        userResult: action.payload,
      });
    case USER_GET_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    default:
      return state;
  }
}
