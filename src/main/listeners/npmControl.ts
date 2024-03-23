/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
import { exec } from 'child_process';
import { readFile, writeFile } from 'fs';

const npmControl = {
  uninstall(_data: { path: string; id: string }, dep: string) {
    return new Promise((resolve) => {
      const { id, path } = _data;

      exec(`cd ${path} && npm uninstall ${dep}`, (error, stdout, stderr) => {
        if (!error && !stderr && stdout) {
          readFile(`./projects.json`, 'utf8', (err, dataString) => {
            const data = JSON.parse(dataString);
            for (let i = 0; i < data.length; i += 1) {
              if (data[i].id === id) {
                delete data[i].dependencies[dep];
                break;
              }
            }
            resolve(
              writeFile('./projects.json', JSON.stringify(data), (err) => {
                console.log(err);
              }),
            );
          });
        }
      });
    });
  },
  install(
    _data: { path: string; id: string },
    dep: string,
    depVersion: string,
  ) {
    return new Promise((resolve) => {
      const { id, path } = _data;

      exec(`cd ${path} && npm install ${dep}`, (error, stdout, stderr) => {
        if (!error && !stderr) {
          readFile(`./projects.json`, 'utf8', (err, dataString) => {
            const data = JSON.parse(dataString);
            for (let i = 0; i < data.length; i += 1) {
              if (data[i].id === id) {
                data[i].dependencies[dep] = depVersion;
                break;
              }
            }
            resolve(
              writeFile('./projects.json', JSON.stringify(data), (err) => {
                console.log(err);
              }),
            );
          });
        }
      });
    });
  },
};

export default npmControl;
