/*
 * Sample data for demos
 * ---------------------
 * Illustrative community posts and impact projects so the prototype looks
 * populated before real users join. Every sample is labelled "Sample" in the app,
 * and viewers can hide them with the "Show sample data" switch.
 * Delete this file (and its <script> tag in index.html) to remove all samples.
 */
(function () {
  "use strict";

  function art(body, bg) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
      '<rect width="400" height="300" fill="' + (bg || "#EFEAF8") + '"/><circle cx="330" cy="60" r="90" fill="#E3DAF4"/>' +
      '<rect y="232" width="400" height="68" fill="#E6DEF5"/>' + body + "</svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  function dots(list, r, fill) { return list.map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + r + '" fill="' + fill + '"/>'; }).join(""); }
  function lines(ys, x1, x2, stroke, w) { return ys.map(function (y) { return '<line x1="' + x1 + '" y1="' + y + '" x2="' + x2 + '" y2="' + y + '" stroke="' + stroke + '" stroke-width="' + w + '"/>'; }).join(""); }

  var ART = {
    ottoman: art('<rect x="120" y="122" width="160" height="110" rx="14" fill="#C9A26B"/><g>' + lines([142, 162, 182, 202, 222], 122, 278, "#A9834E", 5) + '</g>' +
      '<ellipse cx="200" cy="122" rx="80" ry="24" fill="#D8B47E"/><ellipse cx="200" cy="122" rx="56" ry="16" fill="none" stroke="#B48C55" stroke-width="5"/><ellipse cx="200" cy="122" rx="30" ry="8" fill="none" stroke="#B48C55" stroke-width="5"/>'),
    jarLamp: art('<rect x="150" y="92" width="100" height="140" rx="22" fill="#CFE6DD" stroke="#7FB59F" stroke-width="5"/><rect x="160" y="76" width="80" height="22" rx="5" fill="#8A7BB0"/>' +
      dots([[175, 130], [205, 115], [225, 150], [180, 175], [215, 195], [195, 150], [230, 120], [170, 205]], 7, "#F2C14E")),
    planter: art('<path d="M170 152 h60 v80 h-60z" fill="#BFD7EE" stroke="#6E9CC9" stroke-width="5"/><path d="M175 152 l10 -40 h30 l10 40z" fill="#D7E6F4" stroke="#6E9CC9" stroke-width="5"/>' +
      '<path d="M200 112 c-30 -20 -40 -50 -20 -60 c10 20 20 30 20 60z" fill="#6DB58A"/><path d="M200 112 c30 -25 45 -45 25 -60 c-12 20 -22 30 -25 60z" fill="#58A276"/>'),
    tote: art('<path d="M140 122 h120 l12 110 h-144z" fill="#D98BAA"/><path d="M165 122 v-30 a35 35 0 0 1 70 0 v30" fill="none" stroke="#C0608A" stroke-width="10"/>' +
      [150, 170, 190, 210, 230, 250].map(function (x) { return '<line x1="' + x + '" y1="232" x2="' + x + '" y2="248" stroke="#C0608A" stroke-width="6"/>'; }).join("")),
    lantern: art('<rect x="160" y="112" width="80" height="120" rx="8" fill="#9AA6B4"/><ellipse cx="200" cy="112" rx="40" ry="10" fill="#B9C2CD"/><path d="M165 112 q35 -55 70 0" fill="none" stroke="#6F7A88" stroke-width="5"/>' +
      dots([[180, 140], [200, 135], [220, 140], [185, 165], [215, 165], [200, 160], [180, 190], [200, 195], [220, 190], [200, 215]], 5, "#FFD46B")),
    bowl: art('<path d="M120 152 h160 a80 70 0 0 1 -160 0z" fill="#8B6340"/><ellipse cx="200" cy="152" rx="80" ry="16" fill="#B08560"/><ellipse cx="200" cy="152" rx="66" ry="10" fill="#E9D8B9"/>'),
    tyrePlanter: art('<ellipse cx="200" cy="215" rx="95" ry="26" fill="#6C5BA8"/><ellipse cx="200" cy="200" rx="95" ry="26" fill="#8574C4"/><ellipse cx="200" cy="200" rx="60" ry="15" fill="#7A5A3E"/>' +
      '<ellipse cx="200" cy="168" rx="70" ry="20" fill="#E0A23B"/><ellipse cx="200" cy="155" rx="70" ry="20" fill="#F0B957"/><ellipse cx="200" cy="155" rx="44" ry="11" fill="#7A5A3E"/>' +
      dots([[180, 132], [205, 122], [225, 136], [195, 140]], 10, "#E86A92") + dots([[170, 146], [235, 146]], 9, "#6DB58A")),
    shelf: art('<rect x="110" y="80" width="180" height="150" fill="#C49A6C"/>' + lines([105, 155, 205], 110, 290, "#A57A4C", 6) +
      '<rect x="110" y="128" width="180" height="10" fill="#8F6538"/><rect x="110" y="182" width="180" height="10" fill="#8F6538"/>' +
      '<rect x="130" y="100" width="22" height="28" rx="4" fill="#6DB58A"/><rect x="235" y="108" width="30" height="20" rx="3" fill="#8A7BB0"/><rect x="150" y="160" width="40" height="22" rx="3" fill="#E0A23B"/>'),
    rug: art('<rect x="90" y="110" width="220" height="120" rx="16" fill="#E6A0BC"/>' + lines([128, 146, 164, 182, 200, 218], 100, 300, "#C0608A", 7) +
      lines([137, 173, 209], 100, 300, "#8A7BB0", 5) + [100, 125, 150, 175, 200, 225, 250, 275, 300].map(function (x) { return '<line x1="' + x + '" y1="230" x2="' + x + '" y2="246" stroke="#C0608A" stroke-width="4"/>'; }).join("")),
    beads: art('<path d="M110 90 q90 170 180 0" fill="none" stroke="#9E8FC8" stroke-width="3"/>' +
      [[118, 106, "#E86A92"], [132, 132, "#F0B957"], [150, 156, "#6DB58A"], [172, 174, "#5FA8B8"], [200, 180, "#E86A92"], [228, 174, "#F0B957"], [250, 156, "#6DB58A"], [268, 132, "#5FA8B8"], [282, 106, "#E86A92"]]
        .map(function (b) { return '<ellipse cx="' + b[0] + '" cy="' + b[1] + '" rx="13" ry="8" fill="' + b[2] + '"/>'; }).join("")),
    cds: art('<line x1="200" y1="40" x2="200" y2="240" stroke="#8A7BB0" stroke-width="3"/>' +
      [70, 140, 210].map(function (y, i) {
        return '<circle cx="200" cy="' + y + '" r="30" fill="#D9DEE8"/><circle cx="200" cy="' + y + '" r="30" fill="url(#g' + i + ')"/><circle cx="200" cy="' + y + '" r="6" fill="#EFEAF8"/>';
      }).join("") +
      '<defs>' + [0, 1, 2].map(function (i) { return '<linearGradient id="g' + i + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#B9A6F2" stop-opacity=".8"/><stop offset=".5" stop-color="#7FD1A8" stop-opacity=".6"/><stop offset="1" stop-color="#F0B957" stop-opacity=".7"/></linearGradient>'; }).join("") + "</defs>"),
    wallet: art('<rect x="130" y="110" width="140" height="95" rx="10" fill="#E9B76A"/><path d="M130 120 h140 v40 q-70 25 -140 0z" fill="#F4CF8E"/>' +
      '<rect x="190" y="150" width="20" height="14" rx="4" fill="#8A7BB0"/><text x="150" y="196" font-family="sans-serif" font-size="16" fill="#A06F2B">JUICE</text>'),
    swing: art('<line x1="60" y1="40" x2="340" y2="40" stroke="#7A5A3E" stroke-width="12"/><line x1="160" y1="40" x2="175" y2="150" stroke="#A9834E" stroke-width="4"/><line x1="240" y1="40" x2="225" y2="150" stroke="#A9834E" stroke-width="4"/>' +
      '<ellipse cx="200" cy="175" rx="60" ry="32" fill="#4A4E57"/><ellipse cx="200" cy="170" rx="34" ry="14" fill="#EFEAF8"/>')
  };

  window.REMAKE_SAMPLES = {
    community: [
      { idea_id: "tyre-planter", name: "NSS unit", caption: "Painted tyre garden at the hostel entrance", img: ART.tyrePlanter, likes: 42, date: "2026-10-12" },
      { idea_id: "cloth-tote", name: "Eco club", caption: "40 T-shirt tote bags for the vegetable market", img: ART.tote, likes: 37, date: "2026-10-09" },
      { idea_id: "tyre-ottoman", name: "Design students", caption: "Tyre ottomans for the library reading corner", img: ART.ottoman, likes: 31, date: "2026-10-05" },
      { idea_id: "can-lantern", name: "Hostel C", caption: "Punched tin lanterns for Diwali night", img: ART.lantern, likes: 28, date: "2026-10-02" },
      { idea_id: "glass-jar-lamp", name: "First-year batch", caption: "Jar fairy lamps for the study tables", img: ART.jarLamp, likes: 24, date: "2026-09-27" },
      { idea_id: "cloth-rag-rug", name: "Women's self-help group", caption: "Rag rug doormats woven from tailor scraps", img: ART.rug, likes: 22, date: "2026-09-20" },
      { idea_id: "pallet-shelf", name: "Mechanical dept.", caption: "Pallet wall shelf for the workshop lab", img: ART.shelf, likes: 19, date: "2026-09-14" },
      { idea_id: "pet-planter", name: "Eco club", caption: "Self-watering mint planters from cold drink bottles", img: ART.planter, likes: 17, date: "2026-09-08" },
      { idea_id: "paper-beads", name: "Craft society", caption: "Paper-bead necklaces made from old magazines", img: ART.beads, likes: 15, date: "2026-08-30" },
      { idea_id: "tyre-swing", name: "Community volunteers", caption: "Tyre swing for the neighbourhood park", img: ART.swing, likes: 14, date: "2026-08-22" },
      { idea_id: "coconut-bowl", name: "Canteen team", caption: "Coconut shell bowls, sanded and oiled", img: ART.bowl, likes: 11, date: "2026-08-15" },
      { idea_id: "cd-sun-catcher", name: "Junior wing", caption: "Old CDs turned into sun catchers for the garden", img: ART.cds, likes: 9, date: "2026-08-03" },
      { idea_id: "tetra-wallet", name: "Eco club", caption: "Tetra Pak wallets from canteen juice cartons", img: ART.wallet, likes: 8, date: "2026-07-26" }
    ],

    /* Impact: products made in a sample run of workshops (June–October 2026). */
    projects: [
      { ideaId: "cloth-tote", products: 15, date: "2026-06-14" },
      { ideaId: "pet-planter", products: 12, date: "2026-06-21" },
      { ideaId: "tyre-planter", products: 4, date: "2026-07-05" },
      { ideaId: "glass-jar-lamp", products: 10, date: "2026-07-12" },
      { ideaId: "tetra-wallet", products: 20, date: "2026-07-26" },
      { ideaId: "tyre-ottoman", products: 2, date: "2026-08-09" },
      { ideaId: "paper-bags", products: 200, date: "2026-08-16" },
      { ideaId: "cloth-rag-rug", products: 3, date: "2026-08-23" },
      { ideaId: "pet-ecobrick-stool", products: 2, date: "2026-09-06" },
      { ideaId: "can-lantern", products: 8, date: "2026-09-13" },
      { ideaId: "coconut-bowl", products: 6, date: "2026-09-20" },
      { ideaId: "pallet-shelf", products: 2, date: "2026-10-04" },
      { ideaId: "bags-plarn", products: 2, date: "2026-10-08" },
      { ideaId: "cd-coasters", products: 5, date: "2026-10-11" }
    ]
  };
})();
