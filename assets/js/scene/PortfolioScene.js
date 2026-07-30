import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.min.js";

const MOBILE_BREAKPOINT = 760;
const MAX_PIXEL_RATIO = 1.8;

export class PortfolioScene {
  constructor(host) {
    this.host = host;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    this.clock = new THREE.Clock();
    this.sculpture = new THREE.Group();
    this.pointer = new THREE.Vector2();
    this.pointerTarget = new THREE.Vector2();
    this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.frame = 0;
    this.visible = true;
    this.disposed = false;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.host.append(this.renderer.domElement);

    this.camera.position.set(0, 0.15, 8.6);
    this.createLighting();
    this.createSculpture();
    this.createParticles();
    this.bindEvents();
    this.resize();
    this.animate();
  }

  createLighting() {
    this.scene.add(new THREE.HemisphereLight(0xb7dcff, 0x15111f, 1.45));

    const key = new THREE.PointLight(0x71f5d0, 16, 18, 2.1);
    key.position.set(3.2, 2.5, 4.5);
    this.scene.add(key);

    const fill = new THREE.PointLight(0x8b7cff, 13, 16, 2);
    fill.position.set(-4, -1.2, 2.8);
    this.scene.add(fill);

    const rim = new THREE.PointLight(0xffb86b, 9, 14, 2);
    rim.position.set(0.2, 4.2, -2.8);
    this.scene.add(rim);
  }

  createSculpture() {
    const coreGeometry = new THREE.IcosahedronGeometry(1.58, 5);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x131b2c,
      metalness: 0.22,
      roughness: 0.18,
      transmission: 0.28,
      thickness: 1.1,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
      iridescence: 0.62,
      iridescenceIOR: 1.35,
      emissive: 0x08131c,
      emissiveIntensity: 0.36,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.scale.set(1, 1.08, 1);
    this.sculpture.add(core);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.64, 2),
      new THREE.MeshBasicMaterial({
        color: 0x8bf8dd,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      }),
    );
    wire.rotation.set(0.3, 0.15, -0.2);
    this.sculpture.add(wire);

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xc7fff2,
      metalness: 0.82,
      roughness: 0.22,
      emissive: 0x0d6859,
      emissiveIntensity: 0.56,
    });

    const ringSpecs = [
      [2.1, 0.035, 0.55, 0.15],
      [2.42, 0.025, -0.78, 0.55],
      [2.72, 0.018, 1.08, -0.35],
    ];

    ringSpecs.forEach(([radius, tube, xRotation, yRotation], index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tube, 16, 180),
        ringMaterial.clone(),
      );
      ring.rotation.set(xRotation, yRotation, index * 0.7);
      ring.userData.speed = 0.08 + index * 0.035;
      this.sculpture.add(ring);
    });

    const satelliteMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x9df9e2,
      metalness: 0.35,
      roughness: 0.2,
      transmission: 0.45,
      thickness: 0.4,
      emissive: 0x174b42,
      emissiveIntensity: 0.65,
    });

    const satellitePositions = [
      new THREE.Vector3(2.65, 0.75, 0.25),
      new THREE.Vector3(-2.15, -1.55, 0.7),
      new THREE.Vector3(0.4, 2.68, -0.25),
    ];

    satellitePositions.forEach((position, index) => {
      const satellite = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.16 + index * 0.035, 2),
        satelliteMaterial.clone(),
      );
      satellite.position.copy(position);
      satellite.userData.phase = index * 2.1;
      this.sculpture.add(satellite);
    });

    this.sculpture.rotation.set(-0.08, -0.35, 0.05);
    this.scene.add(this.sculpture);
  }

  createParticles() {
    const count = window.innerWidth < MOBILE_BREAKPOINT ? 260 : 520;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let index = 0; index < count; index += 1) {
      const radius = 4 + Math.random() * 7;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 8;
      const offset = index * 3;
      positions[offset] = Math.cos(angle) * radius;
      positions[offset + 1] = height;
      positions[offset + 2] = Math.sin(angle) * radius - 2;
      sizes[index] = 0.5 + Math.random() * 1.5;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      color: 0xbdfcf0,
      size: 0.022,
      transparent: true,
      opacity: 0.58,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    particles.name = "ambient-particles";
    this.scene.add(particles);
  }

  bindEvents() {
    window.addEventListener("resize", this.resize, { passive: true });
    window.addEventListener("pointermove", this.handlePointer, { passive: true });
    document.addEventListener("visibilitychange", this.handleVisibility);
  }

  handlePointer = (event) => {
    this.pointerTarget.x = (event.clientX / window.innerWidth - 0.5) * 2;
    this.pointerTarget.y = (event.clientY / window.innerHeight - 0.5) * -2;
  };

  handleVisibility = () => {
    this.visible = document.visibilityState === "visible";
    if (this.visible) this.clock.start();
  };

  resize = () => {
    const width = Math.max(this.host.clientWidth, 1);
    const height = Math.max(this.host.clientHeight, 1);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
    this.renderer.setSize(width, height, false);

    const mobile = width < MOBILE_BREAKPOINT;
    this.sculpture.scale.setScalar(mobile ? 0.72 : 1);
    this.sculpture.position.set(mobile ? 0 : 0.7, mobile ? 0.55 : 0, 0);
  };

  animate = () => {
    if (this.disposed) return;
    this.frame = window.requestAnimationFrame(this.animate);
    if (!this.visible) return;

    const elapsed = this.clock.getElapsedTime();
    const motionScale = this.reduceMotion ? 0 : 1;

    this.pointer.lerp(this.pointerTarget, 0.035);
    this.sculpture.rotation.y =
      -0.32 + elapsed * 0.055 * motionScale + this.pointer.x * 0.16 * motionScale;
    this.sculpture.rotation.x =
      -0.08 + Math.sin(elapsed * 0.42) * 0.045 * motionScale + this.pointer.y * 0.09 * motionScale;
    this.sculpture.position.y +=
      (Math.sin(elapsed * 0.7) * 0.075 * motionScale - this.sculpture.position.y) * 0.018;

    this.sculpture.children.forEach((child, index) => {
      if (child instanceof THREE.Mesh && typeof child.userData.speed === "number") {
        child.rotation.z += child.userData.speed * 0.0035 * motionScale;
      }
      if (child instanceof THREE.Mesh && typeof child.userData.phase === "number") {
        const phase = child.userData.phase;
        child.rotation.x = elapsed * (0.25 + index * 0.015) * motionScale;
        child.rotation.y = elapsed * (0.18 + index * 0.012) * motionScale;
        child.position.y += Math.sin(elapsed * 0.9 + phase) * 0.00055 * motionScale;
      }
    });

    const particles = this.scene.getObjectByName("ambient-particles");
    if (particles) particles.rotation.y = elapsed * 0.012 * motionScale;

    this.camera.position.x += (this.pointer.x * 0.22 * motionScale - this.camera.position.x) * 0.025;
    this.camera.position.y += (0.15 + this.pointer.y * 0.14 * motionScale - this.camera.position.y) * 0.025;
    this.camera.lookAt(0.25, 0, 0);
    this.renderer.render(this.scene, this.camera);
  };

  dispose() {
    this.disposed = true;
    window.cancelAnimationFrame(this.frame);
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("pointermove", this.handlePointer);
    document.removeEventListener("visibilitychange", this.handleVisibility);

    this.scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh || object instanceof THREE.Points)) return;
      object.geometry.dispose();
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material) => material.dispose());
    });
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
