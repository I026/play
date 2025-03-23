window.onerror = function (message, source, lineno, colno, error) {
    alert(`エラーが発生 : ${message}
        開発者にスクリーンショットを送ってくれると開発者が喜びます｡
        `)
};


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
        const menuTitle = document.querySelector(".menuTitle");
         const topTitle = document.getElementById("topTitle");
      const timeDisplay = document.getElementById("timeDisplay");
 const  timeInfoDisplay = document.getElementById("timeInfoDisplay");
     const stepsDisplay = document.getElementById("stepsDisplay");
 const stepsInfoDisplay = document.getElementById("stepsInfoDisplay");
     const sampleblocks = document.querySelector(".sampleBlocks");

     let steps = 0;
let isOperated = true;

 let blockCaseWidth = 4;
let blockCaseHeight = 5;

function selectionPrevention(o) {
    let tentative;
      tentative = o.innerHTML;
    o.innerHTML = "";
    o.innerHTML = tentative;
}

document.addEventListener("selectionchange", () => {
    // selectionPrevention(blocks);
    // selectionPrevention(menuTitle);
});

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
        formattedSec = (sec < 10 ? '0' + sec : String(sec)).substring(0, 5);
        formattedMin = String(min).padStart(2, "0");
        formattedHr = String(hr).padStart(2, "0");
        setTimeout(() => {
            topTitle.innerText = `${blockCaseWidth} × ${blockCaseHeight}`;
            timeDisplay.innerHTML = `${
                formattedHr
            } : ${
                formattedMin
            } : ${
                formattedSec
            } <br><span id="timeFastestDisplay"></span>`;
            stepsDisplay.innerHTML = `${steps} Step<br><span id="stepsFastestDisplay"></span>`;
        }, 200);
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

function opacityMitigation(o = blocks, t = .5) {
    if (!(o.classList.contains("opacityMitigationAnimation"))) {
        o.classList.remove("opacityUndoAnimation");
        o.classList.remove("opacityMitigationAnimation");
        o.style.setProperty("animation-duration", `${t}s`);
        o.classList.add("opacityMitigationAnimation");
    }
    setTimeout(() => {
        o.classList.remove("opacityUndoAnimation");
    }, t * 1000);
}
function opacityUndo(o = blocks, t = .5) {
    if (!(o.classList.contains("opacityUndoAnimation"))) {
        o.classList.remove("opacityMitigationAnimation");
        o.classList.remove("opacityUndoAnimation");
        o.style.setProperty("animation-duration", `${t}s`);
        o.classList.add("opacityUndoAnimation");
    }
    setTimeout(() => {
        o.classList.remove("opacityMitigationAnimation");
    }, t * 1000);
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

let localStorageKey1 = (`slidePuzzlePlayLog_Time${blockCaseWidth} × ${blockCaseHeight}`)
let localStorageKey2 = (`slidePuzzlePlayLog_Steps${blockCaseWidth} × ${blockCaseHeight}`)

function saveToLocalStorage() {
    localStorageKey1 = (`slidePuzzlePlayLog_Time${blockCaseWidth} × ${blockCaseHeight}`)
    localStorageKey2 = (`slidePuzzlePlayLog_Steps${blockCaseWidth} × ${blockCaseHeight}`)
    function save(key, threshold, saveContent, display, text) {
        if (localStorage.getItem(key)) {
            const keyArray = localStorage.getItem(key).split(",");
            const combinedKey = keyArray.join("").replaceAll(" ","") * 1;
            const combinedThreshold = threshold.join("") * 1;
            // alert(`${combinedKey} <= ${combinedThreshold}`);
            if (combinedKey * 1 <= combinedThreshold * 1) {
                // alert("最速ではない");
                display.innerHTML = "";
            } else {
                // alert("最速");
                display.innerHTML = text;
                localStorage.setItem(key, saveContent);
            }
        } else {
            // alert("最速");
            display.innerHTML = text;
            localStorage.setItem(key, saveContent);
        }
    }
    const localStorageKey1SaveContent = `${formattedHr}, ${formattedMin}, ${formattedSec}`;
    const localStorageKey2SaveContent = steps;
    save(localStorageKey1, [formattedHr, formattedMin, formattedSec], localStorageKey1SaveContent, timeInfoDisplay, "(Fastest)");
    save(localStorageKey2, [steps], localStorageKey2SaveContent, stepsInfoDisplay, "(Least)");
}

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

function blockNumberChange() {
    recordDisplay();
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
    popupHidden(popup[1]);
    localStorageKey1 = (`slidePuzzlePlayLog_Time${blockCaseWidth} × ${blockCaseHeight}`)
    localStorageKey2 = (`slidePuzzlePlayLog_Steps${blockCaseWidth} × ${blockCaseHeight}`)
    if (localStorage.getItem(localStorageKey1) && localStorage.getItem(localStorageKey2)) {
        timeDisplay.innerHTML = `FastestTime :<br>${localStorage.getItem(localStorageKey1).replaceAll(",", " : ")}`;
        stepsDisplay.innerHTML = `LeastStep :<br>${localStorage.getItem(localStorageKey2)} Step`;
    }
}

okBtn.addEventListener("click", () => {
    blockNumberChange();
});

function popupDisplay(n = popup[0]) {
    sampleblocksGenerate();
    opacityUndo(widthDown);
    opacityUndo(widthUp);
    opacityUndo(heightDown);
    opacityUndo(heightUp);
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
            sampleblocksGenerate();
        }
        widthNumber.classList.add("changeAcceptanceAnimation");
        heightNumber.classList.add("changeAcceptanceAnimation");
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

blocks.addEventListener("click", () => {
    // popupHidden();
    // popupHidden(popup[1]);
    // opacityUndo();
    if (popup[0].classList.contains("popupDisplayAnimation")) {
        menuBtnToggle();
    }
});

function gameClearJudge() {
    let judgeIndex = 0;
    let secberCleared = 0;
    // 検証する番目がブロックの総数になるまで繰り返す
    while (judgeIndex < blockCaseWidth * blockCaseHeight) {
        // 検証する番目のブロックに検証する番目のclassがある
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
            // タイマー処理成功検証
            while (!(timerInterval) && !(autoSaveInterval)) {
                timerStop();
            }
        }, 100);
    }
}

