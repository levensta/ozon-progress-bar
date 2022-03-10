const progressRing = document.querySelector(".progress-ring");
const circle = progressRing.querySelector(".progress-ring__circle_filled");

const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

const inputProgressVal = document.querySelector("#percentFill");
const inputProgressAnimate = document.querySelector("#animate");
const inputProgressHide = document.querySelector("#hide");

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - percent / 100 * circumference;

    circle.style.strokeDashoffset = offset;
}

inputProgressVal.addEventListener("change", () => {
   setProgress(inputProgressVal.value);
});

inputProgressAnimate.addEventListener("change", function () {
    if (this.checked) {
        circle.classList.add("progress-ring__circle_animate");
    }
    else {
        circle.classList.remove("progress-ring__circle_animate");
    }
});

inputProgressHide.addEventListener("change", function() {
    if (this.checked) {
        progressRing.classList.add("progress-ring_hide");
    }
    else {
        progressRing.classList.remove("progress-ring_hide");
    }
});

