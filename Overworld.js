class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop() {
        const step = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            const cameraPerson = this.map.gameObjects.hero;

            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                });
            });

            // Fraw lower layer
            this.map.drawLowerImage(this.ctx, cameraPerson);
            
            // Draw game objects
            // sorting to draw the nothern objects before the southern ones
            Object.values(this.map.gameObjects).sort((a, b) => a.y - b.y).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson) ;
            });

            // Draw upper layer
            this.map.drawUpperImage(this.ctx, cameraPerson);

            requestAnimationFrame(() => {
                step();
            });
        };

        step();
    }

    bindActionInput() {
        new KeyPressListener("Enter", () => {
            // is there a person here to talk to?
            this.map.checkForActionCutscene();
        });
    }

    bindHeroPositionCheck() {
        document.addEventListener("PersonWalkingComplete", e => {
            if (e.detail.whoId === "hero") {
                this.map.checkForFootstepCutscene();
            }
        });
    }

    startMap(mapConfig) {
        this.map = new OverworldMap(mapConfig);
        this.map.overworld = this;
        this.map.mountObjects(this.map);
    }

    init() {
        this.startMap(window.OverworldMaps.Kitchen);

        this.bindActionInput();
        this.bindHeroPositionCheck();

        this.directionInput = new DirectionInput();
        this.directionInput.init();
        
        this.startGameLoop();

        this.map.startCutscene([
            {type: "battle"},
        ]);
    }
}