import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight } from 'lucide-react';
import { dishesData } from '../../data/dishesData';

gsap.registerPlugin(ScrollTrigger);

export default function FoodStorySection({ onInquireDish }) {
  const masterContainerRef = useRef(null);
  const pointerWrapperRef = useRef(null);
  const dishVisualRefs = useRef([]);
  const narrativeCardRefs = useRef([]);
  const progressLineRef = useRef(null);
  const [activeDishIndex, setActiveDishIndex] = useState(0);

  const mouseCoordsRef = useRef({
    targetX: 0,
    targetY: 0,
    targetRotX: 0,
    targetRotY: 0,
    currentX: 0,
    currentY: 0,
    currentRotX: 0,
    currentRotY: 0,
  });

  const animFrameIdRef = useRef(null);

  // Mouse / Pointer Parallax on Inner Wrapper
  useEffect(() => {
    // Check if device supports fine hover/cursor
    const isTouch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (isTouch) return;

    const coords = mouseCoordsRef.current;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth) - 0.5;
      const normY = (e.clientY / innerHeight) - 0.5;

      coords.targetX = normX * 24; // ±12px
      coords.targetY = normY * 20; // ±10px
      coords.targetRotX = -normY * 6; // ±3deg
      coords.targetRotY = normX * 6;  // ±3deg
    };

    const renderLoop = () => {
      coords.currentX += (coords.targetX - coords.currentX) * 0.08;
      coords.currentY += (coords.targetY - coords.currentY) * 0.08;
      coords.currentRotX += (coords.targetRotX - coords.currentRotX) * 0.08;
      coords.currentRotY += (coords.targetRotY - coords.currentRotY) * 0.08;

      if (pointerWrapperRef.current) {
        pointerWrapperRef.current.style.transform = `translate3d(${coords.currentX.toFixed(2)}px, ${coords.currentY.toFixed(2)}px, 0) rotateX(${coords.currentRotX.toFixed(2)}deg) rotateY(${coords.currentRotY.toFixed(2)}deg)`;
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  // GSAP Master ScrollTrigger Setup
  useEffect(() => {
    const container = masterContainerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const totalDishes = dishesData.length; // 4 dishes
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const rotFactor = prefersReducedMotion ? 0 : 1;

      // Master pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${totalDishes * 100}%`,
          pin: true,
          scrub: prefersReducedMotion ? false : 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const rawProgress = self.progress;
            const index = Math.min(
              totalDishes - 1,
              Math.floor(rawProgress * totalDishes)
            );
            setActiveDishIndex(index);

            if (progressLineRef.current) {
              progressLineRef.current.style.height = `${rawProgress * 100}%`;
            }
          },
        },
      });

      // Orchestrate the 4 dishes sequentially
      dishesData.forEach((dish, i) => {
        const visual = dishVisualRefs.current[i];
        const narrative = narrativeCardRefs.current[i];
        if (!visual || !narrative) return;

        const startTime = i * 2;

        if (i === 0) {
          // Dish 1 starts visible on initial load
          gsap.set(visual, { opacity: 1, scale: 1, rotation: 0, y: 0 });
          gsap.set(narrative, { opacity: 1, y: 0 });

          // Dish 1 exit
          tl.to(
            visual,
            {
              opacity: 0,
              scale: prefersReducedMotion ? 0.9 : 0.72,
              rotation: -18 * rotFactor,
              y: prefersReducedMotion ? 0 : -40,
              duration: 0.8,
              ease: 'power2.inOut',
            },
            startTime + 1.2
          );
          tl.to(
            narrative,
            {
              opacity: 0,
              y: prefersReducedMotion ? 0 : -30,
              duration: 0.6,
              ease: 'power2.inOut',
            },
            startTime + 1.2
          );
        } else {
          // Dish i entrance
          gsap.set(visual, {
            opacity: 0,
            scale: prefersReducedMotion ? 0.95 : 0.75,
            rotation: (i % 2 === 0 ? -22 : 22) * rotFactor,
            y: prefersReducedMotion ? 0 : 50,
          });
          gsap.set(narrative, { opacity: 0, y: prefersReducedMotion ? 0 : 40 });

          tl.to(
            visual,
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              y: 0,
              duration: 0.9,
              ease: 'power2.out',
            },
            startTime
          );
          tl.to(
            narrative,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out',
            },
            startTime + 0.1
          );

          // Dish i exit (if not last)
          if (i < totalDishes - 1) {
            tl.to(
              visual,
              {
                opacity: 0,
                scale: prefersReducedMotion ? 0.9 : 0.7,
                rotation: (i % 2 === 0 ? 20 : -20) * rotFactor,
                y: prefersReducedMotion ? 0 : -40,
                duration: 0.8,
                ease: 'power2.inOut',
              },
              startTime + 1.2
            );
            tl.to(
              narrative,
              {
                opacity: 0,
                y: prefersReducedMotion ? 0 : -30,
                duration: 0.6,
                ease: 'power2.inOut',
              },
              startTime + 1.2
            );
          }
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="storytelling"
      ref={masterContainerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-canvas)',
      }}
    >
      {/* Background Decorative Rings */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '25%',
          transform: 'translate(50%, -50%)',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          border: '1px dashed rgba(217, 107, 39, 0.14)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '25%',
          transform: 'translate(50%, -50%)',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          border: '1px solid rgba(27, 56, 43, 0.05)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Step Progress Vertical Rail */}
        <div
          style={{
            position: 'absolute',
            left: 'clamp(1rem, 2.5vw, 2.5rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            height: '240px',
            width: '2px',
            backgroundColor: 'rgba(36, 30, 25, 0.08)',
            display: 'none',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 20,
          }}
          className="progress-rail"
        >
          <div
            ref={progressLineRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '0%',
              backgroundColor: 'var(--color-saffron)',
              transition: 'height 0.1s linear',
            }}
          />
          {dishesData.map((d, idx) => (
            <div
              key={d.id}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor:
                  activeDishIndex >= idx ? 'var(--color-saffron)' : '#d8cebf',
                transition: 'background-color 0.3s ease, transform 0.3s ease',
                transform: activeDishIndex === idx ? 'scale(1.5)' : 'scale(1)',
                zIndex: 2,
              }}
            />
          ))}
        </div>

        {/* LEFT COLUMN: Narrative Editorial Stack */}
        <div
          className="narrative-column"
          style={{
            flex: '1 1 50%',
            maxWidth: '580px',
            position: 'relative',
            height: '520px',
            display: 'flex',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          {dishesData.map((dish, index) => (
            <div
              key={dish.id}
              ref={(el) => (narrativeCardRefs.current[index] = el)}
              className="narrative-card"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                pointerEvents: activeDishIndex === index ? 'auto' : 'none',
              }}
            >
              {/* Step & Badge Header */}
              <div
                className="step-header"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '1rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: dish.accentColor,
                  }}
                >
                  {dish.stepNumber}
                </span>
                <span
                  style={{
                    width: '32px',
                    height: '1px',
                    backgroundColor: dish.accentColor,
                    opacity: 0.6,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                  }}
                >
                  {dish.badge}
                </span>
              </div>

              {/* Title */}
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 3.5rem)',
                  marginBottom: '0.75rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                {dish.title}
              </h2>

              {/* Subtitle */}
              <p
                className="dish-subtitle"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
                  fontStyle: 'italic',
                  color: 'var(--color-forest)',
                  marginBottom: '1.25rem',
                  lineHeight: 1.4,
                }}
              >
                "{dish.subtitle}"
              </p>

              {/* Description */}
              <p
                className="dish-description"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.98rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  marginBottom: '1.75rem',
                }}
              >
                {dish.description}
              </p>

              {/* Flavor Capsule Pills */}
              <div
                className="flavor-pills"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '2rem',
                }}
              >
                {dish.flavorPills.map((pill) => (
                  <span
                    key={pill}
                    className="flavor-pill-item"
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--bg-warm)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Sparkles size={11} color={dish.accentColor} />
                    {pill}
                  </span>
                ))}
              </div>

              {/* Meta details & Inquire link */}
              <div
                className="meta-details"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      fontWeight: 600,
                    }}
                  >
                    Origin
                  </span>
                  <span
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {dish.details.origin}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      fontWeight: 600,
                    }}
                  >
                    Palate
                  </span>
                  <span
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {dish.details.temperament}
                  </span>
                </div>

                <button
                  onClick={() => onInquireDish && onInquireDish(dish)}
                  style={{
                    marginLeft: 'auto',
                    padding: '0.55rem 1.2rem',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--border-accent)',
                    borderRadius: 'var(--radius-full)',
                    color: 'var(--color-saffron)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-saffron)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-saffron)';
                  }}
                >
                  <span>Inquire Dish</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: Shared Food Stage */}
        <div
          style={{
            flex: '1 1 50%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
          className="stage-visual-container"
        >
          {/* Outer GSAP Transform Stage */}
          <div
            style={{
              position: 'relative',
              width: 'min(520px, 85vw)',
              height: 'min(520px, 85vw)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Ambient Radial Dish Platter Base */}
            <div
              style={{
                position: 'absolute',
                width: '92%',
                height: '92%',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(247, 243, 234, 0.7) 60%, rgba(235, 227, 213, 0.3) 100%)',
                boxShadow:
                  '0 30px 80px rgba(36, 30, 25, 0.08), inset 0 0 40px rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(234, 227, 213, 0.8)',
                zIndex: 1,
              }}
            />

            {/* Subtle Gold Outer Ring */}
            <div
              style={{
                position: 'absolute',
                width: '102%',
                height: '102%',
                borderRadius: '50%',
                border: '1px dashed rgba(203, 162, 88, 0.3)',
                animation: 'spinPlate 90s linear infinite',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            />

            {/* Inner Pointer Follow Wrapper (RAF Lerped, zero transform collision) */}
            <div
              ref={pointerWrapperRef}
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              {dishesData.map((dish, index) => (
                <div
                  key={dish.id}
                  ref={(el) => (dishVisualRefs.current[index] = el)}
                  style={{
                    position: 'absolute',
                    width: '85%',
                    height: '85%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    willChange: 'transform, opacity',
                  }}
                >
                  <img
                    src={dish.image}
                    alt={dish.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      mixBlendMode: 'multiply',
                      filter: 'drop-shadow(0 20px 30px rgba(36, 30, 25, 0.18))',
                      transition: 'filter 0.3s ease',
                      userSelect: 'none',
                    }}
                    onError={(e) => {
                      // Graceful fallback if image is missing
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spinPlate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (min-width: 992px) {
          .progress-rail {
            display: flex !important;
          }
        }
        @media (max-width: 900px) {
          #storytelling {
            height: 100vh !important;
            overflow: hidden !important;
          }
          #storytelling .container {
            flex-direction: column-reverse !important;
            justify-content: flex-end !important;
            align-items: center !important;
            gap: 0.5rem !important;
            padding-top: 4.5rem !important;
            padding-bottom: 1.5rem !important;
            height: 100% !important;
          }
          #storytelling .stage-visual-container {
            height: 38% !important;
            width: 100% !important;
            flex: none !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          #storytelling .stage-visual-container > div {
            width: min(280px, 62vw) !important;
            height: min(280px, 62vw) !important;
          }
          #storytelling .narrative-column {
            flex: 1 1 auto !important;
            width: 100% !important;
            max-width: 100% !important;
            height: 52% !important;
            position: relative !important;
          }
          #storytelling .narrative-card {
            justify-content: flex-start !important;
            padding-top: 0.25rem !important;
            text-align: center !important;
            align-items: center !important;
          }
          #storytelling .narrative-card .step-header {
            margin-bottom: 0.35rem !important;
          }
          #storytelling .narrative-card h2 {
            font-size: clamp(1.4rem, 4.5vw, 2.2rem) !important;
            margin-bottom: 0.35rem !important;
            line-height: 1.15 !important;
          }
          #storytelling .narrative-card .dish-subtitle {
            font-size: clamp(0.88rem, 2.8vw, 1.15rem) !important;
            margin-bottom: 0.45rem !important;
            line-height: 1.35 !important;
          }
          #storytelling .narrative-card .dish-description {
            font-size: clamp(0.78rem, 2.5vw, 0.92rem) !important;
            line-height: 1.45 !important;
            margin-bottom: 0.65rem !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 3 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            max-width: 520px !important;
          }
          #storytelling .narrative-card .flavor-pills {
            justify-content: center !important;
            margin-bottom: 0.65rem !important;
            gap: 6px !important;
          }
          #storytelling .narrative-card .flavor-pill-item {
            font-size: 0.7rem !important;
            padding: 0.2rem 0.55rem !important;
          }
          #storytelling .narrative-card .meta-details {
            padding-top: 0.45rem !important;
            gap: 1.25rem !important;
            width: 100% !important;
            justify-content: center !important;
            flex-wrap: wrap !important;
          }
        }
      `}</style>
    </section>
  );
}

