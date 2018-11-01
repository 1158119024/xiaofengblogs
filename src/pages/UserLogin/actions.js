import { push, replace } from 'react-router-redux';
import { Feedback } from '@icedesign/base';
import cookie from 'js-cookie';

import { login, isLogin } from '../../api/login/index';
import { ADMIN_PREFIX } from '../../config/constants';

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_CHECK,
} from './constants';

const userLoginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
    isLoading: true,
  };
};

const userLoginCheck = () => {
  return {
    type: USER_LOGIN_CHECK,
    isLoading: true,
  };
};

const userLoginSuccess = (payload) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload,
    isLoading: false,
  };
};

const userLoginFailure = (payload) => {
  return {
    type: USER_LOGIN_FAILURE,
    payload,
    isLoading: false,
  };
};

export const userLogin = (params) => {
  return async (dispatch) => {
    dispatch(userLoginRequest());
    try {
      console.log(params);
      const response = await login(params);
      console.log(response);
      dispatch(userLoginSuccess(response.data));
      if (response.data.code === 200) {
        dispatch(push(ADMIN_PREFIX));
      } else {
        Feedback.toast.error('账号或者密码错误');
      }

      return response.data;
    } catch (error) {
      dispatch(userLoginFailure(error));
    }
  };
};

export const checkLogin = () => {
  return async (dispatch) => {
    dispatch(userLoginRequest());
    try {
      const token = cookie.get('token');
      let response;
      if (typeof token !== 'undefined' || token != null) {
        response = await isLogin();
        console.log(response);
        dispatch(userLoginSuccess(response.data));
        if (response.data.code === 200) {
          dispatch(push(ADMIN_PREFIX));
        }
      }
      return response.data;
    } catch (error) {
      dispatch(userLoginFailure(error));
    }
  };
};
