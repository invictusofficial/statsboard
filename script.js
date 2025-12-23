const LEADERBOARD_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMR7-5h4ZeA2po3Ja9WdGckD_RhDmjexLV6E_NsVrLjIOS_cfbXNu8g-VRQBjb8aCCwO2DCyu8L04u/pub?output=csvV";
const CLASSIC_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSTzzKGWLHnE6u4sIqLfCuBnHrunTh9wEBOBZzbz0nLPcUx2h5YA1MxnxIzGrkRr8Zv3R5DOtzCWcbr/pub?output=csv";
const TDM_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRPHMDSidJ4LbakOrx0F6Vlluf4b9j2NT2ucoolp7tSUybFI8GFbvEoyV9vTh_JiEbupmhz_HwN4Age/pub?output=csv";

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
/* TEAM SEARCH LOGIC */

const searchInput = document.getElementById("teamSearch");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  /* CLASSIC ROWS */
  document.querySelectorAll("#classic .row").forEach(row => {
    const team = row.children[0].textContent.toLowerCase();
    row.style.display = team.includes(value) ? "" : "none";
  });

  /* TDM CARDS */
  document.querySelectorAll(".tdm-card").forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(value) ? "" : "none";
  });
});
