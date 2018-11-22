import { Feedback } from '@icedesign/base';

import {
  COLLECT_ACTION_REQUEST,
  COLLECT_ACTION_SUCCESS,
  COLLECT_ACTION_FAILURE,
  COLLECT_ACTION_ADD,
  COLLECT_ACTION_DELETE,
  COLLECT_ACTION_GETCOLLECTSBYCONDITION,
  COLLECT_ACTION_GETTITLEBYURL,
  COLLECT_ACTION_UPDATE,
  COLLECT_ACTION_GETTOOL,
  CONLLECT_ACTION_GETCOLLECTS
} from './constants';
import { add, del, getCollects, getCollectsByCondition, getTool, update } from '../../api/collect';
import { tagsAction } from '../BackTagsPage/actions';
import { TAGS_ACTION_GETTAGSBYUSERID_PAGING } from '../BackTagsPage/contants';

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
    try {
      let response;
      switch (type) {
        case COLLECT_ACTION_ADD:
          response = await add(params);
          break;
        case COLLECT_ACTION_DELETE:
          response = await del(params);
          return response.data;
        case COLLECT_ACTION_UPDATE:
          response = await update(params);
          return response.data;
        case COLLECT_ACTION_GETCOLLECTSBYCONDITION: // 条件查询
          response = await getCollectsByCondition(params);
          dispatch(tagsAction({ pageNum: 1, pageSize: 1000 }, TAGS_ACTION_GETTAGSBYUSERID_PAGING)).then(res => {
            if (res && res.code === 200) {
              response.data.data.tagsList = res.data.list;
            } else {
              Feedback.toast.error('获取标签失败！！');
            }
            dispatch(collectActionSuccess(response.data));
          });
          return response.data;
        case CONLLECT_ACTION_GETCOLLECTS:
          response = await getCollects(params);
          break;
        case COLLECT_ACTION_GETTOOL: // 获取收藏小工具的url
          response = await getTool(params);
          dispatch(collectActionSuccess());
          return response.data;
        default:
          Feedback.toast.error('错误的选择！！');
          break;
      }
      dispatch(collectActionSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(collectActionFailure(error));
    }
  };
};
