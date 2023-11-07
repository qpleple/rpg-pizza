class KeyboardMenu {
    constructor() {
        this.options = [];
        this.up = null;
        this.down = null;
        this.prevFocus = null;
    }

    setOptions(options) {
        this.options = options;
        this.element.innerHTML = this.options.map((option, index) => {
            const disabledAttr = option.disabled ? "disabled" : "";
            const autoFocusAttr = index === 0 ? "autoFocus" : "";

            return (`
                <div class="option">
                    <button ${disabledAttr} ${autoFocusAttr} data-button="${index}" data-description="${option.description}">
                        ${option.label}
                    </button>
                    <span class="right">${option.right ? option.right() : ""}</span>
                </div>
            `);
        }).join("");

        this.element.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", () => {
                const chosenOption = this.options[Number(button.dataset.button)];
                chosenOption.handler();
            });

            button.addEventListener("mouseenter", () => {
                button.focus();
            });

            button.addEventListener("focus", () => {
                this.prevFocus = button;
                this.descriptionElementText.innerText = button.dataset.description;
            });
        });
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("KeyboardMenu");

        //Description box element
        this.descriptionElement = document.createElement("div");
        this.descriptionElement.classList.add("DescriptionBox");
        this.descriptionElement.innerHTML = (`<p>I will provide information!</p>`);
        this.descriptionElementText = this.descriptionElement.querySelector("p");
    }

    init(container) {
        this.createElement();
        container.appendChild(this.descriptionElement);
        container.appendChild(this.element);
    }
}