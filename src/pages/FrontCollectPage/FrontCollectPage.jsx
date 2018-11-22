import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { collectAction } from '../BackCollectPage/actions';
import injectReducer from '../../utils/injectReducer';
import reducer from '../BackCollectPage/reducer';
import { CONLLECT_ACTION_GETCOLLECTS } from '../BackCollectPage/constants';
import FrontCollectCard from './components/FrontCollectCard';

class FrontCollectPage extends Component {

  static propTypes = {
    collectAction: PropTypes.func.isRequired,
    collectResult: PropTypes.object.isRequired,
  };

  state = {
    searchTitle: '',
  };

  componentDidMount = () => {
    this.getCollectsByCondition();
  };

  getCollectsByCondition = (params) => {
    const { searchTitle } = this.state;
    this.props.collectAction({ title: searchTitle, ...params }, CONLLECT_ACTION_GETCOLLECTS);
  };


  render() {
    console.log(this.props.collectResult);
    return (
        <div className="fadeInRightBig">
          <FrontCollectCard collectResult={this.props.collectResult} />
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
)(FrontCollectPage);
