// filepath: /professional-portfolio/professional-portfolio/assets/js/script.js

document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Scroll animations for elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Hover effects for buttons and cards
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('hover');
        });
        button.addEventListener('mouseleave', () => {
            button.classList.remove('hover');
        });
    });

    // Modal for project details
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.getElementById('close-modal');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectDetails = card.dataset.details;
            modalContent.innerHTML = projectDetails;
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});