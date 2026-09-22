/* ══════════════════════════════════════════════════════════
   GAAYA PERFUMES — script.js
   Frontend JS: animations, form, navigation
   ══════════════════════════════════════════════════════════ */

/* ─── Preloader ─── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const pre = document.getElementById('preloader');
    if (pre) pre.classList.add('hidden');
  }, 2400);
});

/* ─── Navbar scroll ─── */
const navbar     = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (navbar)      navbar.classList.toggle('scrolled', window.scrollY > 60);
  if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
  updateActiveLink();
});

/* ─── Scroll to top ─── */
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── Mobile menu ─── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

function closeMobile() {
  if (mobileMenu) mobileMenu.classList.remove('open');
}
window.closeMobile = closeMobile;

/* ─── Smooth scroll for anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── Active nav link highlight ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  const scrollPos = window.scrollY + 130;
  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + section.id) {
          link.style.color = '#e8c97e';
        }
      });
    }
  });
}

/* ─── Particles ─── */
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 36; i++) {
    const p    = document.createElement('div');
    p.className = 'particle';
    const size  = 1 + Math.random() * 2.5;
    p.style.cssText = [
      `left:${Math.random() * 100}%`,
      `width:${size}px`,
      `height:${size}px`,
      `animation-duration:${9 + Math.random() * 14}s`,
      `animation-delay:${Math.random() * 10}s`,
    ].join(';');
    container.appendChild(p);
  }
})();

/* ─── Scroll reveal ─── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
    const idx      = siblings.indexOf(entry.target);
    entry.target.style.transitionDelay = (idx * 0.08) + 's';
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── Product card 3D tilt ─── */
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x    = ((e.clientX - rect.left)  / rect.width  - 0.5) * 14;
    const y    = ((e.clientY - rect.top)   / rect.height - 0.5) * 14;
    card.style.transform = `translateY(-6px) perspective(700px) rotateX(${-y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ─── Marquee pause on hover ─── */
const marqueeStrip = document.querySelector('.marquee-strip');
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeStrip && marqueeTrack) {
  marqueeStrip.addEventListener('mouseenter', () => marqueeTrack.style.animationPlayState = 'paused');
  marqueeStrip.addEventListener('mouseleave', () => marqueeTrack.style.animationPlayState = 'running');
}

/* ══════════════════════════════════════════════════════════
   CONTACT FORM — Industry-ready submission
   ══════════════════════════════════════════════════════════ */

const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

/* ─── Show inline error below the form ─── */
function showFormError(message) {
  // Remove any existing error
  const existing = document.getElementById('formError');
  if (existing) existing.remove();

  const errDiv = document.createElement('div');
  errDiv.id    = 'formError';
  errDiv.style.cssText = [
    'padding:14px 18px',
    'background:rgba(180,60,60,0.12)',
    'border:1px solid rgba(200,80,80,0.35)',
    'color:#e88888',
    'font-family:var(--f-ui,Montserrat,sans-serif)',
    'font-size:12px',
    'letter-spacing:0.5px',
    'margin-top:4px',
    'border-radius:2px',
  ].join(';');
  errDiv.textContent = message;

  if (submitBtn && submitBtn.parentNode) {
    submitBtn.parentNode.insertBefore(errDiv, submitBtn.nextSibling);
  }

  // Auto-remove after 6 seconds
  setTimeout(() => errDiv.remove(), 6000);
}

/* ─── Reset submit button ─── */
function resetButton() {
  if (!submitBtn) return;
  submitBtn.textContent    = 'Send Enquiry';
  submitBtn.disabled       = false;
  submitBtn.style.opacity  = '1';
  submitBtn.style.background = '';
  submitBtn.style.color    = '';
}

/* ─── Submit enquiry to backend ─── */
async function submitEnquiry(data) {
  const response = await fetch('/api/contact', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    // Server returned validation error or rate limit error
    const msg = result.errors?.[0] || result.error || 'Something went wrong. Please try again.';
    const err = new Error(msg);
    err.status = response.status;
    throw err;
  }

  return result;
}

/* ─── Form submit handler ─── */
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Remove old error if any
    const oldErr = document.getElementById('formError');
    if (oldErr) oldErr.remove();

    // Loading state
    if (submitBtn) {
      submitBtn.textContent   = 'Sending...';
      submitBtn.disabled      = true;
      submitBtn.style.opacity = '0.7';
    }

    const formData = new FormData(contactForm);
    const data     = Object.fromEntries(formData);

    try {
      const result = await submitEnquiry(data);

      // ── Success ──
      if (formSuccess) formSuccess.classList.add('show');
      contactForm.reset();

      if (submitBtn) {
        submitBtn.textContent      = '✓ Sent Successfully';
        submitBtn.style.background = '#2a6a3a';
        submitBtn.style.color      = '#fff';
        submitBtn.style.opacity    = '1';
      }

      // Show reference number if returned
      if (result.reference && formSuccess) {
        formSuccess.textContent = `✓ Enquiry received! Your reference: ${result.reference}. We will contact you within 24 hours.`;
      }

      // Reset button after 5 seconds
      setTimeout(resetButton, 5000);

    } catch (err) {
      // ── Error — show inline, not alert ──
      resetButton();

      if (err.status === 429) {
        showFormError('Too many submissions. Please wait 15 minutes and try again.');
      } else if (err.status === 422) {
        showFormError(err.message); // validation error — show specific field error
      } else {
        showFormError('Could not send your enquiry. Please try again or email info@gaayaperfumes.com directly.');
      }
    }
  });
}

/* ─── Console branding ─── */
console.log('%c G A A Y A  P E R F U M E S ', 'background:#c9a84c;color:#080705;font-size:15px;font-weight:bold;padding:10px 20px;');
console.log('%c Luxury Fragrance Manufacturer · Alwar, Rajasthan · Est. 2024 ', 'color:#c9a84c;font-size:11px;');
