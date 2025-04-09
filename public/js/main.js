// main.js - Client-side JavaScript for portfolio website
document.addEventListener('DOMContentLoaded', () => {
    // Handle loading animation
    const loadingAnimation = document.getElementById('loadingAnimation');
    const mainContent = document.getElementById('mainContent');
    const loaderTags = document.querySelector('.loader-tags');
    
    // Skills to display in the loading animation
    const skills = [
        'Java', 'Python', 'SQL', 'Cybersecurity', 'Full Stack',
        'EIDR', 'React', 'Spring Boot', 'Database', 'Hardware'
    ];
    
    // No longer needed since we're using the tech matrix icons instead
    // Add tags with staggered animation
    /* skills.forEach((skill, index) => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = skill;
        tag.style.animationDelay = `${index * 0.15}s`;
        tag.style.animation = 'tagAppear 0.5s forwards ease';
        loaderTags.appendChild(tag);
    }); */
    
    // Simulate loading and hide animation
    setTimeout(() => {
        loadingAnimation.style.opacity = '0';
        
        setTimeout(() => {
            loadingAnimation.style.display = 'none';
            mainContent.style.opacity = '1';
            mainContent.style.transition = 'opacity 0.8s ease';
            
            // Initialize all other animations
            initializePageAnimations();
        }, 800);
    }, 2000); // Reduced loading time to 2 seconds
    
    // Initialize all animations and interactive elements
    function initializePageAnimations() {
        // Add animation classes to elements on page load
        const heading = document.querySelector('h1');
        const profileDesc = document.querySelector('#home p');
        const profilePic = document.querySelector('.profile-border');
        const contactBtn = document.querySelector('a[href="#contact"]');
        const projectsBtn = document.querySelector('a[href="#projects"]');
        
        // Apply initial animations with delays
        if (heading) heading.classList.add('animate-fadeInLeft');
        if (profileDesc) {
            profileDesc.classList.add('animate-fadeInLeft');
            profileDesc.style.animationDelay = '0.2s';
        }
        if (profilePic) {
            profilePic.classList.add('animate-fadeInRight');
            profilePic.style.animationDelay = '0.3s';
        }
        if (contactBtn) {
            contactBtn.classList.add('animate-fadeInUp');
            contactBtn.style.animationDelay = '0.4s';
        }
        if (projectsBtn) {
            projectsBtn.classList.add('animate-fadeInUp');
            projectsBtn.style.animationDelay = '0.5s';
        }
        
        // Scroll animation for elements
        const animateOnScroll = () => {
            // Animate skill cards
            document.querySelectorAll('.skill-card').forEach((element, index) => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('visible');
                    // Add staggered animation delay
                    element.style.transitionDelay = `${index * 0.1}s`;
                }
            });
            
            // Animate experience items
            document.querySelectorAll('.experience-item').forEach((element, index) => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('visible');
                    // Add staggered animation delay
                    element.style.transitionDelay = `${index * 0.1}s`;
                }
            });
            
            // Animate section headings
            document.querySelectorAll('h2.gradient-text').forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('visible');
                }
            });
        };
        
        // Call typing effect after initial load animations
        setTimeout(typeWriteText, 800);
        
        // Type writing effect for the heading
        function typeWriteText() {
            const headingSpan = document.querySelector('h1 .gradient-text');
            if (headingSpan) {
                const text = headingSpan.textContent;
                headingSpan.textContent = '';
                
                // Create a wrapper for the typing effect
                const wrapper = document.createElement('span');
                wrapper.style.display = 'inline-block';
                wrapper.style.overflow = 'hidden';
                wrapper.style.whiteSpace = 'nowrap';
                wrapper.style.animation = 'typing 2.5s steps(40, end)';
                
                // Create an inner span for the text
                const inner = document.createElement('span');
                inner.textContent = text;
                inner.classList.add('gradient-text');
                
                // Append to DOM
                wrapper.appendChild(inner);
                headingSpan.parentNode.replaceChild(wrapper, headingSpan);
            }
        }
        
        // Trigger scroll animations on page load and scroll
        animateOnScroll();
        window.addEventListener('scroll', animateOnScroll);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Terminal cursor blinking effect
    const terminalCursor = document.querySelector('.terminal-effect');
    if (terminalCursor) {
        setInterval(() => {
            terminalCursor.style.opacity = terminalCursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Basic validation
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                showFormStatus('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                showFormStatus('Please enter a valid email address', 'error');
                return;
            }
            
            try {
                // Show loading status
                showFormStatus('Sending message...', 'info');
                
                // Submit form data to server
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: nameInput.value,
                        email: emailInput.value,
                        message: messageInput.value
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Show success message with animation
                    showFormStatus('Message sent successfully! I will get back to you soon.', 'success');
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    // Show error message
                    showFormStatus('Failed to send message. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                showFormStatus('An error occurred. Please try again later.', 'error');
            }
        });
    }
    
    // Helper function to show form status with animation
    function showFormStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = type === 'success' ? 'success' : type === 'error' ? 'error' : 'info';
            formStatus.classList.remove('hidden');
            formStatus.classList.add('show');
            
            // Hide the status message after a delay for success messages
            if (type === 'success') {
                setTimeout(() => {
                    formStatus.classList.remove('show');
                    setTimeout(() => {
                        formStatus.classList.add('hidden');
                    }, 300);
                }, 5000);
            }
        }
    }

    // Add class to social media icons for animation
    document.querySelectorAll('.flex a[href^="https://"]').forEach(icon => {
        icon.classList.add('social-icon');
    });
});