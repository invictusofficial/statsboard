const LEADERBOARD_URL = "PASTE_LEADERBOARD_CSV";
const CLASSIC_URL = "PASTE_CLASSIC_CSV";
const TDM_URL = "PASTE_TDM_CSV";

/* Leaderboard */
fetch(LEADERBOARD_URL)
  .then(r => r.text())
  .then(csv => {
    const rows = csv.split("\n").slice(1);
    const el = document.getElementById("leaderboard");

    rows.forEach(r => {
      const [rank, team, matches, points] = r.split(",");
      el.innerHTML += `
        <div class="row">
          <span>${rank}</span>
          <span>${team}</span>
          <span>${matches}</span>
          <span class="points">${points}</span>
        </div>`;
    });
  });

/* Classic */
fetch(CLASSIC_URL)
  .then(r => r.text())
  .then(csv => {
    const rows = csv.split("\n").slice(1);
    const el = document.getElementById("classic");

    rows.forEach(r => {
      const [team, players, captain, , status] = r.split(",");
      el.innerHTML += `
        <div class="row">
          <span>${team}</span>
          <span>${players}</span>
          <span>${captain}</span>
          <span>${status}</span>
        </div>`;
    });
  });

/* TDM */
fetch(TDM_URL)
  .then(r => r.text())
  .then(csv => {
    const rows = csv.split("\n").slice(1);
    const el = document.getElementById("tdm");

    rows.forEach(r => {
      const [ta, pa, ca, , tb, pb, cb] = r.split(",");
      el.innerHTML += `
        <div class="tdm-card">
          <div>
            <strong>${ta}</strong><br>${pa}<br><small>${ca}</small>
          </div>
          <div class="vs">VS</div>
          <div>
            <strong>${tb}</strong><br>${pb}<br><small>${cb}</small>
          </div>
        </div>`;
    });
  });
