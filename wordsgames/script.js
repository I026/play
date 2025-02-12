// const inputText = document.getElementById("inputText");
// const outputText = document.getElementById("outputText");
// const stageDisplay = document.getElementById("stageDisplay");
// const nextBtn = document.getElementById("nextBtn");

// let when; // いつ
// let where; // どこで
// let who; // 誰が
// let withWhom; // 誰と
// let what; // 何をした
// let stage = 0;

// nextBtn.addEventListener("click", () => {
//     if (! inputText.value == "") {
//         stage += 1;
//         if (stage == 1) {
//             when = inputText.value;
//         }
//         if (stage == 2) {
//             where = inputText.value;
//         }
//         if (stage == 3) {
//             who = inputText.value;
//         }
//         if (stage == 4) {
//             withWhom = inputText.value;
//         }
//         if (stage == 5) {
//             what = inputText.value;
//         }
//         if (stage >= 6) {
//             stageDisplay.innerText = when,where,who,withWhom,what;
//         } else {
//             stageDisplay.innerText = stage;
//             inputText.value = "";
//         }
//         console.log(when,where,who,withWhom,what);
//     }
// });

const inputTextForm = document.getElementById("inputTextForm");
const inputText = inputTextForm.querySelector("input");
const outputText = document.getElementById("outputText");
const displaySeason = document.getElementById("displaySeason");
const displayStage = document.getElementById("displayStage");
const nextBtn = document.getElementById("nextBtn");
const nextBtnText = nextBtn.querySelector("span");

let article = "";
let season = 0;
let stage = 0;
const words = ["いつ","どこで","誰が","誰と","何をした"]
let lastSeason = 1 - 1;
const lastStage = words.length;



function inputValueNone() {
    nextBtnText.classList.add("blinkAnimetion");
    nextBtnText.innerText = "入力してください…";
    setTimeout(() => {
        nextBtnText.innerText = "入力を終了";
        nextBtnText.classList.remove("blinkAnimetion");
    }, 2000);
}

function nextPerson() {
    nextBtnText.innerText = "デバイスを次の人へ手渡します…";
    nextBtnText.classList.add("blinkAnimetion");
    setTimeout(() => {
        if (!nowLast) {    
            nextBtnText.innerText = "入力を終了";
            nextBtnText.classList.remove("blinkAnimetion");
        }
    }, 2000);
}

function articleUpdate() {
    if (!(stage == 0)) {
        article += inputText.value;
    } else {
        article += `${inputText.value}<br>`;
    }
    if (!(season == lastSeason && stage == lastStage)) {
        inputText.placeholder = `${words[stage]}?`;
    }
}

let nowLast = false

function last() {
    nowLast = true;
    inputText.classList.add("opacityMinAnimetion");
    inputText.disabled = true;
    nextBtn.classList.add("lastAnimetion");
    nextBtnText.innerText = "すべての言葉が揃いました…";
    nextBtnText.classList.add("blinkAnimetion");
    setTimeout(() => {
        nextBtnText.innerText = "タップして文章を表示します…";
        nextBtnText.classList.remove("blinkAnimetion");
    }, 2000);
}

function result() {
    nextBtn.addEventListener("click", () => {
        nextBtnText.innerText = "もう一度…";
        displaySeason.innerText = "";
        displayStage.innerHTML = article;
        nextBtn.addEventListener("click", () => {
            season = 0;
            stage = 0;
            nextBtn.classList.remove("lastAnimetion");
            inputText.classList.remove("opacityMinAnimetion");
            inputText.disabled = false;
            nowLast = false;
            nextBtnText.innerText = "入力を終了";
            inputText.placeholder = `${words[stage]}?`;
            stageProgressUpdate();
        });
    });
    // outputText.innerHTML = article.split(",").map(part => `<span>${part}</span>`).join("､ ");
    // alert(outputText);
}

function stageUp() {
    if (stage !== lastStage + 1) {
        stage += 1;
    }
    if (stage >= lastStage && season !== lastSeason) {
        stage = 0;
        season += 1;
    }
    if (season == lastSeason && stage == lastStage) {
        last();
    } else {
        stageProgressUpdate();
    }
}

function stageProgressUpdate() {
    displaySeason.innerHTML = `ラウンド : ${season + 1} / ${lastSeason + 1}`
    displayStage.innerHTML = `ステージ : ${stage + 1} / ${lastStage}`
}

stageProgressUpdate();

displaySeason.addEventListener("click", () => {
    if (stage == 0 && season == 0) {
        lastSeason += 1;
        if (lastSeason > 4) {
            lastSeason = 0;
        }
        console.log(stage,season);
    }
    stageProgressUpdate();
});

function nextStage() {
    if (!inputText.value == "" || inputText.disabled == true) {
        stageUp();
        articleUpdate();
        inputText.value = "";
        if (inputText.disabled == true) {
            result();
        } else {
            nextPerson();
        }
        console.log(
            ` article: ${article} \n season: ${season} \n stage: ${stage}`
        );
    } else {
        inputValueNone();
    }
}

nextBtn.addEventListener("click", () => {
    nextStage();
});

inputTextForm.addEventListener("submit", (event) => {
    event.preventDefault();
    nextStage();
});