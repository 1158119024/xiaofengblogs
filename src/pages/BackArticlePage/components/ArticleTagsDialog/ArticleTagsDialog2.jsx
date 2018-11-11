import React, { Component } from 'react';
import { Transfer } from '@icedesign/base';
import { tagsAction } from '../../../BackTagsPage/actions';
import connect from 'react-redux/es/connect/connect';
import injectReducer from '../../../../utils/injectReducer';
import reducer from '../../../BackTagsPage/reducer';
import { compose } from 'redux';
import { TAGS_ACTION_GETTAGSBYUSERID_PAGING } from '../../../BackTagsPage/contants';

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
class ArticleTagsDialog2 extends Component {

  componentDidMount() {
    this.getTagsByUserId(1000, 1);
  }

  // componentWillUnmount() {
  //   this.props.checkedTagFun(this.state.checkedTag);
  // }

  getTagsByUserId(pageSize, pageNum, tagName) {
    this.props.tagsAction({ pageNum, pageSize, tagName }, TAGS_ACTION_GETTAGSBYUSERID_PAGING);
  }

  handleChange = (value, data, extra) => {
    console.log(value, data, extra);
    extra.movedData = [{ label: 123, value: 123 }];
    extra.movedValue = [{ label: 123, value: 123 }];
    value = [{ label: 123, value: 123 }];
    data = [{ label: 123, value: 123 }];
  };

  dataSource = (obj) => {
    const dataSourceArr = [];
    obj.map((item, index) => (
      dataSourceArr.push({
        label: item.tagName,
        value: item.id,
      })
    ));
    return dataSourceArr;
  };

  render() {
    const { tagsResult, isLoading } = this.props.tagsResult;
    if (tagsResult && tagsResult.code === 200) {
      tagsResultInit = this.props.tagsResult.tagsResult;
    }
    console.log(tagsResultInit);
    return (
        <div>
          <Transfer
            defaultValue={['3']}
            dataSource={this.dataSource(tagsResultInit.data.list)}
            listStyle={{ width: '200px', height: '192px' }}
            defaultLeftChecked={['1']}
            onChange={this.handleChange}
            language='en-us'
            showSearch
            titles={['Source', 'Target']}
            operations={['>>', '<<']}
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
)(ArticleTagsDialog2);
