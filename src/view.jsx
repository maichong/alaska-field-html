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

  static propTypes = {
    model: React.PropTypes.object,
    field: React.PropTypes.object,
    data: React.PropTypes.object,
    errorText: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
  };

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

  componentWillUnmount() {
    this._editor.destroy();
    delete this._editor;
    delete this._textarea;
  }

  handleChange = () => {
    if (this.props.onChange) {
      let value = this._editor.getValue();
      if (value !== this.props.value) {
        this.props.onChange(value);
      }
    }
  };

  init() {
    if (this._textarea && this._textarea !== this.refs.editor && this._editor) {
      this._editor.destroy();
      delete this._editor;
      delete this._textarea;
    }
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
      this._textarea = this.refs.editor;
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
      field,
      disabled,
      value
      } = this.props;

    let readonly = disabled || field.static;

    let editor;
    if (readonly) {
      editor = (<div
        dangerouslySetInnerHTML={{ __html: value || '' }}
        style={{
        padding: 10,
        border: '2px solid #e7e9ec',
        borderRadius: 6
        }}
      ></div>);
    } else {
      this.init();
      editor = <textarea ref="editor"/>;
    }

    let help = field.help;
    let className = 'form-group';
    if (errorText) {
      className += ' has-error';
      help = errorText;
    }
    let helpElement = help ? <p className="help-block">{help}</p> : null;

    let label = field.nolabel ? '' : field.label;

    if (field.horizontal === false) {
      let labelElement = label ? (
        <label className="control-label">{label}</label>
      ) : null;
      return (
        <div className={className}>
          {labelElement}
          {editor}
          {helpElement}
        </div>
      );
    }

    return (
      <div className={className}>
        <label className="control-label col-sm-2">{label}</label>
        <div className="col-sm-10">
          {editor}
          {helpElement}
        </div>
      </div>
    );
  }
}
