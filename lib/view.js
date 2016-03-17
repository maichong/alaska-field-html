'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _alaskaAdminView = require('alaska-admin-view');

var _simditor = require('simditor');

var _simditor2 = _interopRequireDefault(_simditor);

require('simditor/styles/simditor.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016-03-17
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

//import ContextPure from 'material-ui/lib/mixins/context-pure';


var HtmlFieldView = function (_React$Component) {
  _inherits(HtmlFieldView, _React$Component);

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

  function HtmlFieldView(props, context) {
    _classCallCheck(this, HtmlFieldView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HtmlFieldView).call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);
    _this.state = {
      muiTheme: context.muiTheme,
      //views: context.views,
      settings: context.settings
    };
    return _this;
  }

  //getChildContext() {
  //  return {
  //    muiTheme: this.state.muiTheme,
  //    views: this.context.views,
  //    settings: this.context.settings,
  //  };
  //}

  //static propTypes = {
  //  children: React.PropTypes.node
  //};
  //


  _createClass(HtmlFieldView, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var newState = {};
      if (nextContext.muiTheme) {
        newState.muiTheme = nextContext.muiTheme;
      }
      //if (nextContext.views) {
      //  newState.views = nextContext.views;
      //}
      if (nextContext.settings) {
        newState.settings = nextContext.settings;
      }
      this.setState(newState);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props) {
      return !(0, _alaskaAdminView.shallowEqual)(props, this.props, 'data', 'model');
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: 'getStyles',
    value: function getStyles() {
      var muiTheme = this.state.muiTheme;
      var floatingLabelColor = muiTheme.textField.hintColor;
      var backgroundColor = muiTheme.textField.backgroundColor;
      var errorColor = muiTheme.textField.errorColor;

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
          cursor: 'text'
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
  }, {
    key: 'handleChange',
    value: function handleChange() {
      this.props.onChange && this.props.onChange(this._editor.getValue() || '');
    }
  }, {
    key: 'init',
    value: function init() {
      if (!this._editor && this.refs.editor) {
        var _props$field = this.props.field;
        var defaultImage = _props$field.defaultImage;
        var upload = _props$field.upload;

        var model = this.props.model;
        var uploadConfig = undefined;
        if (upload) {
          var adminService = this.state.settings.services['alaska-admin'];
          uploadConfig = {
            url: adminService.prefix + '/api/upload?service=' + upload.service + '&model=' + upload.model + '&editor=1',
            fileKey: 'file',
            params: {
              path: upload.path
            },
            leaveConfirm: upload.leaveConfirm
          };
        }
        this._editor = new _simditor2.default({
          textarea: this.refs.editor,
          defaultImage: defaultImage,
          upload: uploadConfig
        });
        this._editor.setValue(this.props.value || '');
        this._editor.on('valuechanged', this.handleChange);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var errorText = _props.errorText;
      var field = _props.field;


      this.init();
      var styles = this.getStyles();

      var labelElement = field.label ? _react2.default.createElement(
        'label',
        { style: styles.floatingLabel },
        field.label
      ) : null;

      var errorTextElement = errorText ? _react2.default.createElement(
        'div',
        { style: styles.error },
        errorText
      ) : null;

      return _react2.default.createElement(
        'div',
        null,
        labelElement,
        _react2.default.createElement('textarea', { ref: 'editor' }),
        errorTextElement
      );
    }
  }]);

  return HtmlFieldView;
}(_react2.default.Component);

HtmlFieldView.contextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  //views: React.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
exports.default = HtmlFieldView;