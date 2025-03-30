let blocks                   = document.getElementById("blocks");
let block                    = blocks.querySelectorAll("div");
let substantialBlock         = blocks.querySelectorAll("div:not(.air)");
let air                      = blocks.querySelector(".air");
let popup                    = document.querySelectorAll(".popup");
let btns                     = document.querySelector(".btns");
let retryBtn                 = document.getElementById("retryBtn");
let okBtn                    = document.getElementById("okBtn");
const expandableMenuBtn      = document.querySelector(".expandableMenuBtn");
const optionPopup            = document.querySelectorAll(".optionPopup");
const optionMenuPopup        = popup[1];
const blockCaseChangePopup   = popup[2];
const bottomBarChangePopup   = popup[3];
const recordResetPopup       = popup[4];
const blockCaseChangeOp      = document.querySelector(".blockCaseChangeOp");
const bottomBarChangeOp      = document.querySelector(".bottomBarChangeOp");
const recordResetOp          = document.querySelector(".recordResetOp");
const colorThemeChangeOp     = document.querySelector(".colorThemeChangeOp");
const vibrationValidChangeOp = document.querySelector(".vibrationValidChangeOp");
const recordArrayDisplay     = document.getElementById("recordArrayDisplay");
const widthCtrl              = blockCaseChangePopup.querySelector(".widthCtrl");
const heightCtrl             = blockCaseChangePopup.querySelector(".heightCtrl");
const widthUp                = widthCtrl.querySelector(".up");
const widthDown              = widthCtrl.querySelector(".down");
const heightUp               = heightCtrl.querySelector(".up");
const heightDown             = heightCtrl.querySelector(".down");
const widthNumber            = widthCtrl.querySelector(".number");
const heightNumber           = heightCtrl.querySelector(".number");
const menuTitle              = document.querySelector(".menuTitle");
const topTitles              = document.querySelector(".topTitles");
const topTitle               = document.getElementById("topTitle");
const timeDisplay            = document.getElementById("timeDisplay");
const timeInfoDisplay        = document.getElementById("timeInfoDisplay");
const stepsDisplay           = document.getElementById("stepsDisplay");
const stepsInfoDisplay       = document.getElementById("stepsInfoDisplay");
const sampleblocks           = document.querySelector(".sampleBlocks");
const notification           = document.querySelector(".notification");
const notificationText       = document.getElementById("notificationText");
let timerIconHands           = document.querySelector(".timerIcon.hands");
const optionBtn              = document.querySelector(".optionBtn");
const bottomBarNothing       = document.querySelector(".optionPopup .bottomBarNothing");
const bottomBarSlidepuzzle   = document.querySelector(".optionPopup .bottomBarSlidepuzzle");
const bottomBarTime          = document.querySelector(".optionPopup .bottomBarTime");
const bottomBarSteps         = document.querySelector(".optionPopup .bottomBarSteps");

let sec        = 0;
let min        = 0;
let hr         = 0;
let elapsedSec = 0;

let formattedSec = "00.00";
let formattedMin = "00";
let formattedHr  = "00";
// const formattedTimesDefault = "00 : 00 : 00.00";

function formattedTimes() {
    // console.log(String(formattedSec).split("."));
    return `
    <span class="timeDisplayNumBlocks">
    <span>${
        formattedHr
    }</span> : <span>${
        formattedMin
    }</span> : <span>${
        String(formattedSec).split(".")[0]
    }</span>.<span>${
        String(formattedSec).split(".")[1]
    }</span>
    </span>`;
}

let steps         = 0;
let isOperated    = true;
let isTimerActive = false;

let blockCaseWidth  = 3;
let blockCaseHeight = 3;

const blockCaseWidthMax  = 20;
const blockCaseWidthMin  = 3;
const blockCaseHeightMax = 20;
const blockCaseHeightMin = 3;

const blockswipeDurationDefault = 90;

window.addEventListener("scroll", () => {
    window.scrollTo({top: 0});
});

function imgUserOperationLock() {
    document.querySelectorAll("img").forEach(function(img) {
        img.setAttribute("ondragstart", "return false;");
        img.setAttribute("oncontextmenu", "return false;");
    });
}

imgUserOperationLock();

function blockswipeDuration(n) {
    if (n) {
        document.documentElement.style.setProperty("--swipeAnimetionDuration", `${n / 1000}s`);
    } else {
        return document.documentElement.style.getPropertyValue("--swipeAnimetionDuration");
    }
}

let isVibrationValid = true;

function vibration(v) {
    if (v) {
        if (isVibrationValid) {
            if ("vibrate" in navigator) {
                navigator.vibrate(v);
                console.log(`v ${v}`)
            } else {
                console.log(`v : not supported ${v}`)
            }
        }
    } else {
        if ("vibrate" in navigator) {
            return true;
        } else {
            return false;
        }
    }
}

