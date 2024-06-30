import { Game } from './game.js';
import { AudioManager } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
    const audioManager = new AudioManager();
    audioManager.loadAudio();
    audioManager.preloadAudio();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const game = new Game(audioManager, currentUser);
    game.init();
});