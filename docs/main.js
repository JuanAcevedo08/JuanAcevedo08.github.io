import * as THREE from 'three';
import { gsap } from 'gsap';

// Configuración básica de Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear una esfera simulando una galaxia
const geometry = new THREE.SphereGeometry(5, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: '#2d2d72' });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 10;

// Animación con GSAP
gsap.to(sphere.rotation, { x: Math.PI * 2, duration: 10, repeat: -1 });

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();