export class UI {
    constructor(game) {
        this.game = game;
    }

    init() {
        this.updateLevel();
        this.updateExp();
        this.setupEventListeners();
    }

    updateLevel() {
        const levelElement = document.getElementById('level-value');
        if (levelElement) {
            levelElement.textContent = this.game.player.level;
        } else {
            console.error('Element with id "level-value" not found');
        }
    }

    updateExp() {
        const expValue = document.getElementById('exp-value');
        const expFill = document.getElementById('exp-fill');

        if (!expValue || !expFill) {
            console.error('One or more EXP elements not found');
            return;
        }

        expValue.textContent = this.game.player.exp;

        const nextLevelExp = this.game.player.getNextLevelExp();
        const expPercentage = (this.game.player.exp / nextLevelExp) * 100;
        expFill.style.width = `${expPercentage}%`;
    }

    setupEventListeners() {
        const modalClose = document.getElementById('modal-close');
        const settingsButton = document.getElementById('settings-button');
        const settingsClose = document.getElementById('settings-close');
        const resetScoreButton = document.getElementById('reset-score');
        const logoutButton = document.getElementById('logout-button');

        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.hideModal();
                this.game.audioManager.playSoundEffect('menu_close');
            });
        }

        if (settingsButton) {
            settingsButton.addEventListener('click', () => this.showSettings());
        }

        if (settingsClose) {
            settingsClose.addEventListener('click', () => this.hideSettings());
        }

        if (resetScoreButton) {
            resetScoreButton.addEventListener('click', () => this.resetScore());
        }

        if (logoutButton) {
            logoutButton.addEventListener('click', () => this.game.logout());
        }

        this.initSettings();
    }

    showModal(content) {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modal-content');
        if (modal && modalContent) {
            modalContent.innerHTML = content;
            modal.classList.remove('hidden');
            this.game.audioManager.playSoundEffect('menu_open');
        }
    }

    hideModal() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.classList.add('hidden');
            this.game.audioManager.playSoundEffect('menu_close');
        }
    }

    showSettings() {
        const settings = document.getElementById('settings');
        if (settings) {
            settings.classList.remove('hidden');
            this.game.audioManager.playSoundEffect('menu_open');
        }
    }

    hideSettings() {
        const settings = document.getElementById('settings');
        if (settings) {
            settings.classList.add('hidden');
            this.game.audioManager.playSoundEffect('menu_close');
        }
    }

    resetScore() {
        this.game.player.level = 1;
        this.game.player.exp = 0;
        this.updateLevel();
        this.updateExp();
        this.game.saveGame();
        this.showModal("<p>Score has been reset!</p>");
    }

    initSettings() {
        const musicSlider = document.getElementById('music-volume');
        const sfxSlider = document.getElementById('sfx-volume');
        const muteButton = document.getElementById('mute-button');

        if (musicSlider) {
            musicSlider.addEventListener('input', (e) => {
                this.game.audioManager.setMusicVolume(parseFloat(e.target.value));
            });
        }

        if (sfxSlider) {
            sfxSlider.addEventListener('input', (e) => {
                this.game.audioManager.setSoundEffectVolume(parseFloat(e.target.value));
            });
        }

        if (muteButton) {
            muteButton.addEventListener('click', () => {
                const isMuted = this.game.audioManager.toggleMute();
                muteButton.textContent = isMuted ? 'Unmute' : 'Mute';
            });
        }
    }

    // Add the showAct method
    showAct() {
        // Implementation of showAct
        console.log('showAct method called');
    }
}
