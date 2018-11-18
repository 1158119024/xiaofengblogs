import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import { Balloon, Loading, moment } from '@icedesign/base';
import PropTypes from 'prop-types';
import IceLabel from '@icedesign/label';

import { articleAction } from '../BackArticlePage/actions';
import injectReducer from '../../utils/injectReducer';
import reducer from '../BackArticlePage/reducer';
import { ARTICLE_ACTION_GETARTICLEBYID } from '../BackArticlePage/contants';
import './frontArticlePage.scss';
import { DATE_FORMAT, FRONT_PREFIX, getColor } from '../../config/constants';
import { CustomIcon } from '../../config/iconfont';

let articleResultInit = {
  code: 200,
  data: {
    commendNum: 0,
    isPrivate: false,
    title: '',
    userId: 1,
    tagsId: '',
    content: '',
    commentNum: 0,
    tagList: [],
    createTime: 1542296474000,
    isTop: true,
    topGrade: 1,
    id: 66,
    state: 1,
    browseNum: 0,
  },
  msg: '',
};

class FrontArticlePage extends Component {

  static propTypes = {
    articleAction: PropTypes.func.isRequired, // crud操作函数
    articleResult: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.articleAction(id, ARTICLE_ACTION_GETARTICLEBYID);
  }

  handleClick = (item, event) => {
    const { history } = this.props;
    history.push(`${FRONT_PREFIX}tags/${item.id}/${item.tagName}/${item.articleNum}`);
  };

  render() {
    const { articleResult, isLoading } = this.props.articleResult;
    if (articleResult && articleResult.code === 200) {
      articleResultInit = this.props.articleResult.articleResult;
    }
    console.log(articleResultInit);
    return (
      <Loading shape="fusion-reactor" style={{ width: '100%' }} visible={isLoading}>
        <article className="article-details fadeInRightBig">
          <header className="article-details-header">
            <h1 className="article-details-header-title">{articleResultInit.data.title}</h1>
            <div className="article-details-header-time">
              <Balloon
                trigger={<span><CustomIcon style={{ marginRight: '10px' }} size="small" type="Group" /></span>}
                triggerType="hover"
                closable={false}
                align="b"
                className="balloon-message"
              >
                发表日期
              </Balloon>
              <span>{moment(articleResultInit.data.createTime).format(DATE_FORMAT)}</span>
            </div>
            <div className="article-details-header-tags">
              <CustomIcon style={{ marginRight: '10px', color: '#666' }} type="biaoqian2" />
              {
                articleResultInit.data.tagList && articleResultInit.data.tagList.map((tagItem, tagIndex) => (
                  <IceLabel className="tag-label" style={getColor(tagItem.tagName)} key={tagIndex}>
                    <span onClick={this.handleClick.bind(this, tagItem)}>{tagItem.tagName}</span>
                  </IceLabel>
                ))
              }
            </div>
          </header>
          <div className="article-details-content">
            <hr />
            <div className="container" dangerouslySetInnerHTML={{ __html: articleResultInit.data.content }}></div>
          </div>
        </article>
      </Loading>
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
)(FrontArticlePage);
