let blocks = document.getElementById("blocks");
let block = blocks.querySelectorAll("div");
let substantialBlock = blocks.querySelectorAll("div:not(.air)");
let air = blocks.querySelector(".air");
let popup = document.querySelectorAll(".popup");
let btns = document.querySelector(".btns");
let retryBtn = document.getElementById("retryBtn");
let okBtn = document.getElementById("okBtn");
const expandableMenuBtn = document.querySelector(".expandableMenuBtn");
const widthCtrl = popup[1].querySelector(".widthCtrl");
const heightCtrl = popup[1].querySelector(".heightCtrl");
const widthUp = widthCtrl.querySelector(".up");
const widthDown = widthCtrl.querySelector(".down");
const heightUp = heightCtrl.querySelector(".up");
const heightDown = heightCtrl.querySelector(".down");
const widthNumber = widthCtrl.querySelector(".number");
const heightNumber = heightCtrl.querySelector(".number");
let steps = 0;
let isOperated = true;

let blockCaseWidth = 4;
let blockCaseHeight = 5;

// function resize() {
//     if (window.innerWidth < window.innerHeight) {
//         blockCaseWidth = blockCaseWidthOriginal;
//         blockCaseHeight = blockCaseHeightOriginal;
//     } else {
//         blockCaseHeight = blockCaseWidthOriginal;
//         blockCaseWidth = blockCaseHeightOriginal;
//     }
// }

// resize();

widthNumber.innerText = blockCaseWidth;
heightNumber.innerText = blockCaseHeight;

function blockNumberCtrlUpdate() {
    blockCaseWidth = widthNumber.innerText * 1;
    blockCaseHeight = heightNumber.innerText * 1;
    steps = 0;
}

blockNumberCtrlUpdate();

function blocksGenerate() {
    blocks.innerHTML = "";
    let genNumber = 0;
    while (blockCaseWidth * blockCaseHeight >= genNumber) {
        genNumber += 1;
        if (blockCaseWidth * blockCaseHeight > genNumber) {
            blocks.innerHTML += `<div class="block${genNumber}"><p>${genNumber}</p></div>`
        } else if (blockCaseWidth * blockCaseHeight == genNumber) {
            blocks.innerHTML += `<div class="air"><p>&nbsp;</p></div>`
        }
        if (genNumber % blockCaseWidth == 0 && !(genNumber == blockCaseWidth * blockCaseHeight)) {
            blocks.innerHTML += `<br>`
        }
    }
    document.documentElement.style.setProperty("--blockCaseWidth", blockCaseWidth);
    document.documentElement.style.setProperty("--blockCaseHeight", blockCaseHeight);
}

blocksGenerate();

blocks = document.getElementById("blocks");
block = blocks.querySelectorAll("div");
substantialBlock = blocks.querySelectorAll("div:not(.air)");
air = blocks.querySelector(".air");

let targetBlock = blockCaseWidth * blockCaseHeight - 1;

let sec = 0;
let min = 0;
let hr = 0;

let formattedSec;
let formattedMin;
let formattedHr;

let timerInterval;
let autoSaveInterval;

function autoSaveToLocalStorage() {
    localStorage.setItem("slidePuzzleProgressAutoSave", [blocks.innerHTML, targetBlock, steps, formattedHr, formattedMin, formattedSec, blockCaseWidth, blockCaseHeight, isGameClear]);
}

function timerStart(h = 0, m = 0, s = 0) {
    hr = h * 1;
    min = m * 1;
    sec = s * 1;
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
        const topTitle = document.getElementById("topTitle");
        const timeDisplay = document.getElementById("timeDisplay");
        const stepsDisplay = document.getElementById("stepsDisplay");
        formattedSec = (sec < 10 ? '0' + sec : String(sec)).substring(0, 5);
        formattedMin = String(min).padStart(2, "0");
        formattedHr = String(hr).padStart(2, "0");
        topTitle.innerText = `${blockCaseWidth} × ${blockCaseHeight}`;
        timeDisplay.innerHTML = `${
            formattedHr
        } : ${
            formattedMin
        } : ${
            formattedSec
        } <br><span id="timeFastestDisplay"></span>`;
        stepsDisplay.innerHTML = `${steps} steps<br><span id="stepsFastestDisplay"></span>`;
    }, 10);
    autoSaveInterval = setInterval(() => {
        if (isGameClear) {
            localStorage.removeItem("slidePuzzleProgressAutoSave");
        } else {
            if (isOperated) {
                autoSaveToLocalStorage();
            }
        }
    },  Math.floor(Math.random(1) * 1000) / 10 + 100);
}

