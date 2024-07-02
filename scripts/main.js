import { Game } from './game.js';
import { AudioManager } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        const audioManager = new AudioManager();
        audioManager.loadAudio();
        audioManager.preloadAudio();
        const game = new Game(audioManager, currentUser);
        game.init();
    } else {
        window.location.href = 'index.html'; // Redirect to login page if not logged in
    }
});