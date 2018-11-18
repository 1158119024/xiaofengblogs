export const REQUEST_PREFIX = '/#';// 请求前缀
export const ADMIN_PREFIX = '/manage';// 后台路由前缀
export const USER_PREFIX = '/user'; // 用户路由前缀
export const FRONT_PREFIX = '/';// 前台路由前缀

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm';

export const LOGIN_PATH = `${USER_PREFIX}/login`;// 登录路径

export const usernameGetFun = () => {
  // console.log(window.location.href);
  return '1';
};

const map = new Map();
let i = 0;
export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const color = [{ backgroundColor: '#fdd8e7', color: '#f5317f' },
  { backgroundColor: '#fcdbd9', color: '#f04134' },
  { backgroundColor: '#fde3cf', color: '#f56a00' },
  { backgroundColor: '#cfefdf', color: '#00a854' },
  { backgroundColor: '#cfedf0', color: '#00a2ae' },
  { backgroundColor: '#d2eafb', color: '#108ee9' },
  { backgroundColor: '#e4e2fa', color: '#7265e6' }];
export const getColor = (key) => {
  console.log(map);
  let value = map.get(key);
  if (value) {
    return value;
  }
  if (i < color.length) {
    value = color[i++];
  } else {
    value = color[getRandom(0, 6)];
  }
  map.set(key, value);
  return value;
};

