import { exec } from 'child_process';
import { readFile, writeFile } from 'fs';

const npmControl = {
  uninstall(_data: { path: string; id: string }, dep: string) {
    const { id, path } = _data;

    exec(`cd ${path} && npm uninstall ${dep}`, (error, stdout, stderr) => {
      if (!error && !stderr) {
        readFile(`./projects.json`, 'utf8', (err, dataString) => {
          const data = JSON.parse(dataString);
          for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
              delete data[i].dependencies[dep];
              break;
            }
          }
          writeFile('./projects.json', JSON.stringify(data), (err) => {
            console.log(err);
          });
        });
      }
    });
  },
};

export default npmControl;
