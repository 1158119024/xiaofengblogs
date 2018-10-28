import { USER_GET_FAILURE, USER_GET_REQUEST, USER_GET_SUCCESS } from './constants';
import { get } from '../../api/user/index';

const userGetRequest = () => {
  return {
    type: USER_GET_REQUEST,
    isLoading: true,
  };
};

const userGetFailure = (payload) => {
  return {
    type: USER_GET_FAILURE,
    payload,
    isLoading: false,
  };
};

const userGetSuccess = (payload) => {
  return {
    type: USER_GET_SUCCESS,
    payload,
    isLoading: false,
  };
};


export const getUser = () => {
  return async (dispatch) => {
    dispatch(userGetRequest());
    try {
      const response = await get();
      console.log(response);
      dispatch(userGetSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(userGetFailure(error));
    }
  };
};

