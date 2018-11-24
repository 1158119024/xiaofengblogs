import React, { Component } from 'react';
import IcePanel from '@icedesign/panel';
import { Card, Balloon, Loading, Search, Select, moment, Pagination } from '@icedesign/base';
import { compose } from 'redux';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import IceLabel from '@icedesign/label';

import './backCollectPage.scss';
import { CustomIcon } from '../../config/iconfont';
import CollectToolDialog from './components/CollectToolDialog';
import { collectAction } from './actions';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import {
  COLLECT_ACTION_DELETE,
  COLLECT_ACTION_GETCOLLECTSBYCONDITION,
  COLLECT_ACTION_GETTOOL,
  COLLECT_ACTION_UPDATE,
} from './constants';
import { DATE_FORMAT, getColor, tagsDataHandle } from '../../config/constants';
import UpdateCollectDialog from './components/UpdateCollectDialog/UpdateCollectDialog';

let collectResultInit = {
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
    list: [],
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
    tool: '',
    tagsList: [],
  },
  msg: '',
};
class BackCollectPage extends Component {

  static propTypes = {
    collectAction: PropTypes.func.isRequired,
    collectResult: PropTypes.object.isRequired,
  };

  state = {
    visible: false, // 收藏工具弹窗控制标识
    searchTitle: '', // 搜索标题
    collectToolURL: '', // 收藏工具的url
    tagId: '', // 搜索的标签id
    updateVisible: false, // 修改收藏弹窗
    updateTitle: '', // 将要修改的收藏的标题
    updateReadme: '', // 将要被修改的备注
    updateId: 0, // 将要修改的收藏的id
    updateTagId: '', // 将要被修改的标签id
    currentPage: 1,
  };

  componentDidMount() {
    this.getCollectsByCondition();
  }

  getCollectsByCondition = (params) => {
    const { searchTitle, tagId, currentPage } = this.state;
    this.props.collectAction({ title: searchTitle, tagId, pageNum: currentPage, ...params }, COLLECT_ACTION_GETCOLLECTSBYCONDITION);
  };

  // 条件查询
  collectSearch = filter => {
    this.setState({
      searchTitle: filter.key,
    }, () => {
      this.getCollectsByCondition();
    });
  };

  // 选择分页
  pageChangeHandle = (current) => {
    this.setState({
      currentPage: current,
    }, () => {
      this.getCollectsByCondition();
    });
  };

  // 格式化标签的选择器datasource
  // tagsDataHandle = (obj) => {
  //   const dataSource = [];
  //   if (obj) {
  //     obj.map((item, index) => (
  //       dataSource.push({ value: item.id, label: item.tagName })
  //     ));
  //   }
  //   return dataSource;
  // };

  // 选择标签时
  onTagSelect = (value, option) => {
    this.setState({
      tagId: value,
    });
  };

  // 打开修改收藏
  onOpenUpdateDialog = (title, readme, id, updateTagId) => {
    this.setState({
      updateId: id,
      updateReadme: readme,
      updateTitle: title,
      updateVisible: true,
      updateTagId,
    });
  };

  // 修改完成后保存弹出数据
  onUpdateOkDialog = (readme, updateTagId) => {
    this.props.collectAction({ readme, id: this.state.updateId, tagId: updateTagId }, COLLECT_ACTION_UPDATE).then(res => {
      this.getCollectsByCondition();
      this.onUpdateCloseDialog();
    });
  };

  // 关闭修改弹窗  清空数据
  onUpdateCloseDialog = () => {
    this.setState({
      updateId: 0,
      updateReadme: '',
      updateTitle: '',
      updateVisible: false,
      updateTagId: '',
    });
  };

  // 打开收藏工具弹窗
  onOpenToolDialog = () => {
    this.props.collectAction({}, COLLECT_ACTION_GETTOOL).then(res => {
      this.setState({
        collectToolURL: res.data,
      });
    });
    this.setState({
      visible: true,
    });
  };

  // 关闭收藏工具弹窗
  onToolCloseDialog = () => {
    this.setState({
      visible: false,
    });
  };

