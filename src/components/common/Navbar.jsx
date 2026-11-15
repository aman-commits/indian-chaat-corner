import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenInquiry }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Craft', href: '#storytelling' },
    { label: 'Food Catalog', href: '#catalog' },
    { label: 'Guest Impressions', href: '#testimonials' },
    { label: 'Connect', href: '#contact' },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: scrolled ? 'rgba(253, 251, 247, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(234, 227, 213, 0.8)' : '1px solid transparent',
        boxShadow: scrolled ? '0 8px 32px rgba(36, 30, 25, 0.04)' : 'none',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: scrolled ? '72px' : '90px',
          transition: 'height 0.4s ease',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-saffron)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '1.1rem',
              fontFamily: 'var(--font-serif)',
              boxShadow: '0 4px 12px var(--color-saffron-glow)',
            }}
          >
            IC
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.05rem, 3.8vw, 1.25rem)',
                fontWeight: 700,
                letterSpacing: '0.03em',
                color: 'var(--text-primary)',
                lineHeight: 1.1,
              }}
            >
              INDIAN CHAT CORNER
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.6rem, 2vw, 0.68rem)',
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: 'var(--color-saffron)',
                textTransform: 'uppercase',
              }}
            >
              Artisanal Street Gastronomy
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2.5rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              style={{
                textDecoration: 'none',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                letterSpacing: '0.02em',
                position: 'relative',
                transition: 'color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-saffron)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            >
              {link.label}
            </a>
          ))}

          {/* Contact Inquiry Pill */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onOpenInquiry ? onOpenInquiry() : handleNavClick('#contact')}
            style={{
              padding: '0.65rem 1.4rem',
              backgroundColor: 'var(--color-forest)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.04em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 16px rgba(27, 56, 43, 0.2)',
            }}
          >
            <span>Inquire</span>
            <ArrowUpRight size={15} />
          </motion.button>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: 'var(--text-primary)',
          }}
          className="mobile-toggle"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              backgroundColor: 'var(--bg-canvas)',
              borderBottom: '1px solid var(--border-subtle)',
              overflow: 'hidden',
            }}
          >
            <div
              className="container"
              style={{
                paddingTop: '1.5rem',
                paddingBottom: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  style={{
                    textDecoration: 'none',
                    fontSize: '1.2rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(234, 227, 213, 0.4)',
                  }}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenInquiry) onOpenInquiry();
                  else handleNavClick('#contact');
                }}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.85rem',
                  backgroundColor: 'var(--color-saffron)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                }}
              >
                Inquire & Visit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}

