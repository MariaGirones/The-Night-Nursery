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
const monsterNameTxt = document.querySelector("#monsterName");
const monsterHealthBar = document.querySelector("#monsterHealth");

// Game state variables
let health = 100;
let lampNumber = 0;
let previousRoom = null;
let gameOver = false;
let monster = null;

// Helper: random choice
function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Check lamps or die
function checkLampsOrDie() {
  if (lampNumber > 0) {
    lampNumber--;
    lampNumberTxt.innerText = "Lamps: " + lampNumber;
    text.innerHTML +=
      "<br><br>The lamp flares, burning back the horror. One shatters in your grip.";
  } else {
    const deaths = [
      "The dark wraps around you like a wet blanket. Something cold pries open your chest. You scream, but no air comes out.",
      "You hear a whisper — your own voice — begging. Then teeth sink into your neck. The world turns red, then nothing.",
      "Invisible fingers drag you down into the floorboards. The last thing you see is wood closing over your eyes.",
    ];
    text.innerHTML = randomChoice(deaths);
    endGame();
  }
}

// Update monster health bar
function updateMonsterBar() {
  if (!monster) return;
  let percent = Math.max(monster.health, 0) / monster.maxHealth * 100;
  monsterHealthBar.style.width = percent + "%";
  monsterHealthBar.innerText = monster.health + " / " + monster.maxHealth;
  if (monster.health <= 0) {
    monsterStats.style.display = "none";
    monster = null;
    text.innerHTML +=
      "<br><br>The poltergeist dissolves into smoke. You survived… for now.";
    lampNumber += 2;
    lampNumberTxt.innerText = "Lamps: " + lampNumber;
  }
}

// Rooms data
const rooms = [
  {
    name: "Front Porch",
    text: "Is this a dream? You stand on the porch of an old mansion. The door waits before you. Will you open it?",
    "button text": ["Open door", "Try to wake up", "Look around", "Run"],
    "button functions": [openDoor, tryToWakeUp, lookAround, run],
  },
  {
    name: "Lobby",
    text:
      "You step into the Lobby. The air is heavy, swollen with damp rot. " +
      "It clings to your tongue like spoiled meat. Every breath feels borrowed. " +
      "Something drips in the dark, steady, patient — waiting.",
    "button text": ["Go upstairs", "The Kitchen", "Living Room", "Go back"],
    "button functions": [goNorth, goEast, goWest, goBack],
  },
  {
    name: "Living Room",
    text:
      "You are in the living room. A fireplace yawns black and empty. The couch seems to shift when you look at it. " +
      "A diary page lies on the floor, blank except for a greasy fingerprint.",
    "button text": [
      "Sit on couch",
      "Look around",
      "Go back",
      "Do nothing",
    ],
    "button functions": [
      sitOnCouch,
      lookAround,
      goBack,
      () => (text.innerHTML = "You hesitate..."),
    ],
  },
  {
    name: "Kitchen",
    text:
      "You are in the kitchen. The stench here is unbearable. A fridge hums softly, too softly. Something moves inside.",
    "button text": ["Open fridge", "Look around", "Go back", "Do nothing"],
    "button functions": [
      openFridge,
      lookAround,
      goBack,
      () => (text.innerHTML = "You stand still..."),
    ],
  },
  {
    name: "Graveyard",
    text:
      "You run into a graveyard. The moonlight casts jagged shadows. The earth seems to breathe. Footsteps echo behind you.",
    "button text": ["Watch your back", "Listen closely", "Run faster", "Look back"],
    "button functions": [zombieChase, zombieNoise, zombieFace, zombieDeath],
  },
  {
    name: "Floor 2",
    text:
      "You are on the second floor. The air is colder here, and the shadows seem to move. You see a long hallway with several doors.",
    "button text": ["Go to Room 1", "Go to Room 2", "Go to Room 3", "Go back"],
    "button functions": [EnterRoom2_1, EnterRoom2_2, EnterRoom2_3, goBack],
  },
];

// Start at room 0 (Front Porch)
let roomNumber = 0;
let room = rooms[roomNumber];

