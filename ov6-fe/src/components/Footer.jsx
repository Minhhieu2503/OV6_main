import React from 'react';
import { useTranslation } from 'react-i18next';
import { Facebook, Youtube, Instagram, Mail, Phone, MessageCircle } from 'lucide-react';
import { NAV_ITEMS, CONTACT_INFO } from '../constants/navigation';

const Footer = ({ scrollToSection }) => {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Facebook, href: CONTACT_INFO.facebook.url, label: 'Facebook', hover: 'hover:text-blue-500' },
    { icon: MessageCircle, href: CONTACT_INFO.zalo.url, label: 'Zalo', hover: 'hover:text-blue-400' },
    { icon: Youtube, href: CONTACT_INFO.youtube.url, label: 'YouTube', hover: 'hover:text-red-500' },
  ];

  return (
    <footer className="bg-[#060606] border-t border-yellow-500/10 pt-10 pb-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="space-y-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent block">
              OV6
            </span>
            <p className="text-gray-500 text-xs leading-relaxed">
              {t('footer.about_desc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent w-fit">
              {t('footer.quick_links')}
            </h3>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-500 hover:text-yellow-400 transition-colors duration-300 text-xs flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-yellow-500 mr-0 group-hover:w-2 group-hover:mr-1.5 transition-all duration-300 rounded-full" />
                    {t(`nav.${item.id}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent w-fit">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href={CONTACT_INFO.email.url} className="flex items-start group">
                  <Mail className="h-4 w-4 text-gray-500 group-hover:text-yellow-400 transition-colors mt-0.5 shrink-0" />
                  <span className="ml-2 text-gray-500 text-xs group-hover:text-white transition-colors">
                    {CONTACT_INFO.email.address}
                  </span>
                </a>
              </li>
              <li>
                <a href={CONTACT_INFO.phone.url} className="flex items-start group">
                  <Phone className="h-4 w-4 text-gray-500 group-hover:text-yellow-400 transition-colors mt-0.5 shrink-0" />
                  <span className="ml-2 text-gray-500 text-xs group-hover:text-white transition-colors">
                    {CONTACT_INFO.phone.number}
                  </span>
                </a>
              </li>
              <li>
                <a href={CONTACT_INFO.zalo.url} className="flex items-start group">
                  <MessageCircle className="h-4 w-4 text-gray-500 group-hover:text-yellow-400 transition-colors mt-0.5 shrink-0" />
                  <span className="ml-2 text-gray-500 text-xs group-hover:text-white transition-colors">
                    Zalo: {CONTACT_INFO.zalo.phone}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold mb-4 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent w-fit">
              {t('footer.social')}
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`bg-[#111] p-2.5 rounded-xl border border-yellow-500/10
                    hover:border-yellow-400/40
                    text-gray-500 ${social.hover}
                    transition-all duration-300`}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-yellow-500/10 pt-6 mb-6">
          <div className="bg-yellow-500/5 p-4 rounded-xl border border-yellow-500/10">
            <h3 className="text-xs font-bold text-red-400/80 mb-2 uppercase tracking-wide flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
              {t('footer.disclaimer.title')}
            </h3>
            <div className="text-[10px] text-gray-500 leading-relaxed text-justify">
              <span dangerouslySetInnerHTML={{ __html: t('footer.disclaimer.risk') }} className="mr-1" />
              <span dangerouslySetInnerHTML={{ __html: t('footer.disclaimer.advice') }} className="mr-1" />
              <span dangerouslySetInnerHTML={{ __html: t('footer.disclaimer.performance') }} className="mr-1" />
              <span dangerouslySetInnerHTML={{ __html: t('footer.disclaimer.transparency') }} />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-yellow-500/10 pt-5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p className="mb-1 md:mb-0">{t('footer.rights', { year: '2025' })}</p>
          <p>{t('footer.dedication')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
