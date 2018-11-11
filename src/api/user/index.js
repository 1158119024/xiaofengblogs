import axios from 'axios';
import { usernameGetFun } from '../../config/constants';

// ---------------------后台----------------------
// 获取用户基本信息
export async function get() {
  return axios({
    url: '/xiaofeng/user/get',
    method: 'get',
  });
}

// ----------------------前台----------------------
// 获取用户详细信息与基本信息
export async function getUserDetails() {
  return axios({
    url: `/xiaofeng/user/getUserDetails/${usernameGetFun()}`,
    method: 'get',
  });
}