// window.onerror = function(message, source, lineno, colno, error) {
//     alert(`エラーが発生しました : ${message} source : ${source} lineno : ${lineno} colno : ${colno}`, 0);
//     return true;
//   };
  
const appNameMessage                 = `SlidePuzzle`;
const recoverFromLocalStorageMessage = `最新のデータから復元しました`;
const shuffleStartMassage            = `シャッフルを開始します`;
const shuffleCompletionMassage       = `動かすとタイマーを開始します`;
const timerStartMassage              = `タイマーを開始しました <br>左上から順番に揃えてください`;
const timerRestartMassage            = `タイマーを再開しました`;
const timerStopMassage               = `タイマーを停止しました`;
const gameClearMassage               = `タイマーを終了しました`;
const unrecordedMassage              = `クリアを記録するには､<br>リトライしてください`;
const noRecordMassage                = `まだ記録がありません`;
const recordFastestMassage           = `での最速`;
const recordLeastMassage             = `での最少`;
const blockLimitPlusMassage          = `これ以上増やせません`;
const blockLimitMinusMassage         = `これ以上減らせません`;

const bottomBarMessegeArray          = [`何も表示しない`, 
                                        `"${appNameMessage}"を表示`,
                                        `タイムを表示`,
                                        `手数を表示`];

const blockCaseChangeOpMessage       = `ブロック数 : `;
const bottomBarChangeOpMessage       = `下部バーの内容 : `;
const recordResetOpMessage           = `記録一覧`;
const colorThemeOpMessage            = `カラーテーマ : `;
const vibrationValidChangeOpMessage  = `デバイスの振動 : `;
const vibrationImpossibleMessage     = `iOSでの振動はサポートされていません`;

const validMessage                   = `有効`;
const invalidMessage                 = `無効`;
const lightThemeMessage              = `ライト`;
const darkThemeMessage               = `ダーク`;

const bottomBarLKey                  = `slidePuzzleBottomBar`;
const vibrationValidLKey             = `slidePuzzleVibrationValid`;

const timerIconImg                   = `<img class="timerIcon" src="../medias/timer_flame.svg"> <img class="timerIcon hands" src="../medias/timer_hands.svg">`;
const stepsIconImg                   = `<img class="handIcon" src="../medias/hand.svg">`;

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

function notificationPositionUpdate() {
    if (bottomBarContent == 0) {
        notification.style.bottom = "10px";
    } else {
        notification.style.bottom = "60px";
    }
    notification.style.transition = ".5s";
    setTimeout(() => {
        notification.style.transition = "0";
    }, 500);
}

