import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { moment } from '@icedesign/base';
import IceLabel from '@icedesign/label';
import { Link } from 'react-router-dom';
import { DATE_FORMAT, getColor, FRONT_PREFIX } from '../../../../config/constants';

export default class TagsDetailsMsg extends Component {

  render() {
    const { currentTags } = this.props;
    return (
        <IceContainer style={styles.container}>
          <h4 style={styles.title}>标签详细信息</h4>
          <ul style={styles.summary}>
            <li style={styles.item}>
              <span style={styles.label}>当前版本：</span>
              <span style={styles.value}>0.0.1</span>
            </li>
            <li style={styles.item}>
              <span style={styles.label}>标签名称：</span>
              <span style={styles.value}>
                <Link to={`${FRONT_PREFIX}tags/${currentTags.id}/${currentTags.tagName}/${currentTags.articleNum}`}>
                  <IceLabel className="tag-label" style={getColor(currentTags.tagName)}>{currentTags.tagName}</IceLabel>
                </Link>
              </span>
            </li>
            <li style={styles.item}>
              <span style={styles.label}>文章数量：</span>
              <span style={styles.value}>{currentTags.articleNum}</span>
            </li>
            <li style={styles.item}>
              <span style={styles.label}>创建者：</span>
              <span style={styles.value}>{currentTags.aliasname}</span>
            </li>
            <li style={styles.item}>
              <span style={styles.label}>创建时间：</span>
              <span style={styles.value}>{moment(currentTags.createTime).format(DATE_FORMAT)}</span>
            </li>
            <li style={styles.item}>
              <span style={styles.label}>-：</span>
              <span style={styles.value}>-</span>
            </li>
          </ul>
        </IceContainer>
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
  },
  summary: {
    padding: '20px',
  },
  item: {
    height: '32px',
    lineHeight: '32px',
  },
  label: {
    display: 'inline-block',
    fontWeight: '500',
    minWidth: '74px',
  },
};
