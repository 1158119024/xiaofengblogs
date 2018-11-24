import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import { Balloon, Loading, moment } from '@icedesign/base';
import PropTypes from 'prop-types';
import IceLabel from '@icedesign/label';

import { articleAction } from '../BackArticlePage/actions';
import injectReducer from '../../utils/injectReducer';
import reducer from '../BackArticlePage/reducer';
import { ARTICLE_ACTION_GETARTICLEANDPREANDNEXTBYID, ARTICLE_ACTION_GETARTICLEBYID } from '../BackArticlePage/contants';
import './frontArticleDetailsPage.scss';
import { DATE_FORMAT, FRONT_PREFIX, getColor } from '../../config/constants';
import { CustomIcon } from '../../config/iconfont';
import { Link } from 'react-router-dom';

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
    prevArticleEntity: {},
    nextArticleEntity: {},
  },
  msg: '',
};

class FrontArticleDetailsPage extends Component {

  static propTypes = {
    articleAction: PropTypes.func.isRequired, // crud操作函数
    articleResult: PropTypes.object.isRequired,
  };

  state = {
    id: '',
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.setState({
      id,
    }, () => {
      this.getArticleAndPreAndNextById();
    });
  };

  componentWillReceiveProps = (props) => {
    const { id } = props.match.params;
    if (id && id !== this.state.id) {
      this.setState({
        id,
      }, () => {
        this.getArticleAndPreAndNextById();
      });
    }
  };

  // 以当前文章id为中，查询上中下三篇
  getArticleAndPreAndNextById = () => {
    const { id } = this.state;
    this.props.articleAction({ id }, ARTICLE_ACTION_GETARTICLEANDPREANDNEXTBYID);
  };

  // 跳转对应的标签
  handleClick = (item, event) => {
    const { history } = this.props;
    history.push(`${FRONT_PREFIX}tags/${item.id}/${item.tagName}/${item.articleNum}`);
  };

  // 跳转上下一篇
  handleArticleClick = (id) => {
    const { history } = this.props;
    history.push(`${FRONT_PREFIX}article/${id}`);
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
            <div className="article-details-content-footer">
              <div className="article-details-content-footer-opt">
                {
                  articleResultInit.data.prevArticleEntity ?
                    <div
                      className="article-details-content-footer-div article-details-content-footer-pre"
                      onClick={this.handleArticleClick.bind(this, articleResultInit.data.prevArticleEntity.id)}
                    >
                      <CustomIcon type="tikushaonv-shangxiayige" />
                      <span className="content-footer">
                      {articleResultInit.data.prevArticleEntity.title}
                    </span>
                    </div>
                    : ''
                }

                {
                  articleResultInit.data.nextArticleEntity ?
                    <div
                      className="article-details-content-footer-div article-details-content-footer-next"
                      onClick={this.handleArticleClick.bind(this, articleResultInit.data.nextArticleEntity.id)}
                    >
                    <span className="content-footer">
                      {articleResultInit.data.nextArticleEntity.title}
                    </span>
                      <CustomIcon type="xiayige" />
                    </div>
                    : ''
                }
              </div>
              <div className="article-details-content-footer-icon">
                {/*<CustomIcon type="liulan" />{articleResultInit.data.browseNum}*/}
              </div>
            </div>
            <hr />
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
)(FrontArticleDetailsPage);
