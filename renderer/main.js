import { app, BrowserWindow, ipcMain } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { createRequire } from 'module';
// const { createRequire } = require("module");
const require = createRequire(import.meta.url);
app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    autoHideMenuBar:true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Correct path
      contextIsolation: true, // Must be true for security
      nodeIntegration: false // Disable node integration
    }
  })
  win.loadFile('renderer/web/index.html');
})
ipcMain.handle('get-files', async (event, relativeDir) => {
  try {
    const basePath = app.getAppPath(); // 获取应用根目录
    const dirPath = path.join(basePath, relativeDir); // 计算绝对路径
    console.log('读取路径:', dirPath); // 打印确认路径
    const files = fs.readdirSync(dirPath);
    return files;
  } catch (error) {
    return { error: error.message };
  }
});
// 获取 audio 文件夹的绝对路径
ipcMain.handle('get-audio-dir', () => {
  return path.join(app.getAppPath(), 'audio'); // 直接定位到应用根目录下的 audio
});

// 获取完整音频文件路径
ipcMain.handle('get-audio-file', (event, filename) => {
  const audioDir = path.join(app.getAppPath(), 'audio');
  return path.join(audioDir, filename);
});
