import React, { Component } from 'react';
import { Upload, Button, Input, Switch, Dialog, Search, Tag } from '@icedesign/base';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';

import BraftEditor from '../BraftEditor/index';
import { CustomIcon } from '../../../../config/iconfont';
import { articleTagsAction } from './actions';
import injectReducer from '../../../../utils/injectReducer';
import reducer from './reducer';
import { TAGS_ACTION_GETTAGSBYUSERID } from '../../../BackTagsPage/contants';
import ArticleTagsDialog from '../ArticleTagsDialog/ArticleTagsDialog';
import './writeBlogs.scss';
import ArticleTagsDialog2 from '../ArticleTagsDialog/ArticleTagsDialog2';

let articleResultInit = {
  articleResult: {
    code: 0,
    data: {},
    msg: '',
  },
};

class WriteBlogsPage extends Component {

  state = {
    isPrivate: false, // 是否私密
    isTop: false, // 是否置顶
    tagVisible: false, // tag弹窗的状态
    isCheckedTag: true, // 是否需要保存选中的标签
    checkedTag: [], // 保存标签
  };

  privateHandleChange = (checked) => {
    console.log(checked);
  };

  topHandleChange = checked => {
    console.logg(checked);
  };

  tagHandleClick = event => {

  };

  // 确认
  onOk = () => {
    this.setState({
      tagVisible: false,
      isCheckedTag: true,
    });
  };
  // 关闭
  onClose = () => {
    this.setState({
      tagVisible: false,
      isCheckedTag: false,
    });
  };
  // 打开标签弹窗
  openTagDialog = () => {
    console.log(this.state.checkedTag);
    this.setState({
      tagVisible: true,
    });
  };

  // 保存选中的标签
  checkedTagFun = (checkedTag) => {
    if (this.state.isCheckedTag) {
      this.setState({
        checkedTag,
      });
    }
  };

  render() {
    return (
        <div>
          <div className="article-header">
            <Input className="article-header-title" size="large" placeholder="输入文章标题" />
          </div>
          <div>
            <BraftEditor />
          </div>
          <div className="article-footer">
            <div className="article-footer-tag">
              <span className="article-footer-tag-key article-footer-key">文章标签：</span>
              <span className="article-footer-tag-value" onClick={this.openTagDialog}>
                <CustomIcon type="zengjia-cuxiantiao" size="small" style={{ marginRight: '6px' }} />
                添加标签
              </span>
              <p className="article-footer-tag-msg">最多添加五个标签</p>
              <Dialog
                visible={this.state.tagVisible}
                onOk={this.onOk}
                onCancel={this.onClose}
                onClose={this.onClose}
                title="添加标签"
                className="tag-dialog"
              >
                <ArticleTagsDialog checkedTagFun={this.checkedTagFun} checkedTag={this.state.checkedTag} />
                {/*<ArticleTagsDialog2 />*/}
              </Dialog>
            </div>
            <div className="article-footer-private">
              <span className="article-footer-private-key article-footer-key">私密文章：</span>
              <Switch checkedChildren="开" onChange={this.privateHandleChange} unCheckedChildren="关" size="small" className="article-footer-private-value" />
            </div>
            <div className="article-footer-private">
              <span className="article-footer-private-key article-footer-key">置顶文章：</span>
              <Switch checkedChildren="开" onChange={this.topHandleChange} unCheckedChildren="关" size="small" className="article-footer-private-value" />
            </div>
            <div className="article-footer-opt">
              <Button type="primary" size="large">发布文章</Button>
              <Button type="secondary" size="large">保存草稿</Button>
              <Button type="normal" size="large">返回</Button>
            </div>
          </div>
        </div>
    );
  }
}

const mapDispatchToProps = {
  articleTagsAction,
};

const mapStateToProps = (state) => {
  return { articleResult: state.articleResult, tagsResult: state.tagsResult };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'articleResult', reducer });

export default compose(
  withReducer,
  withConnect
)(WriteBlogsPage);
