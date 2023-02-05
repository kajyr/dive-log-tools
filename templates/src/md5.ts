import crypto from 'node:crypto';

function mkHash(str: string) {
  return crypto.createHash('md5').update(str).digest('hex');
}

export default mkHash;