function swipe() {
    swipeMovedBlock += 1;
    if (swipeMovedBlock == 1 || swipeMovedBlock == 2) {
        swipeRecognitionMagnification = blockCaseWidth * blockCaseHeight * .1;
    } else {
        swipeRecognitionMagnification = blockCaseWidth * blockCaseHeight * .05 * swipeMovedBlock;
    }
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

let shuffleRoop;

function recordDisplay() {
    topTitle.innerText = `${blockCaseWidth} × ${blockCaseHeight}`;
    if (localStorage.getItem(localStorageKey1) && localStorage.getItem(localStorageKey2)) {
        timeDisplay.innerHTML = `FastestTime :<br>${localStorage.getItem(localStorageKey1).replaceAll(",", " : ")}`;
        stepsDisplay.innerHTML = `LeastStep :<br>${localStorage.getItem(localStorageKey2)} Step`;
    } else {
        timeDisplay.innerText = `( No record of ${blockCaseWidth} × ${blockCaseHeight})`;
        stepsDisplay.innerText = "";
        timeInfoDisplay.innerText = "";
        stepsInfoDisplay.innerText = "";
    }
}

function blockShuffle() {
    targetBlock = blockCaseWidth * blockCaseHeight - 1;
    clearInterval(shuffleRoop);
    isOperated = false;
    blocksGenerate();
    opacityMitigation();
    opacityMitigation(retryBtn);
    // block = blocks.querySelectorAll("div");
    setTimeout(() => {
        recordDisplay();
    }, 200);
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
                opacityUndo(retryBtn);
            }
        }, 1);
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
    if (n > 3) {
        return true;
    } else {
        return false;
    }
}

