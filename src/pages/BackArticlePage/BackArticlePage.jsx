import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import IcePanel from '@icedesign/panel';
import { compose } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { DatePicker, Select, Search, Card, Balloon, moment, Loading, Pagination, Nav, Icon, Menu, Button } from '@icedesign/base';
import reducer from './reducer';
import { ADMIN_PREFIX, DATE_FORMAT, FRONT_PREFIX } from '../../config/constants';
import { CustomIcon } from '../../config/iconfont';
import { articleAction } from './actions';
import injectReducer from '../../utils/injectReducer';
import { ARTICLE_ACTION_ADD,
  ARTICLE_ACTION_DELETE,
  ARTICLE_ACTION_UPDATE,
  ARTICLE_ACTION_UPDATE_STATE,
  ARTICLE_ACTION_GETARTICLEBYID,
  ARTICLE_ACTION_GETARTICLESBYUSERID } from './contants';

import './backArticlePage.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Item, PopupItem } = Nav;
let articleResultInit = {
  code: 0,
  data: {
    startRow: 1,
    navigatepageNums: [1, 2],
    lastPage: 0,
    prePage: 0,
    hasNextPage: true,
    nextPage: 0,
    pageSize: 10,
    endRow: 10,
    list: [{}],
    pageNum: 1,
    navigatePages: 8,
    total: 0,
    navigateFirstPage: 1,
    pages: 0,
    size: 10,
    firstPage: 1,
    isLastPage: false,
    hasPreviousPage: false,
    navigateLastPage: 2,
    isFirstPage: true,
  },
  tagsList: [],
  msg: '',
};
@withRouter
class BackArticlePage extends Component {
  state = {
    searchTitle: '', // 搜索的标题
    tagId: '', // 标签id
    startTime: '', // 区间：开始时间
    endTime: '', // 区间： 结束时间
    currentPage: 1, // 当前页
    isPrivate: false,
    filter: [ // 状态查询的数据
      {
        text: '已发布',
        value: '1',
      },
      {
        text: '草稿箱',
        value: '2',
      },
      {
        text: '回收站',
        value: '0',
      },
      {
        text: '私密',
        value: '-1',
      }],
    state: '1', // 状态
  };

  componentDidMount() {
    this.getArticleByUserId({});
  }
  // 写博客
  writeArticle = () => {
    const { history } = this.props;
    history.push(`${ADMIN_PREFIX}/article/write/-1`);
  };

  // 查询
  getArticleByUserId = (params) => {
    const { currentPage, startTime, endTime, state, searchTitle, tagId, isPrivate } = this.state;
    this.props.articleAction({ title: searchTitle, pageNum: currentPage, startTime, endTime, state, tagId, isPrivate, ...params }, ARTICLE_ACTION_GETARTICLESBYUSERID);
  };
  // 选择分页
  pageChangeHandle = (current) => {
    this.setState({
      currentPage: current,
    }, () => {
      this.getArticleByUserId();
    });
  };
  // 状态改变
  onFilterChangeHandle = (value) => {
    if (value === '-1') { // 私密文章，没有对应的状态，是一个字段控制的，所以不能改变状态
      this.setState({
        isPrivate: true,
      }, () => {
        this.getArticleByUserId();
      });
    } else {
      this.setState({
        state: value,
        isPrivate: false,
      }, () => {
        this.getArticleByUserId();
      });
    }
  };

  // 搜索文章
  searchArticle = (filter) => {
    this.setState({
      searchTitle: filter.key,
    }, () => {
      this.getArticleByUserId();
    });
  };

  // 删除文章
  deleteArticle = (event) => {
    const id = event.target.getAttribute('value');
    const { state } = this.state;
    if (state === '0') {
      // 彻底删除
      this.props.articleAction(id, ARTICLE_ACTION_DELETE).then((res) => {
        if (res && res.code === 200) {
          this.getArticleByUserId();
        }
      });
    } else {
      // 状态删除
      this.props.articleAction({ id, state: '0' }, ARTICLE_ACTION_UPDATE_STATE).then((res) => {
        if (res && res.code === 200) {
          this.getArticleByUserId();
        }
      });
    }
  };

  // 还原文章
  restoreArticle = (event) => {
    const id = event.target.getAttribute('value');
    // 还原到草稿件状态
    this.props.articleAction({ id, state: '2' }, ARTICLE_ACTION_UPDATE_STATE).then((res) => {
      if (res && res.code === 200) {
        this.getArticleByUserId();
      }
    });
  };

  // 置顶切换
  topChange = (event) => {
    const id = event.target.getAttribute('value');
    const isTop = event.target.getAttribute('top');
    this.props.articleAction({ id, isTop: isTop }, ARTICLE_ACTION_UPDATE_STATE).then((res) => {
      if (res && res.code === 200) {
        this.getArticleByUserId();
      }
    });
  };

