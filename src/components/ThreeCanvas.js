/**
 * S//SECURITY OS — Three.js 3D Background Experience
 * Abstract cryptographic node topology with subtle orbit mechanics,
 * strict performance controls, DPR clamping, tab-visibility pausing,
 * and graceful reduced-motion fallbacks.
 */
import * as THREE from 'three';

export class ThreeCanvas {
  constructor(containerId = 'bg-canvas') {
    let targetEl = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!targetEl) {
      targetEl = document.createElement('div');
      targetEl.id = typeof containerId === 'string' ? containerId : 'three-canvas-container';
      targetEl.style.cssText = 'position: fixed; inset: 0; pointer-events: none; z-index: 0;';
      document.body.prepend(targetEl);
    }
    this.container = targetEl;

    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.animationFrameId = null;
    this.isTabVisible = true;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;

    this.init();
  }

  init() {
    try {
      // Scene
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x070b14, 0.0018);

      // Camera
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
      this.camera.position.z = 180;

      // Renderer
      const isCanvasEl = this.container instanceof HTMLCanvasElement;
      const rendererOptions = {
        alpha: true,
        antialias: window.devicePixelRatio < 2,
        powerPreference: 'high-performance'
      };
      if (isCanvasEl) {
        rendererOptions.canvas = this.container;
      }

      this.renderer = new THREE.WebGLRenderer(rendererOptions);
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor(0x070b14, 0);

      this.canvas = this.renderer.domElement;
      this.canvas.setAttribute('aria-hidden', 'true');
      if (!isCanvasEl) {
        this.canvas.style.cssText = 'position: fixed; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: var(--z-canvas, 0); opacity: 0.75; transition: opacity 0.5s ease;';
        this.container.appendChild(this.canvas);
      }

      // Build 3D Cryptographic Architecture Objects
      this.createNodeConstellation();
      this.createCentralCore();
      this.createDefenseGrid();

      // Listeners
      this.bindEvents();

      // Start loop
      if (this.isReducedMotion) {
        this.renderer.render(this.scene, this.camera);
      } else {
        this.animate();
      }
    } catch (e) {
      console.warn('WebGL initialization skipped or failed:', e);
    }
  }

  createCentralCore() {
    // Elegant geometric cryptographic polyhedra (Icosahedron wireframe)
    this.coreGroup = new THREE.Group();

    // Outer wireframe cage
    const outerGeo = new THREE.IcosahedronGeometry(28, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x1d4ed8,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    this.outerMesh = new THREE.Mesh(outerGeo, outerMat);
    this.coreGroup.add(this.outerMesh);

    // Inner glowing technical shield ring
    const ringGeo = new THREE.TorusGeometry(38, 0.4, 8, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.35
    });
    this.ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    this.ringMesh1.rotation.x = Math.PI / 3;
    this.coreGroup.add(this.ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat.clone());
    ringMesh2.rotation.y = Math.PI / 4;
    ringMesh2.material.opacity = 0.22;
    this.ringMesh2 = ringMesh2;
    this.coreGroup.add(this.ringMesh2);

    // Position subtly to the right side of the screen
    this.coreGroup.position.set(window.innerWidth > 900 ? 55 : 0, 10, -20);
    this.scene.add(this.coreGroup);
  }

  createNodeConstellation() {
    // 3D Distributed Node Network
    const particleCount = window.innerWidth < 768 ? 45 : 90;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorBlue = new THREE.Color(0x3b82f6);
    const colorCyan = new THREE.Color(0x06b6d4);
    const colorWhite = new THREE.Color(0x94a3b8);

    this.nodesData = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 350;
      const y = (Math.random() - 0.5) * 260;
      const z = (Math.random() - 0.5) * 160 - 30;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const chosenColor = i % 3 === 0 ? colorCyan : (i % 3 === 1 ? colorBlue : colorWhite);
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;

      this.nodesData.push({
        origX: x,
        origY: y,
        origZ: z,
        speedX: (Math.random() - 0.5) * 0.04,
        speedY: (Math.random() - 0.5) * 0.04
      });
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: window.innerWidth < 768 ? 2.5 : 3.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    this.pointCloud = new THREE.Points(geometry, material);
    this.scene.add(this.pointCloud);
  }

  createDefenseGrid() {
    // Subtle distant technical grid layer
    const gridHelper = new THREE.GridHelper(500, 30, 0x1e293b, 0x0b1329);
    gridHelper.position.y = -90;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.45;
    this.scene.add(gridHelper);
  }

  bindEvents() {
    // Resize handler
    this.handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (this.coreGroup) {
        this.coreGroup.position.x = w > 900 ? 55 : 0;
      }
    };
    window.addEventListener('resize', this.handleResize, { passive: true });

    // Subtle parallax mouse tracking
    this.handleMouseMove = (e) => {
      this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 14;
      this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 14;
    };
    window.addEventListener('mousemove', this.handleMouseMove, { passive: true });

    // Tab visibility toggle (freeze loop when hidden)
    document.addEventListener('visibilitychange', () => {
      this.isTabVisible = !document.hidden;
      if (this.isTabVisible && !this.animationFrameId && !this.isReducedMotion) {
        this.animate();
      }
    });

    // Reduced motion listener
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', (e) => {
      this.isReducedMotion = e.matches;
      if (this.isReducedMotion) {
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
        }
        this.renderer.render(this.scene, this.camera);
      } else {
        this.animate();
      }
    });
  }

  animate() {
    if (!this.isTabVisible || this.isReducedMotion) return;

    this.animationFrameId = requestAnimationFrame(() => this.animate());

    // Smooth subtle camera drift
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;
    this.camera.position.x = this.mouseX;
    this.camera.position.y = -this.mouseY;
    this.camera.lookAt(0, 0, 0);

    // Subtle core rotation
    if (this.coreGroup) {
      this.coreGroup.rotation.y += 0.0025;
      this.coreGroup.rotation.x += 0.001;
      if (this.ringMesh1) this.ringMesh1.rotation.z += 0.004;
      if (this.ringMesh2) this.ringMesh2.rotation.z -= 0.003;
    }

    // Node cluster subtle movement
    if (this.pointCloud) {
      this.pointCloud.rotation.y += 0.0006;
      this.pointCloud.rotation.x += 0.0003;
    }

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}

export function initThreeCanvas(containerId = 'bg-canvas') {
  return new ThreeCanvas(containerId);
}
