import url from 'url';
import apiList from './controller';
class ApiModule {
  static _restAPIConfig = {
    GET: {},
    POST: {},
    DELETE: {},
    PUT: {},
  };

  static import() {
    for (let api of apiList) {
      for (let {
        method,
        path,
        funcName,
        headerOptions,
      } of api.getEndpoints()) {
        this.register(method, path, api[funcName], headerOptions);
      }
    }
  }

  static register(method, path, apiFunction, headerOptions = {}) {
    const restMethodObj = this._restAPIConfig[method];
    const pathObj = {
      headerOptions,
      apiFunction,
    };
    let type = 'regular';
    if (/\(\?<.+?>.+?\)/.test(path)) {
      type = 'regex';
    }
    restMethodObj[type] = restMethodObj[type] || {};
    restMethodObj[type][path] = pathObj;
  }

  static _parseQuery(query = '') {
    const queryParams = {};
    if (query) {
      for (let param of query.split('&')) {
        for (let [key, value] of param.split('=')) {
          queryParams[key] = value || '';
        }
      }
    }
    return queryParams;
  }

  static _getPathObj(method, path) {
    const restMethodObj = this._restAPIConfig[method];
    if (restMethodObj?.regular?.[path]) {
      return restMethodObj.regular[path];
    }
    if (restMethodObj?.regex) {
      for (const regexPath of Object.keys(restMethodObj.regex)) {
        const regex = new RegExp(`^${regexPath}$`);
        const params = path.match(regex)?.groups;
        if (params) {
          for (let paramName in params) {
            params[paramName] = decodeURIComponent(params[paramName]);
          }
          return { params, ...restMethodObj.regex[regexPath] };
        }
      }
    }
  }

  static _setHeader(res, headers = {}) {
    res.writeHead(
      res.statusCode,
      Object.assign({ 'Content-Type': 'application/json' }, headers)
    );
  }

  static execute(path, req, res) {
    const { method } = req;
    const pathObj = this._getPathObj(method, path);
    if (pathObj) {
      // parse URL
      const parsedQuery = this._parseQuery(url.parse(req.url).query);
      // build params object from path and query
      const params = { path: pathObj.params, query: parsedQuery };

      res.statusCode = 200;
      this._setHeader(res, pathObj.headerOptions);

      try {
        const done = (arg = '') => {
          res.end(arg);
        };
        pathObj.apiFunction(req, res, done, params);
      } catch (err) {
        res.statusCode = 500;
        this._setHeader(res);
        res.end(`Error to execute API: ${err.message}`);
      }
    } else {
      res.statusCode = 404;
      this._setHeader(res);
      res.end(`Api ${path} not found!`);
    }
  }
}

export default ApiModule;
