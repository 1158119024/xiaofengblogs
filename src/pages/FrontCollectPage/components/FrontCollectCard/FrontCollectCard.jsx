import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Balloon, Loading, moment } from '@icedesign/base';

import { CustomIcon } from '../../../../config/iconfont';
import './frontCollectCard.scss';
import IceLabel from '@icedesign/label';
import { DATE_FORMAT, getColor } from '../../../../config/constants';

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
export default class FrontCollectCard extends Component {

  static propTypes = {
    collectResult: PropTypes.object.isRequired,
  };

  render() {
    const { collectResult, isLoading } = this.props.collectResult;
    if (collectResult && collectResult.code === 200) {
      collectResultInit = this.props.collectResult.collectResult;
    }
    console.log(collectResultInit);
    return (
      <Loading shape="fusion-reactor" visible={isLoading} style={{ width: '100%' }}>
        <div className="front-collect-card-list">
          {
            collectResultInit.data.list.map((item, index) => (
              <div className="front-collect-card" key={index}>
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
                        <span>{item.tagsEntity.tagName}</span>
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
      </Loading>
    );
  }
}
