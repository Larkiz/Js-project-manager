/* eslint-disable no-prototype-builtins */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  memo,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Project } from '../../../../main/listeners/projects';

export const projectsContext = createContext({});

const ProjectContext = memo(function ProjectContext({
  children,
}: React.PropsWithChildren) {
  const [projects, setProjects] = useState<Project[]>();

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('getCreatedProjects');
    window.electron.ipcRenderer.once(
      'getCreatedProjects',
      (createdProjects: any) => {
        setProjects(
          createdProjects.map((i: Project) => {
            return { ...i, running: false };
          }),
        );
      },
    );
    window.electron.ipcRenderer.on('projectStatus', (status: any) => {
      const started: Object = JSON.parse(
        sessionStorage.getItem('running') || '""',
      );
      const data: any = {};
      if (status.running && !started.hasOwnProperty(status.id)) {
        data[status.id] = { id: status.id, status: true };
      } else {
        delete started[status.id];
      }
      sessionStorage.setItem('running', JSON.stringify(data));
      setProjects((prev: any) => {
        return prev.map((i: Project) => {
          if (status.id === i.id) {
            return { ...i, running: status.running };
          }
          return i;
        });
      });
    });

    window.electron.ipcRenderer.on(
      'dependenciesDeleted',
      (deletedProject: any) => {
        if (deletedProject.deleted) {
          return setProjects((prev: any): any => {
            return prev.map((project: Project) => {
              if (project.id === deletedProject.id) {
                delete project.dependencies[deletedProject.dependecies];
                return project;
              }
              return project;
            });
          });
        }

        return null;
      },
    );
    window.electron.ipcRenderer.on(
      'dependenciesInstalled',
      (installed: any) => {
        console.log(installed);

        if (installed.installed) {
          return setProjects((prev: any): any => {
            return prev.map((project: Project) => {
              if (project.id === installed.id) {
                project.dependencies[installed.dependecies] = installed.version;
                return project;
              }
              return project;
            });
          });
        }

        return null;
      },
    );
  }, []);

  // const getProject = (id: string) => {
  //   return projects?.find((project) => project.id === id);
  // };
  function getProject(id: string) {
    return projects?.find((project) => project.id === id);
  }
  const actions = useMemo(() => {
    return {
      setProjects,
      projects,
      getProject,
    };
  }, [projects]);

  return (
    <projectsContext.Provider value={actions}>
      {children}
    </projectsContext.Provider>
  );
});

export default ProjectContext;
