import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface WizardAvatar3DProps {
  color: string;
  beaconColor: string;
  avatarRune: string;
  staffType: string;
  isSpeaking: boolean;
}

export const WizardAvatar3D: React.FC<WizardAvatar3DProps> = ({
  color,
  beaconColor,
  avatarRune,
  staffType,
  isSpeaking,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isSpeakingRef = useRef(isSpeaking);
  isSpeakingRef.current = isSpeaking;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 240;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05050a, 0.05);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 1.45, 3.8);
    camera.lookAt(0, 1.15, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 2.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(2, 4, 3);
    scene.add(keyLight);

    const rimColor = new THREE.Color(color || beaconColor);
    const rimLight = new THREE.DirectionalLight(rimColor, 3.0);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    // BASE ARCANE DAIS / PEDESTAL
    const daisGeo = new THREE.CylinderGeometry(1.0, 1.15, 0.1, 32);
    const daisMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a14,
      metalness: 0.9,
      roughness: 0.3,
      emissive: rimColor,
      emissiveIntensity: 0.2,
    });
    const dais = new THREE.Mesh(daisGeo, daisMat);
    dais.position.y = 0.05;
    scene.add(dais);

    const runeRings = new THREE.Group();
    const daisRingGeo = new THREE.RingGeometry(0.85, 0.95, 32);
    const daisRingMat = new THREE.MeshBasicMaterial({
      color: rimColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const daisRing = new THREE.Mesh(daisRingGeo, daisRingMat);
    daisRing.rotation.x = -Math.PI / 2;
    daisRing.position.y = 0.11;
    runeRings.add(daisRing);
    scene.add(runeRings);

    // WIZARD FIGURE GROUP
    const wizardGroup = new THREE.Group();
    wizardGroup.position.set(0, 0.1, 0);
    scene.add(wizardGroup);

    const darkRobeMat = new THREE.MeshStandardMaterial({
      color: 0x090912,
      roughness: 0.5,
      metalness: 0.6,
    });

    const cloakMat = new THREE.MeshStandardMaterial({
      color: 0x0f0f1d,
      roughness: 0.4,
      metalness: 0.7,
      emissive: rimColor,
      emissiveIntensity: 0.22,
    });

    const glowCrystalMat = new THREE.MeshStandardMaterial({
      color: rimColor,
      emissive: rimColor,
      emissiveIntensity: 1.8,
      roughness: 0.1,
      metalness: 0.9,
    });

    const legHeight = 0.55;
    const torsoHeight = 0.75;
    const headRadius = 0.2;

    // HEAD
    const headGeo = new THREE.SphereGeometry(headRadius, 16, 16);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x161622,
      emissive: rimColor,
      emissiveIntensity: 0.35,
    });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = legHeight + torsoHeight + headRadius;
    wizardGroup.add(head);

    // POINTED WIZARD COWL / HAT
    const cowlGeo = new THREE.ConeGeometry(0.32, 0.6, 16);
    const cowl = new THREE.Mesh(cowlGeo, cloakMat);
    cowl.position.y = legHeight + torsoHeight + headRadius * 2.2;
    cowl.rotation.x = -0.15;
    cowl.rotation.z = 0.08;
    wizardGroup.add(cowl);

    // HAT BRIM
    const brimGeo = new THREE.TorusGeometry(0.36, 0.04, 8, 24);
    const brim = new THREE.Mesh(brimGeo, cloakMat);
    brim.rotation.x = Math.PI / 2 - 0.15;
    brim.position.y = legHeight + torsoHeight + headRadius * 1.5;
    wizardGroup.add(brim);

    // TORSO / ROBES
    const torsoGeo = new THREE.CylinderGeometry(0.24, 0.34, torsoHeight, 16);
    const torso = new THREE.Mesh(torsoGeo, darkRobeMat);
    torso.position.y = legHeight + torsoHeight / 2;
    wizardGroup.add(torso);

    // FLOWING CLOAK
    const cloakGeo = new THREE.CylinderGeometry(0.34, 0.78, torsoHeight + legHeight * 0.95, 16, 1, true, -Math.PI * 0.8, Math.PI * 1.6);
    const cloak = new THREE.Mesh(cloakGeo, cloakMat);
    cloak.position.set(0, legHeight * 0.55 + torsoHeight * 0.45, -0.06);
    cloak.rotation.y = Math.PI;
    wizardGroup.add(cloak);

    // LEGS
    const legGeo = new THREE.CylinderGeometry(0.09, 0.07, legHeight, 12);
    const leftLeg = new THREE.Mesh(legGeo, darkRobeMat);
    leftLeg.position.set(-0.13, legHeight / 2, 0);
    wizardGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, darkRobeMat);
    rightLeg.position.set(0.13, legHeight / 2, 0);
    wizardGroup.add(rightLeg);

    // ARMS & ORATION GESTURING
    const armGeo = new THREE.CylinderGeometry(0.07, 0.06, torsoHeight * 0.92, 12);

    // Left Arm (Speaking gesture)
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.35, legHeight + torsoHeight * 0.7, 0.1);
    const leftArm = new THREE.Mesh(armGeo, darkRobeMat);
    leftArm.position.y = -torsoHeight * 0.42;
    leftArmGroup.add(leftArm);
    leftArmGroup.rotation.z = 0.55;
    leftArmGroup.rotation.x = -0.4;
    wizardGroup.add(leftArmGroup);

    // Right Arm (Holding staff)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.35, legHeight + torsoHeight * 0.7, 0.1);
    const rightArm = new THREE.Mesh(armGeo, darkRobeMat);
    rightArm.position.y = -torsoHeight * 0.42;
    rightArmGroup.add(rightArm);
    rightArmGroup.rotation.z = -0.22;
    rightArmGroup.rotation.x = -0.25;
    wizardGroup.add(rightArmGroup);

    // WIZARD STAFF
    const staffGroup = new THREE.Group();
    staffGroup.position.set(0.48, 0, 0.3);

    const staffHeight = legHeight + torsoHeight + 1.15;
    const staffShaftGeo = new THREE.CylinderGeometry(0.032, 0.04, staffHeight, 12);
    const staffShaftMat = new THREE.MeshStandardMaterial({
      color: 0x1f1f2e,
      metalness: 0.95,
      roughness: 0.2,
      emissive: rimColor,
      emissiveIntensity: 0.35,
    });
    const staffShaft = new THREE.Mesh(staffShaftGeo, staffShaftMat);
    staffShaft.position.y = staffHeight / 2;
    staffGroup.add(staffShaft);

    // Crystal Orb at Top of Staff
    const staffOrbGeo = new THREE.OctahedronGeometry(0.24, 0);
    const staffOrb = new THREE.Mesh(staffOrbGeo, glowCrystalMat);
    staffOrb.position.y = staffHeight + 0.15;
    staffGroup.add(staffOrb);

    // Rotating Gimbal Ring around staff crystal
    const staffRingGeo = new THREE.TorusGeometry(0.34, 0.024, 12, 32);
    const staffRing = new THREE.Mesh(staffRingGeo, glowCrystalMat);
    staffRing.position.y = staffHeight + 0.15;
    staffGroup.add(staffRing);

    // Staff Point Light
    const staffLight = new THREE.PointLight(rimColor, 2.8, 5.0);
    staffLight.position.y = staffHeight + 0.15;
    staffGroup.add(staffLight);

    wizardGroup.add(staffGroup);

    // FLOATING ARCANE HALO ABOVE HEAD
    const haloGeo = new THREE.RingGeometry(0.42, 0.5, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: rimColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.rotation.x = Math.PI / 2;
    halo.position.y = legHeight + torsoHeight + headRadius * 2.8;
    wizardGroup.add(halo);

    // MOUSE PARALLAX
    let targetRotY = 0;
    let targetRotX = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = nx * 0.45;
      targetRotX = -ny * 0.15;
    };
    container.addEventListener('mousemove', handleMouseMove);

    // RESIZE
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 240;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle wizard breathing & floating motion
      wizardGroup.position.y = 0.1 + Math.sin(elapsed * 1.8) * 0.035;

      // Staff crystal rotation
      staffOrb.rotation.y = elapsed * 1.2;
      staffOrb.rotation.x = elapsed * 0.8;
      staffRing.rotation.x = elapsed * 1.5;
      staffRing.rotation.y = elapsed * 0.9;

      // Halo rotation
      halo.rotation.z = -elapsed * 0.6;
      halo.position.y = legHeight + torsoHeight + headRadius * 2.8 + Math.sin(elapsed * 2.2) * 0.02;

      // Dais ring rotation
      daisRing.rotation.z = elapsed * 0.4;

      // Arm gesturing motion when speaking
      if (isSpeakingRef.current) {
        leftArmGroup.rotation.z = 0.55 + Math.sin(elapsed * 6.0) * 0.12;
        leftArmGroup.rotation.x = -0.4 + Math.cos(elapsed * 5.0) * 0.14;
        staffLight.intensity = 2.8 + Math.sin(elapsed * 10.0) * 1.2;
      } else {
        leftArmGroup.rotation.z = 0.55 + Math.sin(elapsed * 1.5) * 0.03;
        leftArmGroup.rotation.x = -0.4 + Math.sin(elapsed * 1.2) * 0.04;
        staffLight.intensity = 2.4 + Math.sin(elapsed * 2.0) * 0.4;
      }

      // Parallax smooth lerp towards target rotation
      wizardGroup.rotation.y += (targetRotY - wizardGroup.rotation.y) * 0.08;
      wizardGroup.rotation.x += (targetRotX - wizardGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [color, beaconColor, staffType]);

  return (
    <div className="relative w-full h-[220px] bg-gradient-to-b from-[#03030a] via-[#070714] to-[#04040c] rounded-t-lg overflow-hidden border-b border-neutral-800">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Arcane Rune Overlay Badge */}
      <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded bg-black/75 border border-amber-500/40 backdrop-blur-md shadow-lg pointer-events-none">
        <span className="text-lg">{avatarRune}</span>
        <span className="text-[10px] font-chakra font-bold text-amber-300 uppercase tracking-widest">
          PROJECT OWNER
        </span>
      </div>

      {/* Staff Conduit Status */}
      <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/75 border border-neutral-700/80 text-[9px] text-neutral-300 font-mono pointer-events-none backdrop-blur-md">
        CONDUIT: {staffType.toUpperCase()}
      </div>

      {/* Live Speaking Indicator Pulse */}
      {isSpeaking && (
        <div className="absolute bottom-2 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/60 text-[10px] text-amber-300 font-mono animate-pulse pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>INCANTING / EXPLAINING</span>
        </div>
      )}
    </div>
  );
};
