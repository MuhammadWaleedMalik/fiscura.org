import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { colors } from '../../data/colors/theme';
import { useLanguage } from '../../contexts/LanguageContext';
import { useGroq } from '../../hooks/useGroq'; // Import the useGroq hook

// Import all language files statically
import enTaxConsultation from '../data/text/en/tax-consultation.json';
import jaTaxConsultation from '../data/text/ja/tax-consultation.json';
import zhTaxConsultation from '../data/text/zh/tax-consultation.json';

// Create a language map
const languageMap = {
  en: enTaxConsultation,
  ja: jaTaxConsultation,
  zh: zhTaxConsultation
};

interface TaxConsultationContent {
  title: string;
  subtitle: string;
  websiteName: string;
  content: string[];
  exemplaryQuestions: string[];
}

const Taxconsultations: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [pageContent, setPageContent] = useState<TaxConsultationContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(''); // State to store the answer
  const { fetchGroqResponse, response, loading, error } = useGroq(); // Use the Groq hook

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

  // Update answer when Groq response changes
  useEffect(() => {
    if (response) {
      setAnswer(response);
    }
  }, [response]);

  const handleGenerateAnswer = () => {
    if (question.trim()) {
      fetchGroqResponse(
        currentLanguage.code === 'ja' ? 
        '税務相談に関する質問に答えてください:' : 
        'Answer this question about tax consultation:',
        question
      );
      setQuestion('');
    }
  };

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

        {/* Exemplary Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-8"
          style={{ borderColor: colors.secondaryColor1 }}
        >
          <h2 
            className="text-xl sm:text-2xl font-semibold mb-4"
            style={{ color: colors.textPrimary }}
          >
            {currentLanguage.code === 'ja' ? '税務に関するよくある質問' : 'Common Tax Questions'}
          </h2>
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

        {/* Question Submission Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <div className="flex flex-col items-center">
            <h2 
              className="text-xl sm:text-2xl font-semibold mb-4"
              style={{ color: colors.textPrimary }}
            >
              {currentLanguage.code === 'ja' ? '税務に関するご質問' : 'Ask Your Tax Question'}
            </h2>
            <div className="w-full max-w-2xl">
              <div className="relative mb-4">
                <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} style={{ color: colors.textSecondary }} />
                <input
                  type="text"
                  placeholder={currentLanguage.code === 'ja' ? '質問を入力してください...' : 'Enter your tax question...'}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={handleGenerateAnswer}
                  disabled={loading}
                  className="px-6 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.primaryColor1 }}
                >
                  {loading ? 
                    (currentLanguage.code === 'ja' ? '生成中...' : 'Generating...') : 
                    (currentLanguage.code === 'ja' ? '回答を生成' : 'Generate Answer')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Answer Display Section */}
        {answer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6 mt-8"
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
              {currentLanguage.code === 'ja' ? '回答' : 'Answer'}
            </h3>
            <div className="prose" style={{ color: colors.textSecondary }}>
              {answer}
            </div>
          </motion.div>
        )}

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Taxconsultations;