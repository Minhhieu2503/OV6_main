import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'vi' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
            title="Switch Language"
        >
            <Globe className="w-4 h-4" />
            <span>{i18n.language === 'en' ? 'EN' : 'VI'}</span>
        </button>
    );
};

export default LanguageSwitcher;
