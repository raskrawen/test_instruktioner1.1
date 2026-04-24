/**
 * e2e.spec.js - End-to-End tests med Playwright
 * 
 * Tester:
 * - Navigation mellem sektioner
 * - Tema-toggle (farver ↔ sort/hvid)
 * - Formular-afsendelse
 * - Responsivt design
 * - Smooth scroll
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8000';

test.describe('CV Webside - End-to-End Tests', () => {

    test.beforeEach(async ({ page }) => {
        // Gå til siden før hver test
        await page.goto(BASE_URL);
    });

    // ========================================
    // 1. Navigation Tests
    // ========================================

    test('Siden indlæses korrekt', async ({ page }) => {
        // Check at siden indlæses uden fejl
        await expect(page).toHaveTitle(/Rasmus Kragh Wendelbo/);
        
        // Check at hero-section vises
        const heroSection = page.locator('#hero');
        await expect(heroSection).toBeVisible();
    });

    test('Navigationsmenu vises', async ({ page }) => {
        const navbar = page.locator('nav.navbar');
        await expect(navbar).toBeVisible();
        
        // Check at links til sektioner findes
        const links = page.locator('a[href^="#"]');
        const count = await links.count();
        expect(count).toBeGreaterThan(5);
    });

    test('Klik på navigationslinkker scrolles til sektion', async ({ page }) => {
        // Klik på "Om mig" link
        await page.click('a[href="#om-mig"]');
        
        // Vent på smooth scroll
        await page.waitForTimeout(500);
        
        // Check at siden har scrollet til den korrekte sektion
        const omMigSection = page.locator('#om-mig');
        const boundingBox = await omMigSection.boundingBox();
        expect(boundingBox.y).toBeLessThan(300); // Sektion er tæt på toppen
    });

    test('Alle sektioner findes og er synlige', async ({ page }) => {
        const sections = [
            '#hero',
            '#om-mig',
            '#erfaring',
            '#workshops',
            '#uddannelse',
            '#kompetencer',
            '#referencer',
            '#kontakt'
        ];

        for (const section of sections) {
            const element = page.locator(section);
            await expect(element).toBeVisible();
        }
    });

    // ========================================
    // 2. Tema-Toggle Tests
    // ========================================

    test('Tema-toggle knap vises', async ({ page }) => {
        const toggleBtn = page.locator('#themeToggle');
        await expect(toggleBtn).toBeVisible();
    });

    test('Klik på tema-toggle skifter tilstand', async ({ page }) => {
        const toggleBtn = page.locator('#themeToggle');
        const body = page.locator('body');
        
        // Initial tilstand - grøn
        let classes = await body.getAttribute('class');
        expect(classes).toContain('light-mode');
        
        // Klik tema-toggle
        await toggleBtn.click();
        await page.waitForTimeout(300);
        
        // Tjek at sorte/hvid-tilstand er aktiv
        classes = await body.getAttribute('class');
        expect(classes).toContain('bw-mode');
        
        // Klik igen for at gå tilbage
        await toggleBtn.click();
        await page.waitForTimeout(300);
        
        classes = await body.getAttribute('class');
        expect(classes).toContain('light-mode');
    });

    test('Tema-valg gemmes i localStorage', async ({ page }) => {
        const toggleBtn = page.locator('#themeToggle');
        
        // Skift til sort/hvid
        await toggleBtn.click();
        
        // Hent localStorage værdi
        const savedTheme = await page.evaluate(() => {
            return localStorage.getItem('theme');
        });
        
        expect(savedTheme).toBe('bw');
    });

    // ========================================
    // 3. Kontaktformular Tests
    // ========================================

    test('Kontaktformular findes og vises', async ({ page }) => {
        const form = page.locator('#contactForm');
        await expect(form).toBeVisible();
        
        // Check at alle inputfelter findes
        const nameInput = page.locator('#name');
        const emailInput = page.locator('#email');
        const messageInput = page.locator('#message');
        const submitBtn = page.locator('button[type="submit"]');
        
        await expect(nameInput).toBeVisible();
        await expect(emailInput).toBeVisible();
        await expect(messageInput).toBeVisible();
        await expect(submitBtn).toBeVisible();
    });

    test('Formular validering - påkrævet felter', async ({ page }) => {
        // Prøv at sende uden at udfylde
        const submitBtn = page.locator('button[type="submit"]');
        
        // HTML5 validering skulle forhindre indsendelse
        const isValid = await page.locator('#name').evaluate(
            el => el.checkValidity()
        );
        
        expect(isValid).toBe(false);
    });

    test('Formular kan udfyldes', async ({ page }) => {
        // Udfyld form
        await page.fill('#name', 'Test Bruger');
        await page.fill('#email', 'test@example.com');
        await page.fill('#message', 'Dette er en test-besked.');
        
        // Tjek værdier
        const nameValue = await page.inputValue('#name');
        const emailValue = await page.inputValue('#email');
        const messageValue = await page.inputValue('#message');
        
        expect(nameValue).toBe('Test Bruger');
        expect(emailValue).toBe('test@example.com');
        expect(messageValue).toBe('Dette er en test-besked.');
    });

    // ========================================
    // 4. Responsivt Design Tests
    // ========================================

    test('Siden er responsiv på mobil', async ({ page }) => {
        // Sæt viewport til mobil
        await page.setViewportSize({ width: 375, height: 667 });
        
        // Check at der er en hamburger-menu
        const toggler = page.locator('.navbar-toggler');
        await expect(toggler).toBeVisible();
        
        // Check at nav links er i hamburger-menu
        const navCollapse = page.locator('.navbar-collapse');
        const isCollapsed = await navCollapse.evaluate(el => !el.classList.contains('show'));
        expect(isCollapsed).toBe(true);
    });

    test('Siden er responsiv på tablet', async ({ page }) => {
        // Sæt viewport til tablet
        await page.setViewportSize({ width: 768, height: 1024 });
        
        // Check at siden stadig er synlig
        const hero = page.locator('#hero');
        await expect(hero).toBeVisible();
    });

    test('Siden er responsiv på desktop', async ({ page }) => {
        // Sæt viewport til desktop
        await page.setViewportSize({ width: 1920, height: 1080 });
        
        // Check at siden er synlig
        const hero = page.locator('#hero');
        await expect(hero).toBeVisible();
    });

    // ========================================
    // 5. Indhold Tests
    // ========================================

    test('Siden indeholder korrekt tekst', async ({ page }) => {
        // Check hero-titel
        const title = page.locator('h1');
        await expect(title).toContainText('Rasmus Kragh Wendelbo');
        
        // Check at sektioner har titler
        const sectionTitles = await page.locator('.section-title').count();
        expect(sectionTitles).toBeGreaterThan(5);
    });

    test('Workshops er synlige', async ({ page }) => {
        // Scroll til workshops-sektion
        await page.click('a[href="#workshops"]');
        await page.waitForTimeout(500);
        
        // Check at workshops-tekst vises
        const workshopsSection = page.locator('#workshops');
        await expect(workshopsSection).toContainText('Workshop');
    });

    // ========================================
    // 6. Accessibility Tests
    // ========================================

    test('Siden har korrekt heading-hierarki', async ({ page }) => {
        // Check at der er en h1
        const h1 = page.locator('h1');
        await expect(h1).toHaveCount(1);
        
        // Check at der er h2 headings
        const h2 = page.locator('h2');
        const h2Count = await h2.count();
        expect(h2Count).toBeGreaterThan(0);
    });

    test('Links har understandelig tekst', async ({ page }) => {
        // Check at nav-links ikke er tomme
        const navLinks = page.locator('.navbar-nav a[href^="#"]');
        const count = await navLinks.count();
        
        for (let i = 0; i < count; i++) {
            const text = await navLinks.nth(i).textContent();
            expect(text.trim().length).toBeGreaterThan(0);
        }
    });

    test('Billedet har alt-tekst', async ({ page }) => {
        const img = page.locator('img.profile-image');
        const altText = await img.getAttribute('alt');
        expect(altText).toBeTruthy();
        expect(altText.length).toBeGreaterThan(0);
    });

});
