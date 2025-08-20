import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { colors } from '../data/colors/theme';
import { useLanguage } from '../contexts/LanguageContext';

// Import all language files statically
import enBlog from '../data/text/en/blog.json';
import jaBlog from '../data/text/ja/blog.json';
import zhBlog from '../data/text/zh/blog.json';

// Create a language map
const languageMap = {
  en: enBlog,
  ja: jaBlog,
  zh: zhBlog
};

interface BlogContent {
  title: string;
  subtitle: string;
  websiteName: string;
  content: string[];
}

const Blog: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [pageContent, setPageContent] = useState<BlogContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = () => {
      setIsLoading(true);
      try {
        // Get content from our pre-loaded language map
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

  // Replace {websiteName} in content
  const formattedContent = pageContent.content.map(paragraph => 
    paragraph.replace(/{websiteName}/g, pageContent.websiteName)
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" 
         style={{ backgroundColor: colors.backgroundLight }}>
      <div className="max-w-4xl mx-auto">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h1 
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: colors.textPrimary }}
          >
            {pageContent.title}
          </h1>
          <p 
            className="text-lg sm:text-xl"
            style={{ color: colors.textSecondary }}
          >
            {pageContent.subtitle}
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-8"
          style={{ borderColor: colors.secondaryColor1 }}
        >
          <div className="prose max-w-none">
            {formattedContent.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="mb-4 text-base sm:text-lg"
                style={{ color: colors.textSecondary }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Tax Consultation Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-white rounded-lg shadow-lg p-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="mb-4 sm:mb-0 text-base sm:text-lg" style={{ color: colors.textPrimary }}>
              {currentLanguage.code === 'ja' 
                ? `${pageContent.websiteName}で税務に関するご質問はこちらから。` 
                : `Have tax questions? Ask ${pageContent.websiteName} today.`}
            </p>
            <div className="flex<{system}> space-x-4">
       
              <Link
                to="/contact"
                className="px-6 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primaryColor1 }}
              >
                {currentLanguage.code === 'ja' ? 'お問い合わせ' : 'Contact Us'}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;