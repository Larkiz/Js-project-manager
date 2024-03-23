/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable promise/catch-or-return */
/* eslint-disable no-console */

import { useContext, useEffect, useState } from 'react';
import Project from './service/additional/Project';
import { projectsContext } from './service/context/ProjectsContext';

/* eslint-disable prettier/prettier */
export default function MyProjects() {
  const { projects, setProjects } = useContext(projectsContext);

  function addFolder() {
    window.electron.ipcRenderer.sendMessage('addFolder');
  }
  function addProject() {
    window.electron.ipcRenderer.sendMessage('addProject');
  }

  useEffect(() => {
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
