import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Code,
  Brain,
  Rocket,
  Smartphone,
  Search,
  ChevronDown,
  Menu,
  X,
  LucideProps,
  MapPin,
  Phone,
  Mail,
  Users,
  Target,
  ArrowRight,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

interface FeatureCardProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
}) => (
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

const ResearchArea: React.FC<ResearchAreaProps> = ({
  title,
  description,
  icon: Icon,
}) => {
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
            isOpen ? "rotate-180" : ""
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
              <a
                href="#features"
                className="text-gray-600 hover:text-indigo-600 transition duration-150"
              >
                Features
              </a>
              <a
                href="#research"
                className="text-gray-600 hover:text-indigo-600 transition duration-150"
              >
                Research
              </a>
              <a
                href="#development"
                className="text-gray-600 hover:text-indigo-600 transition duration-150"
              >
                Development
              </a>
              <a
                href="#about-us"
                className="text-gray-600 hover:text-indigo-600 transition duration-150"
              >
                About Us
              </a>
              <a
                href="#contact-us"
                className="text-gray-600 hover:text-indigo-600 transition duration-150"
              >
                Contact
              </a>
              <button
                onClick={() => (window.location.href = "/auth")}
                className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition duration-300 ml-4"
              >
                Login
              </button>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-indigo-600 transition duration-150"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg">
              <a
                href="#features"
                className="block py-2 px-4 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition duration-150"
              >
                Features
              </a>
              <a
                href="#research"
                className="block py-2 px-4 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition duration-150"
              >
                Research
              </a>
              <a
                href="#development"
                className="block py-2 px-4 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition duration-150"
              >
                Development
              </a>
              <a
                href="#"
                className="block py-2 px-4 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition duration-150"
              >
                About Us
              </a>
              <a
                href="#"
                className="block py-2 px-4 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition duration-150"
              >
                Contact
              </a>
              <button
                onClick={() => alert("Login functionality to be implemented")}
                className="block w-full text-left py-2 px-4 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition duration-150"
              >
                Login
              </button>
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

        <section
          id="features"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Features
          </h2>
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

        <section
          id="research"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gray-50"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Research Areas
          </h2>
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

        {/* <section id="development" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Development Roadmap</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200"></div>
            <div className="space-y-12">
              {[
                { year: '2024', title: 'MVP Launch', description: 'Launch of our Minimum Viable Product with core features.' },
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
        </section> */}
        <section
          id="development"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Development Roadmap
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200"></div>
            <div className="space-y-12">
              {/* First Milestone (MVP Launch - 2023) */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-6 h-6 rounded-full bg-indigo-600 border-4 border-white"></div>
                <div className="relative pl-8 md:pl-16 text-center">
                  <h3 className="text-lg font-semibold text-indigo-600 mb-1 ml-[10px] ">
                    2023
                  </h3>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 ml-[84px]">
                    MVP Launch
                  </h4>
                  <p className="text-gray-600 ml-[184px]">
                    Launch of our Minimum Viable <br />
                    <span className="mr-7">Product with core features.</span>
                  </p>
                </div>
              </div>

              {/* Second Milestone (AI Enhancement - 2024) */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-6 h-6 rounded-full bg-indigo-600 border-4 border-white"></div>
                <div className="relative pr-8 md:pr-16 text-center">
                  <h3 className="text-lg font-semibold text-indigo-600 mb-1 mr-[10px]">
                    2024
                  </h3>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 mr-[108px]">
                    AI Enhancement
                  </h4>
                  <p className="text-gray-600 mr-[205px]">
                    Major updates to our AI algorithms <br />
                    <span className="ml-[55px]">
                      {" "}
                      for improved job matching.
                    </span>
                  </p>
                </div>
              </div>

              {/* Third Milestone (Global Expansion - 2025) */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-6 h-6 rounded-full bg-indigo-600 border-4 border-white"></div>
                <div className="relative pl-8 md:pl-16 text-center">
                  <h3 className="text-lg font-semibold text-indigo-600 mb-1 ml-[10px] ">
                    2025
                  </h3>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 ml-[125px]">
                    Global Expansion
                  </h4>
                  <p className="text-gray-600 ml-[150px]">
                    Expanding our services to <br />
                    <span>international job markets.</span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about-us"
          className="py-20 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-indigo-800 mb-12 text-center"
            >
              About Us
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center text-indigo-700">
                    <Users className="h-6 w-6 mr-2" />
                    Our Mission
                  </h3>
                  <p className="text-gray-600 mb-6">
                    At Job-City, we are on a mission to revolutionize the job
                    market by leveraging cutting-edge AI and blockchain
                    technology. We believe in creating a fair, efficient, and
                    transparent ecosystem for job seekers and employers alike.
                  </p>
                  <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center text-indigo-700">
                    <Target className="h-6 w-6 mr-2" />
                    Our Vision
                  </h3>
                  <p className="text-gray-600">
                    We envision a world where finding the perfect job or the
                    ideal candidate is seamless, secure, and tailored to
                    individual needs. Through innovation and dedication, we are
                    building the future of recruitment.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex flex-col">
                  <img
                    src="https://i.pinimg.com/564x/f7/95/6c/f7956c0dad2c9daf2a817e7ee9cfd58c.jpg"
                    alt="Team collaboration"
                    className="rounded-lg shadow-lg"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-indigo-600 text-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <p className="font-semibold flex gap-2 text-center">
                      Empowering Careers <ArrowRight />
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          id="contact-us"
          className="py-20 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-indigo-800 mb-12 text-center"
            >
              Contact Us
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-indigo-700">
                    Get in Touch
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Have questions or feedback? We would love to hear from you.
                    Reach out to us using the contact information below or fill
                    out the form, and we will get back to you as soon as
                    possible.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
                      <Mail className="h-6 w-6 text-indigo-600 mr-3" />
                      <span className="text-gray-700">
                        kasinadhsarma@gmail.com
                      </span>
                    </div>
                    <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
                      <Phone className="h-6 w-6 text-indigo-600 mr-3" />
                      <span className="text-gray-700">+91 987654321</span>
                    </div>
                    <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
                      <MapPin className="h-6 w-6 text-indigo-600 mr-3" />
                      <span className="text-gray-700">Headquarters: India</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <form className="bg-white shadow-lg rounded-lg p-8">
                  <div className="mb-6">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-semibold mb-2 text-left"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name..."
                      className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-semibold mb-2 text-left"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email address..."
                      className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 font-semibold mb-2 text-left"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="What do you wanna talk about..."
                      className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-indigo-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to revolutionize your job search?
            </h2>
            <p className="text-xl mb-8">
              Join Job-City today and experience the future of recruitment.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Job-City</h3>
              <p className="text-gray-400">
                Revolutionizing the job market with AI and blockchain
                technology.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-150"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white transition duration-150"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#research"
                    className="text-gray-400 hover:text-white transition duration-150"
                  >
                    Research
                  </a>
                </li>
                <li>
                  <a
                    href="#development"
                    className="text-gray-400 hover:text-white transition duration-150"
                  >
                    Development
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">Email: kasinadhsarma@gmail.com</p>
              <p className="text-gray-400">Phone: +91 6305953487</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <span className="flex items-center gap-2">
              <span>Follow us on</span>
              <a href="https://github.com/">
                <FaGithub />
              </a>
              <a href="https://discord.gg/">
                <FaDiscord />
              </a>
              <a href="#">
                <FaXTwitter />
              </a>
              <span style={{ marginLeft: "auto" }}>
                &copy; 2024 VishwamAI. All rights reserved.
              </span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
