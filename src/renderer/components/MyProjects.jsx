/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable promise/catch-or-return */
/* eslint-disable no-console */

import { useEffect, useState } from 'react';
import Project from './service/Project';

/* eslint-disable prettier/prettier */
export default function MyProjects() {
  const [projects, setProjects] = useState([]);

  function addFolder() {
    window.electron.ipcRenderer.sendMessage('addFolder');
  }
  function addProject() {
    window.electron.ipcRenderer.sendMessage('addProject');
  }

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('getCreatedProjects');
    window.electron.ipcRenderer.once('getCreatedProjects', (_projects) => {
      setProjects(
        _projects.map((i) => {
          return { ...i, running: false };
        }),
      );
    });
    window.electron.ipcRenderer.on('addFolder', (_projects) => {
      setProjects(
        _projects.map((i) => {
          return { ...i, running: false };
        }),
      );
    });
    window.electron.ipcRenderer.on('addProject', (_project) => {
      if (_project.message) {
        alert(_project.message);
      } else {
        setProjects(_project);
      }
    });
    window.electron.ipcRenderer.on('projectStatus', (status) => {
      setProjects((prev) => {
        return prev.map((i) => {
          if (status.id === i.id) {
            return { ...i, running: status.running };
          }
          return i;
        });
      });
    });
  }, []);

  return (
    <div className="main-section">
      <div className="btns">
        <button className="button" type="button" onClick={addProject}>
          Add project
        </button>

        <button className="button" type="button" onClick={addFolder}>
          Add folder
        </button>
      </div>
      {projects && (
        <div className="projects-grid">
          {projects.map((proj) => {
            return <Project key={proj.id} data={proj} />;
          })}
        </div>
      )}
    </div>
  );
}