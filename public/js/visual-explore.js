/**
 * Interactive photo grid + lightbox for TRIP_SPOTS (requires places-data.js).
 */
(function () {
  "use strict";

  var root = document.getElementById("trip-visual-root");
  if (!root || !window.TRIP_SPOTS || !window.TRIP_IMAGE_POOLS) return;

  var pools = window.TRIP_IMAGE_POOLS;
  var spots = window.TRIP_SPOTS.slice();
  var counters = {};
  var filtered = [];
  var openIndex = -1;

  spots.forEach(function (s) {
    var key = s.city + "|" + s.cat;
    counters[key] = counters[key] || 0;
    var pool = pools[s.city] && pools[s.city][s.cat];
    var im = pool && pool[counters[key] % pool.length];
    counters[key]++;
    s._img = im || { url: "", credit: "", creditUrl: "#" };
    if (s.localImage) {
      s._img = {
        url: s.localImage,
        credit: s.localCredit || "Your trip photo",
        creditUrl: s.localCreditUrl || "#",
        isLocal: true,
      };
    }
  });

  var cityLabels = { barcelona: "Barcelona", madrid: "Madrid", paris: "Paris", all: "All cities" };
  var catLabels = {
    all: "All types",
    coffee: "Coffee",
    food: "Food",
    winery: "Wine & cava",
    wander: "Wander",
    shop: "Shopping",
  };

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function applyFilters() {
    var c = root.querySelector(".viz-toolbar").getAttribute("data-city") || "all";
    var t = root.querySelector(".viz-toolbar").getAttribute("data-cat") || "all";
    filtered = spots.filter(function (s) {
      if (c !== "all" && s.city !== c) return false;
      if (t !== "all" && s.cat !== t) return false;
      return true;
    });
    renderGrid();
    root.querySelector(".viz-count").textContent = filtered.length + " place" + (filtered.length !== 1 ? "s" : "");
  }

  function renderGrid() {
    var grid = root.querySelector(".viz-grid");
    grid.innerHTML = "";
    filtered.forEach(function (s, i) {
      var card = el("article", "viz-card");
      card.setAttribute("data-index", String(i));
      var btn = el("button", "viz-card__media", "");
      btn.type = "button";
      btn.setAttribute("aria-label", "Open photo: " + s.name);
      var img = document.createElement("img");
      img.src = s._img.url;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      btn.appendChild(img);
      var body = el("div", "viz-card__body");
      body.innerHTML =
        '<span class="viz-card__city">' +
        cityLabels[s.city] +
        "</span>" +
        "<h3 class=\"viz-card__title\">" +
        escapeHtml(s.name) +
        "</h3>" +
        "<p class=\"viz-card__note\">" +
        escapeHtml(s.note) +
        "</p>" +
        '<a class="viz-card__maps" href="' +
        escapeAttr(s.maps) +
        '" target="_blank" rel="noopener">Google Maps →</a>';
      card.appendChild(btn);
      card.appendChild(body);
      btn.addEventListener("click", function () {
        openLightbox(i);
      });
      grid.appendChild(card);
    });
  }

  function escapeHtml(t) {
    var d = document.createElement("div");
    d.textContent = t;
    return d.innerHTML;
  }

  function escapeAttr(t) {
    return String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }

  function openLightbox(gridIndex) {
    openIndex = gridIndex;
    var s = filtered[openIndex];
    if (!s) return;
    var modal = root.querySelector(".viz-modal");
    var big = modal.querySelector(".viz-modal__visual .viz-modal__img");
    big.src = s._img.url;
    big.alt = s.name;
    modal.querySelector(".viz-modal__title").textContent = s.name;
    modal.querySelector(".viz-modal__meta").textContent =
      cityLabels[s.city] + " · " + (catLabels[s.cat] || s.cat);
    modal.querySelector(".viz-modal__note").textContent = s.note;
    var cred = modal.querySelector(".viz-modal__credit");
    if (s._img.isLocal) {
      cred.innerHTML =
        escapeHtml(s._img.credit) +
        (s._img.creditUrl && s._img.creditUrl !== "#"
          ? ' · <a href="' + escapeAttr(s._img.creditUrl) + '" target="_blank" rel="noopener">credit link</a>'
          : "");
    } else {
      cred.innerHTML =
        'Photo: <a href="' +
        escapeAttr(s._img.creditUrl) +
        '" target="_blank" rel="noopener">' +
        escapeHtml(s._img.credit) +
        "</a> (thematic — not always this exact venue)";
    }
    modal.querySelector(".viz-modal__maps").href = s.maps;
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("viz-modal-open");
    modal.querySelector(".viz-modal__close").focus();
  }

  function closeLightbox() {
    var modal = root.querySelector(".viz-modal");
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("viz-modal-open");
    openIndex = -1;
  }

  function stepLightbox(delta) {
    if (openIndex < 0 || filtered.length === 0) return;
    openIndex = (openIndex + delta + filtered.length) % filtered.length;
    openLightbox(openIndex);
  }

  /** Horizontal swipe (touch) and drag (mouse / pen) on the photo area. */
  function attachSwipeHandlers(visual) {
    if (!visual) return;

    var startX = 0;
    var startY = 0;
    var tracking = false;
    var pointerId = null;
    var threshold = 48;

    function endSwipe(clientX, clientY) {
      if (!tracking) return;
      tracking = false;
      var dx = clientX - startX;
      var dy = clientY - startY;
      if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      if (dx > 0) stepLightbox(-1);
      else stepLightbox(1);
    }

    function onImage(el) {
      return el && el.classList && el.classList.contains("viz-modal__img");
    }

    visual.addEventListener(
      "touchstart",
      function (e) {
        if (e.touches.length !== 1 || !onImage(e.target)) return;
        tracking = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      },
      { passive: true }
    );

    visual.addEventListener(
      "touchend",
      function (e) {
        if (!tracking || !e.changedTouches.length) return;
        endSwipe(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      },
      { passive: true }
    );

    visual.addEventListener(
      "touchcancel",
      function () {
        tracking = false;
      },
      { passive: true }
    );

    visual.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch") return;
      if (e.button !== 0 || !onImage(e.target)) return;
      tracking = true;
      pointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      try {
        visual.setPointerCapture(e.pointerId);
      } catch (err) {}
    });

    visual.addEventListener("pointerup", function (e) {
      if (e.pointerType === "touch") return;
      if (pointerId !== null && e.pointerId !== pointerId) return;
      pointerId = null;
      endSwipe(e.clientX, e.clientY);
    });

    visual.addEventListener("pointercancel", function () {
      pointerId = null;
      tracking = false;
    });
  }

  function buildChrome() {
    root.innerHTML = "";
    var toolbar = el("div", "viz-toolbar");
    toolbar.setAttribute("data-city", "all");
    toolbar.setAttribute("data-cat", "all");

    var row1 = el("div", "viz-toolbar__row");
    row1.appendChild(el("span", "viz-toolbar__label", "City"));
    var cities = el("div", "viz-chips");
    ["all", "barcelona", "madrid", "paris"].forEach(function (c) {
      var b = el("button", "viz-chip" + (c === "all" ? " is-active" : ""));
      b.type = "button";
      b.textContent = cityLabels[c];
      b.setAttribute("data-filter-city", c);
      cities.appendChild(b);
    });
    row1.appendChild(cities);
    toolbar.appendChild(row1);

    var row2 = el("div", "viz-toolbar__row");
    row2.appendChild(el("span", "viz-toolbar__label", "Type"));
    var cats = el("div", "viz-chips");
    ["all", "coffee", "food", "winery", "wander", "shop"].forEach(function (c) {
      var b = el("button", "viz-chip" + (c === "all" ? " is-active" : ""));
      b.type = "button";
      b.textContent = catLabels[c] || c;
      b.setAttribute("data-filter-cat", c);
      cats.appendChild(b);
    });
    row2.appendChild(cats);
    toolbar.appendChild(row2);

    var count = el("p", "viz-count", "");
    toolbar.appendChild(count);

    root.appendChild(toolbar);

    var grid = el("div", "viz-grid", "");
    root.appendChild(grid);

    var modal = el("div", "viz-modal");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Place photo");
    modal.hidden = true;
    modal.innerHTML =
      '<div class="viz-modal__backdrop" tabindex="-1"></div>' +
      '<div class="viz-modal__panel">' +
      '<button type="button" class="viz-modal__close" aria-label="Close">×</button>' +
      '<div class="viz-modal__visual">' +
      '<button type="button" class="viz-modal__nav viz-modal__nav--prev" aria-label="Previous">‹</button>' +
      '<button type="button" class="viz-modal__nav viz-modal__nav--next" aria-label="Next">›</button>' +
      '<img class="viz-modal__img" src="" alt="" />' +
      "</div>" +
      '<div class="viz-modal__caption">' +
      '<h3 class="viz-modal__title"></h3>' +
      '<p class="viz-modal__meta"></p>' +
      '<p class="viz-modal__note"></p>' +
      '<p class="viz-modal__credit"></p>' +
      '<p class="viz-modal__hint">Swipe or drag on the photo · ← → keys</p>' +
      '<a class="btn btn--primary viz-modal__maps" href="#" target="_blank" rel="noopener">Open in Google Maps</a>' +
      "</div>" +
      "</div>";
    root.appendChild(modal);

    toolbar.addEventListener("click", function (e) {
      var bc = e.target.closest("[data-filter-city]");
      if (bc) {
        closeLightbox();
        toolbar.querySelectorAll("[data-filter-city]").forEach(function (x) {
          x.classList.toggle("is-active", x === bc);
        });
        toolbar.setAttribute("data-city", bc.getAttribute("data-filter-city"));
        applyFilters();
        return;
      }
      var bt = e.target.closest("[data-filter-cat]");
      if (bt) {
        closeLightbox();
        toolbar.querySelectorAll("[data-filter-cat]").forEach(function (x) {
          x.classList.toggle("is-active", x === bt);
        });
        toolbar.setAttribute("data-cat", bt.getAttribute("data-filter-cat"));
        applyFilters();
      }
    });

    modal.querySelector(".viz-modal__backdrop").addEventListener("click", closeLightbox);
    modal.querySelector(".viz-modal__close").addEventListener("click", closeLightbox);
    modal.querySelector(".viz-modal__nav--prev").addEventListener("click", function () {
      stepLightbox(-1);
    });
    modal.querySelector(".viz-modal__nav--next").addEventListener("click", function () {
      stepLightbox(1);
    });

    attachSwipeHandlers(modal.querySelector(".viz-modal__visual"));

    document.addEventListener("keydown", function (e) {
      if (modal.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
    });
  }

  function applyHash() {
    var h = (location.hash || "").replace(/^#/, "").toLowerCase();
    if (!h || !["barcelona", "madrid", "paris"].includes(h)) return;
    var toolbar = root.querySelector(".viz-toolbar");
    if (!toolbar) return;
    toolbar.querySelectorAll("[data-filter-city]").forEach(function (x) {
      x.classList.toggle("is-active", x.getAttribute("data-filter-city") === h);
    });
    toolbar.setAttribute("data-city", h);
    applyFilters();
  }

  buildChrome();
  applyFilters();
  applyHash();
  window.addEventListener("hashchange", applyHash);
})();
