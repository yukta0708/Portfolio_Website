import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  CircleUserRound,
  Code2,
  Component,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Phone,
  Send,
  Sparkles,
  Sun,
  Wind,
  X,
} from "lucide-react";
import heroIllustration from "./assets/hero-girl-cutout.png";
import aboutIllustration from "./assets/about-girl-cutout.png";
import nurseryProjectImage from "./assets/project-nursery.svg";
import qrProjectImage from "./assets/project-qr.svg";
import collabProjectImage from "./assets/project-collab.svg";
import ThreeHeroCanvas from "./ThreeHeroCanvas";

const resumeHref = `${import.meta.env.BASE_URL}Yukta-Savdekar-Resume%20(1).pdf`;
const navItems = ["Home", "About", "Projects", "Skills", "Contact"];

const skills = [
  { name: "Java", icon: Code2, accent: "from-amber-400 to-orange-500", detail: "OOP, Core Java, Servlet, JDBC, Spring Boot" },
  { name: "React", icon: Component, accent: "from-sky-400 to-cyan-500", detail: "Component-based UI and responsive frontend builds" },
  { name: "HTML, CSS, JavaScript", icon: Layers3, accent: "from-violet-500 to-fuchsia-500", detail: "Core frontend technologies and responsive layouts" },
  { name: "SQL / MySQL", icon: Database, accent: "from-emerald-400 to-green-500", detail: "Database queries, schema understanding, and data handling" },
  { name: "Hibernate", icon: Database, accent: "from-teal-400 to-emerald-500", detail: "ORM-based persistence and backend data integration" },
  { name: "Tailwind / Bootstrap", icon: Wind, accent: "from-cyan-400 to-blue-500", detail: "Fast UI composition and modern responsive styling" },
  { name: "Python", icon: BookOpen, accent: "from-indigo-400 to-purple-500", detail: "Programming logic, scripting, and fundamentals" },
  { name: "C / C++", icon: Code2, accent: "from-pink-400 to-rose-500", detail: "Strong programming fundamentals and problem solving" },
  { name: "Tooling", icon: Sparkles, accent: "from-pink-400 to-rose-500", detail: "Eclipse, VS Code, Workbench, IntelliJ IDEA" },
  { name: "Soft Skills", icon: BadgeCheck, accent: "from-yellow-400 to-orange-500", detail: "Teamwork, communication, and structured thinking" },
];

const projects = [
  {
    title: "Nursery Website",
    image: nurseryProjectImage,
    stack: ["React", "JavaScript", "UI", "Admin Panel"],
    summary:
      "Plant nursery website with product listing, search, category browsing, and admin inventory management.",
    bullets: [
      "Added product listing, search, and category-based browsing.",
      "Handled inventory updates through admin-side controls.",
    ],
    github: "https://github.com/yukta0708",
    accent: "from-emerald-400 via-teal-400 to-cyan-500",
  },
  {
    title: "QR Code Attendance System",
    image: qrProjectImage,
    stack: ["Java", "MySQL", "Role-based Access", "QR"],
    summary:
      "Secure attendance system with expiring QR codes, dashboards, and automated report handling.",
    bullets: [
      "Used 60-second QR expiry to reduce proxy attendance.",
      "Managed attendance, results, and leave tracking in real time.",
    ],
    github: "https://github.com/yukta0708",
    accent: "from-fuchsia-500 via-violet-500 to-indigo-500",
  },
  {
    title: "Smart Team Collab",
    image: collabProjectImage,
    stack: ["Tasks", "Collaboration", "Progress", "Workflow"],
    summary:
      "Team collaboration platform for member management, task tracking, and project progress monitoring.",
    bullets: [
      "Improved task organization and team communication flow.",
      "Optimized data handling for smoother project coordination.",
    ],
    github: "https://github.com/yukta0708",
    accent: "from-amber-400 via-orange-400 to-rose-500",
  },
];

