import React from 'react';
import { ArrowLeft, Rocket, Zap, Sparkles, Stars } from 'lucide-react';
import { Link } from 'react-router-dom'; // or your routing library

const Api = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6 md:p-12">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 mb-12">
        <Link 
          to="/" // Change to your home route
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-105 group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full mb-6 border border-purple-500/30">
            <Rocket className="h-5 w-5 text-purple-400 animate-pulse" />
            <span className="font-semibold text-purple-300">Coming Soon</span>
            <Sparkles className="h-5 w-5 text-yellow-400" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            API Feature
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We're building something extraordinary for you. 
            Get ready for powerful API capabilities!
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="relative">
          {/* Glowing Border Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur opacity-30"></div>
          
          {/* Main Card */}
          <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl">
            {/* Animated Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-full border border-white/10">
                  <Zap className="h-20 w-20 text-yellow-400" />
                </div>
              </div>
            </div>

            {/* Main Message */}
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Feature Under Construction
                </span>
              </h2>
              
              <p className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                This Feature is coming soon...
              </p>
              
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Our team is working hard to bring you an amazing API experience. 
                Stay tuned for updates and get ready to transform your workflow!
              </p>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: "Powerful Integration",
                  desc: "Seamless integration with your existing tools",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  title: "Real-time Data",
                  desc: "Instant access to live data streams",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  title: "Advanced Analytics",
                  desc: "Deep insights and analytics capabilities",
                  color: "from-green-500 to-emerald-500"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/50 rounded-xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 hover:scale-105 group"
                >
                  <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${feature.color} mb-4 group-hover:w-24 transition-all duration-300`}></div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Countdown / Progress */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Development Progress</span>
                <span className="font-bold text-green-400">65%</span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full relative"
                  style={{ width: '65%' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>

            {/* Notify Me Button */}
            <div className="text-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Stars className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                  Notify Me When Launched
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </button>
              
              <p className="text-gray-500 text-sm mt-4">
                We'll email you as soon as this feature is available
              </p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12 text-gray-500">
          <p className="mb-2">Expected Launch: Q1 2024</p>
          <p className="text-sm">Follow our updates on social media for the latest news</p>
        </div>
      </div>

      {/* Add custom animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default Api;