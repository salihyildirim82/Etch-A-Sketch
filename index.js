const container = document.querySelector(".container");
let color = "black";

function createGrid(size){
    container.style.gridTemplateColumns = 'repeat(' + size + ',1fr)';
    for (let i = 0; i < size*size; i++) {
        let box = document.createElement('div');
        box.id='box'+i;
        box.classList.add('box');
        
        box.addEventListener('mouseenter',handleMouseOver);
        container.appendChild(box);        
    }
}

const handleMouseOver = (e) => {
    if (color == "random") {
        let c = () => Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${c()},${c()},${c()})`;
    } else if (color == "gray") {
        let rgba = window.getComputedStyle(e.target).backgroundColor;
        let rgbaVals = rgba.replace(/[^\d,]/g, '').split(',');
        [r, g, b, a] = rgbaVals.map(x => Number(x));
        if (r === g && g === b && r === b) {
            if (e.target.style.backgroundColor === "") {
                [r, g, b] = [229, 229, 229]
            } else {
                [r, g, b] = [r, g, b].map(x => x - 26);
            }
        } else {
            [r, g, b] = [229, 229, 229];
        }
        if (r < 0) {
            [r, g, b] = [0, 0, 0];
        }
        e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
    } else {
        e.target.style.backgroundColor = color;
    }
}

const updateColor = (e) => {
    color = e.target.value;
}

function resetBoxes(e){
    let alleBoxes=document.querySelectorAll('.box');
    alleBoxes.forEach(resetBox);
    let size = prompt('Please enter the grid size. Must be>0');
    createGrid(size);
}

function resetBox(box){
    container.removeChild(box);
}

document.querySelector('#color').addEventListener('change', updateColor);
createGrid(16);