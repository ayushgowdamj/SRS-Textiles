/**
 * SRTSM – Sri Ranganatha Textile Silk Mills
 * Main JavaScript – Interactions, Animations & EmailJS
 *
 * EmailJS Setup:
 *  1. Create account at https://www.emailjs.com/
 *  2. Add Gmail service → copy your Service ID
 *  3. Create Email Template → copy Template ID
 *  4. Get your Public Key from Account → API Keys
 *  5. Replace the placeholders below with your actual IDs
 */

'use strict';

/* ============================================================
   EMAILJS CONFIGURATION
   Replace these values with your actual EmailJS credentials
   ============================================================ */
const EMAILJS_CONFIG = {
  publicKey:   'YOUR_PUBLIC_KEY',    // e.g. 'a1B2c3D4e5F6g7H8'
  serviceId:   'YOUR_SERVICE_ID',    // e.g. 'service_xxxxxxx'
  templateId:  'YOUR_TEMPLATE_ID',   // e.g. 'template_xxxxxxx'
};

/* ============================================================
   INITIALISE EMAILJS
   ============================================================ */
(function initEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  }
})();

/* ============================================================
   DOM READY WRAPPER
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initSmoothScroll();
  initBackToTop();
  initHeroEffect();
  initInquiryForm();
  initActiveNavOnScroll();
  initHistoryShowcase();
});

/* ============================================================
   LOADING SCREEN
   ============================================================ */
function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;

  // Hide after page fully loads (max 2s)
  const hide = () => {
    screen.classList.add('hidden');
    document.body.style.overflow = '';
  };

  document.body.style.overflow = 'hidden';

  if (document.readyState === 'complete') {
    setTimeout(hide, 500);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 500));
    setTimeout(hide, 2500); // Fallback
  }
}

/* ============================================================
   NAVBAR – SCROLL BEHAVIOR
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on init
}

/* ============================================================
   ACTIVE NAV LINK ON SCROLL
   ============================================================ */
function initActiveNavOnScroll() {
  const sections = ['home', 'about', 'history', 'products', 'why-us', 'factory', 'location', 'contact'];
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const targetId = id === 'history' ? 'about' : id;
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${targetId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.35, rootMargin: '-80px 0px -40% 0px' }
  );

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay    = document.getElementById('menu-overlay');

  if (!hamburger || !mobileMenu || !overlay) return;

  const open = () => {
    hamburger.classList.add('active');
    mobileMenu.classList.add('open');
    overlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) close();
    else open();
  });

  overlay.addEventListener('click', close);

  // Close on link click
  mobileMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', close);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = 80; // navbar height offset
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   SCROLL ANIMATIONS (Intersection Observer)
   ============================================================ */
function initScrollAnimations() {
  const animatedEls = document.querySelectorAll('.animate-on-scroll');
  if (!animatedEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); // Animate once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  animatedEls.forEach(el => observer.observe(el));
}

/* ============================================================
   BACK TO TOP BUTTON
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   HERO PARALLAX / SCALE EFFECT
   ============================================================ */
function initHeroEffect() {
  const hero = document.getElementById('home');
  if (!hero) return;

  // Trigger the hero bg zoom-in animation
  setTimeout(() => hero.classList.add('loaded'), 100);

  // Subtle parallax on hero bg
  const heroBg = hero.querySelector('.hero-bg');
  if (!heroBg || window.innerWidth < 768) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `scale(1) translateY(${scrolled * 0.25}px)`;
    }
  }, { passive: true });
}

/* ============================================================
   DEALER INQUIRY FORM – EMAILJS INTEGRATION
   ============================================================ */
