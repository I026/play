const body = document.querySelector("body");
const TopContents = document.getElementById("TopContents");
const OutputText = document.getElementById("OutputText");
const StartStopBtn = document.getElementById("StartStopBtn");
let ItemsInput = document.getElementById("ItemsInput");
const ItemsInputBackground = document.querySelector(".ItemsInput")

let RouletteIsMoving = false;

let RouletteUpdate;

function Start() {
    RouletteIsMoving = true;
    StartStopBtn.innerText = "Stop";
    StartStopBtn.style.backgroundColor = "rgb(170, 200, 255)";
    RouletteUpdate = setInterval(() => {
        let SelectedItems;
        if (ItemsInput.value == "") {
            SelectedItems = "下に項目を入力…";
            Stop();
        } else {
            let RouletteItems = ItemsInput.value.split("\n");
            RouletteItems = RouletteItems.filter(item => item);
            SelectedItems = RouletteItems[Math.floor(Math.random() * RouletteItems.length)]
            OutputText.classList.remove("OpacityHalfStopAnimetion")
            OutputText.classList.add("OpacityHalfStartAnimetion")
        }
        OutputText.innerText = SelectedItems;
    }, 100);
}

function Stop() {
    RouletteIsMoving = false;
    StartStopBtn.innerText = "Start";
    StartStopBtn.style.backgroundColor = "rgb(255, 170, 170)";
    clearInterval(RouletteUpdate);
    OutputText.classList.remove("OpacityHalfStartAnimetion")
    OutputText.classList.add("OpacityHalfStopAnimetion")
}

function BtnToggle() {
    if (RouletteIsMoving) {
        Stop();
    } else {
        Start();
    }
}

function GetScrollRatio() {
    const ScrollTop = window.scrollY || document.documentElement.scrollTop;
    const DocHeight = document.documentElement.scrollHeight - window.innerHeight;
    const ScrollRatio = (ScrollTop / DocHeight);
    return ScrollRatio;
}

function btnPress() {
    StartStopBtn.style.transition = ".2s";
    StartStopBtn.style.height = "45px";
    StartStopBtn.style.width = `${-GetScrollRatio() * 150 + 245}px`;
    StartStopBtn.style.bottom = "82.5px";
    StartStopBtn.style.left = `calc(${GetScrollRatio() * 50 + 50}vw - 245px / 2)`;
    setTimeout(() => {
        StartStopBtn.style.transition = "0s";
    }, 200);
}

function btnRelease() {
    StartStopBtn.style.height = "50px";
    StartStopBtn.style.width = `${-GetScrollRatio() * 150 + 250}px`;
    StartStopBtn.style.bottom = "80px";
    StartStopBtn.style.left = `calc(${GetScrollRatio() * 50 + 50}vw - 250px / 2)`;
}

StartStopBtn.addEventListener("mousedown", () => {
    btnPress();
});

StartStopBtn.addEventListener("mouseup", () => {
    BtnToggle();
    btnRelease();
});

StartStopBtn.addEventListener("touchstart", () => {
    btnPress();
});

StartStopBtn.addEventListener("touchend", () => {
    event.preventDefault();
    BtnToggle();
    btnRelease();
});

document.addEventListener("keydown", () => {
    if (!(document.activeElement === ItemsInput) && event.code === "Space") {
        event.preventDefault();
        btnPress();
    }
});

document.addEventListener("keyup", () => {
    if (!(document.activeElement === ItemsInput) && event.code === "Space") {
        BtnToggle();
        btnRelease();
    }
});

window.addEventListener("scroll", () => {
    console.log();
    ItemsInputBackground.style.borderTopLeftRadius = `${GetScrollRatio() * 20}px`;
    ItemsInputBackground.style.borderTopRightRadius = `${GetScrollRatio() * 20}px`;
    ItemsInputBackground.style.opacity = GetScrollRatio();
    OutputText.style.top = `${-GetScrollRatio() * 30 + 30}vh`;
    OutputText.style.fontSize = `${-GetScrollRatio() * 1 + 2.8}em`;
    StartStopBtn.style.left = `calc(${GetScrollRatio() * 50 + 50}vw - 250px / 2)`;
    StartStopBtn.style.width = `${-GetScrollRatio() * 150 + 250}px`;
});