/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import external from '../../assets/img/external.png';
import { code, open, start, stop } from './functions/projectControl';

export default function Project({ data }) {
  return (
    <Link state={data} to="options">
      <div className="project-card">
        <h1>{data.name}</h1>
        <button
          className="path-button"
          type="button"
          onClick={(e) => open(e, data.path)}
        >
          <h3>{data.path}</h3>
          <img src={external} alt="external" />
        </button>

        <div className="btns">
          {!data.running ? (
            <button
              className="button"
              type="button"
              onClick={(e) => start(e, data.path, data.id)}
            >
              Start
            </button>
          ) : (
            <button
              className="button"
              type="button"
              onClick={(e) => stop(e, data.path, data.id)}
            >
              Stop
            </button>
          )}

          <button
            className="button"
            type="button"
            onClick={(e) => code(e, data.path)}
          >
            Open in VsCode
          </button>
        </div>
      </div>
    </Link>
  );
}
