let blocks = document.getElementById("blocks");
let block = blocks.querySelectorAll("div");
let substantialBlock = blocks.querySelectorAll("div:not(.air)");
let air = blocks.querySelector(".air");
let popup = document.querySelector(".popup");
let btns = document.querySelector(".btns");
let retryBtn = document.getElementById("retryBtn");

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

let formattedSec;
let formattedMin;
let formattedHr;

function timerStart(h = 0, m = 0, s = 0) {
    hr = h * 1;
    min = m * 1;
    sec = s * 1;
    const timerInterval = setInterval(() => {
        sec += .01;
        if (sec >= 60) {
            min += 1;
            sec = 0;
        }
        if (min >= 60) {
            hr += 1;
            min = 0;
        }
        const topTitle = document.getElementById("topTitle");
        const timeDisplay = document.getElementById("timeDisplay");
        const stepsDisplay = document.getElementById("stepsDisplay");
        formattedSec = (sec < 10 ? '0' + sec : String(sec)).substring(0, 5);
        formattedMin = String(min).padStart(2, "0");
        formattedHr = String(hr).padStart(2, "0");
        topTitle.innerText = `Result : ${blockCaseWidth} × ${blockCaseHeight}`;
        timeDisplay.innerHTML = `${
            formattedHr
        } : ${
            formattedMin
        } : ${
            formattedSec
        } <br><span id="timeFastestDisplay"></span>`;
        stepsDisplay.innerHTML = `${steps} steps<br><span id="stepsFastestDisplay"></span>`;
    }, 10);
    const autoSeveInterval = setInterval(() => {
        if (isGameClear) {
            localStorage.removeItem("slidePuzzleProgressAutoSave");
        } else {
            localStorage.setItem("slidePuzzleProgressAutoSave", [blocks.innerHTML, targetBlock, steps, formattedHr, formattedMin, formattedSec]);
        }
    }, Math.floor(Math.random * 500) / 500 + 100);
}

function timerStop() {
    clearInterval(timerInterval);
    clearInterval(autoSeveInterval);
}

function timerReset() {
    sec = 0;
    min = 0;
    hr = 0;
    formattedSec = 0;
    formattedMin = 0;
    formattedHr = 0;
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

function getDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    console.log(`${year} ${month} ${day} ${hours}:${minutes}:${seconds}`);
    return(`${year}, ${month}, ${day}, ${hours}, ${minutes}, ${seconds}`);
}

function saveToLocalStorage() {
    let storageData = (`slidePuzzlePlayLog_Time${blockCaseWidth} × ${blockCaseHeight}`);
    let storageArray;
    const localStorageSaveContent = `${formattedHr}, ${formattedMin}, ${formattedSec}, ${steps}`;
    if (localStorage.getItem(storageData)){
        storageArray = localStorage.getItem(storageData).split(",");
        console.log("結果 : ");
        console.log(formattedHr,formattedMin,formattedSec);
        console.log("最速 : ");
        console.log(storageArray[0],storageArray[1],storageArray[2],storageArray[3]);
    } else {
        localStorage.setItem(storageData, localStorageSaveContent);
        const stepsFastestDisplay = document.getElementById("stepsFastestDisplay");
        const timeFastestDisplay = document.getElementById("timeFastestDisplay");
        timeFastestDisplay.innerText = "(Fastest)";
        stepsFastestDisplay.innerText = "(Least)";
    }
    (() => {
        storageArray = localStorage.getItem(storageData).split(",");
        if (!(localStorage.getItem(storageData)) || formattedHr + formattedMin + formattedSec < storageArray[0] * 1 + storageArray[1] * 1 + storageArray[2] * 1) {
        localStorage.setItem(storageData, localStorageSaveContent);
        const timeFastestDisplay = document.getElementById("timeFastestDisplay");
        timeFastestDisplay.innerText = "(Fastest)";
        }
        if (!(localStorage.getItem(storageData)) || steps < storageArray[3] * 1) {
            localStorage.setItem(storageData, localStorageSaveContent);
            const stepsFastestDisplay = document.getElementById("stepsFastestDisplay");
            stepsFastestDisplay.innerText = "(Least)";
        }
    })();
}

