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
const optionMenuPopup        = document.querySelector(".optionMenuPopup");
const blockCaseChangePopup   = document.querySelector(".blockCaseChangePopup");
const bottomBarChangePopup   = document.querySelector(".bottomBarChangePopup");
const recordResetPopup       = document.querySelector(".recordResetPopup");
const challengesListPopup    = document.querySelector(".challengesListPopup");
const challengesListOp       = document.querySelector(".challengesListOp");
const blockCaseChangeOp      = document.querySelector(".blockCaseChangeOp");
const bottomBarChangeOp      = document.querySelector(".bottomBarChangeOp");
const bottomBarTimeStepsOp   = document.querySelector(".bottomBarTimeStepsOp");
const recordResetOp          = document.querySelector(".recordResetOp");
const colorThemeChangeOp     = document.querySelector(".colorThemeChangeOp");
const vibrationValidChangeOp = document.querySelector(".vibrationValidChangeOp");
const sortAssistValidChangeOp = document.querySelector(".sortAssistValidChangeOp");
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
const bottomBarTimeSteps     = document.querySelector(".optionPopup .bottomBarTimeSteps");
let sec        = 0;
let min        = 0;
let hr         = 0;
let elapsedSec = 0;

let formattedSec = "00.00";
let formattedMin = "00";
let formattedHr  = "00";

const deviceDarkThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

// デバイスカラーテーマによって読み込むPWAのマニフェストファイルを変更
if (deviceDarkThemeQuery.matches) {
    document.querySelector("head .manifestFile").href = "../systems/pwa/manifest_2.json";
} else {
    document.querySelector("head .manifestFile").href = "../systems/pwa/manifest.json";
}

function formattedTimes(h, m, s) {
    // console.log(String(formattedSec).split("."));alert(h)
    if (h == undefined && m == undefined && s == undefined) {
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
    } else {
        return [
            String(h).padStart(2, "0"),
            String(m).padStart(2, "0"),
            (s * 1).toFixed(2).padStart(5, "0")
        ];
    }
}

