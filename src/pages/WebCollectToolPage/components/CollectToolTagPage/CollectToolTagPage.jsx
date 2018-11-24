import React, { Component } from 'react';
import { Select } from '@icedesign/base';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

import { tagsAction } from '../../../BackTagsPage/actions';
import injectReducer from '../../../../utils/injectReducer';
import reducer from '../../../BackTagsPage/reducer';
import { tagsDataHandle } from '../../../../config/constants';
import { TAGS_ACTION_GETTAGS, TAGS_ACTION_GETTAGSBYUSERID_PAGING } from '../../../BackTagsPage/contants';

const { Option } = Select;
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
class CollectToolTagPage extends Component {

  static propTypes = {
    onTagSelect: PropTypes.func.isRequired, // 选中标签函数
    tagsAction: PropTypes.func.isRequired,
    tagsResult: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.tagsAction({ pageNum: 1, pageSize: 1000 }, TAGS_ACTION_GETTAGS);
  }

  // 格式化标签的选择器datasource
  // tagsDataHandle = (obj) => {
  //   const dataSource = [];
  //   if (obj) {
  //     obj.map((item, index) => (
  //       dataSource.push({ value: `${item.id}`, label: item.tagName })
  //     ));
  //   }
  //   return dataSource;
  // };

  render() {
    const { tagsResult, isLoading } = this.props.tagsResult;
    if (tagsResult && tagsResult.code === 200) {
      tagsResultInit = this.props.tagsResult.tagsResult;
    }
    console.log(tagsResultInit);
    return (
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <Select
            placeholder="选择我的标签"
            onChange={this.props.onTagSelect}
            dataSource={tagsDataHandle(tagsResultInit.data.list)}
            style={{ width: '100%' }}
            showSearch
            hasClear
          />
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
)(CollectToolTagPage);
