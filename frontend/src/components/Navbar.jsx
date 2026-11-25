import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { profile } from '../data/portfolio'

const links = [['About', '#about'], ['Experience', '#experience'], ['Projects', '#projects'], ['Certificates', '#certifications'], ['Skills', '#skills'], ['Resume', '#resume']]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return <header className="navbar"><a className="brand" href="#home" aria-label="Gayathri Gottemukkala, home"><span className="brand-mark">G.</span><span>Gayathri Gottemukkala</span></a>
    <button className="menu-toggle" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
    <nav className={open ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">{links.map(([label, url]) => <a key={label} href={url} onClick={() => setOpen(false)}>{label}</a>)}<a href={profile.linkedin || 'mailto:gayathrigottemukkala@gmail.com?subject=LinkedIn%20profile'} onClick={profile.linkedin ? undefined : (event) => { event.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); setOpen(false) }}>{profile.linkedin ? 'LinkedIn' : 'Contact'} <ArrowUpRight size={14} /></a></nav>
  </header>
}
