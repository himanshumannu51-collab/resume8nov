'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles, Download, Eye } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Build Your Perfect Resume
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create professional, ATS-friendly resumes in minutes. Choose from beautiful templates and customize every detail.
          </p>
          <Link href="/builder">
            <Button size="lg" className="text-lg px-8 py-6">
              <FileText className="w-5 h-5 mr-2" />
              Start Building
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Beautiful Templates</h3>
            <p className="text-gray-600">Choose from professionally designed templates</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Preview</h3>
            <p className="text-gray-600">See changes instantly as you edit</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Export</h3>
            <p className="text-gray-600">Download as PDF in one click</p>
          </div>
        </div>
      </div>
    </div>
  );
}
