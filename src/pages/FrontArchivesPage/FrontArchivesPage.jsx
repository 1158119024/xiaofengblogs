import React, { Component } from 'react';
import { compose } from 'redux';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import { Loading } from '@icedesign/base';
import { withRouter } from 'react-router-dom';


import { articleAction } from '../BackArticlePage/actions';
import injectReducer from '../../utils/injectReducer';
import reducer from '../BackArticlePage/reducer';
import { ARTICLE_ACTION_GETARCHIVESBYCREATETIME } from '../BackArticlePage/contants';
import { CustomIcon } from '../../config/iconfont';
import { getColorRandom } from '../../config/constants';
import './frontArchivesPage.scss';

let archivesResultInit = {
  code: 0,
  data: [{
    year: 0,
    list: [{
      createTime: 0,
      year: 0,
      count: 0,
    }],
  }],
  msg: '',
};
@withRouter
class FrontArchivesPage extends Component {

  static propTypes = {
    articleResult: PropTypes.object.isRequired,
    articleAction: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.articleAction({}, ARTICLE_ACTION_GETARCHIVESBYCREATETIME);
  }

  // 跳转详情
  handleArchivesDetails = (archivesItem, event) => {
    const { history } = this.props;
    history.push(`/archives/${archivesItem.createTime}/${archivesItem.count}`);
  };

  render() {
    const { articleResult, isLoading } = this.props.articleResult;
    if (articleResult && articleResult.code === 200) {
      archivesResultInit = this.props.articleResult.articleResult;
    }
    console.log(archivesResultInit);
    return (
      <Loading shape="fusion-reactor" color="#fff" visible={isLoading} style={{ width: '100%' }}>
        <div className="fadeInRightBig">
          <div className="archives-card-list">
            {
              typeof (archivesResultInit.data.map) === 'function' ? archivesResultInit.data.map((item, index) => (
                <div className="archives-card" key={index}>
                  <header className="archives-card-header">
                    <CustomIcon style={{ marginRight: 10 }} size="xl" type="guidang" />
                    <h1 style={{ margin: 0, display: 'inline-block' }}>存档 ({item.year})</h1>
                  </header>
                  <content className="archives-card-content">
                    {
                      item.list.map((archivesItem, archivesIndex) => (
                        <div className="archives-card-content-div" key={archivesIndex} onClick={this.handleArchivesDetails.bind(this, archivesItem)}>
                          <CustomIcon className="balloon-icon" size="xxxl" style={getColorRandom()} type="biaoqian3" />
                          <div className="archives-card-content-div-span">{`${archivesItem.createTime ? archivesItem.createTime.replace('-', '年') : ''}  (${archivesItem.count})`}</div>
                        </div>
                      ))
                    }
                  </content>
                </div>
              )) : ''
            }
          </div>
        </div>
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
)(FrontArchivesPage);
