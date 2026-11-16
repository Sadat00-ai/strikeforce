// levels.js - the five maps and campaign missions
// walls are [x, y, width, height]. The world is 960 x 600.

const CORNERS = [[40, 40], [920, 40], [40, 560], [920, 560], [480, 30]];

const LEVELS = [
  {
    name: "Urban Combat Zone", objective: "Eliminate 10 enemies",
    ground: "#2b2f33", grid: "#343a40", wall: "#4d565f", top: "#6b7782",
    waves: [{ basic: 10 }],
    walls: [[150, 120, 140, 90], [670, 120, 140, 90], [150, 390, 140, 90], [670, 390, 140, 90], [400, 230, 160, 40], [420, 340, 120, 20]]
  },
  {
    name: "Desert Battlefield", objective: "Survive 3 enemy waves",
    ground: "#a98a55", grid: "#b39560", wall: "#7d6540", top: "#9c8052",
    waves: [{ basic: 4 }, { basic: 4, fast: 2 }, { basic: 5, fast: 3 }],
    walls: [[200, 200, 60, 60], [700, 300, 60, 60], [450, 120, 80, 50], [300, 420, 90, 40], [620, 440, 90, 40], [100, 330, 50, 100], [810, 150, 50, 100]]
  },
  {
    name: "Military Warehouse", objective: "Eliminate 20 enemies",
    ground: "#26292b", grid: "#303437", wall: "#52585c", top: "#747c82",
    waves: [{ basic: 12, fast: 6, sniper: 2 }],
    walls: [[120, 100, 20, 200], [820, 100, 20, 200], [260, 260, 440, 24], [260, 430, 160, 24], [540, 430, 160, 24], [120, 400, 20, 150], [820, 400, 20, 150]]
  },
  {
    name: "Forest Combat Zone", objective: "Survive the heavy attack",
    ground: "#26381f", grid: "#2d4325", wall: "#3b2a1a", top: "#1f5a2a",
    waves: [{ basic: 4, heavy: 3 }, { basic: 3, heavy: 4, sniper: 2 }],
    walls: [[180, 150, 50, 50], [400, 90, 50, 50], [700, 180, 50, 50], [260, 380, 50, 50], [560, 330, 50, 50], [760, 440, 50, 50], [90, 300, 40, 40], [860, 330, 40, 40], [480, 200, 40, 40]]
  },
  {
    name: "Abandoned Industrial Area", objective: "Defeat the final boss",
    ground: "#2f2622", grid: "#3a2f2a", wall: "#6a3b24", top: "#8c5a3a",
    waves: [{ basic: 4, fast: 2 }, { boss: 1, basic: 4 }],
    walls: [[160, 160, 200, 30], [600, 160, 200, 30], [160, 420, 30, 100], [770, 420, 30, 100], [300, 300, 100, 100], [560, 300, 100, 100], [430, 120, 100, 30]]
  }
];

// endless waves for Survival mode
function survivalWave(n) {
  return {
    basic: 4 + n,
    fast: n >= 2 ? n - 1 : 0,
    heavy: n >= 3 ? Math.floor(n / 3) : 0,
    sniper: n >= 4 ? Math.floor((n - 2) / 2) : 0,
    boss: n % 5 === 0 ? 1 : 0
  };
}
