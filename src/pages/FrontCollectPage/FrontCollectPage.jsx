import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import { Search } from '@icedesign/base';
import PropTypes from 'prop-types';
import { collectAction } from '../BackCollectPage/actions';
import injectReducer from '../../utils/injectReducer';
import reducer from '../BackCollectPage/reducer';
import { CONLLECT_ACTION_GETCOLLECTS } from '../BackCollectPage/constants';
import FrontCollectCard from './components/FrontCollectCard';

class FrontCollectPage extends Component {

  static propTypes = {
    collectAction: PropTypes.func.isRequired,
    collectResult: PropTypes.object.isRequired,
  };

  state = {
    searchTitle: '',
    tagId: '', // 标签id
    tagName: '', // 标签名称
    currentPage: 1, // 当前页
  };

  componentDidMount = () => {
    this.getCollectsByCondition();
  };

  componentWillReceiveProps = (props) => {
    let { tagId, tagName } = props.match.params;
    if (!tagId && !tagName) { // 等于udf时重置标签参数
      tagId = '';
      tagName = '';
    }
    if (tagId !== this.state.tagId) {
      this.setState({
        tagId,
        tagName,
        currentPage: 1,
      }, () => {
        this.getCollectsByCondition();
      });
    }
    console.log();
  };

  getCollectsByCondition = (params) => {
    const { searchTitle, tagId, currentPage } = this.state;
    this.props.collectAction({ title: searchTitle, tagId, pageNum: currentPage, ...params }, CONLLECT_ACTION_GETCOLLECTS);
  };

  // 搜索
  searchHandle = (filter) => {
    const searchTitle = filter.key;
    this.setState({
      searchTitle,
      currentPage: 1,
    }, () => {
      this.getCollectsByCondition();
    });
  };

  // 翻页
  pageChangeHandle = (currentPage) => {
    this.setState({
      currentPage,
    }, () => {
      this.getCollectsByCondition();
    });
  };

  render() {
    return (
        <div>
          <div className="right-card-search">
            {
              this.state.tagId ? <h1 style={{ display: 'inline-block', margin: 0 }}>标签：{this.state.tagName}</h1> : ''
            }
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
          <FrontCollectCard currentPage={this.state.currentPage} collectResult={this.props.collectResult} pageChangeHandle={this.pageChangeHandle} />
        </div>
    );
  }
}

const mapDispatchToProps = {
  collectAction,
};

const mapStateToProps = (state) => {
  return { collectResult: state.collectResult };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'collectResult', reducer });

export default compose(
  withReducer,
  withConnect
)(FrontCollectPage);
