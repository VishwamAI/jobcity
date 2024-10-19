'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Code, Brain, Rocket, Smartphone, Search, ChevronDown, Menu, X } from 'lucide-react'

interface FeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
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
)

interface ResearchAreaProps {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const ResearchArea: React.FC<ResearchAreaProps> = ({ title, description, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
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
    </motion.div>
  )
}

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-indigo-600 mr-3" />
              <span className="text-2xl font-bold text-gray-900">Job-City</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-indigo-600 transition duration-150">Features</a>
              <a href="#research" className="text-gray-600 hover:text-indigo-600 transition duration-150">Research</a>
              <a href="#development" className="text-gray-600 hover:text-indigo-600 transition duration-150">Development</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition duration-150">About Us</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition duration-150">Contact</a>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-indigo-600">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden mt-4">
              <a href="#features" className="block py-2 text-gray-600 hover:text-indigo-600">Features</a>
              <a href="#research" className="block py-2 text-gray-600 hover:text-indigo-600">Research</a>
              <a href="#development" className="block py-2 text-gray-600 hover:text-indigo-600">Development</a>
              <a href="#" className="block py-2 text-gray-600 hover:text-indigo-600">About Us</a>
              <a href="#" className="block py-2 text-gray-600 hover:text-indigo-600">Contact</a>
            </div>
          )}
        </nav>
      </header>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Welcome to the Future of Job Applications
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            Harnessing AI and Mobile Technology to Revolutionize Your Career Journey
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a
              href="#features"
              className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300"
            >
              Explore Features
            </a>
          </motion.div>
        </motion.section>

        <motion.section
          id="features"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Cutting-Edge Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Brain}
              title="AI-Powered Job Matching"
              description="Our advanced algorithms find the perfect job opportunities tailored to your skills and preferences."
            />
            <FeatureCard
              icon={Rocket}
              title="Automated Applications"
              description="Streamline your job search with AI-driven form filling and document preparation."
            />
            <FeatureCard
              icon={Smartphone}
              title="Mobile-First Design"
              description="Access Job-City's powerful features anytime, anywhere with our responsive mobile application."
            />
          </div>
        </motion.section>

        <motion.section
          id="research"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Research Focus</h2>
          <div className="space-y-4">
            <ResearchArea
              icon={Code}
              title="Natural Language Processing in Job Descriptions"
              description="We're developing advanced NLP models to extract key information from job postings, making it easier for you to find relevant opportunities."
            />
            <ResearchArea
              icon={Brain}
              title="Predictive Career Pathing"
              description="Using machine learning to analyze career trajectories and provide personalized recommendations for skill development and job transitions."
            />
            <ResearchArea
              icon={Briefcase}
              title="Blockchain for Verified Credentials"
              description="Exploring blockchain technology to create a secure, decentralized system for verifying educational and professional credentials."
            />
          </div>
        </motion.section>

        <motion.section
          id="development"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Development Roadmap</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'AI Agent Beta Release', date: 'Q3 2024' },
              { title: 'Mobile App Launch', date: 'Q4 2024' },
              { title: 'Integration with Major Job Boards', date: 'Q1 2025' },
              { title: 'AR Interview Preparation Module', date: 'Q2 2025' },
            ].map((milestone, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Job Search?</h2>
          <p className="text-xl text-gray-600 mb-8">Join Job-City today and experience the future of career development.</p>
          <a
            href="#"
            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 inline-block"
          >
            Get Started Now
          </a>
        </motion.section>
      </motion.main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Briefcase className="h-8 w-8 text-indigo-400 mr-3" />
              <span className="text-2xl font-bold">Job-City</span>
            </div>
            <div className="flex flex-wrap justify-center space-x-4">
              <a href="#" className="hover:text-indigo-400 transition duration-150">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-400 transition duration-150">Terms of Service</a>
              <a href="#" className="hover:text-indigo-400 transition duration-150">Contact Us</a>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-400">
            © 2024 Job-City. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
