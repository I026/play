let blocks                = document.getElementById("blocks");
let block                 = blocks.querySelectorAll("div");
let substantialBlock      = blocks.querySelectorAll("div:not(.air)");
let air                   = blocks.querySelector(".air");
let popup                 = document.querySelectorAll(".popup");
let btns                  = document.querySelector(".btns");
let retryBtn              = document.getElementById("retryBtn");
let okBtn                 = document.getElementById("okBtn");
const expandableMenuBtn   = document.querySelector(".expandableMenuBtn");
const widthCtrl           = popup[1].querySelector(".widthCtrl");
const heightCtrl          = popup[1].querySelector(".heightCtrl");
const widthUp             = widthCtrl.querySelector(".up");
const widthDown           = widthCtrl.querySelector(".down");
const heightUp            = heightCtrl.querySelector(".up");
const heightDown          = heightCtrl.querySelector(".down");
const widthNumber         = widthCtrl.querySelector(".number");
const heightNumber        = heightCtrl.querySelector(".number");
const menuTitle           = document.querySelector(".menuTitle");
const topTitles           = document.getElementById("topTitles");
const topTitle            = document.getElementById("topTitle");
const timeDisplay         = document.getElementById("timeDisplay");
const  timeInfoDisplay    = document.getElementById("timeInfoDisplay");
const stepsDisplay        = document.getElementById("stepsDisplay");
const stepsInfoDisplay    = document.getElementById("stepsInfoDisplay");
const sampleblocks        = document.querySelector(".sampleBlocks");
const notification        = document.querySelector(".notification");
const notificationText    = document.getElementById("notificationText");

let sec = 0;
let min = 0;
let hr  = 0;

let formattedSec;
let formattedMin;
let formattedHr;
let formattedTimes;

let steps      = 0;
let isOperated = true;

let blockCaseWidth  = 4;
let blockCaseHeight = 5;

const blockCaseWidthMax  = 20;
const blockCaseWidthMin  = 2;
const blockCaseHeightMax = 20;
const blockCaseHeightMin = 3;

window.onerror = function(message, source, lineno, colno, error) {
    alert(`エラーが発生しました : ${message} source : ${source} lineno : ${lineno} colno : ${colno}`, 0);
    return true;
  };
  
const recoverFromLocalStorageMessage = `最新のデータから復元しました`;
const shuffleStartMassage            = `シャッフルを開始します`;
const shuffleCompletionMassage       = `動かすとタイマーを開始します`;
const timerStartMassage              = `タイマーを開始しました<br>左上から順番に揃えてください`;
const gameClearMassage               = `タイマーを終了しました`;
const unrecordedMassage              = 'クリアを記録するには､リトライしてください';
const noRecordMassage                = `まだ記録がありません`;
const recordFastestMassage           = `での最速`;
const recordLeastMassage             = `での最少`;
const blockLimitPlusMassage          = `これ以上増やせません`;
const blockLimitMinusMassage         = `これ以上減らせません`;

function selectionPrevention(o) {
    let tentative;
      tentative = o.innerHTML;
    o.innerHTML = "";
    o.innerHTML = tentative;
}

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

function notificationDisplay(text = "", duration) {
    if (!(notification.classList.contains("notificationDisplayAnimetion"))) {
        notificationText.innerHTML = text;
        if (text == notificationText.innerHTML) {
            notification.classList.remove("notificationHiddenAnimetion");
            notification.classList.add("notificationDisplayAnimetion");
        }
        // durationが存在する
        if (typeof duration !== "undefined") {
            const formattedDuration = Math.max(duration, 300)
            // durationが0ではない
            if (duration !== 0) {
                setTimeout(() => {
                    notificationHidden();
                }, formattedDuration);
            }
        } else {
            setTimeout(() => {
                if (text == notificationText.innerHTML) {
                    notificationHidden();
                }
            }, 3000);
        }
    } else {
        notificationHidden();
        setTimeout(() => {
            notificationDisplay(text, duration);
        }, 250);
    }
}

