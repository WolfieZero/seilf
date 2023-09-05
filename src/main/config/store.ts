import { app } from 'electron';
import path from 'path';
import { STORE_KEY_BOOKMARKS_FILE, STORE_KEY_GLOBAL_SHORTCUT } from '@common/config/store-keys';

export interface StoreScheme {
  [STORE_KEY_BOOKMARKS_FILE]: string;
  [STORE_KEY_GLOBAL_SHORTCUT]: string;
}

export const STORE_DEFAULTS = {
  [STORE_KEY_BOOKMARKS_FILE]: path.join(app.getPath('home'), 'bookmarks.json'),
  [STORE_KEY_GLOBAL_SHORTCUT]: 'CmdOrCtrl+Option+|', // https://www.electronjs.org/docs/latest/api/accelerator
};
