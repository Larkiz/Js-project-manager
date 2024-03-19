/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import '../App.css';

export default function InitProject() {
  const [projectData, setData] = useState({ name: '', path: '' });
  const [dir, setDir] = useState('');
  function click() {
    window.electron.ipcRenderer.sendMessage('getDir');
  }
  useEffect(() => {
    window.electron.ipcRenderer.on('getDir', (_dir) => {
      if (_dir.slice(_dir.length - 1) === '\\') {
        setDir(_dir);
      } else {
        setDir(`${_dir}\\`);
      }
    });
  }, []);

  function changeName(e) {
    return setData({
      ...projectData,
      path: dir + e.target.value,
      name: e.target.value,
    });
  }
  useEffect(() => {
    setData({ ...projectData, path: dir + projectData.name });
  }, [dir]);

  function createProject() {
    window.electron.ipcRenderer.sendMessage('createProject', projectData.path);
  }

  return (
    <div>
      <input onChange={changeName} type="text" placeholder="Название проекта" />
      {projectData.path && <h2>{projectData.path}</h2>}
      <button onClick={click} type="button">
        Выбрать папку
      </button>
      <button onClick={createProject} type="button">
        Создать
      </button>
    </div>
  );
}
