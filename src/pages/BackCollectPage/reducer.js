import {
  COLLECT_ACTION_REQUEST,
  COLLECT_ACTION_FAILURE,
  COLLECT_ACTION_SUCCESS,
  COLLECT_ACTION_GETTOOL,
} from './constants';

const initialState = {
  collectResult: {
    code: 0,
    data: {},
    msg: '',
  },
};

export default function collectReducer(state = initialState, action) {
  switch (action.type) {
    case COLLECT_ACTION_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case COLLECT_ACTION_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        collectResult: action.payload,
      });
    case COLLECT_ACTION_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    default:
      return state;
  }
}
