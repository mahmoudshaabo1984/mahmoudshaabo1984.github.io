/* =============================================================
   Mahmoud Shaabo Portfolio — Behaviour script
   All features are progressive enhancements and respect
   prefers-reduced-motion. NVDA-friendly announcements go
   through #a11y-alert-region.
   ============================================================= */

(function () {
    'use strict';

    const PREFERS_REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const a11yAlert = () => document.getElementById('a11y-alert-region');

    function announce(message) {
        const region = a11yAlert();
        if (!region) return;
        region.textContent = '';
        // Force NVDA to re-read by clearing then setting on next tick
        setTimeout(() => { region.textContent = message; }, 50);
    }

    /* ----------------------------------------------------------
       i18n dictionary (EN / AR)
       ---------------------------------------------------------- */
    const i18n = {
        en: {
            'skip': 'Skip to main content',
            'nav.about': 'About',
            'nav.skills': 'Skills',
            'nav.projects': 'Projects',
            'nav.contact': 'Contact',
            'hero.badge': 'Welcome to my portfolio',
            'hero.greeting.morning': 'Good morning, ',
            'hero.greeting.afternoon': 'Good afternoon, ',
            'hero.greeting.evening': 'Good evening, ',
            'hero.greeting.default': 'Hello, ',
            'hero.title': 'I am Mahmoud Shaabo',
            'hero.subtitle': 'Aspiring Software Engineer | Focus on Logic & Web Development',
            'hero.desc': 'A trainee at <strong>CodeYourFuture (CYF)</strong> and a passionate Python & JavaScript developer. I focus on building smart, accessible, and clean software solutions for everyone.',
            'hero.cta.projects': 'Browse My Projects',
            'hero.cta.contact': 'Get In Touch',
            'about.title': 'About Me',
            'about.background.title': 'Background & Education',
            'about.background.body': 'I hold a BA in English Literature from the University of Aleppo (2011). I am currently based in the Sheffield/Doncaster region, UK. I enjoy merging my passion for languages, translation, and structured logic with writing clean code.',
            'about.vision.title': 'Vision & Career Goals',
            'about.vision.body': 'Being visually impaired, I have a first-hand understanding of the importance of web accessibility. My goal is to become a software engineer with a strong focus on backend systems, creating web applications that are inclusive and usable by everyone.',
            'about.env.title': 'Development Environment',
            'about.env.body': 'I primarily work on Windows 11 with WSL2 (running Ubuntu 24.04). I rely on the <strong>NVDA</strong> screen reader as my primary tool for development, reading, and testing websites.',
            'skills.title': 'Technical Skills',
            'skills.py': 'Advanced-beginner level (2.5+ years self-study, object-oriented programming, GUI applications with wxPython, and basic cryptography).',
            'skills.js': 'Intermediate level (DOM manipulation, ES Modules, and automated testing with Jest).',
            'skills.cs': 'Exploring and building basic Console and .NET applications to broaden backend skills.',
            'skills.web': 'Designing modern, responsive layouts built on WCAG accessibility guidelines.',
            'skills.git': 'Comfortable with Bash/WSL terminal environments and using Git version control for code repositories.',
            'projects.title': 'Projects & Courses',
            'projects.desc': 'Here is a selection of the repositories and projects I have worked on. Use the filters to narrow by language.',
            'filter.all': 'All',
            'filter.linux': 'Linux / Shell',
            'proj.1.title': 'Python Course for the Blind',
            'proj.1.desc': 'Exercises and practical scripts created during the Python course for visually impaired students led by trainer Ahmed Baker.',
            'proj.2.title': 'Linux Course for the Blind',
            'proj.2.desc': "Command-line tools, scripting basics, and server environment setups from Ahmed Baker's Linux course.",
            'proj.3.title': 'Python Course — Ahmed Sami',
            'proj.3.desc': 'Refactored code and custom implementations based on the Python programming syllabus from tutor Ahmed Sami.',
            'proj.4.title': 'Web Course — Ahmed Sami',
            'proj.4.desc': "Design assignments, CSS property templates, and page mock-ups for Ahmed Sami's web development class.",
            'proj.5.title': 'CYF Workshops',
            'proj.5.desc': 'A repository containing my work, assignments, and class exercises from the CodeYourFuture training cohort (Sheffield 2026).',
            'proj.6.title': 'C# Console Example Project',
            'proj.6.desc': 'A testing ground for C# features, console applications, and learning object-oriented paradigms in .NET.',
            'proj.link': 'View Repository on GitHub',
            'contact.title': 'Get in Touch',
            'contact.desc': 'I am always open to discussing software projects, collaboration, or learning opportunities. Send a message below or reach me on GitHub.',
            'contact.form.title': 'Send a message',
            'contact.form.name': 'Your name',
            'contact.form.email': 'Your email',
            'contact.form.message': 'Your message',
            'contact.form.submit': 'Send message',
            'contact.form.sending': 'Sending…',
            'contact.form.success': 'Thanks! Your message has been sent. I will reply shortly.',
            'contact.form.error': 'Sorry — the message could not be sent. Please try again or contact me on GitHub.',
            'contact.form.err.name': 'Please enter your name.',
            'contact.form.err.email': 'Please enter a valid email address.',
            'contact.form.err.message': 'Please enter a message (at least 10 characters).',
            'contact.elsewhere.title': 'Elsewhere',
            'contact.elsewhere.email': 'Mail client',
            'contact.elsewhere.projects': 'Browse projects',
            'contact.elsewhere.note': 'Replies usually within 48 hours.',
            'footer.copy': '© 2026 Mahmoud Shaabo. All rights reserved.',
            'footer.a11y': 'Built to conform with W3C WCAG accessibility standards and tested with screen readers.',
            'announce.theme.dark': 'Dark theme enabled.',
            'announce.theme.light': 'Light theme enabled.',
            'announce.theme.forcedColors': 'High contrast mode is active — system colors may override site theme.',
            'announce.lang': 'Language switched to English.',
            'announce.menu.open': 'Navigation menu opened.',
            'announce.menu.close': 'Navigation menu closed.',
            'announce.filter': (n, lang) => `Showing ${n} project${n === 1 ? '' : 's'} matching ${lang}.`,
            'theme.dark': 'Dark',
            'theme.light': 'Light',
            'notice.forcedColors': 'High contrast mode is active. System colors may override the site theme, but the theme setting is still saved.',
            'aria.logo': 'Mahmoud Shaabo — back to top',
            'aria.nav': 'Main Navigation',
            'aria.filter': 'Filter projects by technology',
            'aria.backToTop': 'Back to top',
            'aria.theme.toLight': 'Switch to light theme',
            'aria.theme.toDark': 'Switch to dark theme',
            'aria.lang.toAr': 'Switch language to Arabic',
            'aria.lang.toEn': 'Switch language to English',
            'aria.menu.open': 'Open navigation menu',
            'aria.menu.close': 'Close navigation menu'
        },
        ar: {
            'skip': 'الانتقال إلى المحتوى الرئيسي',
            'nav.about': 'نبذة',
            'nav.skills': 'المهارات',
            'nav.projects': 'المشاريع',
            'nav.contact': 'التواصل',
            'hero.badge': 'أهلًا بك في معرض أعمالي',
            'hero.greeting.morning': 'صباح الخير، ',
            'hero.greeting.afternoon': 'مساء الخير، ',
            'hero.greeting.evening': 'مساء الخير، ',
            'hero.greeting.default': 'أهلًا، ',
            'hero.title': 'أنا محمود شعبو',
            'hero.subtitle': 'مهندس برمجيات طموح | تركيز على المنطق وتطوير الويب',
            'hero.desc': 'متدرّب في <strong>CodeYourFuture (CYF)</strong> ومطوّر شغوف بلغتي Python و JavaScript. أركّز على بناء حلول برمجية ذكية وسهلة الوصول ونظيفة للجميع.',
            'hero.cta.projects': 'تصفّح مشاريعي',
            'hero.cta.contact': 'تواصل معي',
            'about.title': 'نبذة عني',
            'about.background.title': 'الخلفية والتعليم',
            'about.background.body': 'حاصل على بكالوريوس في الأدب الإنجليزي من جامعة حلب (2011). أقيم حاليًا في منطقة شيفيلد/دونكاستر بالمملكة المتحدة. أستمتع بدمج شغفي باللغات والترجمة والمنطق المنظّم مع كتابة كود نظيف.',
            'about.vision.title': 'الرؤية والأهداف المهنية',
            'about.vision.body': 'بصفتي شخصًا ضعيف البصر، لديّ فهم مباشر لأهمية إمكانية الوصول إلى الويب. هدفي أن أصبح مهندس برمجيات يركّز على أنظمة الواجهة الخلفية، وأُنشئ تطبيقات ويب شاملة وقابلة للاستخدام للجميع.',
            'about.env.title': 'بيئة العمل',
            'about.env.body': 'أعمل بشكل أساسي على Windows 11 مع WSL2 (يعمل عليه Ubuntu 24.04). أعتمد على قارئ الشاشة <strong>NVDA</strong> كأداتي الأساسية للتطوير والقراءة واختبار المواقع.',
            'skills.title': 'المهارات التقنية',
            'skills.py': 'مستوى متقدّم للمبتدئين (أكثر من 2.5 سنوات دراسة ذاتية، البرمجة الكائنية، تطبيقات واجهة المستخدم باستخدام wxPython، وأساسيات التشفير).',
            'skills.js': 'مستوى متوسّط (التعامل مع DOM، وحدات ES، واختبارات آلية باستخدام Jest).',
            'skills.cs': 'استكشاف وبناء تطبيقات Console و .NET الأساسية لتوسيع مهارات الواجهة الخلفية.',
            'skills.web': 'تصميم تخطيطات حديثة ومتجاوبة مبنية على إرشادات الوصول WCAG.',
            'skills.git': 'متمكّن من بيئات Bash/WSL واستخدام Git للتحكّم في إصدارات الكود.',
            'projects.title': 'المشاريع والدورات',
            'projects.desc': 'فيما يلي مجموعة مختارة من المستودعات والمشاريع التي عملت عليها. استخدم الفلاتر للتصفية حسب اللغة.',
            'filter.all': 'الكل',
            'filter.linux': 'لينكس / Shell',
            'proj.1.title': 'دورة بايثون لذوي الإعاقة البصرية',
            'proj.1.desc': 'تمارين وسكربتات عملية أُنجزت خلال دورة بايثون للطلاب ضعاف البصر بإشراف المدرّب أحمد بكر.',
            'proj.2.title': 'دورة لينكس لذوي الإعاقة البصرية',
            'proj.2.desc': 'أدوات سطر الأوامر وأساسيات السكربتات وإعداد بيئات الخوادم من دورة لينكس للمدرّب أحمد بكر.',
            'proj.3.title': 'دورة بايثون — أحمد سامي',
            'proj.3.desc': 'تعديل الكود وتطبيقات مخصّصة بناءً على منهج برمجة بايثون للمدرّس أحمد سامي.',
            'proj.4.title': 'دورة الويب — أحمد سامي',
            'proj.4.desc': 'واجبات تصميم وقوالب لخصائص CSS ونماذج صفحات لدورة تطوير الويب للمدرّس أحمد سامي.',
            'proj.5.title': 'ورشات CYF',
            'proj.5.desc': 'مستودع يحتوي على أعمالي وواجباتي وتمارين الفصل من تدريب CodeYourFuture (شيفيلد 2026).',
            'proj.6.title': 'مشروع C# للكونسول',
            'proj.6.desc': 'مساحة تجريبية لميزات C# وتطبيقات الكونسول وتعلّم نماذج البرمجة الكائنية في .NET.',
            'proj.link': 'عرض المستودع على GitHub',
            'contact.title': 'تواصل معي',
            'contact.desc': 'أنا منفتح دائمًا لمناقشة المشاريع البرمجية أو التعاون أو فرص التعلّم. أرسل رسالة عبر النموذج أو تواصل معي على GitHub.',
            'contact.form.title': 'أرسل رسالة',
            'contact.form.name': 'الاسم',
            'contact.form.email': 'البريد الإلكتروني',
            'contact.form.message': 'الرسالة',
            'contact.form.submit': 'إرسال الرسالة',
            'contact.form.sending': 'جارٍ الإرسال…',
            'contact.form.success': 'شكرًا! تم إرسال رسالتك وسأردّ قريبًا.',
            'contact.form.error': 'عذرًا — تعذّر إرسال الرسالة. يُرجى المحاولة مرة أخرى أو التواصل عبر GitHub.',
            'contact.form.err.name': 'الرجاء إدخال اسمك.',
            'contact.form.err.email': 'الرجاء إدخال بريد إلكتروني صالح.',
            'contact.form.err.message': 'الرجاء إدخال رسالة (10 أحرف على الأقل).',
            'contact.elsewhere.title': 'في أماكن أخرى',
            'contact.elsewhere.email': 'تطبيق البريد',
            'contact.elsewhere.projects': 'تصفّح المشاريع',
            'contact.elsewhere.note': 'الردود عادةً خلال 48 ساعة.',
            'footer.copy': '© 2026 محمود شعبو. جميع الحقوق محفوظة.',
            'footer.a11y': 'مبني وفق معايير الوصول W3C WCAG ومختبر مع قارئات الشاشة.',
            'announce.theme.dark': 'تم تفعيل الوضع الداكن.',
            'announce.theme.light': 'تم تفعيل الوضع الفاتح.',
            'announce.theme.forcedColors': 'وضع التباين العالي مفعّل — قد تتجاوز ألوان النظام ألوان الموقع.',
            'announce.lang': 'تم تغيير اللغة إلى العربية.',
            'announce.menu.open': 'تم فتح قائمة التنقّل.',
            'announce.menu.close': 'تم إغلاق قائمة التنقّل.',
            'announce.filter': (n, lang) => `يُعرض ${n} مشروع${n === 1 ? '' : 'ًا'} مطابق للتصنيف ${lang}.`,
            'theme.dark': 'داكن',
            'theme.light': 'فاتح',
            'notice.forcedColors': 'وضع التباين العالي مفعّل. قد تتجاوز ألوان النظام ألوان الموقع، لكن إعداد الوضع يُحفظ.',
            'aria.logo': 'محمود شعبو — العودة إلى الأعلى',
            'aria.nav': 'التنقل الرئيسي',
            'aria.filter': 'تصفية المشاريع حسب التقنية',
            'aria.backToTop': 'العودة إلى الأعلى',
            'aria.theme.toLight': 'التبديل إلى الوضع الفاتح',
            'aria.theme.toDark': 'التبديل إلى الوضع الداكن',
            'aria.lang.toAr': 'تغيير اللغة إلى العربية',
            'aria.lang.toEn': 'تغيير اللغة إلى الإنجليزية',
            'aria.menu.open': 'فتح قائمة التنقّل',
            'aria.menu.close': 'إغلاق قائمة التنقّل'
        }
    };

    function t(key) {
        const lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
        return (i18n[lang] && i18n[lang][key]) || (i18n.en[key] || key);
    }

    function isForcedColorsActive() {
        return window.matchMedia('(forced-colors: active)').matches;
    }

    function normalizeTheme(value) {
        return value === 'light' ? 'light' : 'dark';
    }

    function applyTheme(theme) {
        theme = normalizeTheme(theme);
        const html = document.documentElement;
        html.setAttribute('data-theme', theme);
        html.classList.toggle('theme-light', theme === 'light');
        html.classList.toggle('theme-dark', theme === 'dark');
        html.style.colorScheme = theme;

        const meta = document.getElementById('theme-color-meta');
        if (meta) {
            meta.setAttribute('content', theme === 'light' ? '#f6f8fa' : '#0d1117');
        }

        try { localStorage.setItem('theme', theme); } catch (e) { /* ignore */ }
    }

    function syncThemeButton() {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;

        const theme = normalizeTheme(document.documentElement.getAttribute('data-theme'));
        const isLight = theme === 'light';

        btn.setAttribute('aria-pressed', String(isLight));
        btn.setAttribute('aria-label', t(isLight ? 'aria.theme.toDark' : 'aria.theme.toLight'));
        btn.title = btn.getAttribute('aria-label');

        const textEl = document.getElementById('theme-toggle-text');
        if (textEl) textEl.textContent = t(isLight ? 'theme.light' : 'theme.dark');
    }

    function applyAriaTranslations() {
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria');
            el.setAttribute('aria-label', t(key));
        });
    }

    /* ----------------------------------------------------------
       Dynamic greeting (runs synchronously to avoid FOUC)
       ---------------------------------------------------------- */
    function initDynamicGreeting() {
        const el = document.getElementById('dynamic-greeting');
        if (!el) return;
        const hour = new Date().getHours();
        let key = 'hero.greeting.default';
        if (hour < 12)      key = 'hero.greeting.morning';
        else if (hour < 18) key = 'hero.greeting.afternoon';
        else                key = 'hero.greeting.evening';
        el.textContent = t(key);
    }

    /* ----------------------------------------------------------
       i18n application
       ---------------------------------------------------------- */
    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const value = t(key);
            // Allow inline HTML so <strong> tags in long copy survive
            el.innerHTML = value;
        });
        applyAriaTranslations();
        syncThemeButton();
        initDynamicGreeting();
    }

    /* ----------------------------------------------------------
       Theme toggle (light / dark)
       ---------------------------------------------------------- */
    function initThemeToggle() {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;

        applyTheme(document.documentElement.getAttribute('data-theme'));
        syncThemeButton();

        btn.addEventListener('click', () => {
            const current = normalizeTheme(document.documentElement.getAttribute('data-theme'));
            const next = current === 'light' ? 'dark' : 'light';
            applyTheme(next);
            syncThemeButton();

            let message = t(next === 'light' ? 'announce.theme.light' : 'announce.theme.dark');
            if (isForcedColorsActive()) {
                message += ' ' + t('announce.theme.forcedColors');
            }
            announce(message);
        });

        document.addEventListener('lang:changed', syncThemeButton);
    }

    /* ----------------------------------------------------------
       Language toggle (EN / AR)
       ---------------------------------------------------------- */
    function initLangToggle() {
        const btn = document.getElementById('lang-toggle');
        const label = document.getElementById('lang-toggle-label');
        if (!btn) return;

        function syncButton() {
            const isAr = document.documentElement.lang === 'ar';
            if (label) label.textContent = isAr ? 'EN' : 'AR';
            btn.setAttribute('aria-label', t(isAr ? 'aria.lang.toEn' : 'aria.lang.toAr'));
            btn.title = btn.getAttribute('aria-label');
        }

        syncButton();

        btn.addEventListener('click', () => {
            const current = document.documentElement.lang === 'ar' ? 'ar' : 'en';
            const next = current === 'ar' ? 'en' : 'ar';
            document.documentElement.lang = next;
            document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
            try { localStorage.setItem('lang', next); } catch (e) { /* ignore */ }
            applyTranslations();
            syncButton();
            announce(t('announce.lang'));
            document.dispatchEvent(new CustomEvent('lang:changed', { detail: { lang: next } }));
        });
    }

    /* ----------------------------------------------------------
       Mobile menu (off-canvas)
       ---------------------------------------------------------- */
    function initMobileMenu() {
        const btn  = document.getElementById('menu-toggle');
        const nav  = document.getElementById('primary-nav');
        if (!btn || !nav) return;

        function setOpen(open) {
            btn.setAttribute('aria-expanded', String(open));
            btn.setAttribute('data-i18n-aria', open ? 'aria.menu.close' : 'aria.menu.open');
            btn.setAttribute('aria-label', t(open ? 'aria.menu.close' : 'aria.menu.open'));
            nav.classList.toggle('is-open', open);
            document.body.classList.toggle('nav-open', open);
            announce(t(open ? 'announce.menu.open' : 'announce.menu.close'));
            if (open) {
                const first = nav.querySelector('a');
                if (first) first.focus();
            }
        }

        btn.addEventListener('click', () => {
            const open = btn.getAttribute('aria-expanded') !== 'true';
            setOpen(open);
        });

        // Close on link click (mobile)
        nav.addEventListener('click', e => {
            const target = e.target.closest('a');
            if (target && btn.getAttribute('aria-expanded') === 'true') {
                setOpen(false);
            }
        });

        // Close on Escape
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
                setOpen(false);
                btn.focus();
            }
        });

        // Close on outside click
        document.addEventListener('click', e => {
            if (btn.getAttribute('aria-expanded') !== 'true') return;
            if (nav.contains(e.target) || btn.contains(e.target)) return;
            setOpen(false);
        });

        // Reset when resizing back to desktop
        const mql = window.matchMedia('(min-width: 769px)');
        const onChange = () => {
            if (mql.matches && btn.getAttribute('aria-expanded') === 'true') {
                setOpen(false);
            }
        };
        if (mql.addEventListener) mql.addEventListener('change', onChange);
        else if (mql.addListener) mql.addListener(onChange);
    }

    /* ----------------------------------------------------------
       Scroll-spy (sets aria-current on active nav link)
       ---------------------------------------------------------- */
    function initScrollSpy() {
        const sections = document.querySelectorAll('main section[id]');
        const links = document.querySelectorAll('.main-nav a[href^="#"]');
        if (!sections.length || !links.length || !('IntersectionObserver' in window)) return;

        const linkMap = new Map();
        links.forEach(link => {
            const id = link.getAttribute('href').slice(1);
            linkMap.set(id, link);
        });

        function setActive(id) {
            links.forEach(l => l.removeAttribute('aria-current'));
            const active = linkMap.get(id);
            if (active) active.setAttribute('aria-current', 'true');
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

        sections.forEach(s => observer.observe(s));
    }

    /* ----------------------------------------------------------
       Reveal on scroll
       ---------------------------------------------------------- */
    function initRevealOnScroll() {
        const items = document.querySelectorAll('.reveal');
        if (!items.length) return;

        if (PREFERS_REDUCED_MOTION || !('IntersectionObserver' in window)) {
            items.forEach(el => el.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

        items.forEach(el => observer.observe(el));
    }

    /* ----------------------------------------------------------
       Back to top
       ---------------------------------------------------------- */
    function initBackToTop() {
        const btn = document.getElementById('back-to-top');
        if (!btn) return;

        function update() {
            const show = window.scrollY > 400;
            btn.hidden = !show;
            btn.classList.toggle('is-visible', show);
        }

        window.addEventListener('scroll', update, { passive: true });
        update();

        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: PREFERS_REDUCED_MOTION ? 'auto' : 'smooth'
            });
            const top = document.getElementById('top');
            if (top) top.focus({ preventScroll: true });
        });
    }

    /* ----------------------------------------------------------
       Project filter
       ---------------------------------------------------------- */
    function initProjectFilter() {
        const chips = document.querySelectorAll('.filter-chip');
        const cards = document.querySelectorAll('.project-card');
        if (!chips.length || !cards.length) return;

        function applyFilter(filter, chip) {
            chips.forEach(c => {
                const active = c === chip;
                c.classList.toggle('is-active', active);
                c.setAttribute('aria-pressed', String(active));
            });

            let count = 0;
            cards.forEach(card => {
                const tags = (card.getAttribute('data-tags') || '').split(/\s+/);
                const match = filter === 'all' || tags.includes(filter);
                card.hidden = !match;
                if (match) count += 1;
            });

            const label = (chip.textContent || filter).trim();
            announce(i18n[document.documentElement.lang === 'ar' ? 'ar' : 'en']['announce.filter'](count, label));
        }

        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                applyFilter(chip.getAttribute('data-filter'), chip);
            });
        });
    }

    /* ----------------------------------------------------------
       Contact form (client-side validation + Netlify submit)
       ---------------------------------------------------------- */
    function initContactForm() {
        const form = document.querySelector('form.contact-form');
        if (!form) return;

        const status = form.querySelector('#form-status');
        const fields = [
            { input: form.querySelector('#cf-name'),    err: form.querySelector('#cf-name-err'),    key: 'contact.form.err.name',    validate: v => v.trim().length >= 2 },
            { input: form.querySelector('#cf-email'),   err: form.querySelector('#cf-email-err'),   key: 'contact.form.err.email',   validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
            { input: form.querySelector('#cf-message'), err: form.querySelector('#cf-message-err'), key: 'contact.form.err.message', validate: v => v.trim().length >= 10 }
        ];

        function setError(field, msg) {
            field.input.parentElement.classList.toggle('has-error', !!msg);
            field.err.textContent = msg || '';
            if (msg) field.input.setAttribute('aria-invalid', 'true');
            else field.input.removeAttribute('aria-invalid');
        }

        fields.forEach(field => {
            field.input.addEventListener('blur', () => {
                if (!field.validate(field.input.value)) setError(field, t(field.key));
                else setError(field, '');
            });
            field.input.addEventListener('input', () => {
                if (field.input.parentElement.classList.contains('has-error')) {
                    if (field.validate(field.input.value)) setError(field, '');
                }
            });
        });

        function setStatus(msg, kind) {
            status.textContent = msg || '';
            status.classList.remove('is-success', 'is-error');
            if (kind) status.classList.add('is-' + kind);
        }

        form.addEventListener('submit', async e => {
            e.preventDefault();

            let firstInvalid = null;
            fields.forEach(field => {
                if (!field.validate(field.input.value)) {
                    setError(field, t(field.key));
                    if (!firstInvalid) firstInvalid = field.input;
                } else {
                    setError(field, '');
                }
            });

            if (firstInvalid) {
                firstInvalid.focus();
                setStatus('', null);
                return;
            }

            setStatus(t('contact.form.sending'), null);

            try {
                const data = new FormData(form);
                const body = new URLSearchParams();
                data.forEach((value, key) => body.append(key, value));

                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: body.toString()
                });

                if (response.ok) {
                    setStatus(t('contact.form.success'), 'success');
                    announce(t('contact.form.success'));
                    form.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (err) {
                console.error('Contact form submit error:', err);
                setStatus(t('contact.form.error'), 'error');
                announce(t('contact.form.error'));
            }
        });
    }

    /* ----------------------------------------------------------
       Bootstrap
       ---------------------------------------------------------- */
    function init() {
        applyTranslations();
        initThemeToggle();
        initLangToggle();
        initMobileMenu();
        initScrollSpy();
        initRevealOnScroll();
        initBackToTop();
        initProjectFilter();
        initContactForm();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
