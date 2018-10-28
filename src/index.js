import React from 'react';
import ReactDOM from 'react-dom';

import { createHashHistory } from 'history';
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/reset.scss';

import router from './router';

import configureStore from './configureStore';

// Create hashHistory
const history = createHashHistory();

// Create redux store with history
const initialState = {};

// Configure Store
const store = configureStore(initialState, history);

const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>{router()}</ConnectedRouter>
  </Provider>,

  ICE_CONTAINER
);
