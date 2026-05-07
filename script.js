// =============================================
//   VICKY'S PORTFOLIO - JavaScript
// =============================================

// ── NAVBAR SCROLL EFFECT ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

// ── SCROLL REVEAL ANIMATION ──
const revealElements = document.querySelectorAll(
  '.skill-category, .project-card, .achievement-card, .cert-card, .stat-box, .education-card, .about-text, .contact-item, .google-skills-banner'
);

revealElements.forEach(el => {
  el.classList.add('reveal');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

// ── ACTIVE NAV LINK HIGHLIGHTING ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        link.style.borderBottom = '';
      });
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) {
        activeLink.style.color = '#f5c518';
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

// ── CONTACT FORM USING FORMSUBMIT (sends to email) ──
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !subject || !message) {
    showStatus('Please fill all fields.', 'error');
    return;
  }

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    // Using FormSubmit.co service — no backend needed, sends email to shivankarvivek44@gmail.com
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('_subject', subject);
    formData.append('message', message);
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');

    const response = await fetch('https://formsubmit.co/shivankarvivek44@gmail.com', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      showStatus('✅ Message sent! Vivek will reply soon.', 'success');
      contactForm.reset();
    } else {
      showStatus('❌ Something went wrong. Try emailing directly.', 'error');
    }
  } catch (err) {
    showStatus('❌ Network error. Please try again later.', 'error');
  }

  submitBtn.textContent = 'Send Message ✉️';
  submitBtn.disabled = false;
});

function showStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className = 'form-status ' + type;
  setTimeout(() => {
    formStatus.textContent = '';
    formStatus.className = 'form-status';
  }, 6000);
}

// ── SMOOTH SCROLL FOR ALL ANCHOR LINKS ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── TYPING EFFECT ON HERO ROLE ──
const roleEl = document.querySelector('.hero-role');
if (roleEl) {
  const roles = [
    'Aspiring Software Engineer · Java & Python Developer',
    'Machine Learning Enthusiast · AI Builder',
    'Data Science Student · Problem Solver',
    'Hackathon Winner · Open Source Contributor'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeRole() {
    const current = roles[roleIndex];
    if (isDeleting) {
      roleEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      roleEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 40 : 60;

    if (!isDeleting && charIndex === current.length) {
      delay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(typeRole, delay);
  }

  // Start typing after 1.5 seconds
  setTimeout(typeRole, 1500);
}

// ── STAGGER ANIMATION FOR GRIDS ──
function staggerReveal(containerSelector) {
  const containers = document.querySelectorAll(containerSelector);
  containers.forEach(container => {
    const children = container.children;
    Array.from(children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 80}ms`;
    });
  });
}
staggerReveal('.skills-grid');
staggerReveal('.projects-grid');
staggerReveal('.achievements-grid');
staggerReveal('.cert-grid');
