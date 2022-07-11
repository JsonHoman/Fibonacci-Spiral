let isAnimationActive = false;
let intervalId;
function toggleAnimation() {

    let button = document.getElementById("button");
    isAnimationActive = !isAnimationActive;

    if (isAnimationActive) {
        console.log("Start animation");
        button.innerText = "Stop";
        intervalId = setInterval(() => { createBlock() }, 1000);
    } else {
        console.log("Stop animation");
        console.log("--------------");
        button.innerText = "Start";
        clearInterval(intervalId);
    }
}
  
let blockCount = 0;
function createBlock() {
    let container = document.getElementById("container");
    let newBlock = document.createElement("div");
    let multiplier = .61797753;

    container.appendChild(newBlock);
    blockCount++;
    console.log(blockCount-1 + ". Appended block index number");

    let size = fibonacci(blockCount);

    newBlock.style.width = size + "px";
    newBlock.style.height = size + "px";
    

    newBlock.style.bottom = (findYCoordinate(container, size, multiplier) * multiplier) + "px";
    newBlock.style.left = (findXCoordinate(container, size, multiplier) * multiplier) + "px";

    // newBlock.style.setProperty("block-size", size + "px");
    // didn't create with the block-size variable

    newBlock.setAttribute("class", "block");

    scaleBlockSizes(multiplier);

    newBlock.style.background = generateHexColor(blockCount);
}

function fibonacci(blockCount) {
    let size; 
    let fib;
    let nMinus1 = 1;
    let nMinus2 = 0;

    let multiplier = 10;

    if (blockCount === 1) {
        fib = 1;
    } else {
        for (var i = 1; i < blockCount; i++) {
            fib = (nMinus2 + nMinus1);
            nMinus2 = nMinus1;
            nMinus1 = fib;
        }
    }

    size = fib * multiplier;

    console.log("size: " + size);
    return size;
}

function scaleBlockSizes(multiplier) {

    // the new calculations for positioning aren't being taken into consideration

    let container = document.getElementById("container");

    for (var i = 0; i < container.children.length - 1; i++) {
        let originalWidth = container.children[i].clientWidth;
        let originalHeight = container.children[i].clientHeight;

        let bottom = window.getComputedStyle(container.children[i]).bottom;
        let left = window.getComputedStyle(container.children[i]).left;

        console.log("!!!!!!!!!!!!!")
        console.log(bottom)
        console.log(left)


        container.children[i].style.bottom = (bottom.replace("px", "") * multiplier) + "px";
        container.children[i].style.left = (left.replace("px", "") * multiplier) + "px";
    }
}

// function getOffset(el) {
//     const rect = el.getBoundingClientRect();
// console.log("RECT" + rect);
//     return {
//         top: rect.top + window.scrollY,
//         left: rect.left + window.scrollX
//     };
// }

function generateHexColor(blockCount) {
    let color;
    let caseNumber = blockCount % 6;

    switch(caseNumber) {
        case 1:
            color = "red";
            break;
        case 2:
            color = "orange";
            break;
        case 3:
            color = "yellow";
            break;
        case 4:
            color = "green";
            break;
        case 5:
            color = "blue";
            break;
        case 0:
            color = "purple";
            break;
    }

    console.log("hexColor generated: " + color);
    return color;
}

let ySizeArray = [];
let yCoordinateArray = [];  
function findYCoordinate(container, size, multiplier) {
    let yCoordinate;
    
    let elementCount = container.childElementCount;
    let directionCase = getDirection(elementCount);

    switch (directionCase) {
        case -1:// ORIGIN BLOCK
            yCoordinate = 0;

            break;
        case 0:// SOUTH !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            yCoordinate = -size;

            for (let i = ySizeArray.length-4; i>0; i-=4) {
                yCoordinate += -ySizeArray[i];
            }

            break;
        case 1:// WEST  
            yCoordinate = yCoordinateArray[yCoordinateArray.length-1];

            break;
        case 2:// NORTH
            // size of origin
            yCoordinate = 10;

            for (let i = ySizeArray.length-4; i>0; i-=4) {
                yCoordinate += ySizeArray[i];
            }

            break;
        case 3:// EAST
            yCoordinate = yCoordinateArray[yCoordinateArray.length-2];

            break;
    }

    // scale the size array by the multiplier
    // ySizeArray.forEach(size => {
    //     size *= multiplier;
    //     console.log("y mult size: " + size);
    // });

    for (let i = 0; i < ySizeArray.length - 1; i++) {
        ySizeArray[i] = ySizeArray[i] * multiplier;
        console.log("y mult size: " + size);
    }

    ySizeArray.push(size);
    yCoordinateArray.push(yCoordinate);

    console.log("ySizeArray: " + ySizeArray);
    console.log("yCoordinateArray: " + yCoordinateArray);
    return yCoordinate; 
}

let xSizeArray = [];
let xCoordinateArray = [];
function findXCoordinate(container, size, multiplier) {
    let xCoordinate;
    
    let elementCount = container.childElementCount;
    let directionCase = getDirection(elementCount);

    switch (directionCase) {
        case -1:// START BLOCK
            xCoordinate = 0;

            break;
        case 0:// SOUTH
            xCoordinate = xCoordinateArray[xCoordinateArray.length-2];

            break;
        case 1:// WEST
            xCoordinate = -size;

            for (let i = xSizeArray.length-4; i>0; i-=4) {
                xCoordinate += -xSizeArray[i];
            }

            break;
        case 2:// NORTH
            xCoordinate = xCoordinateArray[xCoordinateArray.length-1];

            break;
        case 3:// EAST

            // ISSUES ON NUM 6
            xCoordinate = 10;

            for (let i = xSizeArray.length-4; i>0; i-=4) {
                xCoordinate += xSizeArray[i];
            }

            break;
    }

    // scale the size array by the multiplier
    // xSizeArray.forEach(size => {
    //     size *= multiplier;
    //     console.log("x mult size: " + size);
    // });

    for (let i = 0; i < xSizeArray.length - 1; i++) {
        xSizeArray[i] = xSizeArray[i] * multiplier;
        console.log("x mult size: " + size);
    }

    xSizeArray.push(size);
    xCoordinateArray.push(xCoordinate);

    console.log("xSizeArray: " + xSizeArray);
    console.log("xCoordinateArray: " + xCoordinateArray);
    return xCoordinate;
}

function getDirection(elementCount) {
    let direction;

    if (elementCount === 1) {
        direction = -1;
    } else {
        direction = elementCount % 4;
    }
    
    console.log("direction: " + direction);
    return direction;
}