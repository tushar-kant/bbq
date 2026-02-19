"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial, PresentationControls } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

const HeartShape = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    // Create the heart shape path
    const x = 0, y = 0;
    const shape = new THREE.Shape();
    shape.moveTo(x + 5, y + 5);
    shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    shape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    shape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    shape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

    const extrudeSettings = {
        depth: 4,
        bevelEnabled: true,
        bevelSegments: 10,
        steps: 4,
        bevelSize: 2,
        bevelThickness: 2,
    };

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.elapsedTime;
            // Heartbeat animation - slightly faster when hovered
            const speed = hovered ? 6 : 3;
            const beat = Math.sin(time * speed) * 0.05 + Math.sin(time * (speed * 2)) * 0.01;

            // Base scale 
            const baseScale = hovered ? 0.09 : 0.08;
            const scale = baseScale + beat;

            meshRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group position={[-0.6, 0.5, 0]}> {/* Centering the heart geometry offset */}
            <mesh
                ref={meshRef}
                position={[0, 0, 0]}
                rotation={[0, 0, Math.PI]}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <extrudeGeometry args={[shape, extrudeSettings]} />
                <MeshTransmissionMaterial
                    backside
                    samples={6}
                    thickness={2}
                    chromaticAberration={0.5}
                    anisotropy={0.5}
                    distortion={0.5}
                    distortionScale={0.5}
                    temporalDistortion={0.2}
                    iridescence={1}
                    iridescenceIOR={1.3}
                    iridescenceThicknessRange={[0, 1400]}
                    roughness={0.1}
                    color="#ff0022" // Vivid Red
                    background={new THREE.Color("#120508")}
                />
            </mesh>
        </group>
    );
};

export const ThreeRose = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ff3366" castShadow />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#ff99aa" />

                <PresentationControls
                    global

                    snap={true}
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 3, Math.PI / 3]}
                    azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                >
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
                        <HeartShape />
                    </Float>
                </PresentationControls>

                <Environment preset="night" blur={0.5} />
            </Canvas>
        </div>
    );
};
