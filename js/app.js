/* ============================================
   ROUBEN GHAMBARYAN — PORTFOLIO
   Main Application Script (Lenis + IntersectionObserver)
   ============================================ */

(function () {
  'use strict';

  // --- Lenis Smooth Scroll ---
  let lenis;

  function initLenis() {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Nav behavior on scroll
    let lastScroll = 0;
    lenis.on('scroll', ({ scroll }) => {
      const nav = document.getElementById('nav');
      const heroSection = document.querySelector('.hero');
      const heroBottom = heroSection ? heroSection.offsetHeight : 600;
      const workSection = document.getElementById('work');
      const workBottom = workSection ? workSection.offsetTop + workSection.offsetHeight : Infinity;

      // Add scrolled background after 50px
      if (scroll > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      // Hide nav in the "work" zone, show it at top or when scrolling past work
      if (scroll > heroBottom * 0.7 && scroll < workBottom - 200) {
        // In work section: hide on scroll down, show on scroll up
        if (scroll > lastScroll && scroll - lastScroll > 5) {
          nav.classList.add('nav-hidden');
          nav.classList.remove('nav-visible');
        } else if (lastScroll - scroll > 5) {
          nav.classList.remove('nav-hidden');
          nav.classList.add('nav-visible');
        }
      } else {
        // At hero or past work: always show
        nav.classList.remove('nav-hidden');
        nav.classList.add('nav-visible');
      }
      lastScroll = scroll;
    });
  }

  // --- Loader ---
  function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('loaded');
        revealHero();
      }, 600);
    });
  }

  // --- Hero Reveal ---
  function revealHero() {
    const heroElements = document.querySelectorAll('.hero-browser, .hero-bio-grid, .hero-scroll-arrow');
    heroElements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, 200 + i * 200);
    });
  }

  // --- Scroll-triggered reveal animations ---
  function initScrollReveal() {
    const reveals = document.querySelectorAll('[data-scroll]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    });

    reveals.forEach((el) => observer.observe(el));
  }

  // --- Page Transitions ---
  function initTransitions() {
    const transitionOverlay = document.getElementById('pageTransition');
    const links = document.querySelectorAll('[data-transition]');

    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === '#' || href.startsWith('http')) return;

        e.preventDefault();
        transitionOverlay.classList.add('active');

        setTimeout(() => {
          window.location.href = href;
        }, 800);
      });
    });

    window.addEventListener('pageshow', () => {
      transitionOverlay.classList.remove('active');
    });
  }

  // --- Mobile Menu ---
  function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    const menuLinks = menu.querySelectorAll('.mobile-menu-link');
    menuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Smooth Scroll To ---
  function initScrollTo() {
    const scrollLinks = document.querySelectorAll('[data-scroll-to]');

    scrollLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        if (!target || target === '#') return;

        const el = document.querySelector(target);
        if (el && lenis) {
          lenis.scrollTo(el, { offset: -80 });
        } else if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // --- Cursor Glow ---
  function initCursorGlow() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%);
      pointer-events: none;
      z-index: 1;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }

    animateGlow();
  }

  // --- Initialize ---
  function init() {
    initLoader();
    initLenis();
    initTransitions();
    initMobileMenu();
    initScrollTo();
    initScrollReveal();
    initCursorGlow();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
