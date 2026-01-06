"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Lead() {
  const leadRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const seePricingRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating particles animation
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

      // "See Pricing" button animation
      if (seePricingRef.current) {
        gsap.fromTo(
          seePricingRef.current,
          {
            opacity: 0,
            y: -20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.5,
            ease: "power3.out",
          }
        );
      }

      // Main heading animation with fade and slide
      gsap.fromTo(
        ".heading-line",
        {
          y: 60,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.25,
          ease: "power3.out",
        }
      );

      // Paragraph animation with slight delay
      gsap.fromTo(
        textRef.current,
        {
          y: 30,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.8,
          ease: "power2.out",
        }
      );

      // Main CTA button animation with bounce effect
      gsap.fromTo(
        buttonsRef.current[0],
        {
          scale: 0,
          opacity: 0,
          y: 30,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 1.2,
          ease: "elastic.out(1, 0.5)",
        }
      );

      // Button hover animations
      const buttonCleanups: (() => void)[] = [];
      
      buttonsRef.current.forEach((button) => {
        if (!button) return;
        
        const handleMouseEnter = () => {
          gsap.to(button, {
            scale: 1.08,
            duration: 0.3,
            ease: "power2.out",
            y: -4,
            boxShadow: "0 20px 40px rgba(0, 123, 255, 0.3)",
          });
          
          // Pulse effect on hover
          const shineElement = button.querySelector('.button-shine') as HTMLDivElement;
          if (shineElement) {
            gsap.to(shineElement, {
              x: "100%",
              duration: 0.6,
              ease: "power2.inOut",
            });
          }
        };

        const handleMouseLeave = () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            y: 0,
            boxShadow: "0 10px 20px rgba(0, 123, 255, 0.2)",
          });
          
          const shineElement = button.querySelector('.button-shine') as HTMLDivElement;
          if (shineElement) {
            gsap.to(shineElement, {
              x: "-100%",
              duration: 0,
            });
          }
        };

        button.addEventListener("mouseenter", handleMouseEnter);
        button.addEventListener("mouseleave", handleMouseLeave);
        
        // Store cleanup function
        buttonCleanups.push(() => {
          button.removeEventListener("mouseenter", handleMouseEnter);
          button.removeEventListener("mouseleave", handleMouseLeave);
        });
      });

      // Continuous subtle pulse on gradient text
      gsap.to(".gradient-text", {
        backgroundPosition: "200% 0%",
        duration: 4,
        repeat: -1,
        ease: "linear",
      });

      // Scroll-triggered parallax effect
      if (headingRef.current) {
        gsap.to(headingRef.current, {
          y: -30,
          opacity: 0.7,
          scrollTrigger: {
            trigger: leadRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Cleanup event listeners
      return () => {
        buttonCleanups.forEach(cleanup => cleanup());
      };
    }, leadRef);

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

  // Function to open Calendly in a new tab
  const handleBookMeeting = () => {
    window.open("https://calendly.com/jenafydevelopment/30min", "_blank", "noopener,noreferrer");
  };

  return (
    <section 
      ref={leadRef} 
      className="relative overflow-hidden min-h-screen flex items-center bg-black"
    >
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                           linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            ref={el => addParticleRef(el, i)}
            className="particle absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              backgroundColor: i % 3 === 0 ? '#0066FF' : i % 3 === 1 ? '#0088FF' : '#00AAFF',
              opacity: 0.1 + Math.random() * 0.2,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs in corners - blue theme */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <div ref={headingRef}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="heading-line block text-white">Ready to make it happen?</span>
            </h1>
          </div>
          
          <p 
            ref={textRef}
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Let's transform your vision into reality with our end-to-end development solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              ref={el => addButtonRef(el, 0)}
              onClick={handleBookMeeting}
              className="relative px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-full text-lg sm:text-xl overflow-hidden group shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300 cursor-pointer"
              style={{
                boxShadow: "0 10px 30px rgba(0, 123, 255, 0.25)",
              }}
            >
              {/* Shine effect layer */}
              <div className="button-shine absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full" />
              {/* Button content */}
              <span className="relative z-10 flex items-center justify-center gap-3">
                Book a Meeting
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            <Link
              ref={seePricingRef}
              href="/pricing"
              className="text-blue-400 hover:text-blue-300 font-medium text-lg sm:text-xl hover:underline underline-offset-4 transition-all duration-300 hover:scale-105"
            >
              or See Pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}