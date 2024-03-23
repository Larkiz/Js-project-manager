/* eslint-disable no-console */
/* eslint-disable func-names */
import { useRef, useState } from 'react';
import PackageCard from './additional/PackageCard.jsx';

// https://registry.npmjs.org/-/v1/search?text=react&size=250
const DependenciesStore = function ({ project }) {
  const [packages, setPackages] = useState([]);
  const timeout = useRef();

  function search(e) {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(
      () =>
        fetch(`https://registry.npmjs.org/-/v1/search?text=${e.target.value}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            return setPackages(data.objects);
          })
          .catch((err) => {
            console.log(err);
          }),
      1000,
    );
  }

  return (
    <div>
      <input type="text" onChange={search} placeholder="Search packages" />
      {packages && (
        <div className="founded-packages">
          {packages.map((i) => {
            return (
              <PackageCard
                key={i.package.name}
                project={project}
                data={i.package}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
export default DependenciesStore;
