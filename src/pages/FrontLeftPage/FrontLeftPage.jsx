import React, { Component } from 'react';
import Img from '@icedesign/img';
import { Link } from 'react-router-dom';
import { Balloon, Calendar, Loading } from '@icedesign/base';
import { compose } from 'redux';
import connect from 'react-redux/es/connect/connect';
import DynamicIcon from 'dynamic-icon';

import './scss/frontLeftPage.scss';
import { getUserDetailsAction } from './actions';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import QQImage from '../../components/image/QQ3.jpg';
import WXImage from '../../components/image/wx.png';

const CustomIcon = DynamicIcon.create({
  fontFamily: 'iconfont',
  prefix: 'icon',
  css: 'https://at.alicdn.com/t/font_900131_a6xvyzy0o9a.css',
});

const iconSize = 'medium';
const balloonIcon = [
  {
    icon: <CustomIcon className="balloon-icon" size={iconSize} type="shouye" />,
    balloon: '首页',
    url: '/',
  },
  {
    icon: <CustomIcon className="balloon-icon" size={iconSize} type="zuopin" />,
    balloon: '作品',
    url: '/',
  },
  {
    icon: <CustomIcon className="balloon-icon" size={iconSize} type="guidang1" />,
    balloon: '归档',
    url: '/test',
  },
  {
    icon: <CustomIcon className="balloon-icon" size={iconSize} type="biaoqian" />,
    balloon: '标签',
    url: '/tags',
  },
  {
    icon: <CustomIcon className="balloon-icon" size={iconSize} type="shoucang1" />,
    balloon: '收藏',
    url: '/collect',
  },
  {
    icon: <CustomIcon className="balloon-icon" size={iconSize} type="pinglun1" />,
    balloon: '评论',
    url: '/',
  },
  {
    icon: <CustomIcon className="balloon-icon" size={iconSize} type="jiaoyinzujifangke" />,
    balloon: '浏览',
    url: '/',
  }];

const footerSize = 'xl';
const footerIcon = [
  {
    icon: <CustomIcon className="balloon-icon footer-icon" size={footerSize} type="denglu" />,
    balloon: '登陆',
    url: '/user/login',
  },
  {
    icon: <CustomIcon className="balloon-icon footer-icon" size={footerSize} type="qq" />,
    balloon: <Img
      enableAliCDNSuffix={false}
      width={180}
      height={180}
      src={QQImage}
      type="cover"
      shape="circle"
      title="QQ"
    />,
    url: '/',
  },
  {
    icon: <CustomIcon className="balloon-icon footer-icon" size={footerSize} type="weixin" />,
    balloon: <Img
      enableAliCDNSuffix={false}
      width={180}
      height={180}
      src={WXImage}
      type="cover"
      shape="sharp"
      title="微信"
    />,
    url: '/',
  },
  {
    icon: <CustomIcon className="balloon-icon footer-icon" size={footerSize} type="git" />,
    balloon: 'GitHub',
    url: '/',
  }];

let userDetailsInit = {
  code: 0,
  data: {
    id: 0,
    username: '大街上捡的程序员',
    password: '',
    phone: '',
    aliasname: '',
    image: '',
    isEnable: true,
    createTime: '',
    productNum: 0,
    collectNum: 0,
    commentNum: 0,
    commendNum: 0,
    details: '',
  },
  msg: '',
};

class FrontLeftPage extends Component {
  // 初始化左侧用户区域
  componentDidMount = () => {
    this.props.getUserDetailsAction();
  };

  render() {
    const { userDetails, isLoading } = this.props.userDetails;
    console.log(userDetails)
    if (isLoading === false && userDetails && userDetails.code === 200) {
      userDetailsInit = this.props.userDetails.userDetails;
    }
    const { data } = userDetailsInit;
    return (
      <div className="layout-left">
        <Loading shape="fusion-reactor" tip="loading..." color="#999" visible={isLoading} style={{ height: '100%' }} >
          <div className="layout-left-img">
            <Img
              enableAliCDNSuffix={false}
              width={150}
              height={150}
              src={data.image}
              type="cover"
              shape="circle"
              style={{ border: '1px solid #ccc', margin: '10px' }}
            />
          </div>
          <div className="layout-left-content">
            <h1 className="user-name">{data.aliasname}</h1>
            <div className="layout-left-content-list">
              <div className="layout-left-content-item">
                <div className="layout-left-content-item-title">
                  <span>作品</span>
                </div>
                <div className="layout-left-content-item-content">
                  <span>{data.productNum}</span>
                </div>
              </div>
              <div className="layout-left-content-item">
                <div className="layout-left-content-item-title">
                  <span>收藏</span>
                </div>
                <div className="layout-left-content-item-content">
                  <span>{data.collectNum}</span>
                </div>
              </div>
              <div className="layout-left-content-item">
                <div className="layout-left-content-item-title">
                  <span>评论</span>
                </div>
                <div className="layout-left-content-item-content">
                  <span>{data.commentNum}</span>
                </div>
              </div>
              <div className="layout-left-content-item">
                <div className="layout-left-content-item-title">
                  <span>点赞</span>
                </div>
                <div className="layout-left-content-item-content">
                  <span>{data.commendNum}</span>
                </div>
              </div>
            </div>
            <div className="balloon-list">
              {
                balloonIcon.map((item, index) => (
                  <Link to={item.url} key={index}>
                    <Balloon
                      trigger={<span>{item.icon}</span>}
                      triggerType="hover"
                      closable={false}
                      className="balloon-message"
                    >
                      {item.balloon}
                    </Balloon>
                  </Link>
                ))
              }
            </div>
            <div className="calendar">
              <Calendar type="card" language="zh-cn" value="" />
            </div>
          </div>
          <div className="layout-left-footer">
            <div className="layout-left-footer-icon">
              {
                footerIcon.map((item, index) => (
                  <Link to={item.url} key={index}>
                    <Balloon
                      trigger={<span>{item.icon}</span>}
                      triggerType="hover"
                      closable={false}
                      className="balloon-message"
                      align="t"
                      offset={[0, -12]}
                    >
                      {item.balloon}
                    </Balloon>
                  </Link>
                ))
              }
            </div>
          </div>
        </Loading>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getUserDetailsAction,
};

const mapStateToProps = (state) => {
  return { userDetails: state.userDetails };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'userDetails', reducer });

export default compose(
  withReducer,
  withConnect
)(FrontLeftPage);
