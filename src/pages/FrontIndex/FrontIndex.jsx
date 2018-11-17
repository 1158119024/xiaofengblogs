import React, { Component } from 'react';
import { Card, Loading, moment, Balloon, Pagination, Search } from '@icedesign/base';
import IceEllipsis from '@icedesign/ellipsis';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import IceLabel from '@icedesign/label';

import { CustomIcon } from '../../config/iconfont';
import { articleAction } from '../BackArticlePage/actions';
import injectReducer from '../../utils/injectReducer';
import reducer from '../BackArticlePage/reducer';
import { FRONT_PREFIX, DATE_FORMAT, getColor } from '../../config/constants';
import { ARTICLE_ACTION_GETARTICLESBYUSERID, ARTICLE_ACTION_GETARTICLES } from '../BackArticlePage/contants';

import './frontIndex.scss';
import IceContainer from '@icedesign/container';

let articleResultInit = {
  code: 0,
  data: {
    startRow: 0,
    navigatepageNums: [1, 2],
    lastPage: 0,
    prePage: 0,
    hasNextPage: true,
    nextPage: 0,
    pageSize: 0,
    endRow: 0,
    list: [],
    pageNum: 1,
    navigatePages: 0,
    total: 0,
    navigateFirstPage: 1,
    pages: 0,
    size: 10,
    firstPage: 1,
    isLastPage: false,
    hasPreviousPage: false,
    navigateLastPage: 2,
    isFirstPage: true,
    tagList: [{}],
  },
  tagsList: [],
  msg: '',
};
class FrontIndex extends Component {

  state = {
    searchTitle: '',
    currentPage: 1,
  };

  componentDidMount() {
    this.getArticle();
  }

  // 翻页
  pageChangeHandle = (currentPage) => {
    this.setState({
      currentPage,
    }, () => {
      this.getArticle();
    });
  };

  // 搜索
  searchHandle = (filter) => {
    const searchTitle = filter.key;
    this.setState({
      searchTitle,
    }, () => {
      this.getArticle();
    });
  };

  // 查询详情
  getArticle = (params) => {
    const { currentPage, searchTitle } = this.state;
    this.props.articleAction({ title: searchTitle, pageNum: currentPage, ...params }, ARTICLE_ACTION_GETARTICLES);
  };
  render() {
    const { articleResult, isLoading } = this.props.articleResult;
    if (articleResult && articleResult.code === 200) {
      articleResultInit = this.props.articleResult.articleResult;
    }
    // className="fadeInRightBig"
    console.log(articleResultInit);
    return (
      <div>
        <div className="right-card-search">
          <Search
            size="medium"
            type="normal"
            inputWidth={300}
            placeholder="需要来点什么吗？"
            searchText=""
            className="search"
            onSearch={this.searchHandle}
          />
        </div>
        <Loading shape="fusion-reactor" color="#fff" visible={isLoading} style={{ width: '100%' }}>
          <div className="right-card-list">
            {
              articleResultInit.data.list && articleResultInit.data.list.length > 0 ? articleResultInit.data.list.map((item, index) => (
                <div className="right-card-div zoomIn" key={index}>
                  {
                    item.isTop ? <CustomIcon className="right-card-icon" size="xxl" type="top" /> : ''
                  }
                  <Card
                    title={<Link to={`${FRONT_PREFIX}article/${item.id}`} className="right-card-title">{item.title}</Link>}
                    titleBottomLine={false}
                    bodyHeight={100}
                    className="right-card"
                  >
                    <div className="right-card-content">
                      <IceEllipsis text={item.content && item.content.replace(/<\/?.+?>/g, '')} />
                    </div>
                    <div className="right-card-footer">
                    <span className="right-card-footer-tags">
                      <CustomIcon style={{ marginRight: '10px', color: '#666' }} type="biaoqian2" />
                      {
                        item.tagList && item.tagList.map((tagItem, tagIndex) => (
                          <IceLabel className="tag-label" key={tagIndex} style={getColor()}>{tagItem.tagName}</IceLabel>
                        ))
                      }
                    </span>
                      <span className="right-card-footer-time">
                      <Balloon
                        trigger={<span><CustomIcon style={{ marginRight: '10px', color: '#999' }} size="small" type="Group" /></span>}
                        triggerType="hover"
                        closable={false}
                        align="tl"
                        className="balloon-message"
                      >
                        发表日期
                      </Balloon>
                        {moment(item.createTime).format(DATE_FORMAT)}
                    </span>

                    </div>
                  </Card>
                </div>
              )) : ''
            }
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              {
                articleResultInit.data.list && articleResultInit.data.list.length > 0 ? <Pagination hideOnlyOnePage current={this.state.currentPage} onChange={this.pageChangeHandle} total={articleResultInit.data.total} pageSize={articleResultInit.data.pageSize} /> : ''
              }
            </div>
          </div>
        </Loading>
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
)(FrontIndex);
