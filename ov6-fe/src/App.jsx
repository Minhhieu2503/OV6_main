import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomeSection from './sections/HomeSection';
import StrategySection from './sections/StrategySection';
import ResultsSection from './sections/ResultsSection';
import ServicesSection from './sections/ServicesSection';
import BlogSection from './sections/BlogSection';
import { useScroll } from './hooks/useScroll';
import { useNavigation } from './hooks/useNavigation';
import AnimatedSection from './components/AnimatedSection';
import MarketTicker from './components/MarketTicker';

import GlowCursor from './components/GlowCursor';

const App = () => {
  const isScrolled = useScroll();
  const { activeSection, isMenuOpen, setIsMenuOpen, scrollToSection } = useNavigation();

  useEffect(() => {
    // Scroll to top on reload
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#080808] text-white min-h-screen relative overflow-hidden">
      <GlowCursor />

      {/* Fixed header group: nav + ticker in one block */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navigation
          isScrolled={isScrolled}
          activeSection={activeSection}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          scrollToSection={scrollToSection}
        />
        <MarketTicker />
      </div>

      {/* Main content — padded to clear nav (~89px) + ticker (44px) = 133px */}
      <div className="pt-[133px] pb-[44px]"> {/* Added pb for bottom ticker */}
        <AnimatedSection>
          <HomeSection scrollToSection={scrollToSection} />
        </AnimatedSection>

        <AnimatedSection>
          <StrategySection />
        </AnimatedSection>
        <AnimatedSection>
          <ResultsSection />
        </AnimatedSection>
        <AnimatedSection>
          <ServicesSection scrollToSection={scrollToSection} />
        </AnimatedSection>
        <AnimatedSection>
          <BlogSection />
        </AnimatedSection>
        <Footer scrollToSection={scrollToSection} />
      </div>


    </div>
  );
};

export default App;

