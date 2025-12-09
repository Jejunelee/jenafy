"use client";

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Team() {
  const teamMembers = [
    {
      name: 'Jay Lee',
      role: 'Co-Founder & Head Developer',
      description: 'Former tech lead with 10+ years experience in product development and scaling startups. Passionate about building transformative technology that solves real-world problems.',
      src: '/team/jay.png',
      width: 400,
      height: 400,
      theme: 'green'
    },
    {
      name: 'Bianca Arevalo',
      role: 'Co-Founder & Head Designer',
      description: 'Expert in AI/ML systems with a PhD in Computer Science from Stanford. Focused on creating intuitive solutions through cutting-edge research and development.',
      src: '/team/bianca.png',
      width: 400,
      height: 400,
      theme: 'pink'
    }
  ];

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case 'green':
        return {
          glow: 'from-emerald-500 to-green-500',
          border: 'border-emerald-500/50',
          shadow: 'shadow-[0_0_40px_-5px_rgba(16,185,129,0.5)]',
          badge: 'from-emerald-900/40 to-green-900/40 text-emerald-300 border-emerald-800/30',
          accent: 'border-emerald-500/30',
          gradient: 'from-emerald-500 to-green-500'
        };
      case 'pink':
        return {
          glow: 'from-pink-500 to-purple-500',
          border: 'border-pink-500/50',
          shadow: 'shadow-[0_0_40px_-5px_rgba(236,72,153,0.5)]',
          badge: 'from-pink-900/40 to-purple-900/40 text-pink-300 border-pink-800/30',
          accent: 'border-pink-500/30',
          gradient: 'from-pink-500 to-purple-500'
        };
      default:
        return {
          glow: 'from-blue-500 to-cyan-500',
          border: 'border-blue-500/50',
          shadow: 'shadow-[0_0_40px_-5px_rgba(59,130,246,0.5)]',
          badge: 'from-blue-900/40 to-cyan-900/40 text-blue-300 border-blue-800/30',
          accent: 'border-blue-500/30',
          gradient: 'from-blue-500 to-cyan-500'
        };
    }
  };

  return (
    <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient Background - Updated to purple/pink theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black">
        {/* Subtle gradient overlay in the middle */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent"></div>
        
        {/* Radial gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px)] bg-[size:4rem]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem]"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-pink-400">Team</span>
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto text-lg">
            That have onboarded client vision into real solutions.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => {
            const themeClasses = getThemeClasses(member.theme);
            
            return (
              <div key={member.name} className="group relative">
                {/* Enhanced glow effect based on theme */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-30 bg-gradient-to-r ${themeClasses.glow} blur-2xl rounded-3xl transition-all duration-500 group-hover:scale-105 -z-10`}></div>
                
                {/* Card container with specialized animation */}
                <div className={`relative bg-gradient-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-lg border border-gray-800/50 rounded-3xl p-8 
                              group-hover:${themeClasses.border} ${themeClasses.shadow} transition-all duration-300 
                              before:absolute before:inset-0 before:rounded-3xl before:p-[1px] before:bg-gradient-to-br before:from-gray-800/30 before:to-transparent before:-z-10
                              h-full flex flex-col overflow-hidden`}>
                  
                  {/* Animated Background Canvas */}
                  {member.theme === 'green' ? (
                    <DeveloperAnimation theme="green" />
                  ) : (
                    <DesignerAnimation theme="pink" />
                  )}
                  
                  {/* Profile Image with accent based on theme */}
                  <div className="relative mb-8 z-10">
                    <div className="relative w-48 h-48 mx-auto overflow-hidden rounded-2xl">
                      <div className={`absolute inset-0 bg-gradient-to-br ${themeClasses.gradient}/20 blur-xl -z-10`}></div>
                      <Image
                        src={member.src}
                        alt={member.name}
                        width={member.width}
                        height={member.height}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        draggable="false"
                      />
                      {/* Accent overlay on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${member.theme === 'green' ? 'from-emerald-900/20' : 'from-pink-900/20'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="text-center flex-grow z-10">
                    <h3 className="text-2xl font-semibold text-white mb-2">{member.name}</h3>
                    <div className="inline-block mb-4">
                      <span className={`px-4 py-1 bg-gradient-to-r ${themeClasses.badge} rounded-full text-sm font-medium`}>
                        {member.role}
                      </span>
                    </div>
                    <p className="text-gray-300 text-base leading-relaxed">
                      {member.description}
                    </p>
                  </div>

                  {/* Decorative elements based on theme */}
                  <div className={`absolute top-6 right-6 w-6 h-6 border-t border-r ${themeClasses.accent} rounded-tr-xl z-10`}></div>
                  <div className={`absolute bottom-6 left-6 w-6 h-6 border-b border-l ${themeClasses.accent} rounded-bl-xl z-10`}></div>
                </div>
              </div>
            );
          })}
        </div>


        {/* Decorative elements */}
        <div className="absolute -top-16 -left-16 w-80 h-80 bg-purple-900/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-pink-900/10 rounded-full blur-3xl"></div>

      </div>
    </div>
  );
}

// Developer Card Animation (coding theme) - GREEN VERSION
function DeveloperAnimation({ theme = 'green' }: { theme?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      char: string;
      color: string;
      trail: Array<{x: number, y: number}>;
    }> = [];
    
    const characters = ['{', '}', '<', '>', '(', ')', ';', '=', '+', '-', '*', '/', 'const', 'let', '=>', '()', '{}'];
    const colors = theme === 'green' 
      ? ['#10b981', '#34d399', '#059669', '#047857', '#065f46']
      : ['#60a5fa', '#38bdf8', '#22d3ee', '#0ea5e9', '#2dd4bf'];
    
    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    const createParticle = () => {
      const isKeyword = Math.random() > 0.7;
      const char = isKeyword ? characters[Math.floor(Math.random() * 4) + 13] : characters[Math.floor(Math.random() * 13)];
      const x = Math.random() * canvas.width;
      const trailLength = Math.floor(Math.random() * 5) + 3;
      const trail = Array(trailLength).fill(0).map(() => ({ x, y: canvas.height }));
      
      particles.push({
        x,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 1 + 0.5),
        life: 1,
        maxLife: Math.random() * 100 + 50,
        char,
        color: colors[Math.floor(Math.random() * colors.length)],
        trail
      });
    };
    
    const drawMatrixBackground = () => {
      // Draw subtle matrix-like background
      ctx.globalAlpha = 0.02;
      ctx.fillStyle = theme === 'green' ? '#10b981' : '#60a5fa';
      for (let i = 0; i < canvas.width; i += 20) {
        for (let j = 0; j < canvas.height; j += 20) {
          if (Math.random() > 0.9) {
            ctx.font = '8px monospace';
            ctx.fillText('1', i, j);
          }
        }
      }
    };
    
    const drawCircuits = () => {
      ctx.globalAlpha = 0.03;
      ctx.strokeStyle = theme === 'green' ? '#34d399' : '#38bdf8';
      ctx.lineWidth = 1;
      
      // Draw circuit-like lines
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        let x = 0;
        let y = Math.random() * canvas.height;
        
        while (x < canvas.width) {
          ctx.lineTo(x, y);
          x += 20 + Math.random() * 30;
          y += (Math.random() - 0.5) * 40;
        }
        ctx.stroke();
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create new particles
      if (Math.random() > 0.85) {
        createParticle();
      }
      
      // Draw background elements
      drawMatrixBackground();
      drawCircuits();
      
      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Update trail
        p.trail.pop();
        p.trail.unshift({ x: p.x, y: p.y });
        
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.005;
        
        // Draw trail
        for (let j = 0; j < p.trail.length; j++) {
          const alpha = (p.life * (1 - j / p.trail.length)) * 0.3;
          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.color;
          ctx.font = '10px monospace';
          ctx.fillText(p.char, p.trail[j].x, p.trail[j].y);
        }
        
        // Draw main particle
        ctx.globalAlpha = p.life * 0.8;
        ctx.fillStyle = p.color;
        ctx.font = '12px monospace';
        ctx.fillText(p.char, p.x, p.y);
        
        // Draw glow
        ctx.globalAlpha = p.life * 0.2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fillText(p.char, p.x, p.y);
        ctx.shadowBlur = 0;
        
        // Remove dead particles
        if (p.life <= 0 || p.y < -10) {
          particles.splice(i, 1);
        }
      }
      
      // Draw code structure
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = theme === 'green' ? '#059669' : '#22d3ee';
      ctx.lineWidth = 1;
      
      // Brackets
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.2, canvas.height * 0.3);
      ctx.lineTo(canvas.width * 0.2, canvas.height * 0.7);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.8, canvas.height * 0.3);
      ctx.lineTo(canvas.width * 0.8, canvas.height * 0.7);
      ctx.stroke();
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full opacity-60"
    />
  );
}

// Designer Card Animation (design theme) - PINK VERSION
function DesignerAnimation({ theme = 'pink' }: { theme?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const shapes: Array<{
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      type: 'circle' | 'square' | 'triangle' | 'wave' | 'star';
      color: string;
      opacity: number;
      velocity: { x: number; y: number };
      connections: Array<number>;
    }> = [];
    
    const colors = theme === 'pink'
      ? ['#f472b6', '#c084fc', '#818cf8', '#a78bfa', '#d946ef']
      : ['#f472b6', '#c084fc', '#818cf8', '#60a5fa', '#a78bfa'];
    
    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Create initial shapes
    for (let i = 0; i < 12; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 25 + 15,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        type: ['circle', 'square', 'triangle', 'wave', 'star'][Math.floor(Math.random() * 5)] as any,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.2 + 0.05,
        velocity: {
          x: (Math.random() - 0.5) * 0.3,
          y: (Math.random() - 0.5) * 0.3
        },
        connections: []
      });
    }
    
    // Find connections between close shapes
    const updateConnections = () => {
      for (let i = 0; i < shapes.length; i++) {
        shapes[i].connections = [];
        for (let j = 0; j < shapes.length; j++) {
          if (i !== j) {
            const dx = shapes[i].x - shapes[j].x;
            const dy = shapes[i].y - shapes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
              shapes[i].connections.push(j);
            }
          }
        }
      }
    };
    
    const drawShape = (shape: typeof shapes[0]) => {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      ctx.globalAlpha = shape.opacity;
      ctx.fillStyle = shape.color;
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = 1.5;
      
      switch (shape.type) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
        
        case 'square':
          ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
          ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
          break;
        
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(shape.size / 2, shape.size / 2);
          ctx.lineTo(-shape.size / 2, shape.size / 2);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
        
        case 'wave':
          ctx.beginPath();
          for (let i = -shape.size / 2; i <= shape.size / 2; i += 1) {
            const waveHeight = Math.sin(i * 0.1 + shape.rotation * 3) * 10;
            ctx.lineTo(i, waveHeight);
          }
          ctx.stroke();
          break;
        
        case 'star':
          ctx.beginPath();
          const spikes = 5;
          const outerRadius = shape.size / 2;
          const innerRadius = shape.size / 4;
          
          for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (Math.PI * i) / spikes;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
      }
      
      ctx.restore();
    };
    
    const drawGrid = () => {
      ctx.globalAlpha = 0.03;
      ctx.strokeStyle = theme === 'pink' ? '#c084fc' : '#c084fc';
      ctx.lineWidth = 0.5;
      
      // Draw isometric grid
      const gridSize = 30;
      const angle = Math.PI / 6;
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Diagonal lines
      for (let x = -canvas.height; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + canvas.height * Math.tan(angle), canvas.height);
        ctx.stroke();
      }
    };
    
    const drawConnections = () => {
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = theme === 'pink' ? '#f472b6' : '#f472b6';
      ctx.lineWidth = 1;
      
      for (const shape of shapes) {
        for (const targetIdx of shape.connections) {
          const target = shapes[targetIdx];
          ctx.beginPath();
          ctx.moveTo(shape.x, shape.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        }
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update connections
      updateConnections();
      
      // Draw background elements
      drawGrid();
      drawConnections();
      
      // Update and draw shapes
      shapes.forEach(shape => {
        shape.rotation += shape.rotationSpeed;
        
        // Move shape
        shape.x += shape.velocity.x;
        shape.y += shape.velocity.y;
        
        // Bounce off edges
        if (shape.x < shape.size/2 || shape.x > canvas.width - shape.size/2) {
          shape.velocity.x *= -1;
        }
        if (shape.y < shape.size/2 || shape.y > canvas.height - shape.size/2) {
          shape.velocity.y *= -1;
        }
        
        drawShape(shape);
      });
      
      // Draw color palette in corners
      ctx.globalAlpha = 0.2;
      const palette = theme === 'pink' 
        ? ['#f472b6', '#c084fc', '#818cf8', '#a78bfa', '#d946ef']
        : ['#f472b6', '#c084fc', '#818cf8', '#60a5fa', '#38bdf8'];
      
      // Top-left palette
      palette.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.fillRect(10 + i * 15, 10, 10, 10);
      });
      
      // Bottom-right palette
      palette.forEach((color, i) => {
        ctx.fillStyle = color;
        const x = canvas.width - 60 + i * 15;
        const y = canvas.height - 20;
        ctx.fillRect(x, y, 10, 10);
      });
      
      // Draw golden ratio spiral
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = theme === 'pink' ? '#fbbf24' : '#fbbf24';
      ctx.lineWidth = 1;
      ctx.beginPath();
      let spiralX = canvas.width / 2;
      let spiralY = canvas.height / 2;
      let angle = 0;
      let radius = 2;
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      
      for (let i = 0; i < 100; i++) {
        if (i > 0) ctx.lineTo(spiralX, spiralY);
        else ctx.moveTo(spiralX, spiralY);
        
        angle += goldenAngle;
        radius *= 1.01;
        spiralX = canvas.width / 2 + Math.cos(angle) * radius;
        spiralY = canvas.height / 2 + Math.sin(angle) * radius;
      }
      ctx.stroke();
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full opacity-50"
    />
  );
}