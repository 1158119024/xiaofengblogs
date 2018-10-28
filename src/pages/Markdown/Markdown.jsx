import React, { Component } from 'react';
import MarkdownDocs from './components/MarkdownDocs';

export default class Markdown extends Component {
  static displayName = 'Markdown';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="markdown-page">
        <MarkdownDocs />
      </div>
    );
  }
}
