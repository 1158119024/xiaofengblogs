/**
 * 定义应用路由
 */
import { Switch, Route } from 'react-router-dom';
import React from 'react';

import UserLayout from './layouts/UserLayout';
import BasicLayout from './layouts/BasicLayout';
import FrontIndexLayout from './layouts/FrontLayout';
import { ADMIN_PREFIX, FRONT_PREFIX, USER_PREFIX, COLLECT_TOOL } from './config/constants';
import WebCollectToolPage from './pages/WebCollectToolPage';

// 按照 Layout 归类分组可以按照如下方式组织路由
const router = () => {
  return (
    <Switch>
      {/* 登陆页面 */}
      <Route path={USER_PREFIX} component={UserLayout} />
      {/* 后台管理页面 */}
      <Route path={ADMIN_PREFIX} component={BasicLayout} />
      {/* 收藏小工具页面 */}
      <Route path={COLLECT_TOOL} component={WebCollectToolPage} />
      {/* 前端页面 */}
      <Route path={FRONT_PREFIX} component={FrontIndexLayout} />
    </Switch>
  );
};

export default router;
