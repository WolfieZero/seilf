import { shell } from 'electron';
import { randomUUID } from 'crypto';
import { Bookmark, Folder } from '@common/interfaces';

export type Bookmarks = (Bookmark | Folder)[];
type MenuItem = Electron.MenuItemConstructorOptions;

class BookmarksService {
  /**
   * Converts bookmarks to a menu.
   *
   * @param {Bookmarks} bookmarks - The bookmarks to convert.
   * @return {MenuItem[]} The converted menu items.
   */
  public convertBookmarksToMenu(bookmarks: Bookmarks): MenuItem[] {
    let data: MenuItem[] = [];

    bookmarks.forEach(item => {
      if (Object.hasOwn(item, 'url')) {
        data = [...this.addBookmarkToMenu(item as Bookmark, data)];
      } else if (Object.hasOwn(item, 'sub')) {
        data = [...this.addFolderToMenu(item as Folder, data)];
      }
    });

    return data;
  }

  /**
   * Adds a bookmark to the menu.
   *
   * @param {Bookmark} param - The bookmark object containing the label, url, and optional key.
   * @param {MenuItem[]} menu - The menu array to add the bookmark to.
   * @return {MenuItem[]} - The updated menu array with the added bookmark.
   */
  private addBookmarkToMenu({ label, url, key = randomUUID() }: Bookmark, menu: MenuItem[]): MenuItem[] {
    const menuItem: Electron.MenuItemConstructorOptions = {
      id: key,
      label,
      click: this.handleUrl(url),
    };

    return [...menu, menuItem];
  }

  /**
   * Adds a folder to the menu.
   *
   * @param {Folder} param - The folder to be added.
   * @param {MenuItem[]} menu - The existing menu.
   * @return {MenuItem[]} The updated menu with the folder added.
   */
  private addFolderToMenu({ label, sub, key = randomUUID() }: Folder, menu: MenuItem[]) {
    const menuItem: Electron.MenuItemConstructorOptions = {
      id: key,
      label,
      submenu: this.convertBookmarksToMenu(sub),
    };
    return [...menu, menuItem];
  }

  /**
   * Handles the given URL by opening it in an external shell.
   *
   * @param {string} url - The URL to handle.
   * @return {VoidFunction} A function that, when called, opens the URL in an
   *                        external shell.
   */
  private handleUrl(url: string): VoidFunction {
    return () => shell.openExternal(url);
  }
}

export { BookmarksService };
