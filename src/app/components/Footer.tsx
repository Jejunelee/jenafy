import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
      <footer className="px-4 sm:px-6 lg:px-8 py-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <span>© 2025 Jenafy. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              System Status: Operational!
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Support</a>
            <a href="mailto:support@jenafy.com" className="hover:text-gray-300 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
  );
}