  // 选择日期时，开始和结束
  onRangeDate = (dateRange, formatDateRnage) => {
    console.log(formatDateRnage);
    this.setState({
      startTime: formatDateRnage[0],
      endTime: formatDateRnage[1],
    });
  };
  // 开始时间
  onStartChangeHandle = (dateRange, startTime) => {
    this.setState({
      startTime,
    });
  };
  // 结束时间
  onEndChangeHandle = (dateRange, endTime) => {
    this.setState({
      endTime,
    });
  };
  // 格式化标签的选择器datasource
  tagsDataHandle = (obj) => {
    const dataSource = [];
    if (obj) {
      obj.map((item, index) => (
        dataSource.push({ value: `,${item.id},`, label: item.tagName })
      ));
    }
    return dataSource;
  };
  // 选择标签时
  onTagSelect = (value, option) => {
    this.setState({
      tagId: value,
    });
  };


  render() {
    const { articleResult, isLoading } = this.props.articleResult;
    if (articleResult && articleResult.code === 200) {
      articleResultInit = this.props.articleResult.articleResult;
    }
    console.log(articleResultInit);
    return (
      <div className="article-list">
        <IcePanel status="info" style={{ marginBottom: '10px' }}>
          <IcePanel.Header className="article-list-header">
            <div className="article-list-header-content">
              <span>发布时间：</span>
              <RangePicker
                onChange={this.onRangeDate}
                onStartChange={this.onStartChangeHandle}
                onEndChange={this.onEndChangeHandle}
              />
              <div className="article-list-header-category">
                <Select
                  placeholder="选择我的分类"
                  onChange={this.onSelect}
                  style={{ marginLeft: 10 }}
                  autoWidth={false}
                  showSearch
                  hasClear
                >
                  <Option value="value">value</Option>
                  <Option value="label">label</Option>
                </Select>
                <Select
                  placeholder="选择我的标签"
                  onChange={this.onTagSelect}
                  dataSource={this.tagsDataHandle(articleResultInit.data.tagsList)}
                  style={{ marginLeft: 10 }}
                  autoWidth={false}
                  showSearch
                  hasClear
                />
                <Search
                  size="medium"
                  type="normal"
                  inputWidth={200}
                  placeholder="标题搜索"
                  searchText=""
                  onSearch={this.searchArticle}
                  filter={this.state.filter}
                  onFilterChange={this.onFilterChangeHandle}
                  style={{ marginLeft: 10, height: 28 }}
                />
                <div className="article-header-category-write" onClick={this.writeArticle} >
                  <CustomIcon className="write-icon" type="combinedshapecopy2"/>
                  写博客
                </div>
              </div>

            </div>
          </IcePanel.Header>
          <IcePanel.Body>
            <Loading shape="fusion-reactor" visible={isLoading} style={{ width: '100%' }}>
              <div className="article-list-content" style={{ height: '640px', overflow: 'auto' }}>
                {
                articleResultInit.data.list && articleResultInit.data.list.length > 0 ? articleResultInit.data.list.map((item, index) => (
                  <Card
                    key={index}
                    title={<Link to={`article/write/${item.id}`} className="article-list-content-title">{item.title}</Link>}
                    bodyHeight="auto"
                    className="article-list-content-card"
                  >
                    <div className="article-list-content-card-bottom">
                      <span>
                        {moment(item.createTime).format(DATE_FORMAT)}
                      </span>
                      <Balloon
                        trigger={<span><CustomIcon className="balloon-icon" size="xs" type="jiaoyinzujifangke" />{item.browseNum}</span>}
                        triggerType="hover"
                        closable={false}
                        className="balloon-message"
                      >
                        浏览
                      </Balloon>
                      <Balloon
                        trigger={<span><CustomIcon className="balloon-icon" size="xs" type="xihuan1" />{item.commendNum}</span>}
                        triggerType="hover"
                        closable={false}
                        className="balloon-message"
                      >
                        点赞
                      </Balloon>
                      <Balloon
                        trigger={<span><CustomIcon className="balloon-icon" size="xs" type="pinglun1" />{item.commentNum}</span>}
                        triggerType="hover"
                        closable={false}
                        className="balloon-message"
                      >
                      评论
                      </Balloon>
                      <div className="article-list-content-card-bottom-right">
                        <span className="right-opt" value={item.id} onClick={() => { this.props.history.push(`${FRONT_PREFIX}article/${item.id}`); }}>查看</span>
                        <span className="right-opt" value={item.id} top={`${!item.isTop}`} onClick={this.topChange}>{item.isTop ? '取消置顶' : '置顶'}</span>
                        {
                          this.state.state === '0' ? <span className="right-opt" value={item.id} onClick={this.restoreArticle}>还原</span> : ''
                        }
                        <span className="right-opt right-opt-del" value={item.id} onClick={this.deleteArticle}>
                          {
                            this.state.state === '0' ? '彻底删除' : '删除'
                          }
                        </span>
                      </div>
                    </div>
                  </Card>
                )) : (
                  <div className="article-list-content-none">
                    没有符合的文章，来写一篇把。
                    <CustomIcon className="balloon-icon" size="xl" type="combinedshapecopy2" onClick={this.writeArticle} />
                  </div>
                )
              }
              </div>
              <Pagination style={{ textAlign: 'center' }} current={this.state.currentPage} hideOnlyOnePage onChange={this.pageChangeHandle} total={articleResultInit.data.total} pageSize={articleResultInit.data.pageSize} />
            </Loading>
          </IcePanel.Body>
        </IcePanel>
      </div>
    );
  }
}

const mapDispatchToProps = {
  articleAction,
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
)(BackArticlePage);
