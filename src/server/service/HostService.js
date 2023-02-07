import HostRepository from '../repository/HostRepository';
import { minHeapSort } from '../../common/heapSort';

export default class HostService {
  constructor() {
    this.hostRepository = new HostRepository();
  }

  getTopAppsByHost() {
    const hostMap = {};
    const jsonData = this.hostRepository.readHostFile();

    // eslint-disable-next-line no-unused-vars
    for (let { host: hosts, contributors, ...application } of jsonData) {
      for (let host of hosts) {
        if (!hostMap[host]) {
          hostMap[host] = [];
        }
        hostMap[host].push(application);
      }
    }
    const hostList = [];

    for (let host in hostMap) {
      minHeapSort(hostMap[host], 'apdex');
      hostList.push({
        name: host,
        applications: hostMap[host].slice(0, 25),
      });
    }
    return hostList;
  }

  addAppToHost(newAppData) {
    const jsonData = this.hostRepository.readHostFile();
    const appData = jsonData.find((app) => app.name === newAppData?.name);

    if (appData) {
      for (let host of newAppData?.host) {
        if (!appData.host.includes(host)) {
          appData.host.push(host);
        }
      }
    } else if (
      newAppData?.name &&
      newAppData?.apdex &&
      newAppData?.version &&
      newAppData?.host?.length
    ) {
      jsonData.push(newAppData);
    } else {
      return false;
    }

    this.hostRepository.writeHostFile(jsonData);

    return true;
  }

  removeAppFromHost(host, app) {
    const jsonData = this.hostRepository.readHostFile();
    const appData = jsonData.find((appObj) => appObj.name === app);
    if (appData) {
      let hostIndex = appData.host.indexOf(host);
      if (hostIndex > -1) {
        appData.host.splice(hostIndex, 1);
        this.hostRepository.writeHostFile(jsonData);
        return true;
      }
    }
    return false;
  }
}
