import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeHeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return undefined;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050a17, 4.4, 10);

    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    camera.position.set(0, 0.2, 3.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const pixelRatio = Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.7 : 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountNode.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.58);
    const keyLight = new THREE.DirectionalLight(0x79ffe1, 1.15);
    const fillLight = new THREE.PointLight(0x9a7dff, 0.65, 8, 2);
    const rimLight = new THREE.PointLight(0xff9d4d, 1.35, 8, 2);

    keyLight.position.set(2.3, 2.6, 2.8);
    fillLight.position.set(-1.8, 1.3, 1.6);
    rimLight.position.set(-2.8, -1.2, 2.2);

    scene.add(ambient, keyLight, fillLight, rimLight);

    const coreGeometry = new THREE.IcosahedronGeometry(0.9, 20);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x79ffe1,
      emissive: 0x0a2f38,
      emissiveIntensity: 0.56,
      roughness: 0.24,
      metalness: 0.36,
      transparent: true,
      opacity: 0.95,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    const shellGeometry = new THREE.IcosahedronGeometry(1.04, 4);
    const shellMaterial = new THREE.MeshBasicMaterial({
      color: 0x8be9ff,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const shellMesh = new THREE.Mesh(shellGeometry, shellMaterial);
    scene.add(shellMesh);

    const ringGeometry = new THREE.TorusGeometry(1.42, 0.045, 20, 180);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffa857,
      transparent: true,
      opacity: 0.6,
    });
    const ringOne = new THREE.Mesh(ringGeometry, ringMaterial);
    const ringTwo = new THREE.Mesh(ringGeometry, ringMaterial.clone());
    ringOne.rotation.set(0.85, 0.35, 0.18);
    ringTwo.rotation.set(-0.52, -0.68, 0.22);
    ringTwo.material.opacity = 0.44;
    scene.add(ringOne, ringTwo);

    const pulseRingGeometry = new THREE.TorusGeometry(1.06, 0.02, 16, 200);
    const pulseRingMaterial = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.3,
    });
    const pulseRing = new THREE.Mesh(pulseRingGeometry, pulseRingMaterial);
    pulseRing.rotation.x = Math.PI * 0.48;
    scene.add(pulseRing);

    const satellites = [];
    const satelliteGeometry = new THREE.SphereGeometry(0.06, 16, 16);
    const satelliteColors = [0xf59e0b, 0x8b5cf6, 0x22d3ee];

    for (let i = 0; i < 3; i += 1) {
      const material = new THREE.MeshStandardMaterial({
        color: satelliteColors[i],
        emissive: satelliteColors[i],
        emissiveIntensity: 0.35,
        roughness: 0.2,
        metalness: 0.4,
      });
      const satellite = new THREE.Mesh(satelliteGeometry, material);
      satellites.push(satellite);
      scene.add(satellite);
    }

    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = window.innerWidth < 760 ? 140 : 260;
    const starPositions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount; i += 1) {
      starPositions[i * 3] = (Math.random() - 0.5) * 9;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 5.2;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 5.5;
    }

    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: window.innerWidth < 760 ? 0.018 : 0.022,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    function isLightTheme() {
      return document.documentElement.classList.contains("light");
    }

    function applyTheme(light) {
      scene.fog = new THREE.Fog(light ? 0xeaf0fb : 0x050a17, 4.4, 10);

      coreMaterial.color.set(light ? 0x36a7bc : 0x79ffe1);
      coreMaterial.emissive.set(light ? 0x245786 : 0x0a2f38);
      coreMaterial.emissiveIntensity = light ? 0.42 : 0.56;

      shellMaterial.color.set(light ? 0x4f9cff : 0x8be9ff);
      shellMaterial.opacity = light ? 0.18 : 0.22;

      ringMaterial.color.set(light ? 0xff9c48 : 0xffa857);
      ringMaterial.opacity = light ? 0.52 : 0.6;
      ringTwo.material.opacity = light ? 0.36 : 0.44;

      pulseRingMaterial.color.set(light ? 0x2f89ff : 0x67e8f9);
      pulseRingMaterial.opacity = light ? 0.25 : 0.3;

      starsMaterial.color.set(light ? 0x5f6c8b : 0xffffff);
      starsMaterial.opacity = light ? 0.34 : 0.5;

      ambient.intensity = light ? 0.74 : 0.58;
      keyLight.color.set(light ? 0x57b8ff : 0x79ffe1);
      keyLight.intensity = light ? 0.98 : 1.15;

      fillLight.color.set(light ? 0x74a5ff : 0x9a7dff);
      fillLight.intensity = light ? 0.58 : 0.65;

      rimLight.color.set(light ? 0xff9545 : 0xff9d4d);
      rimLight.intensity = light ? 1.08 : 1.35;
    }

    applyTheme(isLightTheme());
    const themeObserver = new MutationObserver(() => {
      applyTheme(isLightTheme());
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const pointer = { x: 0, y: 0 };
    let rafId = 0;

    function onPointerMove(event) {
      const rect = mountNode.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    }

    function onPointerLeave() {
      pointer.x = 0;
      pointer.y = 0;
    }

    function resize() {
      const width = mountNode.clientWidth;
      const height = Math.max(260, mountNode.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function animate() {
      const t = performance.now() * 0.001;

      coreMesh.rotation.x += 0.0032;
      coreMesh.rotation.y += 0.0058;
      coreMesh.position.y = Math.sin(t * 1.45) * 0.08;

      shellMesh.rotation.x -= 0.002;
      shellMesh.rotation.y += 0.0028;
      shellMesh.scale.setScalar(1 + Math.sin(t * 2.2) * 0.015);

      ringOne.rotation.y += 0.0052;
      ringTwo.rotation.x -= 0.0048;

      pulseRing.scale.setScalar(1 + Math.sin(t * 3.1) * 0.06);
      pulseRing.material.opacity = 0.2 + (Math.sin(t * 3.1) + 1) * 0.08;

      satellites.forEach((satellite, index) => {
        const phase = t * (0.95 + index * 0.22) + index * 2.1;
        const radius = 1.2 + index * 0.22;
        satellite.position.x = Math.cos(phase) * radius;
        satellite.position.y = Math.sin(phase * 1.34) * 0.26;
        satellite.position.z = Math.sin(phase) * radius * 0.42;
      });

      stars.rotation.y += 0.0005;
      stars.rotation.x = Math.sin(t * 0.26) * 0.05;

      keyLight.intensity = 0.96 + (Math.sin(t * 1.2) + 1) * 0.12;
      rimLight.intensity = 1.16 + (Math.sin(t * 1.8 + 0.9) + 1) * 0.1;

      scene.rotation.y += (pointer.x * 0.28 - scene.rotation.y) * 0.03;
      scene.rotation.x += (-pointer.y * 0.18 - scene.rotation.x) * 0.03;

      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(animate);
    }

    resize();
    animate();

    mountNode.addEventListener("pointermove", onPointerMove);
    mountNode.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      mountNode.removeEventListener("pointermove", onPointerMove);
      mountNode.removeEventListener("pointerleave", onPointerLeave);
      themeObserver.disconnect();

      scene.remove(coreMesh, shellMesh, ringOne, ringTwo, pulseRing, stars);
      satellites.forEach((satellite) => scene.remove(satellite));

      coreGeometry.dispose();
      coreMaterial.dispose();
      shellGeometry.dispose();
      shellMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ringTwo.material.dispose();
      pulseRingGeometry.dispose();
      pulseRingMaterial.dispose();
      satelliteGeometry.dispose();
      satellites.forEach((satellite) => satellite.material.dispose());
      starsGeometry.dispose();
      starsMaterial.dispose();

      renderer.dispose();
      renderer.forceContextLoss();

      if (mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="three-hero-canvas" ref={mountRef} aria-hidden="true" />;
}
