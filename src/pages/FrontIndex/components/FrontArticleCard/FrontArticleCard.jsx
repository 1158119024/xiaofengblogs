import React, { Component } from 'react';
import IceEllipsis from '@icedesign/ellipsis';
import IceLabel from '@icedesign/label';
import { Balloon, Card, Loading, moment, Pagination } from '@icedesign/base';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { CustomIcon } from '../../../../config/iconfont';
import { DATE_FORMAT, FRONT_PREFIX, getColor } from '../../../../config/constants';

let articleResultInit = {
  code: 0,
  data: {
    startRow: 0,
    navigatepageNums: [1, 2],
    lastPage: 0,
    prePage: 0,
    hasNextPage: true,
    nextPage: 0,
    pageSize: 0,
    endRow: 0,
    list: [],
    pageNum: 1,
    navigatePages: 0,
    total: 0,
    navigateFirstPage: 1,
    pages: 0,
    size: 10,
    firstPage: 1,
    isLastPage: false,
    hasPreviousPage: false,
    navigateLastPage: 2,
    isFirstPage: true,
    tagList: [{}],
  },
  tagsList: [],
  msg: '',
};
@withRouter
export default class FrontArticleCard extends Component {

  static propTypes = {
    articleResult: PropTypes.object.isRequired,
    pageChangeHandle: PropTypes.func.isRequired,
  };

  handleClick = (item, event) => {
    const { history } = this.props;
    history.push(`${FRONT_PREFIX}tags/${item.id}/${item.tagName}/${item.articleNum}`);
  };

  render() {
    const { articleResult, isLoading } = this.props.articleResult;
    if (articleResult && articleResult.code === 200) {
      articleResultInit = this.props.articleResult.articleResult;
    }
    return (
      <Loading shape="fusion-reactor" color="#fff" visible={isLoading} style={{ width: '100%' }}>
        <div className="right-card-list">
          {
            articleResultInit.data.list && articleResultInit.data.list.length > 0 ? articleResultInit.data.list.map((item, index) => (
              <div className="right-card-div zoomIn" key={index}>
                {
                  item.isTop ? <CustomIcon className="right-card-icon" size="xxl" type="top" /> : ''
                }
                <Card
                  title={
                    <Link to={`${FRONT_PREFIX}article/${item.id}`} className="right-card-title">
                      {item.title}
                      <div className="windmill">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </Link>
                  }
                  titleBottomLine={false}
                  bodyHeight={100}
                  className="right-card"
                >
                  <div className="right-card-content">
                    <IceEllipsis text={item.content && item.content.replace(/<\/?.+?>/g, '')} />
                  </div>
                  <div className="right-card-footer">
                    <span className="right-card-footer-tags">
                      <CustomIcon style={{ marginRight: '10px', color: '#666' }} type="biaoqian2" />
                      {
                        item.tagList && item.tagList.map((tagItem, tagIndex) => (
                          <IceLabel className="tag-label" style={getColor(tagItem.tagName)} key={tagIndex}>
                            <span onClick={this.handleClick.bind(this, tagItem)}>{tagItem.tagName}</span>
                          </IceLabel>

                        ))
                      }
                    </span>
                    <span className="right-card-footer-time">
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
                  </div>
                </Card>
              </div>
            )) : ''
          }
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            {
              articleResultInit.data.list && articleResultInit.data.list.length > 0 ?
                <Pagination
                  hideOnlyOnePage
                  current={articleResultInit.data.pageNum}
                  onChange={this.props.pageChangeHandle}
                  total={articleResultInit.data.total}
                  pageSize={articleResultInit.data.pageSize}
                /> : ''
            }
          </div>
        </div>
      </Loading>
    );
  }
}
