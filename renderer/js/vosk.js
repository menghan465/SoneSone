// import { Model, KaldiRecognizer } from "../js/vosk-browser.js";
import { Model, KaldiRecognizer } from "vosk-browser";
export async function runVosk(audioStream, path) {
    const model = await Model.createModel(path);
    const recognizer = new model.KaldiRecognizer();
    const audioContext = new AudioContext();
    const recognizerNode = audioContext.createScriptProcessor(4096, 1, 1);
    recognizerNode.onaudioprocess = (event) => {
        try {
            recognizer.acceptWaveform(event.inputBuffer);
        } catch (error) {
            console.error('acceptWaveform failed', error);
        }
    };
    const source = audioContext.createMediaStreamSource(audioStream);
    source.connect(recognizerNode);
    recognizerNode.connect(audioContext.destination);
}
window.runVosk = runVosk;