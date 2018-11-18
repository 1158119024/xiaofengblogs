import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { articleAction } from '../../../BackArticlePage/actions';
import injectReducer from '../../../../utils/injectReducer';
import reducer from '../../../BackArticlePage/reducer';

import FrontArticleCard from '../../../FrontIndex/components/FrontArticleCard';
import { ARTICLE_ACTION_GETARTICLES } from '../../../BackArticlePage/contants';

class TagsDetailsPage extends Component {

  state = {
    tagId: 0,
    tagName: '',
    articleNum: 0,
    currentPage: 1,
  };

  static propTypes = {
    articleResult: PropTypes.object.isRequired,
  };
  // 首次进入查询
  componentDidMount = () => {
    const { id, tagName, articleNum } = this.props.match.params;
    this.setState({
      tagId: `,${id},`,
      tagName,
      articleNum,
    }, () => {
      this.getArticleByUserId(); // 拼接成,12,进行模糊查询
    });
  };
  // url 发生改变时且不同于上次则重新查询
  componentWillReceiveProps(props) {
    const { id, tagName, articleNum } = props.match.params;
    if (tagName !== this.state.tagName) {
      this.setState({
        tagId: `,${id},`,
        tagName,
        articleNum,
      }, () => {
        this.getArticleByUserId();
      });
    }
  }

  // 翻页
  pageChangeHandle = (currentPage) => {
    this.setState({
      currentPage,
    }, () => {
      this.getArticleByUserId();
    });
  };

  // 查询
  getArticleByUserId = (params) => {
    const { tagId, currentPage } = this.state;
    this.props.articleAction({ tagId, pageNum: currentPage, ...params }, ARTICLE_ACTION_GETARTICLES);
  };

  render() {
    console.log(this.props.articleResult);
    return (
        <div>
          <h1 style={{ cursor: 'pointer' }}>标签：{this.state.tagName}({this.state.articleNum})</h1>
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
)(TagsDetailsPage);
