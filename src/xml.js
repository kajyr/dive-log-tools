const fs = require('fs-extra');
const { parseString } = require('xml2js');

const read = file => fs.readFile(file, 'utf8').then(parseXml);

function parseXml(xml) {
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
  read,
};
