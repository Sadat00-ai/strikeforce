// ui.js - menus and overlay screens

const UI = {
  show(id) {
    document.querySelectorAll(".screen").forEach(function (screen) {
      screen.hidden = screen.id !== id;
    });
    if (id === "menu") {
      document.getElementById("best").textContent = save.highScore ? "Highest score: " + save.highScore : "";
    }
  },

  showEnd(title, lines, actions) {
    document.getElementById("end-title").textContent = title;

    const stats = document.getElementById("end-stats");
    stats.innerHTML = "";
    lines.forEach(function (line) {
      const li = document.createElement("li");
      li.textContent = line;
      stats.appendChild(li);
    });

    const box = document.getElementById("end-actions");
    box.innerHTML = "";
    actions.forEach(function (action) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "btn";
      button.textContent = action.label;
      button.addEventListener("click", action.run);
      box.appendChild(button);
    });
    this.show("end");
  },

  buildCampaign() {
    const list = document.getElementById("level-list");
    list.innerHTML = "";
    LEVELS.forEach(function (level, i) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "btn";
      button.disabled = i + 1 > save.unlockedLevel;
      button.textContent = (i + 1) + ". " + level.name + (button.disabled ? " (locked)" : "");
      button.title = level.objective;
      button.addEventListener("click", function () { startGame("campaign", i); });
      list.appendChild(button);
    });
  },

  buildWeapons() {
    const list = document.getElementById("weapon-list");
    list.innerHTML = "";
    WEAPONS.forEach(function (w) {
      const unlocked = save.unlockedWeapons.indexOf(w.id) !== -1;
      const card = document.createElement("button");
      card.type = "button";
      card.className = "card" + (save.startWeapon === w.id ? " selected" : "") + (unlocked ? "" : " locked");
      card.disabled = !unlocked;
      card.innerHTML = "<h3></h3><p class='stats-line'></p><p class='tag'></p>";
      card.querySelector("h3").textContent = w.name;
      card.querySelector(".stats-line").textContent =
        "Damage " + (w.damage * w.pellets) + " | Magazine " + w.mag + " | Reload " + w.reload + "s";
      card.querySelector(".tag").textContent = !unlocked
        ? "Locked: finish mission " + WEAPON_UNLOCKS[w.id]
        : save.startWeapon === w.id ? "Starting weapon" : "Click to select";
      card.addEventListener("click", function () {
        save.startWeapon = w.id;
        writeSave();
        UI.buildWeapons();
      });
      list.appendChild(card);
    });
  },

  buildScores() {
    const list = document.getElementById("score-list");
    list.innerHTML = "";
    if (!save.scores.length) {
      const li = document.createElement("li");
      li.textContent = "No scores yet. Play a mode to get on the board.";
      list.appendChild(li);
      return;
    }
    save.scores.forEach(function (entry) {
      const li = document.createElement("li");
      li.textContent = entry.score + " points - " + entry.mode + " (" + entry.date + ")";
      list.appendChild(li);
    });
  },

  init() {
    const music = document.getElementById("music-vol");
    const sfx = document.getElementById("sfx-vol");
    music.value = Math.round(save.settings.music * 100);
    sfx.value = Math.round(save.settings.sfx * 100);

    music.addEventListener("input", function () {
      save.settings.music = music.value / 100;
      Sound.init();
      Sound.setVolumes();
      writeSave();
    });
    sfx.addEventListener("input", function () {
      save.settings.sfx = sfx.value / 100;
      Sound.init();
      Sound.setVolumes();
      Sound.play("pickup");
      writeSave();
    });

    const actions = {
      campaign:     function () { UI.buildCampaign(); UI.show("campaign"); },
      survival:     function () { startGame("survival"); },
      timeattack:   function () { startGame("timeattack"); },
      training:     function () { startGame("training"); },
      weapons:      function () { UI.buildWeapons(); UI.show("weapons"); },
      settings:     function () { UI.show("settings"); },
      instructions: function () { UI.show("instructions"); },
      leaderboard:  function () { UI.buildScores(); UI.show("leaderboard"); },
      back:         function () { UI.show("menu"); },
      resume:       resumeGame,
      restart:      function () { startGame(G.mode, G.level); },
      quit:         quitToMenu,
      reset:        function () {
        if (!confirm("Delete all saved progress and scores?")) return;
        save = defaultSave();
        writeSave();
        music.value = Math.round(save.settings.music * 100);
        sfx.value = Math.round(save.settings.sfx * 100);
        Sound.setVolumes();
      }
    };

    // one listener handles every menu button
    document.getElementById("stage").addEventListener("click", function (event) {
      const button = event.target.closest("[data-action]");
      if (!button || !actions[button.dataset.action]) return;
      Sound.init();
      actions[button.dataset.action]();
    });

    this.show("menu");
  }
};
