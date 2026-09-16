import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Float, Html, Line, OrbitControls, PerspectiveCamera, Sparkles, RoundedBox } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import * as THREE from 'three'
import { skills, projects, experience, certifications, social, profile, contact } from './data/content'
import './styles.css';
import Reveal from "./components/Reveal";

type Tech = { name: string; slug: string; color: string }

const techs: Tech[] = [
  { name: 'Node.js', slug: 'nodedotjs', color: '#43853d' },
  { name: 'Spring Boot', slug: 'springboot', color: '#43853d' },
  { name: 'NestJS', slug: 'nestjs', color: '#e0234e' },
  { name: 'React', slug: 'react', color: '#61dafb' },
  { name: 'PostgreSQL', slug: 'postgresql', color: '#336791' },
  { name: 'MongoDB', slug: 'mongodb', color: '#47a248' },
  { name: 'Redis', slug: 'redis', color: '#d82c20' },
  { name: 'Kafka', slug: 'apachekafka', color: '#111111' },
  { name: 'AWS', slug: 'amazonaws', color: '#ff9900' },
  { name: 'Next.js', slug: 'nextdotjs', color: '#000000' },
  { name: 'LLM / RAG', slug: 'openai', color: '#111111' },
]

const domainTech: Record<string, string[]> = {
  Backend: ['Node.js', 'NestJS', 'Express', 'gRPC', 'Spring Boot', 'Microservices'],
  DataBase: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'MySQL', 'MsSQL'],
  Messaging: ['Kafka', 'RabbitMQ', 'Redis'],
  'Cloud & Infra': ['AWS', 'Azure', 'Docker', 'Jenkins'],
  Frontend: ['React', 'Redux', 'TypeScript', 'Next.js', 'JavaScript', 'HTML', 'CSS'],
  'AI / LLM': ['LLM / RAG', 'LangChain', 'GenAI', 'Kiro', 'Claude', 'OpenAI', 'langchain.js']
}

const stackTechs: Record<string, Tech[]> = {
  Backend: [
    { name: 'Node.js', slug: 'nodedotjs', color: '#43853d' },
    { name: 'NestJS', slug: 'nestjs', color: '#e0234e' },
    { name: 'Spring Boot', slug: 'springboot', color: '#43853d' },
    { name: 'gRPC', slug: 'google', color: '#244c5a' },
  ],
  DataBase: [
    { name: 'PostgreSQL', slug: 'postgresql', color: '#336791' },
    { name: 'MongoDB', slug: 'mongodb', color: '#47a248' },
    { name: 'Redis', slug: 'redis', color: '#d82c20' },
    { name: 'Elasticsearch', slug: 'elasticsearch', color: '#005571' },
    { name: 'MySQL', slug: 'mysql', color: '#00758f' }
  ],
  Messaging: [
    { name: 'Kafka', slug: 'apachekafka', color: '#111111' },
    { name: 'RabbitMQ', slug: 'rabbitmq', color: '#ff6600' },
    { name: 'Redis Pub/Sub', slug: 'redis', color: '#d82c20' },
    { name: 'AWS SQS', slug: 'amazonwebservices', color: '#ff6600' },
  ],
  'Cloud & Infra': [
    { name: 'AWS', slug: 'amazonwebservices', color: '#ff9900' },
    { name: 'Docker', slug: 'docker', color: '#2496ed' },
    { name: 'Kubernetes', slug: 'kubernetes', color: '#326ce5' },
    { name: 'Jenkins', slug: 'jenkins', color: '#d24939' },
    { name: 'Azure', slug: 'azure', color: '#0078d4' }
  ],
  Frontend: [
    { name: 'React', slug: 'react', color: '#61dafb' },
    { name: 'TypeScript', slug: 'typescript', color: '#3178c6' },
    { name: 'Next.js', slug: 'nextdotjs', color: '#000000' },
    { name: 'Redux', slug: 'redux', color: '#764abc' },
  ],
  'AI / LLM': [
    { name: 'LLM / RAG', slug: 'huggingface', color: '#111111' },
    { name: 'LangChain', slug: 'langchain', color: '#1c3c3c' },
    { name: 'Claude', slug: 'anthropic', color: '#d97706' },
    { name: 'OpenAI', slug: 'chatgpt', color: '#111111' },
    { name: 'AWS Bedrock', slug: 'amazonwebservices', color: '#1c3c3c' },
  ],
}

