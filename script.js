const LEADERBOARD_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQkpf2fIDe_gmp3TqgoO_oCvEm4djsHJLbLnGI7fwtQyyk4lFX3t9UrcMz_PyYLpKG9Bbx41sHOTfUd/pub?output=csv";

const CLASSIC_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTQoGRILODd7r09GCEYVnh_f9UOp9jRLYigru0YUIG6IIhpboy4XXi8YJtBJ0Sj9sFygAh0uVVkj2tH/pub?output=csv";

const TDM_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRK0w9NyLh2wB9X3V3XL3HJ-vZZpiOLNMWZT5pLzuTfhI1oGxEt8PisXryL_9vqdeKExdeehvgmAdB5/pub?output=csv";

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
