let click = false;
let currentColor = "black"
let rgbMode = false

document.addEventListener("DOMContentLoaded", function () {
    createBoard(16);

    document.querySelector("body").addEventListener("click", function (e) {
        if (e.target.tagName != "BUTTON") {
            click = !click;
            let draw = document.querySelector("#draw");
            if (click) {
                draw.innerHTML = "Now you can draw"
            }
            else {
                draw.innerHTML = "Click to draw"
            }
        }
    })

    let btn_popup = document.querySelector("#popup")
    btn_popup.addEventListener("click", function () {
        let size = getSize();
        createBoard(size);
    })
}
)

function createBoard(size) {
    let board = document.getElementById("board");
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    let numDivs = size * size

    for (let i = 0; i < numDivs; i++) {
        let div = document.createElement("div");
        div.addEventListener("mouseover", function () {
            if (click) {
                console.log(div.style.backgroundColor)
                if (div.style.backgroundColor == "") {
                    div.style.backgroundColor = currentColor
                    if (rgbMode) {
                        div.style.backgroundColor = changeColor()
                    }
                }
                else {
                    let currentrgbArray = toRGBArray(div.style.backgroundColor)
                    currentrgbArray[0] -= 10
                    currentrgbArray[1] -= 10
                    currentrgbArray[2] -= 10
                    div.style.backgroundColor = "rgb(" + currentrgbArray[0] + "," + currentrgbArray[1] + ", " + currentrgbArray[2] + ")"
                }
            }
        })
        board.insertAdjacentElement("beforeend", div);
    }
}

function changeColor() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

// const toRGBArray = rgbStr => rgbStr.match(/\d+/g).map(Number);
function toRGBArray(rgbStr) {
    return rgbStr.match(/\d+/g).map(Number);
}

function toggleRGB() {
    rgbMode = !rgbMode
    document.getElementById("rgbButton").innerText = rgbMode ? "RGB" : "Black"
}

function getSize() {
    let input = prompt("What will the board size?");
    let message = document.querySelector("#message");
    if (input == "") {
        message.innerHTML = "Please provide a number";
    }
    else if (input < 0 || input > 100) {
        message.innerHTML = "Enter a number between 1 and 100"
    }
    else {
        message.innerHTML = "LET'S DO IT"
        return input;
    }
}

function resetBoard() {
    let divs = document.getElementById("board").childNodes
    divs.forEach((div) => div.style.backgroundColor = "")
}