/**
 * Main JavaScript - main.js
 * Author: Yashas Rajanna Naidu
 * Version: 1.0
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website functionality
    initNavbar();
    initMobileMenu();
    initSmoothScrolling();
    initRevealAnimations();
    populateProjects();
    populateTimeline();
    updateCurrentYear();
});

/**
 * Initialize navbar scroll effects
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Trigger the scroll event initially to set the correct state
    window.dispatchEvent(new Event('scroll'));
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNav = document.getElementById('mobile-nav');
    
    // Toggle mobile menu
    mobileMenu.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        // Toggle icon between bars and X
        const icon = mobileMenu.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('#mobile-nav a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

/**
 * Initialize smooth scrolling for internal links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Offset for fixed navbar
                const offset = 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize reveal animations on scroll
 */
function initRevealAnimations() {
    // Target all elements with the 'reveal' class
    const elements = document.querySelectorAll('.reveal');
    
    // Function to check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    };
    
    // Function to handle scroll events
    const handleScroll = () => {
        elements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('active');
            }
        });
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Trigger on initial load
    window.addEventListener('load', handleScroll);

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress-value');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const position = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (position < screenPosition) {
                bar.style.transform = 'scaleX(1)';
            }
        });
    };
    
    window.addEventListener('scroll', animateSkillBars);
    window.addEventListener('load', animateSkillBars);

    // Typing animation for the hero title
    const typeText = (element, text, speed = 100) => {
        let i = 0;
        element.textContent = '';
        element.classList.add('typing');
        
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                element.classList.remove('typing');
                
                // Add the span with special styling back
                if (element.classList.contains('hero-title')) {
                    const words = element.textContent.split(' ');
                    const lastName = words.pop();
                    element.innerHTML = words.join(' ') + ' <span>' + lastName + '</span>';
                }
            }
        }, speed);
    };

    // Start typing animation after page load
    window.addEventListener('load', () => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            
            setTimeout(() => {
                typeText(heroTitle, originalText, 80);
            }, 500);
        }
    });
}

/**
 * Populate projects section dynamically
 */
function populateProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) return;
    
    // Project data array
    const projects = [
        {
            title: "Loan Approval Prediction System",
            image: "./assets/img/projects/loan-prediction.png",
            description: "Built an end-to-end loan approval system with 92% accuracy using Ensemble Models (Logistic Regression, Random Forest). Implemented Recursive Feature Elimination (RFE) to identify key financial indicators.",
            tags: ["Machine Learning", "Python", "Flask"],
            github: "https://github.com/Yashasrn33/Loan_Approval_prediction"
        },
        {
            title: "Flipkart Review Analysis",
            image: "./assets/img/projects/sentiment-analysis.png",
            description: "Analyzed 100K+ product reviews from Flipkart's e-commerce platform. Achieved 89% classification accuracy using fine-tuned NLP models for Indian e-commerce context.",
            tags: ["NLP", "Python", "Sentiment Analysis"],
            github: "https://github.com/Yashasrn33/flipkart-review-analysis"
        },
        {
            title: "NYC Taxi Fare Analysis Using Big Data",
            image: "./assets/img/projects/nyc-taxi.png",
            description: "Processed 3.2M+ NYC taxi records using PySpark on Databricks. Developed fare prediction model achieving RMSE of 5.2. Created dashboards with Spark SQL and Matplotlib for transit insights.",
            tags: ["Big Data", "PySpark", "Databricks"],
            github: "https://github.com/Yashasrn33/Taxi_Fare_Big_Data"
        },
        {
            title: "Kisan Bandhu: AI Agricultural Platform",
            image: "./assets/img/projects/kisan-bandhu.png",
            description: "Developed an AI platform to recommend crops and fertilizers using Regression models. Improved forecast accuracy by 25% and supported 200+ farmers with peer-based insights. Integrated weather API for real-time suggestions.",
            tags: ["AI", "Agriculture", "SQLite"],
            github: "https://github.com/Yashasrn33/Agriculture_dashboard"
        },
        {
            title: "Handwritten Digit Recognition",
            image: "./assets/img/projects/digit-recognition.png",
            description: "Built CNN classifier achieving 93% accuracy on MNIST using TensorFlow and Keras. Deployed as web app using Flask and Docker. Reduced input errors by 40% with OpenCV preprocessing.",
            tags: ["Deep Learning", "TensorFlow", "Computer Vision"],
            github: "https://github.com/Yashasrn33/Handwritten_DigitRecognition"
        },
        {
            title: "Air Canvas: Gesture-Based Drawing",
            image: "./assets/img/projects/air-canvas.png",
            description: "Created touchless drawing tool with real-time hand tracking. Implemented HSV color filtering for 30% better gesture recognition. Supports interactive learning and creative sketching without touch input.",
            tags: ["Computer Vision", "OpenCV", "Python"],
            github: "https://github.com/Yashasrn33/Air-Canvas"
        }
    ];
    
    // Clear existing content
    projectsGrid.innerHTML = '';
    
    // Create and append project cards
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card reveal reveal-bottom';
        
        let tagsHTML = '';
        project.tags.forEach(tag => {
            tagsHTML += `<span class="project-tag">${tag}</span>`;
        });
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" />
            </div>
            <div class="project-content">
                <div class="project-tags">
                    ${tagsHTML}
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">
                    ${project.description}
                </p>
                <div class="project-links">
                    <a href="${project.github}" target="_blank" class="github-link">
                        <i class="fab fa-github"></i> View Code
                    </a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

