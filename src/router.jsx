/**
 * 定义应用路由
 */
import { Switch, Route } from 'react-router-dom';
import React from 'react';

import UserLayout from './layouts/UserLayout';
import BasicLayout from './layouts/BasicLayout';
import FrontIndexLayout from './layouts/FrontLayout';
import { ADMIN_PREFIX, FRONT_PREFIX, USER_PREFIX } from './config/constants';

// 按照 Layout 归类分组可以按照如下方式组织路由
const router = () => {
  return (
    <Switch>
      <Route path={USER_PREFIX} component={UserLayout} />

      <Route path={ADMIN_PREFIX} component={BasicLayout} />

      <Route path={FRONT_PREFIX} component={FrontIndexLayout} />
    </Switch>
  );
};

export default router;
