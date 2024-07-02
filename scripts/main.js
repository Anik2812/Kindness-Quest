import { Game } from './game.js';
import { AudioManager } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        const audioManager = new AudioManager();
        audioManager.loadAudio();
        audioManager.preloadAudio();
        
        // Delay game initialization slightly to ensure DOM is ready
        setTimeout(() => {
            const game = new Game(audioManager, currentUser);
            game.init();
        }, 100);
    } else {
        window.location.href = 'login.html';
    }
});