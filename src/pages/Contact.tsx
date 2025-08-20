import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react';
import { colors } from '../data/colors/theme';
import { useLanguage } from '../contexts/LanguageContext';

// Import all language files statically
import enContact from '../data/text/en/contact.json';
import jaContact from '../data/text/ja/contact.json';
import zhContact from '../data/text/zh/contact.json';

// Create a language map
const languageMap = {
  en: enContact,
  ja: jaContact,
  zh: zhContact,
};

interface ContactContent {
  title: string;
  subtitle: string;
  contactInfo: {
    title: string;
    details: string;
    description: string;
  }[];
  businessHours: {
    title: string;
    days: {
      name: string;
      hours: string;
    }[];
  };
  form: {
    title: string;
    success: {
      title: string;
      message: string;
      button: string;
    };
    fields: {
      name: string;
      email: string;
      company: string;
      service: string;
      subject: string;
      message: string;
      submit: string;
      serviceOptions: {
        general: string;
        technology: string;
        security: string;
        consulting: string;
        web: string;
        support: string;
      };
    };
  };
  websiteInfo: {
    name: string;
    slogan: string;
    mail: string;
    phone: string;
  };
}

const Contact: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [pageContent, setPageContent] = useState<ContactContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    service: 'general',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadContent = () => {
      setIsLoading(true);
      try {
        console.log(`Loading content for language: ${currentLanguage.code}`); // Debug log
        const content = languageMap[currentLanguage.code as keyof typeof languageMap];
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
      service: 'general',
    });
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
            {pageContent.title}
          </h1>
          <p 
            className="text-lg sm:text-xl max-w-3xl mx-auto"
            style={{ color: colors.textSecondary }}
          >
            {pageContent.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 
                className="text-2xl sm:text-3xl font-bold mb-6"
                style={{ color: colors.textPrimary }}
              >
                {pageContent.contactInfo[0].title}
              </h2>
              <div className="space-y-6">
                {pageContent.contactInfo.map((info, index) => {
                  const IconComponent = [Mail, Phone, MapPin][index];
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div
                        className="p-3 rounded-full"
                        style={{ backgroundColor: colors.primaryColor1 }}
                      >
                        <IconComponent className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 
                          className="font-semibold mb-1"
                          style={{ color: colors.textPrimary }}
                        >
                          {info.title}
                        </h3>
                        <p 
                          className="font-medium mb-1"
                          style={{ color: colors.primaryColor1 }}
                        >
                          {info.details}
                        </p>
                        <p 
                          className="text-sm"
                          style={{ color: colors.textSecondary }}
                        >
                          {info.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Clock 
                  className="mr-3"
                  style={{ color: colors.primaryColor1 }}
                  size={24}
                />
                <h3 
                  className="text-lg sm:text-xl font-semibold"
                  style={{ color: colors.textPrimary }}
                >
                  {pageContent.businessHours.title}
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                {pageContent.businessHours.days.map((day, index) => (
                  <div key={index} className="flex justify-between">
                    <span style={{ color: colors.textSecondary }}>{day.name}</span>
                    <span style={{ color: colors.textPrimary }}>{day.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <MessageSquare 
                  className="mr-3"
                  style={{ color: colors.primaryColor1 }}
                  size={24}
                />
                <h2 
                  className="text-2xl sm:text-3xl font-bold"
                  style={{ color: colors.textPrimary }}
                >
                  {pageContent.form.title}
                </h2>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-12"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: colors.accent }}
                  >
                    <Send className="text-white" size={24} />
                  </div>
                  <h3 
                    className="text-xl sm:text-2xl font-bold mb-2"
                    style={{ color: colors.textPrimary }}
                  >
                    {pageContent.form.success.title}
                  </h3>
                  <p className="text-base sm:text-lg" style={{ color: colors.textSecondary }}>
                    {pageContent.form.success.message}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: colors.primaryColor1 }}
                  >
                    {pageContent.form.success.button}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label 
                        htmlFor="name" 
                        className="block text-sm font-medium mb-2"
                        style={{ color: colors.textPrimary }}
                      >
                        {pageContent.form.fields.name} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        placeholder={pageContent.form.fields.name}
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="email" 
                        className="block text-sm font-medium mb-2"
                        style={{ color: colors.textPrimary }}
                      >
                        {pageContent.form.fields.email} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        placeholder={pageContent.form.fields.email}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label 
                        htmlFor="company" 
                        className="block text-sm font-medium mb-2"
                        style={{ color: colors.textPrimary }}
                      >
                        {pageContent.form.fields.company}
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        placeholder={pageContent.form.fields.company}
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="service" 
                        className="block text-sm font-medium mb-2"
                        style={{ color: colors.textPrimary }}
                      >
                        {pageContent.form.fields.service}
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                      >
                        <option value="general">{pageContent.form.fields.serviceOptions.general}</option>
                        <option value="technology">{pageContent.form.fields.serviceOptions.technology}</option>
                        <option value="security">{pageContent.form.fields.serviceOptions.security}</option>
                        <option value="consulting">{pageContent.form.fields.serviceOptions.consulting}</option>
                        <option value="web">{pageContent.form.fields.serviceOptions.web}</option>
                        <option value="support">{pageContent.form.fields.serviceOptions.support}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="subject" 
                      className="block text-sm font-medium mb-2"
                      style={{ color: colors.textPrimary }}
                    >
                      {pageContent.form.fields.subject} *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                      placeholder={pageContent.form.fields.subject}
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="message" 
                      className="block text-sm font-medium mb-2"
                      style={{ color: colors.textPrimary }}
                    >
                      {pageContent.form.fields.message} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 resize-vertical"
                      placeholder={pageContent.form.fields.message}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center px-8 py-4 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                    style={{ backgroundColor: colors.primaryColor1 }}
                  >
                    {isSubmitting ? (
                      pageContent.form.fields.submit
                    ) : (
                      <>
                        {pageContent.form.fields.submit}
                        <Send size={20} className="ml-2" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;