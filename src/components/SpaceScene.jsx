import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { X, Sparkles, Compass } from 'lucide-react';

// 3D Particles / Cosmic Dust
function CosmicDust({ count = 800 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const colArray = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#a855f7'), // Violet
      new THREE.Color('#6366f1'), // Indigo
      new THREE.Color('#38bdf8'), // Cyan
      new THREE.Color('#f472b6'), // Pink
      new THREE.Color('#fbbf24')  // Gold
    ];

    for (let i = 0; i < count; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 60;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 60;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colArray[i * 3] = color.r;
      colArray[i * 3 + 1] = color.g;
      colArray[i * 3 + 2] = color.b;
    }

    return [posArray, colArray];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
      pointsRef.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        vertexColors
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Shooting Stars component
function ShootingStars({ count = 5 }) {
  const groupRef = useRef();

  const stars = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 50,
      y: Math.random() * 25 + 5,
      z: (Math.random() - 0.5) * 40 - 10,
      speed: Math.random() * 18 + 12
    }));
  }, [count]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((mesh, idx) => {
      mesh.position.x -= delta * stars[idx].speed;
      mesh.position.y -= delta * (stars[idx].speed * 0.6);

      if (mesh.position.x < -35 || mesh.position.y < -30) {
        mesh.position.x = (Math.random() - 0.5) * 40 + 20;
        mesh.position.y = Math.random() * 20 + 10;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {stars.map((s, i) => (
        <mesh key={i} position={[s.x, s.y, s.z]}>
          <boxGeometry args={[1.2, 0.04, 0.04]} />
          <meshBasicMaterial
            color="#fef08a"
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// Nebulae / Distant Cosmic Clouds
function CosmicNebulae() {
  const nebulaeRef = useRef();

  useFrame((state, delta) => {
    if (nebulaeRef.current) {
      nebulaeRef.current.rotation.z += delta * 0.003;
    }
  });

  return (
    <group ref={nebulaeRef}>
      {/* Cyan Nebula cloud */}
      <mesh position={[-18, -12, -35]} scale={[28, 20, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#0284c7"
          transparent
          opacity={0.14}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Deep Violet Nebula cloud */}
      <mesh position={[18, 14, -38]} scale={[32, 24, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#7e22ce"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Magenta Rose Glow */}
      <mesh position={[0, -18, -30]} scale={[24, 18, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#db2777"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// Interactive 3D Planet Component in Draggable Space
function CelestialBody3D({ body, onSelect, isSelected }) {
  const meshRef = useRef();
  const ringRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (hovered ? 0.6 : 0.2);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <group position={body.position}>
      {/* Planet Sphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(body);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[body.radius, 32, 32]} />
        <meshStandardMaterial
          color={body.color}
          emissive={body.color}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Tilted Ring (if applicable) */}
      {body.hasRing && (
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[body.radius * 1.4, body.radius * 2.2, 32]} />
          <meshBasicMaterial
            color={body.ringColor || body.color}
            transparent
            opacity={0.65}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Atmospheric Glow Shell */}
      <mesh scale={hovered ? 1.25 : 1.15}>
        <sphereGeometry args={[body.radius, 32, 32]} />
        <meshBasicMaterial
          color={body.color}
          transparent
          opacity={hovered ? 0.35 : 0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Floating 3D Name Tag */}
      <Html distanceFactor={25} position={[0, body.radius + 1.2, 0]} center>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect(body);
          }}
          className={`cursor-pointer px-3 py-1 rounded-full backdrop-blur-md text-xs font-cinzel tracking-widest whitespace-nowrap transition-all duration-300 ${
            hovered
              ? 'bg-purple-900/90 border border-amber-300/80 text-amber-100 scale-110 shadow-[0_0_15px_rgba(245,208,120,0.6)]'
              : 'bg-slate-950/70 border border-purple-400/30 text-purple-200/90'
          }`}
        >
          ✦ {body.name} ✦
        </div>
      </Html>
    </group>
  );
}

// Fallback CSS Starfield Component if WebGL is unavailable
function CSSStarfield() {
  const stars = useMemo(() => {
    return Array.from({ length: 120 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 3}s`
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-gradient-to-b from-[#03030c] via-[#09081e] to-[#04030d]">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl animate-pulse" />
      {stars.map((s) => (
        <div
          key={s.id}
          className="css-star"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDuration: s.duration,
            animationDelay: s.delay
          }}
        />
      ))}
    </div>
  );
}

export default function SpaceScene({ celestialBodies = [], onSelectGateway, children }) {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [selectedBody, setSelectedBody] = useState(null);
  const controlsRef = useRef();

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  const handleBodyClick = (body) => {
    if (body.isGateway) {
      if (onSelectGateway) onSelectGateway();
    } else {
      setSelectedBody(body);
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#03030a] overflow-hidden">
      {!hasWebGL ? (
        <CSSStarfield />
      ) : (
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 22], fov: 60 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          >
            {/* Draggable 3D Orbit Controls */}
            <OrbitControls
              ref={controlsRef}
              enableZoom={true}
              maxDistance={50}
              minDistance={8}
              enablePan={true}
              dampingFactor={0.05}
              rotateSpeed={0.6}
            />

            <ambientLight intensity={0.4} />
            <pointLight position={[15, 15, 15]} intensity={0.8} />
            <pointLight position={[-15, -15, -15]} intensity={0.5} color="#c084fc" />

            {/* Stars background */}
            <Stars
              radius={90}
              depth={60}
              count={6000}
              factor={4}
              saturation={0.6}
              fade
              speed={1}
            />

            {/* Cosmic dust, nebulae, & shooting stars */}
            <CosmicDust count={700} />
            <ShootingStars count={5} />
            <CosmicNebulae />

            {/* Interactive 3D Celestial Objects Scattered in Space */}
            {celestialBodies.map((body) => (
              <CelestialBody3D
                key={body.id}
                body={body}
                onSelect={handleBodyClick}
                isSelected={selectedBody?.id === body.id}
              />
            ))}
          </Canvas>

          {/* Draggable Space Helper Banner */}
          <div className="fixed top-4 left-4 z-30 pointer-events-none flex items-center space-x-2 bg-purple-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-400/20 text-xs font-cinzel text-amber-200/80 shadow-lg">
            <Compass className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
            <span>Drag space to explore planets ✦</span>
          </div>
        </div>
      )}

      {/* Inspection Modal for Non-Gateway Planets when tapped */}
      <AnimatePresence>
        {selectedBody && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBody(null)}
          >
            <motion.div
              className="glass-book-container p-6 sm:p-8 max-w-md w-full relative text-center border border-amber-300/30 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.4)]"
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBody(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-purple-950/80 border border-purple-400/30 text-amber-200 hover:text-white hover:bg-purple-900 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Celestial Sphere Accent */}
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 shadow-[0_0_25px_rgba(255,255,255,0.4)] animate-pulse"
                style={{
                  backgroundColor: selectedBody.color,
                  boxShadow: `0 0 30px ${selectedBody.color}`
                }}
              />

              <h2 className="font-cinzel text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-purple-100 to-amber-200 text-glow-gold tracking-wider font-semibold">
                {selectedBody.name}
              </h2>
              <p className="font-garamond italic text-purple-200/80 text-sm mt-1">
                {selectedBody.subtitle}
              </p>

              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-300/50 to-transparent mx-auto my-4" />

              <p className="font-garamond text-base sm:text-lg text-slate-100 leading-relaxed italic px-2">
                “{selectedBody.quote}”
              </p>

              <button
                onClick={() => setSelectedBody(null)}
                className="mt-6 px-6 py-2 rounded-full bg-purple-900/60 border border-amber-300/40 text-amber-200 font-cinzel text-xs tracking-widest hover:bg-purple-800 transition-colors"
              >
                ✦ CONTINUE EXPLORING ✦
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layered content overlay */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}
