import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useAnimation, useInView } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

// Icons (install lucide-react for these)
import { 
  Zap, 
  FileText, 
  Shield, 
  Clock, 
  Download, 
  Upload, 
  CheckCircle, 
  TrendingUp,
  Sparkles,
  ChevronRight,
  Star,
  Users,
  Globe,
  BarChart3,
  Smartphone,
  Lock,
  RefreshCw,
  ArrowRight
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  // Scroll animation control
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.7, ease: "easeOut" },
    }),
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Feature cards data
  const featureCards = [
    {
      title: "AI Powered Extraction",
      text: "Extract text, tables, entities, signatures and custom fields with precision.",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-yellow-400 to-orange-500"
    },
    {
      title: "Supports All Formats",
      text: "PDF, PNG, JPG, receipts, invoices, forms, IDs & scanned files.",
      icon: <FileText className="w-8 h-8" />,
      color: "from-blue-400 to-purple-500"
    },
    {
      title: "Lightning Fast",
      text: "Get results in seconds with enterprise-level accuracy.",
      icon: <Zap className="w-8 h-8" />,
      color: "from-green-400 to-teal-500"
    },
    {
      title: "API Integration",
      text: "Get API key for seamless integration with your business applications.",
      icon: <Globe className="w-8 h-8" />,
      color: "from-purple-400 to-pink-500"
    },
    {
      title: "Unlimited Processing",
      text: "Get your bills scanned with no limits on processing.",
      icon: <RefreshCw className="w-8 h-8" />,
      color: "from-red-400 to-orange-500"
    },
    {
      title: "Smart Analytics",
      text: "Get your monthly expenditure report with detailed analytics.",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "from-indigo-400 to-blue-500"
    }
  ];

  // Stats data
  const stats = [
    { value: "99.7%", label: "Accuracy Rate", icon: <Shield /> },
    { value: "<2s", label: "Avg Processing Time", icon: <Clock /> },
    { value: "50K+", label: "Documents Processed", icon: <Upload /> },
    { value: "1M+", label: "Data Points Extracted", icon: <TrendingUp /> }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Finance Manager, TechCorp",
      content: "DocXtract reduced our invoice processing time by 80%. Incredible tool!",
      rating: 5
    },
    {
      name: "Sarah Chen",
      role: "Operations Director",
      content: "The AI extraction is scarily accurate. Saved us hundreds of hours.",
      rating: 5
    },
    {
      name: "Marcus Rivera",
      role: "Startup Founder",
      content: "Best document processing API we've used. Integration was seamless.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-inter overflow-x-hidden">
      {/* ================= ANIMATED BACKGROUND ELEMENTS ================= */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/20 rounded-full"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh'
            }}
            animate={{
              y: [null, -20, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* ================= HEADER ================= */}
      <motion.header 
        className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-lg py-4 border-b border-gray-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h1 className="text-3xl font-extrabold text-yellow-400 tracking-wide flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              DocXtract
              <motion.span
                animate={pulseAnimation}
                className="inline-block ml-2"
              >
                <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded-full">AI</span>
              </motion.span>
            </h1>
          </motion.div>

          <NavigationMenu>
            <NavigationMenuList className="hidden md:flex gap-8 text-gray-300">
              {["Docs", "Plans", "Feedback", "Queries", "Experience"].map((item) => (
                <NavigationMenuItem key={item}>
                  <motion.div whileHover={{ y: -2 }}>
                    <Link 
                      to={`/${item.toLowerCase()}`} 
                      className="hover:text-yellow-400 transition-colors flex items-center gap-1"
                    >
                      {item}
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-yellow-400 border border-gray-700"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 shadow-lg shadow-yellow-400/25"
                onClick={() => navigate("/register")}
              >
                <Zap className="w-4 h-4 mr-2" />
                Get Started Free
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* ================= HERO SECTION ================= */}
      <section ref={heroRef} className="h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-20 right-20 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"
        />
        
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-100 leading-tight"
        >
          <span className="relative inline-block">
            Extract
            <motion.span
              animate={floatingAnimation}
              className="absolute -top-8 -right-8"
            >
              <Sparkles className="w-12 h-12 text-yellow-400" />
            </motion.span>
          </span>
          <br />
          <span className="text-yellow-400 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Documents.
          </span>
          <motion.span
            animate={{ 
              opacity: [1, 0.5, 1],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block ml-4"
          >
            Instantly
          </motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 max-w-3xl mx-auto text-gray-400 text-xl md:text-2xl"
        >
          Upload PDFs, images, receipts, invoices, IDs & more — our AI instantly
          extracts structured data with <span className="text-yellow-400 font-semibold">99.7% accuracy</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center items-center mt-12 gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-6 text-xl hover:shadow-2xl hover:shadow-yellow-400/30 rounded-2xl group"
              onClick={() => navigate("/login")}
            >
              <Zap className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
              Try Now - It's Free
              <ArrowRight className="w-5 h-5 ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              className="text-white border-gray-600 bg-gray-900/50 hover:bg-gray-800 px-10 py-6 text-xl rounded-2xl group"
              onClick={() => navigate("/docs")}
            >
              <FileText className="w-6 h-6 mr-3" />
              View Live Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating preview cards */}
        <motion.div
          animate={floatingAnimation}
          className="absolute bottom-10 left-10 hidden lg:block"
        >
          <div className="bg-gray-900/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-700 w-64">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="font-semibold">Invoice Processed</p>
                <p className="text-sm text-gray-400">Just now</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, -15, 0],
            transition: { duration: 3, repeat: Infinity, delay: 1 }
          }}
          className="absolute bottom-20 right-10 hidden lg:block"
        >
          <div className="bg-gray-900/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-700 w-64">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="font-semibold">Data Extracted</p>
                <p className="text-sm text-gray-400">15 fields detected</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= STATS BAR ================= */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        ref={statsRef}
        className="py-12 bg-gradient-to-r from-gray-900 to-black border-y border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-gray-700 group-hover:border-yellow-400/50 transition-colors">
                    {stat.icon}
                  </div>
                </div>
                <p className="text-3xl md:text-4xl font-bold text-yellow-400">{stat.value}</p>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================= FEATURES ================= */}
      <section ref={featuresRef} className="py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-full text-sm font-semibold mb-4">
              POWERFUL FEATURES
            </span>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why <span className="text-yellow-400">thousands of teams</span> choose DocXtract
            </h3>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Everything you need for seamless document processing and data extraction
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureCards.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ 
                  y: -12, 
                  transition: { duration: 0.3 } 
                }}
                onMouseEnter={() => setIsHovered(i)}
                onMouseLeave={() => setIsHovered(null)}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-opacity duration-500`} />
                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm p-8 rounded-3xl relative overflow-hidden transition-all duration-300 group-hover:border-yellow-400/30">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-800 to-transparent rounded-full -translate-y-10 translate-x-10" />
                  
                  <CardHeader className="pb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 text-white shadow-lg`}>
                      {item.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {item.text}
                    </p>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: isHovered === i ? "100%" : "0%" }}
                      transition={{ duration: 0.3 }}
                      className="h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 mt-6"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE DEMO PREVIEW ================= */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              See it in <span className="text-yellow-400">action</span>
            </h3>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Watch how DocXtract transforms documents into structured data in seconds
            </p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-3xl border border-gray-800 p-2">
              <div className="bg-gray-900 rounded-2xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center">
                          <Upload className="w-6 h-6 text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-white">Upload Document</h4>
                          <p className="text-gray-400">Drag & drop or click to upload</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-400/10 flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-white">AI Processing</h4>
                          <p className="text-gray-400">Our AI analyzes and extracts data</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-400/10 flex items-center justify-center">
                          <Download className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-white">Get Results</h4>
                          <p className="text-gray-400">Download structured data in JSON/CSV</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="text-sm text-gray-400">processing.json</span>
                      </div>
                      <div className="space-y-4">
                        {[
                          { label: "Document Type", value: "Invoice", color: "text-green-400" },
                          { label: "Total Amount", value: "$1,250.00", color: "text-yellow-400" },
                          { label: "Vendor", value: "Tech Supplies Inc.", color: "text-blue-400" },
                          { label: "Date", value: "2024-03-15", color: "text-purple-400" },
                          { label: "Status", value: "Processed", color: "text-green-400" }
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 + 0.5 }}
                            viewport={{ once: true }}
                            className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg"
                          >
                            <span className="text-gray-400">{item.label}</span>
                            <span className={`font-semibold ${item.color}`}>{item.value}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(234, 179, 8, 0.3)",
                          "0 0 40px rgba(234, 179, 8, 0.6)",
                          "0 0 20px rgba(234, 179, 8, 0.3)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -inset-4 rounded-3xl border border-yellow-400/30 pointer-events-none"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 rounded-full mb-6">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-semibold">TRUSTED BY INDUSTRY LEADERS</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Loved by teams worldwide
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8 backdrop-blur-sm"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-lg italic mb-8">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SUBSCRIPTION SECTION ================= */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Simple, transparent <span className="text-yellow-400">pricing</span>
            </h3>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Choose the plan that fits your needs. No hidden fees, no surprises.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Free",
                price: "$0",
                period: "forever",
                popular: false,
                features: [
                  "✓ 10 documents/month",
                  "✓ Basic text extraction",
                  "✓ Standard processing",
                  "✓ Email support"
                ],
                cta: "Get Started"
              },
              {
                title: "Starter",
                price: "$29",
                period: "per month",
                popular: false,
                features: [
                  "✓ 100 documents/month",
                  "✓ Advanced extraction",
                  "✓ Priority processing",
                  "✓ Email & chat support"
                ],
                cta: "Start Free Trial"
              },
              {
                title: "Pro",
                price: "$99",
                period: "per month",
                popular: true,
                features: [
                  "✓ 1000 documents/month",
                  "✓ AI-powered extraction",
                  "✓ API access",
                  "✓ Priority support",
                  "✓ Custom fields"
                ],
                cta: "Most Popular"
              },
              {
                title: "Enterprise",
                price: "Custom",
                period: "tailored",
                popular: false,
                features: [
                  "✓ Unlimited documents",
                  "✓ All AI features",
                  "✓ Dedicated support",
                  "✓ Custom integrations",
                  "✓ SLA guarantee",
                  "✓ On-premise options"
                ],
                cta: "Contact Sales"
              }
            ].map((plan, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -10 }}
                className={`relative rounded-3xl border-2 p-8 ${
                  plan.popular 
                    ? 'border-yellow-400 bg-gradient-to-b from-gray-900 to-black' 
                    : 'border-gray-800 bg-gray-900/50'
                } backdrop-blur-sm`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h4 className="text-2xl font-bold text-white mb-4">{plan.title}</h4>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl md:text-5xl font-bold text-white">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-gray-400">/mo</span>}
                  </div>
                  <p className="text-gray-400">{plan.period}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className={`w-full py-6 text-lg rounded-xl font-semibold ${
                      plan.popular
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-2xl hover:shadow-yellow-400/30'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                    onClick={() => navigate(plan.popular ? "/register" : "/plans")}
                  >
                    {plan.cta}
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section ref={ctaRef} className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-orange-500/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-gray-800 p-12 md:p-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Ready to transform your
              <span className="block text-yellow-400">document workflow?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto"
            >
              Join thousands of teams automating their document processing. No credit card required to start.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-2xl hover:shadow-yellow-400/30 px-10 py-7 text-xl rounded-2xl font-bold"
                  onClick={() => navigate("/register")}
                >
                  <Zap className="w-6 h-6 mr-3" />
                  Start Free
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="text-yellow bg-gray-400 border-gray-600 hover:border-yellow-400 hover:text-yellow-400 px-10 py-7 text-xl rounded-2xl font-bold"
                  onClick={() => navigate("/login")}
                >
                  <Smartphone className="w-6 h-6 mr-3" />
                  Book a Live Demo
                </Button>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-500 mt-8 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Secure & GDPR compliant. Your data is always protected.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h1 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                DocXtract
              </h1>
              <p className="text-gray-400">
                AI-powered document extraction for modern teams. Fast, accurate, and reliable.
              </p>
            </div>
            
            {["Product", "Company", "Resources", "Legal"].map((category) => (
              <div key={category}>
                <h4 className="text-white font-semibold mb-6">{category}</h4>
                <ul className="space-y-4">
                  {["Features", "Pricing", "API Docs", "Status"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>© {new Date().getFullYear()} DocXtract AI. All rights reserved.</p>
            <p className="mt-2 text-sm">Made with ❤️ for developers and businesses worldwide</p>
          </div>
        </div>
      </footer>
    </div>
  );
}