/**
 * main.js - Funktionalitet for CV-siden
 * 
 * Håndterer:
 * - Tema-toggle (grøn <-> sort/hvid)
 * - Smooth scroll til ankre
 * - Kontaktformular (via Formspree)
 */

// ========================================
// 1. Tema Toggle - Farver & Sort/Hvid
// ========================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Hent gemte tema fra localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'green';
    applyTheme(savedTheme);
}

// Anvend tema-style
function applyTheme(theme) {
    body.classList.remove('bw-mode', 'dark-mode', 'light-mode');
    
    if (theme === 'bw') {
        body.classList.add('bw-mode');
        themeToggle.textContent = '🎨 Farver';
    } else {
        body.classList.add('light-mode');
        themeToggle.textContent = '⚫ S/H';
    }
    
    localStorage.setItem('theme', theme);
}

// Toggle tema ved klik på knap
themeToggle.addEventListener('click', function() {
    const currentTheme = localStorage.getItem('theme') || 'green';
    const newTheme = currentTheme === 'green' ? 'bw' : 'green';
    applyTheme(newTheme);
});

// Load tema ved sideindlæsning
document.addEventListener('DOMContentLoaded', loadTheme);

// ========================================
// 2. Smooth Scroll til Ankre
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignorer hvis href er blot "#"
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Luk navbar på mobil efter klik
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const toggler = document.querySelector('.navbar-toggler');
                toggler.click();
            }
        }
    });
});

// ========================================
// 3. Kontaktformular - Formspree Integration
// ========================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Disable knappen mens den sender
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sender...';
    
    // Formspree endpoint - skal opdateres med dit eget form-ID
    // Se README.md for instruktioner
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqewnkyd';
    
    try {
        const formData = new FormData(contactForm);
        
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Succes
            formMessage.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">Besked sendt! Tak for at kontakte mig. Jeg vender tilbage hurtigst muligt.<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>';
            contactForm.reset();
        } else {
            // Fejl fra server
            formMessage.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">Der opstod en fejl ved afsendelse. Prøv igen senere.<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>';
        }
    } catch (error) {
        // Netværksfejl
        console.error('Fejl:', error);
        formMessage.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">Netværksfejl. Prøv igen senere.<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>';
    } finally {
        // Re-enable knappen
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});

// ========================================
// 4. Smooth Navbar Background
// ========================================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
    }
});

// ========================================
// 5. Accessibility - Keyboard Navigation
// ========================================

// Ensure fokus management for keyboard nav
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Luk navbar dropdown hvis åben
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const toggler = document.querySelector('.navbar-toggler');
            toggler.click();
        }
    }
});

console.log('✅ CV-siden er klar!');
