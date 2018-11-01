import { USER_DETAILS_GET_FAILURE, USER_DETAILS_GET_REQUEST, USER_DETAILS_GET_SUCCESS } from './constants';
import { getUserDetails } from '../../api/user';

const userDetailsGetRequest = () => {
  return {
    type: USER_DETAILS_GET_REQUEST,
    isLoading: true,
  };
};

const userDetailsGetFail = (payload) => {
  return {
    type: USER_DETAILS_GET_FAILURE,
    payload,
    isLoading: false,
  };
};

const userDetailsGetSuccess = (payload) => {
  return {
    type: USER_DETAILS_GET_SUCCESS,
    payload,
    isLoading: false,
  };
};

export const getUserDetailsAction = () => {
  return async (dispatch) => {
    dispatch(userDetailsGetRequest());
    try {
      const response = await getUserDetails();
      console.log(response);
      dispatch(userDetailsGetSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(userDetailsGetFail(error));
    }
  };
};