function notificationHidden() {
    if ((notification.classList.contains("notificationDisplayAnimetion"))) {
        notification.classList.remove("notificationDisplayAnimetion");
        notification.classList.add("notificationHiddenAnimetion");
    }
}

function blockNumberCtrlUpdate() {
    blockCaseWidth  = widthNumber.innerText * 1;
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

blocks           = document.getElementById("blocks");
block            = blocks.querySelectorAll("div");
substantialBlock = blocks.querySelectorAll("div:not(.air)");
air              = blocks.querySelector(".air");

let targetBlock  = blockCaseWidth * blockCaseHeight - 1;

let timerInterval;
let autoSaveInterval;

function autoSaveToLocalStorage() {
    // console.log("autoSaveToLocalStorage");
    localStorage.setItem("slidePuzzleProgressAutoSave", [blocks.innerHTML, targetBlock, steps, formattedHr, formattedMin, formattedSec, blockCaseWidth, blockCaseHeight, isGameClear]);
}

function timerStart(h = 0, m = 0, s = 0) {
    hr  = h * 1;
    min = m * 1;
    sec = s * 1;
    timerInterval = setInterval(() => {
        sec += .01;
        if (sec >= 60) {
            min += 1;
            sec  = 0;
        }
        if (min >= 60) {
            hr += 1;
            min = 0;
        }
        formattedSec = (sec < 10 ? '0' + sec : String(sec)).substring(0, 5);
        formattedMin = String(min).padStart(2, "0");
        formattedHr = String(hr).padStart(2, "0");
        formattedTimes = `${formattedHr} : ${formattedMin} : ${formattedSec}`;
        setTimeout(() => {
            topTitle.innerText = `${blockCaseWidth} × ${blockCaseHeight}`;
            timeDisplay.innerHTML = `<img class="timerIcon" src="../medias/timer.svg"> ${formattedTimes}`;
            stepsDisplay.innerHTML = `<img class="handIcon" src="../medias/hand.svg"> ${steps}`;
        }, 200);
    }, 10);
    if (h == 0 && m == 0 && s == 0) {
        notificationDisplay(timerStartMassage);
    }
    autoSaveInterval = setInterval(() => {
        // if (isGameClear) {
        //     localStorage.removeItem("slidePuzzleProgressAutoSave");
        // }
        if (isOperated) {
            autoSaveToLocalStorage();
        }
    },  Math.floor(Math.random(1) * 1000) / 10 + 100);
}

function timerStop() {
    clearInterval(timerInterval);
    clearInterval(autoSaveInterval);
}

function timerReset() {
    sec          = 0;
    min          = 0;
    hr           = 0;
    formattedSec = 0;
    formattedMin = 0;
    formattedHr  = 0;
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
    const now     = new Date();
    const year    = now.getFullYear();
    const month   = now.getMonth() + 1;
    const day     = now.getDate();
    const hours   = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    console.log(`${year} ${month} ${day} ${hours}:${minutes}:${seconds}`);
    return(`${year}, ${month}, ${day}, ${hours}, ${minutes}, ${seconds}`);
}

let localStorageKey1 = (`slidePuzzlePlayLog_Time${blockCaseWidth} × ${blockCaseHeight}`)
let localStorageKey2 = (`slidePuzzlePlayLog_Steps${blockCaseWidth} × ${blockCaseHeight}`)

function saveToLocalStorage() {
    console.log("saveToLocalStorage");
    localStorageKey1 = (`slidePuzzlePlayLog_Time${blockCaseWidth} × ${blockCaseHeight}`)
    localStorageKey2 = (`slidePuzzlePlayLog_Steps${blockCaseWidth} × ${blockCaseHeight}`)
    function newRecordJudgeAndSave(key, threshold, saveContent, display, text) {
        console.log("newRecordJudgeAndSave");
        // もしlocalStorageにKeyがある
        if (localStorage.getItem(key)) {
            const keyArray          = localStorage.getItem(key).split(",");
            const combinedKey       = keyArray.join("").replaceAll(" ","") * 1;
            const combinedThreshold = threshold.join("") * 1;
            // もし現在の比較対象よりlocalStorageのデータの方が良い記録なら
            if (combinedKey * 1 <= combinedThreshold * 1) {
                // displayを消去
                display.innerHTML = "";
            // もしlocalStorageより現在の比較対象のデータの方が良い記録なら
            } else {
                // 新記録テキストを表示､新記録を保存
                display.innerHTML = "";
                display.innerHTML = text;
                localStorage.setItem(key, saveContent);
            }
        // もしlocalStorageにKeyがない
        } else {
            // 新記録テキストを表示､新記録を保存
            display.innerHTML = "";
            display.innerHTML = text;
            localStorage.setItem(key, saveContent);
        }
    }
    const localStorageKey1SaveContent = `${formattedHr}, ${formattedMin}, ${formattedSec}`;
    const localStorageKey2SaveContent = steps;
    newRecordJudgeAndSave(localStorageKey1, [formattedHr, formattedMin, formattedSec], localStorageKey1SaveContent, timeInfoDisplay, `<span style="font-size: .7em;">${blockCaseWidth} × ${blockCaseHeight}${recordFastestMassage}</span>`);
    newRecordJudgeAndSave(localStorageKey2, [steps], localStorageKey2SaveContent, stepsInfoDisplay, `<span style="font-size: .7em;">${blockCaseWidth} × ${blockCaseHeight}${recordLeastMassage}</span>`);
}

let isGameClear = false;

function menuBtnToggle(n = popup[0]) {
    const deployedPopup = document.querySelectorAll(".popup.popupDisplayAnimation");
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
    console.log("recordDisplay");
    if (!(widthNumber.innerText * 1 == blockCaseWidth) || !(heightNumber.innerText * 1 == blockCaseHeight)) {
        clearInterval(timerInterval);
        localStorage.removeItem("slidePuzzleProgressAutoSave");
        opacityMitigation(retryBtn);
        blockNumberCtrlUpdate();
        blocksGenerate();
        // isOperated = false;
        // blockShuffle();
        retry();
        block = blocks.querySelectorAll("div");
    } else {
        opacityUndo();
    }
    popupHidden(popup[1]);
    localStorageKey1 = (`slidePuzzlePlayLog_Time${blockCaseWidth} × ${blockCaseHeight}`)
    localStorageKey2 = (`slidePuzzlePlayLog_Steps${blockCaseWidth} × ${blockCaseHeight}`)
    recordDisplay();
}

okBtn.addEventListener("click", () => {
    blockNumberChange();
});

function popupDisplay(n = popup[0]) {
    sampleblocksGenerate();
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
        // widthNumber.classList.add("changeAcceptanceAnimation");
        // heightNumber.classList.add("changeAcceptanceAnimation");
    }
}


