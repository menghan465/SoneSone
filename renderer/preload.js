const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getFiles: (relativePath) => ipcRenderer.invoke('get-files', relativePath)
});