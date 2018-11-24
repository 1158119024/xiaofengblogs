import React, { Component } from 'react';
import { Dialog, Input, Select, Button, Switch } from '@icedesign/base';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { tagsAction } from '../../../BackTagsPage/actions';
import injectReducer from '../../../../utils/injectReducer';
import reducer from '../../../BackTagsPage/reducer';
import { TAGS_ACTION_ADD, TAGS_ACTION_GETTAGS } from '../../../BackTagsPage/contants';
import { tagsDataHandle } from '../../../../config/constants';
import './updateCollectDialog.scss';

let tagsResultInit = {
  code: 0,
  data: {
    lastPage: 0,
    prePage: 0,
    hasNextPage: true,
    nextPage: 0,
    pageSize: 10,
    list: [],
    pageNum: 0,
    total: 0,
    pages: 0,
    size: 0,
    firstPage: 0,
  },
  msg: '',
};
class UpdateCollectDialog extends Component {

  static propTypes = {
    tagsAction: PropTypes.func.isRequired,
    updateVisible: PropTypes.bool.isRequired, // 修改控制标识
    updateTitle: PropTypes.string.isRequired, // 标题
    onUpdateCloseDialog: PropTypes.func.isRequired, // 关闭修改弹窗
    onUpdateOkDialog: PropTypes.func.isRequired, // 确认弹窗内容
    updateReadme: PropTypes.string.isRequired, // 将要被修改的备注内容
    updateTagId: PropTypes.string.isRequired,
  };

  state = {
    readme: '',
    updateTagId: '',
    tagName: '',
    tagNameInputState: '',
  };

  // 初始化readme和tagId
  componentWillReceiveProps = (props) => {
    const { updateReadme, updateTagId } = props;
    this.setState({
      readme: updateReadme,
      updateTagId,
    });
  };

  // 获取标签
  getTags() {
    this.props.tagsAction({ pageNum: 1, pageSize: 1000 }, TAGS_ACTION_GETTAGS);
  }

  // 输入框改变
  handleInputChange = (value) => {
    this.setState({
      readme: value,
    });
  };

  // 标签名输入框改变
  tagNameChange = (value) => {
    this.setState({
      tagName: value,
    });
  };

  // 添加标签
  addTagName = () => {
    this.setState({
      tagNameInputState: 'loading',
    });
    let { tagName } = this.state;
    let tagNameInputState = '';
    if (tagName) {
      tagNameInputState = 'success';
      this.props.tagsAction({ tagName }, TAGS_ACTION_ADD);
      tagName = '';
    } else {
      tagNameInputState = 'error';
    }
    this.setState({
      tagNameInputState,
      tagName,
    });
  };

  // 选择标签时
  onTagSelect = (value, option) => {
    this.setState({
      updateTagId: value,
    });
  };

  // 确认
  onOk = () => {
    const { readme, updateTagId } = this.state;
    this.props.onUpdateOkDialog(readme, updateTagId);
  };

  render() {
    const { tagsResult, isLoading } = this.props.tagsResult;
    if (tagsResult && tagsResult.code === 200) {
      tagsResultInit = this.props.tagsResult.tagsResult;
    }
    const { updateTagId } = this.state;
    return (
        <div>
          <Dialog
            visible={this.props.updateVisible}
            onOk={this.onOk}
            onCancel={this.props.onUpdateCloseDialog}
            onClose={this.props.onUpdateCloseDialog}
            title={`修改：${this.props.updateTitle}`}
            style={{ width: 400 }}
          >
            <div style={{ margin: '5px 0' }}>
              <Input addonBefore="标签名：" value={this.state.tagName} state={this.state.tagNameInputState} onChange={this.tagNameChange} placeholder="要添加的标签名？" style={{ width: 275 }} />
              <Button type="primary" onClick={this.addTagName}>
                添加标签
              </Button>
            </div>
            <div className="collect-select">
              <div className="collect-select-text">选择标签：</div>
              <Select
                placeholder="选择我的标签"
                defaultValue={updateTagId ? updateTagId : undefined}
                onChange={this.onTagSelect}
                dataSource={tagsDataHandle(tagsResultInit.data.list)}
                className="collect-select-select"
                showSearch
                hasClear
              />
            </div>
            <Input
              multiple
              addonBefore="备注"
              defaultValue={this.state.readme}
              placeholder="你学到什么了吗？留下一点记号吧！"
              maxLength={200}
              hasLimitHint
              style={{ width: '100%' }}
              onChange={this.handleInputChange}
            />
          </Dialog>
        </div>
    );
  }
}

const mapDispatchToProps = {
  tagsAction,
};

const mapStateToProps = (state) => {
  return { tagsResult: state.tagsResult };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'tagsResult', reducer });

export default compose(
  withReducer,
  withConnect
)(UpdateCollectDialog);
