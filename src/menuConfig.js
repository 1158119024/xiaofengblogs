import { ADMIN_PREFIX } from './config/constants';
// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const asideMenuConfig = [
  {
    name: 'Dashboard',
    path: `${ADMIN_PREFIX}/dashboard`,
    icon: 'home2',
    children: [
      {
        name: '监控页',
        path: `${ADMIN_PREFIX}/dashboard/monitor`,
      },
    ],
  },
  {
    name: '图表页',
    path: `${ADMIN_PREFIX}/chart`,
    icon: 'chart1',
    children: [
      {
        name: '常用图表',
        path: `${ADMIN_PREFIX}/chart/chart-list`,
        authority: 'admin',
      },
    ],
  },
  {
    name: 'Markdown',
    path: `${ADMIN_PREFIX}/markdown`,
    icon: 'home',
  },
  {
    name: '我的标签',
    path: `${ADMIN_PREFIX}/tags`,
    icon: 'home',
  },
  {
    name: '我的文章',
    path: `${ADMIN_PREFIX}/article`,
    icon: 'home',
  },
  {
    name: '我的收藏',
    path: `${ADMIN_PREFIX}/collect`,
    icon: 'home',
  },
];

export { headerMenuConfig, asideMenuConfig };
