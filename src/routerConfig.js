// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import { getRouterData } from './utils/formatter';
import { asideMenuConfig } from './menuConfig';

import UserLogin from './pages/UserLogin';
import Dashboard from './pages/Dashboard';
import FrontIndexLayout from './layouts/FrontLayout';

import Markdown from './pages/Markdown';
import BasicLayout from './layouts/BasicLayout';
import { ADMIN_PREFIX, USER_PREFIX } from './config/constants';

const routerConfig = [
  {
    path: ADMIN_PREFIX,
    layout: BasicLayout,
    // component: Dashboard,
  },
  {
    path: USER_PREFIX,
    component: UserLogin,
  },
  // {
  //   path: FRONT_PREFIX,
  //   component: FrontIndexLayout,
  // },
  {
    path: `${ADMIN_PREFIX}/dashboard/monitor`,
    layout: BasicLayout,
    component: Dashboard,
  },
  {
    path: `${ADMIN_PREFIX}/markdown`,
    layout: BasicLayout,
    component: Markdown,
  },
];

const routerData = getRouterData(routerConfig, asideMenuConfig);

export { routerData };