function initInquiryForm() {
  const form       = document.getElementById('inquiry-form');
  const submitBtn  = document.getElementById('form-submit-btn');
  const btnText    = document.getElementById('btn-text');
  const btnArrow   = document.getElementById('btn-arrow');
  const btnSpinner = document.getElementById('btn-spinner');
  const successDiv = document.getElementById('form-success');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!validateForm(form)) return;

    // Set loading state
    setSubmitState('loading');

    try {
      // Gather form data
      const templateParams = {
        from_name:    form.querySelector('#contact-name').value.trim(),
        company_name: form.querySelector('#contact-company').value.trim(),
        reply_to:     form.querySelector('#contact-email').value.trim(),
        phone:        form.querySelector('#contact-phone').value.trim(),
        message:      form.querySelector('#contact-message').value.trim(),
        to_name:      'SRTSM Team',
        sent_date:    new Date().toLocaleString('en-IN', {
          dateStyle: 'long', timeStyle: 'short', timeZone: 'Asia/Kolkata'
        }),
      };

      if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
        // Real EmailJS send
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          templateParams
        );
      } else {
        // Demo mode: simulate 1.5s send delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('[SRTSM] Demo mode – Inquiry data:', templateParams);
        console.log('[SRTSM] Configure EMAILJS_CONFIG at top of main.js to enable real sending.');
      }

      // Show success
      setSubmitState('success');
      form.style.display = 'none';
      successDiv.classList.add('show');

    } catch (error) {
      console.error('[SRTSM] EmailJS send failed:', error);
      setSubmitState('error');
      showFormError('Failed to send inquiry. Please call us directly or try again shortly.');
    }
  });

  function setSubmitState(state) {
    if (state === 'loading') {
      submitBtn.disabled = true;
      btnText.textContent = 'Sending...';
      btnArrow.style.display = 'none';
      btnSpinner.style.display = 'block';
    } else if (state === 'success') {
      submitBtn.disabled = false;
      btnText.textContent = 'Submit Inquiry';
      btnArrow.style.display = '';
      btnSpinner.style.display = 'none';
    } else if (state === 'error') {
      submitBtn.disabled = false;
      btnText.textContent = 'Try Again';
      btnArrow.style.display = '';
      btnSpinner.style.display = 'none';
    }
  }

  function validateForm(f) {
    let valid = true;
    const fields = f.querySelectorAll('[required]');

    // Remove previous errors
    f.querySelectorAll('.field-error').forEach(el => el.remove());
    f.querySelectorAll('.form-input, .form-textarea').forEach(el => {
      el.style.borderColor = '';
    });

    fields.forEach(field => {
      let error = '';

      if (!field.value.trim()) {
        error = 'This field is required.';
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
        error = 'Please enter a valid email address.';
      } else if (field.type === 'tel' && !/^[\d\s\+\-\(\)]{7,15}$/.test(field.value.trim())) {
        error = 'Please enter a valid phone number.';
      }

      if (error) {
        valid = false;
        field.style.borderColor = '#e05252';
        const errEl = document.createElement('span');
        errEl.className = 'field-error';
        errEl.style.cssText = 'color:#e05252;font-size:0.78rem;margin-top:4px;display:block;';
        errEl.textContent = error;
        field.parentNode.appendChild(errEl);
      }
    });

    return valid;
  }

  function showFormError(msg) {
    let errBanner = document.getElementById('form-error-banner');
    if (!errBanner) {
      errBanner = document.createElement('div');
      errBanner.id = 'form-error-banner';
      errBanner.style.cssText = `
        background:#fff0f0; border:1px solid #e05252; border-radius:8px;
        padding:12px 16px; margin-top:16px; font-size:0.875rem; color:#c0392b;
      `;
      form.appendChild(errBanner);
    }
    errBanner.textContent = msg;
    setTimeout(() => errBanner && errBanner.remove(), 6000);
  }
}

/* ============================================================
   GALLERY LIGHTBOX (Simple)
   ============================================================ */
(function initGalleryLightbox() {
  document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (!galleryItems.length) return;

    // Create lightbox
    const lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Image viewer');
    lb.style.cssText = `
      position:fixed; inset:0; background:rgba(0,0,0,0.90); z-index:9998;
      display:none; align-items:center; justify-content:center;
      cursor:pointer; backdrop-filter:blur(8px);
    `;

    const lbImg = document.createElement('img');
    lbImg.style.cssText = `
      max-width:90vw; max-height:90vh; border-radius:12px;
      box-shadow:0 20px 80px rgba(0,0,0,0.5); object-fit:contain;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close image viewer');
    closeBtn.style.cssText = `
      position:absolute; top:24px; right:32px; font-size:2.5rem;
      color:rgba(255,255,255,0.8); background:none; border:none; cursor:pointer;
      line-height:1;
    `;

    lb.appendChild(lbImg);
    lb.appendChild(closeBtn);
    document.body.appendChild(lb);

    const openLightbox = (src, alt) => {
      lbImg.src = src;
      lbImg.alt = alt || '';
      lb.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lb.style.display = 'none';
      document.body.style.overflow = '';
    };

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) openLightbox(img.src, img.alt);
      });
    });

    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
    closeBtn.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
  });
})();

/* ============================================================
   STATS COUNTER ANIMATION (Hero Numbers)
   ============================================================ */
(function initCounters() {
  document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.hero-stat-number[data-count]');
    if (!stats.length) return;

    const animateCounter = (el, target, duration = 1800) => {
      let start = 0;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // ease out cubic
        el.textContent = Math.floor(ease * target) + '+';
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.count);
          animateCounter(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(el => observer.observe(el));
  });
})();

/* ============================================================
   HISTORY / LEGACY SPLIT-PANE SHOWCASE CONTROLLER
   ============================================================ */
function initHistoryShowcase() {
  const navItems = document.querySelectorAll('.showcase-nav-item');
  const cards    = document.querySelectorAll('.showcase-card');

  if (!navItems.length || !cards.length) return;

  // Scroll spy observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = entry.target.id.replace('panel-', '');
        
        navItems.forEach(nav => {
          nav.classList.remove('active');
          nav.setAttribute('aria-selected', 'false');
        });
        
        const activeNav = document.getElementById(`tab-${index}`);
        if (activeNav) {
          activeNav.classList.add('active');
          activeNav.setAttribute('aria-selected', 'true');
          
          if (window.innerWidth <= 991) {
            activeNav.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        }
        
        cards.forEach(card => card.classList.remove('active'));
        entry.target.classList.add('active');
      }
    });
  }, {
    rootMargin: '-20% 0px -50% 0px',
    threshold: 0
  });

  cards.forEach(card => observer.observe(card));

  // Click to scroll
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetIndex = item.getAttribute('data-index');
      const targetCard = document.getElementById(`panel-${targetIndex}`);
      if (targetCard) {
        const offset = 140; 
        const top = targetCard.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