let steps             = 0;
let isOperated        = true;
let isTimerActive     = false;
let isSortAssistValid = false;

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
            } else {
                console.log(`vibrate : not supported ${v}`)
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
const noRecordMassage                = `記録がありません`;
const recordFastestMassage           = `での最速`;
const recordLeastMassage             = `での最少`;
const blockLimitPlusMassage          = `これ以上増やせません`;
const blockLimitMinusMassage         = `これ以上減らせません`;

const bottomBarMessegeArray          = [`何も表示しない`, 
                                        `"${appNameMessage}"を表示`,
                                        `タイムを表示`,
                                        `手数を表示`,
                                        `タイムと手数を表示`];

const blockCaseChangeOpMessage       = `ブロック数 : `;
const bottomBarChangeOpMessage       = `下部バー : `;
const recordResetOpMessage           = `記録一覧`;
const colorThemeOpMessage            = `カラーテーマ : `;
const vibrationValidChangeOpMessage  = `デバイスの振動 : `;
const vibrationImpossibleMessage     = `iOSでの振動はサポートされていません`;
const sortAssistValidChangeOpMessage = `SortAssist : `;
const sortAssistNameMessage          = `SortAssist`;
const sortAssistShortNameMessage     = `Assist`;
const validMessage                   = `有効`;
const invalidMessage                 = `無効`;
const lightThemeMessage              = `ライト`;
const darkThemeMessage               = `ダーク`;

const challengesListMessage          = `以内で`;

const bottomBarLKey                  = `slidePuzzleBottomBar`;
const vibrationValidLKey             = `slidePuzzleVibrationValid`;
const sortAssistValidLKey            = `slidePuzzleSortAssistValid`;

const timerIconImg                   = `<img class="timerIcon" src="../systems/imgs/timer_flame.svg"> <img class="timerIcon hands" src="../systems/imgs/timer_hands.svg">`;
const stepsIconImg                   = `<img class="handIcon" src="../systems/imgs/hand.svg">`;
const trashBoxIconImg                = `<img src="../systems/imgs/trashBoxBase.svg" alt="Delete" ondragstart="return false;">
                                        <img src="../systems/imgs/trashBoxLid.svg" class="trashBoxLid" ondragstart="return false;">`;
const okIconImg                      = `<img src="../systems/imgs/ok.svg" alt="OK" ondragstart="return false;">`;

const getRecordArray_CaseSize        = 0;
const getRecordArray_Time            = 1;
const getRecordArray_TimeAssist      = 2;
const getRecordArray_Steps           = 3;
const getRecordArray_StepsAssist     = 4;

function selectionPrevention(o) {
    let tentative;
    tentative   = o.innerHTML;
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

function HTMLTitleUpdate() {
    document.querySelector("head title").innerHTML = `${appNameMessage} | ${blockCaseWidth} × ${blockCaseHeight}`;
}

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
    HTMLTitleUpdate();
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

const bottomBarContentAnimationDuration = 500;

function bottomBarContentDisplay(text) {
    notificationPositionUpdate();
        menuTitle.classList.add("bottomBarChangeAnimation");
        setTimeout(() => {
        menuTitle.innerHTML = text;
    }, bottomBarContentAnimationDuration / 2);
    setTimeout(() => {
        menuTitle.classList.remove("bottomBarChangeAnimation");
    }, bottomBarContentAnimationDuration);
}

let bottomBarArray;

function bottomBarArrayUpdate() {
    bottomBarArray = ["",
        appNameMessage,
        formattedTimes(),
        steps,
        `<span class="timeDisplayNumBlocks">
            <span>
                ${formatTimes_String(formattedHr, formattedMin, formattedSec).split(" ")[0] == undefined ? "" : formatTimes_String(formattedHr, formattedMin, formattedSec).split(" ")[0]}
            </span>
            <span>
                ${formatTimes_String(formattedHr, formattedMin, formattedSec).split(" ")[1] == undefined ? "" : formatTimes_String(formattedHr, formattedMin, formattedSec).split(" ")[1]}
            </span>
            <span>
                ${formatTimes_String(formattedHr, formattedMin, formattedSec).split(" ")[2] == undefined ? "" : formatTimes_String(formattedHr, formattedMin, formattedSec).split(" ")[2]}
            </span>
            <span></span>
            <span>
                ${steps}
            </span>
        </span>
        `];
}

bottomBarArrayUpdate();

function bottomBarContentUpdate(animation = false) {
    bottomBarArrayUpdate();
    
    setTimeout(() => {
        if (bottomBarContent == 2) {
            menuTitle.innerHTML = bottomBarArray[2];
        } else if (bottomBarContent == 3) {
            menuTitle.innerHTML = bottomBarArray[3];
        } else if (bottomBarContent == 4) {
            menuTitle.innerHTML = bottomBarArray[4];
        }
    }, animation ? bottomBarContentAnimationDuration : 0);
    
    if (animation) {
        if (bottomBarContent == 2) {
            bottomBarContentDisplay(bottomBarArray[2]);
        } else if (bottomBarContent == 3) {
            bottomBarContentDisplay(bottomBarArray[3]);
        } else if (bottomBarContent == 4) {
            bottomBarContentDisplay(bottomBarArray[4]);
        }
    }
    
}

function bottomBarContentChange(n = bottomBarContent, ignoreThePresent = false) {
    // opacityUndo(bottomBarChangePopup.querySelectorAll("p")[bottomBarContent]);
    opacityUndo(bottomBarChangePopup.querySelectorAll("p")[bottomBarContent]);
    opacityMitigation(bottomBarChangePopup.querySelectorAll("p")[n]);
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

bottomBarTimeSteps.addEventListener("click", () => {
    // bottomBarContentTimeSteps();
    if (bottomBarContent !== 4) {
        bottomBarContentChange(4);
    }
});

function formatTimes_String(h, m, s) {
    let formattedTimesString = "";
    // 時間が0である
    if (h * 1 !== 0) {
        formattedTimesString += `${h * 1}h `;
    }
    if (m * 1 !== 0) {
        formattedTimesString += `${m * 1}m `;
    }
    formattedTimesString += `${s}s `;
    return formattedTimesString;
}

let timerStartDate;
let timerStopDate;

function timerHMSUpdate() {
    elapsedSec = (performance.now() - timerStartDate) / 1000;
    sec = elapsedSec % 60;
    min = Math.floor(elapsedSec / 60) % 60;
    hr  = Math.floor(elapsedSec / (60 * 60));
    formattedSec = (sec * 1).toFixed(2).padStart(5, "0")
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
            bottomBarContentUpdate();
            window.scrollTo(0, 0);
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
    opacityMitigation(sortAssistValidChangeOp.querySelector("p"));
}

function timerStop() {
    if (isTimerActive) {
        timerHMSUpdate();
        isTimerActive = false;
        clearInterval(timerInterval);
        clearInterval(autoSaveInterval);
        bottomBarContentUpdate();
    }
}

function timerReset() {
    sec          = 0;
    min          = 0;
    hr           = 0;
    formattedSec = "00.00";
    formattedMin = "00";
    formattedHr  = "00";
    bottomBarContentUpdate();
}

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        // ページが非表示になったらタイマー停止
        timerStop();
    } else {
        // ページが再表示されたら必要に応じてタイマーを再開
        if (!isGameClear && isOperated && !timerNumberIsZero() && !popup[0].classList.contains("popupDisplayAnimation")) {
            timerStart(formattedHr, formattedMin, formattedSec);
            notificationHidden();
            notificationDisplay(timerRestartMassage);
        }
    }
});

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

