// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// ===== Mobile Menu Toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Animate hamburger to X
    menuToggle.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ===== Counter Animation for Stats =====
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
let statsAnimated = false;

const checkStatsVisible = () => {
    if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible && !statsAnimated) {
            statNumbers.forEach(stat => animateCounter(stat));
            statsAnimated = true;
        }
    }
};

window.addEventListener('scroll', checkStatsVisible);
checkStatsVisible();

// ===== Skill Bar Animation =====
const skillProgress = document.querySelectorAll('.skill-progress');

const animateSkills = () => {
    skillProgress.forEach(skill => {
        const rect = skill.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible && !skill.classList.contains('animated')) {
            const progress = skill.getAttribute('data-progress');
            skill.style.setProperty('--progress', progress + '%');
            skill.style.width = progress + '%';
            skill.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateSkills);
animateSkills();

// ===== Typing Effect for Hero Title (Optional) =====
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;

    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    // Start typing after page load
    setTimeout(typeWriter, 1000);
}

// ===== Parallax Effect for Hero Background =====
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== Form Submission Handler =====
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);

        // Here you would typically send the data to a server
        // For now, we'll just show a success message

        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// ===== Cursor Trail Effect (Optional - Advanced) =====
const createCursorTrail = () => {
    let cursorTrail = [];
    const maxTrail = 20;

    document.addEventListener('mousemove', (e) => {
        cursorTrail.push({ x: e.clientX, y: e.clientY });

        if (cursorTrail.length > maxTrail) {
            cursorTrail.shift();
        }

        // You can use this data to create visual effects
        // This is just the data structure, visual implementation would go in CSS
    });
};

// Uncomment to enable cursor trail
// createCursorTrail();

// ===== Add Loading Animation =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== Project Card Tilt Effect =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Lazy Loading for Images =====
const images = document.querySelectorAll('img[data-src]');

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

images.forEach(img => imageObserver.observe(img));

// ===== Add Smooth Page Transitions =====
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Easter Egg: Konami Code =====
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiPattern.length - 1, konamiCode.length - konamiPattern.length);

    if (konamiCode.join('').includes(konamiPattern.join(''))) {
        // Activate easter egg
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// ===== Performance Optimization: Debounce Scroll Events =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedReveal = debounce(revealOnScroll, 10);
const debouncedSkills = debounce(animateSkills, 10);

window.addEventListener('scroll', debouncedReveal);
window.addEventListener('scroll', debouncedSkills);

// ===== Console Message =====
console.log('%c🚀 Welcome to my portfolio!', 'font-size: 20px; color: #64ffda; font-weight: bold;');
console.log('%cInterested in the code? Check out the source!', 'font-size: 14px; color: #8892b0;');
