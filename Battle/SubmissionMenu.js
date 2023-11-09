class SubmissionMenu {
    constructor({caster, enemy, onComplete, items}) {
        this.caster = caster;
        this.enemy = enemy;
        this.onComplete = onComplete;

        let quantityMap = {};
        items.forEach(item => {
            if (item.team === caster.team) {
                let existing = quantityMap[item.actionId];
                if (existing) {
                    existing.quantity++;
                } else {
                    quantityMap[item.actionId] = {
                        actionId: item.actionId,
                        quantity: 1,
                        instanceId: item.instanceId,
                    };
                }
                
            }
        });
        this.items = Object.values(quantityMap);
    }

    getPages() {
        const backOption = {
            label: "Go Back",
            description: "Return to previous page",
            handler: () => {
                this.keyboardMenu.setOptions(this.getPages().root);
            }
        }
        return {
            root: [{
                label: "Attack",
                description: "Choose an attack",
                handler: () => {
                    this.keyboardMenu.setOptions(this.getPages().attacks);
                },
            }, {
                label: "Items",
                description: "Choose an item",
                handler: () => {
                    this.keyboardMenu.setOptions(this.getPages().items);
                },
            }, {
                label: "Swap",
                description: "Change to another pizza",
                handler: () => {
                    // do sth
                },
            }],
            attacks: [
                ...this.caster.actions.map(key => {
                    const action = Actions[key];
                    return {
                        label: action.name,
                        description: action.description,
                        handler: () => {
                            this.menuSubmit(action);
                        }
                    }
                }),
                backOption,
            ],
            items :[
                ...this.items.map(item => {
                    const action = Actions[item.actionId];
                    return {
                        label: action.name,
                        description: action.description,
                        right: () => {
                            return "x" + item.quantity;
                        },
                        handler: () => {
                            this.menuSubmit(action, items.actionId);
                        }
                    }
                }),
                backOption,
            ]
        }
    }

    menuSubmit(action, instanceId=null) {
        this.keyboardMenu?.end();

        this.onComplete({
            action,
            target: action.targetType === "friendly" ? this.caster : this.enemy,
            instanceId,
        });
    }


    decide() {
        // TODO: enemies should randomly decide what to do
        this.menuSubmit(Actions[this.caster.actions[0]]);
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