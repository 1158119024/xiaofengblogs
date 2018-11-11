import React, { Component } from 'react';

import CollapseCard from './components/CollapseCard';


export default class FrontIndex extends Component {

  state = {
    animation: '',
  };


  render() {
    return (
        <div className="fadeInRightBig">
          <CollapseCard />
          <CollapseCard />
          <CollapseCard />
          <CollapseCard />
          <CollapseCard />
          <CollapseCard />
          <CollapseCard />
          <CollapseCard />
          <CollapseCard />
          <CollapseCard />
        </div>
    );
  }
}
