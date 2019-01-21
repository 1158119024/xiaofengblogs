import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import IceContainer from '@icedesign/container';
import { Search } from '@icedesign/base';

import homeImg from '../img/home.png';
import FrontIndex from '../../pages/FrontIndex';
import './scss/frontLayout.scss';
import FrontCollectPage from '../../pages/FrontCollectPage';
import FrontLeftPage from '../../pages/FrontLeftPage';
import FrontArticlePage from '../../pages/FrontArticleDetailsPage';
import FrontTagsPage from '../../pages/FrontTagsPage';
import TagsDetailsPage from '../../pages/FrontTagsPage/components/TagsDetailsPage';
import FrontArchivesPage from '../../pages/FrontArchivesPage';
import FrontArchivesDetailsPage from '../../pages/FrontArchivesDetailsPage';
import { CustomIcon } from '../../config/iconfont';

const navBtn = [
  { type: 'shouye', url: '/' },
  { type: 'zuopin', url: '/' },
  { type: 'guidang1', url: '/archives' },
  { type: 'biaoqian', url: '/tags' },
  { type: 'shoucang1', url: '/collect' },
  { type: 'pinglun1', url: '/' },
  { type: 'jiaoyinzujifangke', url: '/' },
];
const c = 140; // 第三边(斜边)
let navBtnState = [];

export default class FrontLayout extends Component {

  state = {
    show: false,
  };

  componentWillMount() {
    let edgeObj;
    for (let i = 0, len = navBtn.length; i < len; i++) {
      const navBtnObj = {};
      navBtnObj.type = navBtn[i].type;
      navBtnObj.url = navBtn[i].url;
      edgeObj = this.getPoint(90 / (navBtn.length - 1) * i);
      navBtnObj.left = `-${edgeObj.left}px`;
      navBtnObj.top = `-${edgeObj.top}px`;
      navBtnObj.timeLapseStart = i;
      navBtnObj.timeLapseEnd = `${(navBtn.length - 1 - i) * 0.1}s`;
      navBtnState.push(navBtnObj);
    }
  }

  handleUrlClick = (url, event) => {
    const parentEle = event.target.parentElement;
    parentEle.style.transform = 'rotate(-720deg) scale(2)';
    parentEle.style.opacity = '0.1';
    parentEle.style.transition = '0.5s';

    parentEle.addEventListener('transitionend', transitionEndFun);
    this.props.history.push(url);
    // 点击时动画
    function transitionEndFun() {
      // console.log(parentEle);
      console.log(parentEle);
      parentEle.style.transition = '0.3s ';
      parentEle.style.transform = 'rotate(-720deg) scale(1)';
      parentEle.style.opacity = '1';
      // 动画完成后移除
      parentEle.removeEventListener('transitionend', transitionEndFun);
    }
  };

  // 已知第三边 和 一个角
  getPoint = (deg) => {
    const x = Math.round(c * Math.sin(deg * Math.PI / 180));
    const y = Math.round(c * Math.cos(deg * Math.PI / 180));
    return { left: x, top: y };
  };

  homeBtnClick = () => {
    const { show } = this.state;
    this.setState({
      show: !show,
    });
  };

  render() {
    console.log(navBtnState);
    return (
      <div>
        <IceContainer className="layout" style={{ backgroundColor: '#eee', height: 'height: 100%' }}>
          <FrontLeftPage />
          <div className="layout-content">
            <Switch>
              <Route path="/test" />
              <Route path="/tags" exact component={FrontTagsPage} />
              <Route path="/tags/:id/:tagName/:articleNum" component={TagsDetailsPage} />
              <Route path="/collect/:tagId?/:tagName?/:articleNum?" component={FrontCollectPage} />
              <Route path="/article/:id" component={FrontArticlePage} />
              <Route path="/archives" exact component={FrontArchivesPage} />
              <Route path="/archives/:archivesTime/:count" exact component={FrontArchivesDetailsPage} />
              <Route path="/" component={FrontIndex} />
            </Switch>

            <div className="layout-footer">

            </div>
          </div>
          {/*<div className="layout-right">

          </div>*/}

          <div className="nav-wrap">
            <div className="all-nav-btn">
              {
                this.state.show ? navBtnState.map((item, index) => (
                  <div key={index} className="nav-btn" style={{ left: item.left, top: item.top, transition: `1s 0.${item.timeLapseStart}s`, transform: 'rotate(-720deg) scale(1)' }} >
                    <CustomIcon type={item.type} onClick={this.handleUrlClick.bind(this, item.url)} />
                  </div>
                )) : navBtnState.map((item, index) => (
                  <div key={index} className="nav-btn" style={{ left: '0px', top: '0px', transition: `1s ${item.timeLapseEnd}`, transform: 'rotate(0deg) scale(1)' }}>
                    <CustomIcon type={item.type} />
                  </div>
                ))
              }
            </div>
            <div className="home-btn" style={{ transform: this.state.show ? 'rotate(-720deg)' : 'rotate(0deg)' }} onClick={this.homeBtnClick}>
              <img src={homeImg} />
            </div>
          </div>
        </IceContainer>
      </div>

    );
  }
}
