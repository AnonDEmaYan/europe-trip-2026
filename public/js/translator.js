/**
 * Loads Google Translate Website Element — English ↔ Telugu for this static site.
 * Requires #google_translate_element in the header. Uses cookie googtrans across pages.
 */
(function () {
  var mount = document.getElementById("google_translate_element");
  if (!mount) return;

  window.googleTranslateElementInit = function () {
    if (!window.google || !google.translate || !google.translate.TranslateElement) return;
    new google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,te",
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };

  var s = document.createElement("script");
  s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  s.async = true;
  s.onerror = function () {
    mount.innerHTML =
      '<span class="site-translate__fallback">Translation unavailable (check network / ad blocker).</span>';
  };
  document.head.appendChild(s);
})();
