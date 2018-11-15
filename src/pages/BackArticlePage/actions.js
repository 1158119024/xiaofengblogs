import { push } from 'react-router-redux';
import { Feedback } from '@icedesign/base';
import { ARTICLE_ACTION_FAILURE,
  ARTICLE_ACTION_REQUEST,
  ARTICLE_ACTION_SUCCESS,
  ARTICLE_ACTION_ADD,
  ARTICLE_ACTION_DELETE,
  ARTICLE_ACTION_GETARTICLEBYID,
  ARTICLE_ACTION_GETARTICLESBYUSERID,
  ARTICLE_ACTION_UPDATE } from './contants';
import { add, del, update, getArticleById, getArticlesByUserId } from '../../api/article';
import { ADMIN_PREFIX } from '../../config/constants';
import { tagsAction } from '../BackTagsPage/actions';
import { TAGS_ACTION_GETTAGSBYUSERID_PAGING } from '../BackTagsPage/contants';

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

// 提交的参数，类型
export const articleAction = (params, type) => {
  return async (dispatch) => {
    dispatch(articleActionRequest());
    try {
      let response;
      switch (type) {
        case ARTICLE_ACTION_ADD:
          response = await add(params);
          if (response.data.code === 200) {
            Feedback.toast.success(response.data.msg);
            if (params.isSkip) {
              dispatch(push(`${ADMIN_PREFIX}/article`));
            }
          }
          return response.data;
        case ARTICLE_ACTION_DELETE:
          response = await del(params);
          break;
        case ARTICLE_ACTION_UPDATE:
          response = await update(params);
          if (response.data.code === 200) {
            Feedback.toast.success(response.data.msg);
            if (params.isSkip) {
              dispatch(push(`${ADMIN_PREFIX}/article`));
            }
          }
          return response.data;
        case ARTICLE_ACTION_GETARTICLEBYID:
          response = await getArticleById(params);
          break;
        case ARTICLE_ACTION_GETARTICLESBYUSERID:
          response = await getArticlesByUserId(params);
          dispatch(tagsAction({ pageNum: 1, pageSize: 1000 }, TAGS_ACTION_GETTAGSBYUSERID_PAGING)).then(res => {
            if (res && res.code === 200) {
              response.data.data.tagsList = res.data.list;
            } else {
              Feedback.toast.error('获取标签失败！！');
            }
            dispatch(articleActionSuccess(response.data));
          });
          return response.data;
        default:
          Feedback.toast.error('错误的选择！！');
          break;
      }
      dispatch(articleActionSuccess(response.data));
      if (response.data.code === 200) {
        Feedback.toast.success(response.data.msg);
      }
      return response.data;
    } catch (error) {
      dispatch(articleActionFail(error));
    }
  };
};

