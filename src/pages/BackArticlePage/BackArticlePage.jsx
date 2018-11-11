import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import WriteBlogsPage from './components/WriteBlogsPage';
import { ADMIN_PREFIX } from '../../config/constants';

export default class BackArticlePage extends Component {

  handleClick = () => {
    console.log(this.props);
    this.props.history.replace(`${ADMIN_PREFIX}/article/write`);
  };

  render() {
    return (
        <div>
          <Link to="/manage/article/write" >写博客</Link>
          <div onClick={this.handleClick}>写博客</div>
          {/*<Switch>
            <Route path="/manage/article/write" component={WriteBlogsPage} />
          </Switch>*/}
        </div>
    );
  }
}
