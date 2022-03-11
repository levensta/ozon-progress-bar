

export default class Progress {

    constructor(rootElId) {

        this.progressInputValue = document.createElement("div");
        this.progressInputValue.className = "progress-settings__frame__input";
        this.progressInputValue.innerHTML = `
            <label class="input-value">
                <input type="number" class="percent-fill"
                       placeholder="0" min="0" max="100" step="1"
                       oninput="validity.valid||(value='');"
                >
            </label>
            <p>Value</p>
        `;



        this.progressToggleAnimate = document.createElement("div");
        this.progressToggleAnimate.className = "progress-settings__frame__input";
        this.progressToggleAnimate.innerHTML = `
            <label class="switch">
                <input type="checkbox" class="animate">
                <span class="slider round"></span>
            </label>
            <p>Animate</p>
        `;

        this.progressToggleHide = document.createElement("div");
        this.progressToggleHide.className = "progress-settings__frame__input";
        this.progressToggleHide.innerHTML = `
            <label class="switch">
                <input type="checkbox" class="hide">
                <span class="slider round"></span>
            </label>
            <p>Hide</p>
        `;

        this.progressBar = document.createElement("div");

        this.progressBar.className = "progress-bar";
        this.progressBar.innerHTML = `
            <svg class="progress-ring" width="120" height="120">
                <circle class="progress-ring__circle_bg"
                        stroke="#EEF3F6" stroke-width="10"
                        cx="60" cy="60" r="52" fill="transparent"
                />
                <circle class="progress-ring__circle_filled"
                        stroke="#005BFF" stroke-width="10"
                        cx="60" cy="60" r="52" fill="transparent"
                />
            </svg>
        `;

        this.root = document.getElementById(rootElId);
        this.root.classList.add("progress-container")
        this.root.parentNode.appendChild(this.render());

        this.progressRing = this.root.querySelector(".progress-ring");
        this.circle = this.progressRing.querySelector(".progress-ring__circle_filled");

        this.radius = this.circle.r.baseVal.value;
        this.circumference = 2 * Math.PI * this.radius;

        this.inputValue = this.root.querySelector(".percent-fill");
        this.inputAnimate = this.root.querySelector(".animate");
        this.inputHide = this.root.querySelector(".hide");

        this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
        this.circle.style.strokeDashoffset = this.circumference;

        const _this = this
        this.inputValue.addEventListener("input", function(event) {
            _this.setValue(this.value);
        });

        this.inputAnimate.addEventListener("change", function () {
            if (this.checked) {
                _this.animateOn()
            }
            else {
                _this.animateOff();
            }
        });

        this.inputHide.addEventListener("change", function() {
            if (this.checked) {
                _this.hideOn();
            }
            else {
                _this.hideOff();
            }
        });
    }

    render() {
        const header = document.createElement("p");
        const settings = document.createElement("div");
        const settings__frame = document.createElement("div");

        settings.className = "progress-settings";
        settings__frame.className = "progress-settings__frame";
        header.textContent = "Progress";

        settings__frame.appendChild(this.progressInputValue);
        settings__frame.appendChild(this.progressToggleAnimate);
        settings__frame.appendChild(this.progressToggleHide);
        settings.appendChild(settings__frame);

        this.root.appendChild(header);
        this.root.appendChild(this.progressBar);
        this.root.appendChild(settings);

        return this.root;
    }

    getValue() {
        return this.inputValue.value;
    }

    setValue(percent) {
        if (percent > 100) {
            percent = 100;
        }
        else if (percent < 0) {
            percent = 0;
        }
        this.inputValue.value = percent;

        const offset = this.circumference - percent / 100 * this.circumference;
        this.circle.style.strokeDashoffset = offset;
    }

    animateOn() {
        this.circle.classList.add("progress-ring__circle_animate");
        this.inputAnimate.checked = true;
        this.inputValue.disabled = true;
    }

    animateOff() {
        this.circle.classList.remove("progress-ring__circle_animate");
        this.inputAnimate.checked = false;
        this.inputValue.disabled = false;
    }

    isAnimated() {
        return this.inputAnimate.checked;
    }

    hideOn() {
        this.progressRing.classList.add("progress-ring_hide");
        this.inputHide.checked = true;
    }

    hideOff() {
        this.progressRing.classList.remove("progress-ring_hide");
        this.inputHide.checked = false;
    }

    isHidden() {
        return this.inputHide.checked;
    }
}
