import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { Feedback, Transfer, Button, Input, Dialog } from '@icedesign/base';
import { tagsAction } from '../../../BackTagsPage/actions';
import injectReducer from '../../../../utils/injectReducer';
import reducer from '../../../BackTagsPage/reducer';
import { TAGS_ACTION_ADD, TAGS_ACTION_GETTAGSBYUSERID_PAGING } from '../../../BackTagsPage/contants';
import './articleTagsDialog.scss';

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

  static propTypes = {
    tagsAction: PropTypes.func.isRequired, // crud操作函数
    checkedTagFun: PropTypes.func.isRequired, // 保存选中标签函数
    checkedTag: PropTypes.array.isRequired, // 初始化已选中的标签
  };

  state = {
    // value: [], // 右面板的值
    // checkedTag: [], // 右面板数据
    // extra: {}, // 其他值 左右面板
    visible: false, // 弹出新增弹框
    inputState: '', // 输入框状态
  };

  componentDidMount() {
    this.getTagsByUserId(1000, 1);
  }

  getTagsByUserId(pageSize, pageNum, tagName) {
    this.props.tagsAction({ pageNum, pageSize, tagName }, TAGS_ACTION_GETTAGSBYUSERID_PAGING);
  }

  handleChange = (value, data, extra) => {
    if (data.length > 5) {
      Feedback.toast.error('标签数量大于5，只会保存上一次的正确操作');
    } else {
      this.props.checkedTagFun([...value], [...data]);
    }
    return false;
  };

  dataSource = (obj) => {
    const dataSourceArr = [];
    if (obj) {
      obj.map((item, index) => (
        dataSourceArr.push({
          label: item.tagName,
          value: `${item.id}`,
        })
      ));
    }
    return dataSourceArr;
  };

  // 打开增加弹窗
  onOpenAdd = () => {
    this.setState({
      visible: true,
    });
  };
  // 添加标签input改变回调
  onChangeAdd = value => {
    this.setState({
      tagName: value,
    });
  };

  // 校验并提交标签名称
  checkTagNameAndSubmit = () => {
    this.setState({
      inputState: 'loading',
    });
    const { tagName } = this.state;
    let inputState = 'error';
    if (tagName) {
      inputState = 'success';
      this.props.tagsAction({ tagName }, TAGS_ACTION_ADD, [], { pageNum: 1, pageSize: 1000 });
      this.onClose();
      // this.getTagsByUserId(1000, 1);
    }
    this.setState({
      inputState,
    });
  };
  // 关闭弹窗
  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { tagsResult, isLoading } = this.props.tagsResult;
    if (tagsResult && tagsResult.code === 200) {
      tagsResultInit = this.props.tagsResult.tagsResult;
    }
    console.log(this.props.checkedTag);
    return (
        <div>
          <div className="article-tag-opt">
            <Button type="primary" onClick={this.onOpenAdd}>添加新标签</Button>
          </div>
          <Transfer
            defaultValue={this.props.checkedTag}
            dataSource={this.dataSource(tagsResultInit.data.list)}
            listStyle={{ width: '200px', height: '192px' }}
            onChange={this.handleChange}
            language='en-us'
            showSearch
            titles={['我的标签库', '选中标签']}
            operations={['>>', '<<']}
          />
          <Dialog
            visible={this.state.visible}
            onOk={this.checkTagNameAndSubmit}
            closable="esc,mask,close"
            onCancel={this.onClose}
            onClose={this.onClose}
            title="添加标签"
          >
            <div>
              标签名称：<Input placeholder="标签名称？？" size="small" hasClear state={this.state.inputState} onChange={this.onChangeAdd} />
            </div>
          </Dialog>
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
