"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const pastWorkRef = useRef<HTMLParagraphElement>(null);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [loadingStates, setLoadingStates] = useState<boolean[]>([]);
  
  // Initialize loading states
  useLayoutEffect(() => {
    setLoadingStates(Array(3).fill(false));
  }, []);

  const handleButtonClick = async (index: number, url: string) => {
    // Prevent multiple clicks
    if (loadingStates[index]) return;
    
    // Update loading state
    const newLoadingStates = [...loadingStates];
    newLoadingStates[index] = true;
    setLoadingStates(newLoadingStates);
    
    const button = buttonsRef.current[index];
    if (!button) return;
    
    // Reset any existing animations
    gsap.killTweensOf(button.querySelector('.button-progress'));
    gsap.killTweensOf(button);
    
    // Create the progress bar animation
    const progressBar = button.querySelector('.button-progress') as HTMLDivElement;
    if (progressBar) {
      // Start from 0% width
      progressBar.style.width = '0%';
      progressBar.style.opacity = '1';
      
      // Animate to 100% width quickly (500ms)
      gsap.to(progressBar, {
        width: '100%',
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          // Brief pause at full width
          gsap.to(progressBar, {
            opacity: 0,
            duration: 0.1,
            delay: 0.1,
            onComplete: () => {
              // Navigate to the page
              router.push(url);
            }
          });
        }
      });
    }
  };

  // Button URLs (you can customize these)
  const buttonUrls = [
    "/websites-demo",
    "/ai-automation-demo",
    "/analytics-demo"
  ];

  useLayoutEffect(() => {
    // Skip animations on mobile for better performance
    const isMobile = window.innerWidth < 768;
    
    const ctx = gsap.context(() => {
      // Create floating particles animation (simpler on mobile)
      if (!isMobile) {
        particlesRef.current.forEach((particle, i) => {
          if (!particle) return;
          
          const duration = 3 + Math.random() * 2;
          const delay = i * 0.3;
          
          gsap.to(particle, {
            y: -20,
            x: Math.random() * 40 - 20,
            rotation: Math.random() * 360,
            duration: duration,
            delay: delay,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }

      // Staggered heading animation with fade and slide
      gsap.fromTo(
        ".heading-line",
        {
          y: isMobile ? 40 : 60,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: isMobile ? 0.8 : 1.2,
          stagger: isMobile ? 0.15 : 0.25,
          ease: "power3.out",
        }
      );

      // Paragraph animation with slight delay
      gsap.fromTo(
        textRef.current,
        {
          y: isMobile ? 20 : 30,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.6 : 1,
          delay: isMobile ? 0.4 : 0.8,
          ease: "power2.out",
        }
      );

      // Staggered button animation (simpler on mobile)
      gsap.fromTo(
        buttonsRef.current,
        {
          scale: 0,
          opacity: 0,
          y: isMobile ? 20 : 30,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: isMobile ? 0.5 : 0.7,
          stagger: isMobile ? 0.1 : 0.15,
          delay: isMobile ? 0.6 : 1.2,
          ease: isMobile ? "power2.out" : "elastic.out(1, 0.5)",
        }
      );

      // "Our past work" text animation
      gsap.fromTo(
        pastWorkRef.current,
        {
          y: 10,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: isMobile ? 0.9 : 1.5,
          ease: "power2.out",
        }
      );

      // Button hover animations (only on non-touch devices)
      if (!isMobile && !('ontouchstart' in window)) {
        const buttonCleanups: (() => void)[] = [];
        
        buttonsRef.current.forEach((button) => {
          if (!button) return;
          
          const handleMouseEnter = () => {
            // Only animate if not loading
            if (!button.classList.contains('loading')) {
              gsap.to(button, {
                scale: 1.08,
                duration: 0.3,
                ease: "power2.out",
                y: -4,
                boxShadow: "0 20px 40px rgba(100, 100, 100, 0.3)",
              });
            }
          };

          const handleMouseLeave = () => {
            // Only animate if not loading
            if (!button.classList.contains('loading')) {
              gsap.to(button, {
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
                y: 0,
                boxShadow: "0 10px 20px rgba(100, 100, 100, 0.2)",
              });
            }
          };

          button.addEventListener("mouseenter", handleMouseEnter);
          button.addEventListener("mouseleave", handleMouseLeave);
          
          buttonCleanups.push(() => {
            button.removeEventListener("mouseenter", handleMouseEnter);
            button.removeEventListener("mouseleave", handleMouseLeave);
          });
        });

        // Cleanup event listeners
        return () => {
          buttonCleanups.forEach(cleanup => cleanup());
        };
      }

      // Continuous subtle pulse on gradient text
      if (!isMobile) {
        gsap.to(".gradient-text", {
          backgroundPosition: "200% 0%",
          duration: 4,
          repeat: -1,
          ease: "linear",
        });
      }

      // Scroll-triggered parallax effect (only on desktop)
      if (headingRef.current && !isMobile) {
        gsap.to(headingRef.current, {
          y: -30,
          opacity: 0.7,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Function to add ref to particles array
  const addParticleRef = (el: HTMLDivElement | null, index: number) => {
    particlesRef.current[index] = el;
  };

  // Function to add ref to buttons array
  const addButtonRef = (el: HTMLButtonElement | null, index: number) => {
    buttonsRef.current[index] = el;
  };

  return (
    <section 
      ref={heroRef} 
      className="relative overflow-hidden min-h-[90vh] sm:min-h-screen flex items-center bg-black"
    >
      {/* Subtle grid background - responsive */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                           linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>
      
      {/* Animated particles - reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            ref={el => addParticleRef(el, i)}
            className="particle absolute rounded-full hidden sm:block"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              backgroundColor: i % 3 === 0 ? '#00BFFF' : i % 3 === 1 ? '#0066FF' : '#00FFFF',
              opacity: 0.1 + Math.random() * 0.2,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs in corners - smaller on mobile */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-blue-500/5 rounded-full blur-xl sm:blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-cyan-500/5 rounded-full blur-xl sm:blur-3xl" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-24">
        <div className="max-w-3xl mx-auto text-center px-2 sm:px-0">
          <div ref={headingRef}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
              <span className="heading-line block text-white mb-2 sm:mb-0">We Made this Website.</span>
              <span className="heading-line block gradient-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent mt-2 sm:mt-0">
                We'll make yours, and more.
              </span>
            </h1>
          </div>
          
          <p 
            ref={textRef}
            className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
          >
            We solve your painpoints with tailored solutions for automation, conversion, and accessibility.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0">
            {["Websites", "Automation & AI", "Site Analytics"].map((text, index) => (
              <button
                key={text}
                ref={el => addButtonRef(el, index)}
                onClick={() => handleButtonClick(index, buttonUrls[index])}
                disabled={loadingStates[index]}
                className={`relative px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-full text-base sm:text-lg overflow-hidden group shadow-lg hover:shadow-gray-500/30 transition-all duration-300 active:scale-95 ${
                  loadingStates[index] ? 'cursor-not-allowed loading' : ''
                }`}
                style={{
                  boxShadow: "0 10px 20px rgba(100, 100, 100, 0.2)",
                }}
              >
                {/* Progress bar overlay */}
                <div className="button-progress absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 w-0 rounded-full transition-all duration-300" />
                
                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                  {loadingStates[index] ? (
                    <>
                      Loading
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </>
                  ) : (
                    <>
                      {text}
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            ))}
          </div>

          {/* "Our past work" text below buttons */}
          <p 
            ref={pastWorkRef}
            className="mt-4 text-xs sm:text-sm text-gray-500 font-medium tracking-wide"
          >
            See our past projects. Proudly made.
          </p>

          {/* Scroll indicator - smaller on mobile */}
          <div className="mt-16 sm:mt-20 md:mt-24 flex justify-center">
            <div className="relative">
              <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-700 rounded-full flex justify-center overflow-hidden">
                <div className="w-1 h-2.5 sm:h-3 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full mt-1.5 sm:mt-2 animate-bounce" />
              </div>
              <div className="absolute inset-0 w-5 h-8 sm:w-6 sm:h-10 border-2 border-cyan-500/30 rounded-full animate-ping" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}