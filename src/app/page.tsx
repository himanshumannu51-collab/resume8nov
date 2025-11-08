'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles, Download, Eye, Zap, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">ResumePro</span>
          </div>
          <Link href="/builder">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Resume Builder</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
              Land Your Dream Job with a
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600"> Perfect Resume</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Create professional, ATS-friendly resumes in minutes. No design skills needed. 
              Trusted by over 50,000+ job seekers worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/builder">
                <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700">
                  <Zap className="w-5 h-5 mr-2" />
                  Create Resume - Free
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto">
                <Eye className="w-5 h-5 mr-2" />
                See Examples
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Resumes Created</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">ATS Pass Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </div>
            </div>
          </div>

          {/* Right - Resume Preview */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
              <div className="space-y-4">
                {/* Mock Resume Header */}
                <div className="border-b pb-4">
                  <div className="h-6 bg-gray-900 rounded w-48 mb-2"></div>
                  <div className="h-3 bg-gray-400 rounded w-64"></div>
                </div>
                
                {/* Mock Resume Content */}
                <div className="space-y-3">
                  <div className="h-4 bg-indigo-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-300 rounded w-4/6"></div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="h-4 bg-indigo-200 rounded w-40"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded-full px-3 w-20"></div>
                    <div className="h-6 bg-gray-200 rounded-full px-3 w-24"></div>
                    <div className="h-6 bg-gray-200 rounded-full px-3 w-20"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-semibold">ATS Friendly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Stand Out
            </h2>
            <p className="text-lg text-gray-600">
              Powerful features to help you create the perfect resume
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Professional Templates</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose from 15+ expertly designed templates. Modern, classic, or creative - we have it all.
              </p>
            </div>

            <div className="group p-8 rounded-2xl border border-gray-200 hover:border-cyan-300 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Real-time Preview</h3>
              <p className="text-gray-600 leading-relaxed">
                See your changes instantly. What you see is exactly what you get when you download.
              </p>
            </div>

            <div className="group p-8 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Download className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Easy Export</h3>
              <p className="text-gray-600 leading-relaxed">
                Download your resume as PDF in one click. Print-ready and ATS-optimized format.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Build Your Resume?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of job seekers who landed their dream jobs with our resume builder
          </p>
          <Link href="/builder">
            <Button size="lg" className="text-lg px-10 py-6 bg-white text-indigo-600 hover:bg-gray-50">
              <Zap className="w-5 h-5 mr-2" />
              Start Building Now - It's Free
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2024 ResumePro. Built with ❤️ for job seekers worldwide.</p>
        </div>
      </footer>
    </div>
  );
}
