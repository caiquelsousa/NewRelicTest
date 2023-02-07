import http from 'http';
import url from 'url';
import FileAssetController from './FileAssetController';
import ApiModule from './ApiModule';
import { initLogger } from '../common/logger';

initLogger();
ApiModule.import();

const PORT = process.env.PORT || 8080;

http
  .createServer(function (req, res) {
    // parse URL
    const parsedUrl = url.parse(req.url);

    // extract URL path
    const pathname = parsedUrl.pathname.replace(/(\..\/)*/g, ''); // replace used to prevent attacks

    if (pathname.startsWith('/api')) {
      ApiModule.execute(pathname.replace(/^\/api/, ''), req, res);
    } else {
      FileAssetController.getFile(pathname, res);
    }
  })
  .listen(PORT);
console.log(`App listening to http://localhost:${PORT}/`);
console.log('Press Ctrl+C to quit.');
