import path from 'path';
import HostRepository from '../HostRepository';

const defaultTestName = 'Default Test Name';
const repository = new HostRepository();
repository.db = path.join(__dirname, 'host-app-data.test.json');

test('read', () => {
  const apps = repository.readHostFile();
  expect(Array.isArray(apps)).toBe(true);
  expect(apps.length).toBeGreaterThan(0);
  for (let i = 0; i < apps.length; i++) {
    expect(typeof apps[i].name).toBe('string');
    expect(typeof apps[i].version).toBe('number');
    expect(typeof apps[i].apdex).toBe('number');
    expect(Array.isArray(apps[i].contributors)).toBe(true);
    expect(apps[i].contributors.length).toBeGreaterThan(0);
    expect(Array.isArray(apps[i].host)).toBe(true);
    expect(apps[i].host.length).toBeGreaterThan(0);
  }
});

test('write', () => {
  const appNameTest = parseInt(Math.random() * 10000) + ' TestName';

  // get current and change
  const apps = repository.readHostFile();
  apps[0].name = appNameTest;

  repository.writeHostFile(apps);

  const writedApps = repository.readHostFile();
  expect(Array.isArray(writedApps)).toBe(true);
  expect(writedApps.length).toBeGreaterThan(0);
  expect(writedApps[0].name).toBe(appNameTest);

  apps[0].name = defaultTestName;
  repository.writeHostFile(apps);
});
