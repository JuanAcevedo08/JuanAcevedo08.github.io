// ===== NEURAL NETWORK ANIMATION =====
class NeuralNetwork {
  constructor() {
    this.canvas = document.getElementById('neuralCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.connections = [];
    this.mousePos = { x: 0, y: 0 };
    this.animationFrame = null;
    
    this.init();
    this.setupEventListeners();
    this.animate();
  }
  
  init() {
    this.resize();
    this.createNodes();
    this.createConnections();
  }
  
  resize() {
  // Asegura que el canvas siempre ocupe toda la ventana y se mantenga fijo
  const dpr = window.devicePixelRatio || 1;
  this.canvas.width = window.innerWidth * dpr;
  this.canvas.height = window.innerHeight * dpr;
  this.ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
  this.ctx.scale(dpr, dpr);
  this.canvas.style.width = '100vw';
  this.canvas.style.height = '100vh';
  this.canvas.style.position = 'fixed';
  this.canvas.style.top = '0';
  this.canvas.style.left = '0';
  this.canvas.style.zIndex = '-11';
  this.canvas.style.pointerEvents = 'none';
  }
  
  createNodes() {
    this.nodes = [];
    const nodeCount = this.getNodeCount();
    
    for (let i = 0; i < nodeCount; i++) {
      this.nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        color: this.getRandomColor(),
        energy: Math.random() * 100
      });
    }
  }
  
  getNodeCount() {
    const width = window.innerWidth;
    if (width < 768) return 25; // Móviles
    if (width < 1024) return 40; // Tablets
    return 60; // Desktop
  }
  
  getRandomColor() {
    const colors = [
      { r: 0, g: 245, b: 255 },     // Cyan neón
      { r: 138, g: 43, b: 226 },    // Violeta
      { r: 0, g: 255, b: 136 },     // Verde neón
      { r: 255, g: 0, b: 128 }      // Rosa neón
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  createConnections() {
    this.connections = [];
    const maxDistance = window.innerWidth < 768 ? 150 : 200;
    
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[i].x - this.nodes[j].x;
        const dy = this.nodes[i].y - this.nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          this.connections.push({
            nodeA: i,
            nodeB: j,
            distance: distance,
            maxDistance: maxDistance,
            opacity: 0,
            pulsePhase: Math.random() * Math.PI * 2,
            active: false
          });
        }
      }
    }
  }
  
  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createNodes();
      this.createConnections();
    });
    
    document.addEventListener('mousemove', (e) => {
      this.mousePos.x = e.clientX;
      this.mousePos.y = e.clientY;
      this.activateNearbyNodes();
    });
    // Eliminado: no actualizar nodos con el scroll para que el fondo sea fijo
  }
  
  activateNearbyNodes() {
    const activationRadius = 150;
    
    this.nodes.forEach(node => {
      const dx = node.x - this.mousePos.x;
      const dy = node.y - this.mousePos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < activationRadius) {
        node.energy = Math.min(100, node.energy + 5);
        node.opacity = Math.min(1, node.opacity + 0.02);
        
        // Crear efecto de atracción sutil
        const force = (activationRadius - distance) / activationRadius * 0.02;
        node.vx += (this.mousePos.x - node.x) * force * 0.01;
        node.vy += (this.mousePos.y - node.y) * force * 0.01;
      }
    });
    
    // Activar conexiones cercanas al mouse
    this.connections.forEach(connection => {
      const nodeA = this.nodes[connection.nodeA];
      const nodeB = this.nodes[connection.nodeB];
      
      const midX = (nodeA.x + nodeB.x) / 2;
      const midY = (nodeA.y + nodeB.y) / 2;
      
      const dx = midX - this.mousePos.x;
      const dy = midY - this.mousePos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < activationRadius) {
        connection.active = true;
        connection.opacity = Math.min(0.8, connection.opacity + 0.05);
      }
    });
  }
  
  // updateNodesOnScroll eliminado para fondo fijo
  
  updateNodes() {
    this.nodes.forEach(node => {
      // Actualizar posición
      node.x += node.vx;
      node.y += node.vy;
      
      // Aplicar fricción
      node.vx *= 0.99;
      node.vy *= 0.99;
      
      // Mantener nodos dentro de los límites con rebote suave
      if (node.x < 0 || node.x > window.innerWidth) {
        node.vx *= -0.5;
        node.x = Math.max(0, Math.min(window.innerWidth, node.x));
      }
      if (node.y < 0 || node.y > window.innerHeight) {
        node.vy *= -0.5;
        node.y = Math.max(0, Math.min(window.innerHeight, node.y));
      }
      
      // Actualizar energía y efectos
      node.energy = Math.max(0, node.energy - 0.5);
      node.pulsePhase += 0.05;
      
      // Movimiento natural aleatorio
      node.vx += (Math.random() - 0.5) * 0.02;
      node.vy += (Math.random() - 0.5) * 0.02;
      
      // Limitar velocidad
      const maxSpeed = 1;
      const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
      if (speed > maxSpeed) {
        node.vx = (node.vx / speed) * maxSpeed;
        node.vy = (node.vy / speed) * maxSpeed;
      }
    });
  }
  
  updateConnections() {
    this.connections.forEach(connection => {
      const nodeA = this.nodes[connection.nodeA];
      const nodeB = this.nodes[connection.nodeB];
      
      const dx = nodeA.x - nodeB.x;
      const dy = nodeA.y - nodeB.y;
      connection.distance = Math.sqrt(dx * dx + dy * dy);
      
      // Calcular opacidad basada en distancia
      const distanceRatio = 1 - (connection.distance / connection.maxDistance);
      const baseOpacity = Math.max(0, distanceRatio * 0.3);
      
      if (connection.active) {
        connection.opacity = Math.max(baseOpacity, connection.opacity);
        connection.active = false;
      } else {
        connection.opacity = Math.max(baseOpacity, connection.opacity - 0.01);
      }
      
      connection.pulsePhase += 0.02;
    });
  }
  
  drawNodes() {
    this.nodes.forEach(node => {
      const pulseSize = Math.sin(node.pulsePhase) * 0.3 + 1;
      const energyMultiplier = 1 + (node.energy / 100) * 0.5;
      const finalRadius = node.radius * pulseSize * energyMultiplier;
      
      // Sombra/Glow exterior
      this.ctx.beginPath();
      const gradient = this.ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, finalRadius * 3
      );
      gradient.addColorStop(0, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${node.opacity * 0.6})`);
      gradient.addColorStop(1, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0)`);
      
      this.ctx.fillStyle = gradient;
      this.ctx.arc(node.x, node.y, finalRadius * 3, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Nodo principal
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${node.opacity})`;
      this.ctx.arc(node.x, node.y, finalRadius, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Core brillante
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgba(255, 255, 255, ${node.opacity * 0.8})`;
      this.ctx.arc(node.x, node.y, finalRadius * 0.3, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }
  
  drawConnections() {
    this.connections.forEach(connection => {
      if (connection.opacity < 0.01) return;
      
      const nodeA = this.nodes[connection.nodeA];
      const nodeB = this.nodes[connection.nodeB];
      
      // Efecto de pulso en la conexión
      const pulse = Math.sin(connection.pulsePhase) * 0.3 + 0.7;
      const finalOpacity = connection.opacity * pulse;
      
      // Gradiente para la línea
      const gradient = this.ctx.createLinearGradient(
        nodeA.x, nodeA.y, nodeB.x, nodeB.y
      );
      gradient.addColorStop(0, `rgba(${nodeA.color.r}, ${nodeA.color.g}, ${nodeA.color.b}, ${finalOpacity})`);
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${finalOpacity * 0.5})`);
      gradient.addColorStop(1, `rgba(${nodeB.color.r}, ${nodeB.color.g}, ${nodeB.color.b}, ${finalOpacity})`);
      
  this.ctx.beginPath();
  this.ctx.strokeStyle = gradient;
  this.ctx.lineWidth = 1.2; // Siempre delgada y uniforme
  this.ctx.moveTo(nodeA.x, nodeA.y);
  this.ctx.lineTo(nodeB.x, nodeB.y);
  this.ctx.stroke();
      
      // Partículas que viajan por la conexión
      if (connection.opacity > 0.5 && Math.random() < 0.02) {
        this.createTravelingParticle(nodeA, nodeB);
      }
    });
  }
  
  createTravelingParticle(nodeA, nodeB) {
    // Esta función podría expandirse para crear partículas que viajan
    const particle = {
      startX: nodeA.x,
      startY: nodeA.y,
      endX: nodeB.x,
      endY: nodeB.y,
      progress: 0,
      speed: 0.02,
      life: 1,
      color: nodeA.color
    };
    
    // Por simplicidad, no implementamos las partículas viajeras aquí
    // pero esta es la estructura para futuras expansiones
  }
  
  render() {
  // Limpiar canvas completamente para evitar acumulación de fondo oscuro
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.drawConnections();
    this.drawNodes();
  }
  
  animate() {
    this.updateNodes();
    this.updateConnections();
    this.render();
    
    this.animationFrame = requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    window.removeEventListener('resize', this.resize);
    document.removeEventListener('mousemove', this.activateNearbyNodes);
    document.removeEventListener('scroll', this.updateNodesOnScroll);
  }
}

// Inicializar la red neuronal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Verificar si el usuario prefiere movimiento reducido
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    const neuralNet = new NeuralNetwork();
    
    // Limpiar cuando la página se descarga
    window.addEventListener('beforeunload', () => {
      neuralNet.destroy();
    });
  }
});

// ===== EFECTOS ADICIONALES =====

// Partículas del mouse (opcional, para dispositivos de escritorio)
if (window.innerWidth > 768) {
  let mouseTrail = [];
  
  document.addEventListener('mousemove', (e) => {
    mouseTrail.push({
      x: e.clientX,
      y: e.clientY,
      time: Date.now()
    });
    
    // Mantener solo los últimos puntos
    mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 500);
    
    // Crear partícula ocasionalmente
    if (Math.random() < 0.1) {
      createMouseParticle(e.clientX, e.clientY);
    }
  });
  
  function createMouseParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'mouse-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.background = `rgba(0, 245, 255, 0.6)`;
    particle.style.boxShadow = '0 0 10px rgba(0, 245, 255, 0.8)';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      document.body.removeChild(particle);
    }, 1000);
  }
}