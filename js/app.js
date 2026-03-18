/* ============================================
   ROUBEN GHAMBARYAN — PORTFOLIO
   Main Application Script
   ============================================ */

(function () {
  'use strict';

  // --- Locomotive Scroll ---
  let scroll;

  function initScroll() {
    const container = document.querySelector('#scrollContainer');
    if (!container) return;

    scroll = new LocomotiveScroll({
      el: container,
      smooth: true,
      multiplier: 0.8,
      lerp: 0.08,
      smartphone: { smooth: true, multiplier: 1.2 },
      tablet: { smooth: true, multiplier: 1 },
    });

    // Nav background on scroll
    scroll.on('scroll', (args) => {
      const nav = document.getElementById('nav');
      if (args.scroll.y > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });

    // Update scroll after images/fonts load
    window.addEventListener('load', () => {
      setTimeout(() => scroll.update(), 500);
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
      }, 800);
    });
  }

  // --- Hero Reveal ---
  function revealHero() {
    const nameTexts = document.querySelectorAll('.reveal-text');
    const heroInfo = document.querySelector('.hero-info');

    nameTexts.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, 200 + i * 150);
    });

    if (heroInfo) {
      setTimeout(() => {
        heroInfo.classList.add('visible');
      }, 600);
    }
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

    // Reveal on page entry
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

    // Close menu on link click
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
        if (el && scroll) {
          scroll.scrollTo(el);
        } else if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // --- Cursor Effect (subtle glow following mouse) ---
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

  // --- Scroll-based reveal for elements without Locomotive ---
  function initIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
        }
      });
    }, observerOptions);

    // Fallback for non-locomotive elements
    document.querySelectorAll('.fade-in').forEach((el) => {
      observer.observe(el);
    });
  }

  // --- Initialize ---
  function init() {
    initLoader();
    initScroll();
    initTransitions();
    initMobileMenu();
    initScrollTo();
    initCursorGlow();
    initIntersectionObserver();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
