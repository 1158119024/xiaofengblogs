import { Feedback } from '@icedesign/base';

import {
  COLLECT_ACTION_REQUEST, COLLECT_ACTION_SUCCESS, COLLECT_ACTION_FAILURE,
} from './constants';
import { TAGS_ACTION_ADD } from '../BackTagsPage/contants';

const collectActionRequest = () => {
  return {
    type: COLLECT_ACTION_REQUEST,
    isLoading: true,
  };
};

const collectActionFailure = (payload) => {
  return {
    type: COLLECT_ACTION_FAILURE,
    payload,
    isLoading: false,
  };
};

const collectActionSuccess = (payload) => {
  return {
    type: COLLECT_ACTION_SUCCESS,
    payload,
    isLoading: false,
  };
};

export const collectAction = (params, type) => {
  return async (dispatch) => {
    dispatch(collectActionRequest());
    try{
      let response;
      switch (type) {
        case TAGS_ACTION_ADD:
          dispatch(collectActionSuccess());
          break
        default:
          Feedback.toast.error('错误的选择！！');
          break;
      }
    } catch (error) {
      dispatch(collectActionFailure(error));
    }
  }
}
