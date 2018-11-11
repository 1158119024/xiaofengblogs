import axios from 'axios';

// --------------------后台-------------------
// 添加标签
export async function add(params) {
  return axios({
    url: '/xiaofeng/tags/add',
    method: 'post',
    data: params,
  });
}
// 删除标签
export async function del(params) {
  console.log(params);
  return axios({
    url: `/xiaofeng/tags/delete/${params}`,
    method: 'get',
  });
}
// 修改标签
export async function update(params) {
  return axios({
    url: '/xiaofeng/tags/update',
    method: 'post',
    data: params,
  });
}
// 根据id查询标签
export async function getTagById(params) {
  return axios({
    url: '/xiaofeng/tags/getTagById',
    method: 'get',
    data: params,
  });
}
// 根据用户id查询标签
export async function getTagsByUserId(params) {
  if (!params) {
    return '';
  }
  return axios({
    url: '/xiaofeng/tags/getTagsByUserId',
    method: 'post',
    data: params,
  });
}
