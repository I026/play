const blocks = document.getElementById("blocks");
let block = blocks.querySelectorAll("div");
const substantialBlock = blocks.querySelectorAll("div:not(.air)");
const air = blocks.querySelector(".air");
const popup = document.querySelector(".popup");
const topTitle = document.getElementById("topTitle");
const timeDisplay = document.getElementById("timeDisplay");
const stepsDisplay = document.getElementById("stepsDisplay");
const btns = document.querySelector(".btns");
const retryBtn = document.getElementById("retryBtn");
const continueBtn = document.getElementById("continueBtn");

const blockCaseWidth = 4;
const blockCaseHeight = 7;

const blockTotal = substantialBlock.length;
document.documentElement.style.setProperty("--blockCaseWidth", blockCaseWidth);
document.documentElement.style.setProperty("--blockCaseHeight", blockCaseHeight);

let targetBlock = blockCaseWidth * blockCaseHeight - 1;
let steps = 0;

let isOperated = true;

let sec = 0;
let min = 0;
let hr = 0;

let timerInterval;

function timerStart(d = 0) {
    sec = d;
    timerInterval = setInterval(() => {
        sec += .01;
        if (sec >= 60) {
            min += 1;
            sec = 0;
        }
        if (min >= 60) {
            hr += 1;
            min = 0;
        }
        topTitle.innerText = `Result : ${blockCaseWidth} × ${blockCaseHeight}`;
        timeDisplay.innerHTML = `${
            String(hr).padStart(2, "0")
        } h ${
            String(min).padStart(2, "0")
        } m ${
            (sec < 10 ? '0' + sec : String(sec)).substring(0, 5)
        } s`;
        stepsDisplay.innerText = `${steps} steps`;
    }, 10);
}

function timerReset() {
    sec = 0;
    min = 0;
    hr = 0;
}

function swipe() {
    block = blocks.querySelectorAll("div");
    console.log(`
        Step : ${steps}
        Target : ${targetBlock}
        `);
        if (isOperated) {
            gameClearJudge();
            if (steps == 1) {
                timerStart();
            }
        }
}

function swipeAnimetion(block,animetion) {
    block.classList.add(animetion);
    setTimeout(() => {
        block.classList.remove(animetion);
    }, parseFloat((getComputedStyle(document.documentElement).getPropertyValue("--swipeAnimetionDuration").trim())) * 1000);
    // parseFloat(getComputedStyle(block).animationDuration)
}

function opacityMitigation() {
    blocks.classList.add("opacityMitigationAnimtion");
    setTimeout(() => {
        blocks.classList.remove("opacityUndoAnimtion");
    }, 100);
}
function opacityUndo() {
    blocks.classList.add("opacityUndoAnimtion");
    setTimeout(() => {
        blocks.classList.remove("opacityMitigationAnimtion");
    }, 100);
}

function gameClearJudge() {
    let judgeIndex = 0;
    let secberCleared = 0;
    while (judgeIndex - 1 < blockTotal) {
        if (block[judgeIndex].classList.contains(`block${judgeIndex + 1}`)) {
            secberCleared += 1;
            console.log(secberCleared, judgeIndex);
        }
        judgeIndex += 1;
    }
    if (secberCleared == judgeIndex - 1) {
        return true;
        setTimeout(() => {
            clearInterval(timerInterval);
            opacityMitigation();
            popup.classList.add("popupDisplayAnimtion");
            setTimeout(() => {
                popup.classList.remove("popupHiddenAnimtion");
            }, 200);
        }, 100);
    }
}

function leftSwipe() {
    if (!((targetBlock % 4) == 0)) {
        steps += 1;
        targetBlock -= 1;
        swipeAnimetion(block[targetBlock], "leftSwipeAnimetion");
        console.log("Left");
        const temp = document.createElement("div");
        air.replaceWith(temp);
        block[targetBlock].replaceWith(air);
        temp.replaceWith(block[targetBlock]);
        swipe();
    }
}