let isGameClear = false;

function gameClearJudge() {
    let judgeIndex = 0;
    let secberCleared = 0;
    while (judgeIndex - 1 < blockTotal) {
        if (block[judgeIndex].classList.contains(`block${judgeIndex + 1}`)) {
            secberCleared += 1;
            // console.log(secberCleared, judgeIndex);
        }
        judgeIndex += 1;
    }
    if (secberCleared == judgeIndex - 1) {
        setTimeout(() => {
            isGameClear = true;
            timerStop();
            saveToLocalStorage();
            opacityMitigation();
            popup.classList.add("popupDisplayAnimtion");
            setTimeout(() => {
                popup.classList.remove("popupHiddenAnimtion");
            }, 200);
        }, 100);
    }
}

function swipe() {
    const temp = document.createElement("div");
    air = blocks.querySelector(".air");
    air.replaceWith(temp);
    block = blocks.querySelectorAll("div");
    block[targetBlock].replaceWith(air);
    temp.replaceWith(block[targetBlock]);
    steps += 1;
    block = blocks.querySelectorAll("div");
        if (isOperated) {
            gameClearJudge();
            if (steps == 1) {
                timerStart();
            }
        }
    console.log(`
        Step : ${steps}
        Target : ${targetBlock}
        `);
}

function swipeAnimetion(block,animetion) {
    block.classList.add(animetion);
    setTimeout(() => {
        block.classList.remove("leftSwipeAnimetion");
        block.classList.remove("rightSwipeAnimetion");
        block.classList.remove("upSwipeAnimetion");
        block.classList.remove("downSwipeAnimetion");
    }, parseFloat((getComputedStyle(document.documentElement).getPropertyValue("--swipeAnimetionDuration").trim())) * 1000);
    // parseFloat(getComputedStyle(block).animationDuration)
}

function leftSwipe() {
    if (!((targetBlock % 4) == 0)) {
        targetBlock -= 1;
        block = blocks.querySelectorAll("div");
        swipeAnimetion(block[targetBlock], "leftSwipeAnimetion");
        console.log("Left");
        swipe();
    }
}

function rightSwipe() {
    if (!((targetBlock + 1) % 4 == 0)) {
        targetBlock += 1;
        block = blocks.querySelectorAll("div");
        swipeAnimetion(block[targetBlock], "rightSwipeAnimetion");
        console.log("Right");
        swipe();
    }
}

function upSwipe() {
    if (!(targetBlock <= 3)) {
        targetBlock -= 4;
        block = blocks.querySelectorAll("div");
        swipeAnimetion(block[targetBlock], "upSwipeAnimetion");
        console.log("Up");
        swipe();
    }
}

function downSwipe() {
    if (!(targetBlock >= blockCaseWidth * blockCaseHeight - blockCaseWidth)) {
        targetBlock += 4;
        block = blocks.querySelectorAll("div");
        swipeAnimetion(block[targetBlock], "downSwipeAnimetion");
        console.log("Down");
        swipe();
    }
}

let startX, startY, endX, endY;

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

if (localStorage.getItem("slidePuzzleProgressAutoSave")) {
    const localStorageSaveContent = localStorage.getItem("slidePuzzleProgressAutoSave").split(",");
    blocks = document.getElementById("blocks");
    block = blocks.querySelectorAll("div");
    popup = document.querySelector(".popup");
    btns = document.querySelector(".btns");
    retryBtn = document.getElementById("retryBtn");
    blocks.innerHTML = localStorageSaveContent[0];
    targetBlock = localStorageSaveContent[1] * 1;
    steps = localStorageSaveContent[2] * 1;
    timerStart(localStorageSaveContent[3], localStorageSaveContent[4], localStorageSaveContent[5]);
} else {
    blockShuffle();
}


retryBtn.addEventListener("click", () => {
    retry();
});

function retry() {
    isGameClear = false;
    blockShuffle();
    timerReset();
    popup.classList.add("popupHiddenAnimtion");
    setTimeout(() => {
        popup.classList.remove("popupDisplayAnimtion");
    }, 100);
}

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
        const swipeRecognitionPx = 50;
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