function notificationDisplay(text, duration) {
    if (text) {
        notificationPositionUpdate();
        // すでに通知が表示されていない
        if (!(notification.classList.contains("notificationDisplayAnimetion"))) {
            notificationText.innerHTML = text;
            // textが通知にある文字と同様
            if (text == notificationText.innerHTML) {
                notification.classList.remove("notificationHiddenAnimetion");
                // notification.classList.remove("notificationHidden_D3sAnimetion");
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
            // durationが存在しない
            } else {
                // setTimeout(() => {
                //     // notification.classList.add("notificationHidden_D3sAnimetion");
                //     notification.classList.add("notificationHidden_D3sAnimetion");
                // }, 250);
                setTimeout(() => {
                    if (text == notificationText.innerHTML) {
                        notificationHidden();
                    }
                }, 3000);
            }
        // すでに通知が表示されている
        } else {
            notificationHidden();
            setTimeout(() => {
                notificationDisplay(text, duration);
            }, 250);
        }
    } else {
        return notificationText.innerHTML;
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

let bottomBarContent = 1;

function bottomBarContentDisplay(text) {
    notificationPositionUpdate();
    const animationDuration = 500;
        menuTitle.classList.add("bottomBarChangeAnimation");
        setTimeout(() => {
        menuTitle.innerHTML = text;
    }, animationDuration / 2);
    setTimeout(() => {
        menuTitle.classList.remove("bottomBarChangeAnimation");
    }, animationDuration);
}

function bottomBarContentChange(n = bottomBarContent, ignoreThePresent = false) {
    const bottomBarArray = ["", appNameMessage, formattedTimes(), steps];
    if (bottomBarContent !== n && !ignoreThePresent) {
        bottomBarContent = n;
        bottomBarContentDisplay(bottomBarArray[n]);
    } else if (ignoreThePresent) {
        bottomBarContent = n;
        menuTitle.innerHTML = bottomBarArray[n];
    }
    localStorage.setItem("slidePuzzleBottomBar", bottomBarContent);
}

bottomBarNothing.addEventListener("click", () => {
    // bottomBarContentNothing();
    if (bottomBarContent !== 0) {
        bottomBarContentChange(0);
    }
});

bottomBarSlidepuzzle.addEventListener("click", () => {
    // bottomBarContentSlidePuzzle();
    if (bottomBarContent !== 1) {
        bottomBarContentChange(1);
    }
});

bottomBarTime.addEventListener("click", () => {
    // bottomBarContentTime();
    if (bottomBarContent !== 2) {
        bottomBarContentChange(2);
    }
});

bottomBarSteps.addEventListener("click", () => {
    // bottomBarContentSteps();
    if (bottomBarContent !== 3) {
        bottomBarContentChange(3);
    }
});

function bottomBarContentUpdate() {
    if (bottomBarContent == 2) {
        menuTitle.innerHTML = formattedTimes();
    } else if (bottomBarContent == 3) {
        menuTitle.innerHTML = steps;
    }
}

function formattedDate(formatted = true) {
    const now     = new Date();
    if (formatted) {
        const year    = now.getFullYear();
        const month   = now.getMonth() + 1;
        const day     = now.getDate();
        const hours   = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        return(`${year}, ${month}, ${day}, ${hours}, ${minutes}, ${seconds}`);
    } else {
        return now;
    }
    // console.log(`${year} ${month} ${day} ${hours}:${minutes}:${seconds}`);
}

let timerStartDate;
let timerStopDate;

function timerHMSUpdate() {
    elapsedSec = (performance.now() - timerStartDate) / 1000;
    sec = elapsedSec % 60;
    min = Math.floor(elapsedSec / 60);
    hr  = Math.floor(elapsedSec / (60 * 60));
    formattedSec = String(sec.toFixed(2)).padStart(5, "0");
    formattedMin = String(min).padStart(2, "0");
    formattedHr = String(hr).padStart(2, "0");
}

function timerIconHandsUpdate() {
    timerIconHands = document.querySelector(".timerIcon.hands");
    timerIconHands.style.rotate = `${formattedSec * 6}deg`;
}

function timerStart(h = 0, m = 0, s = 0) { 
    timerStartDate = performance.now() - (h * 1000 * 60 * 60) - (m * 1000 * 60) - (s * 1000);
    if (!isTimerActive) {
        isTimerActive = true;
        hr  = h * 1;
        min = m * 1;
        sec = s * 1;
        timerInterval = setInterval(() => {
            timerHMSUpdate();
            console.log(elapsedSec);
            bottomBarContentUpdate();
        }, 47);
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
}

function timerStop() {
    if (isTimerActive) {
        // timerStopDate = performance.now();
        timerHMSUpdate();
        isTimerActive = false;
        clearInterval(timerInterval);
        clearInterval(autoSaveInterval);
    }
}

function timerReset() {
    sec          = 0;
    min          = 0;
    hr           = 0;
    formattedSec = "00.00";
    formattedMin = "00";
    formattedHr  = "00";
}

function timerNumberIsZero() {
    if ((formattedHr * 1 + formattedMin * 1 + formattedSec * 1) == 0) {
        return true;
    } else {
        return false;
    }
}

function opacityMitigation(o = blocks, t = .5) {
    o.classList.remove("opacityUndoAnimation");
    if (!(o.classList.contains("opacityMitigationAnimation"))) {
        o.classList.remove("opacityUndoAnimation");
        o.classList.remove("opacityMitigationAnimation");
        o.style.setProperty("animation-duration", `${t}s`);
        o.classList.add("opacityMitigationAnimation");
    }
}
function opacityUndo(o = blocks, t = .5) {
    o.classList.remove("opacityMitigationAnimation");
    if (!(o.classList.contains("opacityUndoAnimation"))) {
        o.classList.remove("opacityMitigationAnimation");
        o.classList.remove("opacityUndoAnimation");
        o.style.setProperty("animation-duration", `${t}s`);
        o.classList.add("opacityUndoAnimation");
    }
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

function getRecordArray() {
    let removeBlockCandidate = [];
    let removeBlockCaseWidth = 1;
    let removeBlockCaseHeight = 1;
    while (removeBlockCaseWidth * removeBlockCaseHeight < blockCaseWidthMax * blockCaseHeightMax) {
        const removeLocalStorageKey1 = (`slidePuzzlePlayLog_Time${removeBlockCaseWidth} × ${removeBlockCaseHeight}`)
        const removeLocalStorageKey2 = (`slidePuzzlePlayLog_Steps${removeBlockCaseWidth} × ${removeBlockCaseHeight}`)
        if (localStorage.getItem(removeLocalStorageKey1)) {
            removeBlockCandidate.push((`${removeBlockCaseWidth} × ${removeBlockCaseHeight}, ${localStorage.getItem(removeLocalStorageKey1).replaceAll(",", " :")}, ${localStorage.getItem(removeLocalStorageKey2)}`).split(","));
        }
        if (removeBlockCaseHeight < blockCaseHeightMax) {
            removeBlockCaseHeight += 1;
        } else {
            removeBlockCaseHeight = 1;
            removeBlockCaseWidth += 1;
        }
    }
    return removeBlockCandidate
}

// getRecordArray();

let isGameClear = false;

function menuBtnToggle(n = popup[0]) {
    const deployedPopup = document.querySelectorAll(".popup.popupDisplayAnimation");
    if (deployedPopup.length == 0) {
        popupDisplay(n);
        opacityMitigation();
    } else {
        popupHidden(deployedPopup[deployedPopup.length - 1]);
        if (deployedPopup.length - 1 == 0 && isOperated) {
            opacityUndo();
            // alert(formattedTimes)
        }
    }
}

function darkThemeChange(dark) {
    if (dark == true) {
        document.documentElement.style.setProperty("--documentBackgroundColor", "black");
        document.documentElement.style.setProperty("--blockOutlineColor", "gray");
        document.documentElement.style.setProperty("--documentBaseColor", "lightgray");
        if (popup[0].classList.contains("popupDisplayAnimation")) {
            document.documentElement.style.setProperty("--documentBaseColor", "black");
        }
        // localStorage.setItem("slidePuzzleColorTheme", "true");
    } else if (dark == false) {
        document.documentElement.style.setProperty("--documentBackgroundColor", "white");
        document.documentElement.style.setProperty("--blockOutlineColor", "transparent");
        document.documentElement.style.setProperty("--documentBaseColor", "black");
        // localStorage.setItem("slidePuzzleColorTheme", "false");
    } else {
        if (document.documentElement.style.getPropertyValue("--documentBackgroundColor") === "white") {
            return false;
        } else {
            return true;
        }
    }
}

function deviceDarkThemeMatch(e) {
    if (e.matches) {
        darkThemeChange(true);
    } else {
        darkThemeChange(false);
    }
}

const deviceDarkThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

// デバイスカラーテーマによって読み込むPWAのマニフェストファイルを変更
if (deviceDarkThemeQuery.matches) {
    document.querySelector("head").innerHTML += `<link rel="manifest" href="../manifest_2.json">`;
} else {
    document.querySelector("head").innerHTML += `<link rel="manifest" href="../manifest.json">`;
}

deviceDarkThemeMatch(deviceDarkThemeQuery);

deviceDarkThemeQuery.addEventListener("change", (e) => {
    deviceDarkThemeMatch(e);
    optionMenuItemsUpdate();
});

function optionMenuItemsUpdate() {
    bottomBarNothing.innerText = bottomBarMessegeArray[0];
    bottomBarSlidepuzzle.innerText = bottomBarMessegeArray[1];
    bottomBarTime.innerText = bottomBarMessegeArray[2];
    bottomBarSteps.innerText = bottomBarMessegeArray[3];
    blockCaseChangeOp.querySelector("p").innerText = `${blockCaseChangeOpMessage}${blockCaseWidth} × ${blockCaseHeight}`;
    bottomBarChangeOp.querySelector("p").innerText = `${bottomBarChangeOpMessage}${bottomBarMessegeArray[bottomBarContent]}`;
    recordResetOp.querySelector("p").innerText = recordResetOpMessage;
    colorThemeChangeOp.querySelector("p").innerText = `${colorThemeOpMessage}${darkThemeChange() ? darkThemeMessage : lightThemeMessage}`;
    vibrationValidChangeOp.querySelector("p").innerText = `${vibrationValidChangeOpMessage}${isVibrationValid ? validMessage : invalidMessage}`;
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
        // opacityUndo();
    }
    popupHidden(popup[1]);
    popupHidden(blockCaseChangePopup);
    localStorageKey1 = (`slidePuzzlePlayLog_Time${blockCaseWidth} × ${blockCaseHeight}`)
    localStorageKey2 = (`slidePuzzlePlayLog_Steps${blockCaseWidth} × ${blockCaseHeight}`)
    if (timerNumberIsZero()) {
        recordDisplay();
    }
}

okBtn.addEventListener("click", () => {
    blockNumberChange();
});

function popupDisplay(n = popup[0]) {
    if (!timerNumberIsZero()) {
        topTitle.innerText = `${blockCaseWidth} × ${blockCaseHeight}`;
        timeDisplay.innerHTML = `${timerIconImg} ${formattedTimes()}`;
        stepsDisplay.innerHTML = `${stepsIconImg} ${steps}`;
        timerIconHandsUpdate();
    }
    if (darkThemeChange()) {
        document.documentElement.style.setProperty("--documentBaseColor", "black");
    }
    optionMenuItemsUpdate();
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
            timerStop();
            if (!isGameClear && !timerNumberIsZero()) {
                timeDisplay.classList.add("changeAcceptanceAnimation");
                // notificationHidden();
            }
        }
    }
    if (n == optionMenuPopup) {
        optionBtn.querySelector("img").classList.remove("optionMenuPopupHiddenOptionBtnAnimation");
        optionBtn.querySelector("img").classList.add("optionMenuPopupDisplayOptionBtnAnimation");
    }
    imgUserOperationLock();
}


function popupHidden(n = popup[0]) {
    optionMenuItemsUpdate();
    setTimeout(() => {
        widthNumber.innerText = blockCaseWidth;
        heightNumber.innerText = blockCaseHeight;
        disableArrow();
    }, 500);
    if (n.classList.contains("popupDisplayAnimation")) {
        // isMenuDeployed = false;
        n.classList.remove("popupDisplayAnimation");
        n.classList.add("popupHiddenAnimation");
        if (n == popup[0]) {
            if (darkThemeChange()) {
                document.documentElement.style.setProperty("--documentBaseColor", "lightgray");
            }
            const menuSticks =  expandableMenuBtn.querySelectorAll("div");
            menuSticks[0].classList.remove("menuStickRotate1Animation");
            menuSticks[2].classList.remove("menuStickRotate2Animation");
            menuSticks[1].classList.remove("menuStickEraseAnimation");
            menuSticks[0].classList.add("menuStickRotateReverse1Animation");
            menuSticks[2].classList.add("menuStickRotateReverse2Animation");
            menuSticks[1].classList.add("menuStickEraseReverseAnimation");
            if (!isGameClear && isOperated && !timerNumberIsZero()) {
                timerStart(formattedHr,formattedMin,formattedSec)
                notificationDisplay(timerRestartMassage);
            }
            timeDisplay.classList.remove("changeAcceptanceAnimation");
        }
    }
    if (n == optionMenuPopup) {
        optionBtn.querySelector("img").classList.remove("optionMenuPopupDisplayOptionBtnAnimation");
        optionBtn.querySelector("img").classList.add("optionMenuPopupHiddenOptionBtnAnimation");
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
    const clearedBlockBCArray = [
        "skyblue",
        "cornflowerblue",
        "cadetblue",
        "lightgreen",
        "greenyellow",
        "yellow",
        "orange",
        "coral",
        "crimson",
        "chocolate"
    ]
    const clearedBlockBCArraySelect = clearedBlockBCArray[Math.min(Math.round(((((blockCaseWidth + blockCaseHeight) / 2)) / ((blockCaseWidthMax - blockCaseWidthMin + blockCaseHeightMax - blockCaseHeightMin) / 2)) * clearedBlockBCArray.length) - 1, clearedBlockBCArray.length - 1)]
    document.documentElement.style.setProperty("--clearedBlockAnimationBC", clearedBlockBCArraySelect);
    timerStop();
    saveToLocalStorage();
    const clearedBlockInterval = 75;
    function clearedBlockAnimationX(n = 0) {
        let clearedBlockAnimationIndex = 0;
        const clearedBlockAnimationInterval = setInterval(() => {
            if (clearedBlockAnimationIndex < blockCaseWidth) {
                const animetionTargetBlock =  block[clearedBlockAnimationIndex + n * blockCaseWidth]
                if (animetionTargetBlock && !animetionTargetBlock.classList.contains("air")) {
                    animetionTargetBlock.classList.add("clearedBlockAnimation");
                    setTimeout(() => {
                        animetionTargetBlock.classList.remove("clearedBlockAnimation");
                    }, 400);
                }
                clearedBlockAnimationIndex += 1;
                vibration(1);
            } else {
                clearInterval(clearedBlockAnimationInterval);
            }
        }, clearedBlockInterval);
    }
    isOperated = false;
    let clearedBlockAnimationExeIndex = 0;
    const clearedBlockAnimationExeInterval = setInterval(() => {
        if (clearedBlockAnimationExeIndex < blockCaseHeight) {
            clearedBlockAnimationX(clearedBlockAnimationExeIndex);
            clearedBlockAnimationExeIndex += 1;
        } else {
            clearInterval(clearedBlockAnimationExeInterval);
            setTimeout(() => {
                isOperated = true;
                clearSteps = steps;
                // notificationDisplay(gameClearMassage);
                popupDisplay();
                opacityMitigation();
                isGameClear = true;
                autoSaveToLocalStorage();
                timeDisplay.classList.remove("changeAcceptanceAnimation");
                // while (!(timerInterval) && !(autoSaveInterval)) {
                    //     timerStop();
                    // }
            }, clearedBlockInterval * blockCaseWidth);
        }
    }, clearedBlockInterval);
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
    // 振動
    vibration(1);
    
    if (isOperated) {
        if ((popup[0].classList.contains("popupDisplayAnimation"))) {
            opacityUndo();
        }
        popupHidden();
        popupHidden(optionMenuPopup);

        for (let i = 0; i < optionPopup.length; i += 1) {
            popupHidden(optionPopup[i]);
        }
        if (steps == 1) {
            timerStart();
        }
        if (!isGameClear) {
            if (gameClearJudge() == 0 && isOperated) {
                gameClear();
                bottomBarContentUpdate();
            }
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
         timeDisplay.innerHTML = `${timerIconImg} <span style="font-size: .7em;">${blockCaseWidth} × ${blockCaseHeight}${recordFastestMassage}</span> :<br>${localStorage.getItem(localStorageKey1).replaceAll(",", " : ")}`;
        stepsDisplay.innerHTML = `${stepsIconImg} <span style="font-size: .7em;">${blockCaseWidth} × ${blockCaseHeight}${recordLeastMassage}</span> :<br>${localStorage.getItem(localStorageKey2)}`;
    } else {
        timeDisplay.innerHTML      = noRecordMassage;
        stepsDisplay.innerText     = "";
        timeInfoDisplay.innerText  = "";
        stepsInfoDisplay.innerText = "";
    }
    imgUserOperationLock();
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
            if (steps !== 0) {
                MaxClearJudge = Math.max(gameClearJudge(), MaxClearJudge)
            } else {
                MaxClearJudge = 0;
            }
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
                }
            } else {
                const executionTime =  Math.min(Math.max(Math.floor(Math.random() * 5), 1), Math.min(blockCaseWidth, blockCaseHeight));
                for (let i = 0; i < executionTime; i += 1) {
                    swipeableArray[Math.floor(random * swipeableArray.length)]();
                }
            }

            // console.log(`${steps} / ${blockCaseWidth * blockCaseHeight * 35}`);
            console.log(`${MaxClearJudge} / ${blockCaseWidth * blockCaseHeight} | ${steps}`);
            if (MaxClearJudge > blockCaseWidth * blockCaseHeight * .9 || steps > blockCaseWidth * blockCaseHeight * 50 && gameClearJudge() !== 0) {
                // シャッフル完成
                if (bottomRightIsAirJudge() && steps > blockCaseWidth * blockCaseHeight) {
                    clearInterval(shuffleRoop);
                    aim_DownRightAir = false;
                    isOperated = true;
                    notificationDisplay(shuffleCompletionMassage, 0);
                    blockswipeDuration(blockswipeDurationDefault);
                    steps = 0;
                    if (!(popup[0].classList.contains("popupDisplayAnimation"))) {
                        opacityUndo();
                    }
                    opacityUndo(retryBtn);
                // シャッフル完成(Airの位置のみ未完成)
                } else {
                    // console.log("aim_DownRightAir");
                    if (!gameClearJudge() >= 1) {
                        aim_DownRightAir = false;
                    } else {
                        aim_DownRightAir = true;
                    }
                }
            }
        }, blockswipeDuration());
    }, 500);
};

