const utils = {
    withGrid(n) {
        return n * 16;
    },

    asGridCoord(x, y) {
        return `${x*16},${y*16}`;
    },
    
    nextPosition(x, y, direction) {
        const size = 16;
        const changes = {
            left: { x: x - size, y },
            right: { x: x + size, y },
            up: { x, y: y - size },
            down: { x, y: y + size },
        };
    
        return changes[direction] || {x, y};
    },

    oppositeDirection(direction) {
        opposite = {
            left: "right",
            right: "left",
            up: "down",
            down: "up",
        }

        return opposite[direction];
    },

    wait(ms) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    },

    randomFromArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    emitEvent(name, detail) {
        // this is a native browser feature
        document.dispatchEvent(new CustomEvent(name, {detail}));
    },   
}