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

function leftSwipe() {
    if (!((targetBlock % 4) == 0)) {
        steps += 1;
        targetBlock -= 1;
        console.log("Left");
        const temp = document.createElement("div");
        air.replaceWith(temp);
        block[targetBlock].replaceWith(air);
        temp.replaceWith(block[targetBlock]);
        swipe();
        // if (block[targetBlock - 1] == air) {
        // }
        // if (!(block[targetBlock - 1])){
        // }
    }
}

function rightSwipe() {
    // if (steps == 0) {
    //     targetBlock = 18;
    // }
    if (!((targetBlock + 1) % 4 == 0)) {
        // alert("S");
        steps += 1;
        targetBlock += 1;
        console.log("Right");
        const temp = document.createElement("div");
        air.replaceWith(temp);
        block[targetBlock].replaceWith(air);
        temp.replaceWith(block[targetBlock]);
        swipe();
    }
    // if (block[targetBlock + 1] == air) {
    // }
    // if (!(block[targetBlock + 1])){
    // }
}

function upSwipe() {
    if (!(targetBlock <= 3)) {
        steps += 1;
        targetBlock -= 4;
        console.log("Up");
        const temp = document.createElement("div");
        air.replaceWith(temp);
        block[targetBlock].replaceWith(air);
        temp.replaceWith(block[targetBlock]);
        swipe();
        // if (!(block[targetBlock - blockCaseWidth])){
        // }
    }
    // if (block[targetBlock - blockCaseWidth] < 0 || block[targetBlock - blockCaseWidth] > blockCaseWidth) {
    // }
}

function downSwipe() {
    if (!(targetBlock >= 16)) {
        steps += 1;
        targetBlock += 4;
        console.log("Down");
        const temp = document.createElement("div");
        air.replaceWith(temp);
        block[targetBlock].replaceWith(air);
        temp.replaceWith(block[targetBlock])
        swipe();
    }
    // if (!(block[targetBlock + blockCaseWidth])){
    // }
    // if (block[targetBlock + blockCaseWidth] < 0 || block[targetBlock + blockCaseWidth] > blockCaseWidth) {
    // }
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

document.addEventListener("mousedown", swipeStart);
document.addEventListener("mouseup", swipeEnd);
document.addEventListener("touchstart", swipeStart);
document.addEventListener("touchend", swipeEnd);

document.addEventListener("keyup",(event) => {
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