// Navbar shadow on scroll
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active', open);
    menuToggle.setAttribute('aria-expanded', String(open));
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Scroll reveal with stagger support
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = parseInt(entry.target.dataset.revealDelay || '0') * 140;
        setTimeout(() => entry.target.classList.add('revealed'), delay);
        revealObserver.unobserve(entry.target);
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id], header[id]');
const navItems = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navItems.forEach(a => a.classList.remove('active'));
        const target = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (target) target.classList.add('active');
    });
}, { threshold: 0.45 });

sections.forEach(s => activeObserver.observe(s));

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('formSubmit');
        const submitText = submitBtn.querySelector('.submit-text');
        const submitLoading = submitBtn.querySelector('.submit-loading');
        const feedback = document.getElementById('formFeedback');

        const data = {
            name: contactForm.name.value.trim(),
            email: contactForm.email.value.trim(),
            subject: contactForm.subject.value.trim(),
            message: contactForm.message.value.trim(),
        };

        submitBtn.disabled = true;
        submitText.hidden = true;
        submitLoading.hidden = false;
        feedback.hidden = true;
        feedback.className = 'form-feedback';

        try {
            const res = await fetch('/.netlify/functions/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok) {
                feedback.textContent = result.message || 'Mensagem enviada com sucesso!';
                feedback.classList.add('form-feedback--success');
                contactForm.reset();
            } else {
                feedback.textContent = result.error || 'Erro ao enviar. Tente novamente.';
                feedback.classList.add('form-feedback--error');
            }
        } catch {
            feedback.textContent = 'Erro de conexão. Verifique sua internet e tente novamente.';
            feedback.classList.add('form-feedback--error');
        } finally {
            submitBtn.disabled = false;
            submitText.hidden = false;
            submitLoading.hidden = true;
            feedback.hidden = false;
        }
    });
}
