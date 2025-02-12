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
let lastSeason = 0;
const lastStage = words.length;

function blinkText(newtext,text) {
    nextBtnText.classList.add("blinkAnimetion");
    nextBtnText.innerText = newtext;
    setTimeout(() => {
        nextBtnText.innerText = text;
        nextBtnText.classList.remove("blinkAnimetion");
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
    // alert(resultPage);
    nowLast = true;
    inputText.classList.add("opacityMinAnimetion");
    inputText.disabled = true;
    nextBtn.classList.add("lastAnimetion");
    blinkText("すべての言葉が揃いました…","タップして文章を表示します…");
}

let resultPage = 0;

function result() {
    resultPage += 1;
    console.log(resultPage);
    if (resultPage == 2) {
        nextBtnText.innerText = "もう一度…";
        displaySeason.innerText = "";
        displayStage.innerHTML = article;
    }
    if (resultPage == 3) {
        season = 0;
        stage = 0;
        inputText.classList.remove("opacityMinAnimetion");
        nextBtn.classList.remove("lastAnimetion");
        inputText.disabled = false;
        nowLast = false;
        nextBtnText.innerText = "入力を終了";
        inputText.placeholder = `${words[stage]}?`;
        stageProgressUpdate();
        setTimeout(() => {
            article = "";
        }, 10);
        resultPage = 0;
    }
    // nextBtn.addEventListener("click", () => {
    //     nextBtnText.innerText = "もう一度…";
    //     displaySeason.innerText = "";
    //     displayStage.innerHTML = article;
    //     nextBtn.addEventListener("click", () => {
    //         season = 0;
    //         stage = 0;
    //         inputText.classList.remove("opacityMinAnimetion");
    //         nextBtn.classList.remove("lastAnimetion");
    //         inputText.disabled = false;
    //         nowLast = false;
    //         nextBtnText.innerText = "入力を終了";
    //         inputText.placeholder = `${words[stage]}?`;
    //         stageProgressUpdate();
    //         setTimeout(() => {
    //             article = "";
    //         }, 10);
    //     }, { once: true });
    // }, { once: true });
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
    displaySeason.innerHTML = `
    <span style="font-size: .75em; opacity: .75;" class="blinkAnimetion">タップで変更</span>
    <br>
    ラウンド : ${season + 1} / ${lastSeason + 1}`

    displayStage.innerHTML = `
    ステージ : ${stage + 1} / ${lastStage}`
}

stageProgressUpdate();

displaySeason.classList.add("opacityMinRoopAnimetion");

displaySeason.addEventListener("click", () => {
    if (stage == 0 && season == 0) {
        lastSeason += 1;
        if (lastSeason > 4) {
            lastSeason = 0;
        }
        stageProgressUpdate();
        console.log(stage,season);
    }
});

function nextStage() {
    if (!inputText.value == "" || inputText.disabled == true) {
        displaySeason.classList.remove("opacityMinRoopAnimetion");
        stageUp();
        articleUpdate();
        inputText.value = "";
        if (inputText.disabled == true) {
            result();
        } else {
            blinkText("デバイスを次の人へ手渡します…","入力を終了");
        }
        console.log(
            ` article: ${article} \n season: ${season} \n stage: ${stage}`
        );
    } else {
        blinkText("入力してください…","入力を終了");
    }
}

nextBtn.addEventListener("click", () => {
    nextStage();
});

inputTextForm.addEventListener("submit", (event) => {
    event.preventDefault();
    nextStage();
});

// setInterval(() => {
//     console.log(article);
// }, 1000);