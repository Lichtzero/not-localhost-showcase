/**
 * WORLD 3D ENGINE
 * ==============================================================================
 * Interactive Three.js spatial canvas featuring 15 handcrafted student islands,
 * dynamic particle cosmos, procedural floating objects, smooth camera inertia,
 * raycast interaction, and cinematic fly-to transitions.
 * ==============================================================================
 */

export class World3D {
  constructor(containerElement, students, onSelectStudent, onHoverStudent) {
    this.container = containerElement;
    this.students = students;
    this.onSelectStudent = onSelectStudent;
    this.onHoverStudent = onHoverStudent;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.islandMeshes = new Map();
    this.particles = null;
    this.ambientGroup = null;

    // Camera control state
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.spherical = {
      radius: 65,
      theta: 0.65, // azimuth
      phi: 1.25    // polar
    };
    this.targetSpherical = { ...this.spherical };
    this.targetLookAt = { x: 0, y: 0, z: 0 };
    this.currentLookAt = { x: 0, y: 0, z: 0 };

    this.pointer = { x: 0, y: 0, rawX: 0, rawY: 0 };
    this.raycaster = null;
    this.hoveredStudentId = null;
    this.activeTheme = 'ALL';
    this.isFlying = false;

    this.clock = null;
    this.animationFrameId = null;

    this.init();
  }

  init() {
    if (!window.THREE) {
      console.warn("Three.js not loaded. Falling back to CSS spatial layout.");
      return;
    }

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0b101d, 0.007);

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.updateCameraPosition();

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.container.appendChild(this.renderer.domElement);

