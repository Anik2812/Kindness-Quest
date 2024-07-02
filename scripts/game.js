import { Map } from './maps.js';
import { Acts } from './acts.js';
import { Player } from './player.js';
import { UI } from './ui.js';

export class Game {
    constructor(audioManager, currentUser) {
        this.audioManager = audioManager;
        this.map = new Map(this);
        this.acts = new Acts();
        this.player = new Player();
        this.ui = new UI(this);
        this.currentUser = currentUser;
    }

    init() {
        console.log('Game initializing...');
        this.map.init();
        this.ui.init();
        this.loadGame();
        console.log('Game initialization complete');
        this.createStartMusicButton();
    }

    createStartMusicButton() {
        const button = document.createElement('button');
        button.innerText = 'Start Music';
        button.style.position = 'fixed';
        button.style.top = '10px';
        button.style.left = '10px';
        button.style.zIndex = 1000; // Ensure it's on top of other elements
        document.body.appendChild(button);

        button.addEventListener('click', () => {
            this.audioManager.playMusic('main_theme');
            button.remove(); // Remove the button after clicking
        });
    }

    completeAct(act) {
        this.player.gainExp(act.exp);
        this.ui.updateExp();
        this.saveGame();
        this.audioManager.playSoundEffect('act_complete');
        if (this.player.checkLevelUp()) {
            this.ui.updateLevel();
            this.ui.showMessage(`Congratulations! You've reached level ${this.player.level}!`);
            this.audioManager.playSoundEffect('level_up_fanfare');
        }
    }

    loadGame() {
        if (this.currentUser) {
            this.player.level = this.currentUser.level;
            this.player.exp = this.currentUser.exp;
            this.ui.updateLevel();
            this.ui.updateExp();
        }
    }

    saveGame() {
        if (this.currentUser) {
            this.currentUser.level = this.player.level;
            this.currentUser.exp = this.player.exp;
            localStorage.setItem(this.currentUser.username, JSON.stringify(this.currentUser));
        }
    }

    logout() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}