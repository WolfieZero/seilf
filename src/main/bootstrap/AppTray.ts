import { Tray, Menu, BrowserWindow } from 'electron';
import { join } from 'path';

type MenuList = (Electron.MenuItemConstructorOptions | Electron.MenuItem)[];

interface Actions {
  primaryAction: MenuList | VoidFunction;
  secondaryAction?: MenuList;
}

class AppTray {
  private mainWindow: BrowserWindow;
  private tray: Tray;
  private actions: Actions;
  private primaryMenu: Menu | null;
  private secondaryMenu: Menu | null;
  private secondaryDefaults: MenuList = [
    { label: 'About', role: 'about' },
    { label: 'Preferences', click: () => this.toggleWindow() },
    { label: 'Quit', role: 'quit' },
  ];

  /**
   * Sets up the system tray icon and event handlers.
   *
   * @param {BrowserWindow} mainWindow - The main window of the application.
   * @param {Actions} actions - The actions object containing the available
   *                            actions for the system tray.
   */
  public create(mainWindow: BrowserWindow, actions: Actions) {
    const icon = join(__dirname, '../../src/assets/TrayIconTemplate.png');

    this.tray = new Tray(icon);

    if (!this.mainWindow) {
      this.mainWindow = mainWindow;
    }

    this.setActions(actions);
    this.tray.setIgnoreDoubleClickEvents(true);

    this.tray.on('click', () => this.handlePrimaryClick());
    this.tray.on('right-click', () => this.handleSecondaryClick());
  }

  /**
   * Triggers the primary action.
   */
  public triggerPrimaryAction() {
    this.handlePrimaryClick();
  }

  /**
   * Triggers a secondary action.
   */
  public triggerSecondaryAction() {
    this.handleSecondaryClick();
  }

  /**
   * Reloads the primary action of the menu list.
   *
   * @param {MenuList | VoidFunction} primaryAction - The new primary action for
   *                                                  the menu list.
   */
  public reloadPrimaryAction(primaryAction: MenuList | VoidFunction): void {
    if (this.tray.isDestroyed()) {
      return;
    }

    this.tray.destroy();
    this.create(this.mainWindow, {
      ...this.actions,
      primaryAction,
    });
  }

  /**
   * Sets the actions for the instance.
   *
   * @param {Actions} actions - The actions to set.
   */
  private setActions(actions: Actions) {
    this.actions = actions;

    if (typeof actions.primaryAction !== 'function') {
      this.primaryMenu = Menu.buildFromTemplate(actions.primaryAction);
    }

    if (actions.secondaryAction) {
      this.secondaryMenu = Menu.buildFromTemplate([...actions.secondaryAction, ...this.secondaryDefaults]);
    }
  }

  /**
   * Handles the primary click event.
   */
  private handlePrimaryClick() {
    if (typeof this.actions.primaryAction === 'function') {
      this.actions.primaryAction();
    }

    if (this.primaryMenu) {
      this.tray.popUpContextMenu(this.primaryMenu);
    }
  }

  /**
   * Handles secondary click events.
   */
  private handleSecondaryClick() {
    if (this.secondaryMenu) {
      this.tray.popUpContextMenu(this.secondaryMenu);
    }
  }

  /**
   * Toggles the window visibility.
   *
   * @return {void}
   */
  private toggleWindow(): void {
    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
      return;
    }

    this.showWindow();
  }

  /**
   * Shows the window at the position calculated by the getWindowPosition
   * function.
   */
  private showWindow() {
    const { x, y } = this.getWindowPosition();
    this.mainWindow.setPosition(x, y, false);
    this.mainWindow.show();
    this.mainWindow.setVisibleOnAllWorkspaces(true);
    this.mainWindow.focus();
    this.mainWindow.setVisibleOnAllWorkspaces(false);
  }

  /**
   * Retrieves the position of the window based on the tray's position.
   *
   * @return {{ x: number; y: number }} The x and y coordinates of the window.
   */
  private getWindowPosition(): { x: number; y: number } {
    const windowBounds = this.mainWindow.getBounds();
    const trayBounds = this.tray.getBounds();
    const x = Math.round(trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2);
    const y = Math.round(trayBounds.y + trayBounds.height);
    return { x, y };
  }
}

export { AppTray };