    this.raycaster = new THREE.Raycaster();
    this.clock = new THREE.Clock();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x60a5fa, 1.8);
    keyLight.position.set(40, 60, 50);
    this.scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf43f5e, 1.2);
    rimLight.position.set(-50, -30, -40);
    this.scene.add(rimLight);

    const bottomGlow = new THREE.PointLight(0x38bdf8, 1.5, 120);
    bottomGlow.position.set(0, -25, 0);
    this.scene.add(bottomGlow);

    // Build Scene Elements
    this.createCosmicParticles();
    this.createCentralCollectiveCore();
    this.createStudentIslands();
    this.createFloatingAtmosphereProps();

    // Event Listeners
    this.bindEvents();

    // Start loop
    this.animate();
  }

  createCosmicParticles() {
    const particleCount = 700;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x38bdf8),
      new THREE.Color(0xa855f7),
      new THREE.Color(0xf43f5e),
      new THREE.Color(0x10b981),
      new THREE.Color(0xf59e0b),
      new THREE.Color(0xffffff)
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 20 + Math.random() * 110;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (radius * Math.sin(phi) * Math.sin(theta)) * 0.7; // slight disc flatten
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture generator
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,255,255,0.7)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 1.6,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  createCentralCollectiveCore() {
    this.ambientGroup = new THREE.Group();

    // Central glowing beacon representing the common class universe
    const coreGeo = new THREE.IcosahedronGeometry(3.5, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.6,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    this.ambientGroup.add(coreMesh);

    // Orbiting concentric rings
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide
    });

    const ring1 = new THREE.Mesh(new THREE.RingGeometry(8, 8.2, 64), ringMat);
    ring1.rotation.x = Math.PI * 0.45;
    this.ambientGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.RingGeometry(14, 14.25, 64), ringMat);
    ring2.rotation.y = Math.PI * 0.35;
    ring2.rotation.x = Math.PI * 0.2;
    this.ambientGroup.add(ring2);

    const ring3 = new THREE.Mesh(new THREE.RingGeometry(22, 22.3, 64), ringMat);
    ring3.rotation.z = Math.PI * 0.3;
    ring3.rotation.x = Math.PI * 0.55;
    this.ambientGroup.add(ring3);

    this.scene.add(this.ambientGroup);
  }

  createStudentIslands() {
    this.students.forEach((student, index) => {
      const island = new THREE.Group();
      const coords = student.coordinates || {
        x: Math.cos((index / this.students.length) * Math.PI * 2) * 32,
        y: (Math.sin(index * 1.5) * 16),
        z: Math.sin((index / this.students.length) * Math.PI * 2) * 32
      };

      island.position.set(coords.x, coords.y, coords.z);
      island.userData = {
        studentId: student.id,
        student: student,
        baseY: coords.y,
        basePosition: new THREE.Vector3(coords.x, coords.y, coords.z),
        phase: index * 0.45,
        speed: 0.9 + (index % 3) * 0.2,
        hoverScale: 1.0,
        activeThemeMatch: true
      };

      const color = new THREE.Color(student.accentColor || 0x38bdf8);

      // 1. Procedural Sculptural Island Base
      const baseMesh = this.createSculpturalMesh(student.shapeType, color);
      baseMesh.castShadow = true;
      baseMesh.receiveShadow = true;
      island.add(baseMesh);

      // 2. Glowing Halo Ring around the base
      const haloGeo = new THREE.TorusGeometry(3.2, 0.08, 16, 64);
      const haloMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.55
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.rotation.x = Math.PI / 2;
      haloMesh.position.y = -0.5;
      island.add(haloMesh);

      // 3. Floating 3D Creative Folder / Capsule above the pedestal
      const folderGroup = this.createFloatingFolderMesh(color, student.hasLiveDemo);
      folderGroup.position.y = 2.6;
      island.add(folderGroup);

      // 4. Floating Aura Sphere (Interactive Raycast Target)
      const hitBoxGeo = new THREE.SphereGeometry(4.2, 16, 16);
      const hitBoxMat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.0,
        depthWrite: false
      });
      const hitBoxMesh = new THREE.Mesh(hitBoxGeo, hitBoxMat);
      hitBoxMesh.userData = { isRaycastTarget: true, studentId: student.id };
      island.add(hitBoxMesh);

      // 5. Small Orbiting Satellites/Dots
      const satelliteGeo = new THREE.SphereGeometry(0.35, 8, 8);
      const satelliteMat = new THREE.MeshBasicMaterial({ color: color });
      const sat1 = new THREE.Mesh(satelliteGeo, satelliteMat);
      sat1.position.set(2.8, 1.2, 0);
      island.add(sat1);

      this.scene.add(island);
      this.islandMeshes.set(student.id, {
        group: island,
        baseMesh,
        folderGroup,
        haloMesh,
        sat1,
        color
      });
    });
  }

  createSculpturalMesh(shapeType, color) {
    const mat = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.25,
      metalness: 0.65,
      wireframe: false
    });

    let geo;
    switch (shapeType) {
      case 'crystal':
        geo = new THREE.OctahedronGeometry(2.4, 0);
        break;
      case 'sonar_ring':
        geo = new THREE.TorusGeometry(2.1, 0.65, 16, 32);
        break;
      case 'mesh_prism':
        geo = new THREE.ConeGeometry(2.4, 3.2, 5);
        break;
      case 'voxel_cluster':
        geo = new THREE.BoxGeometry(2.6, 2.6, 2.6);
        break;
      case 'cylinder_can':
        geo = new THREE.CylinderGeometry(1.6, 1.6, 3.2, 24);
        break;
      case 'blob_sphere':
        geo = new THREE.DodecahedronGeometry(2.3, 1);
        break;
      case 'mandala_torus':
        geo = new THREE.TorusKnotGeometry(1.6, 0.45, 64, 8, 2, 3);
        break;
      case 'celestial_orb':
        geo = new THREE.IcosahedronGeometry(2.3, 1);
        break;
      case 'core_prism':
        geo = new THREE.OctahedronGeometry(2.8, 1);
        break;
      case 'disc_binder':
        geo = new THREE.CylinderGeometry(2.4, 2.4, 1.2, 32);
        break;
      case 'cipher_cube':
        geo = new THREE.BoxGeometry(2.4, 2.4, 2.4);
        break;
      case 'monolith_slab':
        geo = new THREE.BoxGeometry(1.5, 3.6, 1.5);
        break;
      case 'faceted_gem':
        geo = new THREE.TetrahedronGeometry(2.6, 1);
        break;
      case 'eco_helix':
        geo = new THREE.TorusKnotGeometry(1.5, 0.4, 48, 8, 3, 4);
        break;
      default:
        geo = new THREE.DodecahedronGeometry(2.2, 0);
    }

    const mesh = new THREE.Mesh(geo, mat);
    return mesh;
  }

  createFloatingFolderMesh(color, isLive) {
    const group = new THREE.Group();

    // Folder Back Plate
    const backGeo = new THREE.BoxGeometry(1.6, 1.2, 0.08);
    const backMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.1
    });
    const backMesh = new THREE.Mesh(backGeo, backMat);
    group.add(backMesh);

    // Folder Tab
    const tabGeo = new THREE.BoxGeometry(0.65, 0.3, 0.08);
    const tabMesh = new THREE.Mesh(tabGeo, backMat);
    tabMesh.position.set(-0.45, 0.65, 0);
    group.add(tabMesh);

    // Folder Front Pocket (accent color)
    const frontGeo = new THREE.BoxGeometry(1.6, 0.9, 0.12);
    const frontMat = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.2,
      metalness: 0.4
    });
    const frontMesh = new THREE.Mesh(frontGeo, frontMat);
    frontMesh.position.set(0, -0.15, 0.1);
    group.add(frontMesh);

    // Small live badge gem or document peek
    if (isLive) {
      const docGeo = new THREE.BoxGeometry(1.2, 0.8, 0.04);
      const docMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const docMesh = new THREE.Mesh(docGeo, docMat);
      docMesh.position.set(0, 0.25, 0.05);
      docMesh.rotation.z = -0.05;
      group.add(docMesh);
    }

    return group;
  }

  createFloatingAtmosphereProps() {
    // Abstract floating fragments drifting across space (paper planes, cubes, asterisks)
    const propGroup = new THREE.Group();
    const shapes = [
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
      new THREE.TetrahedronGeometry(0.9, 0),
      new THREE.RingGeometry(0.5, 0.7, 16)
    ];

    for (let i = 0; i < 35; i++) {
      const geo = shapes[i % shapes.length];
      const mat = new THREE.MeshBasicMaterial({
        color: 0x94a3b8,
        wireframe: true,
        transparent: true,
        opacity: 0.25
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 110,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 110
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      propGroup.add(mesh);
    }

    this.scene.add(propGroup);
  }

  updateCameraPosition() {
    const { radius, theta, phi } = this.spherical;
    this.camera.position.x = this.currentLookAt.x + radius * Math.sin(phi) * Math.sin(theta);
    this.camera.position.y = this.currentLookAt.y + radius * Math.cos(phi);
    this.camera.position.z = this.currentLookAt.z + radius * Math.sin(phi) * Math.cos(theta);
    this.camera.lookAt(this.currentLookAt.x, this.currentLookAt.y, this.currentLookAt.z);
  }

  bindEvents() {
    const el = this.renderer.domElement;

    // Pointer down (start drag)
    const onPointerDown = (e) => {
      this.isDragging = true;
      this.isFlying = false;
      this.previousMousePosition = {
        x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
        y: e.clientY || (e.touches && e.touches[0].clientY) || 0
      };
    };

    // Pointer move (drag orbit & raycast)
    const onPointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      // Update normalized pointer for raycasting
      const rect = el.getBoundingClientRect();
      this.pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      this.pointer.rawX = clientX;
      this.pointer.rawY = clientY;

      if (this.isDragging) {
        const deltaX = clientX - this.previousMousePosition.x;
        const deltaY = clientY - this.previousMousePosition.y;

        this.targetSpherical.theta -= deltaX * 0.006;
        this.targetSpherical.phi = Math.max(0.2, Math.min(Math.PI - 0.2, this.targetSpherical.phi - deltaY * 0.006));

        this.previousMousePosition = { x: clientX, y: clientY };
      }
    };

    const onPointerUp = (e) => {
      this.isDragging = false;
    };

    // Click on island
    const onClick = (e) => {
      if (this.hoveredStudentId) {
        this.focusOnStudent(this.hoveredStudentId);
      }
    };

    // Mouse wheel (zoom)
    const onWheel = (e) => {
      e.preventDefault();
      this.targetSpherical.radius = Math.max(20, Math.min(115, this.targetSpherical.radius + e.deltaY * 0.05));
    };

    // Window resize
    const onResize = () => {
      const width = this.container.clientWidth || window.innerWidth;
      const height = this.container.clientHeight || window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    };

    el.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    el.addEventListener('click', onClick);
    el.addEventListener('wheel', onWheel, { passive: false });

    // Touch support
    el.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    window.addEventListener('resize', onResize);
  }

  focusOnStudent(studentId) {
    const islandData = this.islandMeshes.get(studentId);
    if (!islandData) return;

    const targetPos = islandData.group.position;
    this.isFlying = true;

    // Smoothly set lookAt to target
    this.targetLookAt = { x: targetPos.x, y: targetPos.y, z: targetPos.z };
    this.targetSpherical.radius = 28; // closer dramatic view

    if (this.onSelectStudent) {
      this.onSelectStudent(islandData.group.userData.student);
    }
  }

  resetView() {
    this.isFlying = true;
    this.targetLookAt = { x: 0, y: 0, z: 0 };
    this.targetSpherical = {
      radius: 65,
      theta: 0.65,
      phi: 1.25
    };
  }

  setFilter(theme) {
    this.activeTheme = theme;
    this.islandMeshes.forEach(({ group, baseMesh, folderGroup, haloMesh }) => {
      const student = group.userData.student;
      const matches = (theme === 'ALL' || student.themes.includes(theme));
      group.userData.activeThemeMatch = matches;

      if (matches) {
        baseMesh.material.opacity = 1.0;
        baseMesh.material.transparent = false;
        haloMesh.material.opacity = 0.55;
        group.visible = true;
      } else {
        baseMesh.material.transparent = true;
        baseMesh.material.opacity = 0.2;
        haloMesh.material.opacity = 0.1;
      }
    });
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const time = this.clock.getElapsedTime();

    // 1. Smooth Camera Damping (Spherical interpolation)
    const lerpFactor = this.isFlying ? 0.05 : 0.08;
    this.spherical.radius += (this.targetSpherical.radius - this.spherical.radius) * lerpFactor;
    this.spherical.theta += (this.targetSpherical.theta - this.spherical.theta) * lerpFactor;
    this.spherical.phi += (this.targetSpherical.phi - this.spherical.phi) * lerpFactor;

    this.currentLookAt.x += (this.targetLookAt.x - this.currentLookAt.x) * lerpFactor;
    this.currentLookAt.y += (this.targetLookAt.y - this.currentLookAt.y) * lerpFactor;
    this.currentLookAt.z += (this.targetLookAt.z - this.currentLookAt.z) * lerpFactor;

    // Gentle continuous slow orbit when idle
    if (!this.isDragging && !this.isFlying && !this.hoveredStudentId) {
      this.targetSpherical.theta += 0.0007;
    }

    this.updateCameraPosition();

    // 2. Cosmic Background Drift
    if (this.particles) {
      this.particles.rotation.y = time * 0.02;
    }
    if (this.ambientGroup) {
      this.ambientGroup.rotation.y = time * 0.04;
      this.ambientGroup.rotation.z = Math.sin(time * 0.03) * 0.15;
    }

    // 3. Island Bobbing and Animation
    this.islandMeshes.forEach(({ group, baseMesh, folderGroup, sat1, haloMesh }, studentId) => {
      const uData = group.userData;
      const isHovered = (this.hoveredStudentId === studentId);

      // Sinusoidal vertical bob
      const hoverBoost = isHovered ? 2.5 : 0;
      const targetY = uData.baseY + Math.sin(time * uData.speed + uData.phase) * 1.2 + hoverBoost;
      group.position.y += (targetY - group.position.y) * 0.08;

      // Base rotation
      baseMesh.rotation.y += (isHovered ? 0.04 : 0.008);
      baseMesh.rotation.x = Math.sin(time * 0.5 + uData.phase) * 0.1;

      // Floating folder subtle tilt
      folderGroup.rotation.y = Math.sin(time * 1.2 + uData.phase) * 0.25;
      folderGroup.position.y = 2.6 + Math.sin(time * 2.0 + uData.phase) * 0.25;

      // Orbiting satellite
      sat1.position.x = Math.cos(time * 1.5 + uData.phase) * 3.2;
      sat1.position.z = Math.sin(time * 1.5 + uData.phase) * 3.2;

      // Scale transition
      const targetScale = isHovered ? 1.18 : (uData.activeThemeMatch ? 1.0 : 0.85);
      uData.hoverScale += (targetScale - uData.hoverScale) * 0.12;
      group.scale.set(uData.hoverScale, uData.hoverScale, uData.hoverScale);
    });

    // 4. Raycasting for Mouse Hover
    if (!this.isDragging) {
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const targets = [];
      this.scene.traverse((obj) => {
        if (obj.userData && obj.userData.isRaycastTarget) {
          targets.push(obj);
        }
      });

      const intersects = this.raycaster.intersectObjects(targets);

      if (intersects.length > 0) {
        const hitId = intersects[0].object.userData.studentId;
        if (this.hoveredStudentId !== hitId) {
          this.hoveredStudentId = hitId;
          document.body.style.cursor = 'pointer';
          const student = this.islandMeshes.get(hitId).group.userData.student;
          if (this.onHoverStudent) {
            this.onHoverStudent(student, { x: this.pointer.rawX, y: this.pointer.rawY });
          }
        }
      } else {
        if (this.hoveredStudentId !== null) {
          this.hoveredStudentId = null;
          document.body.style.cursor = 'default';
          if (this.onHoverStudent) {
            this.onHoverStudent(null);
          }
        }
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.renderer && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
