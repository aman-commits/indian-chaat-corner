import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export default function InquiryModal({ isOpen, onClose, selectedDish }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Catalog inquiry simulation (no checkout or cart)
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(27, 22, 18, 0.75)',
              backdropFilter: 'blur(8px)',
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '520px',
              maxHeight: 'min(92vh, 680px)',
              overflowY: 'auto',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-stage)',
              zIndex: 10,
              padding: 'clamp(1.25rem, 3vw, 2.25rem)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                padding: '4px',
              }}
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '2.5rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <CheckCircle2 size={48} color="var(--color-forest)" />
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.8rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  Inquiry Received
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                  Thank you for reaching out to Indian Chat Corner. Our team will connect with you shortly regarding your dining or catering inquiry.
                </p>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--color-saffron)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '6px',
                    }}
                  >
                    <Sparkles size={13} />
                    <span>Catalog Inquiry</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.85rem',
                      color: 'var(--text-primary)',
                      lineHeight: 1.2,
                    }}
                  >
                    {selectedDish ? `Inquire: ${selectedDish.name}` : 'Connect with Us'}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      marginTop: '4px',
                    }}
                  >
                    {selectedDish
                      ? `Ask about preparation, private tasting, or catering availability for this dish.`
                      : 'Have questions about our menu collection or catering services? Send us a message.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        marginBottom: '4px',
                      }}
                    >
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Aditi Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-sans)',
                        backgroundColor: 'var(--bg-warm)',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: 'var(--text-secondary)',
                          marginBottom: '4px',
                        }}
                      >
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-subtle)',
                          fontSize: '0.9rem',
                          fontFamily: 'var(--font-sans)',
                          backgroundColor: 'var(--bg-warm)',
                          outline: 'none',
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: 'var(--text-secondary)',
                          marginBottom: '4px',
                        }}
                      >
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+91..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-subtle)',
                          fontSize: '0.9rem',
                          fontFamily: 'var(--font-sans)',
                          backgroundColor: 'var(--bg-warm)',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        marginBottom: '4px',
                      }}
                    >
                      Message or Inquiry Details
                    </label>
                    <textarea
                      rows={3}
                      placeholder={
                        selectedDish
                          ? `Inquiring about ${selectedDish.name} for an upcoming gathering...`
                          : 'Write your message or inquiry here...'
                      }
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-sans)',
                        backgroundColor: 'var(--bg-warm)',
                        outline: 'none',
                        resize: 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      marginTop: '0.5rem',
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-saffron)',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 16px var(--color-saffron-glow)',
                    }}
                  >
                    <span>Submit Inquiry</span>
                    <Send size={15} />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

