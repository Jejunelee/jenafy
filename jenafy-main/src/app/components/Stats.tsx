"use client";

import { useState, useEffect } from 'react';

export default function Stats() {
  const [uptime, setUptime] = useState(97.8);
  const [isAnimating, setIsAnimating] = useState(false);

  // Generate random uptime between 97.5% and 99.9%
  const getRandomUptime = (currentValue: number) => {
    const min = 97.5;
    const max = 99.9;
    
    // Generate a small random change (±0.1 to ±0.3) for faster changes
    const changeAmount = (Math.random() * 0.2) + 0.1; // 0.1 to 0.3
    const direction = Math.random() > 0.5 ? 'up' : 'down'; // 50% chance to go up
    
    let newValue;
    if (direction === 'up') {
      newValue = currentValue + changeAmount;
    } else {
      newValue = currentValue - changeAmount;
    }
    
    // Ensure we stay within bounds
    newValue = Math.max(min, Math.min(max, newValue));
    
    // Round to 2 decimal places
    return parseFloat(newValue.toFixed(2));
  };

  // Animate the uptime change
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        
        const currentValue = uptime;
        const targetValue = getRandomUptime(currentValue);
        
        // Faster animation duration between 0.5 and 1.5 seconds
        const duration = 500 + Math.random() * 1000;
        const startTime = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Smooth easing function
          const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
          const currentAnimatedValue = currentValue + (targetValue - currentValue) * easeOut(progress);
          
          setUptime(parseFloat(currentAnimatedValue.toFixed(2)));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setIsAnimating(false);
          }
        };
        
        animate();
      }
    }, 1000 + Math.random() * 1000); // Faster interval between 3-7 seconds

    return () => clearInterval(interval);
  }, [isAnimating, uptime]);

  // Format uptime to 2 decimal places
  const formattedUptime = uptime.toFixed(2);

  return (
    <div className="mt-16">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#5de0e6] mb-2">
            <span className={`transition-all duration-300 ${isAnimating ? 'scale-105' : 'scale-100'}`}>
              {formattedUptime}%
            </span>
          </div>
          <div className="text-sm text-gray-400">Uptime (2025)</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#5de0e6] mb-2">50</div>
          <div className="text-sm text-gray-400">Clients (2025)</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#5de0e6] mb-2">250+</div>
          <div className="text-sm text-gray-400">Integrations</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#5de0e6] mb-2">24/7</div>
          <div className="text-sm text-gray-400">Client Support</div>
        </div>
      </div>
      
      {/* Optional subtle indicator text */}
      <div className="mt-8 text-sm text-gray-500 flex items-center justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gray-500"></div>
        <span>Live uptime • Updates every few sec.</span>
      </div>
    </div>
  );
}