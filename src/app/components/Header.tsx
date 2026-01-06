"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle smooth scrolling
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      setIsMenuOpen(false);
    }
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="relative">
        {/* Glossy effect overlay with custom colors */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#5de0e6]/20 to-[#256ac6]/10 opacity-20 pointer-events-none" />
        
        {/* Main navbar container with custom gradient */}
        <div className="relative rounded-2xl border border-white/20 bg-gradient-to-br from-gray-900/80 to-gray-900/60 backdrop-blur-xs shadow-2xl shadow-black/40">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3 group">
                {/* SVG Logo */}
                <div className="relative h-8 w-8 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="JENAFY2.svg"
                    alt="Jenafy Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
                <span className="text-lg font-medium bg-gradient-to-r from-[#5de0e6] to-[#256ac6] opacity-90 bg-clip-text text-transparent">
                  │ JENAFY
                </span>
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <Link 
                  href="#Process" 
                  onClick={(e) => handleScroll(e, 'Process')}
                  className="text-gray-200 hover:text-[#5de0e6] transition-all duration-300 hover:scale-105 px-3 py-1 rounded-lg hover:bg-white/5"
                >
                  Our Process
                </Link>
                <Link 
                  href="#Clients" 
                  onClick={(e) => handleScroll(e, 'Clients')}
                  className="text-gray-200 hover:text-[#5de0e6] transition-all duration-300 hover:scale-105 px-3 py-1 rounded-lg hover:bg-white/5"
                >
                  Clients
                </Link>
                <Link 
                  href="#Team" 
                  onClick={(e) => handleScroll(e, 'Team')}
                  className="text-gray-200 hover:text-[#5de0e6] transition-all duration-300 hover:scale-105 px-3 py-1 rounded-lg hover:bg-white/5"
                >
                  Team
                </Link>
                <Link 
                  href="pricing" 
                  className="text-gray-200 hover:text-[#5de0e6] transition-all duration-300 hover:scale-105 px-3 py-1 rounded-lg hover:bg-white/5"
                >
                  Pricing
                </Link>
              </nav>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-white/5 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <span className={`block w-6 h-0.5 bg-gray-200 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-200 transition-all duration-300 my-1.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-200 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 md:hidden mt-2">
              {/* Mobile menu backdrop with same styling as header */}
              <div className="relative rounded-2xl border border-white/20 bg-gradient-to-br from-gray-900/95 to-gray-900/90 backdrop-blur-xs shadow-2xl shadow-black/40 overflow-hidden">
                {/* Glossy effect overlay for mobile menu */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#5de0e6]/20 to-[#256ac6]/10 opacity-20 pointer-events-none" />
                
                {/* Mobile menu items */}
                <nav className="relative flex flex-col p-4 space-y-3">
                  <Link 
                    href="#Process" 
                    onClick={(e) => {
                      handleScroll(e, 'Process');
                      handleLinkClick();
                    }}
                    className="text-gray-200 hover:text-[#5de0e6] transition-all duration-300 hover:scale-105 px-4 py-3 rounded-lg hover:bg-white/5 text-center"
                  >
                    Our Process
                  </Link>
                  <Link 
                    href="#Clients" 
                    onClick={(e) => {
                      handleScroll(e, 'Clients');
                      handleLinkClick();
                    }}
                    className="text-gray-200 hover:text-[#5de0e6] transition-all duration-300 hover:scale-105 px-4 py-3 rounded-lg hover:bg-white/5 text-center"
                  >
                    Clients
                  </Link>
                  <Link 
                    href="#Team" 
                    onClick={(e) => {
                      handleScroll(e, 'Team');
                      handleLinkClick();
                    }}
                    className="text-gray-200 hover:text-[#5de0e6] transition-all duration-300 hover:scale-105 px-4 py-3 rounded-lg hover:bg-white/5 text-center"
                  >
                    Team
                  </Link>
                  <Link 
                    href="pricing" 
                    onClick={handleLinkClick}
                    className="text-gray-200 hover:text-[#5de0e6] transition-all duration-300 hover:scale-105 px-4 py-3 rounded-lg hover:bg-white/5 text-center"
                  >
                    Pricing
                  </Link>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}