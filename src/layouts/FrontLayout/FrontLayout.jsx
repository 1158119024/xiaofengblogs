import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import { Search } from '@icedesign/base';

import FrontIndex from '../../pages/FrontIndex';
import './scss/frontLayout.scss';
import FrontCollectPage from '../../pages/FrontCollectPage/FrontCollectPage';
import FrontLeftPage from '../../pages/FrontLeftPage/FrontLeftPage';

export default class FrontLayout extends Component {

  render() {
    return (
      <div>
        <IceContainer className="layout" style={{ backgroundColor: '#eee', height: 'height: 100%' }}>
          <FrontLeftPage />
          <div className="layout-content">
            <div className="layout-header">
              <Search
                size="medium"
                type="normal"
                inputWidth={300}
                placeholder="需要来点什么吗？"
                searchText=""
                className="search"
              />
            </div>
            <Switch>
              <Route path="/test" />
              <Route path="/tags" />
              <Route path="/collect" component={FrontCollectPage} />
              <Route path="/" component={FrontIndex} />
            </Switch>

            <div className="layout-footer">

            </div>
          </div>
          {/*<div className="layout-right">

          </div>*/}
        </IceContainer>
      </div>

    );
  }
}


