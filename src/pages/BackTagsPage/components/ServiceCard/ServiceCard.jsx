import React, { Component } from 'react';
import { moment, Dialog, Input } from '@icedesign/base';
import IcePanel from '@icedesign/panel';

import { DATE_FORMAT } from '../../../../config/constants';
import { CustomIcon } from '../../../../config/iconfont';
import { TAGS_ACTION_DELETE, TAGS_ACTION_UPDATE } from '../../contants';
import './serviceCard.scss';

let tagItemInit = {
  id: 0,
  tagName: '',
  articleNum: 0,
  createTime: '',
};
export default class ServiceCard extends Component {

  state = {
    id: 0,
    tagName: '',
    newTagName: '',
    visible: false,
    inputState: '',
  };

  deleteHandle = (event) => {
    const id = event.target.getAttribute('data_id');
    this.props.handleClick(id, TAGS_ACTION_DELETE);
  };

  updateHandle = (newTagName, id) => {
    this.props.handleClick({ tagName: newTagName, id }, TAGS_ACTION_UPDATE);
    this.onCloseUpdate();
  };

  // 弹出修改
  onOpenUpdate = (event) => {
    const id = event.target.getAttribute('data_id');
    const tagName = event.target.getAttribute('tag_name');
    this.setState({
      visible: true,
      id: id,
      tagName: tagName,
    });
  };

  // 弹窗内容修改
  onChangeUpdate = (value) => {
    this.setState({
      newTagName: value,
    });
  };

  // 校验修改弹窗内容
  checkUpdate = () => {
    this.setState({
      inputState: 'loading',
    });
    const { newTagName, id } = this.state;
    let inputState = 'error';
    if (newTagName && id) {
      this.updateHandle(newTagName, id);
      inputState = 'success';
    }
    this.setState({
      inputState,
    });
  };

  // 关闭修改
  onCloseUpdate = () => {
    this.setState({
      visible: false,
      id: 0,
      tagName: '',
      newTagName: '',
    });
  };

  render() {
    const tagItem = this.props.tagItem;
    if (tagItem) {
      tagItemInit = tagItem;
    }
    return (
      <div className="service-card">
        <IcePanel status="success" style={{ marginBottom: '10px' }}>
          <IcePanel.Header>
            <div className="tag-header">
              {tagItemInit.tagName}
              <div className="handle-icon">
                <CustomIcon type="shanchu" className="handle-delete handle" data_id={tagItemInit.id} onClick={this.deleteHandle} />
                <CustomIcon type="xiugai1" className="handle-update handle" data_id={tagItemInit.id} tag_name={tagItemInit.tagName} onClick={this.onOpenUpdate} />
              </div>
            </div>
          </IcePanel.Header>
          <IcePanel.Body>
            <p style={{ fontSize: '15px', margin: 0, lineHeight: 1.5, color: '#333' }}>
              文章数量：{tagItemInit.articleNum}
            </p>
            <p style={{ fontSize: '15px', margin: 0, lineHeight: 1.5, color: '#333' }}>
              创建时间：{moment(tagItemInit.createTime).format(DATE_FORMAT)}
            </p>
          </IcePanel.Body>
        </IcePanel>
        <Dialog
          visible={this.state.visible}
          onOk={this.checkUpdate}
          closable="esc,mask,close"
          onCancel={this.onCloseUpdate}
          onClose={this.onCloseUpdate}
          title="标签修改"
          style={{ width: '250px' }}
        >
          <div>标签ID：{this.state.id}</div>
          <div>旧的标签：{this.state.tagName}</div>
          <div>
            新的标签：
            <Input placeholder="新的标签？？" state={this.state.inputState} style={{ width: '140px' }} hasClear onChange={this.onChangeUpdate} size="small" />
          </div>
        </Dialog>
      </div>
    );
  }
}
