import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { colors } from '../data/colors/theme';
import { useLanguage } from '../contexts/LanguageContext';

// Import all language files statically
import enHome from '../data/text/en/home.json';
import jaHome from '../data/text/ja/home.json';
import zhHome from '../data/text/zh/home.json';

// Create a language map
const languageMap = {
  en: enHome,
  ja: jaHome,
  zh: zhHome
};

interface HomeContent {
  page1: {
    title: string;
    subtitle: string;
  };
  page2: {
    leftText: string;
    rightText: string;
  };
  page3: {
    centeredText: string;
    subText: string;
  };
  page4: {
    title: string;
    cards: Array<{
      title: string;
      content: string;
      link: string;
    }>;
  };
  page5: {
    mainText: string;
    subText: string;
  };
  exemplaryQuestions: string[];
}

const Home: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [pageContent, setPageContent] = useState<HomeContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = () => {
      setIsLoading(true);
      try {
        // Get content from our pre-loaded language map
        const content = languageMap[currentLanguage.code as keyof typeof languageMap];
        if (!content) {
          throw new Error('Content not found for selected language');
        }
          setPageContent(content as HomeContent);
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundLight }}>
      {/* Page 1: Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"

        className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        style={{ background: `linear-gradient(135deg, ${colors.primaryColor1}, ${colors.primaryColor2})` }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8">
          <motion.div
            className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {pageContent.page1.title}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mt-4 text-white opacity-90">
              {pageContent.page1.subtitle}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6"
            >
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors duration-300"
              >
                {currentLanguage.code === 'ja' ? '今すぐ始める' : 'Get Started'}
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <img
              src="https://exactera.com/wp-content/uploads/2023/08/exactera-Turn-Tax-Data-into-Business-Intelligence.png"
              alt="Hero Image"
              className="w-full max-h-[500px] object-contain rounded-lg"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Page 2: Text on Left and Right, Image in Center */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.backgroundDark }}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          <motion.div
            className="lg:w-1/3 text-center lg:text-left"
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg lg:text-xl" style={{ color: colors.textPrimary }}>
              {pageContent.page2.leftText}
            </p>
          </motion.div>
          <motion.div
            className="lg:w-1/3"
            initial={{ x: 10, opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <img
              src="https://exactera.com/wp-content/uploads/2023/05/usp-macbook.png"
              alt="Center Image"
              className="w-full max-h-64 object-contain rounded-lg"
            />
          </motion.div>
          <motion.div
            className="lg:w-1/3 text-center lg:text-right"
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg lg:text-xl" style={{ color: colors.textPrimary }}>
              {pageContent.page2.rightText}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Page 3: Centered Text with Full-Width Image Below */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center" style={{ backgroundColor: colors.backgroundLight }}>
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: colors.textPrimary }}>
            {pageContent.page3.centeredText}
          </h2>
          <p className="text-base sm:text-lg mt-4 max-w-2xl mx-auto" style={{ color: colors.textSecondary }}>
            {pageContent.page3.subText}
          </p>
          <img
            src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202506/sovereign-gold-bonds-remain-the-safest-betfully-tax-exempt-if-held-to-maturity-if-sold-earlier--ta-215457163-16x9.png?VersionId=BLSfvaV.idbZ41KgjxmYkSA6o411eve4&size=690:388"
            alt="Full Width Image"
            className="w-full max-h-96 object-contain mt-8 rounded-lg"
          />
        </motion.div>
      </section>

      {/* Page 4: Three Cards with Background Images and Explore Buttons */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.backgroundDark }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
            style={{ color: colors.textPrimary }}
          >
            {pageContent.page4.title}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageContent.page4.cards.map((card, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                className="relative h-80 rounded-lg overflow-hidden text-center bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={`https://images.pexels.com/photos/318429${9 + index}/pexels-photo-318429${9 + index}.jpeg?auto=compress&cs=tinysrgb&w=600`}
                  alt={card.title}
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="p-3 rounded-full mb-4" style={{ backgroundColor: colors.primaryColor1 }}>
                    <CheckCircle className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold" style={{ color: colors.textPrimary }}>
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-base mt-2" style={{ color: colors.textSecondary }}>
                    {card.content}
                  </p>
                  <Link
                    to={card.link}
                    className="mt-4 inline-flex items-center px-5 py-2 rounded-lg font-semibold text-sm sm:text-base"
                    style={{ backgroundColor: colors.accent, color: colors.textPrimary }}
                  >
                    {currentLanguage.code === 'ja' ? '探索する' : 'Explore'}
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Page 5: Large Image on Left, Three Images per Row on Right (Total 6) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.backgroundLight }}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          <motion.div
            className="lg:w-1/2"
            initial="hidden"
            animate="visible"
          >
            <img
              src="https://exactera.com/wp-content/uploads/2023/08/exactera-transfer-pricing.png"
              alt="Large Image"
              className="w-full max-h-[600px] object-contain rounded-lg"
            />
          </motion.div>
          <div className="lg:w-1/2">
            <motion.div
              initial="hidden"
              animate="visible"
              className="mb-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: colors.textPrimary }}>
                {pageContent.page5.mainText}
              </h2>
              <p className="text-base sm:text-lg mt-4" style={{ color: colors.textSecondary }}>
                {pageContent.page5.subText}
              </p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                "https://exactera.com/wp-content/uploads/2023/08/alorica.png",
                "https://exactera.com/wp-content/uploads/2023/08/browning.png",
                "https://exactera.com/wp-content/uploads/2025/04/RV-Primary-Glyph-reg-1.png",
                "https://exactera.com/wp-content/uploads/2023/06/Roseburgv2-e1688670580765-80x80.png",
                "https://exactera.com/wp-content/uploads/2025/04/Jaggaer-Logo-Red-300x31.png",
                "https://exactera.com/wp-content/uploads/2025/07/sally-150x150.jpg"
              ].map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-24 sm:h-32 object-contain rounded-lg"
                  initial="hidden"
                  animate="visible"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Exemplary Questions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.backgroundDark }}>
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-xl sm:text-2xl font-semibold mb-4 text-center"
            style={{ color: colors.textPrimary }}
          >
            {currentLanguage.code === 'ja' ? '税務に関するよくある質問' : 'Common Tax Questions'}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-8"
            style={{ borderColor: colors.secondaryColor1 }}
          >
            <ul className="space-y-2">
              {pageContent.exemplaryQuestions.map((question, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start text-base sm:text-lg"
                  style={{ color: colors.textSecondary }}
                >
                  <HelpCircle size={20} className="mr-2 mt-1" style={{ color: colors.primaryColor1 }} />
                  <span>{question}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
     
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;