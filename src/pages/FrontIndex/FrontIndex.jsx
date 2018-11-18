import React, { Component } from 'react';
import { Search } from '@icedesign/base';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import { articleAction } from '../BackArticlePage/actions';
import injectReducer from '../../utils/injectReducer';
import reducer from '../BackArticlePage/reducer';
import { ARTICLE_ACTION_GETARTICLES } from '../BackArticlePage/contants';

import './frontIndex.scss';
import FrontArticleCard from './components/FrontArticleCard';

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
        <FrontArticleCard articleResult={this.props.articleResult} pageChangeHandle={this.pageChangeHandle} />
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
