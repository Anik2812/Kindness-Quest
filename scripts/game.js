import { Map } from './map.js';
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
        this.map.init();
        this.ui.init();
        this.loadGame();
        this.audioManager.playMusic('main_theme');
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

    constructor() {
        this.map = new Map(this);
        this.acts = new Acts();
        this.player = new Player();
        this.ui = new UI(this);
    }

    init() {
        this.map.init();
        this.ui.init();
        this.loadGame();
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

    completeAct(act) {
        this.player.gainExp(act.exp);
        this.ui.updateExp();
        this.saveGame();
        if (this.player.checkLevelUp()) {
            this.ui.updateLevel();
            this.ui.showMessage(`Congratulations! You've reached level ${this.player.level}!`);
        }
    }
}