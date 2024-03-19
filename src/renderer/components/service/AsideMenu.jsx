/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';

export default function AsideMenu() {
  return (
    <div className="aside-menu">
      <Link className="button" to="/">
        Projects
      </Link>
      <Link className="button" to="/createProjects">
        Create project
      </Link>
    </div>
  );
}