let localStorageKey1 = (`slidePuzzlePlayLog_Time${blockCaseWidth} × ${blockCaseHeight}`)
let localStorageKey2 = (`slidePuzzlePlayLog_Steps${blockCaseWidth} × ${blockCaseHeight}`)

function localStorageFormat(key, assist) {
    if (localStorage.getItem(key)) {
        if (localStorage.getItem(key).split(" | ")[assist ? 1 : 0].split(",") == "true") {
            localStorage.setItem(key, `0 | ${localStorage.getItem(key).split(" | ")[0]}`);
        }
        if (localStorage.getItem(key).split(" | ")[assist ? 1 : 0].split(",") == "false") {
            localStorage.setItem(key, `${localStorage.getItem(key).split(" | ")[0]} | 0`);
        }
    }
}

localStorageFormat(localStorageKey1, 0);
localStorageFormat(localStorageKey1, 1);
localStorageFormat(localStorageKey2, 0);
localStorageFormat(localStorageKey2, 1);

function saveToLocalStorage() {
    console.log("saveToLocalStorage");
    function newRecordJudgeAndSave(key, threshold, saveContent, date, display, text) {
        console.log("newRecordJudgeAndSave");
        // 特定のstorageにあるすべての項目
        const combinedThreshold = threshold.join("") * 1;
        function keyArray(n) {
            return localStorage.getItem(key).split(" | ")[n].split(",");
        }
        // 特定のstorageにあるすべての項目を結合
        function combinedKey(n = 0) {
            // n が 0 なら Assist未使用時
            // n が 1 なら Assist使用時
            return keyArray(n).join("").replaceAll(" ","") * 1;
        }
        // 比較対象の項目を結合 (数値に変換)
        // もしlocalStorageにKeyがある
        display.innerHTML = "";
        if (localStorage.getItem(key)) {

            // 今回のプレイが最高記録(Assistの有無に関わらず今回のプレイと同じ横×縦の記録を元に比較)であれば表示

            if (combinedKey(0) * 1 == 0) { // もしAssist未使用時の記録が0なら
                if (combinedKey(1) * 1 > combinedThreshold * 1) { // もしAssist使用時の記録が今回の記録より短いなら
                    display.innerHTML = text;
                }
            } else if (combinedKey(1) * 1 == 0) { // もしAssist使用時の記録が0なら
                if (combinedKey(0) * 1 > combinedThreshold * 1) { // もしAssist未使用時の記録が今回の記録より短いなら
                    display.innerHTML = text;
                }
            } else { // もしAssist未使用時の記録もAssist使用時の記録も0でないなら
                if ((combinedKey(0) * 1 > combinedThreshold * 1) && (combinedKey(1) * 1 > combinedThreshold * 1)) { // もしAssist未使用時の記録もAssist使用時の記録も 今回の記録より短いなら
                    display.innerHTML = text;
                }
            }

            // もし現在の比較対象が最高の記録なら
            // もしSortAssistが無効なら左側と比較 もしSortAssistが有効なら右側と比較
            if ((combinedKey(isSortAssistValid ? 1 : 0) * 1 > combinedThreshold * 1) || (combinedKey(isSortAssistValid ? 1 : 0) * 1 == 0)) {
                // 新記録を保存
                console.log("newRecord");
                if (isSortAssistValid) {
                    // SortAssist が on  なら 従来の記録 | 今回の記録 を保存し
                    localStorage.setItem(key, `${localStorage.getItem(key).split(" | ")[0]} | ${saveContent}`);
                } else {
                    // SortAssist が off なら 今回の記録 | 従来の記録 を保存
                    localStorage.setItem(key, `${saveContent} | ${localStorage.getItem(key).split(" | ").length == 1 ? 0 : localStorage.getItem(key).split(" | ")[1]}`);
                }
            }

        // もしlocalStorageにKeyがない
        } else {
            // SortAssist が on  なら 従来の記録 | 今回の記録 を保存し
            if (isSortAssistValid) {
                localStorage.setItem(key, `0 | ${saveContent}`);
            } else {
                // SortAssist が off なら 今回の記録 | 従来の記録 を保存
                localStorage.setItem(key, `${saveContent} | 0`);
            }
            display.innerHTML = text;
        }
        localStorage.getItem(key).split(" | ")[0].split(",");
    }
    localStorageKey1 = (`slidePuzzlePlayLog_Time${blockCaseWidth} × ${blockCaseHeight}`)
    localStorageKey2 = (`slidePuzzlePlayLog_Steps${blockCaseWidth} × ${blockCaseHeight}`)
    const localStorageKey1SaveContent = `${formattedHr}, ${formattedMin}, ${formattedSec}`;
    const localStorageKey2SaveContent = steps;
    newRecordJudgeAndSave(localStorageKey1, [formattedHr, formattedMin, formattedSec], localStorageKey1SaveContent, formattedDate(), timeInfoDisplay,  `<span class="subText">${blockCaseWidth} × ${blockCaseHeight}${recordFastestMassage}</span>`); 
    newRecordJudgeAndSave(localStorageKey2, [steps],                                   localStorageKey2SaveContent, formattedDate(), stepsInfoDisplay, `<span class="subText">${blockCaseWidth} × ${blockCaseHeight}${recordLeastMassage}</span>`);
}