function IconBadge({ tech, position, index }: { tech: Tech; position: [number, number, number]; index: number }) {
  const [failed, setFailed] = useState(false)
  return (
    <Float speed={1.1 + index * 0.08} floatIntensity={0.18} rotationIntensity={0.08}>
      <group position={position}>
        <Html center position={[0, 0.01, 0.13]} transform distanceFactor={7} style={{ pointerEvents: 'none' }}>
          <div className="tech-badge-3d">
            {!failed ? (
              <img src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color.replace('#', '')}`} alt="" onError={() => setFailed(true)} />
            ) : (
              <span className="tech-fallback">{tech.name.split(' ').map(x => x[0]).join('').slice(0, 3)}</span>
            )}
            <b>{tech.name}</b>
          </div>
        </Html>
      </group>
    </Float>
  )
}

function PortraitCard() {
  const texture = useLoader(THREE.TextureLoader, '/assets/Luvdeep-image.png')
  texture.colorSpace = THREE.SRGBColorSpace
  const group = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, 0.06, delta * 2)
  })

  return (
    <Float speed={1.15} floatIntensity={0.2} rotationIntensity={0.04}>
      <group ref={group} position={[0, 2.55, 0.15]}>
        <mesh position={[0, 0, -0.08]}>
          <RoundedBox args={[2.05, 1.72, 0.16]} radius={0.2} smoothness={6} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.16} metalness={0.1} transmission={0.12} transparent opacity={0.96} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[1.9, 1.46]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
        <Html center position={[0, -1.92, 0.08]} transform distanceFactor={7} style={{ pointerEvents: 'none' }}>
          <div className="portrait-caption-3d"><span>Luvdeep Katyal</span><b>SENIOR SOFTWARE ENGINEER</b></div>
        </Html>
      </group>
    </Float>
  )
}

function EngineeringCore({ active, showAll = false }: { active: string; showAll?: boolean }) {
  const core = useRef<THREE.Group>(null)
  const rings = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  useFrame((_, delta) => {
    if (!core.current || !rings.current) return
    core.current.rotation.y = THREE.MathUtils.lerp(core.current.rotation.y, pointer.x * 0.22, delta * 2)
    core.current.rotation.x = THREE.MathUtils.lerp(core.current.rotation.x, -pointer.y * 0.08, delta * 2)
    rings.current.rotation.z += delta * 0.08
    rings.current.rotation.y -= delta * 0.11
  })

  const visibleTech: Tech[] = useMemo(() => {
    if (showAll) return techs
    return stackTechs[active] ?? stackTechs.Backend ?? []
  }, [active, showAll])
  const iconPositions: [number, number, number][] = showAll
    ? [[-2.45, 0.45, 0.05], [-1.55, 1.45, 0.1], [-0.25, 1.85, 0.12], [1.15, 1.55, 0.1], [2.35, 0.65, 0.05], [2.15, -0.55, 0.05], [0.95, -1.0, 0.1], [-0.45, -1.25, 0.1], [-1.7, -0.85, 0.05], [-2.55, -0.35, 0.05]]
    : [[-2.15, 0.65, 0.1], [-1.05, 1.35, 0.1], [1.05, 1.35, 0.1], [2.15, 0.65, 0.1]]

  return (
    <group ref={core}>
      <PortraitCard />

      <group ref={rings} position={[0, -0.35, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.65, 0.025, 12, 96]} />
          <meshBasicMaterial color="#75a9f3" transparent opacity={0.7} />
        </mesh>
        <mesh rotation={[Math.PI / 2.3, 0.25, 0]}>
          <torusGeometry args={[1.9, 0.012, 10, 96]} />
          <meshBasicMaterial color="#b8d3f7" transparent opacity={0.8} />
        </mesh>
        <mesh rotation={[Math.PI / 2.8, -0.35, 0.15]}>
          <torusGeometry args={[2.2, 0.009, 10, 96]} />
          <meshBasicMaterial color="#9fc4f4" transparent opacity={0.55} />
        </mesh>
      </group>

      <Float speed={1.15} rotationIntensity={0.12} floatIntensity={0.12}>
        <group position={[0, -0.35, 0]}>
          <mesh position={[0, 0.42, 0]}>
            <cylinderGeometry args={[1.08, 1.16, 0.3, 64]} />
            <meshPhysicalMaterial color="#e8f3ff" roughness={0.18} metalness={0.35} transmission={0.2} />
          </mesh>
          <mesh position={[0, 0.68, 0]}>
            <cylinderGeometry args={[0.82, 0.98, 0.22, 64]} />
            <meshPhysicalMaterial color="#8fc0ff" roughness={0.12} metalness={0.5} emissive="#377fe0" emissiveIntensity={0.25} />
          </mesh>
          <mesh position={[0, 0.88, 0]}>
            <boxGeometry args={[1.05, 0.2, 1.05]} />
            <meshPhysicalMaterial color="#d9eaff" roughness={0.14} metalness={0.55} emissive="#4d91ed" emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[0, 1.02, 0]}>
            <octahedronGeometry args={[0.34, 1]} />
            <meshPhysicalMaterial color="#ffffff" roughness={0.1} metalness={0.25} emissive="#38bdf8" emissiveIntensity={1.3} />
          </mesh>
        </group>
      </Float>

      {visibleTech.map((tech, i) => {
        const p = iconPositions[i]
        return (
          <React.Fragment key={`${active}-${tech.name}`}>
            <IconBadge tech={tech} position={p} index={i} />
            <Line points={[[0, 0.25, 0], p]} color="#8eb8ed" transparent opacity={0.45} lineWidth={1} />
          </React.Fragment>
        )
      })}

      <Sparkles count={90} scale={7} size={2} speed={0.22} color="#76aaf2" />
    </group>
  )
}

function HeroCanvas({ active = 'Backend', className = '', showAll = false }: { active?: string; className?: string; showAll?: boolean }) {
  // Check if mobile to dynamically adjust distance & field of view
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <Canvas className={className} data-lenis-prevent-wheel dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      {/* 
        1. Back up Z-distance: 10.5 on desktop, 13.5 on mobile (prevents zoom-in)
        2. Raise Y to ~1.1 to vertically align with the center of the portrait & core
      */}
      <PerspectiveCamera 
        makeDefault 
        position={[0, 1.1, isMobile ? 13.5 : 10.5]} 
        fov={isMobile ? 42 : 36} 
      />

      <ambientLight intensity={1.8} />
      <directionalLight position={[4, 5, 4]} intensity={3.2} />
      <pointLight position={[0, 2, 3]} intensity={2.5} color="#72a9ff" />

      <EngineeringCore active={active} showAll={showAll} />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        // Set target to the visual center (y = 1.1) so rotation pivots symmetrically
        target={[0, 1.1, 0]}
        minDistance={6.0}
        maxDistance={15.0}
        enableDamping
        dampingFactor={0.07}
        autoRotate
        autoRotateSpeed={0.18}
        rotateSpeed={0.7}
      />
    </Canvas>
  )
}

function App() {
  const [active, setActive] = useState('Backend')
  const [project, setProject] = useState<typeof projects[number] | null>(null)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let raf = 0
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])

  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  return <div className="app">
    <header className="nav">
      <button className="brand" onClick={() => go('home')}>Luvdeep Katyal<span>•</span></button>
      <nav className={menu ? 'open' : ''}>{['home', 'experience', 'skills', 'ai', 'about', 'contact-email'].map(x => <button key={x} onClick={() => go(x)}>{x === 'home' ? 'Home' : x[0].toUpperCase() + x.slice(1)}</button>)}</nav>
      <button className="build" onClick={() => go('contact-email')}>Let’s Build <span>↗</span></button>
      <button className="hamb" onClick={() => setMenu(!menu)}>{menu ? '×' : '☰'}</button>
    </header>

    <main>
      <section id="home" className="hero section">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse" /> SENIOR SOFTWARE ENGINEER</div>
          <h1>I BUILD<br /><em>SYSTEMS</em><br />THAT SCALE.</h1>
          <p className="role">Backend Architecture · Distributed Systems · AI/LLM Engineering</p>
          <p className="lead">8+ years turning complex requirements into scalable APIs, microservices and production systems — now extending that engineering mindset into intelligent applications.</p>
          <div className="actions"><a className="primary" href="/resume.pdf">View Resume ↓</a></div>
          <div className="socials"><a href={social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={social.github} target="_blank" rel="noreferrer">GitHub</a><a href={social.medium} target="_blank" rel="noreferrer">Medium</a></div>
        </div>
        <div className="hero-visual">
          <div className="visual-grid" />
          <HeroCanvas active={active} showAll />
          <div className="hint">DRAG TO ROTATE · SCROLL TO ZOOM</div>
        </div>
      </section>

      <section className="intro section">
        <div className="section-kicker">THE MINDSET</div>
        <div className="split"><h2>I DON'T JUST WRITE CODE.<br /><span>I DESIGN THE SYSTEM AROUND IT.</span></h2><div className="cap-grid"><article><b>01</b><h3>BUILD</h3><p>Production-grade APIs & services that are modular, secure and built for scale.</p></article><article><b>02</b><h3>SCALE</h3><p>Distributed systems, databases, caching, queues and performance-minded architecture.</p></article><article><b>03</b><h3>EVOLVE</h3><p>RAG, LLM tooling and intelligent application architecture with engineering discipline.</p></article></div></div></section>
      <section id="experience" className="experience section"><div className="section-kicker">EXPERIENCE</div><h2>8+ YEARS<br /><span>OF SHIPPING.</span></h2><div className="timeline">{experience.map((e, i) => <motion.div className="milestone" key={e.year} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={{ delay: i * .08 }}><div className="year">{e.year}</div><div className="dot" /><div><h3>{e.company}</h3><p>{e.role} · {e.city}</p></div></motion.div>)}</div></section>

      <section id="skills" className="skills section"><div className="section-kicker">ENGINEERING STACK</div><div className="section-head"><h2>TOOLS THAT<br /><span>BUILD THE SYSTEM.</span></h2><p>Drag to rotate · wheel to zoom · click a domain to change the architecture.</p></div><div className="skills-layout"><div className="skill-canvas"><HeroCanvas active={active} /><div className="canvas-title">INTERACTIVE ENGINEERING CORE</div></div><div className="skill-list">{Object.keys(skills).map(k => <button className={active === k ? 'selected' : ''} key={k} onClick={() => setActive(k)}><span>{k}</span><b>↗</b></button>)}<div className="skill-detail"><div className="detail-top"><span>ACTIVE DOMAIN</span><b>{active}</b></div><div className="skill-chips">{skills[active as keyof typeof skills].map(s => <span key={s}>{s}</span>)}</div></div></div></div></section>

      <section id="ai" className="ai section"><div className="section-kicker">THE NEXT LAYER</div><div className="ai-copy"><h2>FROM DETERMINISTIC<br /><span>TO INTELLIGENT.</span></h2><p>The same engineering mindset, extended into AI — connecting application architecture with retrieval, context and LLM reasoning.</p></div><div className="rag"><div className="rag-core"><div className="brain">AI</div></div>{['APPLICATION', 'DATA', 'RETRIEVAL', 'RAG', 'LLM', 'INTELLIGENCE'].map((x, i) => <div className="rag-step" key={x} style={{ '--i': i } as React.CSSProperties}><span>0{i + 1}</span>{x}</div>)}</div><div className="credential"><div className="cred-mark">✦</div><div><span>AI CREDENTIAL</span><h3>Claude Certified Developer — Foundations</h3><a href={social.claude} target="_blank" rel="noreferrer">View</a><p>Issued Sep 06, 2026 · Expires Sep 06, 2027</p></div></div></section>

      <section className="proof section"><div className="section-kicker">PROOF OF LEARNING</div><h2>KEEP LEARNING.<br /><span>KEEP BUILDING.</span></h2><div className="cert-grid">{certifications.map((c, i) => <motion.article key={c[0]} whileHover={{ rotateX: 4, rotateY: -4, y: -5 }} className={i === 0 ? 'featured' : ''}><span className="cert-index">0{i + 1}</span><div className="cert-icon">◇</div><small>{c[1]}</small><h3>{c[0]}</h3><p>{c[2]}</p></motion.article>)}</div></section>

      <section id="about" className="about section"><div className="section-kicker">ABOUT</div><div className="about-grid"><div><h2>ENGINEER.<br />BUILDER.<br /><span>CONSTANT LEARNER.</span></h2></div><div className="about-copy"><img src="/assets/Luvdeep-image.png" alt="Luvdeep" /><p>I’m a Senior Software Engineer with 8+ years of experience building scalable software systems.</p><p>My work has taken me from backend APIs and databases to microservices, distributed systems, cloud infrastructure and intelligent applications.</p></div></div></section>

      <section id="contact" className="contact section"><div className="contact-core"><div className="orb" /><div className="section-kicker"> LET'S CONNECT</div><h2>BUILD SOMETHING<br /><span>WORTH SCALING.</span></h2><p>Whether you’re building a distributed platform, modernizing a backend or exploring what’s possible with AI — let’s talk.</p><div className="contact-actions"><a href={social.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={social.github} target="_blank" rel="noreferrer">GitHub ↗</a></div><div className="final-line">CODE <span>→</span> SYSTEMS <span>→</span> INTELLIGENCE</div></div></section>
    
    <section id="contact-email" className="section section-contact">
      <div className="container">
        <Reveal as="h2" className="contact-heading">
          {contact.heading}
        </Reveal>
        <Reveal as="p" className="contact-sub" delay={60}>
          {contact.sub}
        </Reveal>
        <Reveal delay={120}>
          <span>Reach out at</span><br/>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </Reveal>

       
      </div>
    </section>
    
    </main>
     <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.location}</span>
      </div>
    </footer>
    <AnimatePresence>{project && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setProject(null)}><motion.div className="modal" initial={{ y: 30, scale: .98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: .98 }} onClick={e => e.stopPropagation()}><button className="close" onClick={() => setProject(null)}>×</button><div className="micro">SYSTEM / {project.id.toUpperCase()}</div><h2>{project.title}</h2><p>{project.desc}</p><div className="flow">{project.flow.map((f, i) => <React.Fragment key={f}><div className="flow-node"><span>0{i + 1}</span>{f}</div>{i < project.flow.length - 1 && <div className="flow-arrow">↓</div>}</React.Fragment>)}</div></motion.div></motion.div>}</AnimatePresence>
  </div>
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
