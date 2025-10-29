/**
 * Enhanced Portfolio JavaScript
 * Interactive features for AI specialist portfolio
 */

// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.createToggle();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
    }

    createToggle() {
        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.innerHTML = this.theme === 'light' ? '🌙' : '☀️';
        toggle.setAttribute('aria-label', 'Toggle theme');

        toggle.addEventListener('click', () => {
            this.toggle();
            toggle.innerHTML = this.theme === 'light' ? '🌙' : '☀️';

            // Add rotation animation
            toggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                toggle.style.transform = 'rotate(0deg)';
            }, 300);
        });

        document.body.appendChild(toggle);
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.createObserver();
        this.addScrollIndicators();
    }

    createObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    this.animateCounter(entry.target);
                }
            });
        }, this.observerOptions);

        // Observe elements
        document.querySelectorAll('.scroll-reveal, .timeline-item').forEach(el => {
            observer.observe(el);
        });
    }

    animateCounter(element) {
        const counter = element.querySelector('.counter');
        if (counter) {
            this.countUp(counter);
        }
    }

    countUp(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 1500; // Reduced duration
        const step = target / (duration / 16);
        let current = 0;

        // Use requestAnimationFrame for better performance
        const animate = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };

        requestAnimationFrame(animate);
    }

    addScrollIndicators() {
        // Add scroll indicator to hero section
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.innerHTML = `
            <div class="scroll-arrow">
                <i class="fas fa-chevron-down"></i>
            </div>
            <span>Scroll to explore</span>
        `;

        const hero = document.querySelector('.hero');
        if (hero) {
            hero.appendChild(indicator);

            // Use CSS animations instead of JavaScript for better performance
            indicator.classList.add('animate-bounce');
        }
    }
}

// Interactive Project Cards
class ProjectCards {
    constructor() {
        this.init();
    }

    init() {
        this.addHoverEffects();
        this.createModal();
    }

    addHoverEffects() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.addRippleEffect(e);
            });
        });
    }

    addRippleEffect(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        card.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-body"></div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

// Skill Bars Animation
class SkillBars {
    constructor() {
        this.init();
    }

    init() {
        this.animateOnScroll();
    }

    animateOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillBars(entry.target);
                }
            });
        });

        document.querySelectorAll('.skills-section').forEach(section => {
            observer.observe(section);
        });
    }

    animateSkillBars(section) {
        const bars = section.querySelectorAll('.skill-progress');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width') || '80%';
                bar.style.width = width;
            }, index * 200);
        });
    }
}

// Typing Animation for Hero Text
class TypingAnimation {
    constructor() {
        this.texts = [
            'AI Specialist',
            'Researcher',
            'Educational Technology Innovator',
            'Python Developer'
        ];
        this.currentText = 0;
        this.init();
    }

    init() {
        this.createElement();
        if (this.element) {
            this.startTyping();
        }
    }

    createElement() {
        const element = document.querySelector('.typing-text');
        if (element) {
            this.element = element;
        } else {
            // Typing-text element doesn't exist on this page, skip initialization
            return;
        }
    }

    async startTyping() {
        while (true) {
            await this.typeText(this.texts[this.currentText]);
            await this.wait(2000);
            await this.eraseText();
            await this.wait(500);

            this.currentText = (this.currentText + 1) % this.texts.length;
        }
    }

    async typeText(text) {
        if (!this.element) return;

        for (let i = 0; i < text.length; i++) {
            this.element.textContent = text.substring(0, i + 1);
            await this.wait(100);
        }
    }

    async eraseText() {
        if (!this.element) return;

        const text = this.element.textContent;
        for (let i = text.length; i >= 0; i--) {
            this.element.textContent = text.substring(0, i);
            await this.wait(50);
        }
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.preloadCriticalResources();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalResources() {
        // Preload critical fonts more efficiently
        const fontLinks = [
            { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', family: 'Inter' },
            { href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap', family: 'Space Grotesk' }
        ];

        fontLinks.forEach(({ href, family }) => {
            // Check if font is already loaded
            if (document.querySelector(`link[href*="${family.replace(' ', '+')}"]`)) {
                return;
            }

            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            link.onload = function() {
                this.rel = 'stylesheet';
            };
            document.head.appendChild(link);
        });
    }
}

// Advanced Scroll Animations System
class AdvancedScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.createObserver();
        this.addScrollProgress();
    }

    createObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const delay = index * 100; // Stagger animations

                    setTimeout(() => {
                        element.classList.add('animate');
                    }, delay);

                    // Add different animation types based on data attributes
                    if (element.dataset.animation) {
                        element.classList.add(element.dataset.animation);
                    }
                }
            });
        }, this.observerOptions);

        // Observe all scroll-animate elements
        document.querySelectorAll('.scroll-animate, .slide-in-left, .slide-in-right, .fade-in-scale, .rotate-in').forEach(el => {
            observer.observe(el);
        });
    }

    addScrollProgress() {
        // Add scroll progress indicator
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress-fill"></div>';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.querySelector('.scroll-progress-fill').style.width = scrollPercent + '%';
        });
    }
}

// Enhanced Particle Effects
class ParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'particle-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                color: this.getRandomColor(),
                life: Math.random() * 100 + 50
            });
        }
    }

    getRandomColor() {
        const colors = ['#00A1F1', '#FCDD09', '#00AF27', '#FF6B6B', '#4ECDC4'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.life / 100;
            this.ctx.fill();

            // Remove dead particles
            if (particle.life <= 0) {
                this.particles.splice(index, 1);
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 3 + 1,
                    color: this.getRandomColor(),
                    life: Math.random() * 100 + 50
                });
            }
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas) {
            this.canvas.remove();
        }
    }
}

