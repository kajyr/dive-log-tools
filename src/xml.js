const { parseString } = require('xml2js');

function parse(xml) {
  return new Promise((resolve, reject) =>
    parseString(xml, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    }),
  );
}

module.exports = {
  parse,
};
