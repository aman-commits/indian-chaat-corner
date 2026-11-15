import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import HeroSection from './components/hero/HeroSection';
import FoodStorySection from './components/storytelling/FoodStorySection';
import CatalogSection from './components/catalog/CatalogSection';
import CurvedTestimonialsSection from './components/testimonials/CurvedTestimonialsSection';
import FooterSection from './components/footer/FooterSection';
import InquiryModal from './components/common/InquiryModal';

export default function App() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedDishForInquiry, setSelectedDishForInquiry] = useState(null);

  const handleOpenInquiry = (dish = null) => {
    setSelectedDishForInquiry(dish);
    setInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setInquiryModalOpen(false);
    setSelectedDishForInquiry(null);
  };

  return (
    <div className="app-root">
      {/* Subtle organic noise/grain overlay */}
      <div className="grain-overlay" />

      {/* Global Luxury Navigation */}
      <Navbar onOpenInquiry={() => handleOpenInquiry(null)} />

      <main>
        {/* SECTION 01: Cinematic Hero with 299 Full HD Canvas Scrub */}
        <HeroSection
          onExplore={() => {
            const el = document.querySelector('#storytelling');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* SECTIONS 02 - 05: Shared Food Stage Storytelling Engine */}
        {/* Vada Pav -> Samosa -> Pani Puri -> Masala Dosa */}
        <FoodStorySection onInquireDish={handleOpenInquiry} />

        {/* SECTION 06: Interactive Food Catalog */}
        <CatalogSection onSelectDishForInquiry={handleOpenInquiry} />

        {/* SECTION 07: Curved Monitor / Panoramic Arc Testimonials */}
        <CurvedTestimonialsSection />
      </main>

      {/* SECTION 08: Final Brand CTA & Architectural Footer */}
      <FooterSection onOpenInquiry={() => handleOpenInquiry(null)} />

      {/* Dish Inquiry Dialog */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={handleCloseInquiry}
        selectedDish={selectedDishForInquiry}
      />
    </div>
  );
}
