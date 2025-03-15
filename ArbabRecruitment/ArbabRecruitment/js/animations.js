/**
 * Arbab Jobs - Animations
 * This file handles all the custom animations and transitions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Initialize animations that rely on scroll
    function initializeAnimations() {
        // Reveal text animations
        revealTextElements();
        
        // Initialize on scroll animations
        initScrollAnimations();
        
        // Animate elements that are already in view on page load
        animateElementsInView();
    }
    
    // Animate elements that are in the initial viewport
    function animateElementsInView() {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        const windowHeight = window.innerHeight;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight * 0.9) {
                element.classList.add('active');
            }
        });
    }
    
    // Handle scroll animations
    function initScrollAnimations() {
        // Create a new Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Unobserve after animation is triggered
                    if (!entry.target.classList.contains('keep-observing')) {
                        observer.unobserve(entry.target);
                    }
                } else {
                    // Only remove the active class for elements that need to be re-animated
                    if (entry.target.classList.contains('keep-observing')) {
                        entry.target.classList.remove('active');
                    }
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of the element is visible
            rootMargin: '0px 0px -10% 0px' // Adjust the trigger point
        });
        
        // Observe all elements with animation classes
        const elementsToAnimate = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Handle text reveal animations
    function revealTextElements() {
        const revealElements = document.querySelectorAll('.reveal-text');
        
        revealElements.forEach((element, index) => {
            // Stagger the animations
            setTimeout(() => {
                element.classList.add('animate');
            }, index * 200);
        });
    }
    
    // Animate hover effects for various elements
    function initHoverAnimations() {
        // Service card hover effects
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.service-icon');
                icon.classList.add('pulse');
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.service-icon');
                icon.classList.remove('pulse');
            });
        });
        
        // Job card hover effects
        const jobCards = document.querySelectorAll('.job-card');
        jobCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('scale-hover');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('scale-hover');
            });
        });
    }
    initHoverAnimations();
    
    // Parallax effect on scroll
    function initParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                element.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        });
    }
    initParallaxEffect();
    
    // Animate the hero section
    function animateHero() {
        const heroContent = document.querySelector('.hero-content');
        const heroStats = document.querySelector('.hero-stats');
        
        if (heroContent) {
            setTimeout(() => {
                const elements = heroContent.querySelectorAll('.fade-in');
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('active');
                    }, index * 200);
                });
            }, 500);
        }
        
        if (heroStats) {
            setTimeout(() => {
                heroStats.classList.add('active');
                
                // Animate counters
                const counters = heroStats.querySelectorAll('.counter');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
            }, 1000);
        }
    }
    animateHero();
    
    // Counter animation function
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // Animation duration in milliseconds
        const stepTime = 20; // Time between steps in milliseconds
        const initialValue = 0;
        const increment = target / (duration / stepTime);
        let current = initialValue;
        
        const timer = setInterval(function() {
            current += increment;
            counter.textContent = Math.floor(current);
            
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, stepTime);
    }
    
    // Initialize typing animation for any elements with the .typing class
    function initTypingAnimation() {
        const typingElements = document.querySelectorAll('.typing');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.visibility = 'visible';
            
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    element.textContent += text.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    
                    // Add cursor blinking after typing is complete
                    element.classList.add('cursor-blink');
                }
            }, 100);
        });
    }
    
    // Handle window resize to adjust animations if needed
    window.addEventListener('resize', function() {
        // Reinitialize animations that need to be adjusted on resize
    });
    
    // Add scroll trigger for elements that should animate when scrolled to
    window.addEventListener('scroll', function() {
        // This is handled by the Intersection Observer now
    });
});
