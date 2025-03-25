// import css from '../css/index.css'
import { EmotionPanel } from './emotionpanel.js';
// const assert = await import('assert/');
// const path = await import('path-browserify');
// const os = await import('os-browserify/browser');
// const util = await import('util/');
EmotionPanel();
async function loadAudioFiles() {
    try {
      const files = await window.electronAPI.getFiles('audio');
      console.log('音频文件:', files);
    } catch (error) {
      console.error('获取文件失败:', error);
    }
}
import {runVosk} from "../js/vosk.js"
window.runVosk = runVosk;