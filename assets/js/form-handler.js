/**
 * Form Handler JavaScript - form-handler.js
 * Author: Yashas Rajanna Naidu
 * Version: 1.0
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form handling
    initContactForm();
});

/**
 * Initialize contact form handling
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(contactForm)) {
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Form submission success (simulate API response)
                showFormMessage(true, 'Your message has been sent successfully! I\'ll get back to you soon.');
                contactForm.reset();
                
                // Restore button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    const successMessage = document.querySelector('.form-message.success');
                    if (successMessage) {
                        successMessage.remove();
                    }
                }, 5000);
                
            }, 1500);
            
            // For actual form submission, uncomment and modify this code:
            
            const formData = new FormData(contactForm);
            
            fetch('your-api-endpoint', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                showFormMessage(true, 'Your message has been sent successfully! I\'ll get back to you soon.');
                contactForm.reset();
            })
            .catch(error => {
                showFormMessage(false, 'Oops! There was a problem sending your message. Please try again.');
                console.error('Error:', error);
            })
            .finally(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
            
        }
    });
    
    // Real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateInput(this);
            }
        });
    });
}

/**
 * Validate the entire form
 * @param {HTMLFormElement} form - The form to validate
 * @return {boolean} - Whether the form is valid
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Validate a single form input
 * @param {HTMLInputElement|HTMLTextAreaElement} input - The input to validate
 * @return {boolean} - Whether the input is valid
 */
function validateInput(input) {
    // Remove existing error message
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Reset classes
    input.classList.remove('invalid');
    input.classList.remove('valid');
    
    // Check if empty
    if (input.required && !input.value.trim()) {
        showInputError(input, 'This field is required');
        return false;
    }
    
    // Email validation
    if (input.type === 'email' && input.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
            showInputError(input, 'Please enter a valid email address');
            return false;
        }
    }
    
    // If we got here, input is valid
    input.classList.add('valid');
    return true;
}

/**
 * Show error message for an input
 * @param {HTMLInputElement|HTMLTextAreaElement} input - The input with error
 * @param {string} message - The error message
 */
function showInputError(input, message) {
    input.classList.add('invalid');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    input.parentElement.appendChild(errorElement);
}

/**
 * Show form-wide success or error message
 * @param {boolean} success - Whether to show success or error message
 * @param {string} message - The message text
 */
function showFormMessage(success, message) {
    // Remove any existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    const contactForm = document.getElementById('contactForm');
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${success ? 'success' : 'error'}`;
    messageElement.innerHTML = `<p>${message}</p>`;
    
    // Insert the message before the form
    contactForm.parentNode.insertBefore(messageElement, contactForm);
    
    // Add animation class
    setTimeout(() => {
        messageElement.classList.add('show');
    }, 10);
    
    // Scroll to message if it's not visible
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Add CSS styles for form validation and messages
 */
function addFormStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .form-control.invalid {
            border-color: #FF5A5F !important;
            box-shadow: 0 0 0 2px rgba(255, 90, 95, 0.25) !important;
        }
        
        .form-control.valid {
            border-color: #06D6A0 !important;
            box-shadow: 0 0 0 2px rgba(6, 214, 160, 0.25) !important;
        }
        
        .error-message {
            color: #FF5A5F;
            font-size: 12px;
            margin-top: 5px;
            animation: slideIn 0.3s ease-in-out;
        }
        
        .form-message {
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        }
        
        .form-message.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .form-message.success {
            background-color: rgba(6, 214, 160, 0.1);
            border-left: 4px solid #06D6A0;
        }
        
        .form-message.error {
            background-color: rgba(255, 90, 95, 0.1);
            border-left: 4px solid #FF5A5F;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-5px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Add form styles when the script loads
addFormStyles();