/**
 * Populate timeline section dynamically
 */
function populateTimeline() {
    const timeline = document.querySelector('.timeline');
    
    if (!timeline) return;
    
    // Timeline data array - removed projects, keeping only education and professional experience
    const timelineItems = [
        {
            date: "Apr 2025 - Jul 2025",
            title: "Backend Developer",
            subtitle: "Careescapes AI",
            description: " Developed a secure, role-based backend system for a clinic management platform using FastAPI, PostgreSQL, and Clerk Auth. Collaborated in an agile team to integrate APIs with a Next.js frontend, improving admin task efficiency by 40% and reducing unauthorized access by 50%. "
        },
        {
            date: "Sep 2024 - Jun 2026",
            title: "Northeastern University",
            subtitle: "Master's in Applied Machine Intelligence",
            description: "Currently pursuing a graduate degree in Applied Machine Intelligence with a focus on advanced ML techniques, natural language processing, and computer vision. GPA: 3.93"
        },
        {
            date: "Jul 2023 - Sep 2023",
            title: "Machine Learning Intern",
            subtitle: "Prinston Smart Engineers",
            description: " Built and deployed a credit risk prediction model using RFE and feature engineering, integrated via a Dockerized Flask API. Worked with cross-functional teams to enhance loan approval accuracy by 20% and reduce model iteration time by 30%."
        },
        {
            date: "Dec 2020 - May 2024",
            title: "Bangalore Institute of Technology",
            subtitle: "Bachelor of Engineering in AI & ML",
            description: "Completed undergraduate studies in Artificial Intelligence and Machine Learning with coursework in data structures, algorithms, machine learning, deep learning, and software engineering."
        },
        
        {
            date: "Jan 2024 - Apr 2024",
            title: "Research & Publication",
            subtitle: "IJIRT Manuscript",
            description: "Authored research paper 'Integrated ML-driven Agricultural Technology Platform for Personalized Recommendations, Resource Management, Market Participation' using machine learning techniques. <a href='https://ijirt.org/Article?manuscript=164583' target='_blank' class='publication-link'>View Publication <i class='fas fa-external-link-alt'></i></a>"
        }
    ];
    
    // Clear existing content
    timeline.innerHTML = '';
    
    // Create and append timeline items
    timelineItems.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item reveal';
        timelineItem.classList.add(index % 2 === 0 ? 'reveal-left' : 'reveal-right');
        
        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <span class="timeline-date">${item.date}</span>
                <h3 class="timeline-title">${item.title}</h3>
                <h4 class="timeline-subtitle">${item.subtitle}</h4>
                <p class="timeline-description">
                    ${item.description}
                </p>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

/**
 * Update copyright year in footer
 */
function updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Add active class to current navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 150) {
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
}

/**
 * Initialize intersection observer for animations
 */
function initIntersectionObserver() {
    if ('IntersectionObserver' in window) {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        const elements = document.querySelectorAll('.reveal');
        elements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const elements = document.querySelectorAll('.reveal');
        elements.forEach(element => {
            element.classList.add('active');
        });
    }
}