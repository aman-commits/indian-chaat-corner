import React from 'react';
import { ArrowUpRight, MapPin, Clock, Phone, Mail, Globe, Share2 } from 'lucide-react';

export default function FooterSection({ onOpenInquiry }) {
  const handleScrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      style={{
        backgroundColor: '#1b1612', // Deep cacao umber
        color: '#fdfbf7',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* SECTION 08 (PART A): MONUMENTAL BRAND FINALE CTA */}
      <div
        style={{
          padding: 'clamp(5rem, 10vw, 8rem) 0 clamp(4rem, 8vw, 6rem)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          position: 'relative',
        }}
      >
        {/* Subtle Saffron Radial Glow */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217, 107, 39, 0.16) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--color-saffron-light)',
              marginBottom: '1.25rem',
            }}
          >
            An Authentic Culinary Journey Awaits
          </span>

          <h2
            style={{
              fontSize: 'clamp(2.1rem, 6vw, 5.5rem)',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              maxWidth: '950px',
              margin: '0 auto 1.5rem',
            }}
          >
            Taste the Heritage. Visit <span style={{ color: 'var(--color-saffron-light)' }}>Indian Chat Corner</span>.
          </h2>

          <p
            style={{
              color: 'rgba(253, 251, 247, 0.75)',
              fontSize: 'clamp(1rem, 1.3vw, 1.25rem)',
              maxWidth: '640px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
              fontFamily: 'var(--font-sans)',
            }}
          >
            Whether planning an event catering inquiry or stopping by to relish the golden crunch of fresh Vada Pav, we welcome you to our table.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={onOpenInquiry}
              style={{
                padding: '0.95rem 2.4rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-saffron)',
                color: '#ffffff',
                border: 'none',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 30px rgba(217, 107, 39, 0.4)',
                transition: 'transform 0.2s ease, background-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.backgroundColor = 'var(--color-saffron-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = 'var(--color-saffron)';
              }}
            >
              <span>Connect & Inquire</span>
              <ArrowUpRight size={16} />
            </button>

            <button
              onClick={() => handleScrollTo('#catalog')}
              style={{
                padding: '0.95rem 2.2rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, background-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ffffff';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span>Browse Catalog</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 08 (PART B): ARCHITECTURAL FOOTER DIRECTORY */}
      <div style={{ padding: 'clamp(3rem, 6vw, 4.5rem) 0 2rem' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
              marginBottom: '3.5rem',
            }}
          >
            {/* Col 1: Brand Philosophy */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-saffron)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontFamily: 'var(--font-serif)',
                  }}
                >
                  IC
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: '#ffffff',
                  }}
                >
                  INDIAN CHAT CORNER
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.88rem',
                  color: 'rgba(253, 251, 247, 0.65)',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                }}
              >
                An artisan tribute to the master street food vendors of India. Prepared fresh with slow-roasted spices and authentic ingredients.
              </p>
              <div
                style={{
                  display: 'inline-block',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  color: 'rgba(253, 251, 247, 0.5)',
                  textTransform: 'uppercase',
                }}
              >
                Catalog-Only Experience
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <h4
                style={{
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-saffron-light)',
                  marginBottom: '1.25rem',
                }}
              >
                Catering & Discovery
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Cinematic Hero Experience', href: '#root' },
                  { label: 'Story of Vada Pav', href: '#storytelling' },
                  { label: 'The Gastronomic Collection', href: '#catalog' },
                  { label: 'Panoramic Guest Impressions', href: '#testimonials' },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleScrollTo(item.href);
                      }}
                      style={{
                        color: 'rgba(253, 251, 247, 0.75)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-saffron-light)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253, 251, 247, 0.75)')}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Verified Placeholder Operating Hours */}
            <div>
              <h4
                style={{
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-saffron-light)',
                  marginBottom: '1.25rem',
                }}
              >
                Service Hours
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Clock size={16} color="var(--color-saffron-light)" style={{ marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>Tasting & Dine-in</div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(253, 251, 247, 0.55)' }}>
                      [Hours Slot: 11:30 AM – 10:30 PM (Placeholder)]
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <MapPin size={16} color="var(--color-saffron-light)" style={{ marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>Location Information</div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(253, 251, 247, 0.55)' }}>
                      [Address Details: To be supplied by business]
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 4: Verified Placeholder Contact Inquiries */}
            <div>
              <h4
                style={{
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-saffron-light)',
                  marginBottom: '1.25rem',
                }}
              >
                Direct Connect
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={16} color="var(--color-saffron-light)" />
                  <span style={{ fontSize: '0.85rem', color: 'rgba(253, 251, 247, 0.7)' }}>
                    [Inquiry Email: Provided on Request]
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} color="var(--color-saffron-light)" />
                  <span style={{ fontSize: '0.85rem', color: 'rgba(253, 251, 247, 0.7)' }}>
                    [Phone Number: Provided on Request]
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '0.5rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(253, 251, 247, 0.6)',
                      fontSize: '0.75rem',
                    }}
                    title="Website / Social"
                  >
                    <Globe size={16} />
                  </div>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(253, 251, 247, 0.6)',
                      fontSize: '0.75rem',
                    }}
                    title="Share Catalog"
                  >
                    <Share2 size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Saffron Accent */}
          <div
            style={{
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              fontSize: '0.8rem',
              color: 'rgba(253, 251, 247, 0.45)',
            }}
          >
            <div>
              &copy; 2026 Indian Chat Corner. All rights reserved. Catalog & Brand Experience.
            </div>
            <div>
              Designed & Engineered with GSAP & React.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
