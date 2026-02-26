import { useState } from 'react';

export const useNavigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  return {
    activeSection,
    setActiveSection,
    isMenuOpen,
    setIsMenuOpen,
    scrollToSection
  };
};

