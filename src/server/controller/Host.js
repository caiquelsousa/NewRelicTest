import RegisterApi from '../RegisterApiDecorator';
import HostService from '../service/HostService';

const hostService = new HostService();

export default class Host {
  @RegisterApi('GET', '/hosts/apps', {
    'Access-Control-Allow-Origin': '*',
  })
  static getTopAppsByHost = (req, res, done) => {
    const topAppByHost = hostService.getTopAppsByHost();

    res.write(JSON.stringify(topAppByHost));

    done();
  };

  @RegisterApi('POST', '/hosts/apps')
  static addAppToHosts = (req, res, done) => {
    let payload = '';

    req.on('data', (chunk) => {
      payload += chunk.toString();
    });
    req.on('end', () => {
      const newAppData = JSON.parse(payload);

      if (!hostService.addAppToHost(newAppData)) {
        res.statusCode = 204;
      } else {
        res.write('success');
      }
      done();
    });
  };

  @RegisterApi('DELETE', '/hosts/(?<host>.+?)/apps/(?<app>.+?)/?')
  static removeAppFromHost = (req, res, done, params) => {
    console.log(params);
    if (!hostService.removeAppFromHost(params.path.host, params.path.app)) {
      res.statusCode = 204;
    } else {
      res.write('success');
    }
    done();
  };
}
