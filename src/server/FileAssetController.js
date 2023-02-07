import path from 'path';
import fs from 'fs';

const DIST_DIR = __dirname;

// maps file extention to MIME typere
const map = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
};

export default class FileAssetController {
  static getFile(pathname, res) {
    let filePathname = path.join(DIST_DIR, pathname);

    fs.exists(filePathname, function (exist) {
      if (!exist) {
        // if the file is not found, return 404
        res.statusCode = 404;
        res.end(`File ${filePathname} not found!`);
        return;
      }

      // based on the URL path, extract the file extention. e.g. .js, .doc, ...
      const ext = path.parse(filePathname).ext || '.html';
      // if is a directory search for index file matching the extention
      if (fs.statSync(filePathname).isDirectory())
        filePathname += 'index' + ext;

      // read file from file system
      fs.readFile(filePathname, function (err, data) {
        if (err) {
          res.statusCode = 500;
          res.end(`Error getting the file: ${err}.`);
        } else {
          // if the file is found, set Content-type and send data
          res.setHeader('Content-type', map[ext] || 'text/plain');
          res.end(data);
        }
      });
    });
  }
}
