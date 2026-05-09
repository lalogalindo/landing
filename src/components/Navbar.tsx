import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../analytics/events';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import mercsoftLogo from '../../main-logo.png';

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
    <nav className="fixed inset-x-0 top-0 z-50 px-4 py-4 transition-all duration-300 sm:px-6 lg:px-8">
      <div className={`mx-auto max-w-7xl rounded-3xl border px-4 transition-all duration-300 sm:px-5 ${isScrolled ? 'border-white/80 bg-white/90 py-3 shadow-[0_18px_60px_rgba(201,51,67,0.12)] backdrop-blur-xl' : 'border-transparent bg-white/35 py-3 backdrop-blur-md'}`}>
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="flex flex-shrink-0 cursor-pointer items-center rounded-2xl transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
            onClick={() => window.scrollTo(0, 0)}
            aria-label="Ir al inicio de MercSoft"
          >
            <img src={mercsoftLogo} alt="MercSoft" className="h-11 w-auto object-contain sm:h-12" />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="rounded-full px-3 py-2 text-sm font-bold text-brand-700 transition-colors hover:bg-brand-50 hover:text-brand-accent">
                {link.name}
              </a>
            ))}
            <button onClick={toggleLanguage} className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-brand-600 transition-colors hover:bg-brand-50 hover:text-brand-900" aria-label="Toggle language">
              <FontAwesomeIcon icon={faGlobe} />
              <span className="uppercase text-sm font-semibold">{i18n.language.substring(0,2)}</span>
            </button>
            <a href="#cta" className="btn-primary py-2.5 px-5 text-sm rounded-full" onClick={() => trackEvent('click_cta', { location: 'navbar' })}>
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
        <div className="absolute left-4 right-4 top-[calc(100%+0.5rem)] flex flex-col space-y-4 rounded-3xl border border-white/80 bg-white/90 px-6 py-5 shadow-2xl backdrop-blur-xl md:hidden">
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
