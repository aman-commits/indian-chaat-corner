import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 299;

export default function HeroSection({ onExplore }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const contentOverlayRef = useRef(null);
  const [loadProgress, setLoadProgress] = useState(0);

  // Cached image array
  const imagesRef = useRef([]);
  const currentFrameIndexRef = useRef(0);

  // Helper to get formatted filename
  const getFrameUrl = (index) => {
    const frameNum = String(index + 1).padStart(3, '0');
    const base = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`;
    return `${base}assets/hero-frames/ezgif-frame-${frameNum}.jpg`;
  };

  // Draw frame on canvas with crisp aspect-fit rendering
  const drawFrame = (img) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Adjust canvas buffer size for high DPI
    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Header safe clearance: keep gap between header and food visual at max 12-15px
    const headerHeight = displayWidth >= 860 ? 72 : 64;
    const targetGap = 12; // Guaranteed <= 15px gap below header
    const topOffset = headerHeight + targetGap;
    const availableHeight = displayHeight - topOffset;

    const imgRatio = img.width / img.height;
    const canvasRatio = displayWidth / availableHeight;

    let renderWidth, renderHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      renderWidth = displayWidth;
      renderHeight = displayWidth / imgRatio;
      offsetX = 0;
      offsetY = topOffset;
    } else {
      renderHeight = availableHeight;
      renderWidth = availableHeight * imgRatio;
      offsetX = (displayWidth - renderWidth) / 2;
      offsetY = topOffset;
    }

    // Clear and draw
    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    ctx.restore();
  };

  // Image loading strategy
  useEffect(() => {
    const images = [];
    imagesRef.current = images;

    // 1. Immediately load Frame 001 for zero-wait visual
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      images[0] = firstImg;
      drawFrame(firstImg);
    };

    // 2. Preload first 20 frames with high priority, then background load the rest
    let loadedCount = 1;
    const priorityBatch = 20;

    const loadRemaining = (startIndex, endIndex) => {
      for (let i = startIndex; i < endIndex && i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          images[i] = img;
          loadedCount++;
          setLoadProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        };
      }
    };

    // Load initial batch
    loadRemaining(1, priorityBatch);

    // Queue subsequent batches in idle/timeout
    const timer = setTimeout(() => {
      loadRemaining(priorityBatch, TOTAL_FRAMES);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      const activeImg = imagesRef.current[currentFrameIndexRef.current];
      if (activeImg) {
        drawFrame(activeImg);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP ScrollTrigger setup
  useEffect(() => {
    const container = containerRef.current;
    const contentOverlay = contentOverlayRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Scrub canvas frames across pinned scroll
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: prefersReducedMotion ? false : 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;

          // 1. Map frame progress: complete assembly by 0.85
          let frameIndex;
          if (p <= 0.85) {
            frameIndex = Math.min(
              TOTAL_FRAMES - 1,
              Math.max(0, Math.floor((p / 0.85) * (TOTAL_FRAMES - 1)))
            );
          } else {
            // Settle on the glorious final assembled Vada Pav (frame 298)
            frameIndex = TOTAL_FRAMES - 1;
          }

          if (frameIndex !== currentFrameIndexRef.current) {
            currentFrameIndexRef.current = frameIndex;
            const img = imagesRef.current[frameIndex];
            if (img && img.complete) {
              drawFrame(img);
            }
          }

          // 2. Smooth transition into Section 02 (from 0.90 to 1.0)
          // Rather than sliding up under the header bar, the canvas gently fades out
          if (canvasRef.current) {
            if (p > 0.90) {
              const exitP = (p - 0.90) / 0.10;
              canvasRef.current.style.opacity = (1 - exitP).toFixed(3);
              canvasRef.current.style.transform = `scale(${(1 - exitP * 0.04).toFixed(3)})`;
            } else {
              canvasRef.current.style.opacity = '1';
              canvasRef.current.style.transform = 'scale(1)';
            }
          }
        },
      });

      // Cinematic text fade out during scroll scrub (gentle settle downward, avoiding header)
      gsap.to(contentOverlay, {
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=65%',
          scrub: true,
        },
        opacity: 0,
        y: prefersReducedMotion ? 0 : 20,
        scale: prefersReducedMotion ? 1 : 0.98,
        ease: 'none',
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const handleExploreClick = () => {
    if (onExplore) {
      onExplore();
    } else {
      const target = document.querySelector('#storytelling');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#1b1612',
      }}
    >
      {/* HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />

      {/* Atmospheric Vignette Overlays */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at center, rgba(27, 22, 18, 0.15) 0%, rgba(27, 22, 18, 0.75) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '240px',
          zIndex: 2,
          pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(27, 22, 18, 0.95), transparent)',
        }}
      />

      {/* Hero Content Overlay */}
      <div
        ref={contentOverlayRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(5rem, 8vh, 6.5rem) clamp(1.5rem, 5vw, 4rem) 0',
        }}
      >
        {/* Subtle Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.45rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            backdropFilter: 'blur(10px)',
            marginBottom: '1.5rem',
            color: '#fdfbf7',
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          <Sparkles size={14} color="var(--color-saffron-light)" />
          <span>Artisanal Gastronomy Experience</span>
        </div>

        {/* Monumental Headline */}
        <h1
          style={{
            color: '#ffffff',
            fontSize: 'clamp(2.1rem, 6.5vw, 6.5rem)',
            fontWeight: 600,
            fontFamily: 'var(--font-serif)',
            letterSpacing: '-0.02em',
            lineHeight: 1.08,
            maxWidth: '1100px',
            marginBottom: '1.25rem',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
          }}
        >
          The Art of the <span style={{ color: 'var(--color-saffron-light)' }}>Crunch</span>
        </h1>

        {/* Narrative Subtitle */}
        <p
          style={{
            color: 'rgba(253, 251, 247, 0.85)',
            fontSize: 'clamp(0.95rem, 3.2vw, 1.25rem)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            maxWidth: '680px',
            lineHeight: 1.65,
            marginBottom: 'clamp(1.75rem, 4vh, 2.5rem)',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
          }}
        >
          A cinematic culinary journey through India's most celebrated street delicacies.
          Where centuries of heritage are tempered into every golden fold.
        </p>

        {/* Action Button */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={handleExploreClick}
            style={{
              padding: '0.9rem 2.2rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-saffron)',
              color: '#ffffff',
              border: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.95rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 28px rgba(217, 107, 39, 0.45)',
              transition: 'transform 0.25s ease, background-color 0.25s ease',
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
            <span>Begin The Tasting</span>
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(253, 251, 247, 0.6)',
          fontSize: '0.72rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
        }}
      >
        <span>Scroll to Reveal</span>
        <div
          style={{
            width: '24px',
            height: '38px',
            borderRadius: '12px',
            border: '1px solid rgba(253, 251, 247, 0.3)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '6px',
          }}
        >
          <div
            style={{
              width: '4px',
              height: '8px',
              borderRadius: '2px',
              backgroundColor: 'var(--color-saffron-light)',
              animation: 'scrollPulse 1.8s infinite ease-in-out',
            }}
          />
        </div>
      </div>

      {/* Preload Progress Pill (subtle) */}
      {loadProgress < 100 && (
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '16px',
            zIndex: 20,
            fontSize: '0.7rem',
            color: 'rgba(255, 255, 255, 0.4)',
            letterSpacing: '0.08em',
          }}
        >
          Buffering frames {loadProgress}%
        </div>
      )}

      <style>{`
        @keyframes scrollPulse {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(12px); opacity: 0.2; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
}

