// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for fixed navbar
            behavior: 'smooth'
        });
    });
});

// Contact Form Validation
document.getElementById('contact-form')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission for validation

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    let valid = true;

    // Validate Name
    if (name.trim() === '') {
        alert('Please enter your name');
        valid = false;
    }

    // Validate Email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        valid = false;
    }

    // Validate Message
    if (message.trim() === '') {
        alert('Please enter a message');
        valid = false;
    }

    // If valid, proceed with form submission
    if (valid) {
        alert('Your message has been sent!');
        this.submit(); // Actually submit the form
    }
});

// Project Modal (for Project Details) - Optional, if you plan to show project details in a modal
const projectLinks = document.querySelectorAll('.project-card a');

projectLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const projectId = this.getAttribute('href').substring(1);
        const modal = document.getElementById(`project-modal-${projectId}`);

        if (modal) {
            modal.style.display = 'block';
        }
    });
});

// Close Modal
const closeButtons = document.querySelectorAll('.close-modal');

closeButtons.forEach(button => {
    button.addEventListener('click', function () {
        this.closest('.modal').style.display = 'none';
    });
});

// Scroll to Top Button
const scrollToTopButton = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Toggle Dark Mode (Optional feature for a dark theme)
const darkModeToggle = document.getElementById('dark-mode-toggle');

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
}
