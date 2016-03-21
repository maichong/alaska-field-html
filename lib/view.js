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

var HtmlFieldView = function (_React$Component) {
  _inherits(HtmlFieldView, _React$Component);

  function HtmlFieldView(props, context) {
    _classCallCheck(this, HtmlFieldView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HtmlFieldView).call(this, props));

    _this.handleChange = function () {
      _this.props.onChange && _this.props.onChange(_this._editor.getValue() || '');
    };

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(HtmlFieldView, [{
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
    key: 'init',
    value: function init() {
      if (!this._editor && this.refs.editor) {
        var _props$field = this.props.field;
        var defaultImage = _props$field.defaultImage;
        var upload = _props$field.upload;

        var model = this.props.model;
        var uploadConfig = undefined;
        if (upload) {
          var adminService = this.context.settings.services['alaska-admin'];
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

      var errorTextElement = errorText ? _react2.default.createElement(
        'p',
        { className: 'help-block text-danger' },
        errorText
      ) : null;

      var labelElement = field.label && field.label.replace(/ /g, '') ? _react2.default.createElement(
        'label',
        { className: 'control-label' },
        field.label
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
  settings: _react2.default.PropTypes.object
};
exports.default = HtmlFieldView;