import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xl font-bold text-brand-900">MercSoft</span>
          <p className="text-brand-500 text-sm">
            {t('footer.rights', { year })}
          </p>
        </div>

        <div className="flex gap-6">
          <a href="#" className="text-brand-400 hover:text-brand-accent transition-colors">
            <span className="sr-only">Twitter</span>
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a href="#" className="text-brand-400 hover:text-brand-accent transition-colors">
            <span className="sr-only">LinkedIn</span>
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </a>
          <a href="#" className="text-brand-400 hover:text-brand-accent transition-colors">
            <span className="sr-only">GitHub</span>
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </a>
        </div>

        <div className="flex gap-6 text-sm text-brand-500 font-medium">
          <a href="#" className="hover:text-brand-900 transition-colors">{t('footer.privacy')}</a>
          <a href="#" className="hover:text-brand-900 transition-colors">{t('footer.terms')}</a>
        </div>
      </div>
    </footer>
  );
};