function sampleblocksGenerate(w = widthNumber.innerText * 1, h = heightNumber.innerText * 1) {
    document.documentElement.style.setProperty("--sampleBlockCaseWidth", w);
    document.documentElement.style.setProperty("--sampleBlockCaseHeight", h);
    sampleblocks.innerHTML = "";
    let genNumber = 0;
    while (w * h >= genNumber) {
        genNumber += 1;
        if (w * h > genNumber) {
            sampleblocks.innerHTML += `<div class="sampleBlockDisplayAnimation"></div>`
        } else if (w * h == genNumber) {
            sampleblocks.innerHTML += `<div style="opacity: 0;"></div>`
        }
        if (genNumber % w == 0 && !(genNumber == w * h)) {
            sampleblocks.innerHTML += `<br>`
        }
    }
}

function widthUpCtrl() {
    if (numberMatchCheck_Plus(widthNumber.innerText * 1)) {
        widthNumber.innerText = widthNumber.innerText * 1 + 1;
        sampleblocksGenerate();
        opacityUndo(widthDown);
        if (!(numberMatchCheck_Plus(widthNumber.innerText * 1))) {
            opacityMitigation(widthUp, .25);
        }
    }
}

function widthDownCtrl() {
    if (numberMatchCheck_Minus(widthNumber.innerText * 1 + 1)) {
        widthNumber.innerText = widthNumber.innerText * 1 - 1;
        sampleblocksGenerate();
        opacityUndo(widthUp);
        if (!(numberMatchCheck_Minus(widthNumber.innerText * 1 + 1))) {
            opacityMitigation(widthDown, .25);
        }
    }
}

function heightUpCtrl() {
    if (numberMatchCheck_Plus(heightNumber.innerText * 1)) {
        heightNumber.innerText = heightNumber.innerText * 1 + 1;
        sampleblocksGenerate();
        opacityUndo(heightDown);
        if (!(numberMatchCheck_Plus(heightNumber.innerText * 1))) {
            opacityMitigation(heightUp, .25);
        }
    }
}

function heightDownCtrl() {
    if (numberMatchCheck_Minus(heightNumber.innerText * 1)) {
        heightNumber.innerText = heightNumber.innerText * 1 - 1;
        sampleblocksGenerate();
        opacityUndo(heightUp);
        if (!(numberMatchCheck_Minus(heightNumber.innerText * 1))) {
            opacityMitigation(heightDown, .25);
        }
    }
}

widthUp.addEventListener("click", () => {
    widthUpCtrl();
});

widthDown.addEventListener("click", () => {
    widthDownCtrl();
});

heightUp.addEventListener("click", () => {
    heightUpCtrl();
});

