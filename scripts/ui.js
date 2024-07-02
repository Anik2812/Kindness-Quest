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
        document.getElementById('reset-score').addEventListener('click', () => this.resetScore());
        document.getElementById('logout-button').addEventListener('click', () => this.game.logout());
        this.initSettings();
    }
    
    // Add this method to the UI class
    resetScore() {
        this.game.player.level = 1;
        this.game.player.exp = 0;
        this.updateLevel();
        this.updateExp();
        this.game.saveGame();
        this.showMessage("Score has been reset!");
    }

    updateLevel() {
        document.getElementById('level-value').textContent = this.game.player.level;
    }

    updateExp() {
        const expValue = document.getElementById('exp-value');
        const expMax = document.getElementById('exp-max');
        const expFill = document.getElementById('exp-fill');

        expValue.textContent = this.game.player.exp;
        expMax.textContent = this.game.player.getNextLevelExp();

        const expPercentage = (this.game.player.exp / this.game.player.getNextLevelExp()) * 100;
        expFill.style.width = `${expPercentage}%`;

        gsap.to(expFill, {
            width: `${expPercentage}%`,
            duration: 0.5,
            ease: 'power2.out'
        });
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
        document.getElementById('complete-act').addEventListener('click', () => this.completeAct(act));

        gsap.from(modal, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'back.out(1.7)'
        });
    }

    completeAct(act) {
        this.game.completeAct(act);
        this.hideModal();
    }

    hideModal() {
        const modal = document.getElementById('modal');
        gsap.to(modal, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                modal.classList.add('hidden');
                modal.style.opacity = 1;
                modal.style.scale = 1;
            }
        });
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

    showInventory() {
        // Implement inventory display logic
        console.log('Show inventory');
    }

    showQuests() {
        // Implement quests display logic
        console.log('Show quests');
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