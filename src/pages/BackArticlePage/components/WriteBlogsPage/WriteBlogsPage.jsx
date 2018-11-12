import React, { Component } from 'react';
import { Button, Input, Switch, Dialog } from '@icedesign/base';
import IceLabel from '@icedesign/label';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';

import BraftEditor from '../BraftEditor/index';
import { CustomIcon } from '../../../../config/iconfont';
import { articleTagsAction } from '../../actions';
import injectReducer from '../../../../utils/injectReducer';
import reducer from '../../reducer';
import './writeBlogs.scss';
import ArticleTagsDialog2 from '../ArticleTagsDialog/ArticleTagsDialog2';
import { ADMIN_PREFIX, getColor } from '../../../../config/constants';
import { ARTICLE_ACTION_ADD, ARTICLE_ACTION_DELETE, ARTICLE_ACTION_UPDATE, ARTICLE_ACTION_GETARTICLEBYID, ARTICLE_ACTION_GETARTICLESBYUSERID } from '../../contants';

class WriteBlogsPage extends Component {

  state = {
    title: '',
    isPrivate: false, // 是否私密
    isTop: false, // 是否置顶
    tagVisible: false, // tag弹窗的状态
    articleContent: '', // 富文本中的内容
    isCheckedTag: true, // 是否需要保存选中的标签(标签框一使用)
    checkedTag: [], // 保存选中标签key
    checkedTag2: [], // 保存上一次选中的标签(标签框二使用)
    checkedTagValue: [], // 保存选中标签的值
    checkedTagValue2: [], // 保存上一次选中标签的值
  };

  // 私密
  privateHandleChange = (checked) => {
    this.setState({ isPrivate: checked });
  };
  // 置顶
  topHandleChange = checked => {
    this.setState({ isTop: checked });
  };
  // 标题
  titleChangeHandle = value => {
    this.setState({ title: value });
  };

  // 打开标签弹窗
  openTagDialog = () => {
    this.setState({
      checkedTag2: this.state.checkedTag, // 记录当前选中的标签
      checkedTagValue2: this.state.checkedTagValue, // 记录当前选中标签的值
      tagVisible: true,
    });
  };

  // ----------------------- 标签框2
  // 确认，标签穿梭框
  onOk2 = () => {
    this.setState({
      tagVisible: false,
    });
    console.log(this.state.checkedTag, this.state.checkedTagValue);
  };
  // 关闭，标签穿梭框
  onClose2 = () => {
    this.setState({
      tagVisible: false,
      checkedTag: this.state.checkedTag2, // 还原上一次选中标签数据
      checkedTagValue: this.state.checkedTagValue2, // 还原上一次选中标签数据
    });
  };

  // 文章子组件修改时
  updateArticle = (articleContent) => {
    this.setState({
      articleContent,
    });
  };

  // 保存文章按钮
  saveArticleBtn = (event) => {
    let isPublish = event.target.value;
    if (isPublish === 'save') {
      isPublish = true;
    } else {
      isPublish = false;
    }
    const { isPrivate, isTop, articleContent, checkedTag, title } = this.state;
    let tagsId = '';
    for (const tag of checkedTag) {
      tagsId += `${tag},`;
    }
    const params = { isPublish, isPrivate, isTop, title, content: articleContent, tagsId };
    console.log(params);
    this.props.articleTagsAction(params, ARTICLE_ACTION_ADD);
  };

  // ---------------------标签框一
  // 确认，选择器
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

  // 保存选中的标签
  checkedTagFun = (checkedTag, checkedTagValue) => {
    if (this.state.isCheckedTag) {
      this.setState({
        checkedTag,
        checkedTagValue,
      });
    }
    console.log(checkedTag, checkedTagValue);
  };

  render() {
    return (
        <div>
          <div className="article-header">
            <Input className="article-header-title" size="large" placeholder="输入文章标题" onChange={this.titleChangeHandle} />
          </div>
          <div>
            <BraftEditor updateArticle={this.updateArticle} />
          </div>
          <div className="article-footer">
            <div className="article-footer-tag">
              <span className="article-footer-tag-key article-footer-key">文章标签：</span>
              <div className="article-footer-tag-value">
                {
                  this.state.checkedTagValue.map((item, index) => (
                    <IceLabel key={index} style={getColor()}>{item.label}</IceLabel>
                  ))
                }
              </div>
              <span className="article-footer-tag-add" onClick={this.openTagDialog}>
                  <CustomIcon type="zengjia-cuxiantiao" size="small" style={{ marginRight: '6px' }} />
                  添加标签
                </span>
              <p className="article-footer-tag-msg">最多添加五个标签</p>
              <Dialog
                visible={this.state.tagVisible}
                onOk={this.onOk2}
                onCancel={this.onClose2}
                onClose={this.onClose2}
                title="添加标签"
                className="tag-dialog"
              >
                {/*<ArticleTagsDialog checkedTagFun={this.checkedTagFun} checkedTag={this.state.checkedTag} />*/}
                <ArticleTagsDialog2 checkedTagFun={this.checkedTagFun} checkedTag={this.state.checkedTag} />
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
              <Button type="primary" size="large" value="save" onClick={this.saveArticleBtn}>发布文章</Button>
              <Button type="secondary" size="large" value="temp" onClick={this.saveArticleBtn}>保存草稿</Button>
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
  return { articleResult: state.articleResult };
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
