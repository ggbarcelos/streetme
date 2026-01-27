// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (this.checkValidity()) {
            // Get form data
            const formData = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                telefone: document.getElementById('telefone').value,
                cidade: document.getElementById('cidade').value,
                estado: document.getElementById('estado').value,
                capital: document.getElementById('capital').value,
                horario: document.getElementById('horario').value,
                mensagem: document.getElementById('mensagem').value
            };
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(function() {
                // Success message
                alert('Obrigado pelo seu interesse! Nossa equipe entrará em contato em breve.');
                
                // Reset form
                contactForm.reset();
                
                // Restore button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Track conversion (Google Analytics, Facebook Pixel, etc.)
                // gtag('event', 'conversion', {'send_to': 'AW-XXXXXXXXX/XXXXXXXXXXXXXX'});
                
            }, 2000);
        } else {
            // Show validation errors
            this.classList.add('was-validated');
        }
    });
}

// Phone Number Mask
const phoneInput = document.getElementById('telefone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length <= 2) {
                value = value.replace(/^(\d{0,2})/, '($1');
            } else if (value.length <= 6) {
                value = value.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
            } else if (value.length <= 10) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else {
                value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
        }
        
        e.target.value = value;
    });
}

// Counter Animation for Stats
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Intersection Observer for Counter Animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const targetText = entry.target.textContent;
            const target = parseInt(targetText.replace(/\D/g, ''));
            
            if (!isNaN(target)) {
                entry.target.classList.add('animated');
                animateCounter(entry.target, target);
            }
        }
    });
}, observerOptions);

// Observe all stat numbers
document.querySelectorAll('.stat-number').forEach(stat => {
    counterObserver.observe(stat);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-section');
    
    if (parallax) {
        parallax.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Active Navigation Highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Product Card Hover Effect with Tilt
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Scroll Progress Indicator
const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-progress';
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        indicator.style.width = scrolled + '%';
    });
};

createScrollIndicator();

// Investment Calculator (Optional Feature)
const createInvestmentCalculator = () => {
    const calculator = {
        initialInvestment: 250000,
        monthlyRevenue: 60000,
        monthlyExpenses: 35000,
        royalty: 2500,
        
        calculatePayback() {
            const monthlyProfit = this.monthlyRevenue - this.monthlyExpenses - this.royalty;
            const paybackMonths = Math.ceil(this.initialInvestment / monthlyProfit);
            return paybackMonths;
        },
        
        calculateYearlyReturn() {
            const monthlyProfit = this.monthlyRevenue - this.monthlyExpenses - this.royalty;
            const yearlyProfit = monthlyProfit * 12;
            return yearlyProfit;
        }
    };
    
    return calculator;
};

// Console Welcome Message
console.log('%c🚀 Bem-vindo à StreetMe!', 'font-size: 24px; font-weight: bold; color: #6F4E37;');
console.log('%c☕ Invista no futuro do café premium no Brasil', 'font-size: 16px; color: #D4A574;');
console.log('%cInteressado em se tornar um franqueado? Acesse: #contato', 'font-size: 14px; color: #8B6F47;');

// Preload Critical Images
const preloadImages = () => {
    const criticalImages = [
        'img/produtos/Tezza-3210.jpg',
        'img/produtos/Tezza-4890.jpg',
        'img/produtos/IMG_0268.jpeg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    preloadImages();
    
    // Add entrance animation to hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        alert('🎉 Parabéns! Você desbloqueou um desconto especial de 5% na taxa de franquia! Entre em contato mencionando o código: STREETME2026');
        konamiCode = [];
    }
});

// Performance Monitoring
const logPerformance = () => {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Página carregada em ${pageLoadTime}ms`);
        });
    }
};

logPerformance();