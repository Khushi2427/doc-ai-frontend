import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Star,
  Zap,
  Shield,
  Users,
  Globe,
  Clock,
  Server,
  BarChart3,
  Lock,
  CreditCard,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Crown,
  Building,
  UserCheck,
  RefreshCw,
  Download,
  Upload,
  Smartphone,
  Menu,
  X,
  FileText,
  Cpu,
  Database,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

export default function Plans() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [isAnnual, setIsAnnual] = useState(false);
  const [expandedPlan, setExpandedPlan] = useState(null);
  const [showComparison, setShowComparison] = useState(true);
  const [currency, setCurrency] = useState("USD");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileComparison, setShowMobileComparison] = useState(false);

  // Toggle annual/monthly
  const toggleBillingCycle = () => {
    setIsAnnual(!isAnnual);
    setBillingCycle(isAnnual ? "monthly" : "yearly");
  };

  // Plan data
  const plans = {
    free: {
      id: "free",
      name: "Free",
      description: "Perfect for individuals getting started",
      monthlyPrice: 0,
      yearlyPrice: 0,
      popular: false,
      bestFor: "Personal Use",
      color: "from-gray-400 to-gray-600",
      icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />,
      features: [
        { text: "10 documents/month", included: true, priority: false },
        { text: "Basic text extraction", included: true, priority: false },
        { text: "Standard processing speed", included: true, priority: false },
        { text: "Email support", included: true, priority: false },
        { text: "7-day data retention", included: true, priority: false },
        { text: "Web dashboard access", included: true, priority: false },
        { text: "API access", included: false, priority: false },
        { text: "Priority support", included: false, priority: false },
        { text: "Custom fields", included: false, priority: false },
        { text: "Expenditure reports", included: false, priority: false }
      ],
      cta: "Get Started Free",
      ctaVariant: "outline"
    },
    starter: {
      id: "starter",
      name: "Starter",
      description: "Great for small businesses and teams",
      monthlyPrice: 29,
      yearlyPrice: 290,
      popular: false,
      bestFor: "Small Teams",
      color: "from-blue-400 to-cyan-500",
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
      features: [
        { text: "100 documents/month", included: true, priority: false },
        { text: "Advanced extraction", included: true, priority: false },
        { text: "Priority processing", included: true, priority: false },
        { text: "Email & chat support", included: true, priority: false },
        { text: "30-day data retention", included: true, priority: false },
        { text: "Basic API access", included: true, priority: false },
        { text: "Custom fields (5 max)", included: true, priority: false },
        { text: "Basic expenditure reports", included: true, priority: false },
        { text: "Team collaboration (up to 3)", included: true, priority: false },
        { text: "Advanced analytics", included: false, priority: false }
      ],
      cta: "Start Free Trial",
      ctaVariant: "default"
    },
    pro: {
      id: "pro",
      name: "Pro",
      description: "For growing businesses with advanced needs",
      monthlyPrice: 99,
      yearlyPrice: 950,
      popular: true,
      bestFor: "Growing Businesses",
      color: "from-yellow-400 to-orange-500",
      icon: <Crown className="w-5 h-5 sm:w-6 sm:h-6" />,
      features: [
        { text: "1000 documents/month", included: true, priority: true },
        { text: "AI-powered extraction", included: true, priority: true },
        { text: "Full API access", included: true, priority: true },
        { text: "Priority support", included: true, priority: true },
        { text: "Custom fields (unlimited)", included: true, priority: true },
        { text: "Advanced expenditure reports", included: true, priority: true },
        { text: "Team collaboration (up to 10)", included: true, priority: true },
        { text: "90-day data retention", included: true, priority: true },
        { text: "Custom AI models", included: true, priority: true },
        { text: "Webhook integrations", included: true, priority: true }
      ],
      cta: "Most Popular",
      ctaVariant: "premium"
    },
    enterprise: {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations with custom requirements",
      monthlyPrice: null,
      yearlyPrice: null,
      popular: false,
      bestFor: "Large Organizations",
      color: "from-purple-500 to-pink-600",
      icon: <Building className="w-5 h-5 sm:w-6 sm:h-6" />,
      features: [
        { text: "Unlimited documents", included: true, priority: true },
        { text: "All AI features", included: true, priority: true },
        { text: "Dedicated support", included: true, priority: true },
        { text: "Custom integrations", included: true, priority: true },
        { text: "SLA guarantee (99.9%)", included: true, priority: true },
        { text: "On-premise options", included: true, priority: true },
        { text: "White-label solution", included: true, priority: true },
        { text: "Unlimited team members", included: true, priority: true },
        { text: "Custom data retention", included: true, priority: true },
        { text: "Security audit & compliance", included: true, priority: true }
      ],
      cta: "Contact Sales",
      ctaVariant: "outline"
    }
  };

  // Currency conversion
  const currencyRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.5
  };

  const getPrice = (plan) => {
    if (plan.id === "enterprise") return "Custom";
    
    const price = isAnnual ? plan.yearlyPrice : plan.monthlyPrice;
    const symbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "₹";
    
    if (price === 0) return "Free";
    
    const convertedPrice = Math.round(price * currencyRates[currency]);
    return `${symbol}${convertedPrice}`;
  };

  const getPeriod = (plan) => {
    if (plan.id === "enterprise") return "tailored";
    return isAnnual ? "/year" : "/month";
  };

  const getSavings = (plan) => {
    if (!isAnnual || plan.monthlyPrice === 0) return null;
    const monthlyEquivalent = plan.yearlyPrice / 12;
    const savings = plan.monthlyPrice - monthlyEquivalent;
    const percentage = Math.round((savings / plan.monthlyPrice) * 100);
    return `${percentage}% savings`;
  };

  // Handle plan selection
  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    if (planId === "enterprise") {
      navigate("/contact");
    } else {
      toast.success(`Selected ${plans[planId].name} plan`);
    }
  };

  // Toggle plan expansion
  const togglePlanExpansion = (planId) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Mobile comparison view data
  const mobileComparisonData = [
    { feature: "Documents/month", values: ["10", "100", "1000", "Unlimited"] },
    { feature: "AI Extraction", values: ["Basic", "Advanced", "Premium", "Enterprise"] },
    { feature: "API Access", values: ["❌", "Basic", "Full", "Custom"] },
    { feature: "Support", values: ["Email", "Email & Chat", "Priority", "24/7 Dedicated"] },
    { feature: "Expenditure Reports", values: ["❌", "Basic", "Advanced", "Custom"] },
    { feature: "Team Members", values: ["1", "3", "10", "Unlimited"] },
    { feature: "Data Retention", values: ["7 days", "30 days", "90 days", "Custom"] },
    { feature: "Custom Fields", values: ["❌", "Up to 5", "Unlimited", "Unlimited"] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              exit={{ y: -50 }}
              className="p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500">
                    <CreditCard className="w-6 h-6 text-black" />
                  </div>
                  <h1 className="text-xl font-bold text-white">Pricing</h1>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <Button
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-6 text-lg"
                  onClick={() => navigate("/register")}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Sign Up Free
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-white py-6 text-lg"
                  onClick={() => navigate("/dashboard")}
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Go to Dashboard
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-900/90 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="p-2 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500"
              >
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
              </motion.div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Pricing Plans
                </h1>
                <p className="text-gray-400 text-xs sm:text-sm">Choose what works for you</p>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:text-yellow-400 text-sm"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-lg hover:shadow-yellow-400/25 text-sm"
                onClick={() => navigate("/register")}
              >
                <Zap className="w-4 h-4 mr-2" />
                Sign Up Free
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Simple, transparent{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              pricing
            </span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 sm:mb-10 px-4">
            Choose the plan that fits your needs. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8">
            <div className="flex items-center gap-4">
              <span className={`text-base sm:text-lg ${!isAnnual ? "text-white font-semibold" : "text-gray-400"}`}>
                Monthly
              </span>
              <div className="flex items-center">
                <Switch
                  checked={isAnnual}
                  onCheckedChange={toggleBillingCycle}
                  className="data-[state=checked]:bg-yellow-400 scale-90 sm:scale-100"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-base sm:text-lg ${isAnnual ? "text-white font-semibold" : "text-gray-400"}`}>
                  Annual
                </span>
                {isAnnual && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs sm:text-sm">
                    Save up to 20%
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Currency Selector - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
            <Label className="text-gray-400 text-sm sm:text-base">Currency:</Label>
            <div className="flex flex-wrap justify-center gap-2">
              {["USD", "EUR", "GBP", "INR"].map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base transition-all ${
                    currency === curr
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16"
        >
          {Object.values(plans).map((plan) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="relative h-full"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 sm:px-6 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg shadow-yellow-400/25 whitespace-nowrap">
                    MOST POPULAR
                  </div>
                </motion.div>
              )}

              <Card className={`h-full border-2 ${
                plan.popular
                  ? "border-yellow-400/50 bg-gradient-to-b from-gray-900 to-black"
                  : "border-gray-800 bg-gray-900/50"
              } backdrop-blur-sm overflow-hidden`}>
                <CardHeader className={`pb-4 sm:pb-6 ${
                  plan.popular ? "bg-gradient-to-br from-yellow-400/10 to-orange-500/5" : ""
                }`}>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                      {plan.icon}
                    </div>
                    <Badge variant="outline" className="border-gray-700 text-gray-300 text-xs sm:text-sm">
                      {plan.bestFor}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl sm:text-2xl font-bold text-white">
                    {plan.name}
                  </CardTitle>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">{plan.description}</p>
                  
                  <div className="mt-4 sm:mt-6">
                    <div className="flex items-baseline gap-1 sm:gap-2">
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                        {getPrice(plan)}
                      </span>
                      {plan.id !== "enterprise" && (
                        <span className="text-gray-400 text-sm sm:text-base">
                          {getPeriod(plan)}
                        </span>
                      )}
                    </div>
                    
                    {isAnnual && plan.id !== "enterprise" && plan.monthlyPrice > 0 && (
                      <div className="mt-1 sm:mt-2">
                        <p className="text-green-400 text-xs sm:text-sm font-semibold">
                          {getSavings(plan)}
                        </p>
                        <p className="text-gray-500 text-xs">
                          Equivalent to ${Math.round(plan.yearlyPrice / 12 * currencyRates[currency])}/month
                        </p>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="space-y-2 sm:space-y-3">
                      {plan.features.slice(0, 6).map((feature, index) => (
                        <div key={index} className="flex items-start gap-2 sm:gap-3">
                          {feature.included ? (
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={`text-xs sm:text-sm ${
                            feature.included
                              ? feature.priority ? "text-yellow-400" : "text-gray-300"
                              : "text-gray-600"
                          }`}>
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Expandable Features */}
                    <AnimatePresence>
                      {expandedPlan === plan.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="pt-3 sm:pt-4 border-t border-gray-800"
                        >
                          <div className="space-y-2 sm:space-y-3">
                            {plan.features.slice(6).map((feature, index) => (
                              <div key={index} className="flex items-start gap-2 sm:gap-3">
                                {feature.included ? (
                                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                ) : (
                                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                )}
                                <span className={`text-xs sm:text-sm ${
                                  feature.included
                                    ? feature.priority ? "text-yellow-400" : "text-gray-300"
                                    : "text-gray-600"
                                }`}>
                                  {feature.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {plan.features.length > 6 && (
                      <button
                        onClick={() => togglePlanExpansion(plan.id)}
                        className="text-yellow-400 hover:text-yellow-300 text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2"
                      >
                        {expandedPlan === plan.id ? (
                          <>
                            Show less
                            <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
                          </>
                        ) : (
                          <>
                            Show {plan.features.length - 6} more features
                            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="pt-4 sm:pt-6">
                  <Button
                    className={`w-full py-4 sm:py-6 text-sm sm:text-base lg:text-lg font-bold ${
                      plan.ctaVariant === "premium"
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-2xl hover:shadow-yellow-400/30"
                        : plan.ctaVariant === "outline"
                        ? "border-2 border-gray-700 bg-transparent text-white hover:border-yellow-400 hover:text-yellow-400"
                        : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/25"
                    }`}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    <span className="truncate">{plan.cta}</span>
                    {plan.id !== "enterprise" && <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 flex-shrink-0" />}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Comparison Table - Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 sm:mb-20 hidden lg:block"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-0">Plan Comparison</h2>
            <Button
              variant="ghost"
              onClick={() => setShowComparison(!showComparison)}
              className="text-gray-400 hover:text-white text-sm sm:text-base"
            >
              {showComparison ? "Hide Comparison" : "Show Comparison"}
            </Button>
          </div>

          <AnimatePresence>
            {showComparison && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-x-auto rounded-xl sm:rounded-2xl border border-gray-800"
              >
                <div className="min-w-[800px]">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="py-4 sm:py-6 px-4 sm:px-6 text-left text-gray-400 font-semibold text-sm sm:text-base">Feature</th>
                        {Object.values(plans).map((plan) => (
                          <th key={plan.id} className="py-4 sm:py-6 px-4 sm:px-6 text-center">
                            <div className="flex flex-col items-center gap-1 sm:gap-2">
                              <span className="font-bold text-white text-sm sm:text-base">{plan.name}</span>
                              <Badge variant="outline" className="border-gray-700 text-xs">
                                {plan.bestFor}
                              </Badge>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mobileComparisonData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-gray-800/50 even:bg-gray-900/30">
                          <td className="py-3 sm:py-4 px-4 sm:px-6 text-gray-300 font-medium text-sm sm:text-base">{row.feature}</td>
                          {row.values.map((value, colIndex) => (
                            <td key={colIndex} className="py-3 sm:py-4 px-4 sm:px-6 text-center">
                              <span className={`text-xs sm:text-sm ${
                                value.includes("❌") 
                                  ? "text-red-400" 
                                  : value.includes("Unlimited") || value.includes("Custom") || value.includes("Enterprise")
                                  ? "text-yellow-400 font-semibold"
                                  : "text-gray-300"
                              }`}>
                                {value}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Mobile Comparison View */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12 sm:mb-20 lg:hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Plan Comparison</h2>
            <Button
              variant="ghost"
              onClick={() => setShowMobileComparison(!showMobileComparison)}
              className="text-gray-400 hover:text-white text-sm"
            >
              {showMobileComparison ? "Hide" : "Show"}
            </Button>
          </div>

          <AnimatePresence>
            {showMobileComparison && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-4"
              >
                {mobileComparisonData.map((row, rowIndex) => (
                  <motion.div
                    key={rowIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: rowIndex * 0.05 }}
                    className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800"
                  >
                    <h3 className="text-sm font-semibold text-white mb-3">{row.feature}</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {row.values.map((value, colIndex) => (
                        <div key={colIndex} className="text-center">
                          <div className="mb-1">
                            <span className={`text-xs ${
                              value.includes("❌") 
                                ? "text-red-400" 
                                : value.includes("Unlimited") || value.includes("Custom") || value.includes("Enterprise")
                                ? "text-yellow-400 font-semibold"
                                : "text-gray-300"
                            }`}>
                              {value}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">{Object.values(plans)[colIndex].name}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 sm:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                q: "Can I switch plans anytime?",
                a: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes take effect at the next billing cycle."
              },
              {
                q: "What happens if I exceed my document limit?",
                a: "Free plan users will need to wait until the next month or upgrade. Paid plan users can purchase additional document credits or upgrade to a higher plan."
              },
              {
                q: "Do you offer refunds?",
                a: "We offer a 14-day money-back guarantee for all paid plans. Contact our support team within 14 days of purchase for a full refund."
              },
              {
                q: "Is there a free trial for paid plans?",
                a: "Yes! All paid plans come with a 14-day free trial. No credit card required to start your trial."
              },
              {
                q: "How are expenditure reports generated?",
                a: "Our AI automatically analyzes invoices and receipts to categorize expenses, identify vendors, and generate comprehensive reports. Available for Business and Enterprise plans."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for Enterprise plans."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-800"
              >
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-gray-400 text-sm sm:text-base">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-yellow-400/10 via-black to-orange-500/10 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-gray-800 p-6 sm:p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Ready to transform your document workflow?
              </h2>
              <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
                Join thousands of teams using DocXtract to automate their document processing.
                Start with our free plan — no credit card required.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-2xl hover:shadow-yellow-400/30 px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 text-base sm:text-lg md:text-xl w-full sm:w-auto"
                  onClick={() => navigate("/register")}
                >
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                  Start Free Trial - 14 Days
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-700 text-white hover:border-yellow-400 hover:text-yellow-400 px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 text-base sm:text-lg md:text-xl w-full sm:w-auto"
                  onClick={() => navigate("/contact")}
                >
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                  Talk to Sales
                </Button>
              </div>
              
              <p className="text-gray-500 text-sm sm:text-base mt-6 sm:mt-8 flex items-center justify-center gap-2">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                All plans include SSL encryption & GDPR compliance
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}