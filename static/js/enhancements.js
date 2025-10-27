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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new ScrollAnimations();
    new ProjectCards();
    new SkillBars();
    new TypingAnimation();
    new PerformanceMonitor();

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