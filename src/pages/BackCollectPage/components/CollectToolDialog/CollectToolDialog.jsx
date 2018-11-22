import React, { Component } from 'react';
import { Dialog } from '@icedesign/base';
import PropTypes from 'prop-types';

export default class CollectToolDialog extends Component {

  static propTypes = {
    collectToolURL: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    onToolCloseDialog: PropTypes.func.isRequired,
  };


  render() {
    return (
      <Dialog
        visible={this.props.visible}
        onOk={this.props.onToolCloseDialog}
        closable="esc,mask,close"
        onCancel={this.props.onToolCloseDialog}
        onClose={this.props.onToolCloseDialog}
        title="网页收藏小工具"
      >
        <p>拖动下方按钮至浏览器的收藏位置</p>
        <a href={this.props.collectToolURL}>点我收藏哦</a>
      </Dialog>
    );
  }
}
