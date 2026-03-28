(function () {
  var KEY = "trip_pages_ok";
  var digest = typeof window.__TRIP_PAGES_EXPECTED_DIGEST__ === "string"
    ? window.__TRIP_PAGES_EXPECTED_DIGEST__
    : "";
  if (!digest) return;

  try {
    if (sessionStorage.getItem(KEY) === "1") return;
  } catch (e) {
    return;
  }

  function hex(buf) {
    return Array.from(new Uint8Array(buf))
      .map(function (b) { return b.toString(16).padStart(2, "0"); })
      .join("");
  }

  function sha256Hex(text) {
    var enc = new TextEncoder();
    return crypto.subtle.digest("SHA-256", enc.encode(text)).then(hex);
  }

  var root = document.createElement("div");
  root.id = "trip-site-gate";
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  root.setAttribute("aria-label", "Sign in");
  root.innerHTML =
    '<div class="trip-gate__panel">' +
    '<h1 class="trip-gate__title">Europe trip</h1>' +
    '<p class="trip-gate__hint">Enter the username and password to continue.</p>' +
    '<form class="trip-gate__form" id="trip-gate-form">' +
    '<label class="trip-gate__label">Username<input type="text" name="u" autocomplete="username" required /></label>' +
    '<label class="trip-gate__label">Password<input type="password" name="p" autocomplete="current-password" required /></label>' +
    '<p class="trip-gate__err" id="trip-gate-err" hidden></p>' +
    '<button type="submit" class="trip-gate__btn">Continue</button>' +
    "</form></div>";

  var style = document.createElement("style");
  style.textContent =
    "#trip-site-gate{position:fixed;inset:0;z-index:2147483647;display:flex;" +
    "align-items:center;justify-content:center;padding:1.25rem;" +
    "background:rgba(26,22,18,.92);font-family:system-ui,sans-serif}" +
    ".trip-gate__panel{max-width:22rem;width:100%;padding:1.5rem;border-radius:12px;" +
    "background:#faf7f2;box-shadow:0 12px 40px rgba(0,0,0,.25);color:#1a1510}" +
    ".trip-gate__title{margin:0 0 .5rem;font-size:1.25rem;font-weight:700}" +
    ".trip-gate__hint{margin:0 0 1rem;font-size:.875rem;opacity:.85}" +
    ".trip-gate__form{display:flex;flex-direction:column;gap:.75rem}" +
    ".trip-gate__label{display:flex;flex-direction:column;gap:.35rem;font-size:.8rem;font-weight:600}" +
    ".trip-gate__label input{padding:.5rem .65rem;border:1px solid #c9c2b8;border-radius:8px;font-size:1rem}" +
    ".trip-gate__err{color:#8b2942;font-size:.8rem;margin:0}" +
    ".trip-gate__btn{margin-top:.25rem;padding:.6rem 1rem;border:none;border-radius:8px;" +
    "background:#8b5a3c;color:#fff;font-weight:600;cursor:pointer;font-size:1rem}" +
    ".trip-gate__btn:hover{filter:brightness(1.05)}";

  document.documentElement.appendChild(style);
  document.documentElement.appendChild(root);

  var form = root.querySelector("#trip-gate-form");
  var errEl = root.querySelector("#trip-gate-err");

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    errEl.hidden = true;
    var fd = new FormData(form);
    var u = (fd.get("u") || "").toString().trim();
    var p = (fd.get("p") || "").toString();
    sha256Hex(u + ":" + p).then(function (got) {
      if (got === digest) {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch (e2) {}
        root.remove();
        style.remove();
      } else {
        errEl.textContent = "That username or password is not correct.";
        errEl.hidden = false;
      }
    }).catch(function () {
      errEl.textContent = "Could not verify. Try a different browser or enable JavaScript.";
      errEl.hidden = false;
    });
  });
})();
