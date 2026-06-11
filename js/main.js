/* ===========================
   NAVBAR SCROLL EFFECT
=========================== */
const navbar  = document.getElementById('navbar');
const navBadge = document.querySelector('.nav-badge');
const navLogo  = document.querySelector('.navbar .logo');

function updateNavBadge(scrolled) {
    if (!navBadge || window.innerWidth <= 768) return;
    if (scrolled) {
        navBadge.style.left      = '50%';
        navBadge.style.transform = 'translate(-50%, -50%)';
    } else {
        const rect = navLogo ? navLogo.getBoundingClientRect() : { right: 200 };
        navBadge.style.left      = (rect.right + 16) + 'px';
        navBadge.style.transform = 'translate(0, -50%)';
    }
}

// Initial placement (no transition on first frame)
requestAnimationFrame(() => {
    const scrolled = window.scrollY > 48;
    navbar.classList.toggle('scrolled', scrolled);
    if (navBadge) {
        navBadge.style.transition = 'none';
        updateNavBadge(scrolled);
        requestAnimationFrame(() => {
            if (navBadge) {
                navBadge.style.transition = '';
                navBadge.style.opacity    = '1';
            }
        });
    }
});

window.addEventListener('resize', () => updateNavBadge(window.scrollY > 48), { passive: true });

const onScroll = () => {
    const scrolled = window.scrollY > 48;
    navbar.classList.toggle('scrolled', scrolled);
    updateNavBadge(scrolled);
};
window.addEventListener('scroll', onScroll, { passive: true });

/* ===========================
   MOBILE MENU
=========================== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ===========================
   SCROLL ANIMATIONS
=========================== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.service-card, .feature-card, .process-step, .stat-card, .contact-card').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    observer.observe(el);
});

/* ===========================
   SMOOTH ANCHOR SCROLL
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = (navbar?.offsetHeight ?? 80) + 12;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
});

/* ===========================
   FEATURE / STAT CARDS ANIM
=========================== */
document.querySelectorAll('.feature-card, .process-step, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            io.unobserve(el);
        }
    }, { threshold: 0.12 });
    io.observe(el);
});
