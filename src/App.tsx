import { useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CursorSection } from './components/CursorSection';
import { Solutions } from './components/Solutions';
import { Process } from './components/Process';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { QuoteAgent } from './components/QuoteAgent';
import { trackEvent } from './analytics/events';

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    trackEvent('page_view');
  }, []);

  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col font-sans">
        <Helmet>
          <html lang={i18n.language} />
          <title>MercSoft | Software a la medida para negocios</title>
          <meta name="description" content={t('hero.subtitle')} />
          <meta name="theme-color" content="#ffffff" />
        </Helmet>
        
        <Navbar />
        
        <main className="flex-grow">
          <Hero />
          <CursorSection />
          <Solutions />
          <Process />
          <CTA />
        </main>
        
        <Footer />
        <QuoteAgent />
      </div>
    </HelmetProvider>
  );
}

export default App;
