/**
 * MACASI Solutions // Digital Engineering Engine v2.0
 * Features:
 * 1. Scroll-Driven Digital Aperture Expansion Engine (Velocity + Viewport Progress)
 * 2. Sliding Neon Navigation Spotlight & Magnetic Buttons
 * 3. Card Cursor Spotlight Tracking
 * 4. Interactive Core Console (Startseite)
 * 5. Multi-Page Contact Prefill via URL Query (?service=...) & Legal Modals
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Year
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 2. Sticky Header
    const siteHeader = document.getElementById('site-header');
    const updateHeader = () => {
        if (!siteHeader) return;
        siteHeader.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    // =========================================================================
    // 3. SCROLL-DRIVEN DIGITAL APERTURE EXPANSION & VELOCITY ENGINE
    // =========================================================================
    const apertureFrames = document.querySelectorAll('.aperture-frame');
    const velocityFill = document.getElementById('hud-velocity-fill');
    const velocityReadout = document.getElementById('hud-velocity-val');

    // Track current & target progress per frame so velocity modulates smoothing speed
    const frameStates = Array.from(apertureFrames).map((el) => ({
        el,
        stateLabel: el.querySelector('.gate-state'),
        current: 0.15,
        target: 0.15
    }));

    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let smoothVelocity = 0;

    const computeTargets = () => {
        const vh = window.innerHeight;
        frameStates.forEach((item) => {
            const rect = item.el.getBoundingClientRect();
            // Start opening as soon as top enters bottom 92% of viewport,
            // reach 1.0 (fully expanded) when top reaches 38% of viewport
            const startY = vh * 0.94;
            const fullY = vh * 0.36;
            let raw = (startY - rect.top) / (startY - fullY);

            // If user scrolled past the section, keep it open until it exits top
            if (rect.bottom < vh * 0.25) {
                raw = Math.max(0.25, rect.bottom / (vh * 0.25));
            }

            item.target = Math.max(0, Math.min(1, raw));
        });
    };

    const animateScrollEngine = (now) => {
        const dt = Math.max(16, now - lastTime);
        const dy = Math.abs(window.scrollY - lastScrollY);
        const instantVelocity = (dy / dt) * 100; // px per 100ms

        // Smooth velocity with fast attack and gentle decay
        smoothVelocity += (instantVelocity - smoothVelocity) * 0.18;
        if (smoothVelocity < 0.1) smoothVelocity = 0;

        lastScrollY = window.scrollY;
        lastTime = now;

        computeTargets();

        // Velocity boosts how fast the digital aperture snaps open & adds neon energy glow
        const velocityNorm = Math.min(1, smoothVelocity / 140);
        const lerpFactor = 0.09 + velocityNorm * 0.22;

        document.documentElement.style.setProperty('--scroll-velocity', velocityNorm.toFixed(3));
        document.documentElement.style.setProperty('--velocity-glow', `${Math.round(velocityNorm * 42)}px`);

        if (velocityFill) {
            velocityFill.style.height = `${Math.max(8, Math.round(velocityNorm * 100))}%`;
        }
        if (velocityReadout) {
            velocityReadout.textContent = `${Math.round(smoothVelocity * 10)} PX/S`;
        }

        frameStates.forEach((item) => {
            item.current += (item.target - item.current) * lerpFactor;
            const p = item.current;
            item.el.style.setProperty('--aperture-progress', p.toFixed(4));

            if (item.stateLabel) {
                if (p > 0.88) {
                    item.stateLabel.textContent = 'SYSTEM EXPANDED // 100%';
                } else if (p > 0.25) {
                    item.stateLabel.textContent = `OPENING // ${Math.round(p * 100)}%`;
                } else {
                    item.stateLabel.textContent = 'STANDBY // GATE';
                }
            }
        });

        requestAnimationFrame(animateScrollEngine);
    };

    requestAnimationFrame(animateScrollEngine);

    // =========================================================================
    // 4. DESKTOP NAVIGATION HOVER SPOTLIGHT
    // =========================================================================
    const mainNav = document.getElementById('main-nav');
    const navSpotlight = document.getElementById('nav-spotlight');
    const navLinks = document.querySelectorAll('.nav-link');

    const moveSpotlightToLink = (linkEl) => {
        if (!linkEl || !mainNav || !navSpotlight) return;
        const navRect = mainNav.getBoundingClientRect();
        const linkRect = linkEl.getBoundingClientRect();
        const offsetLeft = linkRect.left - navRect.left - 5;
        navSpotlight.style.width = `${linkRect.width}px`;
        navSpotlight.style.transform = `translateX(${offsetLeft}px)`;
        navSpotlight.style.opacity = '1';
    };

    const resetSpotlight = () => {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            moveSpotlightToLink(activeLink);
        } else if (navSpotlight) {
            navSpotlight.style.opacity = '0';
        }
    };

    navLinks.forEach((link) => {
        link.addEventListener('mouseenter', () => moveSpotlightToLink(link));
    });

    if (mainNav) {
        mainNav.addEventListener('mouseleave', resetSpotlight);
    }
    window.addEventListener('resize', resetSpotlight);
    setTimeout(resetSpotlight, 80);

    // =========================================================================
    // 5. MOBILE & TABLET DRAWER
    // =========================================================================
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileBackdrop = document.getElementById('mobile-drawer-backdrop');

    const toggleMobile = (force) => {
        if (!mobileDrawer || !mobileToggle) return;
        const isOpen = typeof force === 'boolean' ? force : !mobileDrawer.classList.contains('open');
        mobileDrawer.classList.toggle('open', isOpen);
        mobileToggle.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    if (mobileToggle) mobileToggle.addEventListener('click', () => toggleMobile());
    if (mobileBackdrop) mobileBackdrop.addEventListener('click', () => toggleMobile(false));

    // =========================================================================
    // 6. CURSOR SPOTLIGHT CARDS & MAGNETIC BUTTONS
    // =========================================================================
    document.querySelectorAll('.spotlight-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });

    document.querySelectorAll('.magnetic-btn').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 1024) return;
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.14}px, ${y * 0.18}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // =========================================================================
    // 7. HERO CORE CONSOLE SWITCHER (ON INDEX.HTML)
    // =========================================================================
    const orbData = {
        hosting: {
            metric: '99.98% SLA',
            title: 'Managed High-Speed Hosting',
            desc: 'NVMe-Cluster in Deutschland inkl. SSL, Updates & täglichen Backups.',
            s1: 'DE / DSGVO',
            s2: '< 25ms TTFB',
            s3: '24/7 Schutz'
        },
        process: {
            metric: '-65% ZEIT',
            title: 'Prozessoptimierung & Workflows',
            desc: 'Automatische Schnittstellen zwischen Website, CRM & Buchhaltung.',
            s1: 'REST / API',
            s2: '0 Medienbrüche',
            s3: 'Auto-Sync'
        },
        print: {
            metric: '300+ DPI',
            title: 'Print Medien & Veredelung',
            desc: 'Geschäftsausstattung, Broschüren & Werbetechnik in Perfektion.',
            s1: 'CMYK / Spot',
            s2: 'UV & Prägung',
            s3: 'Full-Service'
        },
        drone: {
            metric: '4K / 6K RAW',
            title: 'Drohnen-Luftbild & Inspektion',
            desc: 'Kinoreife Perspektiven für Imagefilme, Immobilien & Bauprojekte.',
            s1: 'EU A1/A2/A3',
            s2: '48 MP Foto',
            s3: 'Color Grading'
        }
    };

    const orbTabs = document.querySelectorAll('[data-orb-tab]');
    const elOrbMetric = document.getElementById('orb-metric');
    const elOrbTitle = document.getElementById('orb-title');
    const elOrbDesc = document.getElementById('orb-desc');
    const elOrbS1 = document.getElementById('orb-s1');
    const elOrbS2 = document.getElementById('orb-s2');
    const elOrbS3 = document.getElementById('orb-s3');

    orbTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const key = tab.getAttribute('data-orb-tab');
            const d = orbData[key];
            if (!d) return;
            orbTabs.forEach((t) => t.classList.toggle('active', t === tab));
            if (elOrbMetric) elOrbMetric.textContent = d.metric;
            if (elOrbTitle) elOrbTitle.textContent = d.title;
            if (elOrbDesc) elOrbDesc.textContent = d.desc;
            if (elOrbS1) elOrbS1.textContent = d.s1;
            if (elOrbS2) elOrbS2.textContent = d.s2;
            if (elOrbS3) elOrbS3.textContent = d.s3;
        });
    });

    // =========================================================================
    // 8. CONTACT FORM URL PREFILL (?service=...) & SUBMISSION
    // =========================================================================
    const params = new URLSearchParams(window.location.search);
    const prefillService = params.get('service');
    const serviceCheckboxes = document.querySelectorAll('input[name="services"]');

    if (prefillService && serviceCheckboxes.length > 0) {
        serviceCheckboxes.forEach((cb) => {
            cb.checked = cb.value.toLowerCase().includes(prefillService.toLowerCase());
        });
    }

    const contactForm = document.getElementById('engineering-contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('client-name').value.trim();
            const email = document.getElementById('client-email').value.trim();
            const message = document.getElementById('client-message').value.trim();
            const privacy = document.getElementById('client-privacy').checked;

            if (!name || !email || !message || !privacy) {
                formFeedback.className = 'form-feedback error';
                formFeedback.textContent = 'Bitte füllen Sie alle Pflichtfelder (*) aus.';
                return;
            }

            formFeedback.className = 'form-feedback success';
            formFeedback.innerHTML = `<strong>✓ Anfrage erfolgreich übermittelt!</strong><br>Vielen Dank, ${name}. Wir melden uns innerhalb von 24 Stunden bei Ihnen.`;
            contactForm.reset();
        });
    }

    // =========================================================================
    // 9. LEGAL MODALS
    // =========================================================================
    const legalModal = document.getElementById('legal-modal');
    const modalImpressum = document.getElementById('modal-body-impressum');
    const modalDatenschutz = document.getElementById('modal-body-datenschutz');

    document.querySelectorAll('[data-open-modal]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-open-modal');
            if (!legalModal) return;
            modalImpressum.classList.toggle('hidden', type !== 'impressum');
            modalDatenschutz.classList.toggle('hidden', type !== 'datenschutz');
            legalModal.classList.add('active');
        });
    });

    document.querySelectorAll('[data-close-modal]').forEach((btn) => {
        btn.addEventListener('click', () => {
            if (legalModal) legalModal.classList.remove('active');
        });
    });
});
