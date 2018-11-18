import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import PropTypes from 'prop-types';
import { Grid, moment } from '@icedesign/base';
import PieChart from './PieChart';
import { DATE_FORMAT } from '../../../../config/constants';
import TagsDetailsMsg from './TagsDetailsMsg';

const { Row, Col } = Grid;

let currentItemInit = {
  aliasname: '',
  articleNum: 0,
  createTime: 0,
  id: 0,
  tagName: '',
};
export default class OverviewInfo extends Component {

  static displayName = 'OverviewInfo';

  static propTypes = {
    tagsResult: PropTypes.array.isRequired,
  };

  state = {
    currentItem: {},
    currentItem2: {},
    formatTags: [],
    tagsResult: [],
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.dataFormat(nextProps.tagsResult);
  }

  dataFormat = (tagsResult) => {
    console.log(tagsResult);
    if (tagsResult && tagsResult.length > 0) {
      const formatTags = [[], []];
      const originTags = [];
      for (let i = 0; i < tagsResult.length; i++) {
        if (i < 5) {
          formatTags[0].push({ id: tagsResult[i].id, item: tagsResult[i].tagName, count: tagsResult[i].articleNum });
        } else {
          formatTags[1].push({ id: tagsResult[i].id, item: tagsResult[i].tagName, count: tagsResult[i].articleNum });
        }
        originTags.push(tagsResult[i]);
      }
      this.setState({
        currentItem: tagsResult.length > 0 ? tagsResult[0] : {},
        currentItem2: tagsResult.length > 5 ? tagsResult[5] : {},
        formatTags,
        tagsResult: originTags,
      });
    }
  };

  // 选中饼图后
  currentTagId = (id, key) => {
    if (id) {
      const { tagsResult } = this.state;
      const currentItem = tagsResult.find(item => (
        item.id === id
      ));
      if (key === '0') {
        this.setState({
          currentItem,
        });
      } else if (key === '1') {
        this.setState({
          currentItem2: currentItem,
        });
      }
    }
  };

  render() {
    const { currentItem, formatTags, currentItem2 } = this.state;
    if (currentItem) {
      currentItemInit = currentItem;
    }
    console.log(this.state);
    return (
      <div>
        {
          formatTags[0] && formatTags[0].length > 0 ?
            <Row style={{ padding: '20px' }} wrap gutter={20} >
              <Col l="12">
                <IceContainer style={styles.container}>
                  <h4 style={styles.title}>标签统计</h4>
                  <PieChart currentTagId={this.currentTagId} currentIndex="0" formatTags={formatTags[0] ? formatTags[0] : []} />
                </IceContainer>
              </Col>
              <Col l="12">
                <TagsDetailsMsg currentTags={this.state.currentItem} />
              </Col>
            </Row> : ''
        }

        {
          formatTags[1] && formatTags[1].length > 0 ?
            <Row style={{ padding: '20px' }} wrap gutter={20}>
              <Col l="12">
                <IceContainer style={styles.container}>
                  <h4 style={styles.title}>标签统计</h4>
                  <PieChart currentTagId={this.currentTagId} currentIndex="1" formatTags={formatTags[1] ? formatTags[1] : []} />
                </IceContainer>
              </Col>
              <Col l="12">
                <TagsDetailsMsg currentTags={this.state.currentItem2} />
              </Col>
            </Row>
            : ''
        }
      </div>
    );
  }
}
const styles = {
  container: {
    margin: '0',
    padding: '0',
  },
  title: {
    margin: '0',
    padding: '15px 20px',
    fonSize: '16px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: 'rgba(0,0,0,.85)',
    fontWeight: '500',
    borderBottom: '1px solid #eee',
  }};
