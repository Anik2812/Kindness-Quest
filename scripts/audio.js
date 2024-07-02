export class AudioManager {
    constructor() {
        this.musicTracks = {};
        this.soundEffects = {};
        this.currentMusic = null;
        this.musicVolume = 0.5;
        this.sfxVolume = 0.5;
        this.isMuted = false;
    }

    loadAudio() {
        // Load music tracks
        const musicTracks = [
            'main_theme', 'exploration_theme', 'park_theme', 'school_theme',
            'library_theme', 'community_center_theme', 'hospital_theme',
            'level_up_fanfare', 'daily_challenge_theme'
        ];
        musicTracks.forEach(track => {
            this.musicTracks[track] = new Audio(`audio/music/${track}.mp3`);
            this.musicTracks[track].loop = true;
        });

        // Load sound effects
        const soundEffects = [
            'button_click', 'menu_open', 'menu_close', 'scroll', 'act_complete',
            'exp_gain', 'new_quest', 'footstep_grass', 'footstep_pavement',
            'bird_chirp', 'rustling_leaves', 'school_bell', 'page_turn',
            'soft_whisper', 'hospital_beep', 'challenge_start', 'achievement_unlock',
            'new_area_unlock', 'outfit_change', 'hair_change', 'accessory_change'
        ];
        soundEffects.forEach(effect => {
            this.soundEffects[effect] = new Audio(`audio/music/sfx/${effect}.mp3`);
        });
    }

    playMusic(track) {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
        }
        this.currentMusic = this.musicTracks[track];
        if (!this.isMuted) {
            this.currentMusic.volume = this.musicVolume;
            this.currentMusic.play().catch(e => console.error('Error playing music:', e));
        }
    }

    fadeOutMusic() {
        if (this.currentMusic) {
            const fadeAudio = setInterval(() => {
                if (this.currentMusic.volume > 0.1) {
                    this.currentMusic.volume -= 0.1;
                } else {
                    clearInterval(fadeAudio);
                    this.currentMusic.pause();
                    this.currentMusic.volume = this.musicVolume;
                }
            }, 200);
        }
    }

    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
        }
    }

    playSoundEffect(effect) {
        const sound = this.soundEffects[effect];
        if (sound && !this.isMuted) {
            const clonedSound = sound.cloneNode();
            clonedSound.volume = this.sfxVolume;
            clonedSound.play().catch(e => console.error('Error playing sound effect:', e));
        } else {
            console.error(`Sound effect "${effect}" not found.`);
        }
    }

    setMusicVolume(volume) {
        this.musicVolume = volume;
        if (this.currentMusic && !this.isMuted) {
            this.currentMusic.volume = volume;
        }
    }

    setSoundEffectVolume(volume) {
        this.sfxVolume = volume;
    }

    mute() {
        this.isMuted = true;
        if (this.currentMusic) {
            this.currentMusic.volume = 0;
        }
    }

    unmute() {
        this.isMuted = false;
        if (this.currentMusic) {
            this.currentMusic.volume = this.musicVolume;
        }
    }

    toggleMute() {
        if (this.isMuted) {
            this.unmute();
        } else {
            this.mute();
        }
        return this.isMuted;
    }

    preloadAudio() {
        // Preload all audio files
        Object.values(this.musicTracks).forEach(track => track.load());
        Object.values(this.soundEffects).forEach(effect => effect.load());
    }
}
