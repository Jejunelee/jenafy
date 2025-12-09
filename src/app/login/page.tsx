"use client"

import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    // Handle login logic here
    console.log('Client login attempt:', { email })
    // In reality, you would redirect to dashboard after successful login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Main Content */}
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Security Badge */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/50 border border-white/10">
              <Shield className="h-4 w-4 text-[#5de0e6]" />
              <span className="text-sm text-gray-300">Secure Client Portal</span>
            </div>
          </div>

          {/* Login Card */}
          <div className="relative">
            {/* Glossy effect overlay */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#5de0e6]/20 to-[#256ac6]/10 opacity-20 pointer-events-none" />
            
            {/* Main container */}
            <div className="relative rounded-3xl border border-white/20 bg-gradient-to-br from-gray-900/80 to-gray-900/60 backdrop-blur-xs shadow-2xl shadow-black/40 p-8 sm:p-10">
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#5de0e6] to-[#256ac6] bg-clip-text text-transparent mb-3">
                  Client Login
                </h1>
                <p className="text-gray-400">
                  Access your private dashboard and reports
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Client Email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#5de0e6]/10 to-[#256ac6]/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center">
                      <Mail className="absolute left-4 h-5 w-5 text-gray-400" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-white/10 bg-gray-900/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5de0e6]/30 focus:border-transparent transition-all duration-300"
                        placeholder="your-email@company.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {/* Implement forgot password */}}
                      className="text-sm bg-gradient-to-r from-[#5de0e6] to-[#256ac6] bg-clip-text text-transparent hover:opacity-90 transition-opacity"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#5de0e6]/10 to-[#256ac6]/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 h-5 w-5 text-gray-400" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-white/10 bg-gray-900/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5de0e6]/30 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border transition-all duration-300 ${rememberMe ? 'bg-gradient-to-r from-[#5de0e6] to-[#256ac6] border-transparent' : 'border-white/20 bg-gray-900/50'}`}>
                        {rememberMe && (
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">Keep me signed in</span>
                  </label>
                </div>

                {/* Fixed Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-[#5de0e6] to-[#256ac6] p-px shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#5de0e6]/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
                >
                  <div className="relative rounded-[11px] bg-gradient-to-r from-[#5de0e6] to-[#256ac6] group-hover:from-[#5de0e6]/90 group-hover:to-[#256ac6]/90 transition-all duration-300">
                    <div className="relative rounded-[11px] bg-gray-900 group-hover:bg-transparent transition-all duration-300 py-4">
                      <span className="text-sm font-medium text-white">
                        {isLoading ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Verifying credentials...
                          </span>
                        ) : (
                          'Access Dashboard'
                        )}
                      </span>
                    </div>
                  </div>
                </button>
              </form>

              {/* Support Note */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    Need help accessing your account?{' '}
                    <button
                      type="button"
                      onClick={() => {/* Implement support contact */}}
                      className="text-[#5de0e6] hover:text-[#4ad4e0] transition-colors"
                    >
                      Contact support
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Info */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-xs text-gray-500">
              <Lock className="h-3 w-3" />
              <span>Your login is secured with 256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}