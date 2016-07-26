/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-17
 * @author Liang <liang@maichong.it>
 */

'use strict';

const alaska = require('alaska');

class HtmlField extends alaska.Field {

  init() {
    if (!this.filter && this.filter !== false) {
      this.filter = 'TextFieldFilter';
    }
  }

  createFilter(filter) {
    let exact = true;
    let inverse = false;
    let value = filter;
    if (typeof filter === 'object') {
      value = filter.value;
      exact = filter.exact !== false && filter.exact !== 'false';
      inverse = filter.inverse === true || filter.inverse === 'true';
    }
    let result;

    if (value) {
      if (exact) {
        result = new RegExp('^' + alaska.util.escapeRegExp(value) + '$', 'i');
      } else {
        result = new RegExp(alaska.util.escapeRegExp(value), 'i');
      }
      if (inverse) {
        result = { $not: result };
      }
    } else {
      if (inverse) {
        result = { $nin: ['', null] };
      } else {
        result = { $in: ['', null] };
      }
    }
    return result;
  }

}

HtmlField.views = {
  cell: {
    name: 'HtmlFieldCell',
    path: __dirname + '/lib/cell.js'
  },
  view: {
    name: 'HtmlFieldView',
    path: __dirname + '/lib/view.js'
  }
};

HtmlField.plain = String;

HtmlField.viewOptions = ['upload', 'defaultImage'];

module.exports = HtmlField;