function rightSwipe() {
    if (!((targetBlock + 1) % 4 == 0)) {
        steps += 1;
        targetBlock += 1;
        swipeAnimetion(block[targetBlock], "rightSwipeAnimetion");
        console.log("Right");
        const temp = document.createElement("div");
        air.replaceWith(temp);
        block[targetBlock].replaceWith(air);
        temp.replaceWith(block[targetBlock]);
        swipe();
    }
}

function upSwipe() {
    if (!(targetBlock <= 3)) {
        steps += 1;
        targetBlock -= 4;
        swipeAnimetion(block[targetBlock], "upSwipeAnimetion");
        console.log("Up");
        const temp = document.createElement("div");
        air.replaceWith(temp);
        block[targetBlock].replaceWith(air);
        temp.replaceWith(block[targetBlock]);
        swipe();
    }
}

function downSwipe() {
    if (!(targetBlock >= blockCaseWidth * blockCaseHeight - blockCaseWidth)) {
        steps += 1;
        targetBlock += 4;
        swipeAnimetion(block[targetBlock], "downSwipeAnimetion");
        console.log("Down");
        const temp = document.createElement("div");
        air.replaceWith(temp);
        block[targetBlock].replaceWith(air);
        temp.replaceWith(block[targetBlock])
        swipe();
    }
}

let startX, startY, endX, endY;

function swipeStart(e) {
    startX = e.clientX ?? e.touches[0].clientX;
    startY = e.clientY ?? e.touches[0].clientY;
}

function swipeEnd(e) {
    endX = e.clientX ?? e.changedTouches[0].clientX;
    endY = e.clientY ?? e.changedTouches[0].clientY;

    let difiX = endX - startX;
    let difiY = endY - startY;
    if (isOperated) {
        const swipeRecognitionPx = 100;
        if (Math.abs(difiX) > Math.abs(difiY)) {
            if (difiX < swipeRecognitionPx) {
                rightSwipe();
            } else if (difiX > -swipeRecognitionPx) {
                leftSwipe();
            }
        } else if (Math.abs(difiX) < Math.abs(difiY)) {
            if (difiY < swipeRecognitionPx) {
                downSwipe();
            } else if (difiY > -swipeRecognitionPx) {
                upSwipe();
            }
        }
    }
}

function blockShuffle() {
    isOperated = false;
    document.documentElement.style.setProperty("--swipeAnimetionDuration", "0s");
    opacityMitigation();
    setTimeout(() => {
        const shuffleRoop = setInterval(() => {
            const random = Math.random();
            if (random < .25) {
                leftSwipe();
            } else if (random < .5) {
                rightSwipe();
            } else if (random < .75) {
                upSwipe();
            } else {
                downSwipe();
            }
            if (steps >= blockCaseWidth * blockCaseHeight * 35) {
                for (let i = 0; i < blockCaseWidth + blockCaseHeight; i += 1) {
                    downSwipe();
                    rightSwipe();
                }
                isOperated = true;
                clearInterval(shuffleRoop);
                document.documentElement.style.setProperty("--swipeAnimetionDuration", ".1s");
                steps = 0;
                opacityUndo();
            }
        }, 2);
    }, 500);
};

blockShuffle();

retryBtn.addEventListener("click", () => {
    retry();
});

function retry() {
    blockShuffle();
    timerReset();
    popup.classList.add("popupHiddenAnimtion");
    setTimeout(() => {
        popup.classList.remove("popupDisplayAnimtion");
    }, 100);
}

document.addEventListener("mousedown", swipeStart);
document.addEventListener("mouseup", swipeEnd);
document.addEventListener("touchstart", swipeStart);
document.addEventListener("touchend", swipeEnd);

document.addEventListener("keydown",(event) => {
    if (event.code === "KeyA" || event.code === "ArrowLeft") {
        rightSwipe();
    }
    if (event.code === "KeyD" || event.code === "ArrowRight") {
        leftSwipe();
    }
    if (event.code === "KeyW" || event.code === "ArrowUp") {
        downSwipe();
    }
    if (event.code === "KeyS" || event.code === "ArrowDown") {
        upSwipe();
    }
});


// let index = 0;
// let output = "";
// while (!(index >= 19)) {
//     output += `const block${index + 1} = blocks.querySelectorAll("div")[${index}];\n`
//     index += 1;
// }
// console.log(output);