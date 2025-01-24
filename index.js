const canvas = document.getElementsByTagName('canvas')[0];
const text=document.getElementsByTagName("p")[0]

const ctx = canvas.getContext('2d',{willReadFrequently:true});
const gridSize = 4;
const cellSize = canvas.width / gridSize;
let stinkSet=new Set()
let breezeSet=new Set()
const gold = new Image();
const goldPos={x:1,y:0}
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

const position={x:0,y:3}
// Draw the grid

ctx.strokeStyle = 'black';
ctx.stroke();
let previousState={on:false,x:0,y:0,type:"n"}
const checkPreviousState=()=>{
    if(previousState.on){
        if(previousState.type=="s")
            putStink(previousState.x,previousState.y)
        else
            putPit(previousState.x,previousState.y)
    }
    previousState.on=false
}
const validateMove=()=>{
    checkPreviousState()
    
    if(position.x==wumpusPos.x && position.y==wumpusPos.y)
        alert("You got Eaten")
    else if (position.x==goldPos.x && position.y==goldPos.y)
        alert("You found Gold !! \n You have won")
    else if (position.x==pitPos.x && position.y==pitPos.y)
        alert("Falled into a pit")
    else if([...stinkSet].some(pos => pos.x === position.x && pos.y === position.y)) {
        previousState={on:true,x:position.x,y:position.y,type:"s"}
        
        text.innerText="There is a Wumpus Nearby"
    } else if([...breezeSet].some(pos => pos.x === position.x && pos.y === position.y)) {
        previousState={on:true,x:position.x,y:position.y,type:"w"}
        text.innerText="There is a pit Nearby"
    }else {
        text.innerText="Safe State"
    }
       
}

dude.onload = function() {
    ctx.drawImage(dude, 0, position.y*cellSize, cellSize, cellSize);}

    function clearPrevious() {
            ctx.clearRect(position.x * cellSize, position.y * cellSize, cellSize, cellSize);
            
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
function putPit() {
    ctx.drawImage(pit, pitPos.x * cellSize, pitPos.y * cellSize, cellSize, cellSize);

    if (pitPos.x < 3)
        putBreeze(pitPos.x + 1, pitPos.y);
    if (pitPos.x != 0)
        putBreeze(pitPos.x - 1, pitPos.y);
    if (pitPos.y < 3)
        putBreeze(pitPos.x, pitPos.y + 1);
    if (pitPos.y != 0)
        putBreeze(pitPos.x, pitPos.y - 1);
}

const putBreeze = (x, y) => {
    breezeSet.add({x:x,y:y})
    ctx.drawImage(breeze, x * cellSize, y * cellSize, cellSize, cellSize);
};

pit.onload = putPit;
wumpus.onload = putWumpus;
gold.onload=()=>ctx.drawImage(gold,goldPos.x*cellSize,goldPos.y*cellSize,cellSize,cellSize)

const putStink=(x,y)=>{
    stinkSet.add({x:x,y:y})
        ctx.drawImage(stink,x*cellSize,y*cellSize,cellSize,cellSize);

}
// Draw the image once it has loaded
function down(){
    if(position.y<3){
        clearPrevious()
        position.y=position.y+1
       
        ctx.drawImage(dude, position.x*cellSize, position.y*cellSize, cellSize, cellSize);
        validateMove()
    }
}
function up(){
    if(position.y!=0){
        clearPrevious()
        position.y=position.y-1
        ctx.drawImage(dude, position.x*cellSize, position.y*cellSize, cellSize, cellSize)
        validateMove()
    }
}
function right(){
    if(position.x<3){
        clearPrevious()
        position.x=position.x+1
        ctx.drawImage(dude, position.x*cellSize, position.y*cellSize, cellSize, cellSize);
        validateMove()
    }
}
function left(){
    if(position.x!=0){
        clearPrevious()
        position.x=position.x-1
        ctx.drawImage(dude, position.x*cellSize, position.y*cellSize, cellSize, cellSize);
        validateMove()
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

for (let x = 0; x <= canvas.width; x += cellSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
}

for (let y = 0; y <= canvas.height; y += cellSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
}

ctx.clearRect(0, 0, canvas.width, canvas.height)
ctx.fillRect(0,0,canvas.width,canvas.height)