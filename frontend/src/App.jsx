import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowDownRight, ArrowUpRight, ArrowLeft, Award, BriefcaseBusiness, Braces, Check, ChevronUp, Cloud, Code2, Database, Download, ExternalLink, FileText, Github, Linkedin, Mail, MapPin, PanelsTopLeft, Phone, Server, Sparkles } from 'lucide-react'
import Navbar from './components/Navbar'
import SectionHeading from './components/SectionHeading'
import ContactForm from './components/ContactForm'
import { allProjects, certifications, education, experience, profile, projects, skills } from './data/portfolio'

const icons = { PanelsTopLeft, Server, Database, Braces, Cloud, Code2 }
const reveal = { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.48 } }
const technologyMarks = {
  'JavaScript ES6+': 'JS', HTML5: '5', CSS3: '3', 'Tailwind CSS': 'TW', Bootstrap: 'B', Redux: 'R', 'Context API': 'C', 'React Hooks': 'ƒ',
  'Node.js': 'N', 'Express.js': 'ex', 'REST APIs': 'API', 'JWT Authentication': 'JWT', 'Role-Based Access Control': 'RBAC', MongoDB: 'M', SQL: 'SQL', Python: 'Py',
  Git: 'git', GitHub: 'GH', 'AWS EC2': 'aws', Nginx: 'N', PM2: 'pm2', Hostinger: 'H', Render: 'R', Vercel: 'V',
}

