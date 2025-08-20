import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Globe, Heart } from 'lucide-react';
import { colors } from '../data/colors/theme';
import { websiteInfo } from '../data/website/info';
import { useLanguage } from '../contexts/LanguageContext';

// Import all language files statically
import enAbout from '../data/text/en/about.json';
import jaAbout from '../data/text/ja/about.json';
import zhAbout from '../data/text/zh/about.json';

// Create a language map
const languageMap = {
  en: enAbout,
  ja: jaAbout,
  zh: zhAbout,
};

interface AboutContent {
  title: string;
  subtitle: string;
  stats: { label: string; value: string }[];
  values: { title: string; description: string }[];
  story: {
    title: string;
    paragraphs: string[];
  };
  mission: {
    title: string;
    description: string;
    slogan: string;
  };
}

const About: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [pageContent, setPageContent] = useState<AboutContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = () => {
      setIsLoading(true);
      try {
        console.log(`Loading content for language: ${currentLanguage.code}`); // Debug log
        const content = languageMap[currentLanguage.code as keyof typeof languageMap];
        setPageContent(content);
      } catch (err) {
        console.error(`Failed to load ${currentLanguage.code} content:`, err);
        // Fallback to English if current language fails
        setPageContent(languageMap.en);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  const icons = [Heart, Award, Users, Globe];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" 
           style={{ backgroundColor: colors.backgroundLight }}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" 
             style={{ borderColor: colors.primaryColor1 }}></div>
      </div>
    );
  }

  if (!pageContent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" 
           style={{ backgroundColor: colors.backgroundLight }}>
        <p className="text-lg font-semibold" 
           style={{ color: colors.textPrimary }}>
          Content not available
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" 
         style={{ backgroundColor: colors.backgroundLight }}>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h1 
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: colors.textPrimary }}
          >
            {websiteInfo.name}
          </h1>
          <p 
            className="text-lg sm:text-xl max-w-3xl mx-auto"
            style={{ color: colors.textSecondary }}
          >
            {pageContent.subtitle}
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-16"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {pageContent.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                <div 
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  style={{ color: colors.primaryColor1 }}
                >
                  {stat.value}
                </div>
                <div 
                  className="text-sm sm:text-base font-medium"
                  style={{ color: colors.textSecondary }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 
              className="text-2xl sm:text-3xl font-bold mb-6"
              style={{ color: colors.textPrimary }}
            >
              {pageContent.story.title}
            </h2>
            <div className="space-y-4" style={{ color: colors.textSecondary }}>
              {pageContent.story.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-base sm:text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h3 
              className="text-xl sm:text-2xl font-bold mb-4"
              style={{ color: colors.textPrimary }}
            >
              {pageContent.mission.title}
            </h3>
            <p 
              className="mb-6 text-base sm:text-lg"
              style={{ color: colors.textSecondary }}
            >
              {pageContent.mission.description}
            </p>
            <div 
              className="border-l-4 pl-4"
              style={{ borderColor: colors.primaryColor1 }}
            >
              <p 
                className="italic text-base sm:text-lg"
                style={{ color: colors.textPrimary }}
              >
                "{pageContent.mission.slogan}"
              </p>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-16"
        >
          <h2 
            className="text-2xl sm:text-3xl font-bold text-center mb-12"
            style={{ color: colors.textPrimary }}
          >
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pageContent.values.map((value, index) => {
              const IconComponent = icons[index % icons.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: colors.primaryColor1 }}
                  >
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h4 
                    className="text-base sm:text-lg font-semibold mb-2"
                    style={{ color: colors.textPrimary }}
                  >
                    {value.title}
                  </h4>
                  <p className="text-sm sm:text-base" style={{ color: colors.textSecondary }}>
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;