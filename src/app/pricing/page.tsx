import { Check } from 'lucide-react';

const services = [
  {
    id: 1,
    name: 'Go Online',
    price: '₱500',
    period: '/month*',
    description: 'Digitalize with a custom domain and 2 professional emails.',
    features: [
      'Custom Domain Setup',
      '2x Custom Email (name@domain.com)',
      'SSL Certification',
      'DNS Configuration',
      'Free Setup',
      'Add More Custom Emails: +₱250 each'
    ],
    popular: false,
    developmentNote: 'Quick setup, no development needed.',
    hasDevelopmentCost: false,
    ctaText: 'Book a Call'
  },
  {
    id: 2,
    name: 'Go Pro',
    price: '₱1,230',
    period: '/month*',
    description: 'Complete digital solutions including custom websites and automation development.',
    features: [
      'Custom website design & development',
      'AI-powered automation systems',
      'Friendly Chatbots (not robotic)',
      'Business process automation',
      'Mobile responsive design',
      'Google search optimization',
      'Secure hosting & database',
      'Live visitor dashboard',
      'Automatic client notifications',
      'Software integration',
      'Inventory tracking'
    ],
    popular: true,
    developmentNote: 'After development: Hosting & Database included.',
    hasDevelopmentCost: true,
    ctaText: 'Book a Call'
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Enhanced background container with gradient border */}
      <div className="relative">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header with improved spacing */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-[#5de0e6]/10 to-[#256ac6]/10 border border-[#5de0e6]/20 mb-4">
              <span className="text-sm font-medium bg-gradient-to-r from-[#5de0e6] to-[#256ac6] bg-clip-text text-transparent">
                SIMPLE PRICING
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-[#5de0e6] to-[#256ac6] bg-clip-text text-transparent">
                Digital Solution
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              From basic online presence to complete digital transformation.
            </p>
          </div>

          {/* Pricing Cards Container */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {services.map((service) => (
              <div 
                key={service.id} 
                className={`relative rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-gray-900/80 to-black shadow-xl transition-all duration-300 hover:scale-[1.02] ${service.popular ? 'border-2 border-[#5de0e6] shadow-[#5de0e6]/20' : 'border border-gray-800 hover:border-gray-700'}`}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-[#5de0e6] to-[#256ac6] text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6 sm:mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{service.name}</h3>
                    {service.id === 1 && (
                      <span className="text-xs sm:text-sm px-3 py-1 rounded-full bg-green-900/30 text-green-400 font-medium">
                        No Setup Fee
                      </span>
                    )}
                    {service.id === 2 && (
                      <span className="text-xs sm:text-sm px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 font-medium">
                        +1 Month Free
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-baseline mb-2">
                    <span className="text-3xl sm:text-4xl font-bold text-white">{service.price}</span>
                    <span className="text-gray-400 ml-2 text-sm sm:text-base">{service.period}</span>
                  </div>
                  
                  {/* Development note */}
                  <p className="text-[#5de0e6] text-sm mb-3 font-medium">
                    {service.developmentNote}
                  </p>
                  
                  <p className="text-gray-400 text-sm sm:text-base">{service.description}</p>
                </div>

                {/* CTA Button */}
                <button className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 mb-2 ${service.popular ? 'bg-gradient-to-r from-[#5de0e6] to-[#256ac6] text-white hover:opacity-90 hover:shadow-lg hover:shadow-[#5de0e6]/20' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
                  {service.ctaText}
                </button>
                
                {service.hasDevelopmentCost ? (
                  <p className="text-center text-gray-400 text-xs sm:text-sm mb-8">
                    One-time cost to develop. Then it's <b> ₱1,230/month. Forever.</b>
                  </p>
                ) : (
                  <p className="text-center text-gray-400 text-xs sm:text-sm mb-8">
                    No development needed. Start at <b>₱500/month.</b>
                  </p>
                )}

                {/* Features List */}
                <div className="space-y-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <Check className={`h-4 w-4 sm:h-5 sm:w-5 ${service.popular ? 'text-[#5de0e6]' : 'text-gray-500'} mr-3 mt-0.5 flex-shrink-0`} />
                      <span className="text-gray-300 text-sm sm:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Universal Fee Section */}
          <div className="mt-12 sm:mt-16 lg:mt-20 p-6 sm:p-8 border border-gray-800 rounded-2xl bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Need Help?
                </h3>
                <p className="text-gray-300 text-sm sm:text-base mb-2">
                  <span className="text-[#5de0e6] font-medium">Go Online:</span> Quick setup, monthly fee only
                </p>
                <p className="text-gray-300 text-sm sm:text-base">
                  <span className="text-[#5de0e6] font-medium">Go Pro:</span> One-time setup, then ₱1,230/month for everything
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}