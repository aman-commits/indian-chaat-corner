import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils } from 'lucide-react';
import { catalogCategories, catalogItems } from '../../data/catalogData';
import FoodCard3D from './FoodCard3D';

export default function CatalogSection({ onSelectDishForInquiry }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems =
    activeCategory === 'all'
      ? catalogItems
      : catalogItems.filter((item) => item.category === activeCategory);

  return (
    <section
      id="catalog"
      style={{
        padding: 'clamp(5rem, 10vw, 8.5rem) 0',
        backgroundColor: 'var(--bg-canvas)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Header Section */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '750px',
            margin: '0 auto clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.4rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-warm)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-saffron)',
            }}
          >
            <Utensils size={13} />
            <span>Interactive 3D Food Gallery</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
              marginBottom: '1rem',
              color: 'var(--text-primary)',
            }}
          >
            The Gastronomic Collection
          </h2>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              lineHeight: 1.7,
              fontFamily: 'var(--font-sans)',
            }}
          >
            Hover over any dish to experience its 3D depth, thermal steam, and chilled condensation.
            Handcrafted with culinary authenticity and centuries of spice mastery.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div
          className="catalog-filters-bar"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
          }}
        >
          {catalogCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  position: 'relative',
                  padding: '0.65rem 1.35rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--color-saffron)' : 'var(--border-subtle)',
                  backgroundColor: isActive ? 'var(--color-saffron)' : '#ffffff',
                  color: isActive ? '#ffffff' : 'var(--text-primary)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-sans)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? '0 4px 16px var(--color-saffron-glow)' : 'var(--shadow-sm)',
                }}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Catalog Items Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 310px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                key={item.id}
              >
                <FoodCard3D item={item} onInquire={onSelectDishForInquiry} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .catalog-filters-bar {
            display: flex !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
            justify-content: flex-start !important;
            padding: 4px 1rem !important;
            gap: 8px !important;
            margin-left: -1rem !important;
            margin-right: -1rem !important;
            width: calc(100% + 2rem) !important;
            flex-wrap: nowrap !important;
          }
          .catalog-filters-bar::-webkit-scrollbar {
            display: none !important;
          }
          .catalog-filters-bar button {
            white-space: nowrap !important;
            flex-shrink: 0 !important;
            font-size: 0.8rem !important;
            padding: 0.55rem 1.1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
