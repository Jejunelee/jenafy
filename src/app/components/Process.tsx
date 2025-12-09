"use client";

import { useEffect, useRef, useState } from 'react';
import { Palette, Wrench, Rocket } from 'lucide-react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const features = [
  {
    icon: Palette,
    title: 'Design',
    description: 'Turn ideas into clear, usable product designs.',
    color: 'from-[#5de0e6] to-[#256ac6]',
  },
  {
    icon: Wrench,
    title: 'Build',
    description: 'Develop custom solutions tailored to your needs.',
    color: 'from-[#5de0e6] to-[#256ac6]',
  },
  {
    icon: Rocket,
    title: 'Deploy',
    description: 'Launch and maintain your product with confidence.',
    color: 'from-[#5de0e6] to-[#256ac6]',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [rocketLaunched, setRocketLaunched] = useState(false);
  const [highlightedFeatures, setHighlightedFeatures] = useState<number[]>([0]);
  
  // Track when section is in view
  const isInView = useInView(sectionRef, { 
    once: false, 
    amount: 0.2,
    margin: "-100px" // Start triggering a bit before fully in view
  });
  
  // Track scroll progress within the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "center center"] // Adjusted for smoother transitions
  });

  // Calculate feature highlighting based on scroll progress
  const featureProgress = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 1, 2, 3]);

  // Auto-adjust features when scrolling within section
  useEffect(() => {
    const unsubscribe = featureProgress.on("change", (latest) => {
      if (!isInView) return; // Only update when section is in view
      
      const progress = Math.floor(latest);
      
      // Auto-highlight features based on scroll position
      if (progress === 0) {
        setHighlightedFeatures([0]);
      } else if (progress === 1) {
        setHighlightedFeatures([0, 1]);
      } else if (progress >= 2) {
        setHighlightedFeatures([0, 1, 2]);
      }
    });
    
    return () => unsubscribe();
  }, [featureProgress, isInView]);

  // Reset features when section comes into view
  useEffect(() => {
    if (isInView) {
      // Initial highlighting when section first comes into view
      setHighlightedFeatures([0]);
    }
  }, [isInView]);

  // Optional: Auto-scroll snapping to features when scrolling quickly
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !isInView) return;
      
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const sectionHeight = sectionRef.current.clientHeight;
      const scrollPosition = window.scrollY;
      const sectionStart = scrollPosition - sectionTop;
      const scrollPercentage = sectionStart / sectionHeight;
      
      // Determine which feature should be active based on scroll position
      if (scrollPercentage < 0.33) {
        setActiveFeature(0);
      } else if (scrollPercentage < 0.66) {
        setActiveFeature(1);
      } else {
        setActiveFeature(2);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [isInView]);

  const launchRocket = (index: number) => {
    if (index === 2 && !rocketLaunched) {
      setRocketLaunched(true);
      setTimeout(() => setRocketLaunched(false), 2000);
    }
  };

  const getCardOpacity = (index: number) => {
    return highlightedFeatures.includes(index) ? 1 : 0.3;
  };

  const getBorderColor = (index: number) => {
    if (activeFeature === index && isInView) {
      return "border-[#5de0e6] shadow-lg shadow-[#5de0e6]/20";
    }
    return highlightedFeatures.includes(index) ? "border-[#5de0e6]/50" : "border-gray-800";
  };

  const getScale = (index: number) => {
    return activeFeature === index && isInView ? 1.03 : 1;
  };

  return (
    <section 
      ref={sectionRef} 
      id="Process" 
      className="relative flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
      style={{ minHeight: 'calc(10vh - 4rem)' }} // Reduced height slightly
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#5de0e6]/10 to-[#256ac6]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#256ac6]/10 to-[#5de0e6]/10 rounded-full blur-3xl" />
      </div>

      <div ref={contentRef} className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12"> {/* Reduced py-20 to py-12 */}
        {/* Header Section */}
        <motion.div 
          className="text-center mb-10" 
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : -20 
          }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white"> {/* Reduced mb-6 to mb-4 */}
            Our Process to
            <span className="block bg-gradient-to-r from-[#5de0e6] to-[#256ac6] bg-clip-text text-transparent">
              Solve Your Painpoint
            </span>
          </h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8" 
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.3 }}
          >
            From concept to production, we guide your project through every phase.
          </motion.p>

          {/* Scroll Progress Indicator */}
          <div className="relative max-w-2xl mx-auto">
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-3"> {/* Reduced mb-4 to mb-3 */}
<motion.div 
  className="h-full bg-gradient-to-r from-[#5de0e6] to-[#256ac6] rounded-full"
  style={{ 
    width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) 
  }}
