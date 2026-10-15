/* Scroll-reveal animations. Loaded in <head> so the "js" class is set before first paint.
   Without JavaScript the "js" class is never added, so all content stays visible. */
"use strict";
(function () {
  document.documentElement.classList.add("js");

  function init() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".rv"));
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target); // each element animates once
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    items.forEach(function (el) { observer.observe(el); });
    window.addEventListener("pagehide", function () { observer.disconnect(); }, { once: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
