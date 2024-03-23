/* eslint-disable react/prop-types */

import { memo } from 'react';
import { Link } from 'react-router-dom';
import external from '../../../assets/img/external.png';
import { code, open } from '../functions/projectControl';
import StartButton from './StartButton';

const Project = memo(function ({ data }) {
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
          <StartButton state={data} />

          <button
            className="button button-blue"
            type="button"
            onClick={(e) => code(e, data.path)}
          >
            Open in VsCode
          </button>
        </div>
      </div>
    </Link>
  );
});

export default Project;
