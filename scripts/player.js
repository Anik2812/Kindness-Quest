export class Player {
    constructor() {
        this.level = 1;
        this.exp = 0;
    }

    gainExp(amount) {
        this.exp += amount;
    }

    checkLevelUp() {
        const expNeeded = this.level * 100;
        if (this.exp >= expNeeded) {
            this.level++;
            this.exp -= expNeeded;
            return true;
        }
        return false;
    }
}