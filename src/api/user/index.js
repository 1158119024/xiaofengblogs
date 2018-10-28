import axios from 'axios';


export async function get() {
  return axios({
    url: '/xiaofeng/user/get',
    method: 'get',
  });
}
