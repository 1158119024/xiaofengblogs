import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Balloon, Loading, moment, Pagination } from '@icedesign/base';
import IceLabel from '@icedesign/label';
import { withRouter } from 'react-router-dom';

import { CustomIcon } from '../../../../config/iconfont';
import './frontCollectCard.scss';
import { DATE_FORMAT, FRONT_PREFIX, getColor } from '../../../../config/constants';

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
@withRouter
export default class FrontCollectCard extends Component {

  static propTypes = {
    collectResult: PropTypes.object.isRequired,
    pageChangeHandle: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
  };

  // 跳转对应的标签
  handleClick = (item, event) => {
    const { history } = this.props;
    history.push(`${FRONT_PREFIX}collect/${item.id}/${item.tagName}/${item.articleNum}`);
  };

  render() {
    const { collectResult, isLoading } = this.props.collectResult;
    if (collectResult && collectResult.code === 200) {
      collectResultInit = this.props.collectResult.collectResult;
    }
    return (
      <Loading shape="fusion-reactor" visible={isLoading} style={{ width: '100%' }}>
        <div className="front-collect-card-list">
          {
            collectResultInit.data.list.map((item, index) => (
              <div className="front-collect-card zoomIn" key={index}>
                <header className="front-collect-card-header">
                  <a href={item.url} target="_blank" className="front-collect-card-header-title">{item.title}</a>
                </header>
                <content className="front-collect-card-content">
                  {item.readme ? item.readme : '暂无'}
                </content>
                <footer className="front-collect-card-footer">
                  <CustomIcon style={{ marginRight: '10px', color: '#666' }} type="biaoqian2" />
                  {
                    item.tagsEntity ?
                      <IceLabel className="tag-label" style={getColor(item.tagsEntity.tagName)}>
                        <span onClick={this.handleClick.bind(this, item.tagsEntity)}>{item.tagsEntity.tagName}</span>
                      </IceLabel> : ''
                  }
                  <span className="front-collect-card-footer-time">
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
                </footer>
              </div>
            ))
          }
        </div>
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          {
            collectResultInit.data.list && collectResultInit.data.list.length > 0 ?
              <Pagination
                hideOnlyOnePage
                current={this.props.currentPage}
                onChange={this.props.pageChangeHandle}
                total={collectResultInit.data.total}
                pageSize={collectResultInit.data.pageSize}
              /> : ''
          }
        </div>
      </Loading>
    );
  }
}
