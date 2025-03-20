const blocks = document.getElementById("blocks");
let block = blocks.querySelectorAll("div");
// const block = blocks.querySelectorAll("div:not(.air)");
const air = blocks.querySelector(".air");

const blockCaseWidth = 4;
const blockCaseHeight = 5;
const blockTotal = blockCaseWidth * blockCaseHeight;

let targetBlock = 19;

let steps = 0;

function swipe() {
    block = blocks.querySelectorAll("div");
    console.log(`
        Step : ${steps}
        Target : ${targetBlock}
        `);
}

function swipeAnimetion(block,animetion) {
    block.classList.add(animetion);
    setTimeout(() => {
        block.classList.remove(animetion);
    }, parseFloat((getComputedStyle(document.documentElement).getPropertyValue("--swipeAnimetionDuration").trim())) * 1000);
    // parseFloat(getComputedStyle(block).animationDuration)
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
    if (!(targetBlock >= 16)) {
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

    if (Math.abs(difiX) > Math.abs(difiY)) {
        if (difiX < 50) {
            rightSwipe();
        } else if (difiX > -50) {
            leftSwipe();
        }
    } else if (Math.abs(difiX) < Math.abs(difiY)) {
        if (difiY < 50) {
            downSwipe();
        } else if (difiY > -50) {
            upSwipe();
        }
    }
}

function blockShuffle() {
    document.documentElement.style.setProperty("--swipeAnimetionDuration", ".01s");
    blocks.classList.add("opacityMitigationAnimtion");
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
            
            if (steps >= 500) {
                for (let i = 0; i < 5; i += 1) {
                    downSwipe();
                    rightSwipe();
                }
                clearInterval(shuffleRoop);
                document.documentElement.style.setProperty("--swipeAnimetionDuration", ".1s");
                steps = 0;
                blocks.classList.add("opacityUndoAnimtion");
                setTimeout(() => {
                    blocks.classList.remove("opacityMitigationAnimtion");
                }, 1000);
            }
        }, 1);
    }, 500);
};

blockShuffle();

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