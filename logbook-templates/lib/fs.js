const { writeFile, copyFile } = require('fs/promises');
const glob = require('glob');
const path = require('path');

const globp = (pattern) =>
    new Promise((resolve, reject) =>
        glob(pattern, (err, files) => {
            if (err) {
                return reject(err);
            }
            return resolve(files);
        })
    );

function copy(file, dest) {
    const basename = path.basename(file);
    return copyFile(file, path.join(dest, basename)).then(() => basename);
}

function apply(pattern, fn) {
    return globp(pattern).then((files) => Promise.all(files.map(fn)));
}

function saveJson(file, data) {
    return writeFile(file, JSON.stringify(data, null, 2));
}

module.exports = {
    copy,
    apply,
    saveJson,
};