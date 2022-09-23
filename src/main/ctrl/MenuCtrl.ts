/* eslint-disable no-underscore-dangle */
/* eslint-disable lines-between-class-members */
/* eslint-disable import/no-extraneous-dependencies */
// import storage from 'electron-json-storage';
import { app, BrowserView, BrowserWindow, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';

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
            label: '강제 새로고침(계정 리스트)',
            click: (mi, bw) => {
              /**
               * 캐릭터 숨김처리로 이동되는 라우트를 트리깅 합니다
               */
              if (bw) {
                bw.webContents.send('logout');
              }
            },
          },
          {
            label: '강제 새로고침(숙제 리스트)',
            click: (mi, bw) => {
              /**
               * 캐릭터 숨김처리로 이동되는 라우트를 트리깅 합니다
               */
              if (bw) {
                bw.webContents.send('homework');
              }
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
        label: '캐릭터 설정 보기',
        submenu: [
          {
            label: '숨김처리 관리',
            click: (mi, bw) => {
              if (bw) {
                /**
                 * 캐릭터 숨김처리로 이동되는 라우트를 트리깅 합니다
                 */
                bw.webContents.send('moveHide');
              }
            },
          },
          {
            label: '캐릭터별 레이드 관리',
            click: (mi, bw) => {
              if (bw) {
                /**
                 * 캐릭터 숨김처리로 이동되는 라우트를 트리깅 합니다
                 */
                bw.webContents.send('moveRade');
              }
            },
          },
          {
            label: '정렬 기능 관리',
            click: (mi, bw) => {
              if (bw) {
                /**
                 * 캐릭터 숨김처리로 이동되는 라우트를 트리깅 합니다
                 */
                bw.webContents.send('moveSort');
              }
            },
          },
        ],
      },

      {
        label: '레이드 도움팝업',
        submenu: [
          {
            label: '쿠쿠빙고',
            click: (mi, bw) => {
              if (bw) {
                /**
                 * 캐릭터 숨김처리로 이동되는 라우트를 트리깅 합니다
                 */
                // bw.webContents.send('moveHome');
                const window = new BrowserWindow({
                  width: 500,
                  height: 500,
                  resizable: true,
                  alwaysOnTop: true,
                  webPreferences: {
                    devTools: true,
                  },
                });
                window.webContents.loadFile(
                  path.join(__dirname, '../../public/kuku.html'),
                );
                window.webContents.openDevTools();
              }
            },
          },
          { type: 'separator' },
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
