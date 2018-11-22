import React, { Component } from 'react';
import { compose } from 'redux';
import { Loading, Search, Dialog, Input } from '@icedesign/base';
import IcePanel from '@icedesign/panel';
import ReactList from 'react-list';
import IceContainer from '@icedesign/container';
import connect from 'react-redux/es/connect/connect';

import injectReducer from '../../utils/injectReducer';
import ServiceCard from './components/ServiceCard';
import { tagsAction } from './actions';
import reducer from './reducer';
import { TAGS_ACTION_ADD,
  TAGS_ACTION_GETTAGSBYUSERID,
  TAGS_ACTION_UPDATE } from './contants';
import './backTagsPage.scss';
import { CustomIcon } from '../../config/iconfont';

let tagsResultInit = {
  code: 0,
  data: {
    startRow: 0,
    navigatepageNums: [1],
    lastPage: 0,
    prePage: 0,
    hasNextPage: true,
    nextPage: 0,
    pageSize: 10,
    endRow: 0,
    list: [],
    pageNum: 0,
    navigatePages: 0,
    total: 0,
    navigateFirstPage: 0,
    pages: 0,
    size: 0,
    firstPage: 0,
    isLastPage: false,
    hasPreviousPage: false,
    navigateLastPage: 0,
    isFirstPage: false,
  },
  msg: '',
};
class BackTagsPage extends Component {
  state = {
    visible: false, // 弹窗控制标识
    tagName: '',
    inputState: '', // 输入框状态
    searchTagName: '',
  };

  renderItem = (index, key) => {
    const item = tagsResultInit.data.list[index];
    return item ? (<ServiceCard tagItem={item} key={key} handleClick={this.handleClick} />) : ('');
  };

  handleScroll = () => {
    const lastVisibleIndex = this.refs.list.getVisibleRange()[1];
    // 获取总容器宽度
    const containerDiv = document.getElementsByClassName('container-block')[0];
    const containerDivWidth = containerDiv.clientWidth || containerDiv.offsetWidth;
    // 获取子卡片宽度
    const serviceCardDiv = document.getElementsByClassName('service-card')[0];
    const serviceCardDivWidth = serviceCardDiv.offsetWidth + 40;// 外边距40
    // 每条所占的卡片数量
    const serviceCardNum = Math.floor(containerDivWidth / serviceCardDivWidth);
    console.log(`每行的数量：${serviceCardNum}`);
    console.log(`滚轮指针；${lastVisibleIndex}`);
    // 提前 5条 预加载
    console.log(`计算:${tagsResultInit.data.pageNum * Math.floor(tagsResultInit.data.pageSize / serviceCardNum) - 2}`);
    console.log(`当前页: ${tagsResultInit.data.pageNum},最后页: ${tagsResultInit.data.lastPage}`);
    if (
      lastVisibleIndex >= tagsResultInit.data.pageNum * Math.floor(tagsResultInit.data.pageSize / serviceCardNum) - 2 &&
      !this.props.tagsResult.isLoading && tagsResultInit.data.hasNextPage
    ) {
      console.log('加载数据了');
      this.getTagsByUserId(50, tagsResultInit.data.nextPage, this.state.searchTagName);
    }
  };

  componentDidMount() {
    console.log(TAGS_ACTION_GETTAGSBYUSERID);
    this.getTagsByUserId(50, 1);
  }

  getTagsByUserId(pageSize, pageNum, tagName) {
    this.props.tagsAction({ pageNum, pageSize, tagName }, TAGS_ACTION_GETTAGSBYUSERID);
  }

  // 处理子组件的删除修改请求
  handleClick = (params, type) => {
    console.log(params, type);
    this.props.tagsAction(params, type);
  };

  // 查询
  tagSearch = filter => {
    this.setState({
      searchTagName: filter.key,
    });
    this.getTagsByUserId(50, 1, filter.key);
  };

  // 打开增加弹窗
  onOpenAdd = () => {
    this.setState({
      visible: true,
    });
  };

  // 添加标签input改变回调
  onChangeAdd = value => {
    this.setState({
      tagName: value,
    });
  };

  // 校验并提交标签名称
  checkTagNameAndSubmit = () => {
    this.setState({
      inputState: 'loading',
    });
    const { tagName } = this.state;
    let inputState = 'error';
    if (tagName) {
      inputState = 'success';
      this.props.tagsAction({ tagName }, TAGS_ACTION_ADD);
      this.onClose();
    }
    this.setState({
      inputState,
    });
  };

  // 关闭弹窗
  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { tagsResult, isLoading } = this.props.tagsResult;
    if (tagsResult && tagsResult.code === 200) {
      tagsResultInit = this.props.tagsResult.tagsResult;
    }
    console.log(tagsResultInit);
    return (
      <Loading
        shape="fusion-reactor"
        color="#66AAFF"
        style={{ display: 'block' }}
        visible={isLoading}
      >
        <IcePanel
          status="success"
          style={{ marginBottom: '10px' }}
        >
          <IcePanel.Header className="tag-header">
            <div>
              <span>标签列表</span>
              <CustomIcon type="zengjia-cuxiantiao" style={{ marginLeft: '5px' }} onClick={this.onOpenAdd} />
            </div>
            <div className="header-search-handle">
              <Search
                size="small"
                type="normal"
                inputWidth={300}
                placeholder="搜点什么？"
                searchText=""
                onSearch={this.tagSearch}
              />
            </div>
          </IcePanel.Header>
          <IcePanel.Body>
            <IceContainer
              style={{ height: '650px', overflow: 'auto' }}
              onScroll={this.handleScroll}
            >
              <ReactList
                ref="list"
                itemRenderer={this.renderItem}
                length={tagsResultInit.data.total}
                pageSize={tagsResultInit.data.pageSize}
              />
            </IceContainer>
          </IcePanel.Body>
        </IcePanel>
        <Dialog
          visible={this.state.visible}
          onOk={this.checkTagNameAndSubmit}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title="添加标签"
        >
          <div>
            标签名称：<Input placeholder="标签名称？？" size="small" hasClear state={this.state.inputState} onChange={this.onChangeAdd} />
          </div>
        </Dialog>
      </Loading>
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
)(BackTagsPage);