optionBtn.addEventListener("click", () => {
    popupToggle(popup[1]);
});

menuTitle.addEventListener("click", () => {
    if (popup[0].classList.contains("popupDisplayAnimation") && !optionMenuPopup.classList.contains("popupDisplayAnimation")) {
        popupToggle(bottomBarChangePopup);
    }
});

topTitles.addEventListener("click", () => {
    popupToggle(blockCaseChangePopup);
});

blockCaseChangeOp.addEventListener("click", () => {
    popupToggle(blockCaseChangePopup);
});

bottomBarChangeOp.addEventListener("click", () => {
    popupToggle(bottomBarChangePopup);
});

function recordDisplayUpdate() {
    recordArrayDisplay.innerHTML = "";
    recordArrayDisplay.scrollBy(100, 0);
    // recordArrayDisplay.scrollBy(-parseFloat(getComputedStyle(recordArrayDisplay).fontSize) * .4, 0);
    for (let i = 0; i < getRecordArray().length; i += 1 ) {
        recordArrayDisplay.innerHTML += `<div class="recordLogs"><p>${getRecordArray()[i].join(" | ")}</p></div>`;
    }
}

function recordRemove() {
    recordDisplayUpdate();
    const recordLogs = document.querySelectorAll(".recordLogs");
    recordLogs.forEach(log => {
        log.addEventListener("click", () => {
            // すでに選択した削除メニューが展開済み
            if (log.querySelector(".confirmDeletionDisplayAnimation")) {
                // メニューを非表示
                log.querySelector(".confirmDeletionDisplayAnimation").classList.remove("confirmDeletionHiddenAnimation");
                log.querySelector(".confirmDeletionDisplayAnimation").classList.add("confirmDeletionHiddenAnimation");
                // log.querySelector(".confirmDeletionHiddenAnimation").remove();
                setTimeout(() => {
                    log.querySelector(".confirmDeletionDisplayAnimation").remove();
                }, 250);
            // 削除メニューが非表示
            } else {
                // もし他に展開済みの削除メニューが存在する
                if (document.querySelectorAll(".confirmDeletionDisplayAnimation").length >= 1) {
                    // それを非表示
                    document.querySelector(".confirmDeletionDisplayAnimation").classList.add("confirmDeletionHiddenAnimation");
                    setTimeout(() => {
                        document.querySelector(".confirmDeletionHiddenAnimation").remove();
                    }, 250);
                }
                // 押された項目に以下を追加
                log.innerHTML += `
                <div class="confirmDeletionDisplayAnimation">
                    <img src="../medias/trashBoxBase.svg" alt="Delete" ondragstart="return false;">
                    <img src="../medias/trashBoxLid.svg" class="trashBoxLid" ondragstart="return false;">
                </div>`;
                log.querySelector(".confirmDeletionDisplayAnimation").addEventListener("click", () => {
                    localStorage.removeItem(`slidePuzzlePlayLog_Time${log.innerText.split(" |")[0]}`);
                    localStorage.removeItem(`slidePuzzlePlayLog_Steps${log.innerText.split(" |")[0]}`);
                    log.classList.add("deleteRecordAnimation");
                    let fillLine = false;
                    recordArrayDisplay.scrollBy({ left: 0, top: -recordLogs[0].scrollHeight, behavior: "smooth" });
                    recordLogs.forEach((recordLogs) => {
                    if (fillLine) {
                        recordLogs.classList.add("recordFillLinesAnimation");
                    }
                    if (recordLogs === log) {
                        fillLine = true;
                    }
                    });
                    setTimeout(() => {
                        recordDisplayUpdate();
                        log.remove();
                        recordRemove();
                    }, 500);
                });
            }

        });
    });
}