function popupHidden(n = popup[0]) {
    setTimeout(() => {
        widthNumber.innerText = blockCaseWidth;
        heightNumber.innerText = blockCaseHeight;
        disableArrow();
    }, 400);
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
        timeInfoDisplay.innerText = "";
        stepsInfoDisplay.innerText = "";
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

function gameClear() {
    setTimeout(() => {
        clearSteps = steps;
        // notificationDisplay(gameClearMassage);
        timerStop();
        saveToLocalStorage();
        popupDisplay();
        opacityMitigation();
        // タイマー処理成功検証
        isGameClear = true;
        autoSaveToLocalStorage();
        while (!(timerInterval) && !(autoSaveInterval)) {
            timerStop();
        }
    }, 100);
}

function gameClearJudge() {
    if (!(isGameClear)) {
        let judgeIndex = 0;
        let secberCleared = 0;
        // 検証する番目がブロックの総数になるまで繰り返す
        while (judgeIndex < blockCaseWidth * blockCaseHeight) {
            // 検証する番目のブロックに検証する番目のclassがある (位置が合致している数)
            if (block[judgeIndex].classList.contains(`block${judgeIndex + 1}`)) {
                secberCleared += 1;
            }
            judgeIndex += 1;
        }
        return judgeIndex - 1 - secberCleared;
        // 位置が合致している数がすべてのブロックの数と同数(クリア)
        if (secberCleared == judgeIndex - 1) {
            // console.log("gameClearJudge : true");
            // return true;
        // そうではない
        } else {
            // console.log("gameClearJudge : false");
            // return false;
        }
    } else {
        return 0;
        // console.log("gameClearJudge : true (isGameClear : true)");
        // return true;
    }
}

let clearSteps;
function swipe() {
    swipeRecognitionPxDefaultRecognitionPxUpdate();
    const temp = document.createElement("div");
    air = blocks.querySelector(".air");
    air.replaceWith(temp);
    block = blocks.querySelectorAll("div");
    block[targetBlock].replaceWith(air);
    temp.replaceWith(block[targetBlock]);
    block = blocks.querySelectorAll("div");
    steps += 1;
    // console.log(clearSteps);
    
    if (isOperated) {
        if ((popup[0].classList.contains("popupDisplayAnimation"))) {
            opacityUndo();
        }
        popupHidden();
        popupHidden(popup[1]);
        if (!(isGameClear)) {
            if (gameClearJudge() == 0 && isOperated) {
                gameClear();
            }
        }
        if (steps == 1) {
            timerStart();
        }
    }
    if (clearSteps + 1 == steps && isGameClear) {
        notificationDisplay(unrecordedMassage, 0);
    }
    // console.log(`
    //     Step : ${steps}
    //     Target : ${targetBlock}
    //     ${formattedHr} : ${formattedMin} : ${formattedSec}
    //     `);
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

function leftSwipeableJudge() {
    if (!((targetBlock % blockCaseWidth) == 0)) {
        return true;
    } else {
        return false;
    }
}

function rightSwipeableJudge() {
    if (!((targetBlock + 1) % blockCaseWidth == 0)) {
        return true;
    } else {
        return false;
    }
}

function upSwipeableJudge() {
    if (!(targetBlock <= blockCaseWidth - 1)) {
        return true;
    } else {
        return false;
    }
}

function downSwipeableJudge() {
    if (!(targetBlock >= blockCaseWidth * blockCaseHeight - blockCaseWidth)) {
        return true;
    } else {
        return false;
    }
}

function leftSwipe() {
    if (leftSwipeableJudge()) {
        targetBlock -= 1;
        block = blocks.querySelectorAll("div");
        swipeAnimetion(block[targetBlock], "leftSwipeAnimetion");
        // console.log("Left");
        swipe();
    }
}

function rightSwipe() {
    if (rightSwipeableJudge()) {
        targetBlock += 1;
        block = blocks.querySelectorAll("div");
        swipeAnimetion(block[targetBlock], "rightSwipeAnimetion");
        // console.log("Right");
        swipe();
    }
}

function upSwipe() {
    if (upSwipeableJudge()) {
        targetBlock -= blockCaseWidth;
        block = blocks.querySelectorAll("div");
        swipeAnimetion(block[targetBlock], "upSwipeAnimetion");
        // console.log("Up");
        swipe();
    }
}

function downSwipe() {
    if (downSwipeableJudge()) {
        targetBlock += blockCaseWidth;
        block = blocks.querySelectorAll("div");
        swipeAnimetion(block[targetBlock], "downSwipeAnimetion");
        // console.log("Down");
        swipe();
    }
}

let shuffleRoop;

function recordDisplay() {
    topTitle.innerText = `${blockCaseWidth} × ${blockCaseHeight}`;
    localStorageKey1   = (`slidePuzzlePlayLog_Time${blockCaseWidth} × ${blockCaseHeight}`)
    localStorageKey2   = (`slidePuzzlePlayLog_Steps${blockCaseWidth} × ${blockCaseHeight}`)
    if (localStorage.getItem(localStorageKey1) && localStorage.getItem(localStorageKey2)) {
         timeDisplay.innerHTML = `<img class="timerIcon" src="../medias/timer.svg"> <span style="font-size: .7em;">${blockCaseWidth} × ${blockCaseHeight}${recordFastestMassage}</span> :<br>${localStorage.getItem(localStorageKey1).replaceAll(",", " : ")}`;
        stepsDisplay.innerHTML = `<img class="handIcon" src="../medias/hand.svg"> <span style="font-size: .7em;">${blockCaseWidth} × ${blockCaseHeight}${recordLeastMassage}</span> :<br>${localStorage.getItem(localStorageKey2)}`;
    } else {
        timeDisplay.innerHTML      = noRecordMassage;
        stepsDisplay.innerText     = "";
        timeInfoDisplay.innerText  = "";
        stepsInfoDisplay.innerText = "";
    }
}

function blockShuffle() {
    steps       = 0;
    isOperated  = false;
    targetBlock = blockCaseWidth * blockCaseHeight - 1;
    clearInterval(shuffleRoop);
    blocksGenerate();
    opacityMitigation();
    opacityMitigation(retryBtn);
    // block = blocks.querySelectorAll("div");
    setTimeout(() => {
        recordDisplay();
    }, 200);
    setTimeout(() => {
        recordDisplay();
    }, 1000);
    document.documentElement.style.setProperty("--swipeAnimetionDuration", "0s");
    let MaxClearJudge    = 0;
    let aim_DownRightAir = false;
    notificationDisplay(`${blockCaseWidth} × ${blockCaseHeight} シャッフル : ${Math.floor(MaxClearJudge / (blockCaseWidth * blockCaseHeight) * 101)} %`, 0);
    setTimeout(() => {
        shuffleRoop = setInterval(() => {
            MaxClearJudge              = Math.max(gameClearJudge(), MaxClearJudge)
            notificationText.innerText = `${blockCaseWidth} × ${blockCaseHeight} シャッフル : ${Math.min(Math.floor(MaxClearJudge / (blockCaseWidth * blockCaseHeight) * 111.11111111), 100)} %`;
            let swipeableArray = [];
            if (rightSwipeableJudge()) {
                swipeableArray.push(rightSwipe);
            }
            if (downSwipeableJudge()) {
                swipeableArray.push(downSwipe);
            }
            if (leftSwipeableJudge()) {
                swipeableArray.push(leftSwipe);
            }
            if (upSwipeableJudge()) {
                swipeableArray.push(upSwipe);
            }
            const random = Math.random();

            // console.log(Math.floor(random * swipeableArray.length));
            
            function bottomRightIsAirJudge() {
                if (block[blockCaseWidth * blockCaseHeight - 1].classList.contains("air")) {
                    return true;
                } else {
                    return false;
                }
            }

            if (aim_DownRightAir) {
                if (swipeableArray[Math.floor(random * swipeableArray.length / 2)]) {
                    swipeableArray[Math.floor(random * swipeableArray.length / 2)]();
                } else {
                    lastMinuteameClearJudge = blockCaseWidth * blockCaseHeight * 2;
                }
            } else {
                swipeableArray[Math.floor(random * swipeableArray.length)]();
            }

            // console.log(`${steps} / ${blockCaseWidth * blockCaseHeight * 35}`);
            console.log(`${MaxClearJudge} / ${blockCaseWidth * blockCaseHeight} | ${steps}`);
            if (MaxClearJudge > blockCaseWidth * blockCaseHeight * .9 || steps > blockCaseWidth * blockCaseHeight * 30) {
                // シャッフル完成
                if (bottomRightIsAirJudge()) {
                    clearInterval(shuffleRoop);
                    aim_DownRightAir = false;
                    isOperated = true;
                    notificationDisplay(shuffleCompletionMassage, 0);
                    document.documentElement.style.setProperty("--swipeAnimetionDuration", ".1s");
                    steps = 0;
                    if (!(popup[0].classList.contains("popupDisplayAnimation"))) {
                        opacityUndo();
                    }
                    opacityUndo(retryBtn);
                // シャッフル完成(Airの位置のみ未完成)
                } else {
                    console.log("aim_DownRightAir");
                    
                    aim_DownRightAir = true;
                }
            }
        }, 1);
    }, 500);
};

topTitle.addEventListener("click", () => {
    popupToggle(popup[1]);
});

function numberMatchCheck_Up(n = heightNumber, cn = blockCaseHeightMax) {
    if (n < cn) {
        return true;
    } else {
        return false;
    }
}

function numberMatchCheck_Down(n = heightNumber, cn = blockCaseHeightMin) {
    if (n > cn) {
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

function PinchInZoomPrevent() {
    document.addEventListener("gesturestart", function (e) {
        e.preventDefault();
    });
}

let lastTouchEnd = 0;
let now = new Date().getTime();

function dubbleTapZoomPrevent(event) {
    now = new Date().getTime();
    if (now - lastTouchEnd <= 300) { // 300ms以内の連続タップを防ぐ
        console.log(now - lastTouchEnd);
        // ダブルタップ検出
        lastTouchEnd = now;
        return false;
    } else {
        lastTouchEnd = now;
        return true;
    }
}

PinchInZoomPrevent();

function disableArrow() {
    widthDown.style.opacity = 1;
    widthUp.style.opacity = 1;
    heightDown.style.opacity = 1;
    heightUp.style.opacity = 1;
    if (!numberMatchCheck_Up(widthNumber.innerText * 1, blockCaseWidthMax)) {
        widthUp.style.transition = ".5s";
        widthUp.style.opacity = .25;
    }
    if (numberMatchCheck_Up(widthNumber.innerText * 1, blockCaseWidthMin + 1)) {
        widthDown.style.transition = ".5s";
        widthDown.style.opacity = .25;
    }
    if (!numberMatchCheck_Up(heightNumber.innerText * 1, blockCaseHeightMax)) {
        heightUp.style.transition = ".5s";
        heightUp.style.opacity = .25;
    }
    if (numberMatchCheck_Up(heightNumber.innerText * 1, blockCaseHeightMin + 1)) {
        heightDown.style.transition = ".5s";
        heightDown.style.opacity = .25;
    }
}

function widthUpCtrl(e) {
    // widthDown.style.opacity = 1;
    if (numberMatchCheck_Up(widthNumber.innerText * 1, blockCaseHeightMax)) {
        widthNumber.innerText = widthNumber.innerText * 1 + 1;
        sampleblocksGenerate();
        disableArrow();
    }
}

function widthDownCtrl(e) {
    if (numberMatchCheck_Down(widthNumber.innerText * 1 , blockCaseWidthMin)) {
        widthNumber.innerText = widthNumber.innerText * 1 - 1;
        sampleblocksGenerate();
        disableArrow();
    }
}

function heightUpCtrl(e) {
    // heightDown.style.opacity = 1;
    if (numberMatchCheck_Up(heightNumber.innerText * 1, blockCaseHeightMax)) {
        heightNumber.innerText = heightNumber.innerText * 1 + 1;
        sampleblocksGenerate();
        disableArrow();
    }
}

function heightDownCtrl(e) {
    if (numberMatchCheck_Down(heightNumber.innerText * 1, blockCaseHeightMin)) {
        heightNumber.innerText = heightNumber.innerText * 1 - 1;
        sampleblocksGenerate();
        disableArrow();
    }
}

widthUp.addEventListener("click", () => {
    if (dubbleTapZoomPrevent(event)) {
        event.preventDefault;
    }
    widthUpCtrl();
});

widthDown.addEventListener("click", () => {
    if (dubbleTapZoomPrevent(event)) {
        event.preventDefault;
    }
    widthDownCtrl();
});

heightUp.addEventListener("click", () => {
    if (dubbleTapZoomPrevent(event)) {
        event.preventDefault;
    }
    heightUpCtrl();
});

heightDown.addEventListener("click", () => {
    if (dubbleTapZoomPrevent(event)) {
        event.preventDefault;
    }
    heightDownCtrl();
});

function recoverFromLocalStorage() {
    console.log("recoverFromLocalStorage");
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
            notificationDisplay(recoverFromLocalStorageMessage);
        } else {
            retry();
        }
    } else {
        retry();
    }
}

recoverFromLocalStorage();

expandableMenuBtn.addEventListener("click", () => {
    menuBtnToggle();
});

function retry() {
    isGameClear = false;
    isOperated = false;
    blockShuffle();
    setTimeout(() => {
        topTitle.innerText = `${blockCaseWidth} × ${blockCaseHeight}`;
        timerReset();
    }, 200);
    blocksGenerate();
    timerStop();
    popupHidden();
    opacityMitigation(retryBtn);
}

retryBtn.addEventListener("click", () => {
    if (isOperated) {
        retry();
    }
});

let lastX = 0, lastY = 0, lastTime = 0;
let lastSpeed = 0;
let active = false;

document.addEventListener("mousedown", () => { active = true; });
document.addEventListener("mouseup", () => { active = false; });
document.addEventListener("touchstart", () => { active = true; });
document.addEventListener("touchend", () => { active = false; });

let swipeMouseSpeed;
let swipeMouseAcceleration;

function calculateAcceleration(event, x, y) {
    if (!active) return;
    let currentTime = event.timeStamp;
    let dt = (currentTime - lastTime) / 1000;
    if (dt === 0) return;

    let dx = x - lastX;
    let dy = y - lastY;
    swipeMouseSpeed = Math.sqrt(dx * dx + dy * dy) / dt; // 速度
    swipeMouseAcceleration = (swipeMouseSpeed - lastSpeed) / dt; // 加速度

    lastX = x;
    lastY = y;
    lastSpeed = swipeMouseSpeed;
    lastTime = currentTime;
}

document.addEventListener("mousemove", (event) => {
    calculateAcceleration(event, event.clientX, event.clientY);
});

document.addEventListener("touchmove", (event) => {
    let touch = event.touches[0];
    calculateAcceleration(event, touch.clientX, touch.clientY);
});

let startX, startY, endX, endY, nowX, nowY;

let swipeRecognitionPxDefault;

function swipeRecognitionPxDefaultRecognitionPxUpdate() {
    // ブロックの横幅 * .7 か75の大きい方を使用
    swipeRecognitionPxDefault = Math.min(Math.max(block[0].offsetWidth * .7, 75),150);
}
swipeRecognitionPxDefaultRecognitionPxUpdate()

let swipeRecognitionPx = swipeRecognitionPxDefault;

function swipeStartReset(e) {
    startX = e.clientX ?? e.touches[0].clientX;
    startY = e.clientY ?? e.touches[0].clientY;
}

let swipeMovedBlock = 0;

function swipeGetNowCoordinate(e) {
    const formattedSwipeMA = Math.min(Math.abs(swipeMouseAcceleration * .0005),100);
    // console.log(formattedSwipeMA);
    
    function swipeDirectionJudge() {
        let difiX = nowX - startX;
        let difiY = nowY - startY;
        if (isOperated) {
            if (swipeMovedBlock == 1) {
                swipeRecognitionPx = swipeRecognitionPxDefault * 2.5;
            }
            if (swipeMovedBlock >= 2) {
                swipeRecognitionPx = swipeRecognitionPxDefault / Math.min(swipeMovedBlock, 10);
            }
            // console.log(swipeRecognitionPx);
            if (Math.abs(difiX) > swipeRecognitionPx) {
                if (difiX > swipeRecognitionPx) {
                    leftSwipe();
                }
                if (difiX < -swipeRecognitionPx) {
                    rightSwipe();
                }
                swipeStartReset(e);
                swipeMovedBlock += 1;
            } else if (Math.abs(difiY) > swipeRecognitionPx) {
                if (difiY > swipeRecognitionPx) {
                    upSwipe();
                }
                if (difiY < -swipeRecognitionPx) {
                    downSwipe();
                }
                swipeStartReset(e);
                swipeMovedBlock += 1;
            }            
        }
    }
    nowX = e.clientX ?? e.touches[0].clientX;
    nowY = e.clientY ?? e.touches[0].clientY;
    swipeDirectionJudge();
}

function swipeRemoveEventListener() {
    swipeMovedBlock = 0;
    swipeRecognitionPx = swipeRecognitionPxDefault;
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

document.addEventListener("mousedown", swipeDetection);
document.addEventListener("touchstart", swipeDetection);

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
            if (isOperated) {
                retry();
            }
        }
    }
    if (event.code === "Enter" || event.code === "Space") {
        if (popup[1].classList.contains("popupDisplayAnimation")) {
            blockNumberChange();
        }
    }
});