import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import { Points, PointMaterial } from '@react-three/drei'

function Stars({ mouse }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const p = new Float32Array(3000)
    for (let i = 0; i < 3000; i++) p[i] = (Math.random() - 0.5) * 6
    return p
  }, [])
  useFrame((state) => {
    const x = (mouse.current.x - 0.5) * 0.2
    const y = (mouse.current.y - 0.5) * -0.2
    ref.current.rotation.x += 0.0008 + y * 0.002
    ref.current.rotation.y += 0.001 + x * 0.002
  })
  return (
    <group rotation={[0, 0, Math.PI / 8]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#a78bfa"
          size={0.01}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

export default function BackgroundFX() {
  const mouse = useRef({ x: 0.5, y: 0.5 })
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      onMouseMove={(e) => {
        mouse.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
      }}
    >
      <Canvas camera={{ position: [0, 0, 3] }}>
        <Stars mouse={mouse} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
    </div>
  )
}
