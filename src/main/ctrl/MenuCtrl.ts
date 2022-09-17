/* eslint-disable no-underscore-dangle */
/* eslint-disable lines-between-class-members */
/* eslint-disable import/no-extraneous-dependencies */
// import storage from 'electron-json-storage';
import { app, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';

class MenuCtrl {
  private _menus: Electron.MenuItemConstructorOptions[];
  get menu() {
    return this._menus;
  }

  constructor() {
    this._menus = [
      {
        label: 'locheck',
        submenu: [
          {
            label: '업데이트 확인',
            click(mi, bw) {
              autoUpdater.checkForUpdates();
            },
          },
          {
            label: 'locheck 버전 정보',
            click: () => {
              dialog.showMessageBox({
                title: 'locheck',
                type: 'info',
                message: 'locheck',
                detail: `App: ${app.getVersion()}\nChromium: ${
                  process.versions.chrome
                }`,
              });
            },
          },
          {
            label: '종료',
            accelerator: 'CmdOrCtrl+Q',
            click: () => {
              app.exit(0);
            },
          },
        ],
      },
      {
        label: '창',
        submenu: [
          { label: '최소화', role: 'minimize' },
          {
            label: '창닫기',
            click: (mi, bw) => {
              if (bw) {
                bw.hide();
              }
            },
          },
          { type: 'separator' },
        ],
      },
    ];
  }
}

export default MenuCtrl;
