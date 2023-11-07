class SubmissionMenu {
    constructor({caster, enemy, onComplete}) {
        this.caster = caster;
        this.enemy = enemy;

        this.onComplete = onComplete;
    }

    getPages() {
        return {
            root: [{
                label: "Attack",
                description: "Choose an attack",
                handler: () => {
                    console.log("attack");
                },
            }, {
                label: "Items",
                description: "Choose an item",
                disabled: true,
                handler: () => {
                    // do sth
                },
            }, {
                label: "Swap",
                description: "Change to another pizza",
                handler: () => {
                    // do sth
                },
            }],
        }
    }

    decide() {
        this.onComplete({
            action: Actions[this.caster.actions[0]],
            target: this.enemy,
        });
    }

    showMenu(container) {
        this.keyboardMenu = new KeyboardMenu();
        this.keyboardMenu.init(container);
        this.keyboardMenu.setOptions(this.getPages().root);
    }

    init(container) {
        if (this.caster.isPlayerControlled) {
            this.showMenu(container);
        } else {
            this.decide();
        }
    }
}