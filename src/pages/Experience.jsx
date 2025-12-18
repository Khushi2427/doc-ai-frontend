import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  TrendingUp,
  Users,
  Clock,
  Shield,
  Globe,
  BarChart3,
  Star,
  Heart,
  Target,
  Rocket,
  Award,
  Trophy,
  Medal,
  Crown,
  CheckCircle,
  XCircle,
  Loader2,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Bell,
  Gift,
  Coffee,
  Compass,
  Palette,
  Smartphone,
  Monitor,
  Tablet,
  PieChart,
  LineChart,
  Activity,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Grid,
  List,
  Layout,
  Mail,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  BookOpen,
  Video,
  FileText,
  Database,
  Server,
  Cpu,
  Brain,
  Cloud,
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  HelpCircle,
  ExternalLink,
  User,
  UserPlus,
  LogOut,
  CreditCard,
  Wallet,
  Receipt,
  Calendar,
  History,
  CalendarDays,
  BellRing,
  Key,
  FileKey,
  Layers,
  Workflow,
  GitBranch,
  GitPullRequest,
  GitCommit,
  Terminal,
  Code,
  Brackets,
  Parentheses,
  Braces,
  Command,
  Lightbulb,
  Target as TargetIcon,
  TrendingUp as TrendingUpIcon,
  Settings as SettingsIcon,
  Globe as GlobeIcon,
  Clock as ClockIcon,
  Shield as ShieldIcon,
  Database as DatabaseIcon,
  Cpu as CpuIcon,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast";

