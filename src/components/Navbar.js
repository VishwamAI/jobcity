import React, { useState } from 'react';
import { Menu, X, Briefcase } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-indigo-600 mr-3" />
            <span className="text-2xl font-bold text-gray-900">Job-City</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-indigo-600 transition duration-150">Home</Link>
            <Link href="#features" className="text-gray-600 hover:text-indigo-600 transition duration-150">Features</Link>
            <Link href="#research" className="text-gray-600 hover:text-indigo-600 transition duration-150">Research</Link>
            <Link href="#development" className="text-gray-600 hover:text-indigo-600 transition duration-150">Development</Link>
            <Link href="/about" className="text-gray-600 hover:text-indigo-600 transition duration-150">About Us</Link>
            <Link href="/contact" className="text-gray-600 hover:text-indigo-600 transition duration-150">Contact</Link>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-indigo-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <Link href="/" className="block py-2 text-gray-600 hover:text-indigo-600">Home</Link>
            <Link href="#features" className="block py-2 text-gray-600 hover:text-indigo-600">Features</Link>
            <Link href="#research" className="block py-2 text-gray-600 hover:text-indigo-600">Research</Link>
            <Link href="#development" className="block py-2 text-gray-600 hover:text-indigo-600">Development</Link>
            <Link href="/about" className="block py-2 text-gray-600 hover:text-indigo-600">About Us</Link>
            <Link href="/contact" className="block py-2 text-gray-600 hover:text-indigo-600">Contact</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
