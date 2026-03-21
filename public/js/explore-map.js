/**
 * Leaflet map: all Explore + hubs + stadiums from data/explore-places.geojson
 */
(function () {
  "use strict";

  var mapEl = document.getElementById("explore-map-frame");
  var toolbar = document.getElementById("explore-map-toolbar");
  var countEl = document.getElementById("explore-map-count");
  if (!mapEl || typeof L === "undefined") return;

  var CITY_COLORS = {
    barcelona: "#2a6f7c",
    madrid: "#c45c3e",
    paris: "#6b4ea0",
    transport: "#5c6578",
    football: "#1d7a3d",
  };

  var CAT_EXTRA = {
    cruise: "#0077b6",
    spicy: "#b85c38",
    wine_trip: "#8e6b5a",
  };

  var state = {
    geo: null,
    map: null,
    clusterGroup: null,
    filterCity: "all",
  };

  function colorForProps(p) {
    if (p.city === "transport") return CITY_COLORS.transport;
    if (p.city === "football" || p.category === "football") return CITY_COLORS.football;
    if (p.category === "cruise") return CAT_EXTRA.cruise;
    if (p.category === "spicy") return CAT_EXTRA.spicy;
    if (p.category === "wine_trip") return CAT_EXTRA.wine_trip;
    return CITY_COLORS[p.city] || "#2a6f7c";
  }

  function iconForColor(hex) {
    return L.divIcon({
      className: "explore-map-pin",
      html:
        '<span style="display:block;width:14px;height:14px;border-radius:50%;background:' +
        hex +
        ';border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.35)"></span>',
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });
  }

  function popupHtml(props) {
    var city = props.city || "";
    var cat = props.category || "";
    var meta = [city, cat].filter(Boolean).join(" · ");
    return (
      '<div class="map-popup__title">' +
      escapeHtml(props.name || "Place") +
      "</div>" +
      '<div class="map-popup__meta">' +
      escapeHtml(meta) +
      "</div>" +
      '<a class="map-popup__link" href="' +
      escapeAttr(props.mapsUrl || "#") +
      '" target="_blank" rel="noopener">Google Maps →</a>'
    );
  }

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function escapeAttr(s) {
    return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }

  function passesFilter(props) {
    if (state.filterCity === "all") return true;
    if (state.filterCity === "transport") return props.city === "transport";
    if (state.filterCity === "football") return props.city === "football";
    return props.city === state.filterCity;
  }

  function rebuildMarkers() {
    if (!state.clusterGroup || !state.geo) return;
    state.clusterGroup.clearLayers();
    var n = 0;
    state.geo.features.forEach(function (feat) {
      var p = feat.properties || {};
      if (!passesFilter(p)) return;
      var coords = feat.geometry && feat.geometry.coordinates;
      if (!coords || coords.length < 2) return;
      var latlng = [coords[1], coords[0]];
      var m = L.marker(latlng, { icon: iconForColor(colorForProps(p)) });
      m.bindPopup(popupHtml(p));
      state.clusterGroup.addLayer(m);
      n++;
    });
    if (countEl) countEl.textContent = n + " pin" + (n !== 1 ? "s" : "") + " visible";
    try {
      if (state.clusterGroup.getLayers().length) {
        state.map.fitBounds(state.clusterGroup.getBounds().pad(0.08));
      }
    } catch (e) {}
  }

  function setFilter(value) {
    state.filterCity = value;
    if (toolbar) {
      toolbar.querySelectorAll("[data-map-filter]").forEach(function (btn) {
        btn.classList.toggle("is-active", btn.getAttribute("data-map-filter") === value);
      });
    }
    rebuildMarkers();
  }

  function initMap() {
    state.map = L.map(mapEl, { scrollWheelZoom: true }).setView([45.5, 2.5], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap",
    }).addTo(state.map);

    state.clusterGroup = L.markerClusterGroup({
      maxClusterRadius: 52,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
    });
    state.map.addLayer(state.clusterGroup);
  }

  function applyHashFilter() {
    var h = (location.hash || "").replace(/^#/, "").toLowerCase();
    if (["barcelona", "madrid", "paris", "transport", "football"].indexOf(h) >= 0) {
      setFilter(h);
      return true;
    }
    return false;
  }

  function loadData() {
    var url = "data/explore-places.geojson";
    fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error("geojson " + r.status);
        return r.json();
      })
      .then(function (geo) {
        state.geo = geo;
        if (!applyHashFilter()) rebuildMarkers();
      })
      .catch(function () {
        if (countEl) countEl.textContent = "Could not load map data (check path / deploy).";
      });
  }

  if (toolbar) {
    toolbar.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-map-filter]");
      if (!btn) return;
      setFilter(btn.getAttribute("data-map-filter"));
    });
  }

  window.addEventListener("hashchange", function () {
    if (!state.geo) return;
    if (!applyHashFilter()) {
      setFilter("all");
    }
  });

  initMap();
  loadData();
})();
