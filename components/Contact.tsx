import Reveal from './Reveal'
import EnquiryForm from './EnquiryForm'
import { site } from '@/lib/site'

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container contact-grid">
        <Reveal>
          <p className="eyebrow">Bookings &amp; enquiries</p>
          <h2 className="h2">Let&apos;s create something unforgettable.</h2>
          <p className="lead">Tell us about your event. Malhar replies personally to every enquiry.</p>
          <div className="stack">
            {site.phone && (
              <a className="btn btn-gold btn-block" href={`tel:${site.phone}`}>
                <span aria-hidden="true">📞</span> Call {site.phoneLabel}
              </a>
            )}
            {site.whatsapp && (
              <a
                className="btn btn-ghost btn-block"
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Malhar
              </a>
            )}
            <a className="btn btn-ghost btn-block" href={`mailto:${site.email}`}>
              ✉ {site.email}
            </a>
            <a className="btn btn-ghost btn-block" href={site.instagram} target="_blank" rel="noopener noreferrer">
              Message on Instagram {site.instagramHandle}
            </a>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  )
}
