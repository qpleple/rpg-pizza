class Combatant {
    constructor(config, battle) {
        this.battle = battle;

        Object.keys(config).forEach(key => {
            this[key] = config[key];
        });
    }

    createElement() {

    }

    init(container) {

    }
}