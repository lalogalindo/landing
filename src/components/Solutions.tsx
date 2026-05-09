import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faCogs, faAddressBook, faCloud, faCommentDots, faRobot } from '@fortawesome/free-solid-svg-icons';

export const Solutions = () => {
  const { t } = useTranslation();

  const services = [
    { id: 'landing', icon: faLaptopCode, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'automation', icon: faCogs, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'crm', icon: faAddressBook, color: 'text-green-500', bg: 'bg-green-50' },
    { id: 'saas', icon: faCloud, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 'whatsapp', icon: faCommentDots, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'ai', icon: faRobot, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="solutions" className="py-24 bg-brand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4">{t('solutions.title')}</h2>
          <p className="text-lg text-brand-600 max-w-2xl mx-auto">{t('solutions.subtitle')}</p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id} 
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-200 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl ${service.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <FontAwesomeIcon icon={service.icon} className={`text-2xl ${service.color}`} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-3">{t(`solutions.items.${service.id}.title`)}</h3>
              <p className="text-brand-600 leading-relaxed">
                {t(`solutions.items.${service.id}.desc`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
