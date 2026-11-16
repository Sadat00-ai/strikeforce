# STRIKEFORCE: Tactical Arena

A top-down 2D tactical shooter that runs in the browser. It is made with plain HTML5, CSS3 and
JavaScript, the Canvas API, the Web Audio API and localStorage. No frameworks, no backend and no
image or audio files: the graphics are drawn in code and all the sounds and music are generated.

## How to run

Unzip the folder and open `index.html` in a modern browser (Chrome, Edge, Brave, Firefox).
No server or install is needed.

## Game modes

- **Campaign**: five missions on five maps (Urban, Desert, Warehouse, Forest, Industrial), ending with a boss fight.
  Clearing missions unlocks the next mission, the Shotgun (after mission 2) and the Sniper Rifle (after mission 4).
- **Survival**: endless waves that get bigger and tougher, with a boss every fifth wave.
- **Time Attack**: 90 seconds, as many kills as you can, with a bonus for quick kills in a row.
- **Training**: safe range with target dummies, every weapon, unlimited ammo, you cannot die.

## Controls

| Key | Action |
|---|---|
| W A S D / Arrow keys | Move (8 directions) |
| Mouse | Aim |
| Left mouse button | Shoot (hold to keep firing) |
| R | Reload |
| 1 2 3 4 | Pistol, Rifle, Shotgun, Sniper |
| G | Throw a grenade |
| Esc | Pause / resume |

## Features

- Four weapons with their own damage, fire rate, magazine, reload time, bullet speed and sound.
- Enemy types: soldier, fast runner, heavy, sniper and a boss with two attack patterns. They chase you,
  check for a clear line of sight, walk around cover and get tougher on later levels.
- Walls and cover that block movement and bullets, health and ammo pickups, grenades.
- Particle effects, bullet trails, muzzle flashes, screen shake, damage flash and death animations.
- Saved with localStorage: high score, leaderboard, unlocked levels and weapons, starting weapon, volume settings.

## Project structure

```
index.html
css/    style.css (colors, base)  menu.css (menus)  game.css (play area)
js/
  storage.js   saving and loading
  audio.js     sound effects and music (Web Audio)
  weapons.js   weapon stats and unlock rules
  levels.js    maps, missions, endless wave formula
  game.js      player, enemies, bullets, collisions, waves, drawing, game loop
  ui.js        menus and result screens
  main.js      start-up
```

## Not included

Mobile touch controls and the virtual joystick, a loading screen, image sprites and a cover image.
The game is meant for keyboard and mouse.

## Credits

All code, graphics and audio were written for this project. Nothing is copied from another source.
