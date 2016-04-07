/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-17
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import { shallowEqual } from 'alaska-admin-view';
import Simditor from 'simditor';
import 'simditor/styles/simditor.css';

export default class HtmlFieldView extends React.Component {

  static contextTypes = {
    settings: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  shouldComponentUpdate(props) {
    return !shallowEqual(props, this.props, 'data', 'model');
  }

  componentDidMount() {
    this.init();
  }

  handleChange = () => {
    this.props.onChange && this.props.onChange(this._editor.getValue() || '');
  };

  init() {
    if (!this._editor && this.refs.editor) {
      let { defaultImage, upload } = this.props.field;
      let uploadConfig;
      if (upload) {
        let adminService = this.context.settings.services['alaska-admin'];
        uploadConfig = {
          url: `${adminService.prefix}/api/upload?service=${upload.service}&model=${upload.model}&editor=1`,
          fileKey: 'file',
          params: {
            path: upload.path
          },
          leaveConfirm: upload.leaveConfirm
        };
      }
      this._editor = new Simditor({
        textarea: this.refs.editor,
        defaultImage,
        upload: uploadConfig
      });
      this._editor.on('valuechanged', this.handleChange);
    }
    if (this._editor && this._editor.getValue() != this.props.value) {
      this._editor.setValue(this.props.value || '');
    }
  }

  render() {
    let {
      errorText,
      field
      } = this.props;

    const fullWidth = field.fullWidth;

    this.init();

    let helpElement = field.help ? (
      <p className="help-block">{field.help}</p>
    ) : null;

    let errorTextElement = errorText ? (
      <p className="help-block"><span className="text-danger">{errorText}</span></p>
    ) : null;

    if (fullWidth) {

      let labelElement = field.label && !field.nolabel ? (
        <label className="control-label">{field.label}</label>
      ) : null;
      return (
        <div>
          {labelElement}
          <textarea ref="editor"/>
          {helpElement}
          {errorTextElement}
        </div>
      );
    } else {
      return (
        <div className="form-group">
          <label className="control-label col-xs-2">{field.label}</label>
          <div className="col-xs-10">
            <textarea ref="editor"/>
            {helpElement}
            {errorTextElement}
          </div>
        </div>
      );
    }

  }
}
