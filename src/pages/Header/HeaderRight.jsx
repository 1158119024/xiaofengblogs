import React, { Component } from 'react';
import { Balloon, Icon, Loading } from '@icedesign/base';
import IceImg from '@icedesign/img';
import { Link, withRouter } from 'react-router-dom';
import FoundationSymbol from 'foundation-symbol';
import cookie from 'js-cookie';


import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from '../../utils/injectReducer';
import { getUser } from './actions';
import reducer from './reducer';
import { LOGIN_PATH } from '../../config/constants';

@withRouter
class HeaderRight extends Component {

  loginOut = () => {
    cookie.remove('token', { path: '' });
  };

  componentDidMount = () => {
    this.props.getUser();
  };

  render() {
    const { isLoading, userResult } = this.props.userResult;
    if (isLoading === false && !userResult) {
      this.props.history.push(`${LOGIN_PATH}`);
    }
    return (
      <Loading shape="flower" tip="loading..." color="#333" visible={isLoading}>
        <Balloon
          trigger={
            <div className="ice-design-header-userpannel">
              <IceImg
                height={40}
                width={40}
                // src={userResult && userResult.data ? userResult.data.image : ''}
                src={userResult ? userResult.data.image : ''}
                className="user-avatar"
              />
              <div className="user-profile">
                <span className="user-name">{userResult ? userResult.data.aliasname : ''}</span>
              </div>
              <Icon
                type="arrow-down-filling"
                size="xxs"
                className="icon-down"
              />
            </div>
          }
          closable={false}
          className="user-profile-menu"
        >
          <ul>
            <li className="user-profile-menu-item">
              <Link to="/">
                <FoundationSymbol type="person" size="small" />
                我的主页
              </Link>
            </li>
            <li className="user-profile-menu-item">
              <Link to="/">
                <FoundationSymbol type="repair" size="small" />
                设置
              </Link>
            </li>
            <li className="user-profile-menu-item">
              <Link to="/user/login" onClick={this.loginOut}>
                <FoundationSymbol type="compass" size="small" />
                退出
              </Link>
            </li>
          </ul>
        </Balloon>
      </Loading>
    );
  }
}

const mapDispatchToProps = {
  getUser,
};

const mapStateToProps = (state) => {
  return { userResult: state.userResult };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'userResult', reducer });

export default compose(
  withReducer,
  withConnect
)(HeaderRight);
