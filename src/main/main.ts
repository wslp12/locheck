/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-await-in-loop */
/* eslint-disable arrow-parens */
/* eslint-disable import/first */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-var */
/* eslint-disable import/newline-after-import */
import { app, ipcMain, BrowserWindow, Menu, dialog } from 'electron';
import path from 'path';
import ElectronLog from 'electron-log';
import { autoUpdater } from 'electron-updater';
import fetch from 'node-fetch';
import axios from 'axios';
import os from 'os';
import { Auth } from '../renderer/recoil/auth';
import { getCharInfo, getCharList } from './get-lost-ark-char';
import MenuCtrl from './ctrl/MenuCtrl';

/**
 * 일렉트론 자동업데이터의 로거를 ElectronLog 라이브러리에 의존하도록 설정
 */
autoUpdater.logger = ElectronLog;

autoUpdater.autoDownload = false;

// ElectronLog.info('Started App');
ElectronLog.debug('os arch', os.arch());
// ElectronLog.debug('os cpus', os.cpus());
// ElectronLog.debug('os hostname', os.hostname());
// ElectronLog.debug('os platform', os.platform());

function main() {
  const window = new BrowserWindow({
    width: 1280,
    height: 800,
    resizable: false,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, '..', 'public', 'preload.js'),
    },
  });

  const menuCtrl = new MenuCtrl();
  const menu = Menu.buildFromTemplate(menuCtrl.menu);
  Menu.setApplicationMenu(menu);

  if (process.env.locheck.R_RUN_MODE === 'local') {
    window.webContents.openDevTools();
    window.loadURL('http://localhost:9000');
  } else {
    const mainIndexHtml = path.join(__dirname, '../dist-web/index.html');
    window.loadFile(mainIndexHtml);
  }

  ipcMain.on('login', async (e, data) => {
    const encodeId = encodeURIComponent(data);

    const nameListArr = await getCharList(encodeId);

    const charArr: Auth[] = [];

    for (let index = 0; index < nameListArr.length; index += 1) {
      const charInfo = await getCharInfo(nameListArr[index]);
      ElectronLog.info(charInfo);
      charArr.push(charInfo);
    }

    ElectronLog.info(charArr);
    e.returnValue = JSON.stringify(charArr);
  });

  setInterval(() => {
    window.webContents.send('refresh');
  }, 60000);

  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 600000);
  // }, 4000);
}

app.whenReady().then(() => {
  main();
});

autoUpdater.on('error', (error) => {
  dialog.showErrorBox(
    'Error: ',
    error == null ? 'unknown' : (error.stack || error).toString(),
  );
});

autoUpdater.on('update-available', () => {
  dialog
    .showMessageBox({
      type: 'info',
      title: '새로운 업데이트가 발견되었습니다.',
      message: '새로운 업데이트가 발견되었습니다, 지금 업데이트 하겠습니까 ?',
      buttons: ['네', '아니요'],
    })
    .then((buttonIndex) => {
      ElectronLog.debug(buttonIndex);
      if (buttonIndex.response === 0) {
        autoUpdater.downloadUpdate();
      }
    });
});

autoUpdater.on('update-not-available', () => {
  dialog.showMessageBox({
    title: 'No Updates',
    message: 'Current version is up-to-date.',
  });
});

autoUpdater.on('download-progress', (progressObj) => {
  let logMsg = `Download speed: ${progressObj.bytesPerSecond}`;
  logMsg = `${logMsg} - Downloaded ${progressObj.percent}%`;
  logMsg = `${logMsg} (${progressObj.transferred}/${progressObj.total})`;
  ElectronLog.info(logMsg);
});

autoUpdater.on('update-downloaded', (info) => {
  const btnIndex = dialog.showMessageBoxSync({
    type: 'question',
    title: 'locheck 업데이트',
    message: '업데이트가 다운로드 완료 되었습니다. 업데이트를 하시겠습니까?',
  });

  if (btnIndex === 0) {
    autoUpdater.quitAndInstall();
  }
});
