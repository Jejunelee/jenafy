"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Clients() {
  const clients = [
    { name: 'Microsoft', src: '/clients/1.png', width: 180, height: 40 },
    { name: 'Microsoft', src: '/clients/2.png', width: 180, height: 40 },
    { name: 'Microsoft', src: '/clients/3.png', width: 180, height: 40 },
    { name: 'Microsoft', src: '/clients/4.png', width: 180, height: 40 },
  ];

  const [visibleClients, setVisibleClients] = useState(clients.slice(0, 4));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        const randomStart = Math.floor(Math.random() * clients.length);
        const rotatedClients = [
          ...clients.slice(randomStart, randomStart + 4),
          ...clients.slice(0, Math.max(0, 4 - (clients.length - randomStart)))
        ];
        setVisibleClients(rotatedClients);
        setIsTransitioning(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [clients]);

  return (
    <div id="Clients" className="relative py-8 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black">
        {/* Subtle gradient overlay in the middle */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent"></div>
        
        {/* Radial gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
        
        {/* Animated grid lines - smaller on mobile */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px)] bg-[size:2rem] md:bg-[size:4rem]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:2rem] md:bg-[size:4rem]"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        
        {/* Header Section - Responsive sizing and spacing */}
        <div className="text-center mb-6 md:mb-8 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Enterprise Brands</span>
          </h1>
          <p className="text-gray-400 mt-2 sm:mt-3 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
            In creating easier workflows, automation, and business optics.
          </p>
        </div>

        {/* Responsive client logos container */}
        <div className="mb-4 md:mb-6">
          {/* Responsive container height */}
          <div className="h-[150px] sm:h-[180px] md:h-[200px] flex items-center">
            <div className={`w-full flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              {visibleClients.map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="flex-shrink-0 px-2 sm:px-3 md:px-4 flex items-center justify-center group"
                >
                  <div className="relative">
                    {/* Enhanced glow effect - reduced on mobile */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 md:group-hover:opacity-30 bg-gradient-to-r from-blue-500 to-cyan-500 blur-xl md:blur-2xl rounded-xl md:rounded-2xl transition-all duration-500 group-hover:scale-105 md:group-hover:scale-110"></div>
                    
                    {/* Responsive logo container */}
                    <div className="relative bg-gradient-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-lg border border-gray-800/50 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 
                                  group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)] md:group-hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.5)] 
                                  transition-all duration-300 group-hover:scale-105 md:group-hover:scale-110 
                                  h-[90px] sm:h-[110px] md:h-[130px] w-[110px] sm:w-[140px] md:w-[160px] 
                                  flex items-center justify-center
                                  before:absolute before:inset-0 before:rounded-xl md:before:rounded-2xl before:p-[1px] before:bg-gradient-to-br before:from-gray-800/30 before:to-transparent before:-z-10">
                      <div className="relative grayscale group-hover:grayscale-0 transition-all duration-300 max-h-[50px] sm:max-h-[60px] md:max-h-[70px]">
                        <Image
                          src={client.src}
                          alt={client.name}
                          width={isMobile ? client.width * 0.6 : client.width}
                          height={isMobile ? client.height * 0.6 : client.height}
                          className="object-contain max-h-[50px] sm:max-h-[60px] md:max-h-[70px] w-auto"
                          draggable="false"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements - scaled down on mobile */}
        <div className="absolute -top-8 md:-top-16 -left-8 md:-left-16 w-40 md:w-80 h-40 md:h-80 bg-blue-900/10 rounded-full blur-xl md:blur-3xl"></div>
        <div className="absolute -bottom-8 md:-bottom-16 -right-8 md:-right-16 w-40 md:w-80 h-40 md:h-80 bg-cyan-900/10 rounded-full blur-xl md:blur-3xl"></div>
      </div>
    </div>
  );
}