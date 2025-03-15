/**
 * Arbab Jobs - Theme Toggle
 * This file handles theme switching functionality (light/dark mode)
 */

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        // Use system preference
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const defaultTheme = prefersDarkMode ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', defaultTheme);
    }
    
    // Toggle theme when the button is clicked
    themeToggle.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animate theme change
        animateThemeChange(newTheme);
    });
    
    // Function to animate theme change
    function animateThemeChange(theme) {
        const ripple = document.createElement('div');
        ripple.classList.add('theme-ripple');
        
        // Set position to cover the entire viewport
        ripple.style.position = 'fixed';
        ripple.style.top = '0';
        ripple.style.left = '0';
        ripple.style.width = '100vw';
        ripple.style.height = '100vh';
        ripple.style.zIndex = '-1';
        ripple.style.opacity = '0';
        ripple.style.transform = 'scale(0)';
        ripple.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
        ripple.style.backgroundColor = theme === 'dark' ? '#121212' : '#ffffff';
        
        document.body.appendChild(ripple);
        
        // Trigger animation
        setTimeout(() => {
            ripple.style.opacity = '0.3';
            ripple.style.transform = 'scale(3)';
            
            // Clean up after animation
            setTimeout(() => {
                ripple.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(ripple);
                }, 800);
            }, 400);
        }, 50);
    }
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only change if the user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
        }
    });
});
