/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InitProject from './components/InitProject';
import MyProjects from './components/MyProjects';
import AsideMenu from './components/service/AsideMenu';
import ProjectOption from './components/ProjectOptions';
import ProjectContext from './components/service/context/ProjectsContext';

export default function App() {
  return (
    <Router>
      <AsideMenu />
      <ProjectContext>
        <Routes>
          <Route path="/options" element={<ProjectOption />} />
          <Route path="/createProjects" element={<InitProject />} />
          <Route path="/" element={<MyProjects />} />
        </Routes>
      </ProjectContext>
    </Router>
  );
}
