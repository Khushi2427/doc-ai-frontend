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
  Smartphone
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
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" or "yearly"
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [isAnnual, setIsAnnual] = useState(false);
  const [expandedPlan, setExpandedPlan] = useState(null);
  const [showComparison, setShowComparison] = useState(true);
  const [currency, setCurrency] = useState("USD");
  const [selectedFeatures, setSelectedFeatures] = useState([]);

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
      icon: <Sparkles className="w-6 h-6" />,
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
      yearlyPrice: 290, // $24.17/month equivalent
      popular: false,
      bestFor: "Small Teams",
      color: "from-blue-400 to-cyan-500",
      icon: <TrendingUp className="w-6 h-6" />,
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
      yearlyPrice: 950, // $79.17/month equivalent - 20% discount
      popular: true,
      bestFor: "Growing Businesses",
      color: "from-yellow-400 to-orange-500",
      icon: <Crown className="w-6 h-6" />,
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
      icon: <Building className="w-6 h-6" />,
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

  // Features comparison
  const allFeatures = [
    { id: "documents", name: "Documents per month", icon: <FileText className="w-4 h-4" /> },
    { id: "extraction", name: "AI Extraction", icon: <Cpu className="w-4 h-4" /> },
    { id: "api", name: "API Access", icon: <Server className="w-4 h-4" /> },
    { id: "support", name: "Support", icon: <HelpCircle className="w-4 h-4" /> },
    { id: "reports", name: "Expenditure Reports", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "team", name: "Team Collaboration", icon: <Users className="w-4 h-4" /> },
    { id: "retention", name: "Data Retention", icon: <Database className="w-4 h-4" /> },
    { id: "custom", name: "Custom Fields", icon: <Settings className="w-4 h-4" /> }
  ];

  // Currency conversion (simplified)
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="p-2 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500"
              >
                <CreditCard className="w-6 h-6 text-black" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Pricing Plans
                </h1>
                <p className="text-gray-400 text-sm">Choose what works for you</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:text-yellow-400"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Button>
              <Button
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-lg hover:shadow-yellow-400/25"
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
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Simple, transparent{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              pricing
            </span>
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-10">
            Choose the plan that fits your needs. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <span className={`text-lg ${!isAnnual ? "text-white font-semibold" : "text-gray-400"}`}>
              Monthly billing
            </span>
            <div className="flex items-center">
              <Switch
                checked={isAnnual}
                onCheckedChange={toggleBillingCycle}
                className="data-[state=checked]:bg-yellow-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-lg ${isAnnual ? "text-white font-semibold" : "text-gray-400"}`}>
                Annual billing
              </span>
              {isAnnual && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Save up to 20%
                </Badge>
              )}
            </div>
          </div>

          {/* Currency Selector */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Label className="text-gray-400">Currency:</Label>
            <div className="flex gap-2">
              {["USD", "EUR", "GBP", "INR"].map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-4 py-2 rounded-lg transition-all ${
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
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {Object.values(plans).map((plan) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="relative h-full"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-yellow-400/25">
                    MOST POPULAR
                  </div>
                </motion.div>
              )}

              <Card className={`h-full border-2 ${
                plan.popular
                  ? "border-yellow-400/50 bg-gradient-to-b from-gray-900 to-black"
                  : "border-gray-800 bg-gray-900/50"
              } backdrop-blur-sm overflow-hidden`}>
                <CardHeader className={`pb-6 ${
                  plan.popular ? "bg-gradient-to-br from-yellow-400/10 to-orange-500/5" : ""
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                      {plan.icon}
                    </div>
                    <Badge variant="outline" className="border-gray-700 text-gray-300">
                      {plan.bestFor}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-white">
                    {plan.name}
                  </CardTitle>
                  <p className="text-gray-400 text-sm mt-2">{plan.description}</p>
                  
                  <div className="mt-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-bold text-white">
                        {getPrice(plan)}
                      </span>
                      {plan.id !== "enterprise" && (
                        <span className="text-gray-400">
                          {getPeriod(plan)}
                        </span>
                      )}
                    </div>
                    
                    {isAnnual && plan.id !== "enterprise" && plan.monthlyPrice > 0 && (
                      <div className="mt-2">
                        <p className="text-green-400 text-sm font-semibold">
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
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {plan.features.slice(0, 6).map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          {feature.included ? (
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={`text-sm ${
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
                          className="pt-4 border-t border-gray-800"
                        >
                          <div className="space-y-3">
                            {plan.features.slice(6).map((feature, index) => (
                              <div key={index} className="flex items-start gap-3">
                                {feature.included ? (
                                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                )}
                                <span className={`text-sm ${
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
                        className="text-yellow-400 hover:text-yellow-300 text-sm font-medium flex items-center gap-2"
                      >
                        {expandedPlan === plan.id ? (
                          <>
                            Show less
                            <ChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Show {plan.features.length - 6} more features
                            <ChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="pt-6">
                  <Button
                    className={`w-full py-6 text-lg font-bold ${
                      plan.ctaVariant === "premium"
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-2xl hover:shadow-yellow-400/30"
                        : plan.ctaVariant === "outline"
                        ? "border-2 border-gray-700 bg-transparent text-white hover:border-yellow-400 hover:text-yellow-400"
                        : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/25"
                    }`}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {plan.cta}
                    {plan.id !== "enterprise" && <ArrowRight className="w-5 h-5 ml-2" />}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Plan Comparison</h2>
            <Button
              variant="ghost"
              onClick={() => setShowComparison(!showComparison)}
              className="text-gray-400 hover:text-white"
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
                className="overflow-x-auto rounded-2xl border border-gray-800"
              >
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="py-6 px-6 text-left text-gray-400 font-semibold">Feature</th>
                      {Object.values(plans).map((plan) => (
                        <th key={plan.id} className="py-6 px-6 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <span className="font-bold text-white">{plan.name}</span>
                            <Badge variant="outline" className="border-gray-700">
                              {plan.bestFor}
                            </Badge>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "Documents/month", values: ["10", "100", "1000", "Unlimited"] },
                      { feature: "AI Extraction", values: ["Basic", "Advanced", "Premium", "Enterprise"] },
                      { feature: "API Access", values: ["❌", "Basic", "Full", "Custom"] },
                      { feature: "Support", values: ["Email", "Email & Chat", "Priority", "24/7 Dedicated"] },
                      { feature: "Expenditure Reports", values: ["❌", "Basic", "Advanced", "Custom"] },
                      { feature: "Team Members", values: ["1", "3", "10", "Unlimited"] },
                      { feature: "Data Retention", values: ["7 days", "30 days", "90 days", "Custom"] },
                      { feature: "Custom Fields", values: ["❌", "Up to 5", "Unlimited", "Unlimited"] },
                      { feature: "Processing Priority", values: ["Standard", "Priority", "High", "Highest"] },
                      { feature: "Security Features", values: ["Basic", "Standard", "Advanced", "Enterprise"] }
                    ].map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-gray-800/50 even:bg-gray-900/30">
                        <td className="py-4 px-6 text-gray-300 font-medium">{row.feature}</td>
                        {row.values.map((value, colIndex) => (
                          <td key={colIndex} className="py-4 px-6 text-center">
                            <span className={`${
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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
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
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
              >
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-yellow-400" />
                  {faq.q}
                </h3>
                <p className="text-gray-400">{faq.a}</p>
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
          <div className="bg-gradient-to-r from-yellow-400/10 via-black to-orange-500/10 rounded-3xl border border-gray-800 p-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to transform your document workflow?
              </h2>
              <p className="text-gray-400 text-xl mb-8">
                Join thousands of teams using DocXtract to automate their document processing.
                Start with our free plan — no credit card required.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-2xl hover:shadow-yellow-400/30 px-10 py-7 text-xl"
                  onClick={() => navigate("/register")}
                >
                  <Zap className="w-6 h-6 mr-3" />
                  Start Free Trial - 14 Days
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-700 text-white hover:border-yellow-400 hover:text-yellow-400 px-10 py-7 text-xl"
                  onClick={() => navigate("/contact")}
                >
                  <HelpCircle className="w-6 h-6 mr-3" />
                  Talk to Sales
                </Button>
              </div>
              
              <p className="text-gray-500 mt-8 flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                All plans include SSL encryption & GDPR compliance
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Missing icon components
function FileText(props) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>; }
function Cpu(props) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>; }
function Database(props) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>; }
function Settings(props) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>; }