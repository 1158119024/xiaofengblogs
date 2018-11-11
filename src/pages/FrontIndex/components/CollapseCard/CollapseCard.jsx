import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Icon, Grid, Balloon, Badge } from '@icedesign/base';
import { Link } from 'react-router-dom';
import Label from '@icedesign/label';

import './scss/CollapseCard.scss';
import { CustomIcon } from '../../../../config/iconfont';

const { Row, Col } = Grid;


export default class CollapseCard extends Component {
  static displayName = 'CollapseCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
    };
  }

  toggleCollapse = () => {
    const { collapse } = this.state;
    this.setState({
      collapse: !collapse,
    });
  };

  render() {
    const { collapse } = this.state;
    const collapseStyle = collapse ? styles.collapse : null;
    return (
      <div className="collapse-card">
        <IceContainer>
          <div style={styles.summaryInfo}>
            <img
              style={styles.itemLogo}
              src={require('./images/TB1EBQ.hZLJ8KJjy0FnXXcFDpXa-300-300.png')}
              alt=""
            />
            <div style={styles.infoIntro}>
              <Link to="/article/" className="link" >
                <h1 className="info-title">
                  戴森
                  <Balloon align="tr" triggerType="hover" className="balloon-message" closable={false} trigger={
                    <sup style={{ marginLeft: '5px' }} >
                      <Label style={{ backgroundColor: '#fcdbd9', color: '#f04134' }}>
                        New
                      </Label>
                    </sup>
                  }>
                    刚出炉的！
                  </Balloon>
                  <Balloon align="tr" triggerType="hover" className="balloon-message" closable={false} trigger={
                    <sup style={{ marginLeft: '5px' }}>
                      <Label style={{ backgroundColor: '#f04134', color: '#fff' }}>
                        <CustomIcon size="xs" type="zhiding3" />
                        置顶
                      </Label>
                    </sup>
                  }>
                    置顶？
                  </Balloon>
                </h1>
              </Link>

            <p style={styles.infoDesc}>
                作为一家英国创新科技公司,戴森致力于设计和研发能用科技来简化人们生活的产品.戴森官方旗舰店保修长达5年,您可以在戴森官方联络中心购买零件,每周7天提供服务{' '}
              </p>
            </div>
          </div>
          <Row style={{ ...styles.baseInfo, ...collapseStyle }}>
            <Col xxs="24" xs="12" s="12" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>分类：</span>
              <span style={styles.infoItemValue}>spring</span>
            </Col>
            <Col xxs="24" xs="12" s="12" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>创建时间：</span>
              <span style={styles.infoItemValue}>2018-11-2</span>
            </Col>
            <Col xxs="24" xs="12" s="12" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>标签：</span>
              <Link to="/tags/">
                <Label style={{ backgroundColor: '#d2eafb', color: '#108ee9' }}>springCloud</Label>
              </Link>

            </Col>
          </Row>
          <div className="toggle-btn" style={styles.toggleBtn}>
            <a
              className="toggle-btn"
              style={styles.toggleBtn}
              onClick={this.toggleCollapse}
            >
              <span style={{ marginRight: '5px' }}>
                {collapse ? '更多信息' : '收起'}
              </span>
              <Icon size="xs" type={collapse ? 'arrow-down' : 'arrow-up'} />
            </a>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  collapse: {
    display: 'none',
  },
  summaryInfo: {
    display: 'flex',
    borderBottom: '1px solid #e7e7eb',
  },
  baseInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: '20px',
  },
  infoItem: {
    width: '50%',
    marginBottom: '15px',
  },
  infoItemLabel: {
    color: '#999',
  },
  itemLogo: {
    width: '100px',
    height: '100px',
  },
  infoIntro: {
    marginLeft: '20px',
    paddingBottom: '20px',
  },
  infoDesc: {
    color: '#999',
  },
  toggleBtn: {
    marginTop: '20px',
    textAlign: 'center',
    color: '#999',
    textDecoration: 'none',
    cursor: 'pointer',
  },
};
