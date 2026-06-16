/* The Daily on Suffolk — shared interactions */
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Intro overlay
  var intro = document.querySelector(".intro");
  if (intro) {
    window.addEventListener("load", function () {
      setTimeout(function () { intro.classList.add("hide"); }, reduced ? 200 : 1400);
    });
    // safety: never trap the page
    setTimeout(function () { intro.classList.add("hide"); }, 3000);
  }

  // Nav scroll state
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var burger = document.querySelector(".nav__burger");
  var links = document.querySelector(".nav__links");
  if (burger && links) {
    burger.addEventListener("click", function () { links.classList.toggle("open"); });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  // Hero rolling slides
  var slides = document.querySelectorAll(".hero__slide");
  var dots = document.querySelectorAll(".hero__dots i");
  if (slides.length > 1 && !reduced) {
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove("active");
      if (dots[i]) dots[i].classList.remove("on");
      i = (i + 1) % slides.length;
      slides[i].classList.add("active");
      if (dots[i]) dots[i].classList.add("on");
    }, 6000);
  }

  // Reveal on scroll
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }
})();
