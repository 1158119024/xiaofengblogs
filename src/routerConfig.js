// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import { getRouterData } from './utils/formatter';
import { asideMenuConfig } from './menuConfig';

import BasicLayout from './layouts/BasicLayout';
import { ADMIN_PREFIX, USER_PREFIX, COLLECT_TOOL } from './config/constants';

import UserLogin from './pages/UserLogin';
import Dashboard from './pages/Dashboard';
import FrontIndexLayout from './layouts/FrontLayout';
import BackTagsPage from './pages/BackTagsPage';
import Markdown from './pages/Markdown';
import BackArticlePage from './pages/BackArticlePage';
import WriteBlogsPage from './pages/BackArticlePage/components/WriteBlogsPage/WriteBlogsPage';
import BackCollectPage from './pages/BackCollectPage/BackCollectPage';
import WebCollectToolPage from './pages/WebCollectToolPage';


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
  {
    path: `${ADMIN_PREFIX}/tags`,
    layout: BasicLayout,
    component: BackTagsPage,
  },
  {
    path: `${ADMIN_PREFIX}/article`,
    layout: BasicLayout,
    component: BackArticlePage,
  },
  {
    path: `${ADMIN_PREFIX}/collect`,
    layout: BasicLayout,
    component: BackCollectPage,
  },
];

const routerData = getRouterData(routerConfig, asideMenuConfig);

export { routerData };
