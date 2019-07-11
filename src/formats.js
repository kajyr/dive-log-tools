const format = require('date-fns/format');

function lpad(str, pad, length) {
  while (str.length < length) {
    str = pad + str;
  }
  return str;
}

exports.datetime = date => format(date, 'YYYY-MM-DDTHH:mm:ss[Z]');
exports.time = date => format(date, 'HH:mm:ss');

// array of [hours, minutes, seconds]
exports.timeFromValues = values => values.map(val => lpad(val.toString(), '0', 2)).join(':');