// Enhanced Micro-interactions
class MicroInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.addButtonRipples();
        this.addHoverEffects();
        this.addFormInteractions();
        this.addCardFlips();
    }

    addButtonRipples() {
        document.querySelectorAll('.btn-interactive').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                ripple.className = 'btn-ripple';
                btn.appendChild(ripple);

                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    addHoverEffects() {
        document.querySelectorAll('.interactive-element').forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.classList.add('pulse-on-hover');
            });

            el.addEventListener('mouseleave', () => {
                el.classList.remove('pulse-on-hover');
            });
        });

        document.querySelectorAll('.glow-on-hover').forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.boxShadow = '0 0 20px var(--primary-color), 0 0 40px var(--secondary-color)';
            });

            el.addEventListener('mouseleave', () => {
                el.style.boxShadow = '';
            });
        });
    }

    addFormInteractions() {
        document.querySelectorAll('.form-field').forEach(field => {
            const input = field.querySelector('input, textarea');
            const label = field.querySelector('label');

            if (input && label) {
                input.addEventListener('focus', () => {
                    field.classList.add('focused');
                    label.style.color = 'var(--primary-color)';
                });

                input.addEventListener('blur', () => {
                    field.classList.remove('focused');
                    label.style.color = '';
                });
            }
        });
    }

    addCardFlips() {
        document.querySelectorAll('.card-flip').forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });
        });
    }
}

// Enhanced Performance Monitor
class EnhancedPerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.preloadCriticalResources();
        this.addServiceWorker();
        this.optimizeAnimations();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalResources() {
        // Preload critical fonts
        const fontLinks = [
            { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', family: 'Inter' },
            { href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap', family: 'Space Grotesk' }
        ];

        fontLinks.forEach(({ href, family }) => {
            if (!document.querySelector(`link[href*="${family.replace(' ', '+')}"]`)) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'style';
                link.href = href;
                link.onload = function() {
                    this.rel = 'stylesheet';
                };
                document.head.appendChild(link);
            }
        });
    }

    addServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => console.log('SW registered'))
                    .catch(error => console.log('SW registration failed'));
            });
        }
    }

    optimizeAnimations() {
        // Reduce animations on low-performance devices
        if ('deviceMemory' in navigator && navigator.deviceMemory < 4) {
            document.documentElement.style.setProperty('--transition-normal', '0.1s ease');
            document.documentElement.style.setProperty('--transition-slow', '0.2s ease');
        }

        // Respect user's motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition-normal', '0.01ms');
            document.documentElement.style.setProperty('--transition-slow', '0.01ms');
        }
    }
}

// Enhanced Accessibility Features
class AccessibilityEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.addKeyboardNavigation();
        this.addScreenReaderSupport();
        this.addFocusManagement();
        this.addHighContrastSupport();
    }

    addKeyboardNavigation() {
        // Enhanced keyboard navigation for cards and interactive elements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const focusedElement = document.activeElement;
                if (focusedElement.classList.contains('interactive-element')) {
                    e.preventDefault();
                    focusedElement.click();
                }
            }
        });
    }

    addScreenReaderSupport() {
        // Add ARIA labels and descriptions
        document.querySelectorAll('.card').forEach(card => {
            if (!card.getAttribute('aria-label')) {
                const title = card.querySelector('.card-title');
                if (title) {
                    card.setAttribute('aria-label', title.textContent);
                }
            }
        });
    }

    addFocusManagement() {
        // Enhanced focus indicators
        document.querySelectorAll('button, a, input, textarea, select').forEach(el => {
            el.addEventListener('focus', () => {
                el.style.outline = '3px solid var(--primary-color)';
                el.style.outlineOffset = '2px';
            });

            el.addEventListener('blur', () => {
                el.style.outline = '';
                el.style.outlineOffset = '';
            });
        });
    }

    addHighContrastSupport() {
        // Detect high contrast mode
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            document.documentElement.classList.add('high-contrast');
        }

        window.matchMedia('(prefers-contrast: high)').addEventListener('change', (e) => {
            if (e.matches) {
                document.documentElement.classList.add('high-contrast');
            } else {
                document.documentElement.classList.remove('high-contrast');
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new ScrollAnimations();
    new AdvancedScrollAnimations();
    new ProjectCards();
    new SkillBars();
    new TypingAnimation();
    new PerformanceMonitor();
    new EnhancedPerformanceMonitor();
    new MicroInteractions();
    new AccessibilityEnhancements();

    // Add particle system to hero sections
    if (document.querySelector('.hero')) {
        new ParticleSystem();
    }

    // Add smooth scrolling to navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading states
    const style = document.createElement('style');
    style.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(0, 0, 0, 0.1);
            z-index: 1000;
        }

        .scroll-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            width: 0%;
            transition: width 0.3s ease;
        }

        .particle-canvas {
            pointer-events: none;
        }

        .high-contrast {
            --primary-color: #0066cc !important;
            --text-color: #000000 !important;
            --bg-color: #ffffff !important;
        }

        .btn-ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add CSS for ripple effect and performance optimizations
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 212, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .animate-bounce {
        animation: bounce 2s infinite;
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }

    .project-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .project-modal.active {
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
    }

    .modal-content {
        background: white;
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
        margin: 20px;
        border-radius: 12px;
        position: relative;
    }

    .modal-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        z-index: 2001;
    }
`;
document.head.appendChild(rippleStyles);