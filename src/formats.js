const format = require('date-fns/format');

exports.datetime = date => format(date, 'YYYY-MM-DDTHH:mm:ss[Z]');
exports.time = date => format(date, 'HH:mm:ss');
