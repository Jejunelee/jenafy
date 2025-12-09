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
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black">
        {/* Subtle gradient overlay in the middle */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent"></div>
        
        {/* Radial gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px)] bg-[size:4rem]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem]"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        
        {/* Header Section - Reduced margin bottom */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Enterprise Brands</span>
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto text-lg">
            In creating easier workflows, automation, and business optics.
          </p>
        </div>

        {/* Reduced vertical padding on container and removed extra margin-top */}
        <div className="mb-6">
          {/* Reduced container height */}
          <div className="h-[200px] flex items-center">
            <div className={`w-full flex flex-wrap justify-center gap-6 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              {visibleClients.map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="flex-shrink-0 px-4 flex items-center justify-center group"
                >
                  <div className="relative">
                    {/* Enhanced glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-gradient-to-r from-blue-500 to-cyan-500 blur-2xl rounded-2xl transition-all duration-500 group-hover:scale-110"></div>
                    
                    {/* Logo container with gradient border */}
                    <div className="relative bg-gradient-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-lg border border-gray-800/50 rounded-2xl p-6 
                                  group-hover:border-blue-500/50 group-hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.5)] transition-all duration-300 
                                  group-hover:scale-110 h-[130px] w-[160px] flex items-center justify-center
                                  before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-br before:from-gray-800/30 before:to-transparent before:-z-10">
                      <div className="relative grayscale group-hover:grayscale-0 transition-all duration-300 max-h-[70px]">
                        <Image
                          src={client.src}
                          alt={client.name}
                          width={client.width}
                          height={client.height}
                          className="object-contain max-h-[70px] w-auto"
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

        {/* Decorative elements */}
        <div className="absolute -top-16 -left-16 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-cyan-900/10 rounded-full blur-3xl"></div>

      </div>
    </div>
  );
}