function getRecordArray(x, y) {
    let getBlockCandidate = [];
    let getBlockCaseWidth = 1;
    let getBlockCaseHeight = 1;
    while (getBlockCaseWidth * getBlockCaseHeight < blockCaseWidthMax * blockCaseHeightMax) {
        const getLocalStorageKey1 = (`slidePuzzlePlayLog_Time${getBlockCaseWidth} × ${getBlockCaseHeight}`)
        const getLocalStorageKey2 = (`slidePuzzlePlayLog_Steps${getBlockCaseWidth} × ${getBlockCaseHeight}`)
        if (localStorage.getItem(getLocalStorageKey1)) {
            getBlockCandidate.push((`
${getBlockCaseWidth} × ${getBlockCaseHeight},
${localStorage.getItem(getLocalStorageKey1).split(" | ")[0].replaceAll(",", " :")},
${localStorage.getItem(getLocalStorageKey1).split(" | ").length != 2 ? 0 : localStorage.getItem(getLocalStorageKey1).split(" | ")[1].replaceAll(",", " :")},
${localStorage.getItem(getLocalStorageKey2).split(" | ")[0]},
${localStorage.getItem(getLocalStorageKey2).split(" | ").length != 2 ? 0 : localStorage.getItem(getLocalStorageKey2).split(" | ")[1]}
`).replaceAll("\n", "").split(","));
        }
        if (getBlockCaseHeight < blockCaseHeightMax) {
            getBlockCaseHeight += 1;
        } else {
            getBlockCaseHeight = 1;
            getBlockCaseWidth += 1;
        }
    }
    if (x != undefined && y != undefined) {
        for (let i_ls = 0; i_ls < getBlockCandidate.length; i_ls += 1) {
            if (getBlockCandidate[i_ls][0] == `${x} × ${y}`) {
                return getBlockCandidate[i_ls];
            }
        }
    } else {
        return getBlockCandidate;
    }
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
    bottomBarTimeSteps.innerText = bottomBarMessegeArray[4];
    blockCaseChangeOp.querySelector("p").innerText = `${blockCaseChangeOpMessage}${blockCaseWidth} × ${blockCaseHeight}`;
    bottomBarChangeOp.querySelector("p").innerText = `${bottomBarChangeOpMessage}${bottomBarMessegeArray[bottomBarContent]}`;
    recordResetOp.querySelector("p").innerText = recordResetOpMessage;
    colorThemeChangeOp.querySelector("p").innerText = `${colorThemeOpMessage}${darkThemeChange() ? darkThemeMessage : lightThemeMessage}`;
    vibrationValidChangeOp.querySelector("p").innerText = `${vibrationValidChangeOpMessage}${isVibrationValid ? validMessage : invalidMessage}`;
    sortAssistValidChangeOp.querySelector("p").innerText = `${sortAssistValidChangeOpMessage}${isSortAssistValid ? validMessage : invalidMessage}`;
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
    recordDisplay();
    if (darkThemeChange()) {
        document.documentElement.style.setProperty("--documentBaseColor", "black");
    }
    recordListUpdate();
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
    challengesJudgeAndDisplayUpdate();
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
                timerStart(formattedHr,formattedMin,formattedSec);
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

function challengesJudgeAndDisplayUpdate() {
    formattedTimes();
    const challengesArray = [
        [3, 3,   0, 0, 20],
        [3, 3,   40],
        [3, 4,   0, 0, 30],
        [3, 4,   60],
        [4, 4,   0, 1, 20],
        [4, 4,   80],
        [5, 5,   0, 2, 30],
        [5, 5,   150],
        [6, 6,   0, 4, 0],
        [6, 6,   250],
        [7, 7,   0, 6, 0],
        [7, 7,   350],
        [8, 8,   0, 8, 0],
        [8, 8,   1200],
        [10, 10, 0, 15, 0],
        [10, 10, 2500],
        [12, 12, 0, 25, 0],
        [12, 12, 5000],
        [15, 15, 0, 30, 0],
        [15, 15, 7500],
        [20, 20, 0, 40, 0],
        [20, 20, 10000]
                        ];
    const challengesListTable = challengesListPopup.querySelector(".table");
    challengesListTable.querySelectorAll(".challenge").forEach(challenge => {
        challenge.remove();
    });
    for (let i = 0; challengesArray.length > i; i += 1) {
        const challenge = challengesArray[i];

        if (challengesListTable.querySelectorAll("div.challenge").length + 1 !== challengesArray.length) {
            function listGenerate(text) {
                challengesListTable.innerHTML += `
                <div class="c_${i + 1} challenge">
                    <p>${text} ${challengesListMessage}</p>
                </div>
                `;
            }

            if (challenge.length == 3) {
                listGenerate(`${challenge[0]} × ${challenge[1]} | ${challenge[2]}手`)
            } else {
                // const formattedTimesArray = [
                //     formattedTimes(challenge[2] * 1, challenge[3] * 1, challenge[4] * 1)[0],
                //     formattedTimes(challenge[2] * 1, challenge[3] * 1, challenge[4] * 1)[1],
                //     formattedTimes(challenge[2] * 1, challenge[3] * 1, challenge[4] * 1)[2].split(".")[0]
                // ];
                const formattedTimesArray = [
                    challenge[2] * 1,
                    challenge[3] * 1,
                    challenge[4] * 1
                ];
                listGenerate(`
                    ${challenge[0]} × ${challenge[1]} | ${formatTimes_String(formattedTimesArray[0], formattedTimesArray[1], formattedTimesArray[2])}
                    `)
            }
        }

        function clearIconGenerate(c, assist = false) {
            console.log(challengesListPopup.querySelector(c).querySelector("p"));

            challengesListPopup.querySelector(c).innerHTML += `
            <div class="challengeClearIcon">
            ${okIconImg}
            </div>
            `;
            if (assist) { 
                challengesListPopup.querySelector(c).querySelector(".challengeClearIcon").innerHTML += `<span>(${sortAssistShortNameMessage})</span>`;
                challengesListPopup.querySelector(c).querySelector(".challengeClearIcon").classList.add("assist");
            }
        }
        for (let i_ls = 0; i_ls < getRecordArray().length; i_ls += 1) {
            if (getRecordArray()[i_ls][0] == `${challenge[0]} × ${challenge[1]}`) {
                if (challenge.length == 3) {
                    // 手数のみの場合
                    // Assistの有無に関わらず、手数が短い場合
                    // (challenge : Challenge検証番目の配列)
                    if (getRecordArray()[i_ls][getRecordArray_Steps] * 1       < challenge[2] * 1 ||
                        getRecordArray()[i_ls][getRecordArray_StepsAssist] * 1 < challenge[2] * 1) {
                        if (getRecordArray()[i_ls][getRecordArray_Steps] < challenge[2] * 1 && (getRecordArray()[i_ls][getRecordArray_Steps] * 1 !== 0)) {
                            // Assist不使用で適合
                            clearIconGenerate(`.c_${i + 1}`, false);
                        } else if (getRecordArray()[i_ls][getRecordArray_StepsAssist] < challenge[2] * 1 && (getRecordArray()[i_ls][getRecordArray_StepsAssist] * 1 !== 0)) {
                            // Assist使用で適合
                            clearIconGenerate(`.c_${i + 1}`, true);
                        }
                    }
                } else {
                    // 時間のみの場合
                    // 特定の過去の記録の配列
                    const splitedRecordArray       = getRecordArray()[i_ls][getRecordArray_Time].split(" : ");
                    // 特定の過去のAssist使用時の記録の配列
                    const splitedRecordArrayAssist = getRecordArray()[i_ls][getRecordArray_TimeAssist].split(" : ");
                    // Assist不使用の記録がクリアできるか
                    const normalTimeCleared        = splitedRecordArray[0] * 10000       + splitedRecordArray[1] * 100       + splitedRecordArray[2] * 1       < challenge[2] * 10000 + challenge[3] * 100 + challenge[4] * 1;
                    // Assist使用の記録がクリアできるか 
                    const assistTimeCleared        = splitedRecordArrayAssist[0] * 10000 + splitedRecordArrayAssist[1] * 100 + splitedRecordArrayAssist[2] * 1 < challenge[2] * 10000 + challenge[3] * 100 + challenge[4] * 1;

                    // Assistの使用に関わらず適合
                    if (normalTimeCleared || assistTimeCleared) {
                        if (normalTimeCleared && (normalTimeCleared * 1 !== 0)) {
                            // Assist不使用で適合
                            clearIconGenerate(`.c_${i + 1}`, false);
                        } else if (assistTimeCleared && (assistTimeCleared * 1 !== 0)) {
                            // Assist使用で適合
                            clearIconGenerate(`.c_${i + 1}`, true);
                        }
                    }
                }
            }
        }
    }
}

challengesJudgeAndDisplayUpdate();

function gameClearBlockAnimationColor() {
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
    return clearedBlockBCArraySelect;
}

function gameClear() {
    allBlockBCBlack();
    opacityUndo(sortAssistValidChangeOp.querySelector("p"));
    document.documentElement.style.setProperty("--clearedBlockAnimationBC", gameClearBlockAnimationColor());
    timerStop();
    saveToLocalStorage();
    challengesJudgeAndDisplayUpdate();
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

function allBlockBCBlack() {
    for (let i = 0; i < blockCaseWidth * blockCaseHeight - 1; i += 1) {
        const target = blocks.querySelector(`.block${i + 1}`);
        target.style.backgroundColor = "black";
        target.style.boxShadow = "0 0 0px 0px gray inset";
    }
}

function sortAssist() {
    let judgeIndex = 0;
    let secberCleared = 0;
    // 検証する番目のブロックに検証する番目のclassがある (位置が合致している数)
    while (judgeIndex == secberCleared) {
        if (block[judgeIndex].classList.contains(`block${judgeIndex + 1}`)) {
            secberCleared += 1;
        }
        judgeIndex += 1;
    }
    if (gameClearJudge() !== 0) {
        const assistBlock1 = blocks.querySelector(`.block${Math.min(secberCleared + 1, blockCaseWidth * blockCaseHeight - 1)}`);
        const assistBlock2 = blocks.querySelector(`.block${Math.min(secberCleared + 2, blockCaseWidth * blockCaseHeight - 1)}`);
        assistBlock1.style.boxShadow = `0 0 calc(var(--blockSide) / 2) calc(var(--blockSide) / 4) gray inset`;
        assistBlock2.style.boxShadow = `0 0 calc(var(--blockSide) / 8) calc(var(--blockSide) / 16) gray inset`;
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

    // Assist
    if (isOperated && isSortAssistValid) {
        allBlockBCBlack();
        sortAssist();
    }
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
    timerStop();
    if (timerNumberIsZero()) {
        topTitle.innerText = `${blockCaseWidth} × ${blockCaseHeight}`;
        localStorageKey1   = (`slidePuzzlePlayLog_Time${blockCaseWidth} × ${blockCaseHeight}`)
        localStorageKey2   = (`slidePuzzlePlayLog_Steps${blockCaseWidth} × ${blockCaseHeight}`)
        if (localStorage.getItem(localStorageKey1) && localStorage.getItem(localStorageKey2)) {
            timeDisplay.innerHTML  = `${timerIconImg} <span class="subText">${blockCaseWidth} × ${blockCaseHeight}${recordFastestMassage}</span> :<br>${
                // Assistなしの時間が存在しない場合
                getRecordArray(blockCaseWidth, blockCaseHeight)[getRecordArray_Time].replaceAll(" : ", "") == 0 ?
                    // Assistありの時間を表示
                    `${getRecordArray(blockCaseWidth, blockCaseHeight)[getRecordArray_TimeAssist]}<br><span class="subText">(${sortAssistShortNameMessage})</span>` :
                    // Assistありの記録が存在しない場合
                    getRecordArray(blockCaseWidth, blockCaseHeight)[getRecordArray_TimeAssist].replaceAll(" : ", "") == 0 ?
                        // Assistなしの記録を表示
                        getRecordArray(blockCaseWidth, blockCaseHeight)[getRecordArray_Time] :
                        // そうではなければ(いずれも該当しない､両方の数字が存在するなら)短い方を表示する
                        getRecordArray(blockCaseWidth, blockCaseHeight)[getRecordArray_Time].replaceAll(" : ", "") * 1 > getRecordArray(blockCaseWidth, blockCaseHeight)[getRecordArray_TimeAssist].replaceAll(" : ", "") * 1 ?
                            `${getRecordArray(blockCaseWidth, blockCaseHeight)[getRecordArray_TimeAssist]}<br><span class="subText">(${sortAssistShortNameMessage})</span>` :
                            getRecordArray(blockCaseWidth, blockCaseHeight)[getRecordArray_Time]
            }`;
            stepsDisplay.innerHTML = `${stepsIconImg} <span class="subText">${blockCaseWidth} × ${blockCaseHeight}${recordLeastMassage}</span> :<br>${
                // Assistなしの手数が存在しない場合
                getRecordArray(blockCaseWidth, blockCaseHeight)[getRecordArray_Steps].replaceAll(" : ", "") == 0 ?
                    // Assistありの手数を表示
                    `${getRecordArray(blockCaseWidth, blockCaseHeight)[getRecordArray_StepsAssist]}<br><span class="subText">(${sortAssistShortNameMessage})</span>` :
                    // Assistありの手数が存在しない場合
                    getRecordArray(blockCaseWidth, blockCaseHeight)[getRecordArray_StepsAssist].replaceAll(" : ", "") == 0 ?
                            // Assistなしの手数を表示
                            getRecordArray(blockCaseWidth, blockCaseHeight)[getRecordArray_Steps] :
                            // そうではなければ(いずれも該当しない､両方の数字が存在するなら)短い方を表示する
                            getRecordArray(blockCaseWidth, blockCaseHeight)[getRecordArray_Steps].replaceAll(" : ", "") * 1 > getRecordArray(blockCaseWidth, blockCaseHeight)[getRecordArray_StepsAssist].replaceAll(" : ", "") * 1 ?
                                `${getRecordArray(blockCaseWidth, blockCaseHeight)[getRecordArray_StepsAssist]}<br><span class="subText">(${sortAssistShortNameMessage})</span>` :
                                getRecordArray(blockCaseWidth, blockCaseHeight)[getRecordArray_Steps]
            }`;
        } else {
            timeDisplay.innerHTML      = noRecordMassage;
            stepsDisplay.innerText     = "";
            timeInfoDisplay.innerText  = "";
            stepsInfoDisplay.innerText = "";
        }
        imgUserOperationLock();
    } else {
        topTitle.innerHTML = `${blockCaseWidth} × ${blockCaseHeight} <span class="subText">${isSortAssistValid ? sortAssistShortNameMessage : ""}</span>`;
        timeDisplay.innerHTML = `${timerIconImg} ${formattedTimes()}`;
        stepsDisplay.innerHTML = `${stepsIconImg} ${steps}`;
        timerIconHandsUpdate();
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
                    if (isSortAssistValid) {
                        sortAssist();
                    }
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

challengesListOp.addEventListener("click", () => {
    popupToggle(challengesListPopup);
});

blockCaseChangeOp.addEventListener("click", () => {
    popupToggle(blockCaseChangePopup);
});

bottomBarChangeOp.addEventListener("click", () => {
    popupToggle(bottomBarChangePopup);
});

function recordListUpdate() {
    recordArrayDisplay.innerHTML = "";
    for (let i = 0; i < getRecordArray().length; i += 1 ) {
        recordArrayDisplay.innerHTML += `<div class="recordLogs"><p>
        ${getRecordArray()[i][getRecordArray_CaseSize]}<br>
        ${sortAssistShortNameMessage} : ${invalidMessage} | 
        ${getRecordArray()[i][getRecordArray_Time]        == 0 ? noRecordMassage : formatTimes_String(getRecordArray()[i][getRecordArray_Time]      .split(" : ")[0], getRecordArray()[i][getRecordArray_Time]      .split(" : ")[1], getRecordArray()[i][getRecordArray_Time]      .split(" : ")[2])}
        ${getRecordArray()[i][getRecordArray_Steps]       == 0 ? ""              : ` | ${getRecordArray()[i][getRecordArray_Steps]}手`}<br>
        ${sortAssistShortNameMessage} : ${validMessage} | 
        ${getRecordArray()[i][getRecordArray_TimeAssist]  == 0 ? noRecordMassage : formatTimes_String(getRecordArray()[i][getRecordArray_TimeAssist].split(" : ")[0], getRecordArray()[i][getRecordArray_TimeAssist].split(" : ")[1], getRecordArray()[i][getRecordArray_TimeAssist].split(" : ")[2])}
        ${getRecordArray()[i][getRecordArray_StepsAssist] == 0 ? ""              : ` | ${getRecordArray()[i][getRecordArray_StepsAssist]}手`}
        </p></div>`;
        // == "true" ? `${sortAssistValidChangeOpMessage}${validMessage}` : `${sortAssistValidChangeOpMessage}${invalidMessage}`}
    }
}

function recordRemove() {
    recordListUpdate();
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
                    ${trashBoxIconImg}
                </div>`;
                log.querySelector(".confirmDeletionDisplayAnimation").addEventListener("click", () => {
                    localStorage.removeItem(`slidePuzzlePlayLog_Time${log.innerText.split("\n")[0]}`);
                    localStorage.removeItem(`slidePuzzlePlayLog_Steps${log.innerText.split("\n")[0]}`);
                    log.classList.add("deleteRecordAnimation");
                    let fillLine = false;
                    recordArrayDisplay.scrollBy({ left: 0, top: -recordLogs[0].scrollHeight - 11, behavior: "smooth" });
                    recordLogs.forEach((recordLogs) => {
                    if (fillLine) {
                        recordLogs.classList.add("recordFillLinesAnimation");
                    }
                    if (recordLogs === log) {
                        fillLine = true;
                    }
                    });
                    setTimeout(() => {
                        recordListUpdate();
                        log.remove();
                        recordRemove();
                    }, 240);
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

sortAssistValidChangeOp.addEventListener("click", () => {
    if (steps == 0 || isGameClear || timerNumberIsZero()) {
        isSortAssistValid = !isSortAssistValid;
        if (!isSortAssistValid) {
            allBlockBCBlack();
        } else {
            if (steps == 0 || isGameClear) {
                sortAssist();
            }
        }
        // recordDisplay();
        localStorage.setItem(sortAssistValidLKey, isSortAssistValid ? "true" : "false");
        optionMenuItemsUpdate();
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
    if (localStorage.getItem(sortAssistValidLKey)) {
        if (localStorage.getItem(sortAssistValidLKey) == "true") {
            isSortAssistValid = true;
        } else {
            isSortAssistValid = false;
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
            HTMLTitleUpdate();
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
        bottomBarContentUpdate();
    }, 200);
    bottomBarContentUpdate(true);
    timerStop();
    popupHidden();
    opacityMitigation(retryBtn);
    opacityUndo(sortAssistValidChangeOp.querySelector("p"));
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
            if (e.buttons & 1 || e.touches[0]) {
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
        // localStorage.setItem(`slidePuzzlePlayLog_Time${Math.floor(Math.random() * 20)} × ${Math.floor(Math.random() * 20)}`, "00:00:00.00");
    }
});