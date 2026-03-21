(function () {
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("site-nav");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  var y = document.getElementById("js-year");
  if (y) y.textContent = new Date().getFullYear();
})();