/>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <motion.span
                animate={{ 
                  color: activeFeature === 0 && isInView ? "#5de0e6" : "#9CA3AF",
                  scale: activeFeature === 0 && isInView ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                Design
              </motion.span>
              <motion.span
                animate={{ 
                  color: activeFeature === 1 && isInView ? "#5de0e6" : "#9CA3AF",
                  scale: activeFeature === 1 && isInView ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                Build
              </motion.span>
              <motion.span
                animate={{ 
                  color: activeFeature === 2 && isInView ? "#5de0e6" : "#9CA3AF",
                  scale: activeFeature === 2 && isInView ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                Deploy
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl"> {/* Reduced gap-8 to gap-6 */}
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: isInView ? getCardOpacity(index) : 0,
                  y: isInView ? 0 : 30,
                  scale: getScale(index),
                }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.05,
                }}
                onClick={() => launchRocket(index)}
                className="relative cursor-pointer transition-transform duration-300"
              >
                {/* Active Feature Indicator */}
                {activeFeature === index && isInView && (
                  <motion.div
                    className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-[#5de0e6]/20 to-[#256ac6]/20 rounded-3xl blur-xl -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Card */}
                <div className={`relative bg-gray-900/40 backdrop-blur-xl rounded-3xl p-6 border-2 ${getBorderColor(index)} transition-all duration-300`}> {/* Reduced p-8 to p-6 */}
                  {/* Icon */}
                  <motion.div
                    className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${feature.color} mb-4 relative overflow-hidden`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: index === 0 ? 15 : index === 1 ? -15 : 0,
                    }}
                    animate={rocketLaunched && index === 2 ? { 
                      y: -100, 
                      opacity: 0,
                      rotate: 45 
                    } : { 
                      y: 0, 
                      opacity: 1,
                      rotate: 0 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="h-7 w-7 text-white relative z-10" /> {/* Reduced h-8 w-8 to h-7 w-7 */}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-white"> {/* Reduced text-2xl to text-xl, mb-4 to mb-3 */}
                    {feature.title}
                    <div className="h-0.5 bg-gradient-to-r from-[#5de0e6] to-transparent mt-2 w-full" />
                  </h3>
                  
                  <p className={`text-gray-300 mb-4 transition-colors duration-300 ${ /* Reduced mb-6 to mb-4 */
                    highlightedFeatures.includes(index) ? 'text-gray-100' : 'text-gray-500'
                  }`}>
                    {feature.description}
                  </p>

                  {/* Step Number */}
                  <div className="absolute top-4 right-4 text-3xl font-bold text-gray-700"> {/* Reduced text-4xl to text-3xl */}
                    0{index + 1}
                  </div>

                  {/* Active indicator dot */}
                  {activeFeature === index && isInView && (
                    <motion.div
                      className="absolute -top-2 left-1/2 w-4 h-4 bg-gradient-to-r from-[#5de0e6] to-[#256ac6] rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      

      {/* Rocket Trail Effect */}
      <AnimatePresence>
        {rocketLaunched && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#5de0e6] rounded-full"
                initial={{
                  x: window.innerWidth / 2,
                  y: window.innerHeight * 0.7,
                  opacity: 1,
                  scale: 1
                }}
                animate={{
                  x: window.innerWidth / 2 + (Math.random() * 100 - 50),
                  y: -100,
                  opacity: 0,
                  scale: 0
                }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.05,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}