function TechnologyLogo({ name }) {
  if (name === 'React.js') return <span className="technology-logo logo-react" aria-hidden="true"><svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="2.2" fill="currentColor"/><ellipse cx="16" cy="16" rx="13" ry="5"/><ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)"/></svg></span>
  return <span className={`technology-logo logo-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} aria-hidden="true">{technologyMarks[name] || name.slice(0, 2)}</span>
}

function SkillsSection() {
  const total = skills.reduce((count, group) => count + group.items.length, 0)
  return <section className="section skills-section" id="skills"><div className="container"><div className="skills-intro"><SectionHeading eyebrow="Technical toolkit" title={<>Built with<br /><em>the right tools.</em></>} description="Technologies I’ve worked with across full-stack applications and responsive interfaces." /><div className="skills-aside"><span className="skills-aside-mark"><Braces size={19} /></span><span>{String(skills.length).padStart(2, '0')} categories<br /><strong>{total} technologies</strong></span></div></div><div className="skills-grid">{skills.map((group, i) => { const Icon = icons[group.icon]; return <motion.article className={`skill-card skill-${group.size} accent-${group.accent}`} key={group.title} {...reveal} transition={{ duration: 0.42, delay: i * 0.05 }}><div className="skill-card-top"><span className="skill-icon"><Icon size={18} /></span><span className="skill-index">{String(i + 1).padStart(2, '0')} <i /> {String(group.items.length).padStart(2, '0')} skills</span></div><div className="skill-title-row"><h3>{group.title}</h3><span className="skill-motif">{group.title === 'Frontend' ? 'UI' : group.title === 'Backend' ? 'API' : group.title === 'Database' ? 'DB' : group.title === 'Languages' ? '</>' : 'DEV'}</span></div><div className="skill-tech-list">{group.items.map((item) => <div className="skill-tech" key={item}><TechnologyLogo name={item} /><span>{item}</span><Check className="skill-tech-check" size={13} strokeWidth={2.5} /></div>)}</div><div className="skill-card-accent" /></motion.article> })}</div><div className="skills-bottomline"><span>Hands-on technologies</span><span className="skills-bottom-rule" /><span>Across the full stack</span></div></div></section>
}

function CodeWindow() {
  return <div className="hero-window" aria-label="Illustration of code in a development editor">
    <div className="window-top"><div className="window-dots"><i /><i /><i /></div><span>portfolio.js</span><span className="window-lang">JS</span></div>
    <div className="code-body"><div className="code-line"><span className="line-no">01</span><span><i className="code-purple">const</i> <i className="code-blue">developer</i> = {'{'}</span></div><div className="code-line"><span className="line-no">02</span><span className="indent"><i className="code-coral">name</i>: <i className="code-green">'Gayathri'</i>,</span></div><div className="code-line"><span className="line-no">03</span><span className="indent"><i className="code-coral">focus</i>: <i className="code-green">'full stack'</i>,</span></div><div className="code-line"><span className="line-no">04</span><span className="indent"><i className="code-coral">builds</i>: [</span></div><div className="code-line"><span className="line-no">05</span><span className="indent deeper"><i className="code-green">'thoughtful UI'</i>,</span></div><div className="code-line"><span className="line-no">06</span><span className="indent deeper"><i className="code-green">'dependable APIs'</i></span></div><div className="code-line"><span className="line-no">07</span><span className="indent">],</span></div><div className="code-line"><span className="line-no">08</span><span>{'}'} <span className="cursor">▍</span></span></div></div>
    <div className="window-foot"><span><span className="status-dot" /> Ready to build</span><span>UTF-8&nbsp; · &nbsp;JavaScript</span></div>
    <div className="floating-badge"><span className="floating-icon"><Code2 size={16} /></span><div><strong>Full stack</strong><small>From interface to API</small></div></div>
  </div>
}

function ProjectCard({ project, index, total = projects.length }) {
  const [imageFailed, setImageFailed] = useState(false)
  const number = String(index + 1).padStart(2, '0')
  return <motion.article className="project-card" {...reveal} transition={{ duration: 0.48, delay: (index % 2) * 0.08 }}>
    <a className={`project-visual ${project.visual || 'project-a'}`} href={project.url} target="_blank" rel="noreferrer" aria-label={`Open the ${project.name} website`}>{project.image && !imageFailed ? <img className="project-screenshot" src={project.image} alt={`${project.name} project screenshot`} loading="lazy" onError={() => setImageFailed(true)} /> : <span className="project-image-placeholder"><b>{project.mark || project.name.slice(0, 2).toUpperCase()}</b><span>Open live project</span></span>}<span className="project-image-label"><span className="image-label-dot" />PROJECT LINK</span><span className="project-no">PROJECT / {number}</span><span className="project-visual-link"><ArrowUpRight size={20} /></span></a>
    <div className="project-meta"><span>{project.type}</span><span>{number} / {String(total).padStart(2, '0')}</span></div><h3>{project.name}</h3><p>{project.description}</p><div className="tag-list">{(project.tags || []).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><a className="text-link" href={project.url} target="_blank" rel="noreferrer">Visit live site <ArrowUpRight size={15} /></a>
  </motion.article>
}

function CertificateCard({ certificate, index }) {
  const [imageFailed, setImageFailed] = useState(false)
  return <motion.article className="certificate-card" {...reveal} transition={{ duration: 0.42, delay: (index % 3) * 0.05 }}>
    <div className="certificate-art">{certificate.image && !imageFailed ? <img src={certificate.image} alt={`${certificate.title} certificate`} loading="lazy" onError={() => setImageFailed(true)} /> : <div className="certificate-placeholder"><span className="certificate-mark">{certificate.mark}</span><Award size={25} /><span>Certificate image<br />not added yet</span></div>}<span className="certificate-count">{String(index + 1).padStart(2, '0')}</span></div>
    <div className="certificate-card-title"><span className="eyebrow"><span className="eyebrow-dot" />Certificate</span><h2>{certificate.title}</h2></div>
  </motion.article>
}

function ResumeSection() {
  const [previewError, setPreviewError] = useState(false)
  const [activeResume, setActiveResume] = useState('portfolio')
  const fallbackProject = projects[0]
  const resumeUrl = activeResume === 'custom' && profile.customResume ? profile.customResume : profile.resume
  const resumeFilename = activeResume === 'custom' ? 'Gayathri-Gottemukkala-Resume.pdf' : 'Gayathri-Gottemukkala-Portfolio-Resume.pdf'
  return <section className="section resume-section" id="resume"><div className="container resume-layout">
    <motion.div className="resume-copy" {...reveal}><span className="eyebrow"><span className="eyebrow-dot" />Resume</span><h2>My experience,<br /><em>at a glance.</em></h2><p>{profile.customResume ? 'Choose the portfolio-built version or your own resume PDF. Both can be previewed and downloaded here.' : 'The portfolio-built version is ready to preview and download. Your own PDF can be added as a second version.'}</p><div className="resume-actions"><a className="button button-light" href={resumeUrl} download={resumeFilename}><Download size={16} />Download {activeResume === 'custom' ? 'my resume' : 'resume'}</a><a className="resume-open-link" href={resumeUrl} target="_blank" rel="noreferrer">Open full resume <ArrowUpRight size={15} /></a></div><div className="resume-note"><FileText size={16} /><span>PDF · {activeResume === 'custom' ? 'Your resume' : 'Portfolio version'}</span></div></motion.div>
    <motion.div className="resume-preview-wrap" {...reveal}><div className="resume-preview-top"><div className="resume-tabs" role="tablist" aria-label="Choose resume version"><button type="button" role="tab" aria-selected={activeResume === 'portfolio'} className={activeResume === 'portfolio' ? 'resume-tab active' : 'resume-tab'} onClick={() => { setActiveResume('portfolio'); setPreviewError(false) }}>Portfolio version</button>{profile.customResume && <button type="button" role="tab" aria-selected={activeResume === 'custom'} className={activeResume === 'custom' ? 'resume-tab active' : 'resume-tab'} onClick={() => { setActiveResume('custom'); setPreviewError(false) }}>My resume</button>}</div><span>{activeResume === 'portfolio' ? 'PNG PREVIEW' : 'PDF PREVIEW'}</span></div>{previewError ? <a className="resume-fallback" href={fallbackProject.url} target="_blank" rel="noreferrer"><img src={fallbackProject.image} alt={`${fallbackProject.name} live website preview`} /><span className="resume-fallback-overlay"><span>RESUME PREVIEW UNAVAILABLE</span><strong>View a live project instead <ArrowUpRight size={16} /></strong></span></a> : activeResume === 'portfolio' ? <div className="resume-image-scroll"><img className="resume-image-preview" src="/resume-preview.png" alt="Portfolio-built resume preview" onError={() => setPreviewError(true)} /></div> : <iframe key={resumeUrl} className="resume-frame" src={`${resumeUrl}#view=FitH&toolbar=0&navpanes=0`} title="Your resume PDF preview" onError={() => setPreviewError(true)} />}</motion.div>
  </div></section>
}

