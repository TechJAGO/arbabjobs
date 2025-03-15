/**
 * Arbab Jobs - Main JavaScript
 * This file handles the main functionality of the website including:
 * - Navigation
 * - Scroll animations
 * - Job filtering
 * - Form submission
 */

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 500);
    });

    // Navigation functionality
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const backToTop = document.getElementById('backToTop');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Sticky header on scroll
    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Back to top button visibility
    function updateBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    }

    // Update active nav link based on scroll position
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector('.nav-link[href*="' + sectionId + '"]')?.classList.add('active');
            } else {
                document.querySelector('.nav-link[href*="' + sectionId + '"]')?.classList.remove('active');
            }
        });
    }

    // Apply scroll events
    window.addEventListener('scroll', function() {
        updateHeader();
        updateBackToTop();
        updateActiveLink();
        checkScrollAnimations();
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button click
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Number counter animation
    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 30);
        } else {
            counter.innerText = target;
        }
    }

    // Testimonials slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevButton = document.getElementById('testimonial-prev');
    const nextButton = document.getElementById('testimonial-next');
    let currentIndex = 0;
    
    function updateTestimonialSlider() {
        const cardWidth = testimonialCards[0].offsetWidth + parseInt(getComputedStyle(testimonialCards[0]).marginLeft) * 2;
        testimonialTrack.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        updateTestimonialSlider();
    }
    
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
        updateTestimonialSlider();
    }
    
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', prevTestimonial);
        nextButton.addEventListener('click', nextTestimonial);
    }
    
    // Auto-advance testimonials
    let testimonialInterval = setInterval(nextTestimonial, 5000);
    
    if (testimonialTrack) {
        testimonialTrack.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialTrack.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(nextTestimonial, 5000);
        });
        
        // Handle responsive adjustments
        window.addEventListener('resize', updateTestimonialSlider);
    }

    // Job filtering
    const industryFilter = document.getElementById('industry');
    const countryFilter = document.getElementById('country');
    const experienceFilter = document.getElementById('experience');
    const jobCards = document.querySelectorAll('.job-card');
    
    function filterJobs() {
        const industryValue = industryFilter?.value || 'all';
        const countryValue = countryFilter?.value || 'all';
        const experienceValue = experienceFilter?.value || 'all';
        
        // This is a simplified version. In a real application, you would filter based on actual job data
        // Here we're just demonstrating the concept
        jobCards.forEach(card => {
            card.style.display = 'flex';
            // Add actual filtering logic here based on card attributes
        });
    }
    
    if (industryFilter) industryFilter.addEventListener('change', filterJobs);
    if (countryFilter) countryFilter.addEventListener('change', filterJobs);
    if (experienceFilter) experienceFilter.addEventListener('change', filterJobs);

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form (basic validation)
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, you would send the form data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Scroll animations
    function checkScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        const triggerPoint = window.innerHeight * 0.8;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerPoint) {
                element.classList.add('active');
            }
        });
        
        // Animate counters when visible
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const counterTop = counter.getBoundingClientRect().top;
            
            if (counterTop < triggerPoint && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter);
            }
        });
    }

    // Initialize scroll animations on page load
    checkScrollAnimations();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (testimonialTrack) {
            updateTestimonialSlider();
        }
    });

    // Initialize
    updateHeader();
    updateBackToTop();
    updateActiveLink();
});
