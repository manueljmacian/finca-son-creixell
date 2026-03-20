/**
 * Finca Son Creixell - Main JavaScript
 * Handles: Mobile menu, scroll animations, nav shadow
 */

document.addEventListener('DOMContentLoaded', () => {

    // ===== Preloader =====
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }, 600);
        });
    }

    // ===== Flatpickr Date Selection =====
    if (typeof flatpickr !== 'undefined') {
        const dateInputs = document.querySelectorAll("input[type='date']");
        if (dateInputs.length > 0) {
            flatpickr(dateInputs, {
                locale: "es",
                minDate: "today",
                altInput: true,
                altFormat: "j F, Y",
                dateFormat: "Y-m-d",
                disableMobile: "true"
            });
        }
    }

    // ===== Mobile Menu =====
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileClose = document.getElementById('mobile-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');

    function openMobileMenu() {
        mobileMenu?.classList.add('open');
        mobileOverlay?.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu?.classList.remove('open');
        mobileOverlay?.classList.remove('open');
        document.body.style.overflow = '';
    }

    mobileToggle?.addEventListener('click', openMobileMenu);
    mobileClose?.addEventListener('click', closeMobileMenu);
    mobileOverlay?.addEventListener('click', closeMobileMenu);

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
            // Also close lightbox if active
            document.getElementById('lightbox')?.classList.remove('active');
        }
    });


    // ===== Scroll Animations (Intersection Observer) =====
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach((el, index) => {
            // Stagger animations slightly
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    }


    // ===== Navbar Shadow on Scroll =====
    const navbar = document.querySelector('header');
    
    if (navbar) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            
            if (currentScroll > 10) {
                navbar.classList.add('shadow-md');
            } else {
                navbar.classList.remove('shadow-md');
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }


    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                closeMobileMenu();
            }
        });
    });


    // ===== Active Nav Link Highlighting =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

});
