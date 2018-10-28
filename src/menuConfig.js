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
    path: '/manage/dashboard',
    icon: 'home2',
    children: [
      {
        name: '监控页',
        path: '/manage/dashboard/monitor',
      },
    ],
  },
  {
    name: '图表页',
    path: '/manage/chart',
    icon: 'chart1',
    children: [
      {
        name: '常用图表',
        path: '/manage/chart/chart-list',
        authority: 'admin',
      },
    ],
  },
  {
    name: 'Markdown',
    path: '/manage/markdown',
    icon: 'home',
  },
];

export { headerMenuConfig, asideMenuConfig };
