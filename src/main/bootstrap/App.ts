import { AppTray } from './AppTray';
import { BookmarksService, Bookmarks } from '@main/services/BookmarksService';
import { BrowserWindow, globalShortcut } from 'electron';
import { readFileSync, existsSync, writeFileSync } from 'fs';
import { store } from '@main/bootstrap/store';
import { STORE_KEY_BOOKMARKS_FILE, STORE_KEY_GLOBAL_SHORTCUT } from '@common/config/store-keys';
import exampleBookmark from '@assets/example.json';
import { FEATURE_GLOBAL_SHORTCUT } from '@common/config/feature-flags';

export class App {
  private bookmarkService: BookmarksService;
  private appTray: AppTray;

  constructor(bookmarkService = new BookmarksService()) {
    this.bookmarkService = bookmarkService;
  }

  /**
   * Initializes the function by creating a tray with the given main window.
   *
   * @param {BrowserWindow} mainWindow - The main window instance.
   */
  public init(mainWindow: BrowserWindow) {
    this.createTray(mainWindow);
    this.globals();
  }

  /**
   * Registers a global shortcuts.
   */
  private async globals() {
    if (FEATURE_GLOBAL_SHORTCUT) {
      const shortcut = (await store.get(STORE_KEY_GLOBAL_SHORTCUT)) as string;
      globalShortcut.register(shortcut, () => {
        this.appTray.triggerPrimaryAction();
      });
    }
  }

  /**
   * Creates a tray for the application.
   *
   * @param {BrowserWindow} mainWindow - The main browser window of the application.
   */
  private createTray(mainWindow: BrowserWindow) {
    const appTray = new AppTray();
    const appMenuItems = [
      {
        label: 'Refresh',
        click: () => {
          appTray.reloadPrimaryAction(this.menuItems());
        },
      },
    ];

    appTray.create(mainWindow, { primaryAction: this.menuItems(), secondaryAction: appMenuItems });
    this.appTray = appTray;
  }

  /**
   * Returns an array of menu items based on the bookmarks stored in the
   * bookmarks file.
   *
   * @return {Electron.MenuItemConstructorOptions[]} An array of menu items.
   */
  private menuItems(): Electron.MenuItemConstructorOptions[] {
    const bookmarkPath = store.get(STORE_KEY_BOOKMARKS_FILE) as string;
    const bookmarks = this.retrieveBookmarks(bookmarkPath);
    const menuItems = this.bookmarkService.convertBookmarksToMenu(bookmarks);

    return menuItems;
  }

  /**
   * Retrieve bookmarks from the specified bookmark path.
   *
   * @param {string} bookmarkPath - The path to the bookmark file.
   * @return {Bookmarks} An array of bookmarks.
   */
  private retrieveBookmarks(bookmarkPath: string): Bookmarks {
    if (!existsSync(bookmarkPath)) {
      writeFileSync(bookmarkPath, JSON.stringify(exampleBookmark));
    }

    const bookmarkData = readFileSync(bookmarkPath, 'utf8');

    return JSON.parse(bookmarkData).bookmarks;
  }
}
