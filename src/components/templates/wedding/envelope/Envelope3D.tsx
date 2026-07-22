"use client";

import React, { useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, ContactShadows, Text } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { WeddingEventData } from '@/types/event';
import { motion as motionDom, AnimatePresence } from 'framer-motion';

// --- Geometry Generation ---
const W = 6.0;
const H = 3.8;

const createFlapGeometry = (type: 'top' | 'bottom' | 'left' | 'right') => {
  const shape = new THREE.Shape();
  if (type === 'top') {
    shape.moveTo(-W / 2, 0);
    shape.lineTo(W / 2, 0);
    shape.lineTo(0, -H * 0.55); // points down
    shape.lineTo(-W / 2, 0);
  } else if (type === 'bottom') {
    shape.moveTo(-W / 2, 0);
    shape.lineTo(W / 2, 0);
    shape.lineTo(0, H * 0.65); // points up
    shape.lineTo(-W / 2, 0);
  } else if (type === 'left') {
    shape.moveTo(0, H / 2);
    shape.lineTo(0, -H / 2);
    shape.lineTo(W * 0.45, 0); // points right
    shape.lineTo(0, H / 2);
  } else if (type === 'right') {
    shape.moveTo(0, H / 2);
    shape.lineTo(0, -H / 2);
    shape.lineTo(-W * 0.45, 0); // points left
    shape.lineTo(0, H / 2);
  }
  return new THREE.ShapeGeometry(shape);
};

interface Props {
  eventData: WeddingEventData;
  onOpen: () => void;
}

