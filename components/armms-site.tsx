'use client'

import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  BrainCircuit,
  Check,
  Copy,
  Cpu,
  Menu,
  MoveRight,
  Network,
  Radio,
  Settings2,
  Wrench,
  X,
} from 'lucide-react'

const joinUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSd4JSOaJXuagxt5x-fU-nzsQc2FaBTK4yFw_QftLPHgGHPEUQ/viewform?pli=1&utm_source=ig&utm_medium=social&utm_content=link_in_bio'
const principles = [
  ['01', 'INNOVATE', 'Question the obvious and explore frontier tech.'],
  ['02', 'ENGINEER', 'Convert theoretical ideas into physical systems.'],
  ['03', 'BUILD', 'Learn through hands-on laboratory creation.'],
  ['04', 'EXPERIMENT', 'Test, iterate, debug, and perfect.'],
]

const events = {
  buildFest: [
    ['FIRST POSITION', 'Team Glare Guardians', 'Gurbani Kaur, Niyati Seth, Vanshika Marwaha, Akshdeep Kaur'],
    ['SECOND POSITION', 'Team Ecopioneers', 'Sehajpreet Kaur, Arshnoor Kaur, Harjee Singh, Ustat Chhabra'],
    ['THIRD POSITION', 'Team BloomTech', 'Devshi, Harmanpreet, Suhani'],
  ],
  techtales: [
    {
      episode: 'EPISODE 1',
      title: 'UAVs and AI-Driven Applications in Aerial Technologies',
      speaker: 'MD Azizul Islam Junaid',
      speakerRole: 'Drone Avionics & Embedded AI Specialist',
      date: '17.FEB.2026',
      time: '3:00 P.M. ONWARDS',
      venue: 'UIT Building, Room No. 426',
      image: '/techtales-ep1.png',
      summary: 'An intensive session on modern aerial robotics, autonomous drone flight controllers, and edge computer vision integration.',
      topicsCovered: [
        'Multi-rotor aerodynamics, brushless motors, and electronic speed control (ESC) architectures.',
        'Interfacing onboard companion computers (Raspberry Pi / Jetson) with flight controllers (Pixhawk / ArduPilot).',
        'Running real-time YOLO object detection models for autonomous aerial target tracking.',
        'Autonomous waypoint navigation, mission planning, and optical-flow stabilization.',
        'Real-world case studies: Precision agriculture crop surveillance, search-and-rescue grids, and industrial infrastructure inspection.',
      ],
      keyTakeaways: 'Students gained an end-to-end understanding of how to architect, solder, calibrate, and program an AI-assisted autonomous drone from scratch.',
    },
    {
      episode: 'EPISODE 2',
      title: 'Introduction to 3D Printing and Additive Manufacturing',
      speaker: 'Gavish Sharma',
      speakerRole: 'Additive Manufacturing & CAD Lead // ARMSS',
      date: '1.APRIL.2026',
      time: '1:00 P.M. ONWARDS',
      venue: 'UIT Building, Room No. 113',
      image: '/techtales-ep2.png',
      summary: 'A deep-dive workshop exploring how additive manufacturing transforms digital CAD blueprints into functional physical engineering prototypes.',
      topicsCovered: [
        'Core FDM (Fused Deposition Modeling) mechanics: hotend thermodynamics, extruder calibration, and stepper precision.',
        'Design for Additive Manufacturing (DfAM) in Fusion 360 & SolidWorks: tolerances, wall thickness, and overhang design rules.',
        'Slicing software mastery (Cura / PrusaSlicer): infill geometries (gyroid vs cubic), layer heights, print speed, and support optimization.',
        'Filament material science: PLA for rapid prototyping, PETG for mechanical toughness, ABS for high-temp resistance, and TPU for flexible gaskets.',
        'Live troubleshooting: Bed leveling, warping prevention, stringing elimination, and post-processing techniques.',
      ],
      keyTakeaways: 'Participants learned how to take an idea from a blank CAD canvas to a finished, dimensionally accurate 3D printed mechanical assembly.',
    },
    {
      episode: 'EPISODE 3',
      title: 'Cybersecurity Workshop',
      speaker: 'Harsh Dev',
      speakerRole: 'Cybersecurity Researcher & Systems Lead // ARMSS',
      date: '6.APRIL.2026',
      time: '1:00 P.M. ONWARDS',
      venue: 'UIT Building, Room No. 113',
      image: '/techtales-ep3.png',
      summary: 'A practical, hands-on workshop on securing connected hardware, modern computer networks, and defensive cybersecurity practices.',
      topicsCovered: [
        'Fundamentals of network topology, packet inspection, and protocol analysis using Wireshark.',
        'Hardware & IoT security: vulnerabilities in unencrypted ESP32/ESP8266 telemetry, MQTT brokers, and default credentials.',
        'Understanding attack vectors: Man-in-the-Middle (MitM), packet spoofing, port scanning, and buffer overflows.',
        'Securing embedded firmware: Cryptographic handshakes, TLS/SSL certificate verification, and secure bootloaders.',
        'Live demonstration of ethical penetration testing, vulnerability discovery, and hardening techniques.',
      ],
      keyTakeaways: 'Students learned essential penetration testing methodologies and how to build robust, secure-by-design IoT and software systems.',
    },
  ],
}

