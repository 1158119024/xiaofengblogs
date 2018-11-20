import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { ARTICLE_ACTION_GETARTICLES } from '../BackArticlePage/contants';
import { articleAction } from '../BackArticlePage/actions';
import injectReducer from '../../utils/injectReducer';
import reducer from '../BackArticlePage/reducer';
import FrontArticleCard from '../FrontIndex/components/FrontArticleCard/FrontArticleCard';

class FrontArchivesDetailsPage extends Component {

  static propTypes = {
    articleResult: PropTypes.object.isRequired,
    articleAction: PropTypes.func.isRequired,
  };

  state = {
    archivesTime: '',
    currentPage: 1,
    count: 0,
  };

  componentDidMount = () => {
    const { archivesTime, count } = this.props.match.params;
    this.setState({
      archivesTime,
      count,
    }, () => {
      this.getArticles();
    });
  };

  getArticles = () => {
    const { archivesTime, currentPage } = this.state;
    this.props.articleAction({ archivesTime, pageNum: currentPage }, ARTICLE_ACTION_GETARTICLES);
  };

  pageChangeHandle = (currentPage) => {
    this.setState({
      currentPage,
    }, () => {
      this.getArticles();
    });
  };

  render() {
    return (
        <div>
          <header>
            <h1>存档: {this.state.archivesTime}({this.state.count})</h1>
          </header>
          <content>
            <FrontArticleCard articleResult={this.props.articleResult} pageChangeHandle={this.pageChangeHandle} />
          </content>
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
)(FrontArchivesDetailsPage);
