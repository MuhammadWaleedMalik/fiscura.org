import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { websiteInfo } from '../../data/website/info';
import { colors } from '../../data/colors/theme';
import { useLanguage } from '../../contexts/LanguageContext';

// Import all language files statically
import enFooter from './en/footer.json';
import jaFooter from './ja/footer.json';
import zhFooter from './zh/footer.json';

// Create a language map
const languageMap = {
  en: enFooter,
  ja: jaFooter,
  zh: zhFooter
};

interface FooterContent {
  brand: {
    nameAlt: string;
    slogan: string;
  };
  navigation: {
    title: string;
    links: { path: string; label: string }[];
  };
  legal: {
    title: string;
    links: { path: string; label: string }[];
  };
  contact: {
    title: string;
    info: { type: string; text: string }[];
  };
  social: {
    links: { name: string; link: string }[];
  };
  copyright: {
    text: string;
    privacy: string;
    terms: string;
  };
}

const Footer: React.FC = () => {
  const [pageContent, setPageContent] = useState<FooterContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const navigate = useNavigate();
  const { name, logo, facebook, instagram, linkedin } = websiteInfo;
  const { primaryColor2, accent } = colors;

  useEffect(() => {
    const loadContent = () => {
      setIsLoading(true);
      try {
        const content = languageMap[currentLanguage.code as keyof typeof languageMap];
        setPageContent(content);
      } catch (err) {
        console.error(`Failed to load ${currentLanguage.code} content:`, err);
        setPageContent(languageMap.en);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  if (isLoading || !pageContent) {
    return (
      <div className="w-full" style={{ backgroundColor: primaryColor2, height: '200px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" 
               style={{ borderColor: accent }}></div>
        </div>
      </div>
    );
  }

  const socialLinks = pageContent.social.links.map(social => ({
    ...social,
    icon: (
      social.name === 'Facebook' ? <Facebook size={20} /> :
      social.name === 'Instagram' ? <Instagram size={20} /> :
      social.name === 'LinkedIn' ? <Linkedin size={20} /> : null
    ),
    link: social.link === 'd' ? websiteInfo[social.name.toLowerCase() as keyof typeof websiteInfo] || '#' : social.link
  }));

  const quickLinks = pageContent.navigation.links;
  const legalLinks = pageContent.legal.links;
  const contactInfo = pageContent.contact.info.map(item => ({
    ...item,
    icon: item.type === 'mail' ? <Mail size={16} /> : item.type === 'phone' ? <Phone size={16} /> : <MapPin size={16} />
  }));

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
      style={{ backgroundColor: primaryColor2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src={logo} alt={pageContent.brand.nameAlt} className="w-10 h-10 rounded-lg" />
              <span className="text-4xl font-bold text-blue-950">{name}</span>
            </div>
            <p className="text-gray-950 text-sm leading-relaxed">
              {pageContent.brand.slogan}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  whileHover={{ y: -2, color: accent }}
                  className="text-red-800 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-950 uppercase tracking-wider">
              {pageContent.navigation.title}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-950 hover:text-white text-sm transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                    &nbsp;&nbsp;
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-950 uppercase tracking-wider">
              {pageContent.legal.title}
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-950 hover:text-white text-sm transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                    &nbsp;&nbsp;
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-950 uppercase tracking-wider">
              {pageContent.contact.title}
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="mt-0.5" style={{ color: accent }}>{item.icon}</div>
                  <span className="text-blue-950 text-sm">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-900 text-sm">
              {pageContent.copyright.text.replace('{year}', new Date().getFullYear().toString()).replace('{name}', name)}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-950 hover:text-white text-sm">
                {pageContent.copyright.privacy}
              </Link>
              <Link to="/terms" className="text-gray-950 hover:text-white text-sm">
                {pageContent.copyright.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;