recordResetOp.addEventListener("click", () => {
    popupToggle(recordResetPopup);
    recordRemove();
});

colorThemeChangeOp.addEventListener("click", () => {
    document.body.style.transition = "1s";
    setTimeout(() => {
        document.body.style.transition = "0";
    }, 1000);
    if (darkThemeChange()) {
        darkThemeChange(false);
    } else {
        darkThemeChange(true);
    }
    optionMenuItemsUpdate();
});

vibrationValidChangeOp.addEventListener("click", () => {
    if (isVibrationValid) {
        isVibrationValid = false;
    } else {
        isVibrationValid = true;
        vibration(50)
    }
    localStorage.setItem(vibrationValidLKey, isVibrationValid ? "true" : "false");
    optionMenuItemsUpdate();
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && isVibrationValid == true) {
        const notificationConventionalText = notificationDisplay();
        notificationDisplay(vibrationImpossibleMessage);
        setTimeout(() => {
            if (notificationDisplay() == vibrationImpossibleMessage) {
                notificationDisplay(notificationConventionalText);
            }
        }, 3000);
    }
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
        // console.log(now - lastTouchEnd);
        // ダブルタップ検出
        lastTouchEnd = now;
        return true;
    } else {
        lastTouchEnd = now;
        return false;
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
        widthUp.style.cursor = "normal";
    }
    if (numberMatchCheck_Up(widthNumber.innerText * 1, blockCaseWidthMin + 1)) {
        widthDown.style.transition = ".5s";
        widthDown.style.opacity = .25;
        widthDown.style.cursor = "normal";
    }
    if (!numberMatchCheck_Up(heightNumber.innerText * 1, blockCaseHeightMax)) {
        heightUp.style.transition = ".5s";
        heightUp.style.opacity = .25;
        heightUp.style.cursor = "normal";
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
        event.preventDefault();
    }
    widthUpCtrl();
});

