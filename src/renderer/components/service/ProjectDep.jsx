/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { useContext, useEffect, useState } from 'react';
import deleteImg from '../../assets/img/delete.png';
import { npmUninstall } from './functions/projectControl';
import { projectsContext } from './context/ProjectsContext';

export default function ProjectDep({ data }) {
  const { getProject } = useContext(projectsContext);
  const [deps, setDeps] = useState(
    Object.keys(getProject(data.id).dependencies),
  );

  useEffect(() => {
    setDeps(Object.keys(getProject(data.id).dependencies));
  }, [getProject]);

  function npmUninstallHandler(e, dep) {
    window.electron.ipcRenderer.once(
      'dependenciesDeleted',
      (deletedProject) => {
        if (deletedProject.deleted) {
          setDeps(
            deps.filter((i) => {
              return i !== dep;
            }),
          );
        }
      },
    );

    npmUninstall(e, { path: data.path, id: data.id }, dep);
  }

  return (
    <>
      {deps.map((i) => {
        const dep = i;

        return (
          <h2 key={i} className="dep">
            {dep} {data.dependencies[dep]}{' '}
            <button
              className="img-button"
              onClick={(e) => {
                npmUninstallHandler(e, dep);
              }}
              type="button"
            >
              <img src={deleteImg} alt="delete" />
            </button>
          </h2>
        );
      })}
    </>
  );
}
