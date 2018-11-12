import { ARTICLE_ACTION_SUCCESS, ARTICLE_ACTION_REQUEST, ARTICLE_ACTION_FAILURE } from './contants';

const initialState = {};
export default function articleReducer(state = initialState, action) {

  switch (action.type) {
    case ARTICLE_ACTION_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case ARTICLE_ACTION_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        articleResult: action.payload,
      });
    case ARTICLE_ACTION_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    default:
      return state;
  }
}
