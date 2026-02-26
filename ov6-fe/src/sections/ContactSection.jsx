import React from 'react';
import { Mail, Phone, MessageCircle, Youtube, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CONTACT_INFO } from '../constants/navigation';

const ContactSection = () => {
  const { t } = useTranslation();

  const contactItems = [
    { icon: Phone, label: 'Điện thoại', value: CONTACT_INFO.phone.number, href: CONTACT_INFO.phone.url, color: 'gold' },
    { icon: MessageCircle, label: 'Zalo', value: CONTACT_INFO.zalo.phone, href: CONTACT_INFO.zalo.url, color: 'blue', external: true },
    { icon: Mail, label: 'Email', value: CONTACT_INFO.email.address, href: CONTACT_INFO.email.url, color: 'purple' },
    { icon: Youtube, label: 'YouTube', value: CONTACT_INFO.youtube.username, href: CONTACT_INFO.youtube.url, color: 'red', external: true },
    { icon: Music, label: 'TikTok', value: CONTACT_INFO.tiktok.username, href: CONTACT_INFO.tiktok.url, color: 'pink', external: true },
  ];

  const colorClasses = {
    gold: 'text-yellow-400 bg-yellow-500/10 group-hover:bg-yellow-500/20',
    blue: 'text-blue-400 bg-blue-500/10 group-hover:bg-blue-500/20',
    purple: 'text-purple-400 bg-purple-500/10 group-hover:bg-purple-500/20',
    red: 'text-red-400 bg-red-500/10 group-hover:bg-red-500/20',
    pink: 'text-pink-400 bg-pink-500/10 group-hover:bg-pink-500/20',
  };

  const labelKeys = ['phone', 'zalo', 'email', 'youtube', 'tiktok'];

  return (
    <section
      id="contact"
      className="py-24 bg-[#0d0d0d] relative overflow-hidden transition-colors duration-300"
    >
      {/* Ambient */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 uppercase tracking-widest mb-4">
            {t('contact.title')}
          </h2>
          <div className="accent-bar mx-auto mb-6" />
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" />
              {t('contact.connect_title')}
            </h3>
            <p className="text-slate-400 mb-10 leading-relaxed text-center max-w-2xl">
              {t('contact.connect_desc')}
            </p>

            <div className="grid md:grid-cols-2 gap-6 w-full">
              {contactItems.map((item, idx) => {
                const IconComponent = item.icon;
                const linkProps = item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
                const key = labelKeys[idx] || 'phone';

                return (
                  <motion.a
                    key={idx}
                    href={item.href}
                    {...linkProps}
                    whileHover={{ x: 5 }}
                    className="flex items-center p-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl border border-yellow-500/10 hover:border-yellow-400/40 transition-all duration-300 group shadow-sm"
                  >
                    <div className={`p-3 rounded-xl transition-all duration-300 ${colorClasses[item.color]}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="ml-5 flex-1 min-w-0 text-left">
                      <div className="text-white font-bold text-base mb-0.5 group-hover:text-yellow-300 transition-colors">
                        {t(`contact.labels.${key}`)}
                      </div>
                      <div className="text-slate-500 text-sm truncate font-mono">{item.value}</div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
