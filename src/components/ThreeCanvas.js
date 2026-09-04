/**
 * S//SECURITY OS — Advanced 3D WebGL Spatial Universe
 * High-performance Three.js 3D background featuring:
 * - Dynamic scroll-reactive 3D camera flight through cyber nodes & polyhedra
 * - Volumetric starfield & data particle stream in cyan & electric blue
 * - Orbiting cryptographic technical geometries & defensive cyber shields
 * - Interactive mouse parallax with smooth damping
 * - DPR clamping, tab visibility pause, and prefers-reduced-motion compliance
 */
import * as THREE from 'three';

export class ThreeCanvas {
  constructor(containerId = 'bg-canvas') {
    let targetEl = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!targetEl) {
      targetEl = document.createElement('canvas');
      targetEl.id = typeof containerId === 'string' ? containerId : 'bg-canvas';
      targetEl.style.cssText = 'position: fixed; inset: 0; pointer-events: none; z-index: 0; width: 100vw; height: 100vh;';
      document.body.prepend(targetEl);
    }
    this.canvas = targetEl;

    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.animationFrameId = null;
    this.isTabVisible = true;

    // Camera trajectory state
    this.scrollProgress = 0;
    this.targetScrollProgress = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;

    this.init();
  }

  init() {
    try {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // 1. Scene & Depth Fog
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x070b14, 0.0015);

      // 2. Camera setup for 3D flight
      this.camera = new THREE.PerspectiveCamera(58, width / height, 0.1, 2000);
      this.camera.position.set(0, 0, 160);

      // 3. WebGL Renderer
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: window.devicePixelRatio < 2,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor(0x070b14, 0);

      // 4. Build 3D Objects & Constellations
      this.createParticleField();
      this.createFloatingPolyhedra();
      this.createPerspectiveGrid();

      // 5. Event Listeners
      this.bindEvents();

      // 6. Animation Loop
      if (this.isReducedMotion) {
        this.renderer.render(this.scene, this.camera);
      } else {
        this.animate();
      }
    } catch (err) {
      console.warn('Three.js initialization notice:', err);
    }
  }

  /**
   * 1,600 Volumetric Stars and Data Nodes
   */
  createParticleField() {
    const particleCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x22d3ee);
    const blueColor = new THREE.Color(0x3b82f6);
    const whiteColor = new THREE.Color(0xf8fafc);
    const purpleColor = new THREE.Color(0x818cf8);

    for (let i = 0; i < particleCount; i++) {
      // Spread across a deep vertical & horizontal corridor
      positions[i * 3] = (Math.random() - 0.5) * 700;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 600;

      // Color distribution
      const rand = Math.random();
      let c = cyanColor;
      if (rand < 0.45) c = blueColor;
      else if (rand < 0.75) c = cyanColor;
      else if (rand < 0.9) c = purpleColor;
      else c = whiteColor;

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom circle texture for soft round particles
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(34,211,238,0.8)');
    grad.addColorStop(0.8, 'rgba(37,99,235,0.2)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 3.2,
      vertexColors: true,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  /**
   * Floating 3D Cryptographic Geometries positioned along scroll depth
   */
  createFloatingPolyhedra() {
    this.polyGroup = new THREE.Group();

    // 1. Primary Cryptographic Icosahedron (Hero level)
    const icoGeo = new THREE.IcosahedronGeometry(24, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    this.icoMesh = new THREE.Mesh(icoGeo, icoMat);
    this.icoMesh.position.set(55, 10, -20);
    this.polyGroup.add(this.icoMesh);

    // Inner glowing core for icosahedron
    const innerIcoGeo = new THREE.IcosahedronGeometry(12, 0);
    const innerIcoMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    this.innerIcoMesh = new THREE.Mesh(innerIcoGeo, innerIcoMat);
    this.icoMesh.add(this.innerIcoMesh);

    // Rotating Technical Ring around Primary
    const ringGeo = new THREE.TorusGeometry(34, 0.4, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.4
    });
    this.ringMesh = new THREE.Mesh(ringGeo, ringMat);
    this.ringMesh.rotation.x = Math.PI / 3;
    this.icoMesh.add(this.ringMesh);

    // 2. Secondary Dodecahedron (Mid-page / Developer & Cybersecurity level)
    const dodecaGeo = new THREE.DodecahedronGeometry(20, 1);
    const dodecaMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    this.dodecaMesh = new THREE.Mesh(dodecaGeo, dodecaMat);
    this.dodecaMesh.position.set(-65, -160, -30);
    this.polyGroup.add(this.dodecaMesh);

    // 3. Torus Knot (Projects & Lab level)
    const knotGeo = new THREE.TorusKnotGeometry(16, 3.5, 90, 16);
    const knotMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    this.knotMesh = new THREE.Mesh(knotGeo, knotMat);
    this.knotMesh.position.set(60, -340, -40);
    this.polyGroup.add(this.knotMesh);

    // 4. Octahedron (Certifications & Contact level)
    const octaGeo = new THREE.OctahedronGeometry(22, 1);
    const octaMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.32
    });
    this.octaMesh = new THREE.Mesh(octaGeo, octaMat);
    this.octaMesh.position.set(-50, -520, -25);
    this.polyGroup.add(this.octaMesh);

    this.scene.add(this.polyGroup);
  }

  /**
   * Deep Perspective Horizon Cyber Grid
   */
  createPerspectiveGrid() {
    this.gridGroup = new THREE.Group();

    // Large wireframe ground grid
    const gridHelper = new THREE.GridHelper(800, 40, 0x1e3a8a, 0x0e1b38);
    gridHelper.position.y = -80;
    this.gridGroup.add(gridHelper);

    this.scene.add(this.gridGroup);
  }

  bindEvents() {
    window.addEventListener('resize', this.onResize.bind(this), { passive: true });
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
    window.addEventListener('mousemove', this.onMouseMove.bind(this), { passive: true });
    document.addEventListener('visibilitychange', this.onVisibilityChange.bind(this));

    // Initial scroll calculation
    this.onScroll();
  }

  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (this.camera && this.renderer) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  }

  onScroll() {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    this.targetScrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
  }

  onMouseMove(e) {
    this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  onVisibilityChange() {
    this.isTabVisible = !document.hidden;
    if (this.isTabVisible && !this.isReducedMotion && !this.animationFrameId) {
      this.animate();
    }
  }

  animate() {
    if (!this.isTabVisible) {
      this.animationFrameId = null;
      return;
    }

    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

    // Smooth scroll interpolation
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.06;

    // Smooth mouse interpolation
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    // 1. Dynamic Camera Flight through 3D space based on scroll
    // Moves vertically along the journey while swaying horizontally
    const targetCamY = -this.scrollProgress * 550;
    const targetCamZ = 160 - Math.sin(this.scrollProgress * Math.PI) * 40;
    const targetCamX = Math.sin(this.scrollProgress * Math.PI * 2.5) * 35 + this.mouseX * 12;

    this.camera.position.y += (targetCamY - this.camera.position.y) * 0.06;
    this.camera.position.z += (targetCamZ - this.camera.position.z) * 0.06;
    this.camera.position.x += (targetCamX - this.camera.position.x) * 0.06;

    // Subtle pitch/yaw tilt
    this.camera.rotation.y = -this.mouseX * 0.05 + Math.sin(this.scrollProgress * Math.PI * 2) * 0.06;
    this.camera.rotation.x = this.mouseY * 0.04 - 0.02;

    // 2. Rotate floating 3D objects with diverse speeds
    if (this.icoMesh) {
      this.icoMesh.rotation.x += 0.005;
      this.icoMesh.rotation.y += 0.007;
      if (this.innerIcoMesh) {
        this.innerIcoMesh.rotation.x -= 0.009;
        this.innerIcoMesh.rotation.y += 0.012;
      }
      if (this.ringMesh) {
        this.ringMesh.rotation.z += 0.004;
      }
    }

    if (this.dodecaMesh) {
      this.dodecaMesh.rotation.y += 0.006;
      this.dodecaMesh.rotation.z += 0.004;
    }

    if (this.knotMesh) {
      this.knotMesh.rotation.x += 0.008;
      this.knotMesh.rotation.y += 0.006;
    }

    if (this.octaMesh) {
      this.octaMesh.rotation.x += 0.007;
      this.octaMesh.rotation.z += 0.009;
    }

    // 3. Subtle drift of the particle field
    if (this.particles) {
      this.particles.rotation.y += 0.0004;
    }

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  }
}

export function initThreeCanvas(containerId = 'bg-canvas') {
  return new ThreeCanvas(containerId);
}
