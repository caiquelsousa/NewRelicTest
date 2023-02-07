import path from 'path';
import HostService from '../HostService';

const service = new HostService();
service.hostRepository.db = path.join(
  __dirname,
  '..',
  '..',
  'repository',
  'tests',
  'host-app-data.test.json'
);

beforeAll(() => {
  const repository = service.hostRepository;
  const apps = repository.readHostFile();
  const index = apps.findIndex((app) => app.name == 'app1');
  if (index > -1) {
    apps.splice(index, 1);
  }
  repository.writeHostFile(apps);
});

test('getTopAppsByHost', () => {
  const hosts = service.getTopAppsByHost();
  expect(Array.isArray(hosts)).toBe(true);
  expect(hosts.length).toBeGreaterThan(0);

  for (const host of hosts) {
    const apps = host.applications;
    expect(Array.isArray(apps)).toBe(true);
    expect(apps.length).toBeGreaterThan(0);
    expect(apps.length).toBeLessThanOrEqual(25);
    for (let i = 1; i < apps.length; i++) {
      expect(apps[i - 1].apdex >= apps[i].apdex).toBe(true);
    }
  }
});

test('addAppToHost not ok', () => {
  expect(
    service.addAppToHost({
      name: 'app1',
    })
  ).not.toBeTruthy();
});

test('addAppToHost + removeAppFromHost', () => {
  expect(
    service.addAppToHost({
      name: 'app1',
      apdex: 50,
      version: 1,
      contributors: ['c1', 'c2'],
      host: ['h1', 'h2'],
    })
  ).toBeTruthy();

  expect(
    service.addAppToHost({
      name: 'app1',
      apdex: 50,
      version: 1,
      contributors: ['c1', 'c2'],
      host: ['h3'],
    })
  ).toBeTruthy();

  let hosts = service.getTopAppsByHost();
  let h1 = hosts.find((h) => h.name == 'h1');
  let h2 = hosts.find((h) => h.name == 'h2');
  expect(h1).not.toBeUndefined();
  expect(h2).not.toBeUndefined();
  expect(Array.isArray(h1.applications)).toBe(true);
  expect(Array.isArray(h2.applications)).toBe(true);
  expect(h1.applications.find((app) => app.name == 'app1')).not.toBeUndefined();
  expect(h2.applications.find((app) => app.name == 'app1')).not.toBeUndefined();

  expect(service.removeAppFromHost('h1', 'app1')).toBeTruthy();
    
  hosts = service.getTopAppsByHost();
  h1 = hosts.find((h) => h.name == 'h1');
  h2 = hosts.find((h) => h.name == 'h2');
  expect(h1.applications.find((app) => app.name == 'app1')).toBeUndefined();
  expect(h2.applications.find((app) => app.name == 'app1')).not.toBeUndefined();
});

test('removeAppFromHost not found host', () => {
  expect(service.removeAppFromHost('h10', 'app1')).not.toBeTruthy();
});

test('removeAppFromHost not found application', () => {
  expect(service.removeAppFromHost('h1', 'app100')).not.toBeTruthy();
});