function timerStop() {
    clearInterval(timerInterval);
    clearInterval(autoSaveInterval);
}

function timerReset() {
    sec = 0;
    min = 0;
    hr = 0;
    formattedSec = 0;
    formattedMin = 0;
    formattedHr = 0;
}

function opacityMitigation(o = blocks) {
    if (!(o.classList.contains("opacityMitigationAnimation"))) {
        o.classList.add("opacityMitigationAnimation");
    }
    setTimeout(() => {
        o.classList.remove("opacityUndoAnimation");
    }, 100);
}
function opacityUndo(o = blocks) {
    if (!(o.classList.contains("opacityUndoAnimation"))) {
        o.classList.add("opacityUndoAnimation");
    }
    setTimeout(() => {
        o.classList.remove("opacityMitigationAnimation");
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
    let key1 = (`slidePuzzlePlayLog_Time${blockCaseWidth} × ${blockCaseHeight}`);
    let key2 = (`slidePuzzlePlayLog_Steps${blockCaseWidth} × ${blockCaseHeight}`);
    let key1Array;
    const key1SaveContent = `${formattedHr}, ${formattedMin}, ${formattedSec}`;
    const key2SaveContent = `${steps}`;
    if (localStorage.getItem(key1)){
    } else {
        localStorage.setItem(key1, key1SaveContent);
        const timeFastestDisplay = document.getElementById("timeFastestDisplay");
        timeFastestDisplay.innerText = "(Fastest)";
    }
    if (localStorage.getItem(key2)){
    } else {
        localStorage.setItem(key2, key2SaveContent);
        const stepsFastestDisplay = document.getElementById("stepsFastestDisplay");
        stepsFastestDisplay.innerText = "(Least)";
    }
    (() => {
        key1Array = localStorage.getItem(key1).split(",");
        // key1が存在しない or 今の記録の方が早い
        if (!(localStorage.getItem(key1)) || formattedHr + formattedMin + formattedSec < key1Array[0] * 1 + key1Array[1] * 1 + key1Array[2] * 1) {
            localStorage.setItem(key1, key1SaveContent);
            const timeFastestDisplay = document.getElementById("timeFastestDisplay");
            timeFastestDisplay.innerText = "(Fastest)";
        }
        key2Array = localStorage.getItem(key2).split(",");
        // key2が存在しない or 今の記録の方が少ない
        if (!(localStorage.getItem(key2)) || steps < key2Array[0] * 1) {
            localStorage.setItem(key2, key2SaveContent);
            const stepsFastestDisplay = document.getElementById("stepsFastestDisplay");
            stepsFastestDisplay.innerText = "(Least)";
        }
    })();
}

okBtn.addEventListener("click", () => {
    blockNumberChange();
    popupHidden(popup[0]);
    popupHidden(popup[1]);
});

let isGameClear = false;

function menuBtnToggle(n = popup[0]) {
    const deployedPopup = document.querySelectorAll(".popup.popupDisplayAnimation");
    // alert(deployedPopup.length);
    if (deployedPopup.length == 0) {
        popupDisplay(n);
        opacityMitigation();
    } else {
        popupHidden(popup[deployedPopup.length - 1]);
        if (deployedPopup.length - 1 == 0 && isOperated) {
            opacityUndo();
        }
    }
}

function popupToggle(n = popup[0]) {
    if (n.classList.contains("popupDisplayAnimation")) {
        popupHidden(n);
        if (isOperated && n == popup[0]) {
            opacityUndo();
        }
    } else {
        popupDisplay(n);
        if (n == popup[0]) {
            opacityMitigation();
        }
    }
}

function popupDisplay(n = popup[0]) {
    if (!(n.classList.contains("popupDisplayAnimation"))) {
        // isMenuDeployed = true;
        n.classList.remove("popupHiddenAnimation");
        n.classList.add("popupDisplayAnimation");
        if (n == popup[0]) {
            const menuSticks =  expandableMenuBtn.querySelectorAll("div");
            menuSticks[0].classList.remove("menuStickRotateReverse1Animation");
            menuSticks[2].classList.remove("menuStickRotateReverse2Animation");
            menuSticks[1].classList.remove("menuStickEraseReverseAnimation");
            menuSticks[0].classList.add("menuStickRotate1Animation");
            menuSticks[2].classList.add("menuStickRotate2Animation");
            menuSticks[1].classList.add("menuStickEraseAnimation");
        }
    }
}

function blockNumberChange() {
    if (!(widthNumber.innerText * 1 == blockCaseWidth) || !(heightNumber.innerText * 1 == blockCaseHeight)) {
        clearInterval(timerInterval);
        localStorage.removeItem("slidePuzzleProgressAutoSave");
        opacityMitigation(retryBtn);
        blockNumberCtrlUpdate();
        blocksGenerate();
        isOperated = false;
        blockShuffle();
        block = blocks.querySelectorAll("div");
    } else {
        opacityUndo();
    }
}

function popupHidden(n = popup[0]) {
    widthNumber.innerText = blockCaseWidth;
    heightNumber.innerText = blockCaseHeight;
    if (n.classList.contains("popupDisplayAnimation")) {
        // isMenuDeployed = false;
        n.classList.remove("popupDisplayAnimation");
        n.classList.add("popupHiddenAnimation");
        if (n == popup[0]) {
            const menuSticks =  expandableMenuBtn.querySelectorAll("div");
            menuSticks[0].classList.remove("menuStickRotate1Animation");
            menuSticks[2].classList.remove("menuStickRotate2Animation");
            menuSticks[1].classList.remove("menuStickEraseAnimation");
            menuSticks[0].classList.add("menuStickRotateReverse1Animation");
            menuSticks[2].classList.add("menuStickRotateReverse2Animation");
            menuSticks[1].classList.add("menuStickEraseReverseAnimation");
        }
    }
}

function gameClearJudge() {
    let judgeIndex = 0;
    let secberCleared = 0;
    while (judgeIndex < blockCaseWidth * blockCaseHeight) {        
        if (block[judgeIndex].classList.contains(`block${judgeIndex + 1}`)) {
            secberCleared += 1;
        }
        judgeIndex += 1;
    }
    if (secberCleared == judgeIndex - 1) {
        setTimeout(() => {
            isGameClear = true;
            timerStop();
            saveToLocalStorage();
            popupDisplay();
            opacityMitigation();
            autoSaveToLocalStorage();
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
            if ((popup[0].classList.contains("popupDisplayAnimation"))) {
                opacityUndo();
            }
            popupHidden();
            popupHidden(popup[1]);
            if (!(isGameClear)) {
                gameClearJudge();
            }
            if (steps == 1) {
                timerStart();
            }
        }
    console.log(`
        Step : ${steps}
        Target : ${targetBlock}
        ${formattedHr} : ${formattedMin} : ${formattedSec}
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
    if (!((targetBlock % blockCaseWidth) == 0)) {
        targetBlock -= 1;
        block = blocks.querySelectorAll("div");
        swipeAnimetion(block[targetBlock], "leftSwipeAnimetion");
        console.log("Left");
        swipe();
    }
}

function rightSwipe() {
    if (!((targetBlock + 1) % blockCaseWidth == 0)) {
        targetBlock += 1;
        block = blocks.querySelectorAll("div");
        swipeAnimetion(block[targetBlock], "rightSwipeAnimetion");
        console.log("Right");
        swipe();
    }
}

function upSwipe() {
    if (!(targetBlock <= blockCaseWidth - 1)) {
        targetBlock -= blockCaseWidth;
        block = blocks.querySelectorAll("div");
        swipeAnimetion(block[targetBlock], "upSwipeAnimetion");
        console.log("Up");
        swipe();
    }
}

function downSwipe() {
    if (!(targetBlock >= blockCaseWidth * blockCaseHeight - blockCaseWidth)) {
        targetBlock += blockCaseWidth;
        block = blocks.querySelectorAll("div");
        swipeAnimetion(block[targetBlock], "downSwipeAnimetion");
        console.log("Down");
        swipe();
    }
}

let startX, startY, endX, endY, shuffleRoop;

function blockShuffle() {
    targetBlock = blockCaseWidth * blockCaseHeight - 1;
    clearInterval(shuffleRoop);
    isOperated = false;
    blocksGenerate();
    opacityMitigation();
    opacityMitigation(retryBtn);
    // block = blocks.querySelectorAll("div");
    setTimeout(() => {
        topTitle.innerText = `${blockCaseWidth} × ${blockCaseHeight}`;
        timeDisplay.innerHTML = "(Auto Shuffle)";
        stepsDisplay.innerHTML = "";
    }, 0);
    document.documentElement.style.setProperty("--swipeAnimetionDuration", "0s");
    setTimeout(() => {
        shuffleRoop = setInterval(() => {
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
                if (!(popup[0].classList.contains("popupDisplayAnimation"))) {
                    opacityUndo();
                }
                timeDisplay.innerHTML = "Move the blocks.";
                stepsDisplay.innerHTML = "";
                opacityUndo(retryBtn);
            }
        }, 2);
    }, 500);
};

topTitle.addEventListener("click", () => {
    popupToggle(popup[1]);
});

function numberMatchCheck_Plus(n) {
    if (n < 20) {
        return true;
    } else {
        return false;
    }
}

function numberMatchCheck_Minus(n) {
    if (n > 2) {
        return true;
    } else {
        return false;
    }
}

widthUp.addEventListener("click", () => {
    if (numberMatchCheck_Plus(widthNumber.innerText * 1)) {
        widthNumber.innerText = widthNumber.innerText * 1 + 1;
    }
});

widthDown.addEventListener("click", () => {
    if (numberMatchCheck_Minus(widthNumber.innerText * 1)) {
        widthNumber.innerText = widthNumber.innerText * 1 - 1;
    }
});

heightUp.addEventListener("click", () => {
    if (numberMatchCheck_Plus(heightNumber.innerText * 1)) {
        heightNumber.innerText = heightNumber.innerText * 1 + 1;
    }
});

heightDown.addEventListener("click", () => {
    if (numberMatchCheck_Minus(heightNumber.innerText * 1)) {
        heightNumber.innerText = heightNumber.innerText * 1 - 1;
    }
});

function recoverFromLocalStorage() {
    let localStorageSaveContent;
    if (localStorage.getItem("slidePuzzleProgressAutoSave")) {
        localStorageSaveContent = localStorage.getItem("slidePuzzleProgressAutoSave").split(",");
        if (!(localStorageSaveContent[6] * 1 == blockCaseWidth && localStorageSaveContent[7] * 1 == blockCaseHeight)) {
            blockCaseWidth = localStorageSaveContent[6] * 1;
            blockCaseHeight = localStorageSaveContent[7] * 1;
            document.documentElement.style.setProperty("--blockCaseWidth", blockCaseWidth);
            document.documentElement.style.setProperty("--blockCaseHeight", blockCaseHeight);
        }
        if ((localStorageSaveContent[8]) == "false") {   
            blocks = document.getElementById("blocks");
            block = blocks.querySelectorAll("div");
            popup = document.querySelectorAll(".popup");
            btns = document.querySelector(".btns");
            retryBtn = document.getElementById("retryBtn");
            blocks.innerHTML = localStorageSaveContent[0];
            targetBlock = localStorageSaveContent[1] * 1;
            steps = localStorageSaveContent[2] * 1;
            timerStart(localStorageSaveContent[3], localStorageSaveContent[4], localStorageSaveContent[5]);
        } else {
            blockShuffle();
        }
    } else {
        blockShuffle();
    }
}

recoverFromLocalStorage();

expandableMenuBtn.addEventListener("click", () => {
    menuBtnToggle();
});

retryBtn.addEventListener("click", () => {
    if (isOperated) {
        retry();
        opacityMitigation(retryBtn);
    }
});

function retry() {
    isGameClear = false;
    blockShuffle();
    topTitle.innerText = `${blockCaseWidth} × ${blockCaseHeight}`;
    blocksGenerate();
    timerReset();
    timerStop();
    popupHidden();
    isOperated = false;
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
            if (difiX > swipeRecognitionPx) {
                leftSwipe();
            }
            if (difiX < -swipeRecognitionPx) {
                rightSwipe();
            }
        } else if (Math.abs(difiX) < Math.abs(difiY)) {
            if (difiY > swipeRecognitionPx) {
                upSwipe();
            }
            if (difiY < -swipeRecognitionPx) {
                downSwipe();
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