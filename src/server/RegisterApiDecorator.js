export default function RegisterApi(method, path, headerOptions = {}) {
  return function decorator(target, funcName) {
    target._endpointList = target._endpointList || [];
    target._endpointList.push({
      method,
      path,
      funcName,
      headerOptions,
    });
    target.getEndpoints = () => target._endpointList;
  };
}
