import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { mercsoftLogo } from '@/assets';

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-100 bg-white py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <img src={mercsoftLogo} alt="MercSoft" className="h-12 w-auto object-contain sm:h-14" />
            <p className="max-w-xs text-sm font-medium text-brand-500">Software, automatización e IA para crecer.</p>
          </div>

          <div className="flex gap-3">
            {[
              { label: 'Twitter', icon: faTwitter },
              { label: 'LinkedIn', icon: faLinkedin },
              { label: 'GitHub', icon: faGithub },
            ].map((social) => (
              <a key={social.label} href="#" className="flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 text-brand-500 transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/25 hover:bg-white hover:text-brand-accent hover:shadow-lg">
                <span className="sr-only">{social.label}</span>
                <FontAwesomeIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-brand-100 pt-6 text-sm font-medium text-brand-500 md:flex-row md:items-center">
          <p>{t('footer.rights', { year })}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-900 transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-brand-900 transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
