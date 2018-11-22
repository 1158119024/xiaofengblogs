import React, { Component } from 'react';
import { Dialog, Input } from '@icedesign/base';
import PropTypes from 'prop-types';


export default class UpdateCollectDialog extends Component {

  static propTypes = {
    updateVisible: PropTypes.bool.isRequired, // 修改控制标识
    updateTitle: PropTypes.string.isRequired, // 标题
    onUpdateCloseDialog: PropTypes.func.isRequired, // 关闭修改弹窗
    onUpdateOkDialog: PropTypes.func.isRequired, // 确认弹窗内容
    updateReadme: PropTypes.string.isRequired, // 将要被修改的备注内容
  };

  state = {
    readme: '',
  };

  componentWillReceiveProps = (props) => {
    const { updateReadme } = props;
    this.setState({
      readme: updateReadme,
    });
  };

  // 输入框改变
  handleInputChange = (value) => {
    this.setState({
      readme: value,
    });
  };

  // 确认
  onOk = () => {
    this.props.onUpdateOkDialog(this.state.readme);
  };

  render() {
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
            <Input multiple addonBefore="备注" defaultValue={this.props.updateReadme} placeholder="你学到什么了吗？留下一点记号吧！" maxLength={200} hasLimitHint style={{ width: '100%' }} onChange={this.handleInputChange} />
          </Dialog>
        </div>
    );
  }
}
