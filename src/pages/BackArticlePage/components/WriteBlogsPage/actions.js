import { ARTICLE_ACTION_FAILURE, ARTICLE_ACTION_REQUEST, ARTICLE_ACTION_SUCCESS } from './contants';
import { tagsAction } from '../../../BackTagsPage/actions';

const articleActionRequest = () => {
  return {
    type: ARTICLE_ACTION_REQUEST,
    isLoading: true,
  };
};

const articleActionFail = (payload) => {
  return {
    type: ARTICLE_ACTION_FAILURE,
    payload,
    isLoading: false,
  };
};

const articleActionSuccess = (payload) => {
  return {
    type: ARTICLE_ACTION_SUCCESS,
    payload,
    isLoading: false,
  };
};

export const articleTagsAction = (params, type) => {
  return async (dispatch) => {
    dispatch(articleActionRequest());
    dispatch(tagsAction(params, type)).then((res) => {
      console.log(res)
      dispatch(articleActionSuccess({ tagsResult: res }))
      return res;
    });
  };
};

