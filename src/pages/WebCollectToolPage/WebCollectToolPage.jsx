import React, { Component } from 'react';
import { Dialog, Feedback, Input } from '@icedesign/base';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';

import './webCollectToolPage.scss';
import CollectToolTagPage from './components/CollectToolTagPage';
import { collectAction } from '../BackCollectPage/actions';
import injectReducer from '../../utils/injectReducer';
import reducer from '../BackCollectPage/reducer';
import { COLLECT_ACTION_ADD } from '../BackCollectPage/constants';

@withRouter
class WebCollectToolPage extends Component {

  static propTypes = {
    collectAction: PropTypes.func.isRequired,
    collectResult: PropTypes.object.isRequired,
  };

  state = {
    userId: '',
    visible: true,
    title: '',
    url: '',
    tagId: '',
    readme: '',
  };

  componentDidMount = () => {
    let str = this.props.location.search;
    let num = 0;
    let name, value;
    const params = [];
    str = str.replace(/&amp;/g, '&');
    let arr = str.split('&'); // 各个参数放到数组里
    for (let i = 0; i < arr.length; i++) {
      num = arr[i].indexOf('=');
      if (num > 0) {
        name = arr[i].substring(0, num);
        value = arr[i].substr(num + 1);
        params[name] = value;
      }
    }
    this.setState({
      userId: this.props.match.params.userId,
      title: decodeURI(params['title']),
      url: decodeURIComponent(params['url']),
    });
  };

  // 选择标签时
  onTagSelect = (value, option) => {
    this.setState({
      tagId: value,
    });
  };

  handleInputChange = (value) => {
    this.setState({
      readme: value,
    });
  };

  // 提交
  onOK = () => {
    console.log(this.state);
    const { tagId, title, url, readme, userId } = this.state;
    this.props.collectAction({ tagId, title, url, readme, userId }, COLLECT_ACTION_ADD).then(res => {
      if (res.code === 200) {
        Feedback.toast.success('保存成功！！3秒后自动关闭。。');
        setTimeout(() => {
          window.close();
        }, 3000);
      }
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
    window.close();
  };
  render() {
    const { title, url } = this.state;
    return (
        <div className="collect-tool">
          <Dialog
            visible={this.state.visible}
            onOk={this.onOK}
            onCancel={this.onClose}
            onClose={this.onClose}
            align="cc ac"
            style={{ width: 400 }}
            title="网页收藏小工具"
          >
            {/*<img title="" alt="" src={`chrome-search://ntpicon/size/24@1x/${url}`} />*/}

            <h2 className="collect-tool-title">
              <a className="collect-tool-title-a" href={url} target="_blank">
              标题：{title}
              </a>
            </h2>
            <div>
              <CollectToolTagPage onTagSelect={this.onTagSelect} />
              <Input multiple addonBefore="备注" placeholder="你学到什么了吗？留下一点记号吧！" maxLength={200} hasLimitHint style={{ width: '100%' }} onChange={this.handleInputChange} />
            </div>
          </Dialog>
        </div>
    );
  }
}
const mapDispatchToProps = {
  collectAction,
};

const mapStateToProps = (state) => {
  return { collectResult: state.collectResult };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'collectResult', reducer });

export default compose(
  withReducer,
  withConnect
)(WebCollectToolPage);
