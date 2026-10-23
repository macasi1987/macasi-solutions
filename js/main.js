/**
 * MACASI Solutions // Digital Engineering Interactive Script
 * Features:
 * 1. Sliding Neon Navigation Spotlight & Active Section Observer
 * 2. Card Cursor Spotlight Effect (3D / Radial Glow Tracking)
 * 3. Hero Telemetry Console Switcher (Hosting, Prozesse, Print, Drohne)
 * 4. Interactive Solution Architect (Engineering Lab Configurator)
 * 5. Case Study Filter, FAQ Accordion, Legal Modals & Contact Form Prefill
 * 6. Responsive Mobile Drawer for iPhone & Tablet
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 2. Sticky Header Scroll State
    const siteHeader = document.getElementById('site-header');
    const handleHeaderScroll = () => {
        if (window.scrollY > 24) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    // =========================================================================
    // 3. DESKTOP MENU HOVER SPOTLIGHT & MAGNETIC NAV INDICATOR
    // =========================================================================
    const mainNav = document.getElementById('main-nav');
    const navSpotlight = document.getElementById('nav-spotlight');
    const navLinks = document.querySelectorAll('.nav-link');

    const moveSpotlightToLink = (linkEl) => {
        if (!linkEl || !mainNav || !navSpotlight) return;
        const navRect = mainNav.getBoundingClientRect();
        const linkRect = linkEl.getBoundingClientRect();
        const offsetLeft = linkRect.left - navRect.left - 5; // 5px is nav padding
        navSpotlight.style.width = `${linkRect.width}px`;
        navSpotlight.style.transform = `translateX(${offsetLeft}px)`;
        navSpotlight.style.opacity = '1';
    };

    const resetSpotlightToActive = () => {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            moveSpotlightToLink(activeLink);
        } else if (navSpotlight) {
            navSpotlight.style.opacity = '0';
        }
    };

    navLinks.forEach((link) => {
        link.addEventListener('mouseenter', () => {
            moveSpotlightToLink(link);
        });
    });

    if (mainNav) {
        mainNav.addEventListener('mouseleave', () => {
            resetSpotlightToActive();
        });
    }

    // Position spotlight initially and on resize
    window.addEventListener('resize', resetSpotlightToActive);
    setTimeout(resetSpotlightToActive, 100);

    // =========================================================================
    // 4. SCROLLSPY: HIGHLIGHT ACTIVE NAVIGATION ITEM BY SECTION
    // =========================================================================
    const sections = document.querySelectorAll('.section-observe');
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach((link) => {
                        link.classList.toggle('active', link.getAttribute('data-section') === id);
                    });
                    resetSpotlightToActive();
                }
            });
        },
        {
            rootMargin: '-35% 0px -55% 0px',
            threshold: 0
        }
    );

    sections.forEach((sec) => sectionObserver.observe(sec));

    // =========================================================================
    // 5. MOBILE & TABLET NAVIGATION DRAWER
    // =========================================================================
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileBackdrop = document.getElementById('mobile-drawer-backdrop');
    const mobileLinks = document.querySelectorAll('[data-mobile-link]');

    const toggleMobileMenu = (forceState) => {
        const isOpen = typeof forceState === 'boolean' ? forceState : !mobileDrawer.classList.contains('open');
        mobileDrawer.classList.toggle('open', isOpen);
        mobileToggle.classList.toggle('active', isOpen);
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
        mobileDrawer.setAttribute('aria-hidden', String(!isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => toggleMobileMenu());
    }
    if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', () => toggleMobileMenu(false));
    }
    mobileLinks.forEach((link) => {
        link.addEventListener('click', () => toggleMobileMenu(false));
    });

    // =========================================================================
    // 6. CURSOR SPOTLIGHT TRACKING ON CARDS & MAGNETIC BUTTONS
    // =========================================================================
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    spotlightCards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Subtle Magnetic Hover for Primary CTA Buttons on Desktop
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach((btn) => {
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
    // 7. HERO TELEMETRY CONSOLE INTERACTIVE TABS
    // =========================================================================
    const consoleData = {
        hosting: {
            code: 'MOD_01 // INFRASTRUCTURE',
            status: 'OPTIMAL // 99.98%',
            title: 'High-Availability Cloud & Web Hosting',
            desc: 'Dedizierte NVMe-Serverarchitektur in deutschen Rechenzentren mit automatischem Failover, täglichen Backups und kompromissloser Ladezeit-Optimierung.',
            svgTitle: 'CLUSTER: DE-FRA-NVME-01 // SSL TLS 1.3',
            svgSub: 'LATENCY: 11.4ms | PACKET LOSS: 0.00%',
            wavePath: 'M 10 165 Q 65 90, 120 135 T 230 85 T 340 65 T 410 35',
            m1Label: 'UPTIME SLA',
            m1Val: '99.98%',
            m2Label: 'TTFB SPEED',
            m2Val: '< 35 ms',
            m3Label: 'STANDORT',
            m3Val: 'DSGVO / DE'
        },
        process: {
            code: 'MOD_02 // WORKFLOW ENGINE',
            status: 'AUTO-SYNC ACTIVE',
            title: 'Prozessoptimierung & API-Automatisierung',
            desc: 'Eliminierung manueller Routineaufgaben durch vernetzte Systeme: Von der digitalen Kundenanfrage über das CRM bis zur automatischen Rechnungs- und Projektanlage.',
            svgTitle: 'PIPELINE: CRM -> API_WEBHOOK -> ERP_SYNC',
            svgSub: 'MANUAL EFFORT: -65% | ERROR RATE: 0.0%',
            wavePath: 'M 10 180 Q 75 150, 130 110 T 250 75 T 350 45 T 410 25',
            m1Label: 'ZEITERSPARNIS',
            m1Val: '-65% Aufwand',
            m2Label: 'SCHNITTSTELLEN',
            m2Val: 'REST / Webhooks',
            m3Label: 'MEDIENBRÜCHE',
            m3Val: '0 %'
        },
        print: {
            code: 'MOD_03 // PRINT ENGINEERING',
            status: 'FOGRA39 CALIBRATED',
            title: 'Print Medien, Veredelung & Werbetechnik',
            desc: 'Präzise Druckvorstufe, edle Papiere und markante Veredelungen: Visitenkarten, Imagebroschüren, Kataloge, Messesysteme und Außenwerbung aus einem Guss.',
            svgTitle: 'COLOR PROFILE: ISO COATED V2 300% // CMYK+SPOT',
            svgSub: 'RESOLUTION: 300-1200 DPI | BLEED: 3.0MM OK',
            wavePath: 'M 10 140 Q 80 60, 150 120 T 270 70 T 360 85 T 410 40',
            m1Label: 'AUFLÖSUNG',
            m1Val: '300+ DPI',
            m2Label: 'VEREDELUNG',
            m2Val: 'UV / Heißfolie',
            m3Label: 'FARBTREUE',
            m3Val: 'CMYK / Pantone'
        },
        drone: {
            code: 'MOD_04 // AERIAL UAV SYSTEM',
            status: 'GPS LOCK // 18 SAT',
            title: '4K/6K Drohnen-Aufnahmen & Inspektion',
            desc: 'Kinoreife Luftbild-Perspektiven für Imagefilme, Immobilien und Baudokumentation – rechtssicher geflogen mit EU-Fernpilotenlizenz und Inhouse Color Grading.',
            svgTitle: 'UAV TELEMETRY: ALT 85m | GIMBAL -24° | 6K RAW',
            svgSub: 'LICENSE: EU A1/A2/A3 | INSURANCE: COMMERCIAL OK',
            wavePath: 'M 10 175 Q 60 120, 140 80 T 260 55 T 350 40 T 410 20',
            m1Label: 'VIDEO & FOTO',
            m1Val: '6K / 48 MP RAW',
            m2Label: 'ZERTIFIZIERUNG',
            m2Val: 'EU A1/A2/A3',
            m3Label: 'POST-PRODUCTION',
            m3Val: '10-Bit Grading'
        }
    };

    const consoleTabs = document.querySelectorAll('[data-console-tab]');
    const elModCode = document.getElementById('console-module-code');
    const elModStatus = document.getElementById('console-module-status');
    const elModTitle = document.getElementById('console-module-title');
    const elModDesc = document.getElementById('console-module-desc');
    const elSvgTitle = document.getElementById('hud-svg-title');
    const elSvgSub = document.getElementById('hud-svg-sub');
    const elWavePath = document.getElementById('hud-wave-path');
    const elM1L = document.getElementById('metric-1-label');
    const elM1V = document.getElementById('metric-1-val');
    const elM2L = document.getElementById('metric-2-label');
    const elM2V = document.getElementById('metric-2-val');
    const elM3L = document.getElementById('metric-3-label');
    const elM3V = document.getElementById('metric-3-val');

    consoleTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const key = tab.getAttribute('data-console-tab');
            const data = consoleData[key];
            if (!data) return;

            consoleTabs.forEach((t) => {
                t.classList.toggle('active', t === tab);
                t.setAttribute('aria-selected', String(t === tab));
            });

            if (elModCode) elModCode.textContent = data.code;
            if (elModStatus) elModStatus.textContent = data.status;
            if (elModTitle) elModTitle.textContent = data.title;
            if (elModDesc) elModDesc.textContent = data.desc;
            if (elSvgTitle) elSvgTitle.textContent = data.svgTitle;
            if (elSvgSub) elSvgSub.textContent = data.svgSub;
            if (elWavePath) elWavePath.setAttribute('d', data.wavePath);
            if (elM1L) elM1L.textContent = data.m1Label;
            if (elM1V) elM1V.textContent = data.m1Val;
            if (elM2L) elM2L.textContent = data.m2Label;
            if (elM2V) elM2V.textContent = data.m2Val;
            if (elM3L) elM3L.textContent = data.m3Label;
            if (elM3V) elM3V.textContent = data.m3Val;
        });
    });

    // =========================================================================
    // 8. INTERACTIVE SOLUTION ARCHITECT (ENGINEERING LAB)
    // =========================================================================
    const scenarios = {
        relaunch: {
            code: 'BLUEPRINT // RELAUNCH_360',
            impact: 'Effekt: Konsistenter Premium-Auftritt auf allen Kanälen',
            headline: 'Vom eigenen Hochleistungs-Server bis zur edlen Broschüre & Luftaufnahme Ihres Firmensitzes.',
            description: 'Statt Stückwerk erhalten Sie einen Guss: Wir fotografieren und filmen Ihren Standort aus der Luft, entwickeln daraus eine blitzschnelle Website auf unserem Managed Hosting und statten Ihr Vertriebsteam mit exakt abgestimmten Printmedien aus.',
            ctaService: 'Kompletter Marken- & Web-Relaunch',
            hosting: 'Managed NVMe-Hosting, SSL-Sicherheit, Domain-Setup & blitzschnelle Website.',
            process: 'Digitale Kontakt- & Anfrageformulare direkt ins CRM mit automatischer Terminbuchung.',
            print: 'Neue Visitenkarten mit Veredelung, Briefbogen und hochwertige Imagebroschüre.',
            drone: '4K Hero-Video Ihres Unternehmensstandorts für die Startseite & hochauflösende Print-Fotos.'
        },
        efficiency: {
            code: 'BLUEPRINT // WORKFLOW_AUTOMATION',
            impact: 'Effekt: Bis zu 65 % weniger manueller Verwaltungsaufwand',
            headline: 'Schluss mit Zettelwirtschaft: Ihre Website und Ihre Büroprozesse arbeiten endlich automatisch zusammen.',
            description: 'Wir verwandeln Ihre Website in einen aktiven Mitarbeiter: Kundenanfragen, Bestellungen oder Bewerbungen werden strukturiert erfasst, automatisch verarbeitet und ohne Abtippen in Ihre internen Systeme übergeben.',
            ctaService: 'Prozessoptimierung & Digitalisierung',
            hosting: 'Hochsicheres Hosting für Kundenportale, Formulare, Datenbanken & Schnittstellen.',
            process: 'Automatisierte Angebotserstellung, E-Mail-Follow-ups, digitale Checklisten & API-Brücken.',
            print: 'Print-Unterlagen & Produktkataloge mit dynamischen QR-Codes zur digitalen Nachbestellung.',
            drone: 'Digitale Bestands- & Standortdokumentation aus der Luft zur schnellen Projektauswertung.'
        },
        realestate: {
            code: 'BLUEPRINT // AERIAL_PROPERTY_SHOWCASE',
            impact: 'Effekt:Schnellerer Verkauf & überzeugende Investoren-Präsentation',
            headline: 'Spektakuläre 6K-Perspektiven kombiniert mit edlen Print-Exposés und eigener Projekt-Website.',
            description: 'Ideal für Immobilienprojekte, Bauunternehmen, Industrieanlagen oder Tourismus: Wir setzen Ihr Objekt aus der Luft perfekt in Szene und liefern sowohl das gedruckte Premium-Exposé als auch die digitale Vermarktungsplattform.',
            ctaService: 'Immobilien-, Bau- & Standort-Marketing',
            hosting: 'Dedizierte Projekt-Landingpage mit schnellem Video-Streaming für 4K-Luftaufnahmen.',
            process: 'Automatischer Exposé-Download & sofortige Lead-Qualifizierung für Kaufinteressenten.',
            print: 'Hochwertige Hardcover- oder Broschüren-Exposés, Bautafeln & Bauzaunbanner.',
            drone: '6K Kameraflüge, 360°-Panoramen sowie regelmäßige Baufortschritts-Dokumentation.'
        },
        event: {
            code: 'BLUEPRINT // SALES_AND_EXPO_BOOST',
            impact: 'Effekt: Maximale Sichtbarkeit auf Messen, Events & im Vertrieb',
            headline: 'Aufmerksamkeit gewinnen vor Ort – und Kontakte digital ohne Zeitverlust nachverfolgen.',
            description: 'Wir statten Sie mit aufmerksamkeitsstarker Messe- und Werbetechnik aus, produzieren den passenden Event- oder Imagefilm per Drohne und sorgen dafür, dass jeder gewonnene Kontakt sofort digital betreut wird.',
            ctaService: 'Messeauftritt & Vertriebs-Offensive',
            hosting: 'Kampagnen-Landingpages mit garantierter Erreichbarkeit auch bei hohem Besucheransturm.',
            process: 'Digitaler Lead-Erfassungsbogen am Tablet/iPhone mit automatischem Infopaket-Versand.',
            print: 'Roll-Ups, Messetheken, Flyer, Produktmappen & aufmerksamkeitsstarke Give-aways.',
            drone: 'Dynamische Luft- & Eventaufnahmen für Messebildschirme und Social-Media-Kampagnen.'
        }
    };

    const scenarioBtns = document.querySelectorAll('[data-scenario]');
    const elScenCode = document.getElementById('scen-code');
    const elScenImpact = document.getElementById('scen-impact');
    const elScenHeadline = document.getElementById('scen-headline');
    const elScenDesc = document.getElementById('scen-description');
    const elScenCta = document.getElementById('scen-cta-btn');
    const elScenHosting = document.getElementById('scen-text-hosting');
    const elScenProcess = document.getElementById('scen-text-process');
    const elScenPrint = document.getElementById('scen-text-print');
    const elScenDrone = document.getElementById('scen-text-drone');

    scenarioBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-scenario');
            const data = scenarios[key];
            if (!data) return;

            scenarioBtns.forEach((b) => {
                b.classList.toggle('active', b === btn);
                b.setAttribute('aria-selected', String(b === btn));
            });

            if (elScenCode) elScenCode.textContent = data.code;
            if (elScenImpact) elScenImpact.textContent = data.impact;
            if (elScenHeadline) elScenHeadline.textContent = data.headline;
            if (elScenDesc) elScenDesc.textContent = data.description;
            if (elScenCta) elScenCta.setAttribute('data-prefill-service', data.ctaService);
            if (elScenHosting) elScenHosting.textContent = data.hosting;
            if (elScenProcess) elScenProcess.textContent = data.process;
            if (elScenPrint) elScenPrint.textContent = data.print;
            if (elScenDrone) elScenDrone.textContent = data.drone;
        });
    });

    // =========================================================================
    // 9. CASE STUDIES FILTER
    // =========================================================================
    const filterPills = document.querySelectorAll('[data-filter]');
    const caseCards = document.querySelectorAll('.case-card');

    filterPills.forEach((pill) => {
        pill.addEventListener('click', () => {
            const filter = pill.getAttribute('data-filter');
            filterPills.forEach((p) => p.classList.toggle('active', p === pill));

            caseCards.forEach((card) => {
                const cats = card.getAttribute('data-categories') || '';
                if (filter === 'all' || cats.includes(filter)) {
                    card.classList.remove('hidden-case');
                } else {
                    card.classList.add('hidden-case');
                }
            });
        });
    });

    // =========================================================================
    // 10. FAQ ACCORDION
    // =========================================================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
        const btn = item.querySelector('.faq-question');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            faqItems.forEach((other) => {
                other.classList.remove('open');
                const otherBtn = other.querySelector('.faq-question');
                if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            });
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // =========================================================================
    // 11. CONTACT FORM SERVICE CHIPS & PREFILL LINKS
    // =========================================================================
    const serviceCheckboxes = document.querySelectorAll('input[name="services"]');
    const selectedCountBadge = document.getElementById('selected-count-badge');
    const messageTextarea = document.getElementById('client-message');

    const updateSelectedServiceCount = () => {
        const checked = Array.from(serviceCheckboxes).filter((cb) => cb.checked);
        if (selectedCountBadge) {
            const count = checked.length;
            selectedCountBadge.textContent = count === 1 ? '1 Bereich gewählt' : `${count} Bereiche gewählt`;
        }
    };

    serviceCheckboxes.forEach((cb) => {
        cb.addEventListener('change', updateSelectedServiceCount);
    });

    // Prefill service when clicking a service CTA link
    const prefillLinks = document.querySelectorAll('[data-prefill-service]');
    prefillLinks.forEach((link) => {
        link.addEventListener('click', () => {
            const targetService = link.getAttribute('data-prefill-service') || '';
            serviceCheckboxes.forEach((cb) => {
                if (targetService.toLowerCase().includes('relaunch') || targetService.toLowerCase().includes('immobilien') || targetService.toLowerCase().includes('messe')) {
                    cb.checked = true;
                } else {
                    cb.checked = targetService.toLowerCase().includes(cb.value.split(' ')[0].toLowerCase());
                }
            });
            updateSelectedServiceCount();
            if (messageTextarea && !messageTextarea.value.trim()) {
                messageTextarea.value = `Hallo MACASI Solutions Team,\n\nich interessiere mich für: ${targetService}.\nBitte kontaktieren Sie mich für ein unverbindliches Erstgespräch.`;
            }
        });
    });

    // Form Submission Handler
    const contactForm = document.getElementById('engineering-contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('client-name').value.trim();
            const email = document.getElementById('client-email').value.trim();
            const message = document.getElementById('client-message').value.trim();
            const privacy = document.getElementById('client-privacy').checked;
            const selectedServices = Array.from(serviceCheckboxes)
                .filter((cb) => cb.checked)
                .map((cb) => cb.value);

            if (!name || !email || !message || !privacy) {
                formFeedback.className = 'form-feedback error';
                formFeedback.textContent = 'Bitte füllen Sie alle Pflichtfelder (*) aus und bestätigen Sie den Datenschutzhinweis.';
                return;
            }

            const servicesList = selectedServices.length > 0 ? selectedServices.join(', ') : 'Allgemeine Beratung';
            formFeedback.className = 'form-feedback success';
            formFeedback.innerHTML = `<strong>✓ System-Übertragung erfolgreich!</strong><br>Vielen Dank, ${name}. Ihre Anfrage für <em>${servicesList}</em> wurde registriert. Wir melden uns innerhalb von 24 Stunden bei Ihnen.`;
            contactForm.reset();
            updateSelectedServiceCount();
        });
    }

    // =========================================================================
    // 12. LEGAL MODALS (IMPRESSUM & DATENSCHUTZ)
    // =========================================================================
    const legalModal = document.getElementById('legal-modal');
    const modalImpressum = document.getElementById('modal-body-impressum');
    const modalDatenschutz = document.getElementById('modal-body-datenschutz');
    const openModalBtns = document.querySelectorAll('[data-open-modal]');
    const closeModalBtns = document.querySelectorAll('[data-close-modal]');

    openModalBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-open-modal');
            if (!legalModal) return;
            modalImpressum.classList.toggle('hidden', type !== 'impressum');
            modalDatenschutz.classList.toggle('hidden', type !== 'datenschutz');
            legalModal.classList.add('active');
            legalModal.setAttribute('aria-hidden', 'false');
        });
    });

    closeModalBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (!legalModal) return;
            legalModal.classList.remove('active');
            legalModal.setAttribute('aria-hidden', 'true');
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (legalModal && legalModal.classList.contains('active')) {
                legalModal.classList.remove('active');
            }
            if (mobileDrawer && mobileDrawer.classList.contains('open')) {
                toggleMobileMenu(false);
            }
        }
    });
});
