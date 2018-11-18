import React, { Component } from 'react';
import { Pagination } from '@icedesign/base';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';

import OverviewInfo from './components/OverviewInfo/OverviewInfo';
import { tagsAction } from '../BackTagsPage/actions';
import injectReducer from '../../utils/injectReducer';
import reducer from '../BackTagsPage/reducer';
import { TAGS_ACTION_GETTAGS } from '../BackTagsPage/contants';

let tagsResultInit = {
  code: 0,
  data: {
    startRow: 0,
    navigatepageNums: [1],
    lastPage: 1,
    prePage: 0,
    hasNextPage: false,
    nextPage: 0,
    pageSize: 0,
    endRow: 7,
    list: [],
    pageNum: 1,
    navigatePages: 8,
    total: 0,
    navigateFirstPage: 1,
    pages: 1,
    size: 0,
    firstPage: 1,
    isLastPage: true,
    hasPreviousPage: false,
    navigateLastPage: 1,
    isFirstPage: true,
  },
  msg: '',
};
class FrontTagsPage extends Component {

  state = {
    currentPage: 1,
    pageSize: 10,
  };

  componentDidMount() {
    this.getTags();
  }

  getTags() {
    const { currentPage, pageSize } = this.state;
    this.props.tagsAction({ pageNum: currentPage, pageSize }, TAGS_ACTION_GETTAGS);
  }

  handleChange = (currentPage) => {
    this.setState({
      currentPage,
    }, () => {
      this.getTags();
    });
  };

  render() {
    const { tagsResult, isLoading } = this.props.tagsResult;
    if (tagsResult && tagsResult.code === 200) {
      tagsResultInit = this.props.tagsResult.tagsResult;
    }
    return (
        <div className="fadeInRightBig">
          <div style={{ padding: 20 }}>
            <OverviewInfo tagsResult={tagsResultInit.data.list}/>{/* 数组开始位置， 结束位置 */}
          </div>
          <div style={{ padding: 20, textAlign: 'center' }}>
            <Pagination current={this.state.currentPage} total={tagsResultInit.data.total} pageSize={this.state.pageSize} onChange={this.handleChange} />
          </div>
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
)(FrontTagsPage);