const domains = [
  { n: '01', title: 'ARTIFICIAL INTELLIGENCE', text: 'Models, computer vision, data, and intelligent edge systems.', icon: BrainCircuit, tech: ['AI', 'ML', 'DL'] },
  { n: '02', title: 'ROBOTICS', text: 'Sensors, control systems, autonomous machines, and kinematics.', icon: Cpu, tech: ['ROS 2', 'Gazebo', 'Kinematics', 'SLAM'] },
  { n: '03', title: 'MECHANICAL ENGINEERING', text: 'CAD, mechanisms, materials, simulation, and fabrication.', icon: Wrench, tech: ['SolidWorks', 'Fusion 360', 'CFD', '3D Printing'] },
  { n: '04', title: 'AUTOMATION & IoT', text: 'Embedded microcontrollers, telemetry, and smart sensor buses.', icon: Settings2, tech: ['ESP32', 'Arduino', 'Raspberry Pi', 'NVIDIA Jetson'] },
]

const labHardware = [
  { id: 'HW-01', name: 'Raspberry Pi 5', category: 'Compute & Vision', specs: '8GB RAM · 2.4GHz · Dual 4K @60Hz', image: '/device-6.png', status: 'ACTIVE IN LAB' },
  { id: 'HW-02', name: 'Arduino Nano', category: 'Microcontrollers', specs: 'ATmega328P · 16MHz · 14 Digital I/O · Mini USB', image: '/device-1.png', status: 'ACTIVE IN LAB' },
  { id: 'HW-03', name: 'Soil Moisture Sensor', category: 'Sensors', specs: 'Capacitive Sensing · Analog Output · Environmental Monitoring', image: '/device-2.png', status: 'ACTIVE IN LAB' },
  { id: 'HW-04', name: 'I2C 1602 LCD Display', category: 'Telemetry Displays', specs: '16×2 Characters · I2C Serial Interface · Backlit', image: '/device-4.png', status: 'ACTIVE IN LAB' },
  { id: 'HW-05', name: 'ESP8266 Wi-Fi Module', category: 'Microcontrollers', specs: '802.11 b/g/n · Integrated TCP/IP Stack · GPIO Pins', image: '/device-5.png', status: 'ACTIVE IN LAB' },
  { id: 'HW-06', name: '0.96\" OLED I2C Display', category: 'Telemetry Displays', specs: '128×64 Pixels · SSD1306 Driver · Fast Graphic Telemetry', image: '/device-7.png', status: 'ACTIVE IN LAB' },
  { id: 'HW-07', name: 'Pratham 3.0 3D Printer', category: 'Additive Fabrication', specs: '300×300×300mm Build Volume · Rapid Prototyping', image: '/device-3d-printer.png', status: 'ACTIVE IN LAB' },
]

const workshopGallery = {
  ros: { title: 'ROS Workshop', label: 'ROBOT OPERATING SYSTEM', images: ['/ros-workshop-classroom.jpeg', '/ros-workshop-presentation.jpeg', '/ros-workshop-group.jpeg', '/ros-workshop-award.jpeg'] },
  uav: { title: 'UAV Workshop', label: 'AERIAL SYSTEMS', images: ['/uav-workshop-team.jpeg', '/uav-workshop-soldering.jpeg', '/uav-workshop-build.jpeg', '/uav-workshop-drone.jpeg'] },
  devices: { title: '7 Days 7 Electronic Devices', label: 'ELECTRONIC DEVICES', images: ['/device-esp32.png', '/device-relay.png', '/device-esp8266.png', '/device-ultrasonic.png', '/device-arduino-nano.png', '/device-lcd-controller.png', '/device-soil-moisture.png'] },
}

const domainDetails: Record<string, { description: string; tools: string; areas: string }> = {
  'ARTIFICIAL INTELLIGENCE': { description: 'Build systems that learn from data, interpret sensory feeds, and make autonomous decisions.', tools: 'Python, OpenCV, YOLO, PyTorch, Edge TPU, ONNX', areas: 'Generative AI · Autonomous Vision · Edge AI · NLP' },
  'ROBOTICS': { description: 'Design machines that sense, calculate kinematics, and move through physical environments with precision.', tools: 'ROS 2 Humble, Gazebo, LiDAR, PID Controllers, Kinematics', areas: 'Autonomous Navigation · Mechatronics · Motion Planning' },
  'MECHANICAL ENGINEERING': { description: 'Transform raw physics into functional prototypes through additive manufacturing and stress analysis.', tools: 'Fusion 360, SolidWorks, 3D Printing, ANSYS, CNC Fabrication', areas: 'Robotic Chassis · Additive Manufacturing · Structural Simulation' },
  'AUTOMATION & IoT': { description: 'Bridge sensors and edge compute to create reactive, reliable, and distributed embedded ecosystems.', tools: 'ESP32, C/C++, FreeRTOS, MQTT, Node-RED, Embedded C', areas: 'Smart Hardware · Remote Telemetry · Industrial Control' },
}