const certifications = [
  "Java Programming Course Certificate",
  "C++ Programming Course Certificate",
  "Java Programming NPTEL Course",
  "Spring Boot - Udemy Course",
];

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/yukta-savdekar-ab59b0272", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/yukta0708", label: "GitHub" },
  { icon: Mail, href: "mailto:yuktasavdekar7@gmail.com", label: "Email" },
  { icon: Phone, href: "tel:+919175259319", label: "Phone" },
];

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const slideLeftVariant = {
  hidden: { opacity: 0, x: -70, y: 24 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const slideRightVariant = {
  hidden: { opacity: 0, x: 70, y: 24 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const aboutSectionVariant = {
  hidden: { opacity: 0, y: 90, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
};

const skillsSectionVariant = {
  hidden: { opacity: 0, scale: 0.92, y: 36 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.06,
    },
  },
};

const projectsSectionVariant = {
  hidden: { opacity: 0, x: 0, y: 54 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const contactSectionVariant = {
  hidden: { opacity: 0, x: 60, y: 24 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const pageVariant = {
  hidden: { opacity: 0, y: 36, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  return (
    <div className={dark ? "theme-dark" : "theme-light"}>
      <motion.div
        className="site-shell"
        variants={pageVariant}
        initial="hidden"
        animate="visible"
      >
        <Header
          dark={dark}
          menuOpen={menuOpen}
          setDark={setDark}
          setMenuOpen={setMenuOpen}
        />
        <main className="content-stack">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}

function Header({ dark, menuOpen, setDark, setMenuOpen }) {
  return (
    <motion.header className="header-wrap" variants={sectionVariant}>
      <div className="nav-bar">
        <a className="brand-mark" href="#home">
          Yukta.dev
        </a>
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="icon-btn"
            type="button"
            aria-label="Toggle theme"
            onClick={() => setDark((current) => !current)}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="mobile-toggle"
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </motion.header>
  );
}

function Hero() {
  return (
    <motion.section
      className="hero-grid"
      id="home"
      variants={sectionVariant}
      initial="hidden"
      animate="visible"
    >
      <div className="hero-copy">
        <div className="social-row">
          {socials.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              className="social-chip"
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              aria-label={label}
            >
              <Icon size={14} />
            </motion.a>
          ))}
        </div>
        <span className="eyebrow">Hi, I'm Yukta Savdekar</span>
        <h1>Software Developer</h1>
        <p>
          Java, SQL, React, and web development with a strong focus on clean
          implementation, problem solving, and dependable application flow.
        </p>
        <div className="cta-row">
          <a className="primary-pill large" href={resumeHref} download>
            <Download size={15} />
            Download Resume
          </a>
          <a className="ghost-pill large" href="#projects">
            <BriefcaseBusiness size={15} />
            View Projects
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <motion.div
          className="hero-three-wrap"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        >
          <ThreeHeroCanvas />
        </motion.div>
        <div className="image-blend-frame hero-frame">
          <motion.img
            src={heroIllustration}
            alt="Developer illustration"
            className="hero-character blend-image"
            animate={{ y: [0, -16, 0], rotate: [0, -1.5, 0, 1.5, 0] }}
            transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <motion.div
          className="floating-badge badge-hi"
          animate={{ y: [0, -10, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
        >
          Java
        </motion.div>
        <motion.div
          className="floating-badge badge-ai"
          animate={{ y: [0, -12, 0], rotate: [0, 7, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
        >
          React
        </motion.div>
        <motion.div
          className="floating-badge badge-ui"
          animate={{ y: [0, -8, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          SQL
        </motion.div>
      </div>
    </motion.section>
  );
}

function About() {
  return (
    <motion.section
      className="two-col-section"
      id="about"
      variants={aboutSectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="art-card">
        <div className="image-blend-frame about-frame">
          <motion.img
            src={aboutIllustration}
            alt="About illustration"
            className="about-character blend-image"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
      <div className="section-copy">
        <span className="section-tag">About Me</span>
        <h2>Java developer with strong fundamentals in web and database systems.</h2>
        <p>
          Strong foundation in Java, OOP, SQL, React, and frontend development.
          Looking for a software developer role to contribute through structured
          coding, practical thinking, and consistent delivery.
        </p>
        <p>
          I am comfortable working across frontend and backend tasks, with
          interest in building clean interfaces, efficient logic, and useful
          project workflows.
        </p>
        <div className="about-highlights">
          <div className="about-highlight-card">
            <strong>Backend Focus</strong>
            <span>Java, JDBC, Servlet, Spring Boot, Hibernate</span>
          </div>
          <div className="about-highlight-card">
            <strong>Frontend Skills</strong>
            <span>React, JavaScript, HTML, CSS, Bootstrap, Tailwind</span>
          </div>
          <div className="about-highlight-card">
            <strong>Work Style</strong>
            <span>Problem solving, teamwork, communication, structured delivery</span>
          </div>
        </div>
        <div className="stats-row">
          <div>
            <strong>3</strong>
            <span>Resume Projects</span>
          </div>
          <div>
            <strong>2</strong>
            <span>Education Milestones</span>
          </div>
          <div>
            <strong>4</strong>
            <span>Certifications</span>
          </div>
        </div>
        <div className="education-list">
          <div className="education-item">
            <GraduationCap size={16} />
            <span>BCA Computer Science, KTHM College Nashik (2021 - 2024)</span>
          </div>
          <div className="education-item">
            <GraduationCap size={16} />
            <span>MCA, MET Bhujbal Knowledge City Nashik (2024 - Present)</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Skills() {
  return (
    <motion.section
      className="stack-section"
      id="skills"
      variants={skillsSectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
    >
      <span className="section-tag centered">Skills & Certifications</span>
      <h2 className="centered-title">
        Technical Skills
      </h2>
      <div className="skills-intro-grid">
        <div className="skills-intro-card">
          <strong>Programming</strong>
          <span>Java, C, C++, Python, JavaScript</span>
        </div>
        <div className="skills-intro-card">
          <strong>Database & Tools</strong>
          <span>SQL, MySQL, Hibernate, Workbench, VS Code, IntelliJ</span>
        </div>
        <div className="skills-intro-card">
          <strong>Web Stack</strong>
          <span>React, HTML, CSS, Bootstrap, Tailwind</span>
        </div>
      </div>
      <div className="skills-grid">
        {skills.map((skill) => (
          <motion.article
            key={skill.name}
            className="skill-card"
            whileHover={{ y: -6, rotateX: 3 }}
          >
            <div className="skill-topline">
              <span className={`skill-icon bg-gradient-to-r ${skill.accent}`}>
                <skill.icon size={18} />
              </span>
              <h3>{skill.name}</h3>
            </div>
            <span className="skill-meta">Resume-based stack</span>
            <p className="skill-copy">{skill.detail}</p>
          </motion.article>
        ))}
      </div>
      <div className="cert-grid">
        {certifications.map((item) => (
          <div key={item} className="cert-pill">
            <BadgeCheck size={14} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function Projects() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  function scrollPrev() {
    setSelectedIndex((current) => (current - 1 + projects.length) % projects.length);
  }

  function scrollNext() {
    setSelectedIndex((current) => (current + 1) % projects.length);
  }

  return (
    <motion.section
      className="stack-section project-carousel-section"
      id="projects"
      variants={projectsSectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
    >
      <span className="section-tag centered">Projects</span>
      <h2 className="centered-title projects-title">My Project Work</h2>
      <p className="projects-intro">
        Java, React, SQL, and workflow-based applications.
      </p>
      <div className="embla" style={{ "--selected-index": selectedIndex }}>
        <div className="embla__viewport">
          <div className="embla__container">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isSelected={index === selectedIndex}
                onSelect={() => setSelectedIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className="embla__controls" aria-label="Project carousel controls">
          <button
            className="embla__btn embla__btn--prev"
            type="button"
            aria-label="Previous project"
            onClick={scrollPrev}
          >
            <span aria-hidden="true" className="chev chev--left" />
          </button>
          <div className="embla__dots" role="tablist" aria-label="Choose project">
            {projects.map((project, index) => (
              <button
                key={project.title}
                type="button"
                className="embla__dot"
                aria-label={`Go to ${project.title}`}
                aria-selected={index === selectedIndex ? "true" : "false"}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </div>
          <button
            className="embla__btn embla__btn--next"
            type="button"
            aria-label="Next project"
            onClick={scrollNext}
          >
            <span aria-hidden="true" className="chev chev--right" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}

function ProjectCard({ project, index, isSelected, onSelect }) {
  return (
    <motion.article
      className={`embla__slide ${isSelected ? "is-selected" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={onSelect}
    >
      <article className="project-carousel-card">
        <div className="project-carousel-media">
          <img className="project-carousel-image" src={project.image} alt={project.title} />
        </div>
        <div className="project-carousel-body">
          <div className="project-copy-head">
            <div>
              <span className="project-label">Project 0{index + 1}</span>
              <h3>{project.title}</h3>
            </div>
            <a
              className="project-github-link"
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} on GitHub`}
              onClick={(event) => event.stopPropagation()}
            >
              <Github size={14} />
              GitHub
            </a>
          </div>
          <p className="project-summary">{project.summary}</p>
          <div className="stack-tags">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <ul className="project-points">
            {project.bullets.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className="project-actions-row">
            <a
              className="mini-btn filled"
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
            >
              <Github size={14} />
              View Code
            </a>
            <a
              className="mini-btn"
              href="#contact"
              onClick={(event) => event.stopPropagation()}
            >
              <ExternalLink size={14} />
              Discuss Project
            </a>
          </div>
        </div>
      </article>
    </motion.article>
  );
}

function Contact() {
  return (
    <motion.section
      className="contact-wrap"
      id="contact"
      variants={contactSectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="contact-head">
        <span className="section-tag centered">Contact</span>
        <h2 className="centered-title">Open to software developer opportunities.</h2>
      </div>
      <div className="contact-card">
        <div className="contact-info-grid">
          <a className="contact-info-item" href="mailto:yuktasavdekar7@gmail.com">
            <Mail size={16} />
            <span>yuktasavdekar7@gmail.com</span>
          </a>
          <a className="contact-info-item" href="tel:+919175259319">
            <Phone size={16} />
            <span>+91 9175259319</span>
          </a>
          <a
            className="contact-info-item"
            href="https://www.linkedin.com/in/yukta-savdekar-ab59b0272"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={16} />
            <span>linkedin.com/in/yukta-savdekar-ab59b0272</span>
          </a>
          <a
            className="contact-info-item"
            href="https://github.com/yukta0708"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={16} />
            <span>github.com/yukta0708</span>
          </a>
        </div>
        <form className="contact-form-grid">
          <div className="field-row">
            <label>
              <CircleUserRound size={14} />
              <input type="text" placeholder="Your Name" />
            </label>
            <label>
              <Mail size={14} />
              <input type="email" placeholder="Your Email" />
            </label>
          </div>
          <label>
            <BriefcaseBusiness size={14} />
            <input type="text" placeholder="Role / Subject" />
          </label>
          <label className="message-box">
            <Send size={14} />
            <textarea rows="6" placeholder="Message" />
          </label>
          <div className="cta-row">
            <button className="primary-pill large submit-btn" type="submit">
              Send Message
            </button>
            <a className="ghost-pill large" href={resumeHref} download>
              <Download size={15} />
              Download Resume
            </a>
          </div>
        </form>
      </div>
    </motion.section>
  );
}

function Footer() {
  return (
    <motion.footer className="footer-bar" variants={sectionVariant}>
      <p>Copyright (c) 2026. All rights reserved by Yukta Savdekar.</p>
    </motion.footer>
  );
}

export default App;