  // 删除收藏
  deleteCollectHandle = (id) => {
    this.props.collectAction(id, COLLECT_ACTION_DELETE).then(res => {
      this.getCollectsByCondition();
    });
  };

  render() {
    const { collectResult, isLoading } = this.props.collectResult;
    if (collectResult && collectResult.code === 200) {
      collectResultInit = this.props.collectResult.collectResult;
    }
    console.log(collectResultInit);
    return (
        <div>
          <IcePanel status="warning">
            <IcePanel.Header>
              <div className="collect-header">
                <span>收藏列表</span>
                <Balloon
                  trigger={<span onClick={this.onOpenToolDialog}><CustomIcon type="tool" style={{ marginLeft: '5px' }} /></span>}
                  triggerType="hover"
                  closable={false}
                  className="balloon-message">
                  收藏工具
                </Balloon>
                <div className="collect-search">
                  <Select
                    placeholder="选择我的标签"
                    onChange={this.onTagSelect}
                    dataSource={tagsDataHandle(collectResultInit.data.tagsList)}
                    style={{ marginRight: 10 }}
                    autoWidth={false}
                    showSearch
                    hasClear
                  />
                  <Search
                    size="medium"
                    type="normal"
                    inputWidth={300}
                    placeholder="搜点什么？"
                    searchText=""
                    onSearch={this.collectSearch}
                  />
                </div>
              </div>
            </IcePanel.Header>
            <IcePanel.Body>
              <Loading shape="fusion-reactor" visible={isLoading} style={{ width: '100%' }}>
                <div className="collect-card-list" style={{ height: '640px', overflow: 'auto' }}>
                  {
                    collectResultInit.data.list.length > 0 ? collectResultInit.data.list.map((item, index) => (
                      <div className="collect-card" key={index}>
                        <Card
                          style={{ width: '100%' }}
                          title={<a href={`${item.url}`} target="_blank" style={{ color: '#666' }}>{item.title}</a>}
                          language="en-us"
                          bodyHeight={75}
                        >
                          <p>{item.readme ? item.readme : '暂无注释'}</p>
                          <div className="collect-card-footer">
                            <span>{moment(item.createTime).format(DATE_FORMAT)}</span>
                            {
                              item.tagsEntity ?
                                <div className="collect-card-tag">
                                  <CustomIcon style={{ marginRight: '10px', color: '#666' }} type="biaoqian2" />
                                  <IceLabel className="tag-label" style={getColor(item.tagsEntity.tagName)}>
                                    <span>{item.tagsEntity.tagName}</span>
                                  </IceLabel>
                                </div> : ''
                            }

                            <div className="collect-card-opts">
                              <span>
                                <a className="collect-opt" href={`${item.url}`} target="_blank">查看</a>
                              </span>
                              <span className="collect-opt" onClick={this.onOpenUpdateDialog.bind(this, item.title, item.readme, item.id, item.tagId)}>修改</span>
                              <span className="collect-opt collect-opt-del" onClick={this.deleteCollectHandle.bind(this, item.id)}>删除</span>
                            </div>
                          </div>
                        </Card>
                      </div>
                    )) : ''
                  }
                </div>
              </Loading>
              <Pagination style={{ textAlign: 'center' }} current={this.state.currentPage} hideOnlyOnePage onChange={this.pageChangeHandle} total={collectResultInit.data.total} pageSize={collectResultInit.data.pageSize} />
            </IcePanel.Body>
          </IcePanel>
          <UpdateCollectDialog
            updateVisible={this.state.updateVisible}
            updateTitle={this.state.updateTitle}
            updateReadme={this.state.updateReadme}
            updateTagId={this.state.updateTagId}
            onUpdateCloseDialog={this.onUpdateCloseDialog}
            onUpdateOkDialog={this.onUpdateOkDialog}
          />
          <CollectToolDialog visible={this.state.visible} onToolCloseDialog={this.onToolCloseDialog} collectToolURL={this.state.collectToolURL} />
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
)(BackCollectPage);
