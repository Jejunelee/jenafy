import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
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
                    src="/favicon.ico"
                    alt="Jenafy Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#5de0e6] to-[#256ac6] bg-clip-text text-transparent">
                  Jenafy
                </span>
              </Link>
              
              <nav className="hidden md:flex items-center gap-6">
                <Link 
                  href="#features" 
                  className="text-gray-200 hover:text-[#5de0e6] transition-all duration-300 hover:scale-105 px-3 py-1 rounded-lg hover:bg-white/5"
                >
                  Our Solutions
                </Link>
                <Link 
                  href="s" 
                  className="text-gray-200 hover:text-[#5de0e6] transition-all duration-300 hover:scale-105 px-3 py-1 rounded-lg hover:bg-white/5"
                >
                  Clients
                </Link>
                <Link 
                  href="#docs" 
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

            <div className="flex items-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#5de0e6] to-[#256ac6] px-6 py-2 text-sm font-medium text-white shadow-lg hover:shadow-xl hover:shadow-[#5de0e6]/30 transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}