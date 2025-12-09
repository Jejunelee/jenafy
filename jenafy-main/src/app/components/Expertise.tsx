"use client";

import Image from 'next/image';

export default function Expertise() {
  const logos = [
    { name: 'NextJS', src: 'expertise-logos/nextjs-icon.svg', width: 60, height: 24 },
    { name: 'TypeScript', src: 'expertise-logos/typescript-icon-round.svg', width: 60, height: 26 },
    { name: 'Supabase', src: 'expertise-logos/supabase-icon.svg', width: 50, height: 24 },
    { name: 'Vercel', src: 'expertise-logos/vercel.svg', width: 120, height: 20 },
    { name: 'Docker', src: 'expertise-logos/docker.svg', width: 120, height: 24 },
    { name: 'VS Code', src: 'expertise-logos/visual-studio-code.svg', width: 60, height: 24 },
    { name: 'Firebase', src: 'expertise-logos/firebase.svg', width: 90, height: 28 },
    { name: 'JavaScript', src: 'expertise-logos/javascript.svg', width: 50, height: 24 },
    { name: 'Tailwind', src: 'expertise-logos/tailwindcss.svg', width: 170, height: 24 },
    { name: 'OpenAI', src: 'expertise-logos/openai.svg', width: 50, height: 24 },
    { name: 'Gemini', src: 'expertise-logos/google-gemini.svg', width: 110, height: 24 },
    { name: 'Google Cloud', src: 'expertise-logos/google-cloud.svg', width: 50, height: 24 }
  ];

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="py-2 relative w-full mb-6 overflow-hidden border-gray-800/30">

      {/* Scrolling Section */}
      <div className="relative">
        {/* Gradient fade edges - more subtle */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background via-background/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background via-background/70 to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling container */}
        <div className="flex animate-scroll-slow">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-8 px-2 py-1 flex items-center justify-center group"
            >
              <div className="relative opacity-60 group-hover:opacity-100 transition-all duration-300">
                {/* Subtle shine effect on hover */}
                <div className="absolute -inset-1 opacity-0 group-hover:opacity-15 bg-gradient-to-r from-[#5de0e6] to-[#256ac6] blur-sm rounded-lg transition-opacity duration-300"></div>
                
                {/* Logo */}
                <div className="relative grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    className="object-contain"
                    draggable="false"
                  />
                </div>
                
                {/* Label - appears on hover */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
                    {logo.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 4rem));
          }
        }
        .animate-scroll-slow {
          animation: scroll 100s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-scroll-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}