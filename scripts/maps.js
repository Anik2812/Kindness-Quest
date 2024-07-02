export class Map {
    constructor(game) {
        this.game = game;
        this.locations = [
            { name: 'Park', x: 100, y: 100 },
            { name: 'School', x: 300, y: 200 },
            { name: 'Library', x: 500, y: 300 },
            { name: 'Community Center', x: 200, y: 400 },
            { name: 'Hospital', x: 400, y: 100 }
        ];
    }

    init() {
        const mapElement = document.getElementById('map');
        this.locations.forEach(location => {
            const locationElement = document.createElement('div');
            locationElement.className = 'location';
            locationElement.style.left = `${location.x}px`;
            locationElement.style.top = `${location.y}px`;
            locationElement.style.backgroundImage = `url('assets/images/locations/${location.name.toLowerCase().replace(' ', '_')}.png')`;
            locationElement.addEventListener('click', () => this.locationClicked(location));
            mapElement.appendChild(locationElement);
        });
    }

    locationClicked(location) {
        console.log(`Location clicked: ${location.name}`);
        const act = this.game.acts.generateAct(location.name, this.game.player.level);
        this.game.ui.showAct(act);
        this.moveCharacter(location);
        this.game.audioManager.playSoundEffect('new_quest');
    }

    moveCharacter(location) {
        const character = document.getElementById('character');
        if (character) {
            character.style.left = `${location.x - 25}px`;
            character.style.top = `${location.y - 25}px`;
            this.game.audioManager.playSoundEffect('footstep_pavement');
        }
    }
}