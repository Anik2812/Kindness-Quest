import { Map } from './maps.js';
import { Acts } from './acts.js';
import { Player } from './player.js';
import { UI } from './ui.js';

export class Game {
    constructor(audioManager) {
        this.audioManager = audioManager;
        this.map = new Map(this);
        this.acts = new Acts();
        this.player = new Player();
        this.ui = new UI(this);
    }

    init() {
        console.log('Game initializing...');
        this.map.init();
        this.ui.init();
        this.loadGame();
        this.createStartMusicButton();
        console.log('Game initialization complete');
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
        const savedGame = localStorage.getItem('kindnessQuest');
        if (savedGame) {
            const gameData = JSON.parse(savedGame);
            this.player.level = gameData.level;
            this.player.exp = gameData.exp;
            this.ui.updateLevel();
            this.ui.updateExp();
        }
    }

    saveGame() {
        const gameData = {
            level: this.player.level,
            exp: this.player.exp
        };
        localStorage.setItem('kindnessQuest', JSON.stringify(gameData));
    }
}
