/* eslint-disable prettier/prettier */
import { useLocation } from 'react-router-dom';
import ProjectDep from './service/ProjectDep.jsx';

/* eslint-disable prettier/prettier */
export default function ProjectOption() {
  const { state } = useLocation();

  return (
    <div className="project-option-screen">
      <h1>{state.name}</h1>
      <h3>{state.path}</h3>
      <h1>Dependencies</h1>
      <div className="dependencies-grid">
        {state.dependencies && <ProjectDep data={state} />}
      </div>
    </div>
  );
}
