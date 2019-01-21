import axios from 'axios';
import { Feedback } from '@icedesign/base';
import cookie from 'js-cookie';
import { REQUEST_PREFIX } from '../config/constants';


axios.interceptors.response.use(response => {
  if (response.data.code === 203 || response.data.code === '203') {
    cookie.remove('token', { path: '/' });
    Feedback.toast.error(response.data.msg);
    window.location.href = `${REQUEST_PREFIX}user/login`;
    return null;
  } else if (response.data.code !== 200) {
    Feedback.toast.error(response.data.msg);
  }
  return response;
}, (err) => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400: err.message = '请求错误(400)'; break;
      case 401: err.message = '未授权，请重新登录(401)'; break;
      case 403: err.message = '拒绝访问(403)'; break;
      case 404: err.message = '请求出错(404)'; break;
      case 408: err.message = '请求超时(408)'; break;
      case 500: err.message = '服务器错误(500)'; break;
      case 501: err.message = '服务未实现(501)'; break;
      case 502: err.message = '网络错误(502)'; break;
      case 503: err.message = '服务不可用(503)'; break;
      case 504: err.message = '网络超时(504)'; break;
      case 505: err.message = 'HTTP版本不受支持(505)'; break;
      default: err.message = `连接出错(${err.response.status})!`;
    }
  } else {
    err.message = '连接服务器失败!';
  }
  Feedback.toast.error(err.message);
  return Promise.reject(err);
});

export async function login(params) {
  return axios({
    url: '/api/login',
    method: 'post',
    data: params,
  });
}

export async function postUserRegister(params) {
  return axios({
    url: '/api/register',
    method: 'post',
    data: params,
  });
}

export async function postUserLogout() {
  return axios({
    url: '/api/logout',
    method: 'post',
  });
}

export async function getUserProfile() {
  return axios('/api/profile');
}

export default {
  postUserRegister,
  postUserLogout,
  getUserProfile,
};
