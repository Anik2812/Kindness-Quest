import { Game } from './game.js';
import { AudioManager } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
    const audioManager = new AudioManager();
    audioManager.loadAudio();
    audioManager.preloadAudio();
    const game = new Game(audioManager);
    game.init();
});