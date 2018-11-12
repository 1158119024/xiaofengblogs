import axios from 'axios';

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
// 修改
export async function update(params) {
  return axios({
    url: 'xiaofeng/article/update',
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
