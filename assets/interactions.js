// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and doc cards
document.querySelectorAll('.feature-card, .doc-card, .how-card, .browser-feature-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Handle button clicks with feedback
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Add ripple styles if not already in CSS
        if (!document.querySelector('style[data-ripple]')) {
            const style = document.createElement('style');
            style.setAttribute('data-ripple', 'true');
            style.textContent = `
                .btn { position: relative; overflow: hidden; }
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                }
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    });
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const canvas = document.getElementById('network-canvas');
    if (canvas) {
        canvas.style.opacity = Math.max(0.1, 0.3 - scrolled / 2000);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === '?') {
        showHelp();
    }
    if (e.key === 'h' && e.ctrlKey) {
        e.preventDefault();
        document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
    }
});

function showHelp() {
    const helpText = `
BlackNet Keyboard Shortcuts:
- ? : Show this help
- Ctrl+H : Go to homepage
    `;
    console.log(helpText);
}

// Add subtle mouse glow effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Update canvas background gradient subtly
    const canvas = document.getElementById('network-canvas');
    if (canvas && Math.random() > 0.99) {
        // Occasional subtle effect
    }
});

// Mobile menu toggle (if needed in future)
let mobileMenuOpen = false;

// Add page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease-in';
});

// Scroll to section links in nav
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        // Add active state
        document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '');
        this.style.color = '#ff1744';
        this.style.textShadow = '0 0 10px rgba(255, 23, 68, 0.6)';
    });
});

// Animate elements on scroll
const scrollElements = document.querySelectorAll('.feature-card, .doc-card');
const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop > (window.innerHeight || document.documentElement.clientHeight);
};

const displayScrollElement = (element) => {
    element.style.opacity = '1';
    element.style.animation = 'fadeIn 0.6s ease-out forwards';
};

window.addEventListener('scroll', () => {
    scrollElements.forEach((element) => {
        if (elementInView(element, 1.25)) {
            displayScrollElement(element);
        }
    });
});

// Toast notification helper (for future use)
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #ff1744;
        color: white;
        padding: 15px 20px;
        border-radius: 0;
        font-family: 'JetBrains Mono', monospace;
        z-index: 10000;
        box-shadow: 0 0 20px rgba(255, 23, 68, 0.6);
        animation: fadeIn 0.3s ease-out;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Preload external resources
window.addEventListener('load', () => {
    console.log('%cBlackNet loaded successfully', 'color: #ff1744; font-family: monospace; font-size: 14px;');
});
