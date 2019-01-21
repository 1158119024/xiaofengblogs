import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import PropTypes from 'prop-types';
import BraftEditor from 'braft-editor';
import ColorPicker from 'braft-extensions/dist/color-picker';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import Table from 'braft-extensions/dist/table';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/code-highlighter.css';
import 'braft-extensions/dist/color-picker.css';
import 'braft-extensions/dist/table.css';

import 'prismjs/components/prism-java';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-css';

import './braftEditor.scss';
import { CustomIcon } from '../../../../config/iconfont';

const list = [
  {
    value: 0.3,
    label: '标清',
  },
  {
    value: 0.7,
    label: '高清',
  },
  {
    value: 1.0,
    label: '超清',
  },
];
// 取色器
BraftEditor.use(ColorPicker({
  theme: 'light', // 支持dark和light两种主题，默认为dark
}));
BraftEditor.use(Table({
  defaultColumns: 5,
  defaultRows: 3,
}));
export default class CustomBraftEditor extends Component {

  static propTypes = {
    updateArticle: PropTypes.func.isRequired, // 富文本内容修改
    articleContent: PropTypes.string.isRequired, // 初始值
  };

  state = {
    editorState: BraftEditor.createEditorState(),
    qualityValue: '标清',
    quality: 0.3,
  };
  componentDidMount() {
    this.isLivinig = true;
    // 1秒后更改编辑器内容
    setTimeout(this.setEditorContentAsync, 1000);
  }

  componentWillUnmount() {
    this.isLivinig = false;
  }
  // 1秒后初始化值
  setEditorContentAsync = () => {
    this.isLivinig && this.setState({
      editorState: BraftEditor.createEditorState(this.props.articleContent),
    });
  };

  // 图片清晰度变化
  qualityHandleChange = (event) => {
    const qualityValue = event.target.textContent;
    const quality = event.target.getAttribute('value');
    this.setState({
      qualityValue,
      quality,
    });
  };

  // 富文本内容改变
  handleChange = (editorState) => {
    this.setState({ editorState });
    this.props.updateArticle(editorState.toHTML());
  };

  // 上传
  myUploadFn = (param) => {
    const serverURL = '/xiaofeng/file/upload';
    const xhr = new XMLHttpRequest;
    const fd = new FormData();
    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      const responseData = JSON.parse(xhr.responseText);
      // 判断
      if (responseData && responseData.code === 200) {
        param.success({
          url: responseData.data.imageUrl,
          meta: {
            alt: responseData.data.fileName,
          },
        });
      } else {
        errorFn();
      }
    };

    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress(event.loaded / event.total * 100);
    };

    const errorFn = (response) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.',
      });
    };

    xhr.upload.addEventListener('progress', progressFn, false);
    xhr.addEventListener('load', successFn, false);
    xhr.addEventListener('error', errorFn, false);
    xhr.addEventListener('abort', errorFn, false);

    fd.append('file', param.file);
    fd.append('quality', this.state.quality);
    xhr.open('POST', serverURL, true);
    xhr.send(fd);
  };

  // 预览
  preview = () => {
    if (window.previewWindow) {
      window.previewWindow.close();
    }
    window.previewWindow = window.open();
    window.previewWindow.document.write(this.buildPreviewHtml());
    window.previewWindow.document.close();
  };

  // 预览样式
  buildPreviewHtml = () => {
    const { editorState } = this.state;
    if (!editorState) {
      return '';
    }
    return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${editorState.toHTML()}</div>
        </body>
      </html>
    `;
  };

  render() {
    const { qualityValue, quality } = this.state;
    const excludeControls = ['emoji'];
    const extendControls = [
      {
        key: 'custom-button',
        type: 'button',
        title: '预览',
        text: <CustomIcon className="balloon-icon footer-icon" type="yulan1" style={{ margin: 0 }} />,
        onClick: this.preview,
      }, {
        key: 'my-component',
        type: 'dropdown',
        title: '图片清晰度',
        text: <span>图片清晰度：{qualityValue}</span>,
        component: <div className="quality-dropdown">
          <div className="quality-dropdown-select" onClick={this.qualityHandleChange}>
            {
              list.map((item, index) => (
                <p className="quality-dropdown-option" key={index} value={item.value}>{item.label}</p>
              ))
            }
          </div>
        </div>,
      },
    ];
    const editorProps = {
      height: 500,
      contentFormat: 'html',
      value: this.state.editorState,
      onChange: this.handleChange,
      onRawChange: this.handleRawChange,
      extendControls: extendControls,
      excludeControls: excludeControls,
      media: {
        uploadFn: this.myUploadFn,
        externals: {
          image: true,
          audio: true,
          video: true,
          embed: false,
        },
      },
    };

    return (
      <IceContainer>
        <BraftEditor {...editorProps} />
      </IceContainer>
    );
  }
}
