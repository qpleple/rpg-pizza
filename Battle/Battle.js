class Battle {
    constructor(config) {
        this.combatants = {
            player1: new Combatant({
                ...Pizzas.s001,
                team: "player",
                hp: 40,
                maxHp: 50,
                xp: 50,
                maxXp: 100,
                level: 1,
                status: {type: "saucy"},
                isPlayerControlled: true,
            }, this),
            enemy1: new Combatant({
                ...Pizzas.v001,
                team: "enemy",
                hp: 40,
                maxHp: 50,
                xp: 20,
                mapXp: 100,
                level: 1,
                status: null,
            }, this),
            enemy2: new Combatant({
                ...Pizzas.f001,
                team: "enemy",
                hp: 50,
                maxHp: 50,
                xp: 30,
                maxXp: 100,
                level: 1,
                status: null,
            }, this),
        };

        this.activeCombatants = {
            player: "player1",
            enemy: "enemy1",
        };

        this.items = [
            {actionId: "item_recoverStatus", instanceId: "p1", team: "player"},
            {actionId: "item_recoverStatus", instanceId: "p2", team: "player"},
            {actionId: "item_recoverStatus", instanceId: "p3", team: "enemy"},

            {actionId: "item_recoverHp", instanceId: "p4", team: "player"},
        ]
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Battle");
        this.element.innerHTML = (`
            <div class="Battle_hero">
                <img src="${'/images/characters/people/hero.png'}" />
            </div>
            <div class="Battle_enemy">
                <img src="${'/images/characters/people/npc3.png'}" />
            </div>
        `);
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);

        Object.keys(this.combatants).forEach(key => {
            let combatant = this.combatants[key];
            combatant.id = key;
            combatant.init(this.element);
        });

        this.turnCycle = new TurnCycle({
            battle: this,
            onNewEvent: event => {
                return new Promise(resolve => {
                    const battleEvent = new BattleEvent(event, this);
                    battleEvent.init(resolve);
                });
            },
        });

        this.turnCycle.init();
    }
}