import axios from 'axios';
import { usernameGetFun } from '../../config/constants';

// --------------------------后台
// 添加文章
export async function add(params) {
  return axios({
    url: 'xiaofeng/article/add',
    method: 'post',
    data: params,
  });
}
// 删除
export async function del(params) {
  return axios({
    url: `xiaofeng/article/delete/${params}`,
    method: 'get',
  });
}
// 状态删除
// export async function delState(params) {
//   return axios({
//     url: `xiaofeng/article/deleteState/${params}`,
//     method: 'get',
//   });
// }
// 修改
export async function update(params) {
  return axios({
    url: 'xiaofeng/article/update',
    method: 'post',
    data: params,
  });
}

// 修改状态
export async function updateState(params) {
  return axios({
    url: 'xiaofeng/article/updateState',
    method: 'post',
    data: params,
  });
}
// 根据id获取文章
export async function getArticleById(params) {
  return axios({
    url: `xiaofeng/article/getArticleById/${params}`,
    method: 'get',
  });
}
// 根据用户id获取文章列表
export async function getArticlesByUserId(params) {
  return axios({
    url: 'xiaofeng/article/getArticlesByUserId',
    method: 'post',
    data: params,
  });
}

// ---------------------前端
// 根据用户id获取文章列表
export async function getArticles(params) {
  params.userId = usernameGetFun();
  return axios({
    url: 'xiaofeng/article/getArticles',
    method: 'post',
    data: params,
  });
}
