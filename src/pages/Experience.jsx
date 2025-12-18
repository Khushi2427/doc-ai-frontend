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
  // Add missing imports
  Lightbulb,
  Target as TargetIcon,
  TrendingUp as TrendingUpIcon,
  Settings as SettingsIcon,
  Globe as GlobeIcon,
  Clock as ClockIcon,
  Shield as ShieldIcon,
  Database as DatabaseIcon,
  Cpu as CpuIcon
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
    { metric: "Time Saved", value: "42h", change: "+15%", icon: <Clock className="w-5 h-5" />, color: "text-blue-400" },
    { metric: "Documents Processed", value: "1,248", change: "+28%", icon: <FileText className="w-5 h-5" />, color: "text-green-400" },
    { metric: "Accuracy Rate", value: "99.2%", change: "+2.4%", icon: <Target className="w-5 h-5" />, color: "text-yellow-400" },
    { metric: "Cost Saved", value: "$2,450", change: "+32%", icon: <Wallet className="w-5 h-5" />, color: "text-emerald-400" }
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
    { id: "compact", name: "Compact", description: "More content, less space", icon: <Grid className="w-5 h-5" /> },
    { id: "comfortable", name: "Comfortable", description: "Balanced spacing", icon: <Layout className="w-5 h-5" /> },
    { id: "spacious", name: "Spacious", description: "Ample breathing room", icon: <Maximize2 className="w-5 h-5" /> }
  ];

  // Demo scenarios
  const demos = [
    { 
      id: "dashboard", 
      name: "Dashboard Walkthrough", 
      description: "Explore the main dashboard features",
      duration: "2:30",
      steps: 5
    },
    { 
      id: "upload", 
      name: "Document Upload", 
      description: "Learn how to upload and process documents",
      duration: "1:45",
      steps: 3
    },
    { 
      id: "api", 
      name: "API Integration", 
      description: "See how to integrate with our API",
      duration: "3:15",
      steps: 4
    },
    { 
      id: "reports", 
      name: "Report Generation", 
      description: "Generate and analyze expenditure reports",
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
    // In a real app, this would open a file picker
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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="p-2 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500"
              >
                <Sparkles className="w-6 h-6 text-black" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-white">User Experience</h1>
                <p className="text-gray-400 text-sm">Customize and optimize your workflow</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:text-yellow-400"
                onClick={() => navigate("/dashboard")}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black"
                onClick={handleExportSettings}
              >
                <Download className="w-4 h-4 mr-1" />
                Export Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Overview */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {efficiencyMetrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={itemAnimation}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${metric.color} bg-opacity-20`}>
                    {metric.icon}
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">
                    {metric.change}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
                <p className="text-gray-400">{metric.metric}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Customization */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-800/50 p-1 rounded-lg">
                <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">
                  <Compass className="w-4 h-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="appearance" className="data-[state=active]:bg-gray-700">
                  <Palette className="w-4 h-4 mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="preferences" className="data-[state=active]:bg-gray-700">
                  <SettingsIcon className="w-4 h-4 mr-2" />
                  Preferences
                </TabsTrigger>
                <TabsTrigger value="accessibility" className="data-[state=active]:bg-gray-700">
                  <Eye className="w-4 h-4 mr-2" />
                  Accessibility
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Your Experience Dashboard</CardTitle>
                    <CardDescription className="text-gray-400">
                      Track and optimize your workflow efficiency
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Performance Metrics */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Performance Metrics</h3>
                        {[
                          { label: "Efficiency", value: userStats.efficiency, color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
                          { label: "Accuracy", value: userStats.accuracy, color: "bg-gradient-to-r from-green-500 to-emerald-500" },
                          { label: "Speed", value: userStats.speed, color: "bg-gradient-to-r from-yellow-500 to-orange-500" },
                          { label: "Satisfaction", value: userStats.satisfaction, color: "bg-gradient-to-r from-purple-500 to-pink-500" }
                        ].map((metric, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-300">{metric.label}</span>
                              <span className="font-semibold text-white">{metric.value}%</span>
                            </div>
                            <Progress value={metric.value} className="h-2" />
                          </div>
                        ))}
                      </div>

                      {/* Recent Activity */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                        <div className="space-y-3">
                          {userActivity.slice(0, 4).map((activity, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg border border-gray-700">
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-gray-800">
                                  <Clock className="w-4 h-4" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-white">{activity.action}</h4>
                                  <p className="text-gray-400 text-sm">{activity.time} • {activity.device || activity.type}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-white">
                                  {activity.count || activity.duration || activity.accuracy}
                                </p>
                                <p className="text-gray-400 text-sm">
                                  {activity.size || activity.views || "Completed"}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:text-yellow-400 h-auto py-4"
                          onClick={() => setActiveTab("appearance")}
                        >
                          <Palette className="w-5 h-5 mr-2" />
                          Customize Theme
                        </Button>
                        <Button
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:text-yellow-400 h-auto py-4"
                          onClick={() => setActiveTab("accessibility")}
                        >
                          <Eye className="w-5 h-5 mr-2" />
                          Accessibility Settings
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Appearance Tab */}
              <TabsContent value="appearance" className="space-y-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Theme & Colors</CardTitle>
                    <CardDescription className="text-gray-400">
                      Choose how DocXtract looks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Theme Selection */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Select Theme</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {themes.map((themeOption) => (
                          <button
                            key={themeOption.id}
                            onClick={() => handleThemeChange(themeOption.id)}
                            className={`p-4 rounded-xl border-2 text-center transition-all ${
                              theme === themeOption.id
                                ? "border-yellow-400 bg-yellow-400/10"
                                : "border-gray-700 hover:border-gray-600"
                            }`}
                          >
                            <div className="text-2xl mb-2">{themeOption.icon}</div>
                            <h4 className="font-semibold text-white">{themeOption.name}</h4>
                            <p className="text-gray-400 text-sm mt-1">{themeOption.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color Scheme */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Accent Color</h3>
                      <div className="flex gap-4">
                        {colorSchemes.map((scheme) => (
                          <button
                            key={scheme.id}
                            onClick={() => handleCustomizationChange("colorScheme", scheme.id)}
                            className={`w-12 h-12 rounded-lg ${scheme.color} border-2 ${
                              customization.colorScheme === scheme.id
                                ? "border-white ring-2 ring-white ring-offset-2 ring-offset-gray-800"
                                : "border-transparent"
                            }`}
                            title={scheme.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Layout Options */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Layout Density</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {layoutOptions.map((layout) => (
                          <button
                            key={layout.id}
                            onClick={() => handleCustomizationChange("density", layout.id)}
                            className={`p-4 rounded-xl border-2 text-center transition-all ${
                              customization.density === layout.id
                                ? "border-yellow-400 bg-yellow-400/10"
                                : "border-gray-700 hover:border-gray-600"
                            }`}
                          >
                            <div className="flex justify-center mb-2">
                              <div className="p-2 rounded-lg bg-gray-800">
                                {layout.icon}
                              </div>
                            </div>
                            <h4 className="font-semibold text-white">{layout.name}</h4>
                            <p className="text-gray-400 text-sm mt-1">{layout.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sidebar Position */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Sidebar Position</h3>
                      <div className="flex gap-4">
                        {["left", "right", "top", "hidden"].map((position) => (
                          <Button
                            key={position}
                            variant={customization.sidebarPosition === position ? "default" : "outline"}
                            className={`${
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
              <TabsContent value="preferences" className="space-y-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Preferences</CardTitle>
                    <CardDescription className="text-gray-400">
                      Configure your workflow preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Toggles */}
                    <div className="space-y-6">
                      {[
                        { label: "Enable Animations", description: "Smooth transitions and effects", state: animations, setter: setAnimations },
                        { label: "Sound Effects", description: "Audio feedback for actions", state: soundEffects, setter: setSoundEffects },
                        { label: "Haptic Feedback", description: "Vibration feedback on mobile", state: hapticFeedback, setter: setHapticFeedback },
                        { label: "Auto-save", description: "Automatically save your work", state: autoSave, setter: setAutoSave },
                        { label: "Notifications", description: "Receive updates and alerts", state: notifications, setter: setNotifications }
                      ].map((pref, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label className="text-white">{pref.label}</Label>
                            <p className="text-gray-400 text-sm">{pref.description}</p>
                          </div>
                          <Switch
                            checked={pref.state}
                            onCheckedChange={pref.setter}
                            className="data-[state=checked]:bg-yellow-500"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Performance Mode */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Performance Mode</h3>
                      <Select value={performanceMode} onValueChange={setPerformanceMode}>
                        <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="power-saver" className="text-white">
                            <div className="flex items-center gap-2">
                              <Battery className="w-4 h-4 text-green-400" />
                              Power Saver
                            </div>
                          </SelectItem>
                          <SelectItem value="balanced" className="text-white">
                            <div className="flex items-center gap-2">
                              <Activity className="w-4 h-4 text-yellow-400" />
                              Balanced
                            </div>
                          </SelectItem>
                          <SelectItem value="performance" className="text-white">
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-red-400" />
                              Performance
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Language & Region */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Language</h3>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="en" className="text-white">English</SelectItem>
                            <SelectItem value="es" className="text-white">Español</SelectItem>
                            <SelectItem value="fr" className="text-white">Français</SelectItem>
                            <SelectItem value="de" className="text-white">Deutsch</SelectItem>
                            <SelectItem value="ja" className="text-white">日本語</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Timezone</h3>
                        <Select value={timezone} onValueChange={setTimezone}>
                          <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="UTC" className="text-white">UTC</SelectItem>
                            <SelectItem value="EST" className="text-white">EST</SelectItem>
                            <SelectItem value="PST" className="text-white">PST</SelectItem>
                            <SelectItem value="CET" className="text-white">CET</SelectItem>
                            <SelectItem value="JST" className="text-white">JST</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Accessibility Tab */}
              <TabsContent value="accessibility" className="space-y-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Accessibility</CardTitle>
                    <CardDescription className="text-gray-400">
                      Make DocXtract work better for you
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Visual Adjustments */}
                    <div className="space-y-6">
                      {[
                        { label: "Font Size", value: fontSize[0], setter: setFontSize, min: 12, max: 24, step: 1 },
                        { label: "Contrast", value: contrast[0], setter: setContrast, min: 0, max: 100, step: 1 },
                        { label: "Saturation", value: saturation[0], setter: setSaturation, min: 0, max: 100, step: 1 }
                      ].map((slider, index) => (
                        <div key={index} className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-white">{slider.label}</Label>
                            <span className="text-gray-300 font-mono">{slider.value}{slider.label === "Font Size" ? "px" : "%"}</span>
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
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Keyboard Shortcuts</h3>
                      <div className="space-y-2">
                        {[
                          { key: "Ctrl/Cmd + K", action: "Open command palette" },
                          { key: "Ctrl/Cmd + S", action: "Save document" },
                          { key: "Ctrl/Cmd + U", action: "Upload file" },
                          { key: "Ctrl/Cmd + D", action: "Open dashboard" },
                          { key: "Ctrl/Cmd + /", action: "Show shortcuts" }
                        ].map((shortcut, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                            <kbd className="px-2 py-1 bg-gray-800 rounded text-sm font-mono text-gray-300">
                              {shortcut.key}
                            </kbd>
                            <span className="text-gray-300">{shortcut.action}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Screen Reader */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Screen Reader Support</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label className="text-white">Enhanced ARIA Labels</Label>
                            <p className="text-gray-400 text-sm">Improved screen reader descriptions</p>
                          </div>
                          <Switch className="data-[state=checked]:bg-yellow-500" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label className="text-white">Focus Indicators</Label>
                            <p className="text-gray-400 text-sm">Highlight focused elements</p>
                          </div>
                          <Switch className="data-[state=checked]:bg-yellow-500" defaultChecked />
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
              className="mt-8"
            >
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Play className="w-5 h-5 text-yellow-400" />
                    Interactive Demo
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Experience DocXtract features in action
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Demo Selection */}
                    <div className="flex gap-2 overflow-x-auto pb-4">
                      {demos.map((demo) => (
                        <Button
                          key={demo.id}
                          variant={activeDemo === demo.id ? "default" : "outline"}
                          className={`whitespace-nowrap ${
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
                    <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="font-semibold text-white">
                            {demos.find(d => d.id === activeDemo)?.name}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {demos.find(d => d.id === activeDemo)?.description}
                          </p>
                        </div>
                        <Badge className="bg-gray-700 text-gray-300">
                          {demos.find(d => d.id === activeDemo)?.duration}
                        </Badge>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Progress</span>
                          <span className="text-gray-300 font-mono">{demoProgress}%</span>
                        </div>
                        <Progress value={demoProgress} className="h-2" />
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-center gap-4">
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-700 text-gray-400 hover:text-yellow-400"
                          onClick={resetDemo}
                        >
                          <SkipBack className="w-4 h-4" />
                        </Button>
                        <Button
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-6"
                          onClick={toggleDemo}
                        >
                          {isPlayingDemo ? (
                            <>
                              <Pause className="w-4 h-4 mr-2" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Play Demo
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-700 text-gray-400 hover:text-yellow-400"
                          onClick={() => setDemoProgress(100)}
                        >
                          <SkipForward className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* User Profile */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xl">
                      UX
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-white">Experience Settings</h3>
                    <p className="text-gray-400 text-sm">Personalized for you</p>
                    <Badge className="mt-2 bg-yellow-500/20 text-yellow-400">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Premium Experience
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-gray-300 hover:text-yellow-400 justify-start"
                    onClick={handleExportSettings}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-gray-300 hover:text-yellow-400 justify-start"
                    onClick={handleImportSettings}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Import Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-red-400 hover:text-red-300 hover:border-red-400/50 justify-start"
                    onClick={resetToDefaults}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset to Defaults
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Your Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Documents Processed", value: "1,248", icon: <FileText className="w-4 h-4" /> },
                  { label: "Time Saved", value: "42h", icon: <Clock className="w-4 h-4" /> },
                  { label: "Cost Saved", value: "$2,450", icon: <Wallet className="w-4 h-4" /> },
                  { label: "Accuracy Rate", value: "99.2%", icon: <Target className="w-4 h-4" /> }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-800">
                        {stat.icon}
                      </div>
                      <span className="text-gray-300">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-white">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tips & Tricks */}
            <Card className="bg-gradient-to-br from-yellow-400/10 via-gray-800/50 to-orange-500/10 border border-yellow-400/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Use keyboard shortcuts for faster navigation",
                  "Enable auto-save to never lose your work",
                  "Customize your theme for better readability",
                  "Use batch processing for multiple documents",
                  "Schedule reports during off-peak hours"
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">{tip}</p>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full mt-4 border-yellow-400/50 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                  onClick={() => navigate("/docs")}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Learn More Tips
                </Button>
              </CardContent>
            </Card>

            {/* Feedback */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Share Feedback</CardTitle>
                <CardDescription className="text-gray-400">
                  Help us improve your experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black"
                  onClick={() => navigate("/feedback")}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Submit Feedback
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-700 text-gray-400 hover:text-green-400 hover:border-green-400/50"
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Like
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-700 text-gray-400 hover:text-red-400 hover:border-red-400/50"
                  >
                    <ThumbsDown className="w-4 h-4 mr-2" />
                    Dislike
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-gray-400 hover:text-yellow-400"
                  onClick={() => navigate("/queries")}
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Get Help
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}