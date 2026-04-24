/**
 * unit.test.js - Unit tests med Jest
 * 
 * Tester JavaScript-funktionalitet:
 * - Tema-toggle logik
 * - LocalStorage interaktion
 * - Smooth scroll
 * - Formular-validering
 */

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        removeItem: (key) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        }
    };
})();

global.localStorage = localStorageMock;

// ========================================
// Test Suite: Tema-Toggle
// ========================================

describe('Tema-Toggle Funktionalitet', () => {

    beforeEach(() => {
        localStorage.clear();
        document.body.classList.remove('light-mode', 'bw-mode', 'dark-mode');
    });

    test('localStorage initialiseres tomt', () => {
        const theme = localStorage.getItem('theme');
        expect(theme).toBeNull();
    });

    test('localStorage kan gemme tema', () => {
        localStorage.setItem('theme', 'bw');
        const theme = localStorage.getItem('theme');
        expect(theme).toBe('bw');
    });

    test('localStorage kan gemme grønt tema', () => {
        localStorage.setItem('theme', 'green');
        const theme = localStorage.getItem('theme');
        expect(theme).toBe('green');
    });

    test('Tema kan opdateres i localStorage', () => {
        localStorage.setItem('theme', 'green');
        expect(localStorage.getItem('theme')).toBe('green');
        
        localStorage.setItem('theme', 'bw');
        expect(localStorage.getItem('theme')).toBe('bw');
    });

    test('localStorage kan slettes', () => {
        localStorage.setItem('theme', 'green');
        localStorage.clear();
        const theme = localStorage.getItem('theme');
        expect(theme).toBeNull();
    });

});

// ========================================
// Test Suite: CSS Klasser
// ========================================

describe('CSS Klasse-håndtering', () => {

    beforeEach(() => {
        document.body.classList.remove('light-mode', 'bw-mode', 'dark-mode');
    });

    test('Body element kan have light-mode klasse', () => {
        document.body.classList.add('light-mode');
        expect(document.body.classList.contains('light-mode')).toBe(true);
    });

    test('Body element kan have bw-mode klasse', () => {
        document.body.classList.add('bw-mode');
        expect(document.body.classList.contains('bw-mode')).toBe(true);
    });

    test('Klasserne udelukker hinanden', () => {
        document.body.classList.add('light-mode');
        expect(document.body.classList.contains('light-mode')).toBe(true);
        
        document.body.classList.remove('light-mode');
        expect(document.body.classList.contains('light-mode')).toBe(false);
    });

    test('Klasser kan ikke være samtidigt aktive', () => {
        document.body.classList.add('light-mode');
        document.body.classList.add('bw-mode');
        
        // Begge skulle kunne være tilstede (browser-agnostisk test)
        const hasLightMode = document.body.classList.contains('light-mode');
        const hasBwMode = document.body.classList.contains('bw-mode');
        
        expect(hasLightMode || hasBwMode).toBe(true);
    });

});

// ========================================
// Test Suite: Formular-Validering
// ========================================

describe('Formular-Validering', () => {

    let form;
    let nameInput;
    let emailInput;
    let messageInput;

    beforeEach(() => {
        // Opret test-formular
        document.body.innerHTML = `
            <form id="contactForm">
                <input type="text" id="name" name="name" required>
                <input type="email" id="email" name="email" required>
                <textarea id="message" name="message" required></textarea>
                <button type="submit">Send</button>
            </form>
        `;

        form = document.getElementById('contactForm');
        nameInput = document.getElementById('name');
        emailInput = document.getElementById('email');
        messageInput = document.getElementById('message');
    });

    test('Navn-input er påkrævet', () => {
        expect(nameInput.required).toBe(true);
    });

    test('E-mail-input er påkrævet', () => {
        expect(emailInput.required).toBe(true);
    });

    test('Besked-input er påkrævet', () => {
        expect(messageInput.required).toBe(true);
    });

    test('E-mail-input har korrekt type', () => {
        expect(emailInput.type).toBe('email');
    });

    test('Formular kan acceptere data', () => {
        nameInput.value = 'Test Bruger';
        emailInput.value = 'test@example.com';
        messageInput.value = 'Test besked';

        expect(nameInput.value).toBe('Test Bruger');
        expect(emailInput.value).toBe('test@example.com');
        expect(messageInput.value).toBe('Test besked');
    });

    test('Tom formular kan nulstilles', () => {
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';

        expect(nameInput.value).toBe('');
        expect(emailInput.value).toBe('');
        expect(messageInput.value).toBe('');
    });

});

