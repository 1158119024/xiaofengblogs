import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import { Search, Tag, Loading, Pagination } from '@icedesign/base';
import ReactList from 'react-list';
import { tagsAction } from '../../../BackTagsPage/actions';
import injectReducer from '../../../../utils/injectReducer';
import reducer from '../../../BackTagsPage/reducer';
import {
  TAGS_ACTION_ADD_CHECKED,
  TAGS_ACTION_DELETE,
  TAGS_ACTION_GETTAGSBYUSERID_PAGING,
} from '../../../BackTagsPage/contants';

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
const tagSize = 5;
class ArticleTagsDialog extends Component {

  state = {
    checkedTag: [], // 选中的标签
    current: 1,
    searchTagName: '',
    tagShape: 'selectable',
  };

  componentDidMount() {
    this.setState({
      checkedTag: this.props.checkedTag,
    });
    this.getTagsByUserId(1000, 1);
  }

  componentWillUnmount() {
    this.props.checkedTagFun(this.state.checkedTag);
  }

  getTagsByUserId(pageSize, pageNum, tagName, checkedTag) {
    this.props.tagsAction({ pageNum, pageSize, tagName }, TAGS_ACTION_GETTAGSBYUSERID_PAGING, checkedTag);
  }

  // 搜索框，输入关键字时事件
  searchChangeHandle = (searchTagName) => {
    this.setState({
      searchTagName,
    });
    const pageNum = 1;
    const pageSize = 50;
    this.getTagsByUserId(pageSize, pageNum, searchTagName);
  };

  // 选项被选中时事件
  optCheckedHandle = (item, selected) => {
    let checkedTag = this.state.checkedTag;
    checkedTag = [item.id, ...checkedTag];
    console.log(selected, checkedTag.length <= tagSize);
    if (selected && checkedTag.length <= tagSize) {
      this.setState({
        checkedTag,
      });
      // 修改结果集中的状态
      this.tagResultHandle(checkedTag);
    }
    return false;
  };

  // 删除选中标签时
  onCloseHandle = (item, closed) => {

    // let { list } = tagsResultInit.data;
    // const index2 = list.findIndex((value) => {
    //   return value.id === item.id;
    // });
    // list[index2].isCheckedTag = false;

    let { checkedTag } = this.state;
    const index = checkedTag.findIndex((value) => {
      return value.id === item.id;
    });
    checkedTag.splice(index, 1);
    this.tagResultHandle(checkedTag);
    this.setState({ checkedTag });
  };

  // tagResultInit 选中与删除
  tagResultHandle = (checkedTag) => {
    let { list } = tagsResultInit.data;
    let index = -1;
    for (let i = 0, len = list.length; i < len; i++) {
      index = checkedTag.findIndex((tag) => {
        return tag === list[i].id;
      });
      index !== -1 ? list[i].isCheckedTag = true : list[i].isCheckedTag = false;
      index = -1;
    }
  };

  // 分页
  pageChangeHandle = (current) => {
    this.setState({
      current,
    });
    this.getTagsByUserId(50, current, this.state.searchTagName);
  };

  render() {
    const { optTag, checkedTag, checkedState } = this.state;
    const { tagsResult, isLoading } = this.props.tagsResult;
    if (tagsResult && tagsResult.code === 200) {
      tagsResultInit = this.props.tagsResult.tagsResult;
    }
    console.log(tagsResultInit);
    console.log(this.state.checkedTag);
    return (
        <div>
          <div className="tag-dialog-search">
            <Search
              size="medium"
              type="normal"
              searchText=""
              onChange={this.searchChangeHandle}
              placeholder="标签名称？"
              inputWidth={300}
            />
          </div>
          <div className="tag-dialog-checked">
            <span>选中标签：</span>
            <div className="tag-dialog-checked-value">
              {
                tagsResultInit.data.list.map((item, index) => (
                  <Tag shape="deletable" type="secondary" closed={!item.isCheckedTag} value={item} key={index} id={item.id} onClose={this.onCloseHandle}>{item.tagName}</Tag>
                ))
              }
            </div>
          </div>
          <Loading visible={isLoading} shape="fusion-reactor" color="#666 " style={{ width: '100%' }}>
            <div className="tag-dialog-opt">
              <span>我的标签库</span>
              <div className="tag-dialog-opt-value" onScroll={this.handleScroll}>
                {
                  tagsResultInit.data.list.map((item, index) => (
                    <Tag shape={checkedTag.length < tagSize ? 'selectable' : 'readonly'} type="normal" selected={item.isCheckedTag} onSelect={this.optCheckedHandle.bind(this, item)} key={index} id={item.id}>{item.tagName}</Tag>
                  ))
                }
              </div>
              <Pagination current={this.state.current} pageSize={tagsResultInit.data.pageSize} hideOnlyOnePage total={tagsResultInit.data.total} onChange={this.pageChangeHandle} />
            </div>
          </Loading>
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
)(ArticleTagsDialog);
