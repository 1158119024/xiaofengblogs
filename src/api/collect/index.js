import axios from 'axios';
import { usernameGetFun } from '../../config/constants';


// 网页小工具添加文章
export async function add(params) {
  return axios({
    url: '/xiaofeng/collect/add',
    method: 'post',
    data: params,
  });
}

// 删除
export async function del(params) {
  return axios({
    url: `/xiaofeng/collect/delete/${params}`,
    method: 'get',
  });
}

export async function update(params) {
  return axios({
    url: '/xiaofeng/collect/update',
    method: 'post',
    data: params,
  });
}

// 条件查询
export async function getCollectsByCondition(params) {
  return axios({
    url: '/xiaofeng/collect/getCollectsByCondition',
    method: 'post',
    data: params,
  });
}


export async function getTool(params) {
  return axios({
    url: '/xiaofeng/collect/getTool',
    method: 'post',
    data: params,
  });
}

// --------------------------前台
// 条件查询
export async function getCollects(params) {
  params.userId = usernameGetFun();
  return axios({
    url: '/xiaofeng/collect/getCollectsByCondition',
    method: 'post',
    data: params,
  });
}
