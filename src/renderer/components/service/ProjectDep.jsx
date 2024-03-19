/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { useState } from 'react';
import deleteImg from '../../assets/img/delete.png';
import { npmUninstall } from './functions/projectControl';

export default function ProjectDep({ data }) {
  const keys = Object.keys(data.dependencies);
  const [deps, setDeps] = useState(keys);

  function npmUninstallHandler(e, dep) {
    setDeps(
      deps.filter((i) => {
        return i !== dep;
      }),
    );
    npmUninstall(e, { path: data.path, id: data.id }, dep);
  }

  return (
    <>
      {deps.map((i) => {
        const dep = i;

        return (
          <h2 key={i} className="dep">
            {dep} {data[dep]}{' '}
            <button
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