const team: { name: string; role: string }[] = [
  { name: 'Gavish Sharma', role: 'Head' },
  { name: 'Harsh Dev', role: 'Head' },
  { name: 'Mansimar Singh', role: 'Head Coordinator' },
  { name: 'Devshi Khehra', role: 'Head Coordinator' },
  { name: 'Suhani Mahajan', role: 'Head Coordinator' },
  { name: 'Ridhi Gandhi', role: 'Head Coordinator' },
]
const faqs = [
  ['Who can join ARMSS?', 'Any student curious about AI, robotics, mechanical engineering, or hardware prototyping can join. No prior experience is required; we teach and build together.'],
  ['Do I need my own hardware or tools?', 'No. ARMSS provides shared access to microcontrollers, sensors, 3D printers, soldering benches, and labs for workshops and project teams.'],
  ['How do I join a project or research track?', 'Attend our workshops, meet the leads, and let us know what you are curious about. We match you with active development pods.'],
]

function Mark({ light = false }: { light?: boolean }) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${light ? 'text-white' : 'text-[#07152f]'}`}>
      <img
        src={light ? '/armss-emblem-light.png' : '/armss-emblem.png'}
        alt="ARMSS Logo Emblem"
        className="h-10 w-10 sm:h-11 sm:w-11 object-contain shrink-0 mb-1 drop-shadow-xs"
      />
      <div className="flex flex-col items-center text-center leading-none">
        <span className={`font-mono text-[7.5px] sm:text-[8.5px] font-extrabold tracking-[0.05em] uppercase ${light ? 'text-white' : 'text-[#07152f]'}`}>
          ARTIFICIAL INTELLIGENCE, ROBOTICS,
        </span>
        <span className={`font-mono text-[7px] sm:text-[8px] font-extrabold tracking-[0.05em] uppercase mt-[1.5px] ${light ? 'text-[#60a5fa]' : 'text-[var(--blue)]'}`}>
          AND MECHANICAL STUDENT SOCIETY
        </span>
      </div>
    </div>
  )
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    ['About', 'about'],
    ['Domains', 'domains'],
    ['Hardware Lab', 'hardware-lab'],
    ['Workshops', 'workshops'],
    ['TechTales', 'techtales'],
    ['Membership', 'membership'],
    ['Team', 'team'],
  ]

  return (
    <header className="navbar">
      <div className="shell flex min-h-[86px] py-2 items-center justify-between">
        <a href="#home" aria-label="ARMSS home" className="flex items-center hover:opacity-90 transition-opacity">
          <Mark />
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="nav-link">
              {label}
            </a>
          ))}
        </nav>
        <a href={joinUrl} target="_blank" rel="noopener noreferrer" className="button button-blue hidden md:inline-flex">
          JOIN ARMSS <ArrowUpRight size={16} />
        </a>
        <button className="lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="mobile-menu lg:hidden">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
              <MoveRight size={16} />
            </a>
          ))}
          <a href={joinUrl} target="_blank" rel="noopener noreferrer">
            JOIN ARMSS <ArrowUpRight size={16} />
          </a>
        </div>
      )}
    </header>
  )
}

function MovingRadarLogo() {
  const [showGndu, setShowGndu] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true)
      setTimeout(() => {
        setShowGndu((prev) => !prev)
        setTimeout(() => setTransitioning(false), 600)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 radar-outer">
      {/* Outer subtle tech pulse ring */}
      <div className="absolute inset-0 rounded-full border border-[var(--blue)] opacity-20 animate-ping" />
      {/* Middle rotating dashed ring */}
      <div className="absolute w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full border border-dashed border-[var(--blue)] opacity-35 animate-spin [animation-duration:24s]" />
      {/* Connection glow — pulses during transition */}
      <div className={`absolute w-32 h-32 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full transition-all duration-700 pointer-events-none ${transitioning ? 'radar-connection-glow-active' : 'radar-connection-glow'}`} />
      {/* Inner radar circle */}
      <div className="relative w-36 h-36 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full border border-[var(--blue)] radar-inner-bg flex items-center justify-center shadow-xl overflow-hidden">
        {/* Radar beam sweep */}
        <div className="radar-sweep" />
        {/* Pulsing scan dot on sweep line */}
        <div className="radar-scan-dot" />
        {/* Opaque backing to hide radar elements behind logos */}
        <div className="absolute w-[78%] h-[78%] rounded-full bg-[var(--paper)] z-[8]" />
        {/* Shared logo background ring */}
        <div className="absolute radar-logo-ring animate-spin [animation-duration:30s] z-[9]" />
        {/* ARMSS Logo */}
        <img
          src="/armss-emblem.png"
          alt="ARMSS Logo Emblem"
          className={`absolute radar-logo-size object-contain z-10 drop-shadow-md transition-all duration-1000 ${
            showGndu ? 'opacity-0 scale-[0.85] blur-[3px]' : 'opacity-100 scale-100 blur-0'
          }`}
        />
        {/* GNDU Logo — transparent background, same size as ARMSS */}
        <img
          src="/gndu-logo-transparent.png"
          alt="GNDU Logo"
          className={`absolute radar-logo-size-gndu object-contain z-10 drop-shadow-md transition-all duration-1000 ${
            showGndu ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[0.85] blur-[3px]'
          }`}
        />
        {/* Crosshairs */}
        <div className="absolute w-full h-[1px] bg-[var(--blue)] opacity-15 pointer-events-none" />
        <div className="absolute h-full w-[1px] bg-[var(--blue)] opacity-15 pointer-events-none" />
      </div>
      {/* Logo label below radar */}
      <div className="mt-2 radar-label-container">
        <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.15em] text-[var(--blue)] uppercase transition-all duration-700">
          {showGndu ? 'GNDU — GURU NANAK DEV UNIVERSITY' : 'ARMSS — STUDENT SOCIETY'}
        </span>
      </div>
      {/* Thumbnail pair — both logos visible together */}
      <div className="flex items-center gap-2 mt-2 opacity-60">
        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[var(--blue)] flex items-center justify-center transition-all duration-500 ${!showGndu ? 'border-[var(--blue)] shadow-[0_0_6px_rgba(36,87,255,0.4)] opacity-100' : 'opacity-50'}`}>
          <img src="/armss-emblem.png" alt="ARMSS" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
        </div>
        <span className="font-mono text-[7px] text-[var(--blue)] font-bold">↔</span>
        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[var(--blue)] flex items-center justify-center transition-all duration-500 ${showGndu ? 'border-[var(--blue)] shadow-[0_0_6px_rgba(36,87,255,0.4)] opacity-100' : 'opacity-50'}`}>
          <img src="/gndu-logo-transparent.png" alt="GNDU" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="home" className="hero">
      {/* Animated background gradient */}
      <div className="hero-gradient" />
      {/* Floating particle dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-dot" style={{ left: '10%' }} />
        <div className="floating-dot" style={{ left: '20%' }} />
        <div className="floating-dot" style={{ left: '35%' }} />
        <div className="floating-dot" style={{ left: '50%' }} />
        <div className="floating-dot" style={{ left: '65%' }} />
        <div className="floating-dot" style={{ left: '78%' }} />
        <div className="floating-dot" style={{ left: '88%' }} />
        <div className="floating-dot" style={{ left: '95%' }} />
      </div>
      {/* Drifting glow orb */}
      <div className="hero-glow" style={{ top: '10%', right: '5%' }} />
      <div className="shell hero-inner">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8 pt-4">
          <Reveal className="max-w-2xl">
            <p className="section-kicker">
              ARMSS / GNDU <span />
            </p>
            <h1 className="hero-title">
              ARMSS<em>.</em>
            </h1>
            <p className="hero-copy">
              Artificial Intelligence, Robotics &amp; Mechanical Engineering Student Society.
            </p>
            <div className="hero-subline">
              <span>GNDU / AMRITSAR</span>
              <span className="font-mono text-xs font-bold text-blue flex items-center gap-1.5">
                <span className="pulse-beacon" /> 100+ ACTIVE BUILDERS
              </span>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={joinUrl} target="_blank" rel="noopener noreferrer" className="button button-blue">
                JOIN ARMSS <ArrowUpRight size={17} />
              </a>
              <a href="#about" className="button button-outline">
                EXPLORE LAB <MoveRight size={17} />
              </a>
            </div>
          </Reveal>
          <div className="flex items-center justify-center">
            <MovingRadarLogo />
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="arrow" />
      </div>
    </section>
  )
}

export function TechStatsStrip() {
  const stats = [
    {num: '100+',
    label: 'Active Student Builders' },
    { num: '04', label: 'Core Engineering Domains' },
    { num: '20+', label: 'Hardware Lab Items' },
    { num: '03', label: 'TechTales Sessions' },
    { num: '100%', label: 'Hands-on Practical R&D' },
  ]

  return (
    <div className="tech-stat-strip">
      <div className="shell">
        <div className="grid grid-cols-2 md:grid-cols-5">
          {stats.map((s, i) => (
            <div key={i} className="tech-stat-item flex flex-col justify-center">
              <span className="tech-stat-num">{s.num}</span>
              <span className="font-mono text-[11px] text-white/70 tracking-wider uppercase mt-1">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="section section-light reveal-section">
      <div className="shell">
        <Reveal>
          <p className="section-kicker">
            01 / ABOUT <span />
          </p>
        </Reveal>
        <div className="about-grid">
          <Reveal>
            <h2 className="display-title">
              MORE THAN
              <br />
              <em>A SOCIETY.</em>
            </h2>
          </Reveal>
          <Reveal>
            <p className="lead-copy">A place to turn raw curiosity into tangible capability.</p>
            <p className="body-copy">
              ARMSS brings together students who want to learn beyond the classroom, engineer real-world hardware, and build across disciplines. From intelligent vision models and ROS robotics to CAD simulation and embedded microcontrollers. Start anywhere. Build with us.
            </p>
          </Reveal>
        </div>
        <div className="principles">
          {principles.map(([n, title, text]) => (
            <div className="principle relative" key={n}>
              <span className="tech-corner-plus tech-corner-tr">+</span>
              <span className="principle-num">{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DomainModal({ domain, onClose }: { domain: (typeof domains)[number]; onClose: () => void }) {
  const detail = domainDetails[domain.title] || {
    description: domain.text,
    tools: domain.tech ? domain.tech.join(', ') : 'Engineering & Development Tools',
    areas: 'Research, Prototyping & Field Testing',
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      className="interactive-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="domain-modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="domain-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-4">
          <span className="meta text-blue font-mono font-bold">DOMAIN / {domain.n}</span>
          <button
            className="modal-close"
            aria-label="Close domain details"
            onClick={onClose}
            type="button"
          >
            <X size={15} /> <span>CLOSE [ESC]</span>
          </button>
        </div>
        <h2 id="domain-modal-title" className="text-navy">{domain.title}</h2>
        <p className="modal-lead text-navy">{detail.description}</p>
        <div className="modal-detail-grid">
          <div>
            <span className="meta text-blue">CORE STACK &amp; TOOLS</span>
            <p>{detail.tools}</p>
          </div>
          <div>
            <span className="meta text-blue">RESEARCH SUB-AREAS</span>
            <p>{detail.areas}</p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-[var(--border)] flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="button button-outline text-xs py-2 px-4 cursor-pointer"
          >
            CLOSE WINDOW
          </button>
        </div>
      </div>
    </div>
  )
}

export function Domains() {
  const [selected, setSelected] = useState<(typeof domains)[number] | null>(null)
  return (
    <section id="domains" className="section section-paper reveal-section">
      <div className="shell">
        <Reveal>
          <p className="section-kicker">
            02 / DOMAINS <span />
          </p>
          <div className="section-heading-row">
            <h2 className="display-title">
              FOUR WAYS
              <br />
              <em>TO EXPLORE.</em>
            </h2>
            <p className="heading-aside">
              Click any card to
              <br />
              inspect stack &amp; tools.
            </p>
          </div>
        </Reveal>
        <div className="domain-grid">
          {domains.map((d) => {
            const Icon = d.icon
            return (
              <button
                className="domain-card text-left relative overflow-hidden cursor-pointer"
                key={d.title}
                onClick={() => setSelected(d)}
                aria-label={`View details about ${d.title}`}
                type="button"
              >
                <span className="tech-corner-plus tech-corner-tr text-white/50">+</span>
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-white font-bold bg-navy/30 px-2 py-0.5 rounded">{d.n}</span>
                  <Icon className="domain-icon" size={27} strokeWidth={1.5} />
                </div>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {d.tech.map((t) => (
                    <span key={t} className="font-mono text-[10px] bg-white/20 text-white px-2 py-0.5 rounded font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </button>
            )
          })}
        </div>
      </div>
      {selected && <DomainModal domain={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

export function HardwareLabSection() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL')
  const categories = [
    'ALL',
    'Microcontrollers',
    'Compute & Vision',
    'Sensors',
    'Telemetry Displays',
    'Additive Fabrication',
  ]

  const filtered = activeCategory === 'ALL'
    ? labHardware
    : labHardware.filter((h) => h.category === activeCategory)

  return (
    <section id="hardware-lab" className="section section-light reveal-section">
      <div className="shell">
        <p className="section-kicker">
          LAB INVENTORY / HARDWARE <span />
        </p>
        <div className="section-heading-row">
          <h2 className="display-title">
            THE HARDWARE
            <br />
            <em>LAB STACK.</em>
          </h2>
          <p className="heading-aside">
            Shared components,
            <br />
            sensors &amp; fabrication kits.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              type="button"
              className={`px-3 py-1.5 font-mono text-xs font-bold border transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-navy text-white border-navy shadow-xs'
                  : 'bg-white text-navy border-[var(--border)] hover:border-blue'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hardware Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white border border-[var(--border)] p-5 relative group hover:border-blue transition-all flex flex-col justify-between shadow-xs hover:shadow-md">
              <span className="tech-corner-plus tech-corner-tr">+</span>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] text-blue font-bold tracking-wider">{item.id}</span>
                  <span className="font-mono text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" /> {item.status}
                  </span>
                </div>
                <div className="h-40 w-full bg-[#f8f9fc] rounded flex items-center justify-center p-3 mb-4 border border-[var(--border)] group-hover:bg-[#f1f5f9] transition-colors">
                  <img src={item.image} alt={item.name} className="h-full max-w-full object-contain filter contrast-105 group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h4 className="font-bold text-navy text-base leading-snug">{item.name}</h4>
                <p className="font-mono text-xs text-muted mt-1.5 leading-relaxed">{item.specs}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[10px] font-mono text-muted">
                <span>CAT: {item.category.toUpperCase()}</span>
                <span className="text-blue font-bold">GNDU VIBRATION LAB</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkshopGallery({ event, onClose }: { event: keyof typeof workshopGallery; onClose: () => void }) {
  const [active, setActive] = useState(0)
  const gallery = workshopGallery[event]
  useEffect(() => {
    const onKey = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === 'Escape') onClose()
      if (keyboardEvent.key === 'ArrowLeft') setActive((current) => (current - 1 + gallery.images.length) % gallery.images.length)
      if (keyboardEvent.key === 'ArrowRight') setActive((current) => (current + 1) % gallery.images.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [gallery.images.length, onClose])

  return (
    <div
      className="interactive-modal gallery-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="gallery-panel" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-4">
          <span className="meta text-blue font-bold">{gallery.label}</span>
          <button
            className="modal-close"
            aria-label="Close image gallery"
            onClick={onClose}
            type="button"
          >
            <X size={15} /> <span>CLOSE [ESC]</span>
          </button>
        </div>
        <div className="gallery-heading">
          <h2 id="gallery-modal-title">{gallery.title}</h2>
          <span className="gallery-count text-base font-mono font-bold">
            {String(active + 1).padStart(2, '0')} / {String(gallery.images.length).padStart(2, '0')}
          </span>
        </div>
        <div className="gallery-stage">
          <img src={gallery.images[active]} alt={`${gallery.title} photo ${active + 1}`} />
          <button
            className="gallery-arrow gallery-prev"
            aria-label="Previous photo"
            onClick={() => setActive((current) => (current - 1 + gallery.images.length) % gallery.images.length)}
            type="button"
          >
            <MoveRight className="rotate-180" />
          </button>
          <button
            className="gallery-arrow gallery-next"
            aria-label="Next photo"
            onClick={() => setActive((current) => (current + 1) % gallery.images.length)}
            type="button"
          >
            <MoveRight />
          </button>
        </div>
        {/* Thumbnails strip */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 max-w-full">
          {gallery.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              type="button"
              className={`relative shrink-0 w-16 h-12 rounded border-2 overflow-hidden transition-all cursor-pointer ${
                active === idx ? 'border-[var(--blue)] scale-105 shadow-md opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between">
          <p className="gallery-note">Department of Mechanical Engineering, Guru Nanak Dev University</p>
          <button
            onClick={onClose}
            type="button"
            className="button button-outline text-xs py-1.5 px-4 cursor-pointer"
          >
            CLOSE WINDOW
          </button>
        </div>
      </div>
    </div>
  )
}

export function Workshops() {
  const [selected, setSelected] = useState<keyof typeof workshopGallery | null>(null)
  const cards = [
    { event: 'ros' as const, code: 'WS / 001', heading: <>ROS<br />WORKSHOP</>, label: 'ROBOT OPERATING SYSTEM', meta: 'EVENT / 005', title: 'ROS Workshop', text: 'Hands-on learning with the Robot Operating System, Gazebo simulator & kinematics.' },
    { event: 'uav' as const, code: 'WS / 006', heading: <>UAV<br />WORKSHOP</>, label: 'AERIAL SYSTEMS', meta: 'EVENT / 006', title: 'UAV Workshop', text: 'Explore unmanned aerial vehicles, flight controllers, ESCs, and vision avionics.' },
    { event: 'devices' as const, code: 'EVENT / 002', heading: <>7 DAYS<br />7 DEVICES</>, label: 'ELECTRONIC DEVICES', meta: 'EVENT / 002', title: '7 Days 7 Electronic Devices', text: 'A focused hardware build challenge exploring one electronic device and sensor each day.' },
  ]

  return (
    <section id="workshops" className="section section-paper reveal-section">
      <div className="shell">
        <p className="section-kicker">
          EVENTS / WORKSHOPS <span />
        </p>
        <div className="section-heading-row">
          <h2 className="display-title">
            MAKE IT
            <br />
            <em>REAL.</em>
          </h2>
          <p className="heading-aside">
            Hands-on learning
            <br />
            for working minds.
          </p>
        </div>
        <div className="workshop-grid">
          {cards.map((card) => (
            <button
              className="split-card text-left cursor-pointer"
              key={card.event}
              onClick={() => setSelected(card.event)}
              aria-label={`Open ${card.title} photo gallery`}
              type="button"
            >
              <div className="split-visual">
                <span>{card.code}</span>
                <strong>{card.heading}</strong>
                <small>{card.label}</small>
              </div>
              <div className="split-content">
                <p className="meta">{card.meta}</p>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {selected && <WorkshopGallery event={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

function TechTalesModal({
  episode,
  onClose,
}: {
  episode: (typeof events.techtales)[number]
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      className="interactive-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="techtales-modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="gallery-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-5">
          <span className="meta text-blue font-mono font-bold">TECHTALES // {episode.episode}</span>
          <button
            className="modal-close"
            aria-label="Close episode details"
            onClick={onClose}
            type="button"
          >
            <X size={15} /> <span>CLOSE [ESC]</span>
          </button>
        </div>

        {/* Poster & Overview */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-4 bg-[#07152f] p-2 rounded border border-[var(--border)] flex items-center justify-center">
            <img
              src={episode.image}
              alt={episode.title}
              className="w-full h-auto max-h-[360px] object-contain rounded"
            />
          </div>
          <div className="md:col-span-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs px-2.5 py-0.5 bg-[var(--blue)] text-white rounded font-bold">
                  {episode.episode}
                </span>
                <span className="font-mono text-xs text-muted border border-[var(--border)] px-2.5 py-0.5 rounded font-bold">
                  {episode.date}
                </span>
              </div>
              <h2 id="techtales-modal-title" className="text-2xl sm:text-3xl font-extrabold text-navy leading-tight mt-2">
                {episode.title}
              </h2>
              <div className="mt-3 p-3.5 bg-[#f0f4fc] border-l-4 border-[var(--blue)] rounded-r">
                <p className="font-mono text-xs text-navy font-bold">
                  SPEAKER: {episode.speaker}
                </p>
                <p className="font-mono text-[11px] text-muted mt-0.5">
                  {episode.speakerRole}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-xs font-mono text-muted">
                <span>📍 {episode.venue}</span>
                <span>⏰ {episode.time}</span>
              </div>
              <p className="mt-4 text-sm text-navy leading-relaxed">
                {episode.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown of what was explained */}
        <div className="mt-6 pt-5 border-t border-[var(--border)]">
          <h3 className="font-mono text-xs font-bold text-blue tracking-wider uppercase mb-3">
            WHAT WAS EXPLAINED &amp; DEMONSTRATED IN THIS WORKSHOP:
          </h3>
          <ul className="space-y-3">
            {episode.topicsCovered.map((topic, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-navy bg-white/70 p-2.5 rounded border border-[var(--border)]">
                <span className="font-mono text-xs text-blue font-bold shrink-0 mt-0.5 bg-blue/10 px-1.5 py-0.5 rounded">
                  0{idx + 1}
                </span>
                <span className="leading-relaxed">{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Takeaways */}
        <div className="mt-5 p-4 bg-white border border-[var(--border)] rounded">
          <span className="font-mono text-[11px] text-blue font-bold tracking-wider uppercase block mb-1">
            KEY TAKEAWAYS &amp; PRACTICAL VALUE
          </span>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            {episode.keyTakeaways}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between">
          <p className="gallery-note">ARMSS · Department of Mechanical Engineering, Guru Nanak Dev University</p>
          <button
            onClick={onClose}
            type="button"
            className="button button-outline text-xs py-1.5 px-4 cursor-pointer"
          >
            CLOSE WINDOW
          </button>
        </div>
      </div>
    </div>
  )
}

export function TechTales() {
  const [selectedEpisode, setSelectedEpisode] = useState<(typeof events.techtales)[number] | null>(null)

  return (
    <section id="techtales" className="section section-light reveal-section">
      <div className="shell">
        <p className="section-kicker">
          04 / TECHTALES <span />
        </p>
        <div className="section-heading-row">
          <h2 className="display-title">
            STORIES
            <br />
            <em>BEHIND THE BUILD.</em>
          </h2>
          <p className="heading-aside">
            Click any episode to view
            <br />
            what was explained.
          </p>
        </div>
        <div className="techtales-grid">
          {events.techtales.map((item) => (
            <button
              key={item.episode}
              onClick={() => setSelectedEpisode(item)}
              className="techtales-card group relative overflow-hidden text-left cursor-pointer transition-transform hover:-translate-y-1.5 shadow-lg"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(7, 21, 47, 0.96) 0%, rgba(7, 21, 47, 0.72) 50%, rgba(7, 21, 47, 0.4) 100%), url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
              }}
              type="button"
            >
              <div className="flex items-center justify-between z-10 w-full">
                <span className="meta font-mono text-xs px-2.5 py-1 bg-[var(--blue)] text-white rounded font-bold tracking-widest">
                  {item.episode}
                </span>
                <span className="font-mono text-[11px] text-white/90 tracking-wider bg-black/60 px-2.5 py-0.5 border border-white/20">
                  {item.date}
                </span>
              </div>
              <div className="mt-auto pt-20 z-10 text-white w-full">
                <h3 className="text-white font-bold leading-snug drop-shadow-md">{item.title}</h3>
                <p className="text-white/85 text-sm mt-2">
                  Featuring <strong className="text-white font-semibold">{item.speaker}</strong>
                </p>
                <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-white/80">
                  <span>{item.venue}</span>
                  <span className="text-[#60a5fa] font-bold group-hover:underline flex items-center gap-1">
                    READ DETAILS →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {selectedEpisode && (
        <TechTalesModal episode={selectedEpisode} onClose={() => setSelectedEpisode(null)} />
      )}
    </section>
  )
}

export function Hackathon() {
  return (<section className="section section-paper reveal-section">
        <div className="shell">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">
                05 / HACKATHON 2024 <span />
            </p>
            <h2 className="display-title">
              IDEAS IN
              <br />
              <em>MOTION.</em>
            </h2>
          </div>
          <p className="heading-aside">
            Three teams.
            <br />
            One sharp brief.
          </p>
        </div>
        <div className="hackathon-list">
          <article className="hack-card winner">
            <div>
              <span className="meta">BUILD FEST / FIRST POSITION</span>
              <h3>Team Glare Guardians</h3>
              <p>Gurbani Kaur, Niyati Seth, Vanshika Marwaha, Akshdeep Kaur</p>
            </div>
            <strong>01</strong>
          </article>
          {events.buildFest.slice(1).map(([position, teamName, members]) => (
            <article className="hack-card" key={position}>
              <div>
                <span className="meta">BUILD FEST / {position}</span>
                <h3>{teamName}</h3>
                <p>{members}</p>
              </div>
              <strong>{position === 'SECOND POSITION' ? '02' : '03'}</strong>
            </article>
          ))}
        </div>
        <a href="#footer" className="text-link">
          SEE THE ARCHIVE <MoveRight size={16} />
        </a>
      </div>
    </section>
  )
}

export function Membership() {
  const [copied, setCopied] = useState(false)

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('ARMSS-GNDU@upi')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="membership" className="section section-light reveal-section">
      <div className="shell membership-grid">
        <div>
          <p className="section-kicker">
            06 / MEMBERSHIP <span />
          </p>
          <h2 className="display-title">
            BRING YOUR
            <br />
            <em>CURIOSITY.</em>
          </h2>
          <ul className="benefits">
            <li>Hands-on laboratory &amp; hardware component checkout</li>
            <li>Insider technical workshops &amp; project pods</li>
            <li>Direct faculty &amp; senior peer mentoring</li>
            <li>Competition sponsorships &amp; hackathon teams</li>
            <li>ARMSS certification, badges &amp; project portfolio</li>
          </ul>
        </div>
        <div className="payment-terminal relative">
          <p>ARMSS / PAYMENT GATEWAY</p>
          <div className="terminal-screen">
            <div className="flex items-center justify-between">
              <span>UPI / ARMSS-GNDU</span>
              <button
                onClick={handleCopyUpi}
                className="font-mono text-[10px] bg-navy/60 hover:bg-navy px-2 py-1 text-white flex items-center gap-1 rounded transition-colors cursor-pointer"
              >
                {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                {copied ? 'COPIED' : 'COPY UPI'}
              </button>
            </div>
            <b>
              SCAN
              <br />
              TO PAY
            </b>
          </div>
          <small>Membership payment terminal · Guru Nanak Dev University</small>
        </div>
      </div>
    </section>
  )
}

export function FAQ() {
  const [active, setActive] = useState<number | null>(null)
  return (<section className="section section-paper reveal-section">
        <div className="shell faq-grid">
        <div>
          <p className="section-kicker">
            07 / FAQ <span />
          </p>
          <h2 className="display-title">
            STILL HAVE
            <br />
            <em>QUESTIONS?</em>
          </h2>
          <p className="body-copy">Good. That is usually where the most exciting engineering problems start.</p>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], i) => (
            <div className="faq-item" key={question}>
              <button aria-expanded={active === i} onClick={() => setActive(active === i ? null : i)}>
                <span>{question}</span>
                <span>{active === i ? '−' : '+'}</span>
              </button>
              {active === i && <p>{answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Team() {
  return (
    <section id="team" className="section section-light reveal-section">
      <div className="shell">
        <p className="section-kicker">
          08 / THE CREW <span />
        </p>
        <div className="section-heading-row">
          <h2 className="display-title">
            THE PEOPLE
            <br />
            <em>OF ARMSS.</em>
          </h2>
          <p className="heading-aside">
            Student Leadership
            <br />
            &amp; Coordinators.
          </p>
        </div>
        <div className="team-grid">
          {team.map((member, i) => (
            <article className="team-card relative" key={member.name}>
              <span className="tech-corner-plus tech-corner-tr">+</span>
              <div className="team-avatar">
                <span>PHOTO / {String(i + 1).padStart(2, '0')}</span>
                <Network size={28} />
              </div>
              <p className="team-role">{member.role}</p>
              <h3>{member.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('armss.gndu@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <footer id="footer" className="footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <Mark light={true} />
            <p className="footer-description">
              Department of Mechanical Engineering
              <br />
              <span>Guru Nanak Dev University, Amritsar</span>
            </p>
          </div>
          <div className="footer-links">
            <div>
              <p className="footer-label">EXPLORE</p>
              <a href="#about">About</a>
              <a href="#domains">Domains</a>
              <a href="#hardware-lab">Hardware Lab</a>
              <a href="#workshops">Workshops</a>
              <a href="#techtales">TechTales</a>
            </div>
            <div>
              <p className="footer-label">CONNECT</p>
              <a href="#membership">Membership</a>
              <a href="#team">Team</a>
              <a href={joinUrl} target="_blank" rel="noopener noreferrer">
                Join ARMSS
              </a>
            </div>
            <div>
              <p className="footer-label">FIND US</p>
              <a href="https://www.instagram.com/armss.gndu/" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <button
                onClick={handleCopyEmail}
                className="text-left text-[#aab7cf] hover:text-white font-mono text-xs flex items-center gap-1.5 cursor-pointer mt-1"
              >
                {copiedEmail ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                {copiedEmail ? 'Email Copied!' : 'armss.gndu@gmail.com'}
              </button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>ARMSS / GNDU // DEPT OF MECHANICAL ENGINEERING</span>
          <span>© 2026 ARTIFICIAL INTELLIGENCE, ROBOTICS, AND MECHANICAL STUDENT SOCIETY</span>
          <span>LAT: 31.6340° N, 74.8242° E</span>
        </div>
      </div>
    </footer>
  )
}

export default function ArmmsSite() {
  useEffect(() => {
    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal-section').forEach((el) => observer.observe(el))

    // Mouse-tracking glow for domain cards
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.domain-card')
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        card.style.setProperty('--mouse-x', `${x}%`)
        card.style.setProperty('--mouse-y', `${y}%`)
      })
    }
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      observer.disconnect()
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechStatsStrip />
        <About />
        <Domains />
        <HardwareLabSection />
        <Workshops />
        <TechTales />
        <Hackathon />
        <Membership />
        <FAQ />
        <Team />
      </main>
      <Footer />
    </>
  )
}
