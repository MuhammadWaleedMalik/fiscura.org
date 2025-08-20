import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Privacy from './pages/Privacy';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import BlogPost from './pages/BlogPost';
import Cookies from './pages/Cookies';
import Terms from './pages/Terms';
import Taxconsultations from './pages/services/Taxconsultations';
import Technologysolutions from './pages/services/Technologysolutions';
import Securityservices from './pages/services/Securityservices';
import CustomSoftwareDevelopment from './pages/services/CustomSoftwareDevelopment';
import PricingBasic from './pages/PricingBasic';
import PricingPro from './pages/PricingPro';
import PricingEnterprise from './pages/PricingEnterprice';
import DashboardC from './pages/DashboardC';
import Pricing from './pages/Pricing';


function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <Routes>
                <Route path ='/admin/*' element={<DashboardC />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="pricing/basic" element={<PricingBasic/>} />
                <Route path="pricing/pro" element={<PricingPro />} />
                <Route path="pricing/enterprise" element={<PricingEnterprise />} />

                <Route
                  path="/services/tax-consultation"
                  element={
                  <ProtectedRoute>
                    <Taxconsultations />
                  </ProtectedRoute>
                  }
                />
                <Route
                  path="/services/technology-solutions"
                  element={
                  <ProtectedRoute>
                    <Technologysolutions />
                  </ProtectedRoute>
                  }
                />
                <Route
                  path="/services/security-services"
                  element={
                  <ProtectedRoute>
                    <Securityservices />
                  </ProtectedRoute>
                  }
                />
                <Route
                  path="/services/custom-software-development"
                  element={
                  <ProtectedRoute>
                    <CustomSoftwareDevelopment />
                  </ProtectedRoute>
                  }
                />
                </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;