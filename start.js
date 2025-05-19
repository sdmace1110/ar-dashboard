/*
  TEST DATA
*/
let players = [
  {
    name: "Player 1",
    maxHps: 100,
    currHps: 80,
    kbs: 5,
    battleStats: [],
    isDead: false,
    init: Math.floor(Math.random() * 23) + 1,
  },
  {
    name: "Player 2",
    maxHps: 120,
    currHps: 90,
    kbs: 3,
    battleStats: [],
    isDead: false,
    init: Math.floor(Math.random() * 23) + 1,
  },
  {
    name: "Player 3",
    maxHps: 110,
    currHps: 70,
    kbs: 4,
    battleStats: [],
    isDead: false,
    init: Math.floor(Math.random() * 23) + 1,
  },
  {
    name: "Player 4",
    maxHps: 130,
    currHps: 12,
    kbs: 6,
    battleStats: [],
    isDead: false,
    init: Math.floor(Math.random() * 23) + 1,
  },
];

let npcs = [
  {
    name: "NPC 1",
    maxHps: 90,
    currHps: 60,
    kbs: 2,
    battleStats: [],
    isDead: false,
    init: Math.floor(Math.random() * 23) + 1,
  },
  {
    name: "NPC 2",
    maxHps: 80,
    currHps: 50,
    kbs: 1,
    battleStats: [],
    isDead: false,
    init: Math.floor(Math.random() * 23) + 1,
  },
  {
    name: "NPC 3",
    maxHps: 70,
    currHps: 40,
    kbs: 0,
    battleStats: [],
    isDead: false,
    init: Math.floor(Math.random() * 23) + 1,
  },
  {
    name: "NPC 4",
    maxHps: 60,
    currHps: 30,
    kbs: -1,
    battleStats: [],
    isDead: false,
    init: Math.floor(Math.random() * 23) + 1,
  },
];

/* 
    STARTUP
*/

let DATAOBJ = {
  players: [],
  npcs: [],
  numOfEncounters: 0,
};

const loadDataObj = () => {
  players.forEach((player) => {
    DATAOBJ.players.push(player);
  });
  npcs.forEach((npc) => {
    DATAOBJ.npcs.push(npc);
  });
};

loadDataObj();

// Populate id="output"
const playerCards = document.getElementById("player-cards");
const npcCards = document.getElementById("npc-cards");

const populateOutput = () => {
  createCards(playerCards, DATAOBJ.players);
  createCards(npcCards, DATAOBJ.npcs);
};

const createCards = (type, id) => {
  let cards = document.createDocumentFragment();
  type.innerHTML = "";
  id.sort((a, b) => b.init - a.init);
  id.forEach((player) => {
    if (!player.isDead) {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `<span class="card-name">${player.name}</span> <span class="card-hps">HP: <span class="card-current-hps">${player.currHps}</span>/<span class="card-max-hps">${player.maxHps}</span></span> <span class="card-init">Initiative: ${player.init}</span>`;
      cards.appendChild(div);
    }
  });
  type.appendChild(cards);
};

populateOutput();

function updateCurrentHpsColor(card) {
  const currHpsElem = card.querySelector(".card-current-hps");
  const maxHpsElem = card.querySelector(".card-max-hps");
  if (!currHpsElem || !maxHpsElem) return;

  const currHps = parseInt(currHpsElem.textContent, 10);
  const maxHps = parseInt(maxHpsElem.textContent, 10);
  if (isNaN(currHps) || isNaN(maxHps) || maxHps === 0) return;

  const percent = currHps / maxHps;

  // Calculate color: green (100%) -> yellow (50%) -> red (0%)
  let r, g;
  if (percent > 0.5) {
    // Green to Yellow
    r = Math.round(255 * (1 - percent) * 2);
    g = 255;
  } else {
    // Yellow to Red
    r = 255;
    g = Math.round(255 * percent * 2);
  }
  const color = `rgb(${r},${g},0)`;
  currHpsElem.style.color = color;
}

// Example: update all cards
document.querySelectorAll(".card").forEach(updateCurrentHpsColor);
