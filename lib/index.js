'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = tags;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function tags(opts) {
  var settings = _extends({
    trim: true,
    oneLine: false,
    stripIndent: false,
    includeArrays: false
  }, opts);
  // return a tag function that transforms our template
  return function tag(template) {
    for (var _len = arguments.length, expressions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      expressions[_key - 1] = arguments[_key];
    }

    // join the parts necessary to re-construct the template
    var temp = template.reduce(function (accumulator, part, i) {
      var expression = expressions[i - 1];
      if (settings.includeArrays && Array.isArray(expression)) {
        var sep = settings.includeArrays.separator || '';
        var con = settings.includeArrays.conjunction;
        // inline arrays, making sure to include item separator
        expression = expression.join(sep + accumulator.match(/(\s+)$/)[1]);
        if (con) {
          // replace the last separator with the conjunction
          var sepIndex = expression.lastIndexOf(sep);
          expression = expression.substr(0, sepIndex) + ' ' + con + expression.substr(sepIndex + 1);
        }
      }
      return accumulator + expression + part;
    });
    // replace any newlines with spaces if we just want
    // a one liner
    if (settings.oneLine) temp = temp.replace(/(?:\s+)/g, ' ');
    if (settings.oneLineTrim) temp = temp.replace(/(?:\n\s+)/g, '');
    if (settings.stripIndent) {
      // strip leading indents
      var match = temp.match(/^[ \t]*(?=\S)/gm);
      var indent = Math.min.apply(Math, _toConsumableArray(match.map(function (el) {
        return el.length;
      })));
      var regexp = new RegExp('^[ \\t]{' + indent + '}', 'gm');
      temp = indent > 0 ? temp.replace(regexp, '') : temp;
    }
    // trim leading and trailing whitespace
    if (settings.trim) temp = temp.trim();
    return temp;
  };
}

var html = tags({
  stripIndent: true,
  includeArrays: true
});

exports.html = html;
var oneLine = tags({
  oneLine: true
});

exports.oneLine = oneLine;
var oneLineTrim = tags({
  oneLineTrim: true
});

exports.oneLineTrim = oneLineTrim;
var inlineLists = tags({
  includeArrays: true
});

exports.inlineLists = inlineLists;
var stripIndent = tags({
  stripIndent: true
});

exports.stripIndent = stripIndent;
var commaLists = tags({
  includeArrays: {
    separator: ','
  }
});

exports.commaLists = commaLists;
var commaListsOr = tags({
  includeArrays: {
    separator: ',',
    conjunction: 'or'
  }
});

exports.commaListsOr = commaListsOr;
var commaListsAnd = tags({
  includeArrays: {
    separator: ',',
    conjunction: 'and'
  }
});

exports.commaListsAnd = commaListsAnd;
var oneLineCommaLists = tags({
  includeArrays: {
    separator: ','
  },
  oneLine: true
});

exports.oneLineCommaLists = oneLineCommaLists;
var oneLineCommaListsOr = tags({
  includeArrays: {
    separator: ',',
    conjunction: 'or'
  },
  oneLine: true
});

exports.oneLineCommaListsOr = oneLineCommaListsOr;
var oneLineCommaListsAnd = tags({
  includeArrays: {
    separator: ',',
    conjunction: 'and'
  },
  oneLine: true
});
exports.oneLineCommaListsAnd = oneLineCommaListsAnd;