heightDown.addEventListener("click", () => {
    heightDownCtrl();
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

function retry() {
    isGameClear = false;
    blockShuffle();
    setTimeout(() => {
        topTitle.innerText = `${blockCaseWidth} × ${blockCaseHeight}`;
        timerReset();
    }, 200);
    blocksGenerate();
    timerStop();
    popupHidden();
    opacityMitigation(retryBtn);
    isOperated = false;
}

retryBtn.addEventListener("click", () => {
    if (isOperated) {
        retry();
    }
});

let startX, startY, endX, endY, nowX, nowY;

const swipeRecognitionMagnificationDefault = .5;
let swipeRecognitionMagnification = swipeRecognitionMagnificationDefault;

function swipeStartReset(e) {
    swipeMovedBlock = 0;
    startX = e.clientX ?? e.touches[0].clientX;
    startY = e.clientY ?? e.touches[0].clientY;
}

let swipeMovedBlock = 0;

function swipeGetNowCoordinate(e) {
    function swipeDirectionJudge() {
        let difiX = nowX - startX;
        let difiY = nowY - startY;
        if (isOperated) {
            const swipeRecognitionPx = block[0].offsetWidth * swipeRecognitionMagnification;
            // if (Math.abs(difiX) > swipeRecognitionPx && Math.abs(difiX) > Math.abs(difiY)) {
            //     if (difiX > swipeRecognitionPx) {
            //         leftSwipe();
            //         console.log("left");
            //     }
            //     if (difiX < -swipeRecognitionPx) {
            //         rightSwipe();
            //         console.log("right");
            //     }
            // }
            if (Math.abs(difiX) > swipeRecognitionPx) {
                if (difiX > swipeRecognitionPx) {
                    leftSwipe();
                }
                if (difiX < -swipeRecognitionPx) {
                    rightSwipe();
                }
            } else if (Math.abs(difiY) > swipeRecognitionPx) {
                if (difiY > swipeRecognitionPx) {
                    upSwipe();
                }
                if (difiY < -swipeRecognitionPx) {
                    downSwipe();
                }
            }
            // swipeStartReset(e);
            console.log(swipeMovedBlock);
            
        }
    }
    nowX = e.clientX ?? e.touches[0].clientX;
    nowY = e.clientY ?? e.touches[0].clientY;
    swipeDirectionJudge();
}

function swipeRemoveEventListener() {
    swipeRecognitionMagnification = .5;
    document.removeEventListener("mousemove",swipeGetNowCoordinate);
    document.removeEventListener("touchmove",swipeGetNowCoordinate);
}

function swipeDetection(e) {
    swipeStartReset(e);
    document.addEventListener("mousemove",swipeGetNowCoordinate);
    document.addEventListener("touchmove",swipeGetNowCoordinate);

    document.addEventListener("mouseup",() => { 
        swipeRemoveEventListener();
    });

    document.addEventListener("touchend",() => { 
        swipeRemoveEventListener();
    });
}

// function swipeEnd(e) {
//     endX = e.clientX ?? e.changedTouches[0].clientX;
//     endY = e.clientY ?? e.changedTouches[0].clientY;

//     let difiX = endX - startX;
//     let difiY = endY - startY;
//     if (isOperated) {
//         const swipeRecognitionPx = 50;
//         if (Math.abs(difiX) > Math.abs(difiY)) {
//             if (difiX > swipeRecognitionPx) {
//                 leftSwipe();
//             }
//             if (difiX < -swipeRecognitionPx) {
//                 rightSwipe();
//             }
//         } else if (Math.abs(difiX) < Math.abs(difiY)) {
//             if (difiY > swipeRecognitionPx) {
//                 upSwipe();
//             }
//             if (difiY < -swipeRecognitionPx) {
//                 downSwipe();
//             }
//         }
//     }
// }

document.addEventListener("mousedown", swipeDetection);
// document.addEventListener("mouseup", swipeEnd);
document.addEventListener("touchstart", swipeDetection);
// document.addEventListener("touchend", swipeEnd);

document.addEventListener("keydown",(event) => {
    if (event.code === "KeyA" || event.code === "ArrowLeft") {
        rightSwipe();
    }
    if (event.code === "KeyE" || event.code === "ArrowRight") {
        if (popup[1].classList.contains("popupDisplayAnimation")) {
            heightUpCtrl();
        }
    }
    if (event.code === "KeyD") {
        if (popup[1].classList.contains("popupDisplayAnimation")) {
            heightDownCtrl();
        } else {   
            leftSwipe();
        }
    }
    if (event.code === "ArrowRight") {
        leftSwipe();
    }
    if (event.code === "KeyW") {
        if (popup[1].classList.contains("popupDisplayAnimation")) {
            widthUpCtrl();
        } else {   
            downSwipe();
        }
    }
    if (event.code === "ArrowUp") {
        downSwipe();
    }
    if (event.code === "KeyS") {
        if (popup[1].classList.contains("popupDisplayAnimation")) {
            widthDownCtrl();
        } else {   
            upSwipe();
        }
    }
    if (event.code === "ArrowDown") {
        upSwipe();
    }
    if (event.code === "KeyF") {
        menuBtnToggle();
    }
    if (event.code === "KeyC") {
        if (popup[0].classList.contains("popupDisplayAnimation")) {
            popupToggle(popup[1]);
        } else {
            opacityMitigation();
            popupDisplay(popup[0]);
            popupDisplay(popup[1]);
        }
    }
    if (event.code === "Escape") {
        if (popup[0].classList.contains("popupDisplayAnimation")) {
            menuBtnToggle();
        }
    }
    if (event.code === "KeyR") {
        if (popup[0].classList.contains("popupDisplayAnimation") && !(popup[1].classList.contains("popupDisplayAnimation"))) {
            retry();
        }
    }
    if (event.code === "Enter" || event.code === "Space") {
        if (popup[1].classList.contains("popupDisplayAnimation")) {
            blockNumberChange();
        }
    }
});