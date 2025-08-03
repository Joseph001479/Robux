document.addEventListener('DOMContentLoaded', function() {
    // ============ ENHANCED MOBILE MENU ============
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            // Premium menu animation
            mobileMenu.classList.toggle('hidden');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('animate__animated', 'animate__fadeInDown');
                mobileMenu.addEventListener('animationend', () => {
                    mobileMenu.classList.remove('animate__animated', 'animate__fadeInDown');
                }, { once: true });
            }
            mobileMenuButton.setAttribute('aria-expanded', mobileMenu.classList.contains('hidden') ? 'false' : 'true');
            
            // Premium button effect
            mobileMenuButton.classList.toggle('menu-active');
        });

        // Close menu when clicking links
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('animate__animated', 'animate__fadeOutUp');
                mobileMenu.addEventListener('animationend', () => {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('animate__animated', 'animate__fadeOutUp');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                    mobileMenuButton.classList.remove('menu-active');
                }, { once: true });
            });
        });
    }

    // ============ PREMIUM SMOOTH SCROLL ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Premium scroll calculation
                const offset = 80;
                const startPosition = window.pageYOffset;
                const targetPosition = targetElement.getBoundingClientRect().top + startPosition - offset;
                const distance = targetPosition - startPosition;
                const duration = Math.min(1000, Math.max(300, Math.abs(distance) / 2));
                let startTime = null;
                
                // Custom easing animation
                function smoothScroll(currentTime) {
                    if (!startTime) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const ease = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                    
                    window.scrollTo(0, ease);
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(smoothScroll);
                    }
                }
                
                // Premium easing function
                function easeInOutQuad(t, b, c, d) {
                    t /= d/2;
                    if (t < 1) return c/2*t*t + b;
                    t--;
                    return -c/2 * (t*(t-2) - 1) + b;
                }
                
                requestAnimationFrame(smoothScroll);
            }
        });
    });

    // ============ PREMIUM REFLECTION EFFECT ============
    class PremiumReflection {
        constructor() {
            this.cards = document.querySelectorAll('.premium-card');
            this.initEffects();
        }
        
        initEffects() {
            this.cards.forEach(card => {
                this.createReflection(card);
                this.setupHoverEffects(card);
                this.adjustImageSize(card); // NEW: Add image size adjustment
            });
        }
        
        createReflection(card) {
            const reflectionSystem = document.createElement('div');
            reflectionSystem.className = 'reflection-system';
            
            reflectionSystem.innerHTML = `
                <div class="reflection-layer reflection-primary"></div>
                <div class="reflection-layer reflection-overlay"></div>
                <div class="inner-glow"></div>
            `;
            
            card.prepend(reflectionSystem);
        }
        
        setupHoverEffects(card) {
            const img = card.querySelector('.plan-image');
            if (!img) return;
            
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.boxShadow = '0 25px 50px -15px rgba(79, 70, 229, 0.2)';
                img.style.transform = 'scale(1.15) translateY(-5px)';
                img.style.filter = 'drop-shadow(0 10px 15px rgba(79, 70, 229, 0.2)) brightness(1.05)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
                img.style.transform = '';
                img.style.filter = '';
            });
        }
        
        // NEW METHOD: Adjust image size for all cards
        adjustImageSize(card) {
            const img = card.querySelector('.plan-image');
            if (img) {
                img.classList.add('plan-image--adjusted');
                
                // Mobile-specific adjustments
                if (window.innerWidth <= 768) {
                    img.style.width = '50px';
                    img.style.height = '50px';
                    img.style.objectFit = 'contain';
                    img.style.margin = '0 auto 15px';
                } else {
                    // Reset to default for larger screens if needed
                    img.style.width = '';
                    img.style.height = '';
                }
            }
        }
    }

    // Initialize premium effects
    new PremiumReflection();

    // ============ IMAGE SIZE ADJUSTMENT ============
    function adjustAllCardImages() {
        document.querySelectorAll('.premium-card .plan-image').forEach(img => {
            img.classList.add('plan-image--adjusted');
            
            if (window.innerWidth <= 768) {
                img.style.width = '50px';
                img.style.height = '50px';
                img.style.objectFit = 'contain';
                img.style.margin = '0 auto 15px';
            } else {
                img.style.width = '';
                img.style.height = '';
            }
        });
    }

    // Run on load and resize
    adjustAllCardImages();
    window.addEventListener('resize', adjustAllCardImages);

    // ============ SCROLL ANIMATIONS ============
    function animateOnScroll() {
        const elements = document.querySelectorAll('[data-animation]');
        const windowHeight = window.innerHeight;
        const scrollPosition = window.pageYOffset;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top + scrollPosition;
            const animationClass = element.getAttribute('data-animation');
            
            if (scrollPosition > elementPosition - windowHeight * 0.75) {
                element.classList.add('animate__animated', animationClass);
                element.addEventListener('animationend', () => {
                    element.classList.remove('animate__animated', animationClass);
                    element.style.opacity = 1;
                }, { once: true });
            }
        });
    }

    // Optimized scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(animateOnScroll, 20);
    });
    window.addEventListener('load', animateOnScroll);

    // ============ PREMIUM BUTTON EFFECTS ============
    document.querySelectorAll('.premium-card button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Premium click effect
            this.classList.add('premium-click-active');
            
            // Confirmation animation
            const originalContent = this.innerHTML;
            this.innerHTML = `
                <span class="premium-check-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                </span>
                <span class="premium-check-text">Adicionado</span>
            `;
            
            // Card effect
            const card = this.closest('.premium-card');
            card.classList.add('premium-purchase-effect');
            
            // Reset after animation
            setTimeout(() => {
                this.classList.remove('premium-click-active');
                this.innerHTML = originalContent;
                card.classList.remove('premium-purchase-effect');
            }, 2000);
        });
    });

    // ============ PREMIUM WHATSAPP BUTTON ============
    const whatsappButton = document.querySelector('.whatsapp-float');
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Click effect
            this.classList.add('whatsapp-click');
            setTimeout(() => {
                this.classList.remove('whatsapp-click');
            }, 300);
            
            // Open WhatsApp (replace with your number)
            setTimeout(() => {
                window.open('https://wa.me/SEUNUMERO', '_blank');
            }, 150);
        });
    }

    // ============ MOBILE LAYOUT ADJUSTMENTS ============
    function handleMobileLayout() {
        const planGrid = document.querySelector('.plan-grid');
        if (!planGrid) return;

        if (window.innerWidth <= 768) {
            // Single column for mobile
            planGrid.style.gridTemplateColumns = '1fr';
            planGrid.style.maxWidth = '100%';
            
            // Add spacing between cards
            document.querySelectorAll('.premium-card').forEach(card => {
                card.style.marginBottom = '20px';
            });
        } else {
            // Reset to original layout
            planGrid.style.gridTemplateColumns = '';
            planGrid.style.maxWidth = '';
            
            document.querySelectorAll('.premium-card').forEach(card => {
                card.style.marginBottom = '';
            });
        }
    }

    // Initialize and handle resize
    handleMobileLayout();
    window.addEventListener('resize', handleMobileLayout);
});
// ============ SISTEMA VIP - COLAR APENAS ESTA PARTE ============
class PremiumReflection {
    constructor() {
        this.cards = document.querySelectorAll('.premium-card');
        this.initEffects();
    }
    
    initEffects() {
        this.cards.forEach((card, index) => {
            this.createReflection(card);
            this.setupHoverEffects(card);
            this.addVipEffects(card, index);
        });
    }
    
    addVipEffects(card, index) {
        const img = card.querySelector('.plan-image');
        if (!img) return;
        
        img.classList.add('plan-image--vip');
        const hueValue = index * 12;
        img.style.setProperty('--hue-rotate', `${hueValue}deg`);
    }
    
    createReflection(card) {
        // Mantenha seu método existente ou use o novo
    }
    
    setupHoverEffects(card) {
        // Mantenha seu método existente
    }
}

// Inicialize apenas se não tiver sido inicializado antes
if (!window.premiumEffectsLoaded) {
    new PremiumReflection();
    window.premiumEffectsLoaded = true;
}
// Efeito de brilho que segue o mouse
document.querySelectorAll('.relative').forEach(container => {
    container.addEventListener('mousemove', (e) => {
        const x = e.offsetX / container.offsetWidth * 100;
        const y = e.offsetY / container.offsetHeight * 100;
        
        container.style.setProperty('--mouse-x', `${x}%`);
        container.style.setProperty('--mouse-y', `${y}%`);
    });
});