const EnvelopeScene = ({ eventData, onOpen }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFaded, setIsFaded] = useState(false);

  // Precompute geometries
  const geometries = useMemo(() => {
    return {
      base: new THREE.PlaneGeometry(W, H),
      top: createFlapGeometry('top'),
      bottom: createFlapGeometry('bottom'),
      left: createFlapGeometry('left'),
      right: createFlapGeometry('right'),
      card: new THREE.PlaneGeometry(W * 0.9, H * 0.9),
      waxSeal: new THREE.CylinderGeometry(0.35, 0.35, 0.05, 32),
    };
  }, []);

  // Materials
  const materials = useMemo(() => {
    return {
      paper: new THREE.MeshStandardMaterial({
        color: '#161616',
        roughness: 1.0,
        metalness: 0.0,
        side: THREE.DoubleSide,
      }),
      insidePaper: new THREE.MeshStandardMaterial({
        color: '#0a0a0a',
        roughness: 1.0,
        metalness: 0.0,
        side: THREE.DoubleSide,
      }),
      card: new THREE.MeshStandardMaterial({
        color: '#FAF8F5',
        roughness: 1.0,
        metalness: 0.0,
      }),
      wax: new THREE.MeshStandardMaterial({
        color: '#a37a1c',
        roughness: 0.25,
        metalness: 0.4,
      }),
      foil: new THREE.MeshStandardMaterial({
        color: '#D4AF37',
        roughness: 0.15,
        metalness: 1.0,
      }),
    };
  }, []);

  useEffect(() => {
    document.body.style.cursor = isHovered && !isOpen ? 'pointer' : 'auto';
    return () => { document.body.style.cursor = 'auto'; };
  }, [isHovered, isOpen]);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Sequence timing
    setTimeout(() => {
      setIsFaded(true);
    }, 4500);
    
    setTimeout(() => {
      onOpen();
    }, 5500);
  };

  // Z-indices to prevent Z-fighting
  const Z_BASE = 0;
  const Z_CARD = 0.01;
  const Z_LEFT = 0.02;
  const Z_RIGHT = 0.03;
  const Z_BOTTOM = 0.04;
  const Z_TOP = 0.05;
  const Z_WAX = 0.06;

  return (
    <motion.group
      animate={isFaded ? { scale: 10, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <Float
        speed={isOpen ? 0 : 2}
        rotationIntensity={isOpen ? 0 : 0.2}
        floatIntensity={isOpen ? 0 : 0.5}
        floatingRange={[-0.1, 0.1]}
      >
        <motion.group
          onClick={handleOpen}
          onPointerOver={() => setIsHovered(true)}
          onPointerOut={() => setIsHovered(false)}
          animate={isOpen ? {
            scale: 1.4,
            y: -1.0,
            rotateX: 0.1,
          } : {
            scale: isHovered ? 1.05 : 1,
            y: 0,
            rotateX: 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Base of Envelope (Backside, visible inside) */}
          <mesh geometry={geometries.base} material={materials.insidePaper} position={[0, 0, Z_BASE]} />
          
          {/* Front of Envelope (facing away) */}
          <mesh geometry={geometries.base} material={materials.paper} position={[0, 0, Z_BASE - 0.01]} />

          {/* Invitation Card */}
          <motion.group
            position={[0, 0, Z_CARD]}
            animate={isOpen ? { y: 2.8, z: Z_TOP + 0.1 } : { y: 0, z: Z_CARD }}
            transition={{ delay: 1.8, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <mesh geometry={geometries.card} material={materials.card} />
            {/* Simple Card Details */}
            <mesh position={[0, H * 0.3, 0.001]}>
              <planeGeometry args={[W * 0.7, H * 0.01]} />
              <primitive object={materials.foil} />
            </mesh>
            <mesh position={[0, -H * 0.3, 0.001]}>
              <planeGeometry args={[W * 0.7, H * 0.01]} />
              <primitive object={materials.foil} />
            </mesh>
            <mesh position={[-W * 0.35, 0, 0.001]}>
              <planeGeometry args={[W * 0.01, H * 0.6]} />
              <primitive object={materials.foil} />
            </mesh>
            <mesh position={[W * 0.35, 0, 0.001]}>
              <planeGeometry args={[W * 0.01, H * 0.6]} />
              <primitive object={materials.foil} />
            </mesh>

            {/* Text on Card */}
            <Text position={[0, 0.6, 0.001]} fontSize={0.15} color="#8B6508" letterSpacing={0.2}>
              YOU ARE INVITED
            </Text>
            <Text position={[0, -0.1, 0.001]} fontSize={0.4} color="#111111" maxWidth={W * 0.7} textAlign="center">
              {eventData.brideName || "Bride"}
            </Text>
            <Text position={[0, -0.5, 0.001]} fontSize={0.25} color="#D4AF37">
              &
            </Text>
            <Text position={[0, -0.9, 0.001]} fontSize={0.4} color="#111111" maxWidth={W * 0.7} textAlign="center">
              {eventData.groomName || "Groom"}
            </Text>
          </motion.group>

          {/* Left Flap */}
          <motion.group
            position={[-W / 2, 0, Z_LEFT]}
            animate={isOpen ? { rotateY: Math.PI * 0.6 } : { rotateY: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
          >
            <mesh geometry={geometries.left} material={materials.paper} />
          </motion.group>

          {/* Right Flap */}
          <motion.group
            position={[W / 2, 0, Z_RIGHT]}
            animate={isOpen ? { rotateY: -Math.PI * 0.6 } : { rotateY: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: "easeInOut" }}
          >
            <mesh geometry={geometries.right} material={materials.paper} />
          </motion.group>

          {/* Bottom Flap */}
          <motion.group
            position={[0, -H / 2, Z_BOTTOM]}
            animate={isOpen ? { rotateX: -Math.PI * 0.6 } : { rotateX: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: "easeInOut" }}
          >
            <mesh geometry={geometries.bottom} material={materials.paper} />
          </motion.group>

          {/* Top Flap */}
          <motion.group
            position={[0, H / 2, Z_TOP]}
            animate={isOpen ? { rotateX: Math.PI * 0.95 } : { rotateX: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: "easeInOut" }}
          >
            <mesh geometry={geometries.top} material={materials.paper} />
          </motion.group>

          {/* Wax Seal */}
          <motion.group
            position={[0, 0, Z_WAX]}
            animate={isOpen ? { scale: 0, opacity: 0, y: 0.5 } : { scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "backIn" }}
          >
            <mesh geometry={geometries.waxSeal} material={materials.wax} rotation={[Math.PI / 2, 0, 0]} />
            
            {/* Inner Ring */}
            <mesh position={[0, 0, 0.027]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.25, 0.015, 16, 32]} />
              <primitive object={materials.foil} />
            </mesh>
            
            {/* Initials on Wax Seal */}
            <Text position={[0, 0, 0.035]} rotation={[Math.PI / 2, 0, 0]} fontSize={0.25} color="#FFECAD">
               {eventData.brideName?.[0] || "B"}&{eventData.groomName?.[0] || "G"}
            </Text>
          </motion.group>

        </motion.group>

      </Float>

      <ContactShadows 
        position={[0, -3.5, 0]} 
        opacity={isOpen ? 0.2 : 0.6} 
        scale={20} 
        blur={1.5} 
        far={10} 
      />
    </motion.group>
  );
};

// --- Error Boundary for WebGL Fallback ---
class WebGLErrorBoundary extends React.Component<{ onFallbackClick: () => void, children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { onFallbackClick: () => void, children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any) {
    console.error("WebGL error caught by ErrorBoundary:", error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[#020202]">
          <div 
            onClick={this.props.onFallbackClick}
            className="w-72 h-48 bg-[#161616] border border-[#D4AF37]/30 rounded-lg shadow-2xl flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="w-12 h-12 rounded-full bg-[#a37a1c] flex items-center justify-center mb-4">
              <div className="w-10 h-10 rounded-full border border-[#FFECAD] flex items-center justify-center">
                <span className="text-[#FFECAD] text-xs font-serif">Open</span>
              </div>
            </div>
            <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs font-semibold">Click to Open</span>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function Envelope3D({ eventData, onOpen }: Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [showHint, setShowHint] = useState(true);

  const handleOpen = () => {
    setShowHint(false);
    onOpen();
    setTimeout(() => {
      setIsVisible(false);
    }, 5500); // Wait for the whole animation (4500 + 1000)
  };

  if (!isVisible) return null;

  return (
    <motionDom.div 
      className="fixed inset-0 z-[100] bg-[#020202] flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <WebGLErrorBoundary onFallbackClick={handleOpen}>
        <Canvas shadows={{ type: THREE.PCFShadowMap }} dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
          
          {/* Physical Lighting Setup */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 10, 5]} 
            intensity={1.5} 
            castShadow 
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <directionalLight position={[-5, 5, 5]} intensity={0.5} />
          <hemisphereLight args={['#ffffff', '#b0c0e0', 0.6]} />
          <pointLight position={[5, 8, 5]} intensity={1.2} color="#ffe8c0" />
          <pointLight position={[-5, 4, 5]} intensity={0.6} color="#c0d8ff" />

          <EnvelopeScene eventData={eventData} onOpen={handleOpen} />
        </Canvas>
        
        {/* Absolute overlay for "Click to Break Seal" text */}
        <AnimatePresence>
          {showHint && (
            <motionDom.div 
              exit={{ opacity: 0 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none"
            >
              <motionDom.p
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#D4AF37] text-xs md:text-sm tracking-[0.4em] uppercase"
              >
                Click to Break Seal
              </motionDom.p>
            </motionDom.div>
          )}
        </AnimatePresence>
      </WebGLErrorBoundary>
    </motionDom.div>
  );
}
