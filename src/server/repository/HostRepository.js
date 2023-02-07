import fs from 'fs';
import path from 'path';

const hostAppDataJsonFileDir = path.join(
  __dirname,
  'data',
  'host-app-data.json'
);

export default class HostRepository {
  constructor() {
    this.db = hostAppDataJsonFileDir;
  }

  readHostFile = () => {
    const jsonData = fs.readFileSync(this.db, 'utf8');
    return JSON.parse(jsonData || '{}');
  };

  writeHostFile(jsonData) {
    fs.writeFileSync(this.db, JSON.stringify(jsonData));
  }
}
