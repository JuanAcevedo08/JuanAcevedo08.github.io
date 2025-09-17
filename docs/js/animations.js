// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }
  
  init() {
    this.setupIntersectionObserver();
    this.setupScrollEffects();
    this.setupParallax();
  }
  
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.triggerElementAnimation(entry.target);
        }
      });
    }, this.observerOptions);
    
    // Observar elementos con animaciones
    const animatedElements = document.querySelectorAll(`
      .hero-content,
      .about-content,
      .skill-category,
      .project-card,
      .timeline-item,
      .section-header
    `);
    
    animatedElements.forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }
  
  triggerElementAnimation(element) {
    // Animaciones específicas por tipo de elemento
    if (element.classList.contains('skill-category')) {
      this.animateSkills(element);
    }
    
    if (element.classList.contains('project-card')) {
      this.animateProjectCard(element);
    }
    
    if (element.classList.contains('timeline-item')) {
      this.animateTimelineItem(element);
    }
  }
  
  animateSkills(skillCategory) {
    const skillBars = skillCategory.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
      setTimeout(() => {
        const progress = bar.dataset.progress || 0;
        bar.style.width = progress + '%';
      }, index * 200);
    });
  }
  
  animateProjectCard(card) {
    const cardNumber = card.dataset.project;
    card.style.animationDelay = `${cardNumber * 0.2}s`;
    
    // Efecto de hover mejorado
    card.addEventListener('mousemove', (e) => {
      this.updateProjectCardHover(card, e);
    });
  }
  
  updateProjectCardHover(card, e) {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const glow = card.querySelector('.project-glow');
    if (glow) {
      glow.style.setProperty('--x', x + '%');
      glow.style.setProperty('--y', y + '%');
    }
  }
  
  animateTimelineItem(item) {
    const progressBar = item.querySelector('.progress-fill');
    if (progressBar) {
      setTimeout(() => {
        const progress = progressBar.dataset.progress || 0;
        progressBar.style.width = progress + '%';
      }, 500);
    }
  }
  
  setupScrollEffects() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }
  
  handleScroll() {
    const scrollY = window.scrollY;
    
    // Parallax para elementos específicos
    this.updateParallaxElements(scrollY);
    
    // Navbar scroll effect
    this.updateNavbar(scrollY);
    
    // Scroll progress indicator (opcional)
    this.updateScrollProgress();
  }
  
  updateParallaxElements(scrollY) {
    // Solo aplicar parallax a .hero-content, no a .about-highlights
    const parallaxElements = document.querySelectorAll('.hero-content');
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      const yPos = -(scrollY * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }
  
  updateNavbar(scrollY) {
    const navbar = document.getElementById('navbar');
    
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Crear barra de progreso si no existe
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress';
      progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(45deg, #00f5ff, #8a2be2);
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
      `;
      document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrolled + '%';
  }
  
  setupParallax() {
    // Parallax suave solo para .hero-content
    const parallaxElements = document.querySelectorAll('.hero-content');
    parallaxElements.forEach(el => {
      el.dataset.parallax = '0.3';
    });
    
    const aboutElements = document.querySelectorAll('.about-highlights');
    aboutElements.forEach(el => {
      el.dataset.parallax = '0.2';
    });
  }
}

// ===== PARTICLE EFFECTS =====
class ParticleEffects {
  constructor() {
    this.particles = [];
    this.init();
  }
  
  init() {
    this.setupClickEffects();
    this.setupHoverEffects();
  }
  
  setupClickEffects() {
    // Efecto de partículas al hacer click en botones
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.createClickParticles(e);
      });
    });
  }
  
  createClickParticles(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      particle.className = 'click-particle';
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #00f5ff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 10px #00f5ff;
      `;
      
      const angle = (i / 6) * Math.PI * 2;
      const velocity = 100;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      particle.style.left = centerX + 'px';
      particle.style.top = centerY + 'px';
      
      document.body.appendChild(particle);
      
      this.animateParticle(particle, vx, vy);
    }
  }
  
  animateParticle(particle, vx, vy) {
    let x = parseInt(particle.style.left);
    let y = parseInt(particle.style.top);
    let opacity = 1;
    let gravity = 2;
    
    const animate = () => {
      x += vx * 0.02;
      y += vy * 0.02 + gravity;
      opacity -= 0.02;
      gravity += 0.1;
      
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.opacity = opacity;
      
      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        document.body.removeChild(particle);
      }
    };
    
    animate();
  }
  
  setupHoverEffects() {
    // Efecto de glow en cards al hover
    const cards = document.querySelectorAll('.project-card, .skill-category, .highlight-item');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.addGlowEffect(card);
      });
      
      card.addEventListener('mouseleave', () => {
        this.removeGlowEffect(card);
      });
    });
  }
  
  addGlowEffect(element) {
    element.style.transition = 'all 0.3s ease';
    element.style.filter = 'brightness(1.1) saturate(1.2)';
    element.style.transform = 'translateY(-5px) scale(1.02)';
  }
  
  removeGlowEffect(element) {
    element.style.filter = '';
    element.style.transform = '';
  }
}

// ===== TYPING ANIMATION =====
class TypingAnimation {
  constructor(element, texts, speed = 100) {
    this.element = element;
    this.texts = texts;
    this.speed = speed;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    
    this.init();
  }
  
  init() {
    this.type();
  }
  
  type() {
    const currentText = this.texts[this.textIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }
    
    let typeSpeed = this.speed;
    
    if (this.isDeleting) {
      typeSpeed /= 2;
    }
    
    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = 2000; // Pausa al final
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      typeSpeed = 500; // Pausa antes del siguiente texto
    }
    
    setTimeout(() => this.type(), typeSpeed);
  }
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Ajuste para navbar fijo
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Actualizar link activo
        updateActiveNavLink(link);
        
        // Cerrar menú móvil si está abierto
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburger');
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  });
}

function updateActiveNavLink(activeLink) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => link.classList.remove('active'));
  activeLink.classList.add('active');
}

// ===== TEXT GLOW EFFECT =====
function addTextGlowEffect() {
  const glowElements = document.querySelectorAll('.hero-name, .section-title');
  
  glowElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.textShadow = '0 0 20px rgba(0, 245, 255, 0.8), 0 0 40px rgba(0, 245, 255, 0.6)';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.textShadow = '';
    });
  });
}

// ===== COUNTER ANIMATIONS =====
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      counter.textContent = Math.floor(current);
      
      if (current < target) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    // Iniciar animación cuando el elemento sea visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(counter);
  });
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar todas las animaciones
  new ScrollAnimations();
  new ParticleEffects();
  
  // Configurar navegación suave
  setupSmoothScrolling();
  
  // Efectos de texto
  addTextGlowEffect();
  
  // Animaciones de contador (si se añaden elementos con data-count)
  animateCounters();
  
  // Typing animation en el hero title (opcional)
  const heroTitleSpan = document.querySelector('.hero-title .typing-text');
  if (heroTitleSpan) {
    new TypingAnimation(heroTitleSpan, [
      'Machine Learning Engineer',
      'Data Science Enthusiast',
      'AI Developer',
      'Backend Developer'
    ]);
  }
  
  console.log('✨ Animaciones inicializadas correctamente');
});