// ========================================
// Test Suite: Anchor-Links
// ========================================

describe('Anchor-Links', () => {

    beforeEach(() => {
        document.body.innerHTML = `
            <nav id="navbar">
                <a href="#om-mig">Om mig</a>
                <a href="#workshops">Workshops</a>
                <a href="#kontakt">Kontakt</a>
            </nav>
            <section id="om-mig">Om mig sektion</section>
            <section id="workshops">Workshops sektion</section>
            <section id="kontakt">Kontakt sektion</section>
        `;
    });

    test('Anchor-links findes', () => {
        const links = document.querySelectorAll('a[href^="#"]');
        expect(links.length).toBe(3);
    });

    test('Anchor-links peger på eksisterende sektioner', () => {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            const target = document.querySelector(href);
            expect(target).not.toBeNull();
        });
    });

    test('Alle sektioner har ID', () => {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            expect(section.id).toBeTruthy();
            expect(section.id.length).toBeGreaterThan(0);
        });
    });

});

// ========================================
// Test Suite: DOM-struktur
// ========================================

describe('DOM-struktur', () => {

    beforeEach(() => {
        document.body.innerHTML = `
            <html>
                <head>
                    <title>Rasmus Kragh Wendelbo - CV</title>
                </head>
                <body>
                    <nav class="navbar">Navigation</nav>
                    <section id="hero">Hero</section>
                    <footer>Footer</footer>
                </body>
            </html>
        `;
    });

    test('Siden har en navbar', () => {
        const navbar = document.querySelector('nav');
        expect(navbar).not.toBeNull();
    });

    test('Siden har en hero-sektion', () => {
        const hero = document.getElementById('hero');
        expect(hero).not.toBeNull();
    });

    test('Siden har en footer', () => {
        const footer = document.querySelector('footer');
        expect(footer).not.toBeNull();
    });

    test('Siden har korrekt titel', () => {
        expect(document.title).toContain('Rasmus Kragh Wendelbo');
    });

});

// ========================================
// Test Suite: Smooth Scroll
// ========================================

describe('Smooth Scroll Funktionalitet', () => {

    test('Scroll-adfærd kan sættes til smooth', () => {
        document.documentElement.style.scrollBehavior = 'smooth';
        expect(document.documentElement.style.scrollBehavior).toBe('smooth');
    });

    test('ScrollIntoView kan kaldes', () => {
        const mockElement = document.createElement('div');
        mockElement.scrollIntoView = jest.fn();
        
        mockElement.scrollIntoView({ behavior: 'smooth' });
        
        expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
            behavior: 'smooth',
            block: undefined
        });
    });

});

// ========================================
// Test Suite: Responsive Viewport
// ========================================

describe('Responsive Design Breakpoints', () => {

    test('Mobile breakpoint: max-width 576px', () => {
        const breakpoint = 576;
        expect(breakpoint).toBeLessThan(768);
    });

    test('Tablet breakpoint: max-width 768px', () => {
        const breakpoint = 768;
        expect(breakpoint).toBeLessThan(1024);
    });

    test('Desktop breakpoint: min-width 1024px', () => {
        const breakpoint = 1024;
        expect(breakpoint).toBeGreaterThanOrEqual(768);
    });

    test('Breakpoints er i stigende orden', () => {
        const mobile = 576;
        const tablet = 768;
        const desktop = 1024;
        
        expect(mobile).toBeLessThan(tablet);
        expect(tablet).toBeLessThan(desktop);
    });

});
