import React, { Component } from 'react';
import IcePanel from '@icedesign/panel';
import { Card } from '@icedesign/base';

import './backCollectPage.scss';
import { CustomIcon } from '../../config/iconfont';


export default class BackCollectPage extends Component {

  componentDidMount() {
  }


  onOpenAdd = () => {

  };

  render() {
    return (
        <div>
          <IcePanel status="warning" style={{marginBottom: '10px'}}>
            <IcePanel.Header>
              <div>
                <span>收藏列表</span>
                <CustomIcon type="zengjia-cuxiantiao" style={{ marginLeft: '5px' }} onClick={this.onOpenAdd} />
              </div>
            </IcePanel.Header>
            <IcePanel.Body>
              <div className="collect-card">
                <Card
                  style={{ width: '100%' }}
                  title="阿里老黄历"
                  language="en-us"
                  bodyHeight={50}
                >
                  <p>Card content</p>
                </Card>
              </div>
            </IcePanel.Body>
          </IcePanel>
        </div>
    );
  }
}
