"use client";

import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  
  // Only show footer on the main page
  if (pathname !== "/") {
    return null;
  }

  return (
    <footer className="bg-white text-black py-6 sm:py-10 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Mobile View - Only Branding and Social Links */}
        <div className="sm:hidden flex flex-col items-center gap-6">
          {/* Branding */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-bold mb-2">
              <Link href="/" className="hover:underline">
                Smart Summarizer
              </Link>
            </h3>
            <p className="text-sm text-gray-600 max-w-[200px]">
              Transform PDFs into concise summaries with AI
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex gap-6">
            <a href="https://x.com/SuyashJain32315?s=09" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <FaTwitter className="text-black hover:text-red-600 w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/suyash-jain-719293335" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <FaLinkedin className="text-black hover:text-red-600 w-5 h-5" />
            </a>
            <a href="https://github.com/Suyashjj" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <FaGithub className="text-black hover:text-red-600 w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Desktop View - All Sections */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Branding */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-2">
              <Link href="/" className="hover:underline">
                Smart Summarizer
              </Link>
            </h3>
            <p className="text-sm text-gray-600 text-center md:text-left">
              Transform PDFs into concise summaries with AI
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-3">Explore</h4>
            <Link href="/pricing" className="text-black hover:text-red-600 transition-colors mb-2">
              Pricing
            </Link>
            <Link href="/summaries" className="text-black hover:text-red-600 transition-colors mb-2">
              Your Summaries
            </Link>
            <Link href="/about" className="text-black hover:text-red-600 transition-colors mb-2">
              About
            </Link>
            <Link href="/contact" className="text-black hover:text-red-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* Column 3: Support Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-3">Support</h4>
            <Link href="/help" className="text-black hover:text-red-600 transition-colors mb-2">
              Help
            </Link>
            <Link href="/faq" className="text-black hover:text-red-600 transition-colors mb-2">
              FAQ
            </Link>
            <Link href="/terms" className="text-black hover:text-red-600 transition-colors">
              Terms of Service
            </Link>
          </div>

          {/* Column 4: Call-to-Action & Social Media */}
          <div className="flex flex-col items-center md:items-start">
            <Link
              href="/upload"
              className="inline-block bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors mb-4"
            >
              Follow Us On
            </Link>
            <div className="flex space-x-4">
              <a href="https://x.com/SuyashJain32315?s=09" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <FaTwitter className="text-black hover:text-red-600 w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/suyash-jain-719293335" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <FaLinkedin className="text-black hover:text-red-600 w-6 h-6" />
              </a>
              <a href="https://github.com/Suyashjj" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <FaGithub className="text-black hover:text-red-600 w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500 border-t border-gray-200 pt-3 sm:pt-4">
        © {new Date().getFullYear()} Smart Summarizer. All rights reserved.
      </div>
    </footer>
  );
}