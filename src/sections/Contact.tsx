import { useState, type FormEvent } from 'react';
import { CONTACT } from '../data/portfolio';

// Free key from https://web3forms.com, set in .env as VITE_WEB3FORMS_KEY.
// Without a key the form falls back to opening the visitor's mail app.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;
type Status = 'idle' | 'sending' | 'sent' | 'error';

function validate(name: string, email: string, message: string): Errors {
  const errors: Errors = {};
  if (!name) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email.';
  if (message.length < 10) errors.message = 'At least 10 characters, please.';
  return errors;
}

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    const found = validate(name, email, message);
    setErrors(found);
    if (Object.keys(found).length) return;

    if (!WEB3FORMS_KEY) {
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`${message}\n\n${name} · ${email}`);
      window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: `Portfolio contact from ${name}`, name, email, message }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="wrap section contact">
      <div className="contact-intro">
        <h2 className="mono section-title">6 · ORDERING INFORMATION</h2>
        <p className="contact-big">In stock from February 2027.</p>
        <p>Looking for a job as IoT or embedded developer. On-site, hybrid or remote.</p>
        <a href={`mailto:${CONTACT.email}`} className="contact-mail">
          {CONTACT.email}
        </a>
      </div>

      <div className="contact-box">
        {status === 'sent' ? (
          <div role="status" className="contact-sent">
            <span className="mono chip">ORDER RECEIVED</span>
            <h3>Thanks, message sent.</h3>
            <p>I'll get back to you soon.</p>
            <button type="button" className="btn btn-outline" onClick={() => setStatus('idle')}>
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="contact-form">
            <div className="field">
              <label htmlFor="c-name">Name</label>
              <input id="c-name" name="name" type="text" autoComplete="name" aria-invalid={!!errors.name} aria-describedby="c-name-err" />
              {errors.name && <p id="c-name-err" className="field-error">{errors.name}</p>}
            </div>
            <div className="field">
              <label htmlFor="c-email">Email</label>
              <input id="c-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby="c-email-err" />
              {errors.email && <p id="c-email-err" className="field-error">{errors.email}</p>}
            </div>
            <div className="field field-wide">
              <label htmlFor="c-msg">Message</label>
              <textarea id="c-msg" name="message" rows={5} aria-invalid={!!errors.message} aria-describedby="c-msg-err" />
              {errors.message && <p id="c-msg-err" className="field-error">{errors.message}</p>}
            </div>
            {status === 'error' && (
              <p role="alert" className="field-error field-wide">
                Sending failed. Please email me directly at {CONTACT.email}.
              </p>
            )}
            <button type="submit" className="btn btn-solid field-wide submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message →'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
