class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        };
    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {
            // more cases will come here

            // case: we are keyboard ready and have an arrow pressed
            if (this.isPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow,
                })
            }
            this.updateSprite();
        }
    }

    startBehavior(state, behavior) {
        // set character direction
        this.direction = behavior.direction;

    
        if (behavior.type === "walk") {
            // stop if space is not free
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                return;
            }

            // ready to walk
            state.map.moveWall(this.x, this.y, this.direction);
            this.movingProgressRemaining = 16;
            this.updateSprite();
        }

        if (behavior.type === "stand") {
            setTimeout(() => {
                utils.emitEvent("PersonStandComplete", {whoId: this.id});
            }, behavior.time);
        }
    }

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining--;

        // we finished the walk
        if (this.movingProgressRemaining === 0) {
            utils.emitEvent("PersonWalkingComplete", {whoId: this.id});
        }
    }

    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction);
            return;
        }
        this.sprite.setAnimation("idle-" + this.direction);
    }
}