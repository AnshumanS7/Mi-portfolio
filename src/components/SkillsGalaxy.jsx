import { useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Billboard, Text, Image } from '@react-three/drei'
import * as THREE from 'three'
import { resume } from '../data/resumeData'

// Map skill names to Devicon URLs
const iconMap = {
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'React.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'Express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'Kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    'Jenkins': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
    'AWS': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    'CI/CD': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg',
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'VS Code': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    'IntelliJ': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg',
    'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
    'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'TailwindCSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
}

function Icon({ url, position, name }) {
    const ref = useRef()
    const [hovered, setHover] = useState(false)

    useFrame((state, delta) => {
        // Smooth hover scaling
        if (ref.current) {
            ref.current.scale.lerp(new THREE.Vector3(hovered ? 1.4 : 1, hovered ? 1.4 : 1, 1), 0.1)
        }
        // Change cursor
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    })

    return (
        <Billboard position={position}>
            <group ref={ref}>
                <Image
                    url={url}
                    transparent
                    scale={[2, 2]}
                    grayscale={hovered ? 0 : 1}
                    onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
                    onPointerOut={() => setHover(false)}
                />
                <Text
                    position={[0, -1.4, 0]}
                    fontSize={0.5}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    fillOpacity={hovered ? 1 : 0}
                >
                    {name}
                </Text>
            </group>
        </Billboard>
    )
}

function Cloud({ count = 4, radius = 20 }) {
    const icons = useMemo(() => {
        const temp = []
        const spherical = new THREE.Spherical()

        // Flatten all skills 
        const allSkills = [
            ...resume.skills.languages,
            ...resume.skills.frameworks,
            ...resume.skills.devops,
            ...resume.skills.databases,
            ...resume.skills.tools,
            ...resume.skills.styling,
        ]

        for (let i = 0; i < allSkills.length; i++) {
            const skillName = allSkills[i]
            const url = iconMap[skillName]
            if (url) {
                spherical.set(radius, Math.acos(THREE.MathUtils.randFloatSpread(2)), THREE.MathUtils.randFloatSpread(360))
                const pos = new THREE.Vector3().setFromSpherical(spherical)
                temp.push([pos, url, skillName])
            }
        }
        return temp
    }, [count, radius])
    return icons.map(([pos, url, name], index) => <Icon key={index} position={pos} url={url} name={name} />)
}

export default function SkillsGalaxy() {
    return (
        <div className="relative group mt-10">
            {/* Colorful gradient border/glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-70 blur-sm group-hover:opacity-100 transition duration-500 group-hover:blur-md" />

            <div className="relative h-[600px] w-full rounded-2xl overflow-hidden bg-slate-900/90 backdrop-blur-xl border border-white/10">
                <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
                    <fog attach="fog" args={['#000', 0, 80]} />
                    <ambientLight intensity={1} />
                    <Stars />
                    <Cloud count={8} radius={22} />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
                </Canvas>
            </div>
        </div>
    )
}
