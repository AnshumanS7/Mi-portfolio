import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

export default function QuantumField() {
    return (
        <div className="fixed inset-0 w-full h-full -z-10 bg-slate-950">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ParticleWave />
            </Canvas>
        </div>
    )
}

function ParticleWave(props) {
    const ref = useRef()
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))

    useFrame((state, delta) => {
        // Constant gentle flow
        ref.current.rotation.x -= delta / 15
        ref.current.rotation.y -= delta / 20

        // Breathing effect (expansion/contraction)
        const t = state.clock.elapsedTime
        const s = 1 + Math.sin(t * 0.5) * 0.05
        ref.current.scale.set(s, s, s)

        // Mouse Interaction (Parallax Tilt)
        const x = state.mouse.x * 0.2
        const y = state.mouse.y * 0.2

        // Smoothly interpolate rotation towards mouse position
        ref.current.rotation.x += (y - ref.current.rotation.x) * delta * 0.2
        ref.current.rotation.y += (x - ref.current.rotation.y) * delta * 0.2
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#60a5fa" // Blue-400 (Cyan-ish)
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={2} // AdditiveBlending
                />
            </Points>
        </group>
    )
}
