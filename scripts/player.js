export class Player {
    constructor(level = 1, exp = 0) {
        this.level = level;
        this.exp = exp;
    }

    gainExp(amount) {
        this.exp += amount;
    }

    checkLevelUp() {
        const requiredExp = this.getNextLevelExp();
        if (this.exp >= requiredExp) {
            this.level += 1;
            this.exp -= requiredExp;
            return true;
        }
        return false;
    }

    getNextLevelExp() {
        return this.level * 100; // Example level-up logic
    }
}