widthDown.addEventListener("click", () => {
    if (dubbleTapZoomPrevent(event)) {
        event.preventDefault();
    }
    widthDownCtrl();
});

heightUp.addEventListener("click", () => {
    if (dubbleTapZoomPrevent(event)) {
        event.preventDefault();
    }
    heightUpCtrl();
});

heightDown.addEventListener("click", () => {
    if (dubbleTapZoomPrevent(event)) {
        event.preventDefault();
    }
    heightDownCtrl();
});

function recoverFromLocalStorage() {
    console.log("recoverFromLocalStorage");
    let localStorageSaveContent;
    if (localStorage.getItem(bottomBarLKey)) {
        bottomBarContent = localStorage.getItem(bottomBarLKey) * 1;
        bottomBarContentChange(bottomBarContent);
    }
    if (localStorage.getItem(vibrationValidLKey)) {
        if (localStorage.getItem(vibrationValidLKey) == "true") {
            isVibrationValid = true;
        } else {
            isVibrationValid = false;
        }
    }
    optionMenuItemsUpdate();
    // if (localStorage.getItem("slidePuzzleColorTheme")) {
    //     if (localStorage.getItem("slidePuzzleColorTheme") == "true") {
    //         darkThemeChange(true);
    //     } else {
    //         darkThemeChange(false);
    //     }
    // }
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
    widthNumber.innerText = blockCaseWidth;
    heightNumber.innerText = blockCaseHeight;
}

