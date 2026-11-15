import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Sparkles } from 'lucide-react';
import { testimonialsData } from '../../data/testimonialsData';

gsap.registerPlugin(ScrollTrigger);

export default function CurvedTestimonialsSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    // DESKTOP & TABLET: Panoramic 3D Cylindrical Arc
    mm.add('(min-width: 768px)', () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=240%',
        pin: true,
        scrub: prefersReducedMotion ? false : 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const maxShift = (testimonialsData.length - 1) * 440;
          const currentShift = -progress * maxShift;

          gsap.set(track, {
            x: currentShift,
          });

          if (prefersReducedMotion) return;

          const viewportWidth = window.innerWidth;
          const viewportCenterX = viewportWidth / 2;

          cardsRef.current.forEach((card) => {
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const normalizedOffset = (cardCenterX - viewportCenterX) / (viewportWidth * 0.45);
            const clampedOffset = Math.max(-1.5, Math.min(1.5, normalizedOffset));

            // Cylindrical curvature geometry
            const rotateY = clampedOffset * 22; // Inward curved monitor arc
            const translateZ = -Math.abs(clampedOffset) * 110; // Setback into depth
            const scale = 1 - Math.min(0.2, Math.abs(clampedOffset) * 0.12);
            const opacity = 1 - Math.min(0.65, Math.abs(clampedOffset) * 0.45);

            gsap.set(card, {
              rotateY,
              translateZ,
              scale,
              opacity,
              transformOrigin: 'center center',
            });
          });
        },
      });
    });

    // MOBILE: Clean Touch-Friendly Horizontal Carousel with Smooth Momentum
    mm.add('(max-width: 767px)', () => {
      // On mobile, reset any GSAP transforms so CSS touch-scroll handles the track naturally
      gsap.set(track, { clearProps: 'all' });
      cardsRef.current.forEach((card) => {
        if (card) gsap.set(card, { clearProps: 'all' });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#161d18', // Deep royal forest umber
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(4rem, 8vw, 6rem) 0',
      }}
    >
      {/* Background Curved Horizon Lines (Atmospheric Installation) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '140vw',
          height: '70vh',
          borderRadius: '50%',
          border: '1px solid rgba(217, 107, 39, 0.12)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '170vw',
          height: '85vh',
          borderRadius: '50%',
          border: '1px dashed rgba(203, 162, 88, 0.08)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.4rem 1.1rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: 'var(--color-saffron-light)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          <Sparkles size={13} />
          <span>Curved Panoramic Experience</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
            color: '#fdfbf7',
            letterSpacing: '-0.02em',
          }}
        >
          Echoes of Flavor & Heritage
        </h2>

        <p
          style={{
            color: 'rgba(253, 251, 247, 0.7)',
            fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)',
            maxWidth: '620px',
            margin: '0.5rem auto 0',
          }}
        >
          A panoramic curved showcase of guest impressions and culinary reviews.
        </p>
      </div>

      {/* 3D Perspective Curved Container */}
      <div
        className="curved-track-container"
        style={{
          position: 'relative',
          width: '100%',
          perspective: '1400px',
          perspectiveOrigin: '50% 50%',
          display: 'flex',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        {/* Horizontal Track */}
        <div
          ref={trackRef}
          className="testimonials-track"
          style={{
            display: 'flex',
            gap: '32px',
            paddingLeft: 'max(15vw, 60px)',
            paddingRight: 'max(15vw, 60px)',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {testimonialsData.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="testimonial-panel"
              style={{
                width: 'clamp(320px, 32vw, 460px)',
                flexShrink: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
              }}
            >
              {/* Card Top */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-saffron-light)',
                    }}
                  >
                    {item.badge}
                  </span>

                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: 'rgba(253, 251, 247, 0.5)',
                      fontFamily: 'var(--font-sans)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {item.rating}
                  </span>
                </div>

                {/* Quote Icon */}
                <Quote
                  size={26}
                  style={{
                    color: 'rgba(217, 107, 39, 0.45)',
                    marginBottom: '0.75rem',
                  }}
                />

                {/* Quote Text */}
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.15rem, 1.4vw, 1.35rem)',
                    lineHeight: 1.5,
                    color: '#fdfbf7',
                    fontStyle: 'italic',
                    marginBottom: '1.5rem',
                  }}
                >
                  "{item.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div
                style={{
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: '#ffffff',
                        marginBottom: '2px',
                      }}
                    >
                      {item.author}
                    </h4>
                    <p
                      style={{
                        fontSize: '0.78rem',
                        color: 'rgba(253, 251, 247, 0.55)',
                      }}
                    >
                      {item.designation}
                    </p>
                  </div>

                  <span
                    style={{
                      padding: '0.3rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(217, 107, 39, 0.15)',
                      border: '1px solid rgba(217, 107, 39, 0.3)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: 'var(--color-saffron-light)',
                    }}
                  >
                    {item.highlightDish}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Swipe Guidance Pill */}
      <div
        className="mobile-swipe-guide"
        style={{
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          margin: '1.25rem auto 0',
          color: 'rgba(253, 251, 247, 0.55)',
          fontSize: '0.75rem',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        <span>← Swipe to explore impressions →</span>
      </div>

      {/* Responsive mobile touch styling */}
      <style>{`
        @media (max-width: 767px) {
          #testimonials {
            min-height: auto !important;
            padding: 4rem 0 !important;
          }
          .mobile-swipe-guide {
            display: flex !important;
          }
          .curved-track-container {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
            padding-bottom: 1rem !important;
            scroll-snap-type: x mandatory !important;
          }
          .curved-track-container::-webkit-scrollbar {
            display: none !important;
          }
          .testimonials-track {
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
            gap: 16px !important;
          }
          .testimonial-panel {
            width: 82vw !important;
            max-width: 340px !important;
            scroll-snap-align: center !important;
            scroll-snap-stop: always !important;
          }
        }
      `}</style>
    </section>
  );
}
