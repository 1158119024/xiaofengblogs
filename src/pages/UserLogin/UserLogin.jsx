/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Input, Button, Checkbox, Grid } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';

import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from '../../utils/injectReducer';
import { userLogin, checkLogin } from './actions';
import reducer from './reducer';
import { Encrypt } from '../../utils/utils';


const { Row, Col } = Grid;

@withRouter
class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        password: '',
        checkbox: false,
      },
    };
  }
  将要插入DOM时回调
  componentWillMount() {
    this.props.checkLogin();
  }
  // 收集表单数据
  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      // const ciphertext = encryptFun(values.password, this.props.loginResult.loginResult.data);
      const ciphertext = Encrypt(values.password);
      values.password = ciphertext;
      this.props.userLogin(values);
    });
  };

  // componentWillUnmount() {
  //   window.removeEventListener('popstate', null);
  // }
  //
  // componentDidMount() {
  //   // 如果有问题，加个setTimeout
  //   window.addEventListener('popstate', (state) => {
  //     console.log(state.state);
  //     if (state.state) {
  //       //侦测是用户触发的后退操作, dosomething
  //       //这里刷新当前url
  //       this.location.reload();
  //     }
  //   }, false);
  // }
  //
  // back() {
  //   this.props.history.push('/');
  // }

  render() {
    console.log(this.props.loginResult)
    return (
      <div className="user-login">
        <div className="formContainer">
          <h4 className="formTitle">登 录</h4>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div className="formItems">
              <Row className="formItem">
                <Col className="formItemCol">
                  <IceIcon type="person" size="small" className="inputIcon" />
                  <IceFormBinder name="username" required message="必填">
                    <Input size="large" maxLength={20} placeholder="用户名" />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="username" />
                </Col>
              </Row>

              <Row className="formItem">
                <Col className="formItemCol">
                  <IceIcon type="lock" size="small" className="inputIcon" />
                  <IceFormBinder name="password" required message="必填">
                    <Input
                      size="large"
                      htmlType="password"
                      placeholder="密码"
                    />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="password" />
                </Col>
              </Row>

              <Row className="formItem">
                <Col>
                  <IceFormBinder name="checkbox">
                    <Checkbox className="checkbox">记住账号</Checkbox>
                  </IceFormBinder>
                </Col>
              </Row>

              <Row className="formItem">
                <Button
                  type="primary"
                  onClick={this.handleSubmit}
                  className="submitBtn"
                >
                  登 录
                </Button>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  userLogin,
  checkLogin,
};

const mapStateToProps = (state) => {
  return { loginResult: state.login };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'login', reducer });

export default compose(
  withReducer,
  withConnect
)(UserLogin);