export default function Experience() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [theme, setTheme] = useState("dark");
  const [animations, setAnimations] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [performanceMode, setPerformanceMode] = useState("balanced");
  const [fontSize, setFontSize] = useState([16]);
  const [contrast, setContrast] = useState([50]);
  const [saturation, setSaturation] = useState([50]);
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [activeDemo, setActiveDemo] = useState("dashboard");
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [demoProgress, setDemoProgress] = useState(0);
  const [userStats, setUserStats] = useState({
    efficiency: 78,
    accuracy: 92,
    speed: 65,
    satisfaction: 88
  });
  const [customization, setCustomization] = useState({
    sidebarPosition: "left",
    density: "comfortable",
    colorScheme: "amber",
    roundedCorners: "medium"
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // User activity data
  const userActivity = [
    { time: "9:00 AM", action: "Logged in", duration: "8h 15m", device: "Desktop" },
    { time: "10:30 AM", action: "Uploaded invoices", count: 12, size: "48 MB" },
    { time: "11:45 AM", action: "Processed documents", count: 8, accuracy: "98.7%" },
    { time: "2:15 PM", action: "Generated reports", count: 3, type: "Expenditure" },
    { time: "4:30 PM", action: "API calls made", count: 245, endpoint: "/v1/process" },
    { time: "5:45 PM", action: "Dashboard accessed", views: 12, duration: "45m" }
  ];

  // Efficiency metrics
  const efficiencyMetrics = [
    { metric: "Time Saved", value: "42h", change: "+15%", icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />, color: "text-blue-400" },
    { metric: "Documents Processed", value: "1,248", change: "+28%", icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />, color: "text-green-400" },
    { metric: "Accuracy Rate", value: "99.2%", change: "+2.4%", icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" />, color: "text-yellow-400" },
    { metric: "Cost Saved", value: "$2,450", change: "+32%", icon: <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />, color: "text-emerald-400" }
  ];

  // Personalization options
  const themes = [
    { id: "dark", name: "Dark", description: "Default dark theme", icon: "🌙" },
    { id: "light", name: "Light", description: "Clean light theme", icon: "☀️" },
    { id: "auto", name: "Auto", description: "Follow system theme", icon: "🔄" },
    { id: "amber", name: "Amber", description: "Warm amber theme", icon: "🎨" },
    { id: "blue", name: "Blue", description: "Cool blue theme", icon: "🔵" }
  ];

  const colorSchemes = [
    { id: "amber", name: "Amber", color: "bg-gradient-to-r from-amber-500 to-orange-500" },
    { id: "blue", name: "Blue", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
    { id: "emerald", name: "Emerald", color: "bg-gradient-to-r from-emerald-500 to-green-500" },
    { id: "violet", name: "Violet", color: "bg-gradient-to-r from-violet-500 to-purple-500" },
    { id: "rose", name: "Rose", color: "bg-gradient-to-r from-rose-500 to-pink-500" }
  ];

  const layoutOptions = [
    { id: "compact", name: "Compact", description: "More content, less space", icon: <Grid className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: "comfortable", name: "Comfortable", description: "Balanced spacing", icon: <Layout className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: "spacious", name: "Spacious", description: "Ample breathing room", icon: <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" /> }
  ];

  // Demo scenarios
  const demos = [
    { 
      id: "dashboard", 
      name: "Dashboard", 
      description: "Explore main dashboard features",
      duration: "2:30",
      steps: 5
    },
    { 
      id: "upload", 
      name: "Upload", 
      description: "Upload and process documents",
      duration: "1:45",
      steps: 3
    },
    { 
      id: "api", 
      name: "API", 
      description: "Integrate with our API",
      duration: "3:15",
      steps: 4
    },
    { 
      id: "reports", 
      name: "Reports", 
      description: "Generate expenditure reports",
      duration: "2:00",
      steps: 3
    }
  ];

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

  // Handle demo playback
  useEffect(() => {
    let interval;
    if (isPlayingDemo) {
      interval = setInterval(() => {
        setDemoProgress(prev => {
          if (prev >= 100) {
            setIsPlayingDemo(false);
            toast.success("Demo completed!");
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlayingDemo]);

  const toggleDemo = () => {
    setIsPlayingDemo(!isPlayingDemo);
  };

  const resetDemo = () => {
    setIsPlayingDemo(false);
    setDemoProgress(0);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme}`);
  };

  const handleCustomizationChange = (key, value) => {
    setCustomization(prev => ({ ...prev, [key]: value }));
    toast.success(`${key.replace(/([A-Z])/g, ' $1')} updated`);
  };

  const handleExportSettings = () => {
    const settings = {
      theme,
      animations,
      soundEffects,
      hapticFeedback,
      autoSave,
      notifications,
      performanceMode,
      fontSize: fontSize[0],
      contrast: contrast[0],
      saturation: saturation[0],
      language,
      timezone,
      dateFormat,
      customization
    };
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'docxtract-settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Settings exported successfully!");
  };

  const handleImportSettings = () => {
    toast.info("Import feature would open file picker");
  };

  const resetToDefaults = () => {
    setTheme("dark");
    setAnimations(true);
    setSoundEffects(false);
    setHapticFeedback(true);
    setAutoSave(true);
    setNotifications(true);
    setPerformanceMode("balanced");
    setFontSize([16]);
    setContrast([50]);
    setSaturation([50]);
    setLanguage("en");
    setTimezone("UTC");
    setDateFormat("MM/DD/YYYY");
    setCustomization({
      sidebarPosition: "left",
      density: "comfortable",
      colorScheme: "amber",
      roundedCorners: "medium"
    });
    
    toast.success("Reset to default settings");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
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
                    <Sparkles className="w-6 h-6 text-black" />
                  </div>
                  <h1 className="text-xl font-bold text-white">Experience</h1>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                {["overview", "appearance", "preferences", "accessibility"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left p-4 rounded-lg ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30"
                        : "bg-gray-800/50 hover:bg-gray-800"
                    }`}
                  >
                    <span className="font-medium capitalize">{tab}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-4 mt-8">
                <Button
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-4"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleExportSettings();
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Settings
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-white py-4"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/dashboard");
                  }}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500"
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
              </motion.div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white">User Experience</h1>
                <p className="text-gray-400 text-xs sm:text-sm hidden sm:block">Customize and optimize your workflow</p>
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
            <div className="hidden md:flex items-center gap-2 sm:gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:text-yellow-400 text-xs sm:text-sm"
                onClick={() => navigate("/dashboard")}
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Dashboard
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black text-xs sm:text-sm"
                onClick={handleExportSettings}
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
        {/* Stats Overview */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mb-6 sm:mb-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {efficiencyMetrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={itemAnimation}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-700 p-3 sm:p-4 md:p-6"
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
                  <div className={`p-1.5 sm:p-2 md:p-3 rounded-lg ${metric.color} bg-opacity-20`}>
                    {metric.icon}
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 text-xs sm:text-sm">
                    {metric.change}
                  </Badge>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-0.5 sm:mb-1">{metric.value}</h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base">{metric.metric}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Customization */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4 sm:mb-6 md:mb-8 bg-gray-800/50 p-0.5 sm:p-1 rounded-md sm:rounded-lg text-xs sm:text-sm">
                <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700 py-2 sm:py-3">
                  <Compass className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="truncate">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="appearance" className="data-[state=active]:bg-gray-700 py-2 sm:py-3">
                  <Palette className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="truncate">Appearance</span>
                </TabsTrigger>
                <TabsTrigger value="preferences" className="data-[state=active]:bg-gray-700 py-2 sm:py-3">
                  <SettingsIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="truncate">Preferences</span>
                </TabsTrigger>
                <TabsTrigger value="accessibility" className="data-[state=active]:bg-gray-700 py-2 sm:py-3">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="truncate">Accessibility</span>
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4 sm:space-y-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-white text-lg sm:text-xl">Your Experience Dashboard</CardTitle>
                    <CardDescription className="text-gray-400 text-sm sm:text-base">
                      Track and optimize your workflow efficiency
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 sm:space-y-6">
                      {/* Performance Metrics */}
                      <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-base sm:text-lg font-semibold text-white">Performance Metrics</h3>
                        {[
                          { label: "Efficiency", value: userStats.efficiency, color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
                          { label: "Accuracy", value: userStats.accuracy, color: "bg-gradient-to-r from-green-500 to-emerald-500" },
                          { label: "Speed", value: userStats.speed, color: "bg-gradient-to-r from-yellow-500 to-orange-500" },
                          { label: "Satisfaction", value: userStats.satisfaction, color: "bg-gradient-to-r from-purple-500 to-pink-500" }
                        ].map((metric, index) => (
                          <div key={index} className="space-y-1.5 sm:space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-300 text-sm sm:text-base">{metric.label}</span>
                              <span className="font-semibold text-white text-sm sm:text-base">{metric.value}%</span>
                            </div>
                            <Progress value={metric.value} className="h-1.5 sm:h-2" />
                          </div>
                        ))}
                      </div>

                      {/* Recent Activity */}
                      <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-base sm:text-lg font-semibold text-white">Recent Activity</h3>
                        <div className="space-y-2 sm:space-y-3">
                          {userActivity.slice(0, 4).map((activity, index) => (
                            <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-900/30 rounded-lg border border-gray-700">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="p-1.5 sm:p-2 rounded-lg bg-gray-800">
                                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h4 className="font-medium text-white text-sm sm:text-base truncate">{activity.action}</h4>
                                  <p className="text-gray-400 text-xs sm:text-sm truncate">
                                    {activity.time} • {activity.device || activity.type}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-white text-sm sm:text-base">
                                  {activity.count || activity.duration || activity.accuracy}
                                </p>
                                <p className="text-gray-400 text-xs sm:text-sm truncate">
                                  {activity.size || activity.views || "Completed"}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                        <Button
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:text-yellow-400 h-auto py-2 sm:py-3 text-xs sm:text-sm"
                          onClick={() => setActiveTab("appearance")}
                        >
                          <Palette className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          <span className="truncate">Customize Theme</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:text-yellow-400 h-auto py-2 sm:py-3 text-xs sm:text-sm"
                          onClick={() => setActiveTab("accessibility")}
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          <span className="truncate">Accessibility</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Appearance Tab */}
              <TabsContent value="appearance" className="space-y-4 sm:space-y-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-white text-lg sm:text-xl">Theme & Colors</CardTitle>
                    <CardDescription className="text-gray-400 text-sm sm:text-base">
                      Choose how DocXtract looks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    {/* Theme Selection */}
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-base sm:text-lg font-semibold text-white">Select Theme</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                        {themes.map((themeOption) => (
                          <button
                            key={themeOption.id}
                            onClick={() => handleThemeChange(themeOption.id)}
                            className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border-2 text-center transition-all ${
                              theme === themeOption.id
                                ? "border-yellow-400 bg-yellow-400/10"
                                : "border-gray-700 hover:border-gray-600"
                            }`}
                          >
                            <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{themeOption.icon}</div>
                            <h4 className="font-semibold text-white text-xs sm:text-sm md:text-base">{themeOption.name}</h4>
                            <p className="text-gray-400 text-xs sm:text-xs md:text-sm mt-0.5 sm:mt-1 line-clamp-2">{themeOption.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color Scheme */}
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-base sm:text-lg font-semibold text-white">Accent Color</h3>
                      <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                        {colorSchemes.map((scheme) => (
                          <button
                            key={scheme.id}
                            onClick={() => handleCustomizationChange("colorScheme", scheme.id)}
                            className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg ${scheme.color} border-2 ${
                              customization.colorScheme === scheme.id
                                ? "border-white ring-1 sm:ring-2 ring-white ring-offset-1 sm:ring-offset-2 ring-offset-gray-800"
                                : "border-transparent"
                            }`}
                            title={scheme.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Layout Options */}
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-base sm:text-lg font-semibold text-white">Layout Density</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                        {layoutOptions.map((layout) => (
                          <button
                            key={layout.id}
                            onClick={() => handleCustomizationChange("density", layout.id)}
                            className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border-2 text-center transition-all ${
                              customization.density === layout.id
                                ? "border-yellow-400 bg-yellow-400/10"
                                : "border-gray-700 hover:border-gray-600"
                            }`}
                          >
                            <div className="flex justify-center mb-1 sm:mb-2">
                              <div className="p-1 sm:p-2 rounded-lg bg-gray-800">
                                {layout.icon}
                              </div>
                            </div>
                            <h4 className="font-semibold text-white text-xs sm:text-sm md:text-base">{layout.name}</h4>
                            <p className="text-gray-400 text-xs sm:text-xs md:text-sm mt-0.5 sm:mt-1 line-clamp-2">{layout.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sidebar Position */}
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-base sm:text-lg font-semibold text-white">Sidebar Position</h3>
                      <div className="flex flex-wrap gap-2">
                        {["left", "right", "top", "hidden"].map((position) => (
                          <Button
                            key={position}
                            variant={customization.sidebarPosition === position ? "default" : "outline"}
                            size="sm"
                            className={`text-xs sm:text-sm ${
                              customization.sidebarPosition === position
                                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black"
                                : "border-gray-700 text-gray-400 hover:text-yellow-400"
                            }`}
                            onClick={() => handleCustomizationChange("sidebarPosition", position)}
                          >
                            {position.charAt(0).toUpperCase() + position.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences" className="space-y-4 sm:space-y-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-white text-lg sm:text-xl">Preferences</CardTitle>
                    <CardDescription className="text-gray-400 text-sm sm:text-base">
                      Configure your workflow preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    {/* Toggles */}
                    <div className="space-y-4 sm:space-y-6">
                      {[
                        { label: "Enable Animations", description: "Smooth transitions and effects", state: animations, setter: setAnimations },
                        { label: "Sound Effects", description: "Audio feedback for actions", state: soundEffects, setter: setSoundEffects },
                        { label: "Haptic Feedback", description: "Vibration feedback on mobile", state: hapticFeedback, setter: setHapticFeedback },
                        { label: "Auto-save", description: "Automatically save your work", state: autoSave, setter: setAutoSave },
                        { label: "Notifications", description: "Receive updates and alerts", state: notifications, setter: setNotifications }
                      ].map((pref, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="space-y-0.5 sm:space-y-1">
                            <Label className="text-white text-sm sm:text-base">{pref.label}</Label>
                            <p className="text-gray-400 text-xs sm:text-sm">{pref.description}</p>
                          </div>
                          <Switch
                            checked={pref.state}
                            onCheckedChange={pref.setter}
                            className="data-[state=checked]:bg-yellow-500 scale-90 sm:scale-100"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Performance Mode */}
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-base sm:text-lg font-semibold text-white">Performance Mode</h3>
                      <Select value={performanceMode} onValueChange={setPerformanceMode}>
                        <SelectTrigger className="bg-gray-900 border-gray-700 text-white text-sm sm:text-base">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="power-saver" className="text-white text-sm sm:text-base">
                            <div className="flex items-center gap-2">
                              <Battery className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                              Power Saver
                            </div>
                          </SelectItem>
                          <SelectItem value="balanced" className="text-white text-sm sm:text-base">
                            <div className="flex items-center gap-2">
                              <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                              Balanced
                            </div>
                          </SelectItem>
                          <SelectItem value="performance" className="text-white text-sm sm:text-base">
                            <div className="flex items-center gap-2">
                              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                              Performance
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Language & Region */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-base sm:text-lg font-semibold text-white">Language</h3>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger className="bg-gray-900 border-gray-700 text-white text-sm sm:text-base">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="en" className="text-white text-sm sm:text-base">English</SelectItem>
                            <SelectItem value="es" className="text-white text-sm sm:text-base">Español</SelectItem>
                            <SelectItem value="fr" className="text-white text-sm sm:text-base">Français</SelectItem>
                            <SelectItem value="de" className="text-white text-sm sm:text-base">Deutsch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-base sm:text-lg font-semibold text-white">Timezone</h3>
                        <Select value={timezone} onValueChange={setTimezone}>
                          <SelectTrigger className="bg-gray-900 border-gray-700 text-white text-sm sm:text-base">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="UTC" className="text-white text-sm sm:text-base">UTC</SelectItem>
                            <SelectItem value="EST" className="text-white text-sm sm:text-base">EST</SelectItem>
                            <SelectItem value="PST" className="text-white text-sm sm:text-base">PST</SelectItem>
                            <SelectItem value="CET" className="text-white text-sm sm:text-base">CET</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Accessibility Tab */}
              <TabsContent value="accessibility" className="space-y-4 sm:space-y-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-white text-lg sm:text-xl">Accessibility</CardTitle>
                    <CardDescription className="text-gray-400 text-sm sm:text-base">
                      Make DocXtract work better for you
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    {/* Visual Adjustments */}
                    <div className="space-y-4 sm:space-y-6">
                      {[
                        { label: "Font Size", value: fontSize[0], setter: setFontSize, min: 12, max: 24, step: 1 },
                        { label: "Contrast", value: contrast[0], setter: setContrast, min: 0, max: 100, step: 1 },
                        { label: "Saturation", value: saturation[0], setter: setSaturation, min: 0, max: 100, step: 1 }
                      ].map((slider, index) => (
                        <div key={index} className="space-y-2 sm:space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-white text-sm sm:text-base">{slider.label}</Label>
                            <span className="text-gray-300 font-mono text-sm sm:text-base">
                              {slider.value}{slider.label === "Font Size" ? "px" : "%"}
                            </span>
                          </div>
                          <Slider
                            value={[slider.value]}
                            onValueChange={slider.setter}
                            min={slider.min}
                            max={slider.max}
                            step={slider.step}
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Keyboard Shortcuts */}
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-base sm:text-lg font-semibold text-white">Keyboard Shortcuts</h3>
                      <div className="space-y-1.5 sm:space-y-2">
                        {[
                          { key: "Ctrl/Cmd + K", action: "Open command palette" },
                          { key: "Ctrl/Cmd + S", action: "Save document" },
                          { key: "Ctrl/Cmd + U", action: "Upload file" },
                          { key: "Ctrl/Cmd + D", action: "Open dashboard" },
                          { key: "Ctrl/Cmd + /", action: "Show shortcuts" }
                        ].map((shortcut, index) => (
                          <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-3 bg-gray-900/30 rounded-lg">
                            <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-800 rounded text-xs sm:text-sm font-mono text-gray-300 mb-1 sm:mb-0">
                              {shortcut.key}
                            </kbd>
                            <span className="text-gray-300 text-xs sm:text-sm">{shortcut.action}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Screen Reader */}
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-base sm:text-lg font-semibold text-white">Screen Reader Support</h3>
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-white text-sm sm:text-base">Enhanced ARIA Labels</Label>
                            <p className="text-gray-400 text-xs sm:text-sm">Improved screen reader descriptions</p>
                          </div>
                          <Switch className="data-[state=checked]:bg-yellow-500 scale-90 sm:scale-100" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-white text-sm sm:text-base">Focus Indicators</Label>
                            <p className="text-gray-400 text-xs sm:text-sm">Highlight focused elements</p>
                          </div>
                          <Switch className="data-[state=checked]:bg-yellow-500 scale-90 sm:scale-100" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Interactive Demo */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="mt-4 sm:mt-6 md:mt-8"
            >
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-white text-lg sm:text-xl flex items-center gap-2">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                    Interactive Demo
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm sm:text-base">
                    Experience DocXtract features in action
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 sm:space-y-6">
                    {/* Demo Selection */}
                    <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 sm:pb-4 scrollbar-thin">
                      {demos.map((demo) => (
                        <Button
                          key={demo.id}
                          variant={activeDemo === demo.id ? "default" : "outline"}
                          size="sm"
                          className={`whitespace-nowrap text-xs sm:text-sm ${
                            activeDemo === demo.id
                              ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black"
                              : "border-gray-700 text-gray-400 hover:text-yellow-400"
                          }`}
                          onClick={() => {
                            setActiveDemo(demo.id);
                            resetDemo();
                          }}
                        >
                          {demo.name}
                        </Button>
                      ))}
                    </div>

                    {/* Demo Preview */}
                    <div className="bg-gray-900 rounded-lg sm:rounded-xl border border-gray-700 p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
                        <div className="mb-2 sm:mb-0">
                          <h3 className="font-semibold text-white text-sm sm:text-base">
                            {demos.find(d => d.id === activeDemo)?.name}
                          </h3>
                          <p className="text-gray-400 text-xs sm:text-sm line-clamp-2">
                            {demos.find(d => d.id === activeDemo)?.description}
                          </p>
                        </div>
                        <Badge className="bg-gray-700 text-gray-300 text-xs sm:text-sm self-start sm:self-center">
                          {demos.find(d => d.id === activeDemo)?.duration}
                        </Badge>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-xs sm:text-sm">Progress</span>
                          <span className="text-gray-300 font-mono text-xs sm:text-sm">{demoProgress}%</span>
                        </div>
                        <Progress value={demoProgress} className="h-1.5 sm:h-2" />
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-700 text-gray-400 hover:text-yellow-400 h-8 w-8 sm:h-10 sm:w-10"
                          onClick={resetDemo}
                        >
                          <SkipBack className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <Button
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
                          onClick={toggleDemo}
                        >
                          {isPlayingDemo ? (
                            <>
                              <Pause className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              <span className="hidden sm:inline">Pause</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              <span className="hidden sm:inline">Play Demo</span>
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-700 text-gray-400 hover:text-yellow-400 h-8 w-8 sm:h-10 sm:w-10"
                          onClick={() => setDemoProgress(100)}
                        >
                          <SkipForward className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* User Profile */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <Avatar className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16">
                    <AvatarFallback className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-lg sm:text-xl">
                      UX
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-white text-sm sm:text-base md:text-lg truncate">Experience Settings</h3>
                    <p className="text-gray-400 text-xs sm:text-sm truncate">Personalized for you</p>
                    <Badge className="mt-1 sm:mt-2 bg-yellow-500/20 text-yellow-400 text-xs">
                      <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                      Premium
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-gray-300 hover:text-yellow-400 justify-start py-2 sm:py-3 text-xs sm:text-sm"
                    onClick={handleExportSettings}
                  >
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Export Settings</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-gray-300 hover:text-yellow-400 justify-start py-2 sm:py-3 text-xs sm:text-sm"
                    onClick={handleImportSettings}
                  >
                    <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Import Settings</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-red-400 hover:text-red-300 hover:border-red-400/50 justify-start py-2 sm:py-3 text-xs sm:text-sm"
                    onClick={resetToDefaults}
                  >
                    <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Reset to Defaults</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-white text-sm sm:text-base md:text-lg">Your Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 md:space-y-4">
                {[
                  { label: "Documents Processed", value: "1,248", icon: <FileText className="w-3 h-3 sm:w-4 sm:h-4" /> },
                  { label: "Time Saved", value: "42h", icon: <Clock className="w-3 h-3 sm:w-4 sm:h-4" /> },
                  { label: "Cost Saved", value: "$2,450", icon: <Wallet className="w-3 h-3 sm:w-4 sm:h-4" /> },
                  { label: "Accuracy Rate", value: "99.2%", icon: <Target className="w-3 h-3 sm:w-4 sm:h-4" /> }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-900/30 rounded-lg">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="p-1 sm:p-2 rounded-lg bg-gray-800 flex-shrink-0">
                        {stat.icon}
                      </div>
                      <span className="text-gray-300 text-xs sm:text-sm truncate">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-white text-xs sm:text-sm md:text-base flex-shrink-0 ml-2">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tips & Tricks */}
            <Card className="bg-gradient-to-br from-yellow-400/10 via-gray-800/50 to-orange-500/10 border border-yellow-400/20">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-white text-sm sm:text-base md:text-lg flex items-center gap-2">
                  <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-400" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 md:space-y-4">
                {[
                  "Use keyboard shortcuts for faster navigation",
                  "Enable auto-save to never lose your work",
                  "Customize your theme for better readability",
                  "Use batch processing for multiple documents",
                  "Schedule reports during off-peak hours"
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 sm:mt-2 flex-shrink-0" />
                    <p className="text-gray-300 text-xs sm:text-sm">{tip}</p>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full mt-2 sm:mt-3 md:mt-4 border-yellow-400/50 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 py-2 sm:py-3 text-xs sm:text-sm"
                  onClick={() => navigate("/docs")}
                >
                  <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="truncate">Learn More Tips</span>
                </Button>
              </CardContent>
            </Card>

            {/* Feedback */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-white text-sm sm:text-base md:text-lg">Share Feedback</CardTitle>
                <CardDescription className="text-gray-400 text-xs sm:text-sm">
                  Help us improve your experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black py-2 sm:py-3 text-xs sm:text-sm"
                  onClick={() => navigate("/feedback")}
                >
                  <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="truncate">Submit Feedback</span>
                </Button>
                <div className="flex gap-1 sm:gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-gray-700 text-gray-400 hover:text-green-400 hover:border-green-400/50 text-xs sm:text-sm"
                  >
                    <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Like
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-gray-700 text-gray-400 hover:text-red-400 hover:border-red-400/50 text-xs sm:text-sm"
                  >
                    <ThumbsDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Dislike
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-gray-400 hover:text-yellow-400 py-2 sm:py-3 text-xs sm:text-sm"
                  onClick={() => navigate("/queries")}
                >
                  <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="truncate">Get Help</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}