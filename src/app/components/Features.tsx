import { Palette, Wrench, Rocket } from 'lucide-react';

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

export default function Features() {
  return (
    <section id="features" className="py-2 bg-gradient-to-b from-black to-gray-900/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-6 px-6 py-2 rounded-full bg-gradient-to-r from-[#5de0e6]/10 to-[#256ac6]/10 border border-[#5de0e6]/20">
            <span className="text-sm font-medium text-[#5de0e6]">Our Process</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 tracking-tight text-white">
            Don't Settle for Less.
            <span className="block bg-gradient-to-r from-[#5de0e6] to-[#256ac6] bg-clip-text text-transparent">
              
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A seamless journey from concept to production-ready solutions
          </p>
        </div>

        {/* Column layout - Three cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Glow border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5de0e6] to-[#256ac6] rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
              
              {/* Main card */}
              <div className="relative h-full bg-gray-900/70 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:border-gray-700/50 transition-all duration-300 group-hover:scale-[1.02]">
                {/* Icon with gradient background */}
                <div className="inline-flex items-center justify-center p-4 rounded-xl bg-gradient-to-r from-[#5de0e6] to-[#256ac6] mb-6">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                
                {/* Step number */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#5de0e6]/20 to-[#256ac6]/20 border border-[#5de0e6]/30">
                    <span className="text-sm font-bold text-[#5de0e6]">{index + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                </div>
                
                <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Learn more link */}
                <div className="pt-6 border-t border-gray-800/50">
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-[#5de0e6] transition-colors duration-300">
                    <span>Learn more</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA that matches Hero style */}
        <div className="text-center mt-16 pt-12 border-t border-gray-800/30 max-w-2xl mx-auto">
          <p className="text-gray-400 mb-8 text-lg">
            Ready to streamline your development process?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative inline-flex items-center justify-center rounded-lg px-8 py-3 text-lg font-medium text-white transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-[#5de0e6] to-[#256ac6] opacity-30 blur-[2px] group-hover:opacity-50 group-hover:blur-[3px] transition-all duration-300"></div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#5de0e6]/30 to-[#256ac6]/30 border border-white/10 group-hover:border-white/20"></div>
              <span className="relative z-10">Get Started</span>
            </button>
            
            <button className="group relative inline-flex items-center justify-center rounded-lg px-8 py-3 text-lg font-medium text-white transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-[#5de0e6] to-[#256ac6] opacity-30 blur-[2px] group-hover:opacity-50 group-hover:blur-[3px] transition-all duration-300"></div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#5de0e6]/30 to-[#256ac6]/30 border border-white/10 group-hover:border-white/20"></div>
              <span className="relative z-10">Book a Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}