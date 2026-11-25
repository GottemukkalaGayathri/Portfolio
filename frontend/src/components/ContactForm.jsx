import { useState } from 'react'
import { ArrowUpRight, LoaderCircle } from 'lucide-react'

const initial = { name: '', email: '', subject: '', message: '' }

export default function ContactForm() {
  const [form, setForm] = useState(initial)
  const [state, setState] = useState({ loading: false, type: '', message: '' })
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  async function submit(event) {
    event.preventDefault()
    setState({ loading: true, type: '', message: '' })
    try {
      const base = (import.meta.env.VITE_API_URL || 'https://portfolio-backend-unj2.onrender.com/api').replace(/\/+$/, '')
      const response = await fetch(`${base}/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Could not send your message. Please try again.')
      setForm(initial)
      setState({ loading: false, type: data.emailSent === false ? 'error' : 'success', message: data.message || 'Thanks for reaching out. Your message has been received.' })
    } catch (error) {
      setState({ loading: false, type: 'error', message: error.message || 'Unable to reach the server. Please email me directly.' })
    }
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-grid"><label>Your name<input name="name" value={form.name} onChange={update} required minLength="2" maxLength="80" placeholder="Jane Smith" autoComplete="name" /></label><label>Email address<input name="email" type="email" value={form.email} onChange={update} required maxLength="254" placeholder="jane@company.com" autoComplete="email" /></label></div>
    <label>Subject<input name="subject" value={form.subject} onChange={update} required minLength="3" maxLength="120" placeholder="Let's build something" /></label>
    <label>Your message<textarea name="message" value={form.message} onChange={update} required minLength="10" maxLength="5000" rows="5" placeholder="A little about what you have in mind…" /></label>
    <div className="form-bottom"><button className="button button-light" type="submit" disabled={state.loading}>{state.loading ? <>Sending <LoaderCircle className="spin" size={16} /></> : <>Send message <ArrowUpRight size={16} /></>}</button><span className="form-hint">Usually replies within 1–2 business days</span></div>
    {state.message && <p className={`form-message ${state.type}`} role="status" aria-live="polite">{state.message}</p>}
  </form>
}
