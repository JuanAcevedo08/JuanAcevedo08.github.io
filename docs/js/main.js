// ===== MAIN APPLICATION =====
class PortfolioApp {
  constructor() {
    this.isLoading = true;
    this.isMobile = window.innerWidth <= 768;
    this.currentSection = 'home';
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.setupMobileNavigation();
    this.setupThemeToggle();
    this.setupFormValidation();
    this.loadContent();
    this.setupIntersectionObserver();
    
    // Finalizar carga
    setTimeout(() => {
      this.finishLoading();
    }, 1000);
  }
  
  setupEventListeners() {
    // Resize handler
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));
    
    // Scroll handler
    window.addEventListener('scroll', this.throttle(() => {
      this.handleScroll();
    }, 16));
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      this.handleKeyNavigation(e);
    });
    
    // Click handlers for interactive elements
    this.setupClickHandlers();
  }
  
  setupClickHandlers() {
    // Skill items hover effect
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        this.highlightSkill(item);
      });
      
      item.addEventListener('mouseleave', () => {
        this.unhighlightSkill(item);
      });
    });
    
    // Project cards interaction
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      const content = card.querySelector('.project-content');
      if (content) {
        content.addEventListener('click', (event) => {
          // Si el click proviene de .project-links o sus hijos, no abrir el modal
          if (event.target.closest('.project-links')) {
            return;
          }
          this.handleProjectClick(card);
        });
      }
      // Evitar que los enlaces dentro de project-links abran el modal
      const links = card.querySelectorAll('.project-links a');
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.stopPropagation();
          // Evitar que el modal se abra y solo abrir el enlace
          e.preventDefault();
          window.open(link.href, '_blank');
        });
      });
    });
    
    // Timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      item.addEventListener('click', () => {
        this.handleTimelineClick(item);
      });
    });
  }
  
  highlightSkill(skillItem) {
    const skillName = skillItem.querySelector('h4').textContent;
    this.showSkillTooltip(skillItem, skillName);
    
    // Efecto visual mejorado
    skillItem.style.transform = 'translateY(-3px) scale(1.02)';
    skillItem.style.filter = 'brightness(1.2)';
  }
  
  unhighlightSkill(skillItem) {
    this.hideSkillTooltip();
    skillItem.style.transform = '';
    skillItem.style.filter = '';
  }
  
  showSkillTooltip(element, skillName) {
    // Remover tooltip existente
    this.hideSkillTooltip();
    
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.innerHTML = `
      <div class="tooltip-content">
        <strong>${skillName}</strong>
        <p>Click para ver proyectos relacionados</p>
      </div>
    `;
    
    tooltip.style.cssText = `
      position: absolute;
      background: rgba(0, 0, 0, 0.9);
      color: #00f5ff;
      padding: 10px 15px;
      border-radius: 8px;
      font-size: 0.9rem;
      z-index: 1000;
      border: 1px solid #00f5ff;
      box-shadow: 0 0 20px rgba(0, 245, 255, 0.3);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    // Posicionar tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    
    // Mostrar con animación
    requestAnimationFrame(() => {
      tooltip.style.opacity = '1';
    });
  }
  
  hideSkillTooltip() {
    const existingTooltip = document.querySelector('.skill-tooltip');
    if (existingTooltip) {
      existingTooltip.remove();
    }
  }
  
  handleProjectClick(card) {
    const projectId = card.dataset.project;
    const projectTitle = card.querySelector('h3').textContent;
    
    // Efecto visual de click
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
      card.style.transform = '';
    }, 150);
    
    // Mostrar modal de proyecto (opcional)
    this.showProjectModal(projectId, projectTitle);
  }
  
  showProjectModal(projectId, title) {
    // Encuentra el card del proyecto seleccionado
    const card = document.querySelector(`.project-card[data-project="${projectId}"]`);
    // Lee los enlaces y la descripción desde los atributos data-
    const githubLink = card ? card.getAttribute('data-github') : '#';
    const demoLink = card ? card.getAttribute('data-demo') : '#';
    const description = card ? card.getAttribute('data-description') || 'Detalles del proyecto aparecerían aquí...' : 'Detalles del proyecto aparecerían aquí...';

    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h2>${title}</h2>
          <button class="modal-close">
            <i class="fas fa-times"></i> Cerrar
          </button>
        </div>
        <div class="modal-body">
          <p>${description}</p>
          <div class="modal-actions">
            <a href="${githubLink}" class="btn btn-primary" target="_blank">
              <i class="fab fa-github"></i>
              Ver en GitHub
            </a>
            <a href="${demoLink}" class="btn btn-secondary" target="_blank">
              <i class="fas fa-external-link-alt"></i>
              Demo en Vivo
            </a>
          </div>
        </div>
      </div>
    `;
    
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: auto;
    `;
    document.body.appendChild(modal);
    // Overlay click para cerrar
    modal.querySelector('.modal-overlay').style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.8);
      z-index: 10001;
      transition: all 0.3s ease;
      pointer-events: auto;
    `;
    modal.querySelector('.modal-overlay').onclick = () => modal.remove();
    // Modal content
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
      position: relative;
      z-index: 10002;
      background: #1a1a1a;
      border-radius: 15px;
      padding: 30px;
      max-width: 600px;
      margin: 20px;
      border: 1px solid #00f5ff;
      box-shadow: 0 0 30px rgba(0, 245, 255, 0.3);
      transform: scale(1);
      transition: all 0.3s ease;
    `;
    // Botón cerrar
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    // Evitar cierre al hacer click dentro del modal
    modalContent.onclick = (e) => e.stopPropagation();
  }
  
  handleTimelineClick(item) {
    const isExpanded = item.classList.contains('expanded');
    
    // Cerrar otros items expandidos
    document.querySelectorAll('.timeline-item.expanded').forEach(expandedItem => {
      if (expandedItem !== item) {
        expandedItem.classList.remove('expanded');
      }
    });
    
    // Toggle current item
    item.classList.toggle('expanded', !isExpanded);
    
    // Efecto visual
    if (!isExpanded) {
      item.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }
  
  setupMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Prevenir scroll del body cuando el menú está abierto
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
      });
      
      // Cerrar menú al hacer click fuera
      document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
          navMenu.classList.remove('active');
          hamburger.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  }
  
  setupThemeToggle() {
    // Crear botón de toggle de tema (opcional)
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Cambiar tema';
    
    themeToggle.style.cssText = `
      position: fixed;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(0, 245, 255, 0.1);
      border: 2px solid #00f5ff;
      color: #00f5ff;
      cursor: pointer;
      z-index: 1000;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    `;
    
    themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });
    
    // Solo mostrar en desktop
    if (!this.isMobile) {
      document.body.appendChild(themeToggle);
    }
  }
  
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Actualizar icono
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
      themeToggle.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
  }
  
  setupFormValidation() {
    // Si hay formularios en el futuro, validarlos aquí
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });
    });
  }
  
  validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        this.showFieldError(field, 'Este campo es requerido');
        isValid = false;
      } else {
        this.clearFieldError(field);
      }
    });
    
    return isValid;
  }
  
  showFieldError(field, message) {
    this.clearFieldError(field);
    
    const error = document.createElement('div');
    error.className = 'field-error';
    error.textContent = message;
    error.style.cssText = `
      color: #ff4444;
      font-size: 0.8rem;
      margin-top: 5px;
      animation: fadeIn 0.3s ease;
    `;
    
    field.parentNode.appendChild(error);
    field.style.borderColor = '#ff4444';
  }
  
  clearFieldError(field) {
    const error = field.parentNode.querySelector('.field-error');
    if (error) {
      error.remove();
    }
    field.style.borderColor = '';
  }
  
  loadContent() {
    // Simular carga de contenido dinámico
    this.loadProjects();
    this.loadSkills();
  }
  
  loadProjects() {
    // En una aplicación real, esto cargaría datos desde una API
    const projects = [
      {
        id: 1,
        title: 'Análisis Exploratorio de Datos',
        description: 'Análisis completo usando Pandas y visualizaciones',
        tech: ['Python', 'Pandas', 'Matplotlib'],
        github: '#'
      },
      // Más proyectos...
    ];
    
    console.log('✅ Proyectos cargados:', projects.length);
  }
  
  loadSkills() {
    // Cargar y actualizar barras de progreso
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
      // Las animaciones se manejan en animations.js
    });
    
    console.log('✅ Skills cargadas');
  }
  
  setupIntersectionObserver() {
    // Observer para actualizar navegación activa
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          this.updateActiveNavigation(entry.target.id);
          this.currentSection = entry.target.id;
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-50px 0px -50px 0px'
    });
    
    sections.forEach(section => observer.observe(section));
  }
  
  updateActiveNavigation(activeSection) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href').substring(1);
      link.classList.toggle('active', href === activeSection);
    });
  }
  
  handleResize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    
    // Si cambió de móvil a desktop o viceversa
    if (wasMobile !== this.isMobile) {
      this.reinitializeComponents();
    }
  }
  
  reinitializeComponents() {
    // Reinicializar componentes dependientes del tamaño de pantalla
    console.log('🔄 Reinicializando componentes para', this.isMobile ? 'móvil' : 'desktop');
  }
  
  handleScroll() {
    const scrollY = window.scrollY;
    
    // Mostrar/ocultar botón "volver arriba"
    this.toggleBackToTop(scrollY);
  }
  
  toggleBackToTop(scrollY) {
    let backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) {
      backToTop = document.createElement('button');
      backToTop.className = 'back-to-top';
      backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
      backToTop.title = 'Volver arriba';
      
      backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #00f5ff, #8a2be2);
        border: none;
        color: white;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        box-shadow: 0 0 20px rgba(0, 245, 255, 0.3);
      `;
      
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      
      document.body.appendChild(backToTop);
    }
    
    if (scrollY > 300) {
      backToTop.style.opacity = '1';
      backToTop.style.transform = 'translateY(0)';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.transform = 'translateY(20px)';
    }
  }
  
  handleKeyNavigation(e) {
    // Navegación con teclado
    if (e.key === 'Escape') {
      // Cerrar modales abiertos
      const modals = document.querySelectorAll('.project-modal');
      modals.forEach(modal => modal.remove());
      
      // Cerrar menú móvil
      const navMenu = document.getElementById('navMenu');
      const hamburger = document.getElementById('hamburger');
      if (navMenu && hamburger) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  }
  
  finishLoading() {
    this.isLoading = false;
    document.body.classList.add('loaded');
    
    // Trigger entrance animations
    const hero = document.querySelector('.hero-content');
    if (hero) {
      hero.style.opacity = '1';
      hero.style.transform = 'translateY(0)';
    }
    
    console.log('🎉 Portfolio cargado completamente');
  }
  
  // Utility functions
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar aplicación principal
  const app = new PortfolioApp();
  
  // Hacer accesible globalmente para debugging
  window.portfolioApp = app;
  
  // Easter egg
  console.log(`
    🚀 Portfolio ML Engineer v1.0
    ━━━━━━━━━━━━━━━━━━━━━━━━━━
    ✨ Construido con HTML5, CSS3 y JavaScript
    🎨 Diseño: Minimalista con efectos neón
    ⚡ Optimizado para todas las pantallas
    🧠 Animación de red neuronal activa
    ━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    ¿Interesado en el código? ¡Contáctame! 📧
  `);
});

// Manejar errores globales
window.addEventListener('error', (e) => {
  console.error('❌ Error en la aplicación:', e.error);
});

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Tiempo de carga: ${loadTime.toFixed(2)}ms`);
  });
}