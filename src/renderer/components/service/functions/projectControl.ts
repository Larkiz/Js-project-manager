export function open(e: Event, path: string) {
  e.preventDefault();
  e.stopPropagation();
  window.electron.ipcRenderer.sendMessage('execCommand', `start ${path}`);
}

export function code(e: Event, path: string) {
  e.preventDefault();
  e.stopPropagation();
  window.electron.ipcRenderer.sendMessage('execCommand', `code ${path}`);
}

export function start(e: Event, path: string, id: string) {
  e.preventDefault();
  e.stopPropagation();
  window.electron.ipcRenderer.sendMessage('startProject', path, id);
}

export function stop(e: Event, path: string, id: string) {
  e.preventDefault();
  e.stopPropagation();
  window.electron.ipcRenderer.sendMessage(`stopProject`, path, id);
}

export function npmUninstall(e: Event, path: string, name: string) {
  e.preventDefault();
  e.stopPropagation();
  window.electron.ipcRenderer.sendMessage(`uninstallDependencies`, path, name);
}
