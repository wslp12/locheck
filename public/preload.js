const { contextBridge, ipcRenderer } = require('electron');

console.log('%cpreload.js || preload', 'color: red', 'preload');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('ipc', {
  on: (channel, func) => {
    // let validChannels = ["open-status"];
    // if (validChannels.includes(channel)) {
    // Deliberately strip event as it includes `sender`
    // console.log(000);
    ipcRenderer.on(channel, func);
    // }
  },
  send: (channel, data) => {
    // console.log(channel, data);
    // whitelist channels
    // let validChannels = ['naver-login'];
    // if (validChannels.includes(channel)) {
    ipcRenderer.send(channel, data);
    // }
  },
  sendSync: (channel, data) => {
    // console.log(channel, data);
    // whitelist channels
    // let validChannels = ['naver-login'];
    // if (validChannels.includes(channel)) {
    return ipcRenderer.sendSync(channel, data);
    // }
  },
});
