import React from 'react';
import { Briefcase, Mail, ArrowRight } from 'lucide-react';
export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
        {/* Left Side - Branding */}
        <div className="bg-indigo-600 text-white p-8 md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-8">
              <Briefcase className="h-10 w-10 mr-3" />
              <span className="text-3xl font-bold">Job-City</span>
            </div>
            <h2 className="text-3xl font-bold text-indigo-100 mb-2">Forgot Your Password?</h2>
            <p className="text-indigo-200 mb-6">
              Don&apos;t worry, we&apos;ve got you covered. Let&apos;s get you back on track to finding your dream career.
            </p>
          </div>
          <div>
            <p className="text-sm text-indigo-200">
              © 2024 VishwamAI. All rights reserved.
            </p>
          </div>
        </div>
        {/* Right Side - Forgot Password Form */}
        <div className="p-8 md:w-1/2">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Forgot your password?
          </h3>
          <p className="text-gray-600 mb-6">
            Enter your email address and we&apos;ll send you instructions to reset your password.
          </p>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Reset Instructions
                <ArrowRight className="ml-2" size={16} />
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?
              <a href="/auth" className="ml-1 font-medium text-indigo-600 hover:text-indigo-500">
                Back to login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
