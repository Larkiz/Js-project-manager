/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProjectDep from './service/ProjectDep.jsx';
import { code, open } from './service/functions/projectControl.ts';
import StartButton from './service/additional/StartButton.jsx';
import { projectsContext } from './service/context/ProjectsContext.tsx';
import DependenciesStore from './service/DependenciesStore.jsx';

/* eslint-disable prettier/prettier */
export default function ProjectOption() {
  const { id } = useLocation().state;
  const { getProject } = useContext(projectsContext);
  const [project, setProject] = useState(getProject(id));

  useEffect(() => {
    setProject(getProject(id));
  }, [getProject]);

  return (
    <div className="project-option-screen">
      <h1>{project.name}</h1>
      <h3>{project.path}</h3>
      <div className="btns">
        <StartButton state={project} />
        <button
          className="button "
          type="button"
          onClick={(e) => open(e, project.path)}
        >
          Open in explorer
        </button>
        <button
          className="button "
          type="button"
          onClick={(e) => code(e, project.path)}
        >
          Open in VsCode
        </button>
      </div>
      <h1>Dependencies</h1>
      <div className="dependencies-control">
        <div className="dependencies-grid">
          {project.dependencies && <ProjectDep data={project} />}
        </div>
        <DependenciesStore project={project} />
      </div>
    </div>
  );
}
