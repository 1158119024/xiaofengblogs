import React, { Component } from 'react';
import { Slider } from '@icedesign/base';

import './Dashboard.scss';

export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ width: "600px" }}>
        <Slider
          slidesToShow={4}
          arrowPos="outer"
          dots={false}
          autoplay
          autoplaySpeed={1000}
        >
          <div style={{ width: "25%" }}>
            <h4 className="h4">1</h4>
          </div>
          <div style={{ width: "25%" }}>
            <h4 className="h4">2</h4>
          </div>
          <div style={{ width: "25%" }}>
            <h4 className="h4">3</h4>
          </div>
          <div style={{ width: "25%" }}>
            <h4 className="h4">4</h4>
          </div>
        </Slider>
      </div>
    );
  }
}
