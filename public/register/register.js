document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Password Visibility Toggle
    const togglePassword = document.querySelector('.toggle-password');
    const passwordField = document.getElementById('password');
    
    togglePassword.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            passwordField.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });

    // Password Strength Indicator
    passwordField.addEventListener('input', function() {
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text');
        const password = this.value;
        let strength = 0;
        
        // Check password length
        if (password.length > 0) strength += 20;
        if (password.length >= 8) strength += 20;
        
        // Check for uppercase letters
        if (/[A-Z]/.test(password)) strength += 20;
        
        // Check for numbers
        if (/[0-9]/.test(password)) strength += 20;
        
        // Check for special characters
        if (/[^A-Za-z0-9]/.test(password)) strength += 20;
        
        // Update strength bar
        strengthBar.style.width = strength + '%';
        
        // Update color and text
        if (strength < 40) {
            strengthBar.style.backgroundColor = '#ff4d4d';
            strengthText.textContent = 'Weak';
        } else if (strength < 70) {
            strengthBar.style.backgroundColor = '#ffa500';
            strengthText.textContent = 'Moderate';
        } else {
            strengthBar.style.backgroundColor = '#4CAF50';
            strengthText.textContent = 'Strong';
        }
    });

    // Form Navigation
    const formSections = document.querySelectorAll('.form-section');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    let currentSection = 0;
    
    // Show first section
    showSection(currentSection);
    
    // Next button functionality
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Validate current section before proceeding
            const currentFormSection = formSections[currentSection];
            const inputs = currentFormSection.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value) {
                    input.style.borderColor = 'red';
                    isValid = false;
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                currentSection++;
                showSection(currentSection);
            }
        });
    });
    
    // Previous button functionality
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentSection--;
            showSection(currentSection);
        });
    });
    
    function showSection(index) {
        // Hide all sections
        formSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show current section
        formSections[index].classList.add('active');
        
        // Update button visibility
        if (index === 0) {
            document.querySelectorAll('.prev-btn').forEach(btn => {
                btn.style.visibility = 'hidden';
            });
        } else {
            document.querySelectorAll('.prev-btn').forEach(btn => {
                btn.style.visibility = 'visible';
            });
        }
        
        if (index === formSections.length - 1) {
            document.querySelectorAll('.next-btn').forEach(btn => {
                btn.style.display = 'none';
            });
            document.querySelectorAll('.submit-btn').forEach(btn => {
                btn.style.display = 'flex';
            });
        } else {
            document.querySelectorAll('.next-btn').forEach(btn => {
                btn.style.display = 'flex';
            });
            document.querySelectorAll('.submit-btn').forEach(btn => {
                btn.style.display = 'none';
            });
        }
    }

    // Animated Counter
    const counters = document.querySelectorAll('.count');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Start counters when form is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.register-container'));

    // Form Submission
    const registrationForm = document.getElementById('registrationForm');
    
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        alert('Registration successful! Thank you for joining our life-saving community.');
        
        // Reset form
        this.reset();
        currentSection = 0;
        showSection(currentSection);
        
        // Reset password strength
        document.querySelector('.strength-bar').style.width = '0';
        document.querySelector('.strength-text').textContent = 'Password Strength';
    });

    // Input validation
    const requiredInputs = document.querySelectorAll('input[required], select[required]');
    
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.style.borderColor = 'red';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
    });
});