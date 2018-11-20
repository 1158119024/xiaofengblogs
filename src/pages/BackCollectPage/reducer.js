import { COLLECT_ACTION_REQUEST, COLLECT_ACTION_FAILURE, COLLECT_ACTION_SUCCESS } from './constants';
import { TAGS_ACTION_FAILURE, TAGS_ACTION_REQUEST, TAGS_ACTION_SUCCESS } from '../BackTagsPage/contants';

const initialState = {
  tagsResult: {
    code: 0,
    data: {},
    msg: '',
  },
};

export default function tagsReducer(state = initialState, action) {
  switch (action.type) {
    case TAGS_ACTION_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case TAGS_ACTION_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        tagsResult: action.payload,
      });
    case TAGS_ACTION_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    default:
      return state;
  }
}
