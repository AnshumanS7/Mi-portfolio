import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import * as random from 'maath/random/dist/maath-random.esm'

export default function TheVoid() {
    return (
        <div className="fixed inset-0 w-full h-full -z-10 bg-black">
            <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
                <fog attach="fog" args={['black', 0, 20]} />
                <ambientLight intensity={0.1} />

                {/* The Black Hole (Event Horizon) */}
                <mesh>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshBasicMaterial color="#000000" />
                </mesh>

                {/* Accretion Disk (Particles) */}
                <AccretionDisk />

                {/* Background Stars */}
                <Stars />

                {/* Camera Flow */}
                <CameraRig />
            </Canvas>
        </div>
    )
}

function AccretionDisk() {
    const ref = useRef()
    const count = 4000

    // Generate particles in a flat disk/ring shape
    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)
        const color1 = new THREE.Color('#f59e0b') // Amber/Gold
        const color2 = new THREE.Color('#ea580c') // Orange/Red
        const color3 = new THREE.Color('#3b82f6') // Blue (hot)

        for (let i = 0; i < count; i++) {
            // Ring radius: 1.5 to 5
            const r = 1.5 + Math.random() * 3.5
            const theta = Math.random() * Math.PI * 2

            // Thin disk with slight vertical spread
            const y = (Math.random() - 0.5) * 0.2 * (r * 0.5) // thicker at edges

            positions[i * 3] = r * Math.cos(theta)
            positions[i * 3 + 1] = y
            positions[i * 3 + 2] = r * Math.sin(theta)

            // Color gradient based on distance
            const mixedColor = r < 2.5 ? color3 : (r < 3.5 ? color1 : color2)
            mixedColor.toArray(colors, i * 3)
        }
        return [positions, colors]
    }, [count])

    useFrame((state, delta) => {
        // Rotate the entire disk
        ref.current.rotation.y -= delta * 0.2
    })

    return (
        <group>
            <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    vertexColors
                />
            </Points>
        </group>
    )
}

function Stars() {
    const ref = useRef()
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 20 }))

    useFrame((state, delta) => {
        // Constant slow rotation
        ref.current.rotation.x -= delta / 30
        ref.current.rotation.y -= delta / 40

        // Mouse interaction (parallax)
        const x = state.mouse.x * 0.2
        const y = state.mouse.y * 0.2

        // Interpolate current rotation towards mouse target
        ref.current.rotation.x += (y - ref.current.rotation.x) * delta * 0.5
        ref.current.rotation.y += (x - ref.current.rotation.y) * delta * 0.5
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    )
}

function CameraRig() {
    useFrame((state) => {
        // Gentle camera sway
        state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.5
        state.camera.position.y = 2 + Math.cos(state.clock.elapsedTime * 0.1) * 0.2
        state.camera.lookAt(0, 0, 0)
    })
    return null
}
import { useState } from 'react'
