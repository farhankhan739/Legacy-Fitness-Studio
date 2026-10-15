/* Legacy Fitness Studio - page behaviour: mobile menu, photo viewer, appointment form.
   Business details (phone, address...) live in index.html, not here. */
"use strict";
(function () {
  var $ = function (selector) { return document.querySelector(selector); };
  var digits = function (value) { return value.replace(/\D/g, ""); };

  var year = $("#yr");
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Mobile menu ---- */
  var burger = $("#bg"), menu = $("#lk");
  if (burger && menu) {
    var setMenu = function (open) {
      menu.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    burger.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); burger.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (menu.classList.contains("open") && !menu.contains(e.target) && !burger.contains(e.target)) setMenu(false);
    });
  }

  /* ---- Photo viewer (native <dialog>) ---- */
  var viewer = $("#lb"), gallery = $("#gal");
  if (viewer && gallery && typeof viewer.showModal === "function") {
    var viewerImg = viewer.querySelector("img"), viewerCaption = viewer.querySelector("p");
    gallery.addEventListener("click", function (e) {
      var tile = e.target.closest("button");
      var thumb = tile && tile.querySelector("img");
      if (!thumb) return;
      viewerImg.src = thumb.currentSrc || thumb.src;
      viewerImg.alt = thumb.alt;
      viewerCaption.textContent = tile.dataset.c || "";
      viewer.showModal();
    });
    viewer.querySelector(".x").addEventListener("click", function () { viewer.close(); });
    viewer.addEventListener("click", function (e) { if (e.target === viewer) viewer.close(); });
  }

  /* ---- Appointment form -> WhatsApp click-to-chat ----
     Nothing is stored or sent by this website. The visitor's WhatsApp opens with a ready
     message and it is only delivered when they press send there. */
  var form = $("#fm"), status = $("#st");
  if (form && status) {
    var number = digits(form.dataset.whatsapp || "");
    var mark = function (input, bad) {
      input.closest(".f").toggleAttribute("data-bad", bad);
      input.setAttribute("aria-invalid", String(bad));
    };
    form.addEventListener("input", function (e) { if (e.target.closest(".f")) mark(e.target, false); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nameField = form.elements.n, phoneField = form.elements.p;
      var name = nameField.value.trim(), phone = phoneField.value.trim(), note = form.elements.m.value.trim();
      var okName = name.length >= 2 && name.length <= 80;
      var okPhone = /^[\d\s+()-]+$/.test(phone) && digits(phone).length >= 7 && digits(phone).length <= 15;
      mark(nameField, !okName); mark(phoneField, !okPhone);
      if (!okName || !okPhone) {
        status.className = "no";
        status.textContent = "Please fix the highlighted fields.";
        (okName ? phoneField : nameField).focus();
        return;
      }
      if (!/^\d{10,15}$/.test(number)) {
        status.className = "no";
        status.textContent = "WhatsApp is not set up on this website yet, so nothing was sent.";
        return;
      }
      var text = "Hi Legacy Fitness Studio, I'd like to schedule an appointment. My name is " + name +
        " and my number is " + phone + "." + (note ? " Preferred day/time: " + note + "." : "");
      var link = document.createElement("a");
      link.href = "https://wa.me/" + number + "?text=" + encodeURIComponent(text);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "open WhatsApp";
      status.className = "ok";
      status.textContent = "Opening WhatsApp. If nothing happens, tap to ";
      status.append(link, ". Press send there to deliver your request to the gym.");
      link.click();
      form.reset();
    });
  }
})();
