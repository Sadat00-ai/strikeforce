// storage.js - saving and loading progress with localStorage

const SAVE_KEY = "strikeforce-save-v1";

function defaultSave() {
  return {
    highScore: 0,
    unlockedLevel: 1,                      // how many campaign levels can be played
    unlockedWeapons: ["pistol", "rifle"],
    startWeapon: "pistol",
    settings: { music: 0.35, sfx: 0.7 },
    scores: []                             // best runs, highest first
  };
}

function loadSave() {
  const base = defaultSave();
  try {
    const raw = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (raw && typeof raw === "object") {
      const merged = Object.assign(base, raw);
      merged.settings = Object.assign(defaultSave().settings, raw.settings);
      if (!Array.isArray(merged.unlockedWeapons)) merged.unlockedWeapons = defaultSave().unlockedWeapons;
      if (!Array.isArray(merged.scores)) merged.scores = [];
      return merged;
    }
  } catch (error) {
    // broken or blocked storage, start fresh
  }
  return base;
}

function writeSave() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch (error) {
    // storage is blocked, progress just won't be kept
  }
}

function addScore(mode, score) {
  save.scores.push({ mode: mode, score: score, date: new Date().toLocaleDateString() });
  save.scores.sort(function (a, b) { return b.score - a.score; });
  save.scores = save.scores.slice(0, 8);
  if (score > save.highScore) save.highScore = score;
  writeSave();
}

let save = loadSave();
