import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Code, Brain, Rocket, Smartphone, Search, ChevronDown, Menu, X, LucideProps } from 'lucide-react';


interface FeatureCardProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden"
  >
    <div className="p-6">
      <Icon className="h-10 w-10 text-indigo-600 mb-3" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
);

interface ResearchAreaProps {
  title: string;
  description: string;
  icon: React.ComponentType<LucideProps>;
}

const ResearchArea: React.FC<ResearchAreaProps> = ({ title, description, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-left"
      >
        <div className="flex items-center">
          <Icon className="h-6 w-6 text-indigo-600 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-4 bg-indigo-50">
          <p className="text-gray-600">{description}</p>
        </div>
      )}
    </div>
  );
};

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-indigo-600 mr-3" />
              <span className="text-2xl font-bold text-gray-900">Job-City</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#features" className="text-gray-600 hover:text-indigo-600 transition duration-150">Features</a>
              <a href="#research" className="text-gray-600 hover:text-indigo-600 transition duration-150">Research</a>
              <a href="#development" className="text-gray-600 hover:text-indigo-600 transition duration-150">Development</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition duration-150">About Us</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition duration-150">Contact</a>
              <button onClick={() => alert('Login functionality to be implemented')} className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition duration-300 ml-4">Login</button>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-indigo-600 transition duration-150"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg">
              <a href="#features" className="block py-2 px-4 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition duration-150">Features</a>
              <a href="#research" className="block py-2 px-4 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition duration-150">Research</a>
              <a href="#development" className="block py-2 px-4 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition duration-150">Development</a>
              <a href="#" className="block py-2 px-4 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition duration-150">About Us</a>
              <a href="#" className="block py-2 px-4 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition duration-150">Contact</a>
              <button onClick={() => alert('Login functionality to be implemented')} className="block w-full text-left py-2 px-4 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition duration-150">Login</button>
            </div>
          )}
        </nav>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4"
            >
              Welcome to <span className="text-indigo-600">Job-City</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8"
            >
              Revolutionizing job search with AI and blockchain technology
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href="#"
                className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300"
              >
                Get Started
              </a>
            </motion.div>
          </div>
        </section>

        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Search}
              title="AI-Powered Job Matching"
              description="Our advanced AI algorithms match you with the perfect job opportunities based on your skills and preferences."
            />
            <FeatureCard
              icon={Code}
              title="Blockchain Verification"
              description="Secure and transparent verification of credentials and work history using blockchain technology."
            />
            <FeatureCard
              icon={Smartphone}
              title="Mobile-First Approach"
              description="Access Job-City on any device with our responsive, mobile-first design for job searching on-the-go."
            />
          </div>
        </section>

        <section id="research" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Research Areas</h2>
          <div className="space-y-4">
            <ResearchArea
              icon={Brain}
              title="Natural Language Processing"
              description="Advancing NLP techniques to better understand job descriptions and candidate profiles."
            />
            <ResearchArea
              icon={Rocket}
              title="Predictive Analytics"
              description="Developing models to predict job market trends and candidate success rates."
            />
            <ResearchArea
              icon={Code}
              title="Blockchain Integration"
              description="Exploring innovative ways to leverage blockchain for secure and efficient hiring processes."
            />
          </div>
        </section>

        <section id="development" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Development Roadmap</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200"></div>
            <div className="space-y-12">
              {[
                { year: '2023', title: 'MVP Launch', description: 'Launch of our Minimum Viable Product with core features.' },
                { year: '2024', title: 'AI Enhancement', description: 'Major updates to our AI algorithms for improved job matching.' },
                { year: '2025', title: 'Global Expansion', description: 'Expanding our services to international job markets.' },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-6 h-6 rounded-full bg-indigo-600 border-4 border-white"></div>
                  <div className={`relative ${index % 2 === 0 ? 'pl-8 md:ml-1/2 md:pl-12' : 'pr-8 md:mr-1/2 md:pr-12'}`}>
                    <h3 className="text-lg font-semibold text-indigo-600 mb-1">{item.year}</h3>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-indigo-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to revolutionize your job search?</h2>
            <p className="text-xl mb-8">Join Job-City today and experience the future of recruitment.</p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Job-City</h3>
              <p className="text-gray-400">Revolutionizing the job market with AI and blockchain technology.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Home</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition duration-150">Features</a></li>
                <li><a href="#research" className="text-gray-400 hover:text-white transition duration-150">Research</a></li>
                <li><a href="#development" className="text-gray-400 hover:text-white transition duration-150">Development</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">Email: info@jobcity.com</p>
              <p className="text-gray-400">Phone: +1 (123) 456-7890</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2023 Job-City. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
