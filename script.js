// DOM elements
const roomNumberTxt = document.querySelector("#roomNumberTxt");
const healthTxt = document.querySelector("#healthTxt");
const lampNumberTxt = document.querySelector("#lampNumberTxt");
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector("#text");
const monsterStats = document.querySelector("#monsterStats");

// Game state variables
let health = 100;
let lampNumber = 0;
let previousRoom = null; // keep track of where we came from

// Rooms data
const rooms = [
    {name: "Front Porch",
        text: "Is this a dream? You stand on the porch of an old mansion. The door waits before you. Will you open it?",
        "button text": ["Open door", "Try to wake up", "Look around", "Run"],
        "button functions": [openDoor, tryToWakeUp, lookAround, run] 
    },
    {name: "Lobby",
        text: "You are in the lobby of the mansion. There are stairs to the north, the kitchen in the east, and a living room to the west. Which way do you go?",
        "button text": ["up the stairs", "Go east", "Go west", "Go back"],
        "button functions": [goNorth, goEast, goWest, goBack]
    },
    {name: "Living Room",  
        text: "You are in the living room. There is a fireplace and an old couch. There are paintings and some creaking noises. You find a page from a diary on the floor. It appears to be torn out, but empty.",
        "button text": ["Go north", "Go south", "Look around", "Go back"],
        "button functions": [goNorth, goSouth, lookAround, goBack]
    },
    {name: "Kitchen",
        text: "You are in the kitchen. There is a table and a fridge. There is a door to the east. Which way do you go?",
        "button text": ["Go east", "Go west", "Look around", "Go back"],
        "button functions": [goEast, goWest, lookAround, goBack]
    }
];

// Start at room 0 (Front Porch)
let roomNumber = 0;
let room = rooms[roomNumber];

// Update function
function update(room) {
    monsterStats.style.display = "none"; // hides monster stats (for now)

    // Update button texts
    button1.innerText = room["button text"][0];
    button2.innerText = room["button text"][1];
    button3.innerText = room["button text"][2];
    button4.innerText = room["button text"][3];

    // Update button actions
    button1.onclick = room["button functions"][0];
    button2.onclick = room["button functions"][1];
    button3.onclick = room["button functions"][2];
    button4.onclick = room["button functions"][3];

    // Update room text & stats
    text.innerHTML = room.text;
    roomNumberTxt.innerText = "Room: " + room.name;
    healthTxt.innerText = "Health: " + health;
    lampNumberTxt.innerText = "Lamps: " + lampNumber;
}

// Functions
function openDoor() {
    previousRoom = roomNumber;
    roomNumber = 1; // move to Lobby
    room = rooms[roomNumber];
    update(room);
}
function tryToWakeUp() {
    text.innerHTML = "You try to wake up, but you can't. You are trapped in this nightmare.";
}
function lookAround() {
    text.innerHTML = "You look around, you find a lamp"; 
    lampNumber += 1;
    lampNumberTxt.innerText = "Lamps: " + lampNumber;
}
function run() {
    text.innerHTML = "You run around and find yourself in a graveyard.";
}
function goBack() {
    if (previousRoom !== null) {
        let temp = roomNumber;
        roomNumber = previousRoom;
        previousRoom = temp; // swap so you can go back & forth
        room = rooms[roomNumber];
        update(room);
    } else {
        text.innerHTML = "There's nowhere to go back to!";
    }
}

// Placeholder navigation functions
function goNorth() { 
    previousRoom = roomNumber;
    text.innerHTML = "You go north. (No new room yet)";
}
function goEast() { 
    previousRoom = roomNumber;
    text.innerHTML = "You go east. (No new room yet)";
}
function goWest() { 
    previousRoom = roomNumber;
    text.innerHTML = "You go west. (No new room yet)";
}
function goSouth() { 
    previousRoom = roomNumber;
    text.innerHTML = "You go south. (No new room yet)";
}
function sitOnCouch() { text.innerHTML = "You sit on the couch. It’s dusty."; }
function openFridge() { text.innerHTML = "The fridge creaks open... nothing but cobwebs."; }

// Initialize game
update(room);

//ok arreglar rooms que ya estan y agregar mas y agregar funcion de lampara
