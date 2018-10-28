import axios from 'axios';
import { push } from 'react-router-redux';

export async function login(params) {
  return axios({
    url: '/xiaofeng/login',
    method: 'post',
    data: params,
  });
}

export async function isLogin() {
  return axios({
    url: '/xiaofeng/isLogin',
    method: 'post',
  });
}

export async function getSecretKey() {
  return axios({
    url: '/xiaofeng/getSecretKey',
    method: 'get',
  });
}
