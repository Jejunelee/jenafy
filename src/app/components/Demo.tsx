"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  Globe, 
  Zap, 
  Brain, 
  Sparkles, 
  Play, 
  Terminal,
  Cuboid,
  Network,
  Cloud,
  X,
  ChevronRight,
  Loader2,
  CheckCircle,
  BarChart3
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  shape: 'circle' | 'triangle' | 'square';
}

interface Task {
  id: number;
  name: string;
  status: 'pending' | 'running' | 'completed';
  time: string;
}

interface Message {
  role: 'user' | 'ai';
  content: string;
}

interface Demo {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  component: React.ComponentType<any>;
}

interface MousePosition {
  x: number;
  y: number;
}

export default function DemoPage() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [automationStatus, setAutomationStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [magnetActive, setMagnetActive] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  
  // Floating particles
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const initialParticles: Particle[] = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 1.5 + 0.3,
      color: ['#3B82F6', '#8B5CF6', '#10B981'][Math.floor(Math.random() * 3)],
      shape: ['circle', 'triangle', 'square'][Math.floor(Math.random() * 3)] as 'circle' | 'triangle' | 'square'
    }));
    setParticles(initialParticles);
  }, []);

  // Interactive 3D card effect
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const rotateX = useSpring(useTransform(cardY, [-200, 200], [10, -10]), {
    stiffness: 200,
    damping: 25,
    mass: 0.8
  });
  const rotateY = useSpring(useTransform(cardX, [-200, 200], [-10, 10]), {
    stiffness: 200,
    damping: 25,
    mass: 0.8
  });

  // Mouse movement
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Update mouse position for parallax
    const newMousePos = {
      x: ((x - centerX) / centerX) * 15,
      y: ((y - centerY) / centerY) * 15
    };
    setMousePosition(newMousePos);
    
    // For 3D card effect
    cardX.set((x - centerX) / 20);
    cardY.set((y - centerY) / 20);
  }, []);

  // Magnetic field toggle
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') {
        setMagnetActive(!magnetActive);
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [magnetActive]);

  // Website demo component
  const WebsiteDemo = useMemo(() => {
    const DemoComponent = ({ mousePos }: { mousePos: MousePosition }) => {
      const floatingRefs = useRef<(HTMLDivElement | null)[]>([]);
      const rippleRef = useRef<HTMLDivElement>(null);
      
      useEffect(() => {
        let animationFrameId: number;
        
        const animate = (time: number) => {
          floatingRefs.current.forEach((ref, i) => {
            if (ref) {
              const t = time * 0.001;
              const y = Math.sin(t * 0.8 + i) * 25;
              const x = Math.cos(t * 0.6 + i) * 20;
              const rotation = Math.sin(t * 0.4 + i) * 10;
              ref.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
              ref.style.filter = `hue-rotate(${Math.sin(t + i) * 90}deg) brightness(${1.2 + Math.sin(t * 2 + i) * 0.2})`;
            }
          });
          animationFrameId = requestAnimationFrame(animate);
        };
        
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
      }, []);

      const createRipple = (x: number, y: number) => {
        if (!rippleRef.current) return;
        
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = '0px';
        ripple.style.height = '0px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '100';
        ripple.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        rippleRef.current.appendChild(ripple);
        
        requestAnimationFrame(() => {
          ripple.style.width = '300px';
          ripple.style.height = '300px';
          ripple.style.opacity = '0';
        });
        
        setTimeout(() => {
          ripple.remove();
        }, 800);
      };

      const Icons = [Cuboid, Sparkles, Terminal, Network];

      return (
        <div className="space-y-6 relative">
          {/* Ripple container */}
          <div ref={rippleRef} className="absolute inset-0 pointer-events-none z-0" />
          
          <div className="grid grid-cols-2 gap-4 relative z-10">
            {Icons.map((Icon, i) => (
              <motion.div
                key={i}
                ref={el => {
                  if (el) floatingRefs.current[i] = el;
                }}
                className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 p-6 rounded-2xl border-2 border-blue-500/40 backdrop-blur-xl relative overflow-hidden group"
                initial={{ y: 20, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, type: "spring" }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: i % 2 === 0 ? 5 : -5,
                  borderColor: "rgba(139, 92, 246, 0.8)"
                }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  createRipple(e.clientX - rect.left, e.clientY - rect.top);
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                
                <Icon className="w-10 h-10 text-blue-300 mx-auto mb-3 group-hover:text-white transition-colors group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                <div className="h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full w-3/4 mx-auto group-hover:w-full transition-all duration-300" />
                <div className="h-2 bg-gradient-to-r from-blue-400/50 to-purple-400/50 rounded-full w-1/2 mx-auto mt-2 group-hover:w-3/4 transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          {/* Parallax Scrolling */}
          <div className="relative h-64 rounded-2xl overflow-hidden border-2 border-gray-800">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-x" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.4),transparent_70%)]" />
            </div>
            
            <motion.div
              className="absolute top-8 left-8"
              animate={{
                x: mousePos.x * 0.8,
                y: mousePos.y * 0.8,
                rotateZ: mousePos.x * 0.1
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse-slow">
                Parallax.
              </div>
            </motion.div>
            
            <motion.div
              className="absolute bottom-8 right-8"
              animate={{
                x: -mousePos.x * 0.6,
                y: -mousePos.y * 0.6,
                rotateZ: -mousePos.y * 0.1
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              <div className="text-3xl text-white/80 font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Depth Illusion
              </div>
            </motion.div>

            {/* Floating orbs */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                style={{
                  left: `${20 + i * 25}%`,
                  top: `${30 + Math.sin(Date.now() * 0.001 + i) * 20}%`
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, Math.sin(i) * 30, 0],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Interactive Elements */}
          <div className="grid grid-cols-3 gap-3">
            {['Button One', 'Button Two', 'Button Three'].map((text, i) => (
              <motion.button
                key={i}
                className="border-2 border-gray-700 rounded-xl p-4 text-sm font-bold uppercase tracking-wider relative overflow-hidden group backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.15,
                  rotate: i === 1 ? [0, -3, 3, -3, 0] : 0,
                  y: -5,
                  borderColor: i === 0 ? "#3B82F6" : i === 1 ? "#8B5CF6" : "#10B981"
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                animate={i === 2 ? {
                  x: [0, 10, -10, 10, 0],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                } : {}}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${
                  i === 0 ? 'from-blue-600/20' : 
                  i === 1 ? 'from-purple-600/20' : 
                  'from-green-600/20'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <span className="relative z-10">
                  {text}
                  {i === 0 && (
                    <motion.span
                      className="absolute -top-2 -right-2 text-xs"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      ✨
                    </motion.span>
                  )}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      );
    };
    
    return DemoComponent;
  }, []);

  // Automation Demo
  const AutomationDemo = useMemo(() => {
    const DemoComponent = () => {
      const [tasks, setTasks] = useState<Task[]>([
        { id: 1, name: 'Backup Database', status: 'pending', time: '02:00 AM' },
        { id: 2, name: 'Send Reports', status: 'pending', time: '09:00 AM' },
        { id: 3, name: 'Clean Temp Files', status: 'pending', time: '12:00 PM' },
        { id: 4, name: 'Update Analytics', status: 'pending', time: '06:00 PM' },
      ]);

      const runAutomation = useCallback(() => {
        if (automationStatus === 'running') return;
        
        setIsLoading(true);
        setAutomationStatus('running');
        
        let completed = 0;
        const interval = setInterval(() => {
          setTasks(prev => prev.map(task => 
            task.id === completed + 1 
              ? { ...task, status: 'running' }
              : task
          ));
          
          setTimeout(() => {
            setTasks(prev => prev.map(task => 
              task.id === completed + 1 
                ? { ...task, status: 'completed' }
                : task
            ));
            
            if (document.getElementById(`task-${completed + 1}`)) {
              const el = document.getElementById(`task-${completed + 1}`);
              if (el) {
                el.style.transform = 'scale(1.1)';
                el.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.5)';
                setTimeout(() => {
                  el.style.transform = 'scale(1)';
                  el.style.boxShadow = '';
                }, 300);
              }
            }
            
            completed++;
            
            if (completed === tasks.length) {
              clearInterval(interval);
              setIsLoading(false);
              setAutomationStatus('completed');
              
              const celebration = () => {
                for (let i = 0; i < 20; i++) {
                  setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.style.position = 'fixed';
                    confetti.style.left = `${Math.random() * 100}vw`;
                    confetti.style.top = '-20px';
                    confetti.style.width = '10px';
                    confetti.style.height = '10px';
                    confetti.style.background = `linear-gradient(45deg, ${['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'][Math.floor(Math.random() * 4)]}, ${['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'][Math.floor(Math.random() * 4)]})`;
                    confetti.style.borderRadius = '50%';
                    confetti.style.zIndex = '9999';
                    confetti.style.pointerEvents = 'none';
                    document.body.appendChild(confetti);
                    
                    confetti.animate([
                      { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                      { transform: `translateY(${window.innerHeight + 20}px) rotate(${360 * (Math.random() > 0.5 ? 1 : -1)}deg)`, opacity: 0 }
                    ], {
                      duration: 1500 + Math.random() * 1000,
                      easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
                    }).onfinish = () => confetti.remove();
                  }, i * 100);
                }
              };
              celebration();
              
              setTimeout(() => {
                setTasks(prev => prev.map(task => ({ ...task, status: 'pending' })));
                setAutomationStatus('idle');
              }, 5000);
            }
          }, 600);
        }, 1000);
      }, [automationStatus, tasks.length]);

      return (
        <div className="space-y-6">
          <div className="rounded-3xl p-8 border-2 border-gray-800 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-x" />
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Automation Dashboard</h3>
                <p className="text-gray-400">Run workflows that'll blow your mind</p>
              </div>
              <motion.div
                className={`px-4 py-2 rounded-full text-sm font-semibold border-2 backdrop-blur-sm ${
                  automationStatus === 'idle' ? 'text-gray-300 border-gray-700' :
                  automationStatus === 'running' ? 'text-blue-300 border-blue-500/50 animate-pulse' :
                  'text-green-300 border-green-500/50'
                }`}
                animate={automationStatus === 'completed' ? {
                  scale: [1, 1.1, 1],
                  transition: { repeat: 3, duration: 0.5 }
                } : {}}
              >
                {automationStatus.toUpperCase()}
              </motion.div>
            </div>

            <div className="space-y-3 mb-8 relative z-10">
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  id={`task-${task.id}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-700/50 backdrop-blur-sm group hover:border-gray-600 transition-all"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15, type: "spring" }}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`relative w-3 h-3 rounded-full ${
                        task.status === 'completed' ? 'bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg shadow-green-500/30' :
                        task.status === 'running' ? 'bg-gradient-to-r from-yellow-400 to-orange-400 animate-pulse' :
                        'bg-gradient-to-r from-gray-500 to-gray-600'
                      }`}
                      animate={
                        task.status === 'running' ? {
                          scale: [1, 1.5, 1],
                          transition: { repeat: Infinity, duration: 0.8 }
                        } : {}
                      }
                    />
                    <div>
                      <div className="font-medium text-white">{task.name}</div>
                      <div className="text-xs text-gray-500">ID: {task.id.toString().padStart(3, '0')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <motion.div
                      className="px-3 py-1 rounded-lg text-gray-300 font-mono backdrop-blur-sm"
                      whileHover={{ scale: 1.1 }}
                    >
                      {task.time}
                    </motion.div>
                    <div className="w-8">
                      {task.status === 'running' && (
                        <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                      )}
                      {task.status === 'completed' && (
                        <CheckCircle className="w-6 h-6 text-green-400 animate-bounce" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 relative z-10">
              <motion.button
                onClick={runAutomation}
                disabled={isLoading || automationStatus === 'running'}
                className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                animate={
                  automationStatus === 'idle' ? {
                    boxShadow: [
                      '0 10px 25px -5px rgba(59, 130, 246, 0.5)',
                      '0 10px 40px -5px rgba(139, 92, 246, 0.7)',
                      '0 10px 25px -5px rgba(59, 130, 246, 0.5)'
                    ],
                    transition: { repeat: Infinity, duration: 2 }
                  } : {}
                }
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin inline mr-3" />
                    EXECUTING MAGIC...
                  </>
                ) : 'LAUNCH AUTOMATION'}
              </motion.button>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-2 gap-6">
            <motion.div
              className="p-6 rounded-2xl border border-gray-800 relative overflow-hidden group cursor-pointer backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Terminal className="w-10 h-10 text-green-400 mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
              <h4 className="font-bold text-white mb-2">API Integration</h4>
              <p className="text-sm text-gray-400">Connect with 1000+ services</p>
            </motion.div>
            
            <motion.div
              className="p-6 rounded-2xl border border-gray-800 relative overflow-hidden group cursor-pointer backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Cloud className="w-10 h-10 text-blue-400 mb-4 group-hover:scale-110 group-hover:-rotate-12 transition-transform" />
              <h4 className="font-bold text-white mb-2">Cloud Sync</h4>
              <p className="text-sm text-gray-400">Real-time quantum data sync</p>
            </motion.div>
          </div>
        </div>
      );
    };
    
    return DemoComponent;
  }, [automationStatus, isLoading]);

  // AI Assistant Demo
  const AIDemo = useMemo(() => {
    const DemoComponent = () => {
      const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', content: 'Hello! I can help you analyze data, generate content, or answer questions. What would you like to do?' }
      ]);
      const [input, setInput] = useState('');
      const [isTyping, setIsTyping] = useState(false);

      const handleSend = useCallback(() => {
        if (!input.trim() || isTyping) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
          const responses = [
            "I've analyzed your request and here are the insights... Based on the data patterns, I recommend focusing on user engagement metrics first.",
            "Based on the data, I recommend implementing A/B testing for your new feature. This will help optimize user conversion rates.",
            "Here's a sample code snippet I generated for your request:\n```javascript\nfunction optimizePerformance() {\n  // Implement lazy loading\n  // Cache frequently accessed data\n  // Use web workers for heavy computations\n}\n```",
            "I found some interesting patterns in your query. The data suggests that peak user activity occurs between 2-4 PM daily.",
            "Let me break down the solution for you:\n1. First, gather user feedback\n2. Analyze the data patterns\n3. Implement iterative improvements\n4. Monitor key metrics"
          ];
          const aiResponse: Message = {
            role: 'ai',
            content: responses[Math.floor(Math.random() * responses.length)]
          };
          setMessages(prev => [...prev, aiResponse]);
          setIsTyping(false);
        }, 1500);
      }, [input, isTyping]);

      return (
        <div className="space-y-6">
          <div className="rounded-2xl p-4 border-2 border-gray-800 h-64 overflow-y-auto relative backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5" />
            <div className="relative z-10">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className={`inline-block max-w-[80%] p-4 rounded-2xl backdrop-blur-sm ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-100 rounded-tr-none border border-blue-500/30' 
                      : 'text-gray-100 rounded-tl-none border border-gray-700/50'
                  }`}>
                    {msg.content.split('\n').map((line, idx) => (
                      <p key={idx} className={idx > 0 ? 'mt-2' : ''}>
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-1 ml-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 border-2 border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 backdrop-blur-sm"
              disabled={isTyping}
            />
            <motion.button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              Send
            </motion.button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {['Analyze Data', 'Generate Code', 'Create Content', 'Solve Problem'].map((action, i) => (
              <motion.button
                key={i}
                onClick={() => setInput(action)}
                className="border-2 border-gray-700 rounded-lg p-3 text-sm text-gray-300 hover:text-white transition-colors backdrop-blur-sm group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">{action}</span>
              </motion.button>
            ))}
          </div>
        </div>
      );
    };
    
    return DemoComponent;
  }, []);

  // Data Visualization Demo
  const DataVizDemo = useMemo(() => {
    const DemoComponent = () => {
      const [activeDataset, setActiveDataset] = useState<'sales' | 'users' | 'revenue'>('sales');

      const datasets = useMemo(() => ({
        sales: [65, 59, 80, 81, 56, 55, 40],
        users: [28, 48, 40, 19, 86, 27, 90],
        revenue: [120, 240, 180, 320, 280, 360, 400]
      }), []);

      const maxValue = Math.max(...datasets[activeDataset]);
      const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#3B82F6'];

      return (
        <div className="space-y-6">
          <div className="rounded-3xl p-6 border-2 border-gray-800 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-yellow-500/5 to-amber-500/5" />
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h3 className="text-2xl font-bold text-white">Interactive Analytics</h3>
              <div className="flex gap-2">
                {(['sales', 'users', 'revenue'] as const).map((dataset) => (
                  <motion.button
                    key={dataset}
                    onClick={() => setActiveDataset(dataset)}
                    className={`px-4 py-2 rounded-full text-sm font-medium capitalize backdrop-blur-sm ${
                      activeDataset === dataset
                        ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/30'
                        : 'text-gray-400 hover:bg-gray-700/50 border border-gray-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {dataset}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="h-48 flex items-end justify-between gap-3 relative z-10">
              {datasets[activeDataset].map((value, i) => (
                <motion.div
                  key={i}
                  className="flex-1 flex flex-col items-center group"
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
                >
                  <motion.div
                    className="w-full rounded-t-lg cursor-pointer relative"
                    style={{
                      height: `${(value / maxValue) * 100}%`,
                      background: `linear-gradient(to top, ${colors[i]}, ${colors[i]}80)`
                    }}
                    whileHover={{ scaleY: 1.05 }}
                    animate={{
                      boxShadow: [
                        `0 0 20px ${colors[i]}40`,
                        `0 0 40px ${colors[i]}60`,
                        `0 0 20px ${colors[i]}40`
                      ]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-700 backdrop-blur-sm">
                      {value.toLocaleString()}
                    </div>
                  </motion.div>
                  <div className="text-sm text-gray-400 mt-2 font-medium">Day {i + 1}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl border border-gray-800 text-center backdrop-blur-sm">
              <div className="text-3xl font-bold text-white mb-1">
                {datasets[activeDataset].reduce((a, b) => a + b, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 font-medium">Total</div>
            </div>
            <div className="p-5 rounded-2xl border border-gray-800 text-center backdrop-blur-sm">
              <div className="text-3xl font-bold text-white mb-1">
                {Math.max(...datasets[activeDataset]).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 font-medium">Peak</div>
            </div>
            <div className="p-5 rounded-2xl border border-gray-800 text-center backdrop-blur-sm">
              <div className="text-3xl font-bold text-white mb-1">
                {(datasets[activeDataset].reduce((a, b) => a + b, 0) / datasets[activeDataset].length).toFixed(0)}
              </div>
              <div className="text-sm text-gray-400 font-medium">Average</div>
            </div>
          </div>

          {/* Interactive Legend */}
          <div className="flex flex-wrap gap-3">
            {datasets[activeDataset].map((value, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-700 cursor-pointer backdrop-blur-sm group"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ 
                    backgroundColor: colors[i],
                    boxShadow: `0 0 10px ${colors[i]}`
                  }}
                />
                <div>
                  <span className="text-sm font-medium text-white">Day {i + 1}</span>
                  <div className="text-xs text-gray-500">{value.toLocaleString()}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );
    };
    
    return DemoComponent;
  }, []);

  const demos: Demo[] = [
    {
      id: 'website',
      title: 'Make it Interactive',
      icon: Globe,
      color: 'from-blue-500 to-cyan-400',
      component: WebsiteDemo
    },
    {
      id: 'automation',
      title: 'Make it Automated',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      component: AutomationDemo
    },
    {
      id: 'ai',
      title: 'Integrate AI',
      icon: Brain,
      color: 'from-green-500 to-emerald-400',
      component: AIDemo
    },
    {
      id: 'dataviz',
      title: 'Yassify Data',
      icon: BarChart3,
      color: 'from-orange-500 to-yellow-500',
      component: DataVizDemo
    }
  ];

  const activeDemoData = demos.find(d => d.id === activeDemo);

  return (
    <div 
      className="text-white p-4 md:p-8"
      onMouseMove={handleMouseMove}
    >
      {/* Simplified background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Particles */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className={`absolute ${
              particle.shape === 'circle' ? 'rounded-full' :
              particle.shape === 'triangle' ? 'clip-triangle' : ''
            }`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size * 2,
              height: particle.size * 2,
              background: `radial-gradient(circle, ${particle.color}20, ${particle.color}10, transparent 70%)`,
              filter: `blur(${particle.size/2}px)`
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(particle.id) * 15, 0]
            }}
            transition={{
              duration: particle.speed * 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Magnetic Field Indicator */}
      {magnetActive && (
        <motion.div
          className="fixed top-4 right-4 z-50 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold flex items-center gap-2 backdrop-blur-sm"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
        >
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          MAGNETIC FIELD
        </motion.div>
      )}

      {/* Simplified Header */}
      <header className="relative z-10 max-w-6xl mx-auto mb-10 text-center">
        <motion.div
          className="text-2xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Breaking boundaries. Click to see.
          </span>
        </motion.div>
      </header>

      {/* Demo Cards Grid - Simplified */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => setActiveDemo(demo.id)}
            >
              <div className="relative rounded-2xl p-6 border-2 border-gray-800 backdrop-blur-sm transition-all hover:border-blue-500/50">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${demo.color}`}>
                    <demo.icon className="w-6 h-6" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {demo.title}
                </h3>
                <div className="flex items-center text-blue-400 font-medium">
                  <Play className="w-4 h-4 mr-2" />
                  <span>View Demo →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Active Demo Modal - KEEP FULL DETAILS */}
        <AnimatePresence mode="wait">
          {activeDemo && activeDemoData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
              onClick={() => setActiveDemo(null)}
            >
              <motion.div
                className="w-full max-w-3xl max-h-[90vh] rounded-3xl border-2 border-gray-800 overflow-hidden shadow-2xl shadow-blue-500/20 backdrop-blur-xl"
                onClick={(e) => e.stopPropagation()}
                initial={{ y: 100, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 100, opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
              >
                {/* Modal header with effects */}
                <div className="relative p-8 border-b border-gray-800">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className={`p-3 rounded-xl bg-gradient-to-br ${activeDemoData.color} shadow-lg`}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <activeDemoData.icon className="w-8 h-8" />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold text-white">
                          {activeDemoData.title}
                        </h3>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setActiveDemo(null)}
                      className="p-3 hover:bg-gray-800/50 rounded-xl transition-all hover:rotate-90"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>
                
                <div className="p-8 overflow-y-auto max-h-[calc(90vh-240px)]">
                  {activeDemoData.id === 'website' ? (
                    <activeDemoData.component mousePos={mousePosition} />
                  ) : (
                    <activeDemoData.component />
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom styles */}
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% 200%;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .clip-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `}</style>
    </div>
  );
}