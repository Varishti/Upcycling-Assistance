/* WasteWise – upcycling assistant
 * Runs fully in the browser. Photo recognition uses MobileNet (TensorFlow.js),
 * loaded only when a photo is added. Everything else uses the knowledge base in
 * data.js, so the app still works when the model can't load.
 */
(function () {
  "use strict";

  var D = window.REMAKE_DATA;
  var I18N = window.REMAKE_I18N;
  var C = window.ReMakeCommunity;
  var TF_URL = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.10.0/dist/tf.min.js";
  var MOBILENET_URL = "https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@2.1.1/dist/mobilenet.min.js";
  var LOCALES = { en: "en-IN", hi: "hi-IN", pa: "pa-IN" };

  /* ---------- storage (best effort) ---------- */
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem("remake:" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem("remake:" + k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  };

  var state = {
    lang: store.get("lang", "en"),
    tab: "analyse",
    imageGuess: null,
    imageStatus: "idle",
    textGuess: null,
    results: null,
    selectedId: null,
    detailTab: "overview",
    workshopPeople: 15,
    isExample: true,
    projects: store.get("projects", []),
    showSamples: store.get("showSamples", true),
    community: { posts: [], loaded: false, loading: false, filter: "all", sort: "new" }
  };
  if (!I18N[state.lang]) state.lang = "en";

  var $ = function (id) { return document.getElementById(id); };

  /* ---------- text helpers ---------- */
  function t(key, vars) {
    var s = (I18N[state.lang] && I18N[state.lang][key]) || I18N.en[key] || key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function matName(id) { var m = D.materials[id]; return state.lang === "en" ? m.name : (m[state.lang] || m.name); }
  function matShort(id) { var m = D.materials[id]; return state.lang === "en" ? m.short : (m["short_" + state.lang] || m.short); }
  function ideaName(idea) { return state.lang === "en" ? idea.name : (idea[state.lang] || idea.name); }
  function sizeLabel(matId, size) {
    var m = D.materials[matId];
    return state.lang === "en" ? m.sizes[size] : t("size_" + size) + " (" + m.sizes[size] + ")";
  }
  function condLabel(c) { return t("cond_" + c); }
  function findIdea(id) { return D.ideas.filter(function (i) { return i.id === id; })[0]; }

  /* ---------- number helpers ---------- */
  function r10(v) { return Math.round(v / 10) * 10; }
  function roundMoney(v) { return v < 50 ? Math.round(v) : r10(v); }
  function rupees(v) { return "₹" + Math.round(v).toLocaleString("en-IN"); }
  function range(a, b) { return a === b ? rupees(a) : rupees(a) + "–" + rupees(b).slice(1); }
  function signedRange(a, b) { return a >= 0 ? range(a, b) : "−" + rupees(-a) + " … " + rupees(b); }
  function kg(v) {
    if (v < 1) return Math.round(v * 1000) + " g";
    return (v < 10 ? Math.round(v * 10) / 10 : Math.round(v)) + " kg";
  }
  function hoursText(h) {
    if (h < 1) return t("minutes", { n: Math.round(h * 60) });
    return (h % 1 === 0 ? h : h.toFixed(1)) + " h";
  }
  function dateText(iso) {
    try { return new Date(iso).toLocaleDateString(LOCALES[state.lang], { day: "numeric", month: "short", year: "numeric" }); }
    catch (e) { return String(iso).slice(0, 10); }
  }

  /* ---------- language ---------- */
  function applyLang() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) { el.placeholder = t(el.getAttribute("data-i18n-ph")); });
    document.querySelectorAll("[data-lang]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-lang") === state.lang ? "true" : "false"); });
    buildChips();
    buildSelects();
  }

  function buildChips() {
    var cur = $("material").value;
    $("chips").innerHTML = '<button type="button" class="chip" data-mat="auto">' + esc(t("auto")) + "</button>" +
      Object.keys(D.materials).map(function (id) {
        return '<button type="button" class="chip" data-mat="' + id + '"><span class="swatch" style="background:' + D.materials[id].bin + '"></span>' + esc(matShort(id)) + "</button>";
      }).join("");
    $("material").value = cur || "auto";
    renderDetection();
  }

  function buildSelects() {
    var reg = $("region").value || "city";
    $("region").innerHTML = Object.keys(D.regions).map(function (k) { return '<option value="' + k + '"' + (k === reg ? " selected" : "") + ">" + esc(t("region_" + k)) + "</option>"; }).join("");
    var cond = $("condition").value || "good";
    $("condition").innerHTML = ["good", "dirty", "damaged"].map(function (k) { return '<option value="' + k + '"' + (k === cond ? " selected" : "") + ">" + esc(condLabel(k)) + "</option>"; }).join("");
    var r = resolveMaterial();
    updateSizeOptions(r ? r.id : null);
  }

  /* ---------- material detection ---------- */
  function hasWord(text, word) {
    var w = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // whole words only (an optional plural "s"/"es"); apostrophes count as part of a word, so "can't" isn't "can"
    return new RegExp("(^|[^a-z0-9'])" + w + "(e?s)?([^a-z0-9']|$)").test(text);
  }
  function detectFromText(text) {
    var s = (text || "").toLowerCase();
    var best = null;
    Object.keys(D.materials).forEach(function (id) {
      var m = D.materials[id], score = 0, hits = [];
      m.keywords.strong.forEach(function (k) { if (hasWord(s, k)) { score += 3; hits.push(k); } });
      m.keywords.weak.forEach(function (k) { if (hasWord(s, k)) { score += 1; hits.push(k); } });
      if (score > 0 && (!best || score > best.score)) best = { id: id, score: score, hits: hits };
    });
    return best;
  }

  function detectFromPredictions(preds) {
    var scores = {};
    preds.forEach(function (p) {
      var name = p.className.toLowerCase();
      Object.keys(D.materials).forEach(function (id) {
        D.materials[id].imageHints.forEach(function (h) {
          if (name.indexOf(h) !== -1) scores[id] = (scores[id] || 0) + p.probability;
        });
      });
    });
    var bestId = null;
    Object.keys(scores).forEach(function (id) { if (!bestId || scores[id] > scores[bestId]) bestId = id; });
    return { id: bestId, confidence: bestId ? Math.min(scores[bestId], 1) : 0, label: preds[0] ? preds[0].className.split(",")[0] : "" };
  }

  function resolveMaterial() {
    var chosen = $("material").value;
    if (chosen && chosen !== "auto") return { id: chosen, source: "chosen" };
    if (state.textGuess) return { id: state.textGuess.id, source: "desc" };
    if (state.imageGuess && state.imageGuess.id) return { id: state.imageGuess.id, source: "photo" };
    return null;
  }

  /* ---------- photo recognition ---------- */
  var modelPromise = null;
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src; s.async = true; s.onload = resolve;
      s.onerror = function () { reject(new Error("Could not load " + src)); };
      document.head.appendChild(s);
    });
  }
  function withTimeout(p, ms) {
    return Promise.race([p, new Promise(function (_, rej) { setTimeout(function () { rej(new Error("timeout")); }, ms); })]);
  }
  function getModel() {
    if (!modelPromise) {
      modelPromise = withTimeout(
        loadScript(TF_URL).then(function () { return loadScript(MOBILENET_URL); })
          .then(function () { return window.mobilenet.load({ version: 2, alpha: 1.0 }); }),
        30000);
      modelPromise.catch(function () { modelPromise = null; });
    }
    return modelPromise;
  }

  function handlePhoto(file) {
    if (!file || !/^image\//.test(file.type)) return;
    var reader = new FileReader();
    reader.onload = function () {
      state.imageGuess = null;
      state.imageStatus = "loading";
      var img = $("photoPreview");
      img.onload = function () {
        getModel()
          .then(function (model) { return model.classify(img, 5); })
          .then(function (preds) { state.imageGuess = detectFromPredictions(preds); state.imageStatus = "done"; renderDetection(); })
          .catch(function () { state.imageStatus = "unavailable"; renderDetection(); });
      };
      img.src = reader.result;
      img.hidden = false;
      $("dropEmpty").hidden = true;
      $("clearPhoto").hidden = false;
      renderDetection();
    };
    reader.readAsDataURL(file);
  }

  function clearPhoto() {
    state.imageGuess = null; state.imageStatus = "idle";
    $("photoPreview").hidden = true; $("photoPreview").removeAttribute("src");
    $("dropEmpty").hidden = false; $("clearPhoto").hidden = true;
    $("photo").value = "";
    renderDetection();
  }

  function renderDetection() {
    var box = $("detection");
    var parts = [];
    var r = resolveMaterial();
    if (state.imageStatus === "loading") {
      parts.push('<span class="det-row"><span class="spinner" aria-hidden="true"></span>' + esc(t("detChecking")) + "</span>");
    } else if (state.imageStatus === "done") {
      var g = state.imageGuess;
      if (g && g.id) parts.push('<span class="det-row">' + t("detPhotoLooks", { label: esc(g.label), mat: esc(matName(g.id)), pct: Math.round(g.confidence * 100) }) + "</span>");
      else parts.push('<span class="det-row">' + esc(t("detPhotoUnknown")) + "</span>");
    } else if (state.imageStatus === "unavailable") {
      parts.push('<span class="det-row muted">' + esc(t("detUnavailable")) + "</span>");
    }
    if (state.textGuess) {
      parts.push('<span class="det-row">' + t("detDesc", { words: esc(state.textGuess.hits.slice(0, 3).join(", ")), mat: esc(matName(state.textGuess.id)) }) + "</span>");
    }
    if (r) {
      var src = { chosen: t("srcChosen"), desc: t("srcDesc"), photo: t("srcPhoto") }[r.source];
      parts.push('<span class="det-final"><span class="swatch" style="background:' + D.materials[r.id].bin + '"></span><span>' + t("detUsing", { mat: esc(matName(r.id)) }) + ' <span class="muted">(' + esc(src) + ")</span></span></span>");
    }
    box.innerHTML = parts.join("");
    box.hidden = parts.length === 0;
    updateSizeOptions(r ? r.id : null);
    var chosen = $("material").value;
    document.querySelectorAll(".chip[data-mat]").forEach(function (c) {
      var id = c.getAttribute("data-mat");
      c.setAttribute("aria-pressed", id === chosen ? "true" : "false");
      c.classList.toggle("is-detected", chosen === "auto" && !!r && id === r.id);
    });
  }

  function updateSizeOptions(matId) {
    var sel = $("size"), cur = sel.value || "medium";
    sel.innerHTML = ["small", "medium", "large"].map(function (k) {
      var label = matId ? sizeLabel(matId, k) : t("size_" + k);
      return '<option value="' + k + '"' + (k === cur ? " selected" : "") + ">" + esc(label) + "</option>";
    }).join("");
  }

  /* ---------- the engine ---------- */
  function readForm() {
    return {
      desc: $("desc").value.trim(),
      qty: Math.max(1, Math.min(9999, parseInt($("qty").value, 10) || 1)),
      condition: $("condition").value,
      size: $("size").value,
      skill: document.querySelector('input[name="skill"]:checked').value,
      region: $("region").value
    };
  }

  function computeIdea(idea, f) {
    var mat = D.materials[idea.material];
    var mult = D.regions[f.region].mult;
    var base = idea.materials.reduce(function (s, m) { return s + m.cost; }, 0);
    var cost = roundMoney(base * mult);
    var sellMin = roundMoney(idea.sell[0] * mult), sellMax = roundMoney(idea.sell[1] * mult);
    var products = Math.floor(f.qty / idea.perProduct + 1e-9);
    var kgItem = mat.kg[f.size];
    var reasons = [];
    if (idea.conditions.indexOf(f.condition) === -1) reasons.push(t("reasonCondition", { list: idea.conditions.map(condLabel).join(" / ") }));
    if (idea.sizes.indexOf(f.size) === -1) reasons.push(t("reasonSize", { list: idea.sizes.map(function (s) { return sizeLabel(idea.material, s); }).join(" / ") }));
    return {
      idea: idea, mat: mat,
      cost: cost, sellMin: sellMin, sellMax: sellMax,
      profitMin: sellMin - cost, profitMax: sellMax - cost,
      products: products,
      missing: products < 1 ? Math.ceil(idea.perProduct - f.qty) : 0,
      kgBatch: Math.max(products, 1) * idea.perProduct * kgItem,
      feasible: reasons.length === 0,
      reasons: reasons,
      materialCosts: idea.materials.map(function (m) { return { name: m.name, cost: m.cost ? Math.max(1, roundMoney(m.cost * mult)) : 0 }; })
    };
  }

  function scoreIdea(m, f) {
    var d = m.idea.difficulty;
    var avgProfit = (m.profitMin + m.profitMax) / 2;
    var perHour = Math.max(avgProfit, 1) / m.idea.hours;
    var skillAdj = 0;
    if (f.skill === "beginner") skillAdj = d === 3 ? -4 : d === 2 ? -0.8 : 0.6;
    if (f.skill === "intermediate") skillAdj = d === 3 ? -1.2 : 0;
    if (f.skill === "advanced") skillAdj = d === 3 ? 0.6 : 0;
    return (4 - d) * 1.1 + Math.log10(perHour) * 2 + skillAdj + (m.products >= 1 ? 1 : -2);
  }

  function analyse(fromUser) {
    var f = readForm();
    state.textGuess = detectFromText(f.desc);
    var r = resolveMaterial();
    renderDetection();
    f.size = $("size").value;
    if (fromUser) state.isExample = false;
    if (!r) {
      state.results = { error: true };
      state.selectedId = null;
      renderResults();
      return;
    }
    var all = D.ideas.filter(function (i) { return i.material === r.id; }).map(function (i) { return computeIdea(i, f); });
    var ok = all.filter(function (m) { return m.feasible; });
    ok.forEach(function (m) { m.score = scoreIdea(m, f); });
    ok.sort(function (a, b) { return b.score - a.score; });
    ok = ok.slice(0, 5);
    if (ok.length) {
      ok[0].badge = "badgeBest";
      var top = ok.reduce(function (a, b) { return b.profitMax > a.profitMax ? b : a; });
      if (!top.badge) top.badge = "badgeProfit";
      var quick = ok.reduce(function (a, b) { return b.idea.hours < a.idea.hours ? b : a; });
      if (!quick.badge) quick.badge = "badgeQuick";
    }
    var keepSelected = !fromUser && state.results && ok.some(function (m) { return m.idea.id === state.selectedId; });
    state.results = { form: f, material: r.id, ideas: ok, excluded: all.filter(function (m) { return !m.feasible; }) };
    if (!keepSelected) { state.selectedId = ok.length ? ok[0].idea.id : null; state.detailTab = "overview"; }
    renderResults();
    if (fromUser && window.innerWidth < 980) { var el = $("results"); if (el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "start" }); }
  }

  /* ---------- results ---------- */
  function difficultyDots(d) {
    var s = '<span class="dots" aria-hidden="true">';
    for (var i = 1; i <= 3; i++) s += '<span class="dot' + (i <= d ? " on" : "") + '"></span>';
    return s + "</span>" + esc(t("diff" + d));
  }

  function renderResults() {
    var el = $("results");
    var res = state.results;
    if (!res) { el.innerHTML = ""; return; }
    if (res.error) {
      el.innerHTML = '<div class="empty"><h3>' + esc(t("noMaterialTitle")) + "</h3><p>" + esc(t("noMaterialBody")) + "</p></div>";
      return;
    }
    var f = res.form, matId = res.material, mat = D.materials[matId];
    var html = "";
    if (state.isExample) html += '<p class="example-note">' + t("exampleNote") + "</p>";
    html += '<div class="res-head"><h2>' + esc(t("ideasFor")) + '</h2><p class="res-sub"><span class="swatch" style="background:' + mat.bin + '"></span>' +
      esc(t("resSub", { qty: f.qty, mat: matShort(matId), size: sizeLabel(matId, f.size), cond: condLabel(f.condition).toLowerCase(), kg: kg(f.qty * mat.kg[f.size]) })) + "</p></div>";

    if (!res.ideas.length) {
      html += '<div class="empty"><h3>' + esc(t("noIdeasTitle")) + "</h3><p>" + esc(t("noIdeasBody")) + "</p>" +
        '<ul class="plain">' + res.excluded.map(function (m) { return "<li><b>" + esc(ideaName(m.idea)) + "</b>: " + esc(m.reasons.join("; ")) + "</li>"; }).join("") + "</ul></div>";
      el.innerHTML = html;
      return;
    }

    html += '<ol class="idea-list">';
    res.ideas.forEach(function (m, i) {
      var sel = m.idea.id === state.selectedId;
      html += '<li><button type="button" class="idea-card' + (sel ? " is-selected" : "") + '" data-idea="' + m.idea.id + '" aria-pressed="' + sel + '">' +
        '<span class="rank">' + (i + 1) + "</span>" +
        '<span class="idea-main"><span class="idea-name">' + esc(ideaName(m.idea)) + (m.badge ? ' <span class="badge">' + esc(t(m.badge)) + "</span>" : "") + "</span>" +
        '<span class="idea-meta"><span>' + difficultyDots(m.idea.difficulty) + "</span><span>" + esc(hoursText(m.idea.hours)) + "</span>" +
        "<span>" + esc(m.products >= 1 ? t("makes", { n: m.products }) : t("needMore", { n: m.missing })) + "</span></span></span>" +
        '<span class="idea-money"><span class="label">' + esc(t("profit")) + '</span><span class="num">' + signedRange(m.profitMin, m.profitMax) + '</span><span class="per">' + esc(t("perProduct")) + "</span></span>" +
        "</button></li>";
    });
    html += "</ol>";
    if (res.excluded.length) {
      html += '<p class="excluded">' + esc(t("notShown")) + " " + res.excluded.map(function (m) { return "<b>" + esc(ideaName(m.idea)) + "</b> (" + esc(m.reasons.join("; ")) + ")"; }).join(", ") + "</p>";
    }
    html += '<section id="detail" class="detail" aria-live="polite"></section>';
    el.innerHTML = html;
    renderDetail();
  }

  function selectedMetrics() {
    if (!state.results || !state.results.ideas) return null;
    return state.results.ideas.filter(function (m) { return m.idea.id === state.selectedId; })[0] || null;
  }

  function renderDetail() {
    var el = $("detail");
    if (!el) return;
    var m = selectedMetrics();
    if (!m) { el.innerHTML = ""; return; }
    var f = state.results.form, idea = m.idea;
    var tabs = ["overview", "steps", "business", "safety", "workshop"];
    var head = '<div class="detail-head"><div><p class="eyebrow">' + esc(matName(idea.material)) + "</p><h3>" + esc(ideaName(idea)) + '</h3><p class="lede">' + esc(idea.summary) + "</p>" +
      (state.lang !== "en" ? '<p class="fine">' + esc(t("englishNote")) + "</p>" : "") + "</div>" +
      '<div class="detail-actions"><button type="button" class="btn ghost" id="copyPlan">' + esc(t("copy")) + '</button><button type="button" class="btn" id="saveProject">' + esc(t("save")) + "</button></div></div>" +
      '<div class="subtabs" role="tablist">' + tabs.map(function (k) {
        return '<button type="button" role="tab" class="subtab" data-sub="' + k + '" aria-selected="' + (k === state.detailTab) + '">' + esc(t(k)) + "</button>";
      }).join("") + "</div>";
    var body = { overview: overviewHTML, steps: stepsHTML, business: businessHTML, safety: safetyHTML, workshop: workshopHTML }[state.detailTab](m, f);
    el.innerHTML = head + '<div class="subpanel" role="tabpanel">' + body + "</div>" +
      '<p class="copy-fallback" id="copyFallbackWrap" hidden><label for="copyFallback">' + esc(t("copyFallback")) + '</label><textarea id="copyFallback" rows="8" readonly></textarea></p>';
  }

  function stat(label, value) { return '<div class="stat"><span class="label">' + esc(label) + '</span><span class="value">' + value + "</span></div>"; }

  function overviewHTML(m, f) {
    var idea = m.idea, mat = m.mat;
    var needText = idea.perProduct < 1 ? t("oneMakes", { n: Math.round(1 / idea.perProduct) }) : t("needEach", { n: idea.perProduct });
    var makeText = m.products >= 1 ? t("canMake", { n: m.products, qty: f.qty }) : t("collectMore", { n: m.missing });
    var n = Math.max(m.products, 1);
    var html = '<div class="stats">' + stat(t("difficulty"), difficultyDots(idea.difficulty)) + stat(t("timePer"), esc(hoursText(idea.hours))) +
      stat(t("wasteNeeded"), esc(needText)) + stat(t("youCanMake"), esc(makeText)) + "</div>";
    html += '<div class="two-col"><div><h4>' + esc(t("costPer")) + '</h4><table class="cost"><tbody>' +
      m.materialCosts.map(function (c) { return "<tr><td>" + esc(c.name) + '</td><td class="num">' + (c.cost ? rupees(c.cost) : esc(t("free"))) + "</td></tr>"; }).join("") +
      '<tr class="total"><td>' + esc(t("total")) + '</td><td class="num">' + rupees(m.cost) + "</td></tr></tbody></table>" +
      '<p class="fine">' + esc(t("priceNote", { region: t("region_" + f.region).toLowerCase() })) + "</p></div>";
    html += "<div><h4>" + esc(t("money")) + '</h4><dl class="money">' +
      "<div><dt>" + esc(t("sell")) + '</dt><dd class="num">' + range(m.sellMin, m.sellMax) + "</dd></div>" +
      "<div><dt>" + esc(t("profitPer")) + '</dt><dd class="num value">' + signedRange(m.profitMin, m.profitMax) + "</dd></div>" +
      "<div><dt>" + esc(t("profitFor", { n: n })) + '</dt><dd class="num value">' + signedRange(m.profitMin * n, m.profitMax * n) + "</dd></div></dl></div></div>";
    html += '<div class="impact-box"><div><p class="eyebrow">' + esc(t("diverted")) + '</p><p class="big num">' + kg(m.kgBatch) + '</p><p class="fine">' +
      esc(m.products >= 1 ? t("forN", { n: n }) : t("forOne")) + "</p></div><div><p><b>" + esc(t("ifThrown")) + "</b> " + esc(mat.fate) + "</p></div></div>";
    html += '<div class="two-col"><div><h4>' + esc(t("getReady")) + "</h4><p>" + esc(mat.prep[f.condition]) + "</p></div><div><h4>" + esc(t("tools")) + '</h4><ul class="plain">' +
      idea.tools.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div></div>";
    return html;
  }

  function stepsHTML(m, f) {
    return '<p class="prep"><b>' + esc(t("beforeStart")) + "</b> " + esc(m.mat.prep[f.condition]) + "</p>" +
      '<ol class="steps">' + m.idea.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>" +
      '<p class="fine">' + esc(t("shoppingList")) + " " + m.materialCosts.map(function (c) { return esc(c.name); }).join(", ") + ".</p>";
  }

  function businessHTML(m) {
    var idea = m.idea, mid = roundMoney((m.sellMin + m.sellMax) / 2);
    return '<div class="two-col"><div><h4>' + esc(t("whoBuys")) + "</h4><p>" + esc(idea.buyers) + "</p><h4 class=\"gap\">" + esc(t("whereSell")) + '</h4><ul class="plain">' +
      idea.channels.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul></div>" +
      "<div><h4>" + esc(t("pricing")) + "</h4><p>" + t("pricingBody", { price: '<b class="num">' + rupees(mid) + "</b>" }) + "</p>" +
      '<h4 class="gap">' + esc(t("monthly")) + '</h4><table class="cost"><thead><tr><th>' + esc(t("madePerMonth")) + '</th><th class="num">' + esc(t("profit")) + '</th><th class="num">' + esc(t("hours")) + "</th></tr></thead><tbody>" +
      [5, 10, 25].map(function (n) { return "<tr><td>" + n + '</td><td class="num">' + signedRange(m.profitMin * n, m.profitMax * n) + '</td><td class="num">' + Math.round(idea.hours * n) + "</td></tr>"; }).join("") +
      '</tbody></table></div></div><div class="scale"><h4>' + esc(t("grow")) + "</h4><p>" + esc(idea.scale) + "</p></div>";
  }

  function safetyHTML(m) {
    return '<ul class="safety">' + m.idea.safety.map(esc).concat([t("general1"), t("general2"), t("general3")].map(esc)).map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ul>";
  }

  function workshopPlan(m) {
    var idea = m.idea;
    var people = Math.max(2, Math.min(200, state.workshopPeople));
    var team = idea.workshop.team;
    var teams = Math.ceil(people / team);
    var buildMin = Math.round(idea.hours * 60);
    var sessions = buildMin > 120 ? Math.ceil(idea.hours / 2) : 1;
    var schedule = sessions === 1 ? [
      [t("minutes", { n: 10 }), t("sch1")], [t("minutes", { n: 5 }), t("sch2")], [t("minutes", { n: 10 }), t("sch3")],
      [t("minutes", { n: Math.max(15, buildMin) }), t("sch4")], [t("minutes", { n: 10 }), t("sch5")], [t("minutes", { n: 5 }), t("sch6")]
    ] : [[t("session1"), t("schM1")], [t("sessionsRest", { n: sessions }), t("schM2")], [t("last20"), t("schM3")]];
    return { people: people, team: team, teams: teams, items: Math.ceil(teams * idea.perProduct * 1.1), budget: teams * m.cost, sessions: sessions, minutes: 40 + Math.max(15, buildMin), schedule: schedule };
  }

  function workshopHTML(m) {
    var w = workshopPlan(m), idea = m.idea;
    var html = '<div class="ws-controls"><label for="workshopPeople">' + esc(t("participants")) + '</label><input id="workshopPeople" type="number" min="2" max="200" value="' + w.people + '"><span class="fine">' + esc(t("ages", { a: idea.workshop.ages })) + "</span></div>";
    html += '<div class="stats">' +
      stat(t("teams"), esc(w.team === 1 ? t("teamsOne", { n: w.teams }) : t("teamsMany", { n: w.teams, t: w.team }))) +
      stat(t("wasteCollect"), esc(t("spare", { n: w.items }))) +
      stat(t("budget"), rupees(w.budget)) +
      stat(t("duration"), esc(w.sessions === 1 ? t("minutes", { n: w.minutes }) : t("sessions", { n: w.sessions }))) + "</div>";
    html += "<h4>" + esc(t("schedule")) + '</h4><table class="cost"><tbody>' + w.schedule.map(function (r) { return '<tr><td class="nowrap">' + esc(r[0]) + "</td><td>" + esc(r[1]) + "</td></tr>"; }).join("") + "</tbody></table>";
    html += '<div class="two-col"><div><h4>' + esc(t("toolsArrange")) + "</h4><p>" + esc(w.team === 1 ? t("oneSetPair") : t("oneSetTeam")) + " " + idea.tools.map(esc).join(", ") + ".</p></div>" +
      "<div><h4>" + esc(t("learn")) + '</h4><ul class="plain"><li>' + esc(t("learn1", { mat: matShort(idea.material).toLowerCase() })) + "</li><li>" + esc(t("learn2", { idea: ideaName(idea) })) + "</li><li>" + esc(t("learn3")) + "</li></ul></div></div>";
    return html + '<p class="fine">' + esc(t("measure")) + "</p>";
  }

  function planText(m) {
    var f = state.results.form, idea = m.idea, mat = m.mat;
    var L = [];
    L.push(ideaName(idea).toUpperCase() + " — " + matName(idea.material));
    L.push(idea.summary, "");
    L.push(t("difficulty") + ": " + t("diff" + idea.difficulty) + " | " + t("timePer") + ": " + hoursText(idea.hours));
    L.push(t("youCanMake") + ": " + (m.products >= 1 ? t("canMake", { n: m.products, qty: f.qty }) : t("collectMore", { n: m.missing })));
    L.push("", t("costPer").toUpperCase());
    m.materialCosts.forEach(function (c) { L.push("- " + c.name + ": " + (c.cost ? rupees(c.cost) : t("free"))); });
    L.push(t("total") + ": " + rupees(m.cost), t("sell") + ": " + range(m.sellMin, m.sellMax), t("profitPer") + ": " + signedRange(m.profitMin, m.profitMax));
    L.push("", t("beforeStart").toUpperCase(), mat.prep[f.condition], "", t("steps").toUpperCase());
    idea.steps.forEach(function (s, i) { L.push((i + 1) + ". " + s); });
    L.push("", t("safety").toUpperCase());
    idea.safety.forEach(function (s) { L.push("- " + s); });
    L.push("", t("business").toUpperCase(), t("whoBuys") + ": " + idea.buyers, t("whereSell") + ": " + idea.channels.join("; "), t("grow") + ": " + idea.scale);
    L.push("", t("diverted") + ": " + kg(m.kgBatch), t("ifThrown") + " " + mat.fate, "", "WasteWise");
    return L.join("\n");
  }

  function copyPlan(btn) {
    var m = selectedMetrics(); if (!m) return;
    var text = planText(m);
    var fallback = function () { var wrap = $("copyFallbackWrap"), ta = $("copyFallback"); ta.value = text; wrap.hidden = false; ta.focus(); ta.select(); };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { btn.textContent = t("copied"); setTimeout(function () { btn.textContent = t("copy"); }, 1800); }, fallback);
      } else fallback();
    } catch (e) { fallback(); }
  }

  /* ---------- projects ---------- */
  function saveProject(btn) {
    var m = selectedMetrics(); if (!m) return;
    var f = state.results.form, n = Math.max(m.products, 1);
    state.projects.unshift({
      id: Date.now(), ideaId: m.idea.id, material: m.idea.material, qty: f.qty, products: n,
      cost: m.cost * n, profitMin: m.profitMin * n, profitMax: m.profitMax * n,
      kg: Math.round(m.kgBatch * 1000) / 1000, made: false, date: new Date().toISOString()
    });
    var ok = store.set("projects", state.projects);
    btn.textContent = t("saved"); btn.disabled = true;
    toast(ok ? t("savedToast") : t("savedTemp"));
    renderTabCounts();
  }

  function renderProjects() {
    var el = $("projectsBody");
    if (!state.projects.length) {
      el.innerHTML = '<div class="empty"><h3>' + esc(t("noProjectsTitle")) + "</h3><p>" + esc(t("noProjectsBody")) + "</p></div>";
      return;
    }
    el.innerHTML = '<ul class="projects">' + state.projects.map(function (p) {
      var idea = findIdea(p.ideaId), name = idea ? ideaName(idea) : (p.name || p.ideaId);
      return '<li class="project"><span class="swatch" style="background:' + D.materials[p.material].bin + '"></span>' +
        '<div class="p-main"><b>' + esc(name) + '</b><span class="fine">' + esc(t("productsFrom", { n: p.products, qty: p.qty, date: dateText(p.date) })) + "</span></div>" +
        '<div class="p-num"><span class="label">' + esc(t("profit")) + '</span><span class="num">' + signedRange(p.profitMin, p.profitMax) + "</span></div>" +
        '<div class="p-num"><span class="label">' + esc(t("waste")) + '</span><span class="num">' + kg(p.kg) + "</span></div>" +
        '<div class="p-actions"><label class="toggle"><input type="checkbox" data-made="' + p.id + '"' + (p.made ? " checked" : "") + "> " + esc(t("madeIt")) + "</label>" +
        '<button type="button" class="btn ghost small" data-del="' + p.id + '">' + esc(t("del")) + "</button></div></li>";
    }).join("") + "</ul>";
  }

  /* ---------- impact ---------- */
  function tile(label, value, note) { return '<div class="tile"><span class="label">' + esc(label) + '</span><span class="big num">' + value + '</span><span class="fine">' + esc(note) + "</span></div>"; }
  function renderImpact() {
    $("impactSamples").innerHTML = sampleSwitch("samplesImpact", t("impactSampleNote"));
    var all = state.projects.concat(sampleProjects());
    var made = all.filter(function (p) { return p.made; });
    var planned = all.filter(function (p) { return !p.made; });
    var sum = function (list, k) { return list.reduce(function (s, p) { return s + p[k]; }, 0); };
    var html = '<div class="impact-tiles">' +
      tile(t("diverted"), kg(sum(made, "kg")), t("fromMade")) +
      tile(t("productsMade"), sum(made, "products").toLocaleString("en-IN"), t("projectsN", { n: made.length })) +
      tile(t("estProfit"), made.length ? signedRange(sum(made, "profitMin"), sum(made, "profitMax")) : rupees(0), t("ifAllSell")) +
      tile(t("planned"), kg(sum(planned, "kg")), t("notMadeYet", { n: planned.length })) + "</div>";
    if (!made.length) {
      html += '<div class="empty"><h3>' + esc(t("nothingMadeTitle")) + "</h3><p>" + esc(t("nothingMadeBody")) + "</p></div>";
      $("impactBody").innerHTML = html;
      return;
    }
    // waste diverted per month
    var byMonth = {};
    made.forEach(function (p) { var k = String(p.date).slice(0, 7); byMonth[k] = (byMonth[k] || 0) + p.kg; });
    var months = Object.keys(byMonth).sort();
    var mmax = Math.max.apply(null, months.map(function (k) { return byMonth[k]; }));
    html += '<div class="impact-grid"><section class="chart-card"><h3>' + esc(t("byMonth")) + '</h3><div class="month-chart" role="img" aria-label="' + esc(t("byMonth")) + '">' +
      months.map(function (k) {
        var label; try { label = new Date(k + "-01T00:00:00").toLocaleDateString(LOCALES[state.lang], { month: "short" }); } catch (e) { label = k; }
        return '<div class="m-col"><span class="m-val num">' + kg(byMonth[k]) + '</span><span class="m-bar" style="height:' + Math.max(4, byMonth[k] / mmax * 100) + '%"></span><span class="m-label">' + esc(label) + "</span></div>";
      }).join("") + "</div></section>";
    // by material
    var byMat = {};
    made.forEach(function (p) { byMat[p.material] = (byMat[p.material] || 0) + p.kg; });
    var keys = Object.keys(byMat).sort(function (a, b) { return byMat[b] - byMat[a]; });
    var max = byMat[keys[0]];
    html += '<section class="chart-card"><h3>' + esc(t("byMaterial")) + '</h3><div class="bars">' + keys.map(function (k) {
      return '<div class="bar-row"><span class="bar-label">' + esc(matShort(k)) + '</span><span class="bar-track"><span class="bar-fill" style="width:' + Math.max(4, byMat[k] / max * 100) + "%;background:" + D.materials[k].bin + '"></span></span><span class="num">' + kg(byMat[k]) + "</span></div>";
    }).join("") + "</div></section></div>";
    // recent activity
    var recent = made.slice().sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); }).slice(0, 8);
    html += '<section class="chart-card"><h3>' + esc(t("recent")) + '</h3><table class="cost"><thead><tr><th>' + esc(t("date")) + "</th><th>" + esc(t("ideaCol")) + '</th><th class="num">' + esc(t("productsMade")) + '</th><th class="num">' + esc(t("waste")) + "</th></tr></thead><tbody>" +
      recent.map(function (p) {
        var idea = findIdea(p.ideaId);
        return '<tr><td class="nowrap">' + esc(dateText(p.date)) + "</td><td>" + esc(idea ? ideaName(idea) : p.ideaId) + (p.sample ? ' <span class="mini-tag">' + esc(t("sample")) + "</span>" : "") + '</td><td class="num">' + p.products + '</td><td class="num">' + kg(p.kg) + "</td></tr>";
      }).join("") + "</tbody></table></section>";
    $("impactBody").innerHTML = html;
  }

  /* ---------- sample data ---------- */
  function sampleSwitch(id, note) {
    return '<label class="sample-switch" for="' + id + '"><input type="checkbox" id="' + id + '" data-samples' + (state.showSamples ? " checked" : "") + '><span class="track" aria-hidden="true"></span>' +
      esc(t("showSamples")) + "</label>" + (state.showSamples ? '<span class="fine">' + esc(note) + "</span>" : "");
  }
  function sampleProjects() {
    var S = window.REMAKE_SAMPLES;
    if (!state.showSamples || !S) return [];
    return S.projects.map(function (sp, i) {
      var idea = findIdea(sp.ideaId); if (!idea) return null;
      var mat = D.materials[idea.material];
      var cost = idea.materials.reduce(function (a, m) { return a + m.cost; }, 0);
      return { id: "sample-" + i, sample: true, ideaId: idea.id, material: idea.material, products: sp.products,
        qty: Math.ceil(sp.products * idea.perProduct), profitMin: (idea.sell[0] - cost) * sp.products, profitMax: (idea.sell[1] - cost) * sp.products,
        kg: Math.round(sp.products * idea.perProduct * mat.kg.medium * 1000) / 1000, made: true, date: sp.date + "T12:00:00Z" };
    }).filter(Boolean);
  }

  /* ---------- community ---------- */
  function safeImg(url) { return /^(https:|data:image\/)/.test(url || "") ? url : ""; }

  function loadCommunity() {
    var cs = state.community;
    if (cs.loading) return;
    cs.loading = true;
    renderCommunity();
    C.list().then(function (posts) {
      cs.posts = posts; cs.loaded = true; cs.loading = false;
      renderCommunity();
    });
  }

  function communityPosts() {
    var cs = state.community;
    var posts = cs.posts.slice();
    if (state.showSamples) posts = posts.concat(C.examples());
    if (cs.filter !== "all") posts = posts.filter(function (p) { return p.material === cs.filter; });
    var likesOf = function (p) { return (p.likes || 0) + (p.example && C.isLiked(p.id) ? 1 : 0); };
    if (cs.sort === "liked") posts.sort(function (a, b) { return likesOf(b) - likesOf(a); });
    else posts.sort(function (a, b) { return String(b.created_at).localeCompare(String(a.created_at)); });
    return posts.map(function (p) { p.shownLikes = likesOf(p); return p; });
  }

  function renderCommunity() {
    var live = C.mode === "live" && !C.lastError;
    $("communityMode").innerHTML = live
      ? '<span class="pill live"><span class="dot-live"></span>' + esc(t("liveMode")) + "</span>"
      : '<span class="pill">' + esc(t("demoMode")) + '</span><span class="fine">' + esc(C.lastError && C.configured ? t("loadFail") : t("demoBody")) + "</span>";
    $("communitySamples").innerHTML = sampleSwitch("samplesCommunity", t("samplesNote"));

    var sel = $("postIdea"), cur = sel.value;
    sel.innerHTML = '<option value="">' + esc(t("otherIdea")) + "</option>" + Object.keys(D.materials).map(function (mid) {
      return '<optgroup label="' + esc(matShort(mid)) + '">' + D.ideas.filter(function (i) { return i.material === mid; }).map(function (i) {
        return '<option value="' + i.id + '"' + (i.id === cur ? " selected" : "") + ">" + esc(ideaName(i)) + "</option>";
      }).join("") + "</optgroup>";
    }).join("");

    var cs = state.community;
    $("communityFilters").innerHTML = '<div class="chips" role="group">' + ["all"].concat(Object.keys(D.materials)).map(function (k) {
      var label = k === "all" ? t("filterAll") : matShort(k);
      var sw = k === "all" ? "" : '<span class="swatch" style="background:' + D.materials[k].bin + '"></span>';
      return '<button type="button" class="chip" data-filter="' + k + '" aria-pressed="' + (cs.filter === k) + '">' + sw + esc(label) + "</button>";
    }).join("") + '</div><select id="communitySort" aria-label="Sort"><option value="new"' + (cs.sort === "new" ? " selected" : "") + ">" + esc(t("sortNew")) + '</option><option value="liked"' + (cs.sort === "liked" ? " selected" : "") + ">" + esc(t("sortLiked")) + "</option></select>";

    var grid = $("communityGrid");
    if (cs.loading && !cs.loaded) { grid.innerHTML = '<p class="muted">' + esc(t("loading")) + "</p>"; return; }
    var posts = communityPosts();
    if (!posts.length) { grid.innerHTML = '<div class="empty"><p>' + esc(t(cs.filter === "all" ? "emptyAll" : "emptyFilter")) + "</p></div>"; return; }
    grid.innerHTML = '<ul class="gallery">' + posts.map(function (p) {
      var idea = p.idea_id ? findIdea(p.idea_id) : null;
      var ideaLabel = idea ? ideaName(idea) : (p.idea_name || t("otherIdea"));
      var mat = p.material && D.materials[p.material] ? p.material : null;
      var liked = C.isLiked(p.id);
      var who = p.name || t("anonymous");
      return '<li class="g-item">' + (p.example ? '<span class="tag">' + esc(t("sample")) + "</span>" : "") +
        '<img src="' + esc(safeImg(p.image_url)) + '" alt="' + esc(p.caption) + '" loading="lazy">' +
        '<div class="g-cap"><b>' + esc(p.caption) + '</b><span class="fine">' + (mat ? '<span class="swatch" style="background:' + D.materials[mat].bin + '"></span>' : "") + esc(ideaLabel) + "</span>" +
        '<span class="fine">' + esc(t("by", { name: who })) + " · " + esc(dateText(p.created_at)) + "</span></div>" +
        '<div class="g-actions"><button type="button" class="like" data-like="' + esc(p.id) + '" aria-pressed="' + liked + '" aria-label="' + esc(t("like")) + '">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg><span class="num">' + p.shownLikes + "</span></button>" +
        (String(p.id).indexOf("l-") === 0 ? '<button type="button" class="btn ghost small" data-premove="' + esc(p.id) + '">' + esc(t("del")) + "</button>" : "") + "</div></li>";
    }).join("") + "</ul>";
  }

  function sharePost(e) {
    e.preventDefault();
    var file = $("postPhoto").files[0];
    var caption = $("postCaption").value.trim();
    if (!file) { toast(t("needPhoto")); return; }
    if (!caption) { toast(t("needCaption")); $("postCaption").focus(); return; }
    var idea = findIdea($("postIdea").value);
    var btn = $("postSubmit");
    btn.disabled = true; btn.textContent = t("sharing");
    C.add({ name: $("postName").value.trim().slice(0, 40), caption: caption.slice(0, 120), idea_id: idea ? idea.id : "", idea_name: idea ? idea.name : "", material: idea ? idea.material : "" }, file)
      .then(function (res) {
        state.community.posts.unshift(res.post);
        toast(res.live ? t("shared") : (res.stored === false ? t("storageFull") : t("sharedLocal")));
        $("postForm").reset();
        renderCommunity();
      })
      .catch(function (err) { toast(/read|blob|image/i.test(String(err && err.message)) ? t("photoReadFail") : t("shareFail")); })
      .then(function () { btn.disabled = false; btn.textContent = t("share"); });
  }

  /* ---------- tabs, counts and toast ---------- */
  function showTab(tab) {
    state.tab = tab;
    document.querySelectorAll(".tab").forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-tab") === tab ? "true" : "false"); });
    document.querySelectorAll(".view").forEach(function (v) { v.hidden = v.id !== "view-" + tab; });
    if (tab === "projects") renderProjects();
    if (tab === "impact") renderImpact();
    if (tab === "community") { if (!state.community.loaded) loadCommunity(); else renderCommunity(); }
  }
  function renderTabCounts() { $("countProjects").textContent = state.projects.length || ""; }
  var toastTimer;
  function toast(msg) {
    var el = $("toast");
    el.textContent = msg; el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.hidden = true; }, 3400);
  }

  function rerenderAll() {
    applyLang();
    if (state.results && !state.results.error) analyse(false); else renderResults();
    if (state.tab === "projects") renderProjects();
    if (state.tab === "impact") renderImpact();
    if (state.tab === "community") renderCommunity();
    var sub = $("postSubmit"); if (sub && !sub.disabled) sub.textContent = t("share");
  }

  /* ---------- wiring ---------- */
  function init() {
    $("chips").addEventListener("click", function (e) {
      var c = e.target.closest(".chip"); if (!c) return;
      $("material").value = c.getAttribute("data-mat");
      renderDetection();
    });
    var qtyTouched = false;
    $("qty").addEventListener("input", function () { qtyTouched = true; });
    $("desc").addEventListener("input", function () {
      var v = $("desc").value;
      state.textGuess = detectFromText(v);
      var n = v.match(/(^|\s)(\d{1,4})(?=\s|$)/);
      if (n && !qtyTouched) $("qty").value = parseInt(n[2], 10);
      renderDetection();
    });
    $("photo").addEventListener("change", function (e) { handlePhoto(e.target.files[0]); });
    $("clearPhoto").addEventListener("click", clearPhoto);
    var drop = $("drop");
    ["dragenter", "dragover"].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add("is-over"); }); });
    ["dragleave", "drop"].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove("is-over"); }); });
    drop.addEventListener("drop", function (e) { if (e.dataTransfer.files[0]) handlePhoto(e.dataTransfer.files[0]); });
    $("itemForm").addEventListener("submit", function (e) { e.preventDefault(); analyse(true); });

    $("results").addEventListener("click", function (e) {
      var card = e.target.closest("[data-idea]");
      if (card) {
        state.selectedId = card.getAttribute("data-idea"); state.detailTab = "overview";
        document.querySelectorAll(".idea-card").forEach(function (b) {
          var on = b.getAttribute("data-idea") === state.selectedId;
          b.classList.toggle("is-selected", on); b.setAttribute("aria-pressed", on);
        });
        renderDetail();
        var d = $("detail"); if (d && d.scrollIntoView) d.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      var sub = e.target.closest("[data-sub]");
      if (sub) { state.detailTab = sub.getAttribute("data-sub"); renderDetail(); return; }
      if (e.target.id === "copyPlan") copyPlan(e.target);
      if (e.target.id === "saveProject") saveProject(e.target);
    });
    $("results").addEventListener("input", function (e) {
      if (e.target.id !== "workshopPeople") return;
      var v = parseInt(e.target.value, 10);
      if (!v || v < 2) return;
      state.workshopPeople = Math.min(200, v);
      var pos = e.target.selectionStart;
      renderDetail();
      var inp = $("workshopPeople"); inp.focus(); try { inp.setSelectionRange(pos, pos); } catch (err) {}
    });

    $("projectsBody").addEventListener("change", function (e) {
      var id = e.target.getAttribute("data-made"); if (!id) return;
      state.projects.forEach(function (p) { if (String(p.id) === id) p.made = e.target.checked; });
      store.set("projects", state.projects);
    });
    $("projectsBody").addEventListener("click", function (e) {
      var id = e.target.getAttribute("data-del"); if (!id) return;
      state.projects = state.projects.filter(function (p) { return String(p.id) !== id; });
      store.set("projects", state.projects); renderProjects(); renderTabCounts();
    });

    document.addEventListener("change", function (e) {
      if (!e.target.hasAttribute || !e.target.hasAttribute("data-samples")) return;
      state.showSamples = e.target.checked; store.set("showSamples", state.showSamples);
      if (state.tab === "impact") renderImpact();
      if (state.tab === "community") renderCommunity();
    });
    $("postForm").addEventListener("submit", sharePost);
    $("view-community").addEventListener("click", function (e) {
      var f = e.target.closest("[data-filter]");
      if (f) { state.community.filter = f.getAttribute("data-filter"); renderCommunity(); return; }
      var lk = e.target.closest("[data-like]");
      if (lk) {
        var id = lk.getAttribute("data-like");
        var post = communityPosts().filter(function (p) { return String(p.id) === id; })[0];
        if (!post || C.isLiked(post.id)) return;
        C.like(post).then(function (n) {
          state.community.posts.forEach(function (p) { if (String(p.id) === id) p.likes = n; });
          renderCommunity();
        }).catch(function () { renderCommunity(); });
        return;
      }
      var rm = e.target.closest("[data-premove]");
      if (rm) {
        var rid = rm.getAttribute("data-premove");
        C.removeLocal(rid);
        state.community.posts = state.community.posts.filter(function (p) { return String(p.id) !== rid; });
        renderCommunity();
      }
    });
    $("view-community").addEventListener("change", function (e) {
      if (e.target.id === "communitySort") { state.community.sort = e.target.value; renderCommunity(); }
    });

    document.querySelectorAll(".tab").forEach(function (b) { b.addEventListener("click", function () { showTab(b.getAttribute("data-tab")); }); });
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { state.lang = b.getAttribute("data-lang"); store.set("lang", state.lang); rerenderAll(); });
    });

    // Example so the first view shows a full plan
    $("desc").value = "Old car tyre, a bit worn but no big cuts";
    $("qty").value = 2;
    applyLang();
    $("condition").value = "good";
    state.textGuess = detectFromText($("desc").value);
    updateSizeOptions("tyre");
    $("size").value = "medium";
    analyse(false);
    renderTabCounts();
    C.init();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
