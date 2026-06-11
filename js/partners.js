/* ============================================================
   PARTNER LOGO YÖNETİMİ
   Yeni partner eklemek: aşağıdaki diziye { name, logo } ekleyin.
   logo → assets/images/partners/ klasöründeki dosya adı
   Logo yoksa sadece name yazı olarak gösterilir.
   ============================================================ */

const PARTNERS = [
  { name: "", logo: "partner1.svg" },
  { name: "", logo: "partner2.png" },
  { name: "", logo: "partner3.png" },
  { name: "", logo: "partner4.png" },
  { name: "", logo: "partner3.png" },
  { name: "", logo: "partner5.png" },
  { name: "", logo: "partner6.svg" },
  { name: "", logo: "partner7.png" },
  { name: "", logo: "partner8.jpg" },
];

/* ---- Marquee oluşturma (dokunmaya gerek yok) ---- */
(function buildMarquee() {
  const track = document.getElementById("marqueeTrack");
  if (!track) return;

  function renderSet(hidden) {
    return PARTNERS.map(
      ({ name, logo }) =>
        `<div class="partner-item"${hidden ? ' aria-hidden="true"' : ""}>` +
        `<img src="assets/images/partners/${logo}" alt="${hidden ? "" : name}" ` +
        `onerror="this.style.display='none';this.nextElementSibling.style.display='block'">` +
        `<span>${name}</span>` +
        `</div>`,
    ).join("");
  }

  track.innerHTML = renderSet(false) + renderSet(true);
})();
