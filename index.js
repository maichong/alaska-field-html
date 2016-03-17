/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-17
 * @author Liang <liang@maichong.it>
 */

'use strict';

exports.views = {
  cell: {
    name: 'HtmlFieldCell',
    field: __dirname + '/lib/cell.js'
  },
  view: {
    name: 'HtmlFieldView',
    field: __dirname + '/lib/view.js'
  }
};

exports.plain = String;
