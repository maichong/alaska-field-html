/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-17
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import ContextPure from 'material-ui/lib/mixins/context-pure';
import { shallowEqual } from 'alaska-admin-view';
import Simditor from 'simditor';
import 'simditor/styles/simditor.css';

export default class HtmlFieldView extends React.Component {

  //static propTypes = {
  //  children: React.PropTypes.node
  //};
  //
  static contextTypes = {
    muiTheme: React.PropTypes.object,
    //views: React.PropTypes.object,
    //settings: React.PropTypes.object,
  };
  //
  //static childContextTypes = {
  //  muiTheme: React.PropTypes.object,
  //  views: React.PropTypes.object,
  //  settings: React.PropTypes.object,
  //};
  //
  //static mixins = [
  //  ContextPure
  //];

  constructor(props, context) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      muiTheme: context.muiTheme,
      //views: context.views,
      //settings: context.settings,
    };
  }

  //getChildContext() {
  //  return {
  //    muiTheme: this.state.muiTheme,
  //    views: this.context.views,
  //    settings: this.context.settings,
  //  };
  //}

  //componentWillReceiveProps(nextProps, nextContext) {
  //  let newState = {};
  //  if (nextContext.muiTheme) {
  //    newState.muiTheme = nextContext.muiTheme;
  //  }
  //  if (nextContext.views) {
  //    newState.views = nextContext.views;
  //  }
  //  this.setState(newState);
  //}

  shouldComponentUpdate(props) {
    return !shallowEqual(props, this.props, 'data', 'model');
  }

  componentDidMount() {
    this.init();
  }

  getStyles() {
    const muiTheme = this.state.muiTheme;
    let floatingLabelColor = muiTheme.textField.hintColor;
    let backgroundColor = muiTheme.textField.backgroundColor;
    let errorColor = muiTheme.textField.errorColor;

    return {
      root: {
        fontSize: 16,
        lineHeight: '24px',
        width: '100%',
        display: 'block',
        position: 'relative',
        backgroundColor: backgroundColor,
        fontFamily: muiTheme.rawTheme.fontFamily,
        marginTop: 20
      },
      floatingLabel: {
        position: 'relative',
        color: floatingLabelColor,
        marginBottom: 5,
        lineHeight: '22px',
        fontSize: '12px',
        bottom: 'none',
        opacity: 1,
        cursor: 'text',
      },
      error: {
        position: 'relative',
        bottom: 5,
        fontSize: 12,
        lineHeight: '12px',
        color: errorColor,
        marginTop: 10
      }
    };
  }

  handleChange() {
    this.props.onChange && this.props.onChange(this._editor.getValue() || '');
  }

  init() {
    if (!this._editor && this.refs.editor) {
      let {
        toolbar,
        toolbarFloat,
        toolbarFloatOffset,
        toolbarHidden,
        defaultImage,
        tabIndent,
        params,
        upload,
        pasteImage,
        cleanPaste,
        imageButton,
        allowedTags,
        allowedAttributes,
        allowedStyles,
        codeLanguages,
        locale,
        } = this.props;
      if (typeof locale !== 'undefined') {
        Simditor.locale = locale;
      }
      this._editor = new Simditor({
        textarea: this.refs.editor,
        toolbar,
        toolbarFloat,
        toolbarFloatOffset,
        toolbarHidden,
        defaultImage,
        tabIndent,
        params,
        upload,
        pasteImage,
        cleanPaste,
        imageButton,
        allowedTags,
        allowedAttributes,
        allowedStyles,
        codeLanguages
      });
      this._editor.setValue(this.props.value || '');
      this._editor.on('valuechanged', this.handleChange);
    }
  }

  render() {
    let {
      errorText,
      field
      } = this.props;

    this.init();
    let styles = this.getStyles();

    let labelElement = field.label ? (
      <label style={styles.floatingLabel}>
        {field.label}
      </label>
    ) : null;

    let errorTextElement = errorText ? (
      <div style={styles.error}>{errorText}</div>
    ) : null;

    return (
      <div>
        {labelElement}
        <textarea ref="editor"/>
        {errorTextElement}
      </div>
    );
  }
}
