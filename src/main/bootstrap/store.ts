import Store from 'electron-store';
import { IpcMainInvokeEvent, ipcMain } from 'electron';
import { StoreScheme, STORE_DEFAULTS } from '@main/config/store';

const store = new Store<StoreScheme>({
  defaults: STORE_DEFAULTS,
});

const getStoreValue = (_event: IpcMainInvokeEvent, key: string): unknown => store.get(key);

const setStoreValue = (_event: IpcMainInvokeEvent, key: string, value: unknown) => {
  store.set(key, value);
};

ipcMain.handle('getStoreValue', getStoreValue);
ipcMain.handle('setStoreValue', setStoreValue);

export { store };
