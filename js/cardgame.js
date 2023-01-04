const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

//items array
const items = [
    { name : "Bulbasaur", image: "Bulbasaur.png"},
    { name : "Charmander", image: "Charmander.png"},
    { name : "Squirtle", image: "Squirtle.png"},
    { name : "Pikachu", image: "Pikachu.png"},
    { name : "Gastly", image: "Gastly.png"},
    { name : "Meowth", image: "Meowth.png"},
    { name : "Mew", image: "Mew.png"},
    { name : "Togepi", image: "Togepi.png"},
    { name : "Vulpix", image: "Vulpix.png"},
    { name : "Eevee", image: "Eevee.png"},
    { name : "Horsea", image: "Horsea.png"},
    { name : "Dratini", image: "src/card-assets/Dratini.png"},
];

//Initial Time 
let seconds = 0,
    minutes = 0;

//Initial moves 
let movesCount = 0,
    winCount = 0;

//For timer
const timeGenerator = () => {
    seconds += 1;
    //minutes logic
    if(seconds>=60){
        minutes+= 1;
        seconds = 0;
    }
    //format time before displaying
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

// For calculating moves
const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves:</span>${movesCount}`;  
};

//Pick random objects from the items array
const generateRandom = (size = 4) => {
    //temporary array
    let tempArray = [...items];
    //initializes cardValues array
    let cardValues = [];

    size = (size * size ) / 2;
    //Random object selection 
    for(let i = 0; i < size;i++ ){
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    //simple shuffle
    cardValues.sort(() => Math.random() - 0.5);
    for(let i=0 ; i<size*size;i++){
    /* aqui me quede */ 
gameContainer.innerHTML += `
<div class="card-container" data-card-value`;
    }
};

//Initialize values and func calls
const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
};

initializer();
