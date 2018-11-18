import { Feedback } from '@icedesign/base';
import { TAGS_ACTION_REQUEST,
  TAGS_ACTION_SUCCESS,
  TAGS_ACTION_FAILURE,
  TAGS_ACTION_ADD,
  TAGS_ACTION_DELETE,
  TAGS_ACTION_GETTAGBYID,
  TAGS_ACTION_GETTAGSBYUSERID,
  TAGS_ACTION_UPDATE,
  TAGS_ACTION_RESULT_RESET,
  TAGS_ACTION_GETTAGSBYUSERID_PAGING,
  TAGS_ACTION_GETTAGS } from './contants';
import { add, del, update, getTagById, getTagsByUserId, getTags } from '../../api/tags';

import { usernameGetFun } from '../../config/constants';

const tagsActionRequest = () => {
  return {
    type: TAGS_ACTION_REQUEST,
    isLoading: true,
  };
};

const tagsActionResultReset = () => {
  return {
    type: TAGS_ACTION_RESULT_RESET,
    isLoading: false,
  };
};

const tagsActionFailure = (payload) => {
  return {
    type: TAGS_ACTION_FAILURE,
    payload,
    isLoading: false,
  };
};

const tagsActionSuccess = (payload) => {
  return {
    type: TAGS_ACTION_SUCCESS,
    payload,
    isLoading: false,
  };
};

const getTagsByUserIdSuccess = (payload) => {
  return {
    type: TAGS_ACTION_GETTAGSBYUSERID,
    payload,
    isLoading: false,
  };
};

// 文章中使用的标签
// 分页获取标签
const tagsActionSuccessPaging = (payload) => {
  return {
    type: TAGS_ACTION_GETTAGSBYUSERID_PAGING,
    payload,
    isLoading: false,
  };
};
// 添加选中标签
const tagsAddChecked = (payload) => {
  return {
    type: TAGS_ACTION_ADD_CHECKED,
    payload,
    isLoading: false,
  };
};

// 搜索时 isReset与tagName连用, 全为真或全为假时，才去重置state
let isReset = true; // 是否重置标识
// 当有值的时候又分为两种情况，值改变和值未改变，值改变才去重置state
let lastSearchName = ''; // 记录上一次的搜索值
// 参数， 类型，选中的标签（暂时没用），二次查询的参数
export const tagsAction = (params, type, checkedTag = [], params2) => {
  return async (dispatch) => {
    dispatch(tagsActionRequest());
    try {
      let response;
      switch (type) {
        case TAGS_ACTION_ADD:
          response = await add(params);
          dispatch(tagsActionSuccess(response.data));
          break;
        case TAGS_ACTION_DELETE:
          response = await del(params);
          break;
        case TAGS_ACTION_UPDATE:
          response = await update(params);
          break;
        case TAGS_ACTION_GETTAGBYID:
          response = await getTagById(params);
          dispatch(tagsActionSuccess(response.data));
          break;
        case TAGS_ACTION_GETTAGSBYUSERID_PAGING: // 分页
          response = await getTagsByUserId(params);
          response.data.checkedTag = checkedTag;
          dispatch(tagsActionSuccessPaging(response.data));
          return response.data;
        case TAGS_ACTION_GETTAGSBYUSERID: // 滚动加载
          response = await getTagsByUserId(params);
          console.log(response);
          const { tagName } = params;
          if (tagName && (isReset || tagName !== lastSearchName)) {
            dispatch(tagsActionResultReset());
            isReset = false;
            lastSearchName = tagName;
          } else if (!tagName && !isReset) {
            dispatch(tagsActionResultReset());
            isReset = true;
            lastSearchName = '';
          }
          // 拼接上一次的查询记录
          dispatch(getTagsByUserIdSuccess(response.data));
          return response.data;
        case TAGS_ACTION_GETTAGS:
          response = await getTags(params);
          dispatch(tagsActionSuccess(response.data));
          return response.data;
        default:
          Feedback.toast.error('错误的选择！！');
          break;
      }
      // 增删改完成后在查询一次
      if (response.data.code === 200) {
        Feedback.toast.success(response.data.msg);
        if (params2) {
          console.log(params2);
          response = await getTagsByUserId(params2);
        } else {
          response = await getTagsByUserId({ tagName: '' });
        }
        dispatch(tagsActionSuccess(response.data));
      }
      return response.data;
    } catch (error) {
      dispatch(tagsActionFailure(error));
    }
  };
};