function HomePage() {
  const [year] = useState(new Date().getFullYear())
  const [copied, setCopied] = useState(false)
  async function copyEmail() { try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { window.location.href = `mailto:${profile.email}` } }
  return <><a className="skip-link" href="#main">Skip to content</a><Navbar /><main id="main">
    <section className="hero" id="home"><div className="hero-orb" /><div className="container hero-inner"><motion.div className="hero-copy" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}><div className="availability"><span className="availability-dot" />Building for the web, end to end</div><p className="hero-kicker">Hello, I’m</p><h1>Gayathri<br /><span>Gottemukkala.</span></h1><div className="hero-role"><span className="role-line" />Full Stack Developer</div><p className="hero-description">I build thoughtful, responsive web applications — connecting the details people see with the systems that make them work.</p><div className="hero-actions"><a className="button button-light" href="#projects">Explore my work <ArrowDownRight size={16} /></a><a className="button button-outline" href="#contact">Let’s talk <ArrowUpRight size={16} /></a>{profile.resume && <a className="button button-outline" href={profile.resume} target="_blank" rel="noreferrer" download>Download resume <ArrowDown size={16} /></a>}</div><div className="hero-location"><MapPin size={14} />India <span className="location-separator">·</span> Open to meaningful work</div></motion.div><motion.div className="hero-art" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.18 }}><CodeWindow /><div className="hero-art-caption"><span>01 — 05</span><span>Curious by nature. Careful by design.</span></div></motion.div></div><a className="scroll-cue" href="#about"><span>Scroll to explore</span><ArrowDown size={14} /></a><div className="hero-index">PORTFOLIO&nbsp; · &nbsp;2026</div></section>

    <section className="section about-section" id="about"><div className="container"><SectionHeading eyebrow="A little about me" title={<>I care about how<br />the pieces <em>fit together.</em></>} /><div className="about-layout"><motion.div className="about-copy" {...reveal}><p className="lead">I’m a Full Stack Developer who enjoys building useful products from the first interface to the data behind it.</p><p>{profile.summary}</p><p>My experience spans recruitment platforms, CRM tools, and profile-based applications. Along the way I’ve worked with teams across product features, workflows, dashboards, APIs, and deployment.</p><button className="copy-email" onClick={copyEmail} aria-label="Copy email address"><span>{profile.email}</span>{copied ? <Check size={15} /> : <ArrowUpRight size={15} />}</button></motion.div><motion.div className="about-side" {...reveal}><div className="about-stat"><span className="stat-number">01<span>+</span></span><span className="stat-copy">Year of professional<br />development experience</span></div><div className="about-divider" /><div className="about-stat"><span className="stat-number">E2E</span><span className="stat-copy">From the first component<br />to a deployed application</span></div><div className="about-note"><Sparkles size={16} /><span>Always learning. Always building.</span></div></motion.div></div>
      <div className="education-block"><div className="education-heading"><span className="eyebrow"><span className="eyebrow-dot" />Education</span><span className="education-intro">Where my journey started</span></div><div className="education-list">{education.map((item) => <motion.div className="education-item" key={item.degree} {...reveal}><div><h3>{item.degree}</h3><p>{item.school}</p></div><div className="education-detail"><span>{item.period}</span><span className="education-score">{item.score}</span></div></motion.div>)}</div></div>
    </div></section>

    <section className="section experience-section" id="experience"><div className="container"><SectionHeading eyebrow="The journey so far" title={<>Work that <em>matters.</em></>} description="A growing career, shaped by hands-on work across full stack and frontend development." /><div className="timeline">{experience.map((job, i) => <motion.article className="timeline-item" key={job.company} {...reveal} transition={{ duration: 0.48, delay: i * 0.08 }}><div className="timeline-marker"><span /></div><div className="timeline-time"><span>{job.period}</span><small>{job.location}</small></div><div className="timeline-content"><div className="timeline-title"><div><h3>{job.company}</h3><p>{job.role}</p></div><BriefcaseBusiness size={18} /></div><ul>{job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div></motion.article>)}</div></div></section>

    <section className="section projects-section" id="projects"><div className="container"><div className="projects-heading"><SectionHeading eyebrow="Selected work" title={<>Things I’ve <em>helped build.</em></>} description="A few of the platforms and products I’ve contributed to along the way." /><span className="projects-count">04 <span>projects</span></span></div><div className="projects-grid">{projects.map((project, i) => <ProjectCard project={project} index={i} key={project.name} />)}</div><div className="collection-more"><span className="project-footnote"><span className="footnote-line" />Links open the live projects. Contributions described are my own.</span><a className="button button-dark-outline" href="/projects">Show all {allProjects.length} projects <ArrowUpRight size={15} /></a></div></div></section>

    <section className="section certifications-section" id="certifications"><div className="container"><div className="certificate-home-heading"><SectionHeading eyebrow="Learning & growth" title={<>The work of<br /><em>getting better.</em></>} description="A few certificates and learning milestones from my journey." /><a className="button button-dark-outline" href="/certificates">Show all {certifications.length} certificates <ArrowUpRight size={15} /></a></div><div className="certificate-grid certificate-home-grid">{certifications.slice(0, 3).map((certificate, index) => <CertificateCard key={certificate.title} certificate={certificate} index={index} />)}</div></div></section>

    <SkillsSection />

    <ResumeSection />

    <section className="contact-section" id="contact"><div className="contact-topline"><span>Have a project in mind?</span><span>Let’s make it happen <ArrowDownRight size={15} /></span></div><div className="container contact-layout"><div className="contact-copy"><span className="eyebrow"><span className="eyebrow-dot" />Get in touch</span><h2>Let’s start a<br /><em>conversation.</em></h2><p>I’m always glad to hear about thoughtful projects, new opportunities, or a good conversation about building for the web.</p><div className="contact-direct"><span className="contact-label">EMAIL ME DIRECTLY</span><button onClick={copyEmail}>{copied ? 'Email copied ✓' : profile.email} {!copied && <ArrowUpRight size={15} />}</button></div><div className="contact-details"><a href={`tel:${profile.phone}`}><Phone size={15} />+91 {profile.phone}</a><span><MapPin size={15} />India</span></div></div><div className="contact-form-wrap"><div className="form-heading"><h3>Send a message</h3><span>Fields marked * are required</span></div><ContactForm /></div></div></section>
  </main>
  <footer className="footer"><div className="container"><div className="footer-main"><a className="brand footer-brand" href="#home"><span className="brand-mark">G.</span><span>Gayathri Gottemukkala</span></a><span className="footer-thought">Built with care, one component at a time.</span><div className="footer-socials"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={17} /></a>{profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin size={17} /></a>}<a href={`mailto:${profile.email}`} aria-label="Email Gayathri"><Mail size={17} /></a><a href={profile.portfolio} target="_blank" rel="noreferrer" aria-label="Current portfolio"><ExternalLink size={16} /></a></div></div><div className="footer-bottom"><span>© {year} Gayathri Gottemukkala</span><span>Designed & developed with intention</span><a href="#home">Back to top <ChevronUp size={14} /></a></div></div></footer></>
}

