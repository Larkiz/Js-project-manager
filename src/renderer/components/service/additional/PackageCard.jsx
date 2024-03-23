/* eslint-disable react/prop-types */
import upload from '../../../assets/img/upload.png';
import external from '../../../assets/img/external.png';

export default function PackageCard({ data, project }) {
  function install() {
    const projectData = { path: project.path, id: project.id };
    console.log(projectData, data.name, data.version);
    window.electron.ipcRenderer.sendMessage(
      'installDependencies',
      projectData,
      data.name,
      data.version,
    );
  }
  return (
    <div className="package-card">
      <h2>
        {data.name} {data.version}
        <button onClick={install} className="img-button" type="button">
          <img src={upload} alt="delete" />
        </button>
      </h2>
      <p>{data.description} </p>
      <div className="keywords">
        {data.keywords &&
          data.keywords.map((i) => {
            return <div key={i}>{i}</div>;
          })}
      </div>
      <a className="img-button" href={data.links.npm}>
        {data.links.npm} <img src={external} alt="ext" />
      </a>
    </div>
  );
}
