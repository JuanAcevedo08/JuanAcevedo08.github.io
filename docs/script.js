// ===== Scroll suave en navegación =====
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Animaciones al hacer scroll =====
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('section, .project-card, .blog-card').forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
});

// ===== Modal para proyectos =====
const modal = document.createElement('div');
modal.classList.add('modal');
modal.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <img src="" alt="Proyecto">
        <p></p>
    </div>
`;
document.body.appendChild(modal);

const modalImg = modal.querySelector('img');
const modalText = modal.querySelector('p');
const modalClose = modal.querySelector('.close');

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const imgSrc = card.querySelector('img').src;
        const desc = card.querySelector('p').textContent;
        modalImg.src = imgSrc;
        modalText.textContent = desc;
        modal.classList.add('active');
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', e => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// ===== Estilos para animaciones =====
const style = document.createElement('style');
style.textContent = `
.hidden {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
}
.show {
    opacity: 1;
    transform: translateY(0);
}
.modal {
    display: none;
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.8);
    justify-content: center;
    align-items: center;
    z-index: 2000;
}
.modal.active {
    display: flex;
}
.modal-content {
    background: #fff;
    padding: 1rem;
    border-radius: 10px;
    max-width: 500px;
    width: 90%;
    text-align: center;
}
.modal-content img {
    width: 100%;
    border-radius: 10px;
}
.close {
    position: absolute;
    top: 10px; right: 20px;
    font-size: 2rem;
    color: #fff;
    cursor: pointer;
}
`;
document.head.appendChild(style);
