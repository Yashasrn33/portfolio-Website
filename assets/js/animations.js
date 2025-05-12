/**
 * Animations JavaScript - animations.js
 * Author: Yashas Rajanna Naidu
 * Version: 1.0
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initParticles();
    initTypeWriterEffect();
    initScrollAnimations();
    initHoverEffects();
});

/**
 * Initialize particles animation in the hero section
 */
function initParticles() {
    // Add particles container to the hero section
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    hero.appendChild(particlesContainer);
    
    // Create particle elements
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

/**
 * Create a single particle element
 * @param {HTMLElement} container - The container for particles
 */
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 2px and 5px
    const size = Math.random() * 3 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random opacity
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    
    // Random animation duration between 10s and 30s
    const duration = Math.random() * 20 + 10;
    particle.style.animationDuration = `${duration}s`;
    
    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(particle);
}

/**
 * Initialize typewriter effect for hero title
 */
function initTypeWriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle || heroTitle.classList.contains('typed')) return;
    
    const originalText = heroTitle.textContent;
    const words = originalText.split(' ');
    const lastName = words[words.length - 1];
    const firstPart = words.slice(0, words.length - 1).join(' ');
    
    heroTitle.innerHTML = '';
    heroTitle.classList.add('typed');
    
    // Type the first part
    typeText(heroTitle, firstPart, () => {
        // After typing the first part, add a space
        heroTitle.innerHTML += ' ';
        
        // Create span for the last name
        const spanElement = document.createElement('span');
        heroTitle.appendChild(spanElement);
        
        // Type the last name inside the span
        typeText(spanElement, lastName);
    });
}

/**
 * Type text with a typewriter effect
 * @param {HTMLElement} element - The element to type text into
 * @param {string} text - The text to type
 * @param {Function} callback - Optional callback after typing is complete
 */
function typeText(element, text, callback = null) {
    let index = 0;
    const speed = 80; // typing speed in milliseconds
    
    // Add the typing cursor
    element.classList.add('typing');
    
    const typingInterval = setInterval(function() {
        element.textContent += text.charAt(index);
        index++;
        
        if (index === text.length) {
            clearInterval(typingInterval);
            // Remove the typing cursor when done
            setTimeout(() => {
                element.classList.remove('typing');
                if (callback) callback();
            }, 500);
        }
    }, speed);
}

/**
 * Initialize scroll-based animations
 */
function initScrollAnimations() {
    // Only initialize if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) return;
    
    // Options for the observer
    const options = {
        root: null, // Use the viewport as the root
        rootMargin: '0px 0px -100px 0px', // Slightly before the element comes into view
        threshold: 0.1 // Trigger when 10% of the element is visible
    };
    
    // Observer for reveal animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once animated, no need to observe again
                revealObserver.unobserve(entry.target);
            }
        });
    }, options);
    
    // Observe all elements with the reveal class
    document.querySelectorAll('.reveal').forEach(element => {
        revealObserver.observe(element);
    });
    
    // Observer for skill bars
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                progressBar.style.transform = 'scaleX(1)';
                skillObserver.unobserve(progressBar);
            }
        });
    }, options);
    
    // Observe all skill progress bars
    document.querySelectorAll('.skill-progress-value').forEach(element => {
        skillObserver.observe(element);
    });
}

/**
 * Initialize hover effects for interactive elements
 */
function initHoverEffects() {
    // Project cards hover effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
    
    // Timeline items hover effect
    document.querySelectorAll('.timeline-content').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const dot = this.parentElement.querySelector('.timeline-dot');
            dot.classList.add('pulse');
        });
        
        item.addEventListener('mouseleave', function() {
            const dot = this.parentElement.querySelector('.timeline-dot');
            dot.classList.remove('pulse');
        });
    });
    
    // Button hover effects with magnetic pull
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--x', `${x}px`);
            this.style.setProperty('--y', `${y}px`);
        });
    });
}

/**
 * Add parallax effect to elements
 */
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Apply parallax to selected elements
        document.querySelectorAll('.parallax').forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

/**
 * Add smooth reveal animation for sections
 */
function revealSections() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const windowHeight = window.innerHeight;
        const sectionTop = section.getBoundingClientRect().top;
        const sectionPoint = 150;
        
        if (sectionTop < windowHeight - sectionPoint) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}

// Call revealSections on scroll
window.addEventListener('scroll', revealSections);