// Update function
function update(room) {
  monsterStats.style.display = "none";

  if (gameOver) {
    button1.innerText = "Game Over";
    button2.innerText = "Game Over";
    button3.innerText = "Game Over";
    button4.innerText = "Game Over";
    button1.onclick = null;
    button2.onclick = null;
    button3.onclick = null;
    button4.onclick = null;
    return;
  }

  button1.innerText = room["button text"][0];
  button2.innerText = room["button text"][1];
  button3.innerText = room["button text"][2];
  button4.innerText = room["button text"][3];

  button1.onclick = room["button functions"][0];
  button2.onclick = room["button functions"][1];
  button3.onclick = room["button functions"][2];
  button4.onclick = room["button functions"][3];

  text.innerHTML = room.text;
  roomNumberTxt.innerText = "Room: " + room.name;
  healthTxt.innerText = "Health: " + health;
  lampNumberTxt.innerText = "Lamps: " + lampNumber;
}

// Functions
function openDoor() {
  previousRoom = roomNumber;
  roomNumber = 1;
  room = rooms[roomNumber];
  update(room);
}
function tryToWakeUp() {
  text.innerHTML =
    "You try to wake up, but you can't. You are trapped in this nightmare.";
}
function lookAround() {
  if (lampNumber < 5) {
    lampNumber += 1;
    lampNumberTxt.innerText = "Lamps: " + lampNumber;
    text.innerHTML =
      "You found a lamp! Its glass is warm as if it remembers someone else’s hand.";
  } else {
    text.innerHTML =
      "You already have enough lamps. They feel heavier with every step.";
  }
}
function run() {
  previousRoom = roomNumber;
  roomNumber = 4;
  room = rooms[roomNumber];
  update(room);
}
function goBack() {
  if (previousRoom !== null) {
    let temp = roomNumber;
    roomNumber = previousRoom;
    previousRoom = temp;
    room = rooms[roomNumber];
    update(room);
  } else {
    text.innerHTML = "There's nowhere to go back to!";
  }
}

// Floor 2
function EnterRoom2_1() {
  monster = { name: "Poltergeist", health: 60, maxHealth: 60 };

  monsterStats.style.display = "block";
  monsterNameTxt.innerText = monster.name;
  updateMonsterBar();

  text.innerHTML =
    "You enter Room 1 on Floor 2. The air drops ten degrees instantly. " +
    "Furniture trembles, shadows twitch on the ceiling... " +
    "Then it steps forward — a <b>poltergeist</b>, warped like broken glass. " +
    "It hisses: <i>'This house is mine, and so is your body.'</i>";

  button1.innerText = "Use Lamp (2 required)";
  button2.innerText = "Throw Object";
  button3.innerText = "Listen...";
  button4.innerText = "Run";

  button1.onclick = useLampOnPoltergeist;
  button2.onclick = throwObject;
  button3.onclick = poltergeistTalks;
  button4.onclick = runFromPoltergeist;
}
function EnterRoom2_2() {
  text.innerHTML =
    "You enter Room 2 on Floor 2. Shadows flicker at the edge of your vision. (More content to be added)";
}
function EnterRoom2_3() {
  text.innerHTML =
    "You enter Room 3 on Floor 2. A chill runs down your spine. (More content to be added)";
}

// Navigation functions
function goNorth() {
  previousRoom = roomNumber;
  roomNumber = 5;
  room = rooms[roomNumber];
  update(room);
}
function goEast() {
  previousRoom = roomNumber;
  roomNumber = 3;
  room = rooms[roomNumber];
  update(room);
}
function goWest() {
  previousRoom = roomNumber;
  roomNumber = 2;
  room = rooms[roomNumber];
  update(room);
}
function goSouth() {
  previousRoom = roomNumber;
  text.innerHTML =
    "You step south, but the hall stretches into black forever. (No new room yet)";
}

// Flavor
function sitOnCouch() {
  text.innerHTML =
    "You sit on the couch. Dust blooms around you. For a second, it feels like someone sits beside you — but no one is there.";
}

