import {
  TAGS_ACTION_REQUEST,
  TAGS_ACTION_SUCCESS,
  TAGS_ACTION_FAILURE,
  TAGS_ACTION_GETTAGSBYUSERID,
  TAGS_ACTION_RESULT_RESET,
  TAGS_ACTION_DELETE_CHECKED,
  TAGS_ACTION_GETTAGSBYUSERID_PAGING, TAGS_ACTION_ADD_CHECKED,
} from './contants';

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
    case TAGS_ACTION_GETTAGSBYUSERID: // 滚动加载 拼接上次state
      if (state.tagsResult.code === 200) {
        action.payload.data.list = [...state.tagsResult.data.list, ...action.payload.data.list];
      }
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        tagsResult: action.payload,
      });
    case TAGS_ACTION_RESULT_RESET: // 滚动加载 重置state
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        tagsResult: initialState.tagsResult,
      });
    case TAGS_ACTION_GETTAGSBYUSERID_PAGING: // 分页加载 标记选中的值
      console.log(action.payload);
      let { checkedTag } = action.payload;
      if (checkedTag) {
        let { list } = action.payload.data;
        let index = -1;
        for (let i = 0, len = checkedTag.length; i < len; i++) {
          index = list.findIndex((item) => {
            return item.id === checkedTag[i];
          });
          index !== -1 ? list[index].isCheckedTag = true : '';
          index = -1;
        }
        action.payload.data.list = list;
      }
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        tagsResult: action.payload,
      });
    case TAGS_ACTION_ADD_CHECKED:
      debugger
      console.log(action.payload);
      break;
    default:
      return state;
  }
}
