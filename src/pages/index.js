import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Briefcase, Code, Brain, Rocket, MobilePhone, Search, ChevronDown, Menu, X } from 'lucide-react';
import Navbar from '../components/Navbar';

const FeatureCard = ({ icon: Icon, title, description }) => (
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

const ResearchArea = ({ title, description, icon: Icon }) => {
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

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <Head>
        <title>Job-City - Education Commerce Platform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold text-gray-900 mb-6"
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
            <Link href="#features"
              className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300"
            >
              Explore Features
            </Link>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Cutting-Edge Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              icon={MobilePhone}
              title="Mobile-First Design"
              description="Access Job-City's powerful features anytime, anywhere with our responsive mobile application."
            />
          </div>
        </section>

        {/* Research Areas Section */}
        <section id="research" className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Our Research Focus</h2>
          <div className="space-y-4">
            <ResearchArea
              icon={Search}
              title="Natural Language Processing in Job Descriptions"
              description="We're developing advanced NLP models to better understand and match job descriptions with candidate profiles, improving the accuracy of our job recommendations."
            />
            <ResearchArea
              icon={Brain}
              title="Predictive Career Pathing"
              description="Using machine learning to analyze career trajectories and provide personalized career development advice based on individual skills, experiences, and market trends."
            />
            <ResearchArea
              icon={Code}
              title="Blockchain for Verified Credentials"
              description="Exploring the use of blockchain technology to create a secure, decentralized system for verifying educational and professional credentials, streamlining the hiring process."
            />
          </div>
        </section>

        {/* Development Roadmap */}
        <section id="development" className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Development Roadmap</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200"></div>
            {[
              { title: "AI Agent Beta Release", date: "Q3 2024" },
              { title: "Mobile App Launch", date: "Q4 2024" },
              { title: "Integration with Major Job Boards", date: "Q1 2025" },
              { title: "AR Interview Preparation Module", date: "Q2 2025" }
            ].map((milestone, index) => (
              <div key={index} className={`relative mb-8 ${index % 2 === 0 ? 'left-timeline' : 'right-timeline'}`}>
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full bg-indigo-600 absolute ${index % 2 === 0 ? 'left-1/2' : 'right-1/2'} -translate-x-3`}></div>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Commerce Platform Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Education Commerce Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Aptitude Reasoning', href: '/aptitude' },
              { name: 'Examination', href: '/examination' },
              { name: 'Coding Modules', href: '/coding' },
              { name: 'AI Research', href: '/ai-research' },
              { name: 'AI Security', href: '/ai-security' },
              { name: 'Community', href: '/community' },
            ].map((section) => (
              <Link key={section.name} href={section.href}>
                <div className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{section.name}</h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>
                        {section.name === 'Community'
                          ? 'Connect with other learners and experts.'
                          : `Explore ${section.name.toLowerCase()} modules and resources.`}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Job Search?</h2>
          <p className="text-xl text-gray-600 mb-8">Join Job-City today and experience the future of career development.</p>
          <Link href="#"
            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 inline-block"
          >
            Get Started Now
          </Link>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Briefcase className="h-8 w-8 text-indigo-400 mr-3" />
              <span className="text-2xl font-bold">Job-City</span>
            </div>
            <div className="flex flex-wrap justify-center space-x-4">
              <Link href="#" className="hover:text-indigo-400 transition duration-150">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-indigo-400 transition duration-150">Terms of Service</Link>
              <Link href="/contact" className="hover:text-indigo-400 transition duration-150">Contact Us</Link>
              <Link href="/privacy" className="hover:text-indigo-400 transition duration-150">Privacy Policy</Link>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-400">
            © {new Date().getFullYear()} Job-City. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