recoverFromLocalStorage();

bottomBarContentChange(bottomBarContent, true);

expandableMenuBtn.addEventListener("click", () => {
    menuBtnToggle();
});

function retry() {
    timerReset();
    if (bottomBarContent == 2) {
        bottomBarContentDisplay(formattedTimes());
    } else if (bottomBarContent == 3) {
        bottomBarContentDisplay("0");
    }
    isGameClear = false;
    isOperated = false;
    setTimeout(() => {
        timeInfoDisplay.innerText = "";
        stepsInfoDisplay.innerText = "";
    }, 500);
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

blocks.addEventListener("mousedown", () => { active = true; });
blocks.addEventListener("mouseup", () => { active = false; });
blocks.addEventListener("touchstart", () => { active = true; });
blocks.addEventListener("touchend", () => { active = false; });

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

blocks.addEventListener("mousemove", (event) => {
    blocks.style.cursor = "auto";
    calculateAcceleration(event, event.clientX, event.clientY);
});

blocks.addEventListener("touchmove", (event) => {
    let touch = event.touches[0];
    calculateAcceleration(event, touch.clientX, touch.clientY);
});

let startX, startY, endX, endY, nowX, nowY;

let swipeRecognitionPxDefault;

function swipeRecognitionPxDefaultRecognitionPxUpdate() {
    // ブロックの横幅 * .5 か75の大きい方を使用
    swipeRecognitionPxDefault = Math.min(Math.max(block[0].offsetWidth * .5, 75),150);
}
swipeRecognitionPxDefaultRecognitionPxUpdate()

let swipeRecognitionPx = swipeRecognitionPxDefault;

function swipeStartReset(e) {
    startX = e.clientX ?? e.touches[0].clientX;
    startY = e.clientY ?? e.touches[0].clientY;
}

let swipeMovedBlock = 0;

function swipeGetNowCoordinate(e) {
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
    blocks.removeEventListener("mousemove",swipeGetNowCoordinate);
    blocks.removeEventListener("touchmove",swipeGetNowCoordinate);
}

function swipeDetection(e) {
    swipeStartReset(e);
    blocks.addEventListener("mousemove",swipeGetNowCoordinate);
    blocks.addEventListener("touchmove",swipeGetNowCoordinate);

    blocks.addEventListener("mouseup",() => {
        swipeRemoveEventListener();
    });

    blocks.addEventListener("touchend",() => { 
        swipeRemoveEventListener();
    });
}

blocks.addEventListener("mousedown", swipeDetection);
blocks.addEventListener("touchstart", swipeDetection);

document.addEventListener("keydown",(event) => {
    if ((event.code === "KeyA" || event.code === "ArrowLeft")) {
        if (isOperated) {
            rightSwipe();
            blocks.style.cursor = "none";
        }
    }
    if (event.code === "KeyE") {
        if (blockCaseChangePopup.classList.contains("popupDisplayAnimation")) {
            heightUpCtrl();
        }
    }
    if (event.code === "KeyD") {
        if (blockCaseChangePopup.classList.contains("popupDisplayAnimation")) {
            heightDownCtrl();
        } else {
            if (isOperated) {
                leftSwipe();
                blocks.style.cursor = "none";
            }
        }
    }
    if (event.code === "ArrowRight") {
        if (isOperated) {
            leftSwipe();
        }
    }
    if (event.code === "KeyW") {
        if (blockCaseChangePopup.classList.contains("popupDisplayAnimation")) {
            widthUpCtrl();
        } else {
            if (isOperated) {
                downSwipe();
                blocks.style.cursor = "none";
            }
        }
    }
    if (event.code === "ArrowUp") {
        if (isOperated) {
            downSwipe();
        }
    }
    if (event.code === "KeyS") {
        if (blockCaseChangePopup.classList.contains("popupDisplayAnimation")) {
            widthDownCtrl();
        } else {
            if (isOperated) {
                upSwipe();
                blocks.style.cursor = "none";
            }
        }
    }
    if (event.code === "ArrowDown") {
        if (isOperated) {
            upSwipe();
        }
    }
    if (event.code === "KeyF") {
        menuBtnToggle();
        blocks.style.cursor = "auto";
    }
    if (event.code === "KeyC") {
        if (popup[0].classList.contains("popupDisplayAnimation")) {
            if (document.querySelector(".optionPopup.popupDisplayAnimation")) {
                popupToggle(document.querySelector(".optionPopup.popupDisplayAnimation"));
            } else {
                popupToggle(optionMenuPopup);
            }
        } else {
            opacityMitigation();
            popupDisplay(popup[0]);
            popupDisplay(optionMenuPopup);
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
        if (blockCaseChangePopup.classList.contains("popupDisplayAnimation")) {
            blockNumberChange();
        }
    }
    if (event.code === "KeyZ") {
        // gameClear();
    }
});

// タイマーの正確性UP