import React, { useState, useRef } from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export default function FoodCard3D({ item, onInquire }) {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;

    // Subtle 3D tilt angles
    setTilt({
      x: normY * -14, // tilt up/down (±7deg)
      y: normX * 16,  // tilt left/right (±8deg)
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleClick = (e) => {
    if (e.target.closest('button')) return;
    // On touch & mobile: toggle 3D emergence state on tap
    setIsHovered((prev) => !prev);
  };

  const isHot = item.temperature === 'hot';
  const isCold = item.temperature === 'cold';

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      tabIndex={0}
      onFocus={() => setIsHovered(true)}
      onBlur={() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      aria-label={`${item.name} catalog card`}
      style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isHovered
          ? '0 24px 48px rgba(36, 30, 25, 0.12)'
          : 'var(--shadow-sm)',
        transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
        borderColor: isHovered ? 'var(--border-accent)' : 'var(--border-subtle)',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      {/* 3D Visual Stage Container (Perspective Viewport) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '270px',
          backgroundColor: 'var(--bg-warm)',
          borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
          overflow: 'visible',
          perspective: '1200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Base Thumbnail (recedes slightly on hover to give depth) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
            zIndex: 1,
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease',
              transform: isHovered ? 'scale(0.97)' : 'scale(1)',
              filter: isHovered ? 'brightness(0.85) contrast(1.05)' : 'brightness(1)',
            }}
          />

          {/* Vignette Overlay for extra depth when 3D food rises */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at center, transparent 40%, rgba(27, 22, 18, 0.45) 100%)',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
            }}
          />

          {/* Cold condensation frosted glass effect */}
          {isCold && isHovered && (
            <div
              className="cold-condensation-overlay"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                background:
                  'radial-gradient(circle at center, rgba(220, 245, 255, 0.18) 0%, rgba(180, 230, 255, 0.35) 100%)',
                mixBlendMode: 'screen',
                animation: 'frostGlint 3s infinite alternate ease-in-out',
              }}
            />
          )}
        </div>

        {/* Dietary Badges */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            zIndex: 10,
          }}
        >
          {item.dietary.map((d) => (
            <span
              key={d}
              style={{
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(8px)',
                fontSize: '0.68rem',
                fontWeight: 700,
                color: 'var(--color-forest)',
                letterSpacing: '0.04em',
                boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              }}
            >
              {d}
            </span>
          ))}

          {/* Temperature indicator pill */}
          {isHot && (
            <span
              style={{
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(217, 107, 39, 0.92)',
                color: '#ffffff',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                boxShadow: '0 2px 6px rgba(217, 107, 39, 0.3)',
              }}
            >
              Served Steaming
            </span>
          )}
          {isCold && (
            <span
              style={{
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(42, 122, 76, 0.92)',
                color: '#ffffff',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                boxShadow: '0 2px 6px rgba(42, 122, 76, 0.3)',
              }}
            >
              Served Chilled
            </span>
          )}
        </div>

        {/* Mobile Tap to View 3D Hint */}
        <div
          className="mobile-3d-hint"
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            zIndex: 10,
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: isHovered ? 'var(--color-saffron)' : 'rgba(27, 22, 18, 0.72)',
            backdropFilter: 'blur(6px)',
            color: '#ffffff',
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            pointerEvents: 'none',
            display: 'none',
            alignItems: 'center',
            gap: '5px',
            transition: 'background-color 0.3s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          }}
        >
          <Sparkles size={11} color={isHovered ? '#ffffff' : 'var(--color-saffron-light)'} />
          <span>{isHovered ? 'Tap to close' : 'Tap for 3D'}</span>
        </div>

        {/* 3D EMERGING FOOD OBJECT (Pops out of the image with depth, tilt & floating) */}
        <div
          className={`food-3d-emerge-layer ${isHovered ? 'active' : ''}`}
          style={{
            position: 'absolute',
            width: '85%',
            height: '85%',
            zIndex: 20,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformStyle: 'preserve-3d',
            transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: isHovered ? 1 : 0,
            transform: isHovered
              ? `translate3d(${tilt.y * 0.9}px, ${-18 + tilt.x * 0.9}px, 60px) scale(1.18) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              : 'translate3d(0, 10px, 0) scale(0.9) rotateX(0deg) rotateY(0deg)',
            filter: isHovered
              ? 'drop-shadow(0 26px 28px rgba(27, 22, 18, 0.5)) drop-shadow(0 8px 12px rgba(217, 107, 39, 0.2))'
              : 'none',
          }}
        >
          <img
            src={item.image3d || item.image}
            alt={`3D ${item.name}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              mixBlendMode: 'normal',
              pointerEvents: 'none',
              animation: isHovered ? 'subtleFloat 3.6s ease-in-out infinite' : 'none',
            }}
          />

          {/* HOT FOOD: REALISTIC RISING STEAM LAYERS */}
          {isHot && isHovered && (
            <div
              className="steam-container"
              style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '160px',
                height: '140px',
                pointerEvents: 'none',
                overflow: 'visible',
              }}
            >
              <div className="steam-plume steam-1" />
              <div className="steam-plume steam-2" />
              <div className="steam-plume steam-3" />
            </div>
          )}

          {/* COLD FOOD: CONDENSATION & WATER DROPLETS */}
          {isCold && isHovered && (
            <div
              className="condensation-container"
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
              }}
            >
              <span className="water-droplet drop-1" />
              <span className="water-droplet drop-2" />
              <span className="water-droplet drop-3" />
              <span className="water-droplet drop-4" />
            </div>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div
        style={{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          backgroundColor: '#ffffff',
          borderRadius: '0 0 var(--radius-md) var(--radius-md)',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.45rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}
          >
            {item.name}
          </h3>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: isHot ? 'var(--color-saffron)' : isCold ? 'var(--color-forest)' : 'var(--text-muted)',
            }}
          >
            {isHot ? 'Hot Prep' : isCold ? 'Chilled' : 'Fresh Craft'}
          </span>
        </div>

        <p
          style={{
            fontSize: '0.88rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '1rem',
            flexGrow: 1,
          }}
        >
          {item.tagline}
        </p>

        {/* Note / Flavor Profile */}
        <div
          style={{
            padding: '0.6rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--bg-warm)',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Sparkles size={13} color="var(--color-saffron)" />
          <span>{item.notes}</span>
        </div>

        {/* Footer & Inquire Action */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.85rem',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
            }}
          >
            {item.price}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onInquire) onInquire(item);
            }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: isHovered ? 'var(--color-saffron)' : 'var(--color-forest)',
              color: '#ffffff',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background-color 0.25s ease, transform 0.25s ease',
              transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
            }}
          >
            <span>Inquire Dish</span>
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>

      {/* Keyframe Styles for Realistic Steam, Condensation and Float */}
      <style>{`
        @keyframes subtleFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -6px, 10px);
          }
        }

        /* Hot Steam Wisps */
        .steam-plume {
          position: absolute;
          bottom: 10px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.18) 50%, transparent 80%);
          filter: blur(8px);
          pointer-events: none;
        }

        .steam-1 {
          width: 50px;
          height: 90px;
          left: 45px;
          animation: steamRise1 2.8s infinite ease-out;
        }

        .steam-2 {
          width: 65px;
          height: 110px;
          left: 30px;
          animation: steamRise2 3.4s infinite 0.6s ease-out;
        }

        .steam-3 {
          width: 45px;
          height: 85px;
          left: 65px;
          animation: steamRise1 2.6s infinite 1.2s ease-out;
        }

        @keyframes steamRise1 {
          0% {
            transform: translateY(0) scaleX(0.7) scaleY(0.7);
            opacity: 0;
          }
          25% {
            opacity: 0.65;
          }
          100% {
            transform: translateY(-90px) scaleX(1.4) scaleY(1.4) translateX(12px);
            opacity: 0;
          }
        }

        @keyframes steamRise2 {
          0% {
            transform: translateY(0) scaleX(0.8) scaleY(0.8);
            opacity: 0;
          }
          30% {
            opacity: 0.55;
          }
          100% {
            transform: translateY(-110px) scaleX(1.6) scaleY(1.6) translateX(-15px);
            opacity: 0;
          }
        }

        /* Cold Condensation Droplets */
        .water-droplet {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #ffffff 0%, rgba(200, 240, 255, 0.8) 50%, rgba(100, 180, 220, 0.6) 100%);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.9);
          opacity: 0;
          animation: dropFadeIn 0.5s forwards ease-out;
        }

        .drop-1 { top: 35%; left: 28%; animation-delay: 0.1s; }
        .drop-2 { top: 48%; right: 24%; width: 10px; height: 10px; animation-delay: 0.25s; }
        .drop-3 { top: 62%; left: 34%; width: 6px; height: 6px; animation-delay: 0.4s; }
        .drop-4 { bottom: 25%; right: 38%; width: 9px; height: 9px; animation-delay: 0.2s; }

        @keyframes dropFadeIn {
          from { opacity: 0; transform: scale(0.4); }
          to { opacity: 0.92; transform: scale(1); }
        }

        @keyframes frostGlint {
          0% { opacity: 0.4; }
          100% { opacity: 0.8; }
        }

        @media (max-width: 768px) {
          .mobile-3d-hint {
            display: inline-flex !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .food-3d-emerge-layer img {
            animation: none !important;
          }
          .steam-plume {
            animation: none !important;
            display: none !important;
          }
        }
      `}</style>
    </article>
  );
}
