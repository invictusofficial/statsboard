const LEADERBOARD_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMR7-5h4ZeA2po3Ja9WdGckD_RhDmjexLV6E_NsVrLjIOS_cfbXNu8g-VRQBjb8aCCwO2DCyu8L04u/pub?output=csv";

const CLASSIC_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSTzzKGWLHnE6u4sIqLfCuBnHrunTh9wEBOBZzbz0nLPcUx2h5YA1MxnxIzGrkRr8Zv3R5DOtzCWcbr/pub?output=csv";

const TDM_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRPHMDSidJ4LbakOrx0F6Vlluf4b9j2NT2ucoolp7tSUybFI8GFbvEoyV9vTh_JiEbupmhz_HwN4Age/pub?output=csv";

/* ---------- CSV SAFE SPLIT ---------- */
function parseCSVRow(row) {
  return row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.replace(/^"|"$/g, "").trim());
}

/* ---------- LEADERBOARD ---------- */
fetch(LEADERBOARD_URL)
  .then(r => r.text())
  .then(text => {
    const rows = text.trim().split("\n").slice(1);
    const el = document.getElementById("leaderboard");
    el.innerHTML = "";

    rows.forEach(r => {
      if (!r.trim()) return;
      const cols = parseCSVRow(r);
      if (cols.length < 4) return;

      const [rank, team, matches, points] = cols;

      el.innerHTML += `
        <div class="row">
          <span>${rank}</span>
          <span>${team}</span>
          <span>${matches}</span>
          <span class="points">${points}</span>
        </div>`;
    });
  });

/* ---------- CLASSIC ---------- */
fetch(CLASSIC_URL)
  .then(r => r.text())
  .then(text => {
    const rows = text.trim().split("\n").slice(1);
    const el = document.getElementById("classic");
    el.innerHTML = "";

    rows.forEach(r => {
      if (!r.trim()) return;
      const cols = parseCSVRow(r);
      if (cols.length < 5) return;

      const [team, players, captain, contact, status] = cols;

      el.innerHTML += `
        <div class="row">
          <span>${team}</span>
          <span>${players}</span>
          <span>${captain}</span>
          <span>${status}</span>
        </div>`;
    });
  });

/* ---------- TDM ---------- */
fetch(TDM_URL)
  .then(r => r.text())
  .then(text => {
    const rows = text.trim().split("\n").slice(1);
    const el = document.getElementById("tdm");
    el.innerHTML = "";

    rows.forEach(r => {
      if (!r.trim()) return;
      const cols = parseCSVRow(r);
      if (cols.length < 7) return;

      const [ta, pa, ca, , tb, pb, cb] = cols;

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

/* ---------- SEARCH ---------- */
const searchInput = document.getElementById("teamSearch");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  document.querySelectorAll("#classic .row").forEach(row => {
    const team = row.children[0].textContent.toLowerCase();
    row.style.display = team.includes(value) ? "" : "none";
  });

  document.querySelectorAll(".tdm-card").forEach(card => {
    card.style.display = card.textContent.toLowerCase().includes(value) ? "" : "none";
  });
});
