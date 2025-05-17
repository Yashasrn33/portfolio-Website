/**
 * Animations JavaScript - animations.js
 * Author: Yashas Rajanna Naidu
 * Version: 1.0
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initTypeWriterEffect();
    initScrollAnimations();
    initHoverEffects();
    initBackgroundEffects();
});

/**
 * Initialize background interaction effects
 */
function initBackgroundEffects() {
    // Add subtle parallax effect to the background based on mouse movement
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Apply subtle movement to sections based on mouse position
        document.querySelectorAll('section').forEach(section => {
            const sectionDepth = section.getAttribute('data-depth') || 0.05;
            const moveX = mouseX * sectionDepth * 50;
            const moveY = mouseY * sectionDepth * 50;
            section.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    // Add depth to containers on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        
        document.querySelectorAll('.section .container').forEach((container, index) => {
            const speed = 0.03;
            const yPos = -(scrolled * speed * (index + 1) % 15);
            container.style.transform = `translateY(${yPos}px)`;
        });
    });
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
    
    // Add data-depth attributes to sections for parallax effect
    document.querySelectorAll('section').forEach((section, index) => {
        section.setAttribute('data-depth', (0.05 + (index * 0.01)).toString());
    });
}

/**
 * Initialize hover effects for interactive elements
 */
function initHoverEffects() {
    // Project cards hover effect with 3D tilt
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate tilt values
            const tiltX = (y / rect.height - 0.5) * 10;
            const tiltY = (x / rect.width - 0.5) * -10;
            
            // Apply tilt effect
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
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
    
    // Skill category hover effect
    document.querySelectorAll('.skill-category').forEach(category => {
        category.addEventListener('mouseenter', function() {
            // Add glow effect
            this.classList.add('glow');
        });
        
        category.addEventListener('mouseleave', function() {
            // Remove glow effect
            this.classList.remove('glow');
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