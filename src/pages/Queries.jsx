import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  BookOpen,
  Video,
  FileText,
  Users,
  Mail,
  Phone,
  Globe,
  Star,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  ChevronDown,
  Copy,
  ExternalLink,
  HelpCircle,
  Lightbulb,
  TrendingUp,
  X,
  MessageCircle,
  Bot,
  Shield,
  Lock,
  Download,
  Upload,
  Database,
  Server,
  Cpu,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

export default function Queries() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("faq");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium",
    category: "general"
  });

  // FAQ Categories and Questions
  const faqCategories = [
    { id: "all", label: "All Questions", count: 45, icon: <HelpCircle className="w-4 h-4" /> },
    { id: "account", label: "Account & Billing", count: 12, icon: <Users className="w-4 h-4" /> },
    { id: "api", label: "API & Integration", count: 18, icon: <Server className="w-4 h-4" /> },
    { id: "document", label: "Document Processing", count: 9, icon: <FileText className="w-4 h-4" /> },
    { id: "technical", label: "Technical Issues", count: 6, icon: <Cpu className="w-4 h-4" /> }
  ];

  const faqQuestions = [
    {
      id: 1,
      question: "How do I get my API key?",
      answer: "You can find your API key in the Dashboard > API Settings section. Business and Enterprise plans get full API access, while Free plan users have limited API capabilities.",
      category: "api",
      helpful: 42,
      unhelpful: 2,
      difficulty: "easy",
      updated: "2 days ago"
    },
    {
      id: 2,
      question: "What document formats are supported?",
      answer: "DocXtract supports PDF, PNG, JPG, JPEG, TIFF, and WebP formats. We also support scanned documents and multi-page PDFs with OCR capabilities.",
      category: "document",
      helpful: 38,
      unhelpful: 1,
      difficulty: "easy",
      updated: "1 week ago"
    },
    {
      id: 3,
      question: "How accurate is the AI extraction?",
      answer: "Our Llama-powered AI achieves 99.7% accuracy for structured documents like invoices and receipts. For complex documents, accuracy may vary between 95-98% depending on document quality.",
      category: "document",
      helpful: 56,
      unhelpful: 3,
      difficulty: "medium",
      updated: "3 days ago"
    },
    {
      id: 4,
      question: "Can I process documents in batch?",
      answer: "Yes! Business and Enterprise plans include batch processing. You can upload up to 100 documents at once through our dashboard or use our batch API endpoint.",
      category: "api",
      helpful: 31,
      unhelpful: 0,
      difficulty: "medium",
      updated: "5 days ago"
    },
    {
      id: 5,
      question: "How do expenditure reports work?",
      answer: "For Business and Enterprise users, we automatically analyze invoices and receipts to generate monthly expenditure reports. You can access these from Dashboard > Reports.",
      category: "account",
      helpful: 27,
      unhelpful: 1,
      difficulty: "easy",
      updated: "1 week ago"
    },
    {
      id: 6,
      question: "What's the maximum file size?",
      answer: "Free plan: 10MB per file. Business plan: 50MB per file. Enterprise plan: 100MB per file. For larger files, contact our support team.",
      category: "technical",
      helpful: 22,
      unhelpful: 2,
      difficulty: "easy",
      updated: "2 weeks ago"
    },
    {
      id: 7,
      question: "How do I integrate with my existing systems?",
      answer: "We provide REST API, webhooks, and SDKs for Python, JavaScript, and Java. Check our Documentation > API Reference for detailed integration guides.",
      category: "api",
      helpful: 48,
      unhelpful: 4,
      difficulty: "hard",
      updated: "4 days ago"
    },
    {
      id: 8,
      question: "Is my data secure?",
      answer: "Yes! We use AES-256 encryption, SOC 2 compliance, and GDPR standards. Data is encrypted at rest and in transit. We never store your documents longer than necessary.",
      category: "account",
      helpful: 63,
      unhelpful: 1,
      difficulty: "easy",
      updated: "3 days ago"
    }
  ];

  // Popular Articles
  const popularArticles = [
    {
      id: 1,
      title: "Getting Started Guide",
      description: "Complete beginner's guide to DocXtract",
      category: "tutorial",
      reads: 1245,
      time: "10 min",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 2,
      title: "API Integration Tutorial",
      description: "Step-by-step API integration guide",
      category: "api",
      reads: 892,
      time: "15 min",
      icon: <Server className="w-5 h-5" />
    },
    {
      id: 3,
      title: "Batch Processing Guide",
      description: "How to process multiple documents at once",
      category: "document",
      reads: 567,
      time: "8 min",
      icon: <Upload className="w-5 h-5" />
    },
    {
      id: 4,
      title: "Expenditure Reports",
      description: "Understanding your monthly reports",
      category: "account",
      reads: 432,
      time: "5 min",
      icon: <Database className="w-5 h-5" />
    }
  ];

  // Support Agents
  const supportAgents = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Senior Support Engineer",
      expertise: ["API", "Technical", "Integration"],
      available: true,
      avatar: "SC",
      rating: 4.9,
      responses: 1242
    },
    {
      id: 2,
      name: "Mike Johnson",
      role: "Document Specialist",
      expertise: ["Processing", "Accuracy", "Formats"],
      available: true,
      avatar: "MJ",
      rating: 4.8,
      responses: 892
    },
    {
      id: 3,
      name: "Alex Wong",
      role: "Account Manager",
      expertise: ["Billing", "Plans", "Enterprise"],
      available: false,
      avatar: "AW",
      rating: 4.7,
      responses: 567
    }
  ];

  // Recent Tickets
  const recentTickets = [
    {
      id: "TKT-001",
      subject: "API Rate Limiting Issue",
      status: "resolved",
      priority: "high",
      created: "2024-03-10",
      updated: "2024-03-11"
    },
    {
      id: "TKT-002",
      subject: "PDF Export Formatting",
      status: "in-progress",
      priority: "medium",
      created: "2024-03-09",
      updated: "2024-03-10"
    },
    {
      id: "TKT-003",
      subject: "Account Upgrade Question",
      status: "open",
      priority: "low",
      created: "2024-03-08",
      updated: "2024-03-08"
    }
  ];

  // Filtered FAQs
  const filteredFaqs = faqQuestions.filter(faq => {
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === "all" || faq.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Toggle FAQ expansion
  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  // Handle FAQ helpfulness
  const handleHelpful = (id, type) => {
    toast.success(`Thank you for your feedback!`);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Ticket submitted! We'll respond within 24 hours.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        priority: "medium",
        category: "general"
      });
      setIsSubmitting(false);
      setActiveTab("tickets");
    }, 1500);
  };

  // Handle chat message
  const handleChatSend = () => {
    if (!userMessage.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      text: userMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setUserMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help with that! Our AI supports multiple document formats including PDF, JPG, and PNG.",
        "For API issues, check our documentation or contact our support team.",
        "Your account details show you're on the Pro plan. Would you like to know about Enterprise features?"
      ];
      
      const aiResponse = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'resolved': return 'bg-green-500/20 text-green-400';
      case 'in-progress': return 'bg-blue-500/20 text-blue-400';
      case 'open': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'hard': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="p-2 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500"
              >
                <HelpCircle className="w-6 h-6 text-black" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-white">Support Center</h1>
                <p className="text-gray-400 text-sm">Get help with DocXtract</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:text-yellow-400"
                onClick={() => navigate("/dashboard")}
              >
                <ChevronRight className="w-4 h-4 mr-1" />
                Dashboard
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black"
                onClick={() => setActiveTab("contact")}
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero Search */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How can we <span className="text-yellow-400">help</span> you today?
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Search our knowledge base, browse FAQs, or contact our support team
          </p>
          
          <div className="max-w-3xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 py-6 bg-gray-800 border-gray-700 text-white placeholder-gray-500 text-lg"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setSearchQuery("")}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {[
                "How to get API key?",
                "Document formats",
                "Batch processing",
                "Expenditure reports"
              ].map((suggestion, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50"
                  onClick={() => setSearchQuery(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-800/50 p-1 rounded-lg">
                <TabsTrigger value="faq" className="data-[state=active]:bg-gray-700">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  FAQ
                </TabsTrigger>
                <TabsTrigger value="contact" className="data-[state=active]:bg-gray-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact
                </TabsTrigger>
                <TabsTrigger value="tickets" className="data-[state=active]:bg-gray-700">
                  <FileText className="w-4 h-4 mr-2" />
                  My Tickets
                </TabsTrigger>
              </TabsList>

              {/* FAQ Tab */}
              <TabsContent value="faq" className="space-y-6">
                {/* Category Filters */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-wrap gap-2">
                    {faqCategories.map((category) => (
                      <Button
                        key={category.id}
                        variant={filterCategory === category.id ? "default" : "outline"}
                        size="sm"
                        className={`${
                          filterCategory === category.id
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black"
                            : "border-gray-700 text-gray-400 hover:text-yellow-400"
                        }`}
                        onClick={() => setFilterCategory(category.id)}
                      >
                        {category.icon}
                        {category.label}
                        <Badge className="ml-2 bg-gray-700 text-gray-300">
                          {category.count}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* FAQ List */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {filteredFaqs.map((faq) => (
                    <motion.div
                      key={faq.id}
                      variants={itemAnimation}
                      className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={getDifficultyColor(faq.difficulty)}>
                              {faq.difficulty}
                            </Badge>
                            <Badge className="bg-gray-700/50 text-gray-300">
                              {faq.category}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold text-white">
                            {faq.question}
                          </h3>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-gray-400 text-sm">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{faq.helpful}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-400 text-sm">
                              <Clock className="w-4 h-4" />
                              <span>{faq.updated}</span>
                            </div>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                          expandedFaq === faq.id ? "rotate-180" : ""
                        }`} />
                      </button>
                      
                      <AnimatePresence>
                        {expandedFaq === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-gray-700"
                          >
                            <div className="p-6">
                              <p className="text-gray-300 mb-6">{faq.answer}</p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-gray-700 text-gray-400 hover:text-green-400 hover:border-green-400/50"
                                    onClick={() => handleHelpful(faq.id, "helpful")}
                                  >
                                    <ThumbsUp className="w-4 h-4 mr-2" />
                                    Helpful ({faq.helpful})
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-gray-700 text-gray-400 hover:text-red-400 hover:border-red-400/50"
                                    onClick={() => handleHelpful(faq.id, "unhelpful")}
                                  >
                                    <ThumbsDown className="w-4 h-4 mr-2" />
                                    Not Helpful ({faq.unhelpful})
                                  </Button>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-yellow-400 hover:text-yellow-300"
                                  onClick={() => {
                                    setActiveTab("contact");
                                    setFormData(prev => ({
                                      ...prev,
                                      subject: `Follow-up: ${faq.question}`,
                                      category: "general"
                                    }));
                                  }}
                                >
                                  Still need help?
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-12">
                    <HelpCircle className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Try different keywords or browse categories
                    </p>
                    <Button
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black"
                      onClick={() => {
                        setSearchQuery("");
                        setFilterCategory("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent value="contact" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact Form */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Contact Support</CardTitle>
                      <CardDescription className="text-gray-400">
                        We typically respond within 24 hours
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-gray-300">Your Name</Label>
                            <Input
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              placeholder="John Doe"
                              className="bg-gray-900 border-gray-700 text-white"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-gray-300">Email Address</Label>
                            <Input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              placeholder="john@example.com"
                              className="bg-gray-900 border-gray-700 text-white"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-gray-300">Subject</Label>
                          <Input
                            value={formData.subject}
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                            placeholder="Brief description of your issue"
                            className="bg-gray-900 border-gray-700 text-white"
                            required
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-gray-300">Priority</Label>
                            <select
                              value={formData.priority}
                              onChange={(e) => setFormData({...formData, priority: e.target.value})}
                              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white"
                            >
                              <option value="low">Low - General question</option>
                              <option value="medium">Medium - Feature request</option>
                              <option value="high">High - Urgent issue</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-gray-300">Category</Label>
                            <select
                              value={formData.category}
                              onChange={(e) => setFormData({...formData, category: e.target.value})}
                              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white"
                            >
                              <option value="general">General Inquiry</option>
                              <option value="technical">Technical Issue</option>
                              <option value="billing">Billing</option>
                              <option value="api">API Support</option>
                              <option value="feature">Feature Request</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-gray-300">Message</Label>
                          <Textarea
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            placeholder="Please describe your issue in detail..."
                            className="min-h-[150px] bg-gray-900 border-gray-700 text-white"
                            required
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <Switch
                            id="attach-logs"
                            className="data-[state=checked]:bg-yellow-500"
                          />
                          <Label htmlFor="attach-logs" className="text-gray-300 text-sm">
                            Include diagnostic logs (recommended for technical issues)
                          </Label>
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                              Submitting...
                            </div>
                          ) : (
                            "Submit Ticket"
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Support Options */}
                  <div className="space-y-6">
                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">Other Ways to Get Help</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          {
                            title: "Community Forum",
                            description: "Get help from other users",
                            icon: <Users className="w-5 h-5" />,
                            action: "Browse Forum"
                          },
                          {
                            title: "Documentation",
                            description: "Detailed guides and API reference",
                            icon: <BookOpen className="w-5 h-5" />,
                            action: "View Docs",
                            onClick: () => navigate("/docs")
                          },
                          {
                            title: "Video Tutorials",
                            description: "Step-by-step video guides",
                            icon: <Video className="w-5 h-5" />,
                            action: "Watch Videos"
                          },
                          {
                            title: "Status Page",
                            description: "Check system status and uptime",
                            icon: <Server className="w-5 h-5" />,
                            action: "Check Status"
                          }
                        ].map((option, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                            <div className="flex items-center gap-4">
                              <div className="p-2 rounded-lg bg-gray-800">
                                {option.icon}
                              </div>
                              <div>
                                <h4 className="font-semibold text-white">{option.title}</h4>
                                <p className="text-gray-400 text-sm">{option.description}</p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-700 text-gray-400 hover:text-yellow-400"
                              onClick={option.onClick}
                            >
                              {option.action}
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Live Support Hours */}
                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-yellow-400" />
                            <div>
                              <h4 className="font-semibold text-white">Support Hours</h4>
                              <p className="text-gray-400 text-sm">24/7 for Enterprise plans</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {[
                              { day: "Mon-Fri", hours: "9:00 AM - 6:00 PM EST", available: true },
                              { day: "Saturday", hours: "10:00 AM - 4:00 PM EST", available: true },
                              { day: "Sunday", hours: "Emergency support only", available: false }
                            ].map((schedule, i) => (
                              <div key={i} className="flex items-center justify-between">
                                <span className="text-gray-300">{schedule.day}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-400">{schedule.hours}</span>
                                  {schedule.available ? (
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                  ) : (
                                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Tickets Tab */}
              <TabsContent value="tickets" className="space-y-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-white">My Support Tickets</CardTitle>
                      <CardDescription className="text-gray-400">
                        Track your support requests
                      </CardDescription>
                    </div>
                    <Button
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black"
                      onClick={() => setActiveTab("contact")}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      New Ticket
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentTickets.map((ticket) => (
                        <div key={ticket.id} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-gray-800">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h4 className="font-semibold text-white">{ticket.subject}</h4>
                                <Badge className={getStatusColor(ticket.status)}>
                                  {ticket.status}
                                </Badge>
                                <Badge className={getPriorityColor(ticket.priority)}>
                                  {ticket.priority} priority
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-400">
                                <span>Created: {ticket.created}</span>
                                <span>Updated: {ticket.updated}</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-400 hover:text-yellow-400"
                          >
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Support Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        </div>
                        <p className="text-2xl font-bold text-white">24h</p>
                        <p className="text-gray-400 text-sm">Avg Response Time</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                          <Star className="w-6 h-6 text-blue-400" />
                        </div>
                        <p className="text-2xl font-bold text-white">98%</p>
                        <p className="text-gray-400 text-sm">Satisfaction Rate</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-3">
                          <Clock className="w-6 h-6 text-yellow-400" />
                        </div>
                        <p className="text-2xl font-bold text-white">45m</p>
                        <p className="text-gray-400 text-sm">Avg Resolution Time</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Popular Articles */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                  Popular Articles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {popularArticles.map((article) => (
                  <div key={article.id} className="flex items-start gap-4 p-3 hover:bg-gray-900/30 rounded-lg transition-colors cursor-pointer">
                    <div className="p-2 rounded-lg bg-gray-900">
                      {article.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm mb-1">{article.title}</h4>
                      <p className="text-gray-400 text-xs mb-2">{article.description}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <Clock className="w-3 h-3" />
                          {article.time}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <Users className="w-3 h-3" />
                          {article.reads} reads
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-gray-400 hover:text-yellow-400"
                  onClick={() => navigate("/docs")}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  View All Articles
                </Button>
              </CardContent>
            </Card>

            {/* Support Team */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-yellow-400" />
                  Support Team
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Meet our support experts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportAgents.map((agent) => (
                  <div key={agent.id} className="flex items-center gap-4 p-3 bg-gray-900/50 rounded-lg">
                    <Avatar>
                      <AvatarFallback className={`${
                        agent.available ? 'bg-green-900/30 text-green-400' : 'bg-gray-900 text-gray-400'
                      }`}>
                        {agent.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-white">{agent.name}</h4>
                        {agent.available && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-green-400 text-xs">Online</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{agent.role}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-gray-300 text-xs">{agent.rating}</span>
                        <span className="text-gray-500 text-xs">•</span>
                        <span className="text-gray-500 text-xs">{agent.responses} responses</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-yellow-400/10 via-gray-800/50 to-orange-500/10 border border-yellow-400/20">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                  <h3 className="font-bold text-white mb-2">Need Immediate Help?</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Try our AI assistant for quick answers
                  </p>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black mb-3"
                  onClick={() => setShowChat(true)}
                >
                  <Bot className="w-4 h-4 mr-2" />
                  Chat with AI Assistant
                </Button>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-700 text-gray-400 hover:text-yellow-400"
                    onClick={() => window.open('mailto:support@docxtract.com')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-700 text-gray-400 hover:text-yellow-400"
                    onClick={() => window.open('tel:+1-800-123-4567')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Server className="w-5 h-5 text-yellow-400" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { service: "API Service", status: "operational", uptime: "99.9%" },
                  { service: "Document Processing", status: "operational", uptime: "99.8%" },
                  { service: "Dashboard", status: "operational", uptime: "99.9%" },
                  { service: "Database", status: "degraded", uptime: "98.5%" }
                ].map((service, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">{service.service}</span>
                      <Badge className={
                        service.status === 'operational' 
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }>
                        {service.status}
                      </Badge>
                    </div>
                    <Progress value={parseFloat(service.uptime)} className="h-2" />
                    <div className="text-right mt-1">
                      <span className="text-gray-500 text-sm">Uptime: {service.uptime}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* AI Chat Assistant */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 w-96 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI Assistant</h3>
                  <p className="text-gray-400 text-sm">Online • Powered by Llama</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
                onClick={() => setShowChat(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {chatMessages.length === 0 ? (
                <div className="text-center py-8">
                  <Sparkles className="w-12 h-12 text-yellow-400/50 mx-auto mb-4" />
                  <h4 className="font-semibold text-white mb-2">Hi! I'm your AI Assistant</h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Ask me anything about DocXtract. I can help with:
                  </p>
                  <div className="space-y-2">
                    {[
                      "How do I extract data from PDFs?",
                      "What's the API rate limit?",
                      "How to view expenditure reports?"
                    ].map((suggestion, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start border-gray-700 text-gray-400 hover:text-yellow-400"
                        onClick={() => setUserMessage(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black'
                        : 'bg-gray-700 text-white'
                    }`}>
                      <p>{msg.text}</p>
                      <div className="text-xs mt-1 opacity-70">
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <Input
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 bg-gray-900 border-gray-700 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                />
                <Button
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black"
                  onClick={handleChatSend}
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}