/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
// /* eslint-disable prettier/prettier */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import { randomUUID } from 'crypto';
import { dialog } from 'electron';
import { readFile, readdir, writeFile } from 'fs';
import { exec } from 'child_process';
import isNodeProject from '../functions/isNodeProject';

export interface Project {
  id: string;
  name: string;
  path: string;
  dependencies: any;
  scripts: any;
}
const projectsAction = {
  addFolder(mainWindow: Electron.BrowserWindow, event: Electron.IpcMainEvent) {
    return dialog
      .showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
      })
      .then((res) => {
        const path = res.filePaths[0];
        readdir(path, (err, files) => {
          readFile(`./projects.json`, 'utf8', (err, dataString) => {
            let data = JSON.parse(dataString);
            const projects: { added: Project[]; blocked: number } = {
              added: [],
              blocked: 0,
            };

            for (let i = 0; i < files.length; i++) {
              const project = `${path}/${files[i]}`;
              const url = `${project}/package.json`;
              const file = isNodeProject(url);

              if (file)
                projects.added.push({
                  id: randomUUID(),
                  name: file.name,
                  path: `${path}\\${file.name}`,
                  dependencies: file.dependencies,
                  scripts: file.scripts,
                });
              else {
                projects.blocked += 1;
              }
            }
            event.reply('addFolder', projects);
            data = [...projects.added, ...data];
            writeFile('./projects.json', JSON.stringify(data), (err) => {
              console.log(err);
            });
          });
        });
        return null;
      });
  },
  addProject(mainWindow: Electron.BrowserWindow, event: Electron.IpcMainEvent) {
    return dialog
      .showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
      })
      .then((res) => {
        if (!res.canceled) {
          const path = res.filePaths[0];
          const url = `${path}/package.json`;
          const file = isNodeProject(url);
          readFile(`./projects.json`, 'utf8', (err, dataString) => {
            const data = JSON.parse(dataString);

            let exist = false;

            for (let i = 0; i < data.length; i++) {
              if (data[i].name === file.name) {
                exist = true;
                break;
              }
            }
            if (file) {
              if (!exist) {
                data.unshift({
                  id: randomUUID(),
                  name: file.name,
                  path,
                  dependencies: file.dependencies,
                  scripts: file.scripts,
                });

                writeFile('./projects.json', JSON.stringify(data), (err) => {
                  console.log(err);
                });
                return event.reply('addProject', data);
              }
              return event.reply('addProject', { message: 'Already added' });
            }
            return event.reply('addProject', { message: 'Not supported' });
          });
        }
        return null;
      });
  },
  startProject(event: Electron.IpcMainEvent, path: string, _id: string) {
    event.reply('projectStatus', { id: _id, running: true });

    exec(
      `start cmd.exe /k "cd ${path} && npm start"`,
      (error, stdout, stderr) => {
        if (error || stderr) {
          event.reply('projectStatus', { id: _id, running: false });
        }
      },
    );
  },
  stopProject(event: Electron.IpcMainEvent, _path: string, _id: string) {
    const path = _path.replaceAll('\\', '\\\\');

    exec(
      `wmic process where "CommandLine like '%${path}%'" get ProcessId`,
      (error, stdout) => {
        const PID = stdout.match(/\d+/g);

        if (PID) {
          for (let i = 0; i < PID.length; i++) {
            exec(`start taskkill /F /PID ${PID[i]}`);
          }

          return event.reply('projectStatus', { id: _id, running: false });
        }
        return null;
      },
    );
  },
};

export default projectsAction;