// Ghost + lamps
function openFridge() {
  text.innerHTML =
    "You tug the fridge door open. The hinges scream like an animal. " +
    "Inside, two lamps glow faintly, their glass warm with an unnatural light.<br><br>" +
    "But behind them… a face. Not a person — not anymore. " +
    "Its eyes are hollow pits, its skin sagging like wet paper. " +
    "The ghost exhales, and frost spills into the room. " +
    "Your chest locks up as if invisible fingers claw your lungs.<br><br>" +
    "You snatch the lamps, but the ghost shrieks — a sound that feels like teeth scraping your spine.";

  lampNumber += 2;
  checkLampsOrDie();
  lampNumberTxt.innerText = "Lamps: " + lampNumber;
  text.innerHTML += "<br><br>You stagger back from the fridge.";
}

// Graveyard
function zombieChase() {
  text.innerHTML =
    "You whirl around. The sound of footsteps doesn’t stop — it multiplies. " +
    "Something is running at you, fast, running like a starving dog. " +
    "The air stinks of rot and grave-soil. You sprint, lungs tearing, but the steps grow louder... " +
    "until the cold hand clamps your shoulder.";
  endGame();
}
function zombieNoise() {
  text.innerHTML =
    "You stop. Wrong choice.<br><br>" +
    "A growl rolls across the graveyard, low and wet, like bones cracking in a throat. " +
    "Your ears ring. It’s not just sound — it’s *inside* your skull, scraping, demanding. " +
    "Your knees buckle. Darkness spreads in your vision. " +
    "The last thing you hear is the thing breathing against your ear.";
  endGame();
}
function zombieFace() {
  text.innerHTML =
    "It steps into the moonlight.<br><br>" +
    "Its face is ruined — skin sloughing, jaw unhinged. Yet you know it. " +
    "Somewhere in the haze, memory claws at you: your brother? your mother? yourself? " +
    "Recognition burns like acid. The creature opens its mouth, and you fall into it.";
  endGame();
}
function zombieDeath() {
  text.innerHTML =
    "You stumble. Your shin explodes with pain as you hit stone. " +
    "The world tilts, and before you can scream, the zombie is on you. " +
    "Its nails rip skin from your throat, its breath like carrion in your nose. " +
    "Your heartbeat hammers once… twice… then nothing.";
  endGame();
}

// End game
function endGame() {
  gameOver = true;
  health = 0;
  healthTxt.innerText = "Health: 0";
  update(room);
}

// Battle actions (placeholders for now)
function useLampOnPoltergeist() {
  if (lampNumber >= 2 && monster) {
    lampNumber -= 2;
    monster.health -= 30;
    lampNumberTxt.innerText = "Lamps: " + lampNumber;
    text.innerHTML =
      "You brandish two lamps. They flare blindingly! The poltergeist shrieks, its form cracking like shattered glass.";
    updateMonsterBar();
  } else {
    text.innerHTML =
      "You don’t have enough lamps! The poltergeist laughs, its voice echoing in your skull.";
    health -= 20;
    healthTxt.innerText = "Health: " + health;
    if (health <= 0) endGame();
  }
}
function throwObject() {
  if (monster) {
    monster.health -= 10;
    text.innerHTML =
      "You hurl a chair into the poltergeist. It passes through but still makes the creature flicker.";
    updateMonsterBar();
  }
}
function poltergeistTalks() {
  text.innerHTML =
    "You listen. The poltergeist whispers memories that are not yours — a drowned child, a fire in the attic, bones under the floor.";
  health -= 5;
  healthTxt.innerText = "Health: " + health;
  if (health <= 0) endGame();
}
function runFromPoltergeist() {
  text.innerHTML =
    "You bolt from the room, heart hammering. The poltergeist’s scream follows you down the hall.";
  roomNumber = 5;
  room = rooms[roomNumber];
  update(room);
}

// Initialize game
update(room);
monsterStats.style.display = "none";

//add some mini games in floor 2 and 3 and some boses. Mini games give you lamps, 2nd and 3rd floor are harder than first.They have monsters. 
//Add sounds and music.
//goBack function should take you to previous room o afuera con mejor logica
//Add a save feature.
//Fix the GO BACK logic, not previous room but specific paths. 