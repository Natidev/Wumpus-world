const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d',{willReadFrequently:true});
const gridSize = 4;
const cellSize = canvas.width / gridSize;

const gold = new Image();
const wumpus = new Image();
const stink = new Image();
const breeze = new Image();
const pit = new Image();
const dude = new Image();
dude.src='./assets/dude.png'
gold.src = './assets/gold.avif'; 
breeze.src = './assets/breeze.jpg'; 
pit.src = './assets/pit.jpg'; 
stink.src = './assets/stink.png';
wumpus.src = './assets/wumpus.png';
ctx.fillStyle="grey"
const wumpusPos={x:3,y:1}
const pitPos={x:2,y:3}
ctx.fillRect(0,0,canvas.width,canvas.height)
const position={x:0,y:3}
// Draw the grid
for (let x = 0; x <= canvas.width; x += cellSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
}

for (let y = 0; y <= canvas.height; y += cellSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
}

ctx.strokeStyle = 'black';
ctx.stroke();


dude.onload = function() {
    ctx.drawImage(dude, 0, position.y*cellSize, cellSize, cellSize);}
function clearPrevious() {
        ctx.clearRect(position.x * cellSize, position.y * cellSize, cellSize, cellSize);
    }
function clearPrevious(x,y) {
        ctx.clearRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }

function putWumpus(){
    ctx.drawImage(wumpus, wumpusPos.x * cellSize, wumpusPos.y * cellSize, cellSize, cellSize);
    
    if (wumpusPos.x < 3)
        putStink(wumpusPos.x + 1, wumpusPos.y);
    if (wumpusPos.x != 0)
        putStink(wumpusPos.x - 1, wumpusPos.y);
    if (wumpusPos.y < 3)
        putStink(wumpusPos.x, wumpusPos.y + 1);
    if (wumpusPos.y != 0)
        putStink(wumpusPos.x, wumpusPos.y - 1);
}

wumpus.onload = putWumpus;


const putStink=(x,y)=>{
        ctx.drawImage(stink,x*cellSize,y*cellSize,cellSize,cellSize);

}
// Draw the image once it has loaded
function down(){
    if(position.y<3){
        clearPrevious()
        position.y=position.y+1
       
        ctx.drawImage(dude, position.x*cellSize, position.y*cellSize, cellSize, cellSize);
    }
}
function up(){
    if(position.y!=0){
        clearPrevious()
        position.y=position.y-1
        ctx.drawImage(dude, position.x*cellSize, position.y*cellSize, cellSize, cellSize)
    }
}
function right(){
    if(position.x<3){
        clearPrevious()
        position.x=position.x+1
        ctx.drawImage(dude, position.x*cellSize, position.y*cellSize, cellSize, cellSize);
    }
}
function left(){
    if(position.x!=0){
        clearPrevious()
        position.x=position.x-1
        ctx.drawImage(dude, position.x*cellSize, position.y*cellSize, cellSize, cellSize);
    }
}
document.addEventListener('keydown', function(event) {
    
    switch (event.key) {
        case 'ArrowUp':
            up();
            break;
        case 'ArrowDown':
            down();
            break;
        case 'ArrowLeft':
            left();
            break;
        case 'ArrowRight':
            right();
            break;
    }
});
putWumpus()