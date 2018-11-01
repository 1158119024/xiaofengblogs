import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import { Animate, Search } from '@icedesign/base';

import FrontIndex from '../../pages/FrontIndex';
import './scss/frontLayout.scss';
import CollectPage from '../../pages/CollectPage/CollectPage';
import FrontLeftPage from '../../pages/FrontLeftPage/FrontLeftPage';

export default class FrontLayout extends Component {

  state = {
    visible: false,
  };

  componentDidMount = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    return (
      <div>
        <IceContainer className="layout" style={{ backgroundColor: '#eee', height: 'height: 100%' }}>
          <Animate animation={{ enter: 'fadeInLeftBig' }}>
            {this.state.visible ? <FrontLeftPage /> : null}
          </Animate>
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
              <Route path="/collect" component={CollectPage} />
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