function CollectionHeader({ eyebrow, title, description }) {
  return <header className="collection-header"><a className="collection-brand" href="/" aria-label="Back to portfolio"><span className="brand-mark">G.</span><span>Gayathri Gottemukkala</span></a><a className="collection-back" href="/"><ArrowLeft size={15} />Back to portfolio</a><div className="collection-title"><span className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</span><h1>{title}</h1><p>{description}</p></div></header>
}

function CollectionsFooter() {
  return <footer className="collection-footer"><span>© {new Date().getFullYear()} Gayathri Gottemukkala</span><a href="/">Return to portfolio <ArrowUpRight size={14} /></a></footer>
}

function AllProjectsPage() {
  return <main className="collection-page"><div className="container"><CollectionHeader eyebrow="Project archive" title="All projects." description="Featured work and personal projects. Open any preview to visit its live website." /><div className="projects-grid collection-project-grid">{allProjects.map((project, index) => <ProjectCard key={`${project.name}-${project.url}`} project={project} index={index} total={allProjects.length} />)}</div><CollectionsFooter /></div></main>
}

function AllCertificatesPage() {
  return <main className="collection-page"><div className="container"><CollectionHeader eyebrow="Learning & growth" title="Certificates." description="Certificates and learning milestones. Local certificate images are shown where available." /><div className="certificate-grid">{certifications.map((certificate, index) => <CertificateCard key={certificate.title} certificate={certificate} index={index} />)}</div><CollectionsFooter /></div></main>
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path === '/projects') return <AllProjectsPage />
  if (path === '/certificates' || path === '/certifications') return <AllCertificatesPage />
  return <HomePage />
}
