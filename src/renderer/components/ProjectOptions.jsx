/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { useLocation } from 'react-router-dom';
import ProjectDep from './service/ProjectDep.jsx';
import { code, open, start, stop } from './service/functions/projectControl.ts';
import StartButton from './service/StartButton.jsx';

/* eslint-disable prettier/prettier */
export default function ProjectOption() {
  const { state } = useLocation();

  return (
    <div className="project-option-screen">
      <h1>{state.name}</h1>
      <h3>{state.path}</h3>
      <div className="btns">
        <StartButton state={state} />
        <button
          className="button "
          type="button"
          onClick={(e) => open(e, state.path)}
        >
          Open in explorer
        </button>
        <button
          className="button "
          type="button"
          onClick={(e) => code(e, state.path)}
        >
          Open in VsCode
        </button>
      </div>
      <h1>Dependencies</h1>
      <div className="dependencies-grid">
        {state.dependencies && <ProjectDep data={state} />}
      </div>
    </div>
  );
}
