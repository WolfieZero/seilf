// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
import { productName, version } from '../package.json';

contextBridge.exposeInMainWorld('App', {
  productName,
  version,
  store: {
    setValue: (key: string, value: string) => ipcRenderer.invoke('setStoreValue', key, value),
    getValue: (value: string) => ipcRenderer.invoke('getStoreValue', value),
  },
});
