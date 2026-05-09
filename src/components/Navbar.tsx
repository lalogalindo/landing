import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../analytics/events';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('es') ? 'en' : 'es';
    i18n.changeLanguage(newLang);
    trackEvent('change_language', { lang: newLang });
  };

  const navLinks = [
    { name: t('nav.solutions'), href: '#solutions' },
    { name: t('nav.process'), href: '#process' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-panel py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            {/* Real Logo or Text */}
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-900 to-brand-600">
              MercSoft
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-brand-700 hover:text-brand-accent font-medium transition-colors">
                {link.name}
              </a>
            ))}
            <button onClick={toggleLanguage} className="text-brand-600 hover:text-brand-900 transition-colors flex items-center gap-2" aria-label="Toggle language">
              <FontAwesomeIcon icon={faGlobe} />
              <span className="uppercase text-sm font-semibold">{i18n.language.substring(0,2)}</span>
            </button>
            <a href="#cta" className="btn-primary py-2 px-4 text-sm" onClick={() => trackEvent('click_cta', { location: 'navbar' })}>
              {t('nav.quote')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleLanguage} className="text-brand-600">
              <span className="uppercase text-sm font-semibold">{i18n.language.substring(0,2)}</span>
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-brand-900 focus:outline-none">
              <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel absolute top-full left-0 w-full flex flex-col py-4 px-6 space-y-4 border-t border-gray-100">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-brand-800 font-medium text-lg">
              {link.name}
            </a>
          ))}
          <a href="#cta" onClick={() => { setIsMobileMenuOpen(false); trackEvent('click_cta', { location: 'navbar_mobile' }); }} className="btn-primary w-full text-center mt-4">
            {t('nav.quote')}
          </a>
        </div>
      )}
    </nav>
  );
};
