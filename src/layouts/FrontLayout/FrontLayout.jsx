import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import { Search } from '@icedesign/base';

import FrontIndex from '../../pages/FrontIndex';
import './scss/frontLayout.scss';
import FrontCollectPage from '../../pages/FrontCollectPage/FrontCollectPage';
import FrontLeftPage from '../../pages/FrontLeftPage/FrontLeftPage';
import FrontArticlePage from '../../pages/FrontArticlePage/FrontArticlePage';
import FrontTagsPage from '../../pages/FrontTagsPage';
import TagsDetailsPage from '../../pages/FrontTagsPage/components/TagsDetailsPage';

export default class FrontLayout extends Component {

  render() {
    return (
      <div>
        <IceContainer className="layout" style={{ backgroundColor: '#eee', height: 'height: 100%' }}>
          <FrontLeftPage />
          <div className="layout-content">
            <Switch>
              <Route path="/test" />
              <Route path="/tags" exact component={FrontTagsPage} />
              <Route path="/tags/:id/:tagName/:articleNum" component={TagsDetailsPage} />
              <Route path="/collect" component={FrontCollectPage} />
              <Route path="/article/:id" component={FrontArticlePage} />
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


