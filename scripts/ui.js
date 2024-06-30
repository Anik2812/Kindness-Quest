export class UI {
    constructor(game) {
        this.game = game;
    }

    init() {
        this.updateLevel();
        this.updateExp();
        document.getElementById('modal-close').addEventListener('click', () => {
            this.hideModal();
            this.game.audioManager.playSoundEffect('menu_close');
        });
        document.getElementById('settings-button').addEventListener('click', () => this.showSettings());
        document.getElementById('settings-close').addEventListener('click', () => this.hideSettings());
        this.initSettings();
    }

    updateLevel() {
        document.getElementById('level-value').textContent = this.game.player.level;
    }

    updateExp() {
        document.getElementById('exp-value').textContent = this.game.player.exp;
    }

    showAct(act) {
        const modal = document.getElementById('modal');
        const content = document.getElementById('modal-content');
        content.innerHTML = `
            <h2>New Act of Kindness</h2>
            <p>${act.description}</p>
            <p>EXP: ${act.exp}</p>
            <button id="complete-act">Complete Act</button>
        `;
        modal.classList.remove('hidden');
        document.getElementById('complete-act').addEventListener('click', () => this.completeAct(act));
        this.game.audioManager.playSoundEffect('menu_open');
    }

    completeAct(act) {
        this.game.completeAct(act);
        this.hideModal();
    }

    hideModal() {
        document.getElementById('modal').classList.add('hidden');
    }

    showMessage(message) {
        const content = document.getElementById('modal-content');
        content.innerHTML = `<p>${message}</p>`;
        document.getElementById('modal').classList.remove('hidden');
    }

    showSettings() {
        document.getElementById('settings').classList.remove('hidden');
        this.game.audioManager.playSoundEffect('menu_open');
    }

    hideSettings() {
        document.getElementById('settings').classList.add('hidden');
        this.game.audioManager.playSoundEffect('menu_close');
    }

    initSettings() {
        const musicSlider = document.getElementById('music-volume');
        const sfxSlider = document.getElementById('sfx-volume');
        const muteButton = document.getElementById('mute-button');

        musicSlider.addEventListener('input', (e) => {
            this.game.audioManager.setMusicVolume(parseFloat(e.target.value));
        });

        sfxSlider.addEventListener('input', (e) => {
            this.game.audioManager.setSoundEffectVolume(parseFloat(e.target.value));
        });

        muteButton.addEventListener('click', () => {
            const isMuted = this.game.audioManager.toggleMute();
            muteButton.textContent = isMuted ? 'Unmute' : 'Mute';
        });
    }
}