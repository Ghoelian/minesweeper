"use strict";

let minesSlider;

let tilesXSlider;
let tilesYSlider;

let mines = 10;
let tilesX = 9;
let tilesY = 9;

const minefieldOffsetX = 10;
const minefieldOffsetY = 125;

let minefield;

function setup() {
  createCanvas(windowWidth, windowHeight);

  createTilesSliders();
  createMinesSlider();

  generateMinefield();
}

function draw() {
  background(50);

  textAlign(RIGHT);
  fill(208, 208, 215);

  if (tilesXSlider.value() !== tilesX || tilesYSlider.value() !== tilesY) {
    tilesX = tilesXSlider.value();
    tilesY = tilesYSlider.value();

    minesSlider.remove();
    createMinesSlider();

    generateMinefield();
  }

  if (minesSlider.value() !== mines) {
    mines = minesSlider.value();

    generateMinefield();
  }

  textAlign(RIGHT, BASELINE);
  text(tilesX, 25, 27);
  text(tilesY, 25, 67);
  text(mines, 25, 107);
  text(`Total: ${tilesX * tilesY}`, 300, 27);

  drawMinefield();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function createTilesSliders() {
  tilesXSlider = createSlider(9, 30, tilesX);
  tilesXSlider.position(30, 10);

  tilesYSlider = createSlider(9, 24, tilesY);
  tilesYSlider.position(30, 50);
}

function createMinesSlider() {
  minesSlider = createSlider(10, (tilesX - 1) * (tilesY - 1), mines);
  minesSlider.position(30, 90);
}

function drawMinefield() {
  let tileSize;

  // Calculate based on the biggest of the sides, so it should always scale in the right direction
  // Also, count one extra tile so the last tile in a row/column can't be partially off-screen
  if (tilesX > tilesY) {
    tileSize = (width - minefieldOffsetX) / (tilesX + 1);
  } else {
    tileSize = (height - minefieldOffsetY) / (tilesY + 1);
  }

  for (let i = 0; i < Object.keys(minefield).length; i++) {
    const x = i * tileSize + minefieldOffsetX;

    for (let j = 0; j < Object.keys(minefield[i]).length; j++) {
      const y = j * tileSize + minefieldOffsetY;

      if (minefield[i][j].mine) {
        fill(255, 0, 0);
      } else {
        fill(100);
      }

      square(x, y, tileSize);
    }
  }
}

function generateMinefield() {
  minefield = {};

  for (let i = 0; i < tilesX; i++) {
    minefield[i] = {};

    for (let j = 0; j < tilesY; j++) {
      minefield[i][j] = { mine: false, flagged: false, cleared: false };
    }
  }

  for (let i = 0; i < mines; i++) {
    const randomTile = getRandEmptyTile();

    minefield[randomTile.x][randomTile.y].mine = true;
  }
}

function getRandEmptyTile() {
  const tileX = Math.floor(Math.random() * tilesX);
  const tileY = Math.floor(Math.random() * tilesY);

  if (minefield[tileX][tileY].mine) {
    return getRandEmptyTile();
  } else {
    return { x: tileX, y: tileY };
  }
}
