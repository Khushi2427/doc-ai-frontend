import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Star,
  ThumbsUp,
  Bug,
  Lightbulb,
  Rocket,
  User,
  Mail,
  FileText,
  Send,
  CheckCircle,
  Clock,
  Award,
  Sparkles,
  Heart,
  Zap,
  HelpCircle,
  ChevronRight,
  TrendingUp,
  Users,
  AlertCircle,
  Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-hot-toast";

export default function Feedback() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "feedback",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Feedback categories
  const feedbackTypes = [
    { id: "feedback", label: "General Feedback", icon: <MessageSquare className="w-4 h-4" />, color: "from-blue-400 to-cyan-400" },
    { id: "bug", label: "Bug Report", icon: <Bug className="w-4 h-4" />, color: "from-red-400 to-pink-400" },
    { id: "feature", label: "Feature Request", icon: <Lightbulb className="w-4 h-4" />, color: "from-purple-400 to-indigo-400" },
    { id: "praise", label: "Praise", icon: <Award className="w-4 h-4" />, color: "from-yellow-400 to-orange-400" }
  ];

  // Recent feedback (mock data)
  const recentFeedback = [
    {
      id: 1,
      user: "Alex Chen",
      type: "feature",
      title: "Batch processing for invoices",
      message: "Would love to see batch upload for multiple invoices at once",
      rating: 5,
      votes: 24,
      date: "2 days ago"
    },
    {
      id: 2,
      user: "Sarah Miller",
      type: "bug",
      title: "Dark mode improvements",
      message: "Some buttons are hard to see in dark mode",
      rating: 4,
      votes: 18,
      date: "4 days ago"
    },
    {
      id: 3,
      user: "Mike Johnson",
      type: "praise",
      title: "Amazing API documentation",
      message: "The API docs are incredibly thorough and helpful!",
      rating: 5,
      votes: 42,
      date: "1 week ago"
    }
  ];

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  // Handle rating click
  const handleRatingClick = (value) => {
    setRating(value);
  };

  // Handle feedback submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.message.trim()) {
      toast.error("Please provide your feedback");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Thank you for your feedback! We appreciate it. 🎉");
    setShowSuccess(true);
    
    // Reset form
    setForm({
      name: "",
      email: "",
      type: "feedback",
      message: "",
    });
    setRating(0);

    setTimeout(() => {
      setShowSuccess(false);
      setIsSubmitting(false);
    }, 2000);
  };

  // Vote on feedback item
  const handleVote = (id) => {
    toast.success("Vote counted! Thank you.");
  };

  // Get type icon
  const getTypeIcon = (type) => {
    return feedbackTypes.find(t => t.id === type)?.icon || <MessageSquare className="w-4 h-4" />;
  };

  // Get type color
  const getTypeColor = (type) => {
    return feedbackTypes.find(t => t.id === type)?.color || "from-blue-400 to-cyan-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Feedback</h1>
                <p className="text-gray-400 text-sm">Share your thoughts with us</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={() => navigate("/dashboard")}
              >
                <ChevronRight className="w-4 h-4 mr-1" />
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Moon className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              We value your{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                feedback
              </span>
            </h1>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Help us improve DocXtract by sharing your thoughts, reporting issues, or suggesting new features.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-800 bg-gray-900/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-yellow-500" />
                  Share Your Feedback
                </CardTitle>
                {showSuccess && (
                  <div className="mt-4 p-3 bg-green-900/20 border border-green-800/50 rounded-lg">
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Thank you! Your feedback has been submitted.</span>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Rating */}
                  <div className="space-y-4">
                    <Label className="text-gray-300">How would you rate your experience?</Label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingClick(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 transform hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-8 h-8 transition-all duration-200 ${
                              star <= (hoverRating || rating)
                                ? "fill-yellow-400 text-yellow-400 drop-shadow-lg"
                                : "text-gray-700"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    {rating > 0 && (
                      <p className="text-gray-400 text-sm">
                        You rated us <span className="text-yellow-400 font-semibold">{rating} out of 5 stars</span>
                      </p>
                    )}
                  </div>

                  {/* Feedback Type */}
                  <div className="space-y-2">
                    <Label className="text-gray-300">Type of feedback</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {feedbackTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => handleInputChange("type", type.id)}
                          className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                            form.type === type.id
                              ? `border-gray-600 bg-gradient-to-br ${type.color}/20 backdrop-blur-sm`
                              : "border-gray-800 bg-gray-900/50 hover:bg-gray-800/50 hover:border-gray-700"
                          }`}
                        >
                          <div className={`p-2 rounded-full bg-gradient-to-br ${type.color} bg-opacity-20`}>
                            <div className={`text-white`}>
                              {type.icon}
                            </div>
                          </div>
                          <span className="text-sm font-medium text-gray-200">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        <User className="w-4 h-4 inline mr-2" />
                        Your Name (Optional)
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-yellow-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email (Optional)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-yellow-500"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-300">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Your Feedback
                    </Label>
                    <Textarea
                      id="message"
                      placeholder={
                        form.type === "bug" 
                          ? "Please describe the issue in detail..."
                          : form.type === "feature"
                          ? "Tell us about your feature idea..."
                          : "Share your thoughts, suggestions, or experiences..."
                      }
                      value={form.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="min-h-[150px] bg-gray-800 border-gray-700 text-white placeholder-gray-500 resize-none focus:border-yellow-500"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || !form.message.trim()}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Submit Feedback
                        {rating > 0 && <span className="ml-2">⭐ {rating}/5</span>}
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Community Feedback */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-yellow-500" />
                Recent Community Feedback
              </h2>
              <div className="space-y-4">
                {recentFeedback.map((feedback) => (
                  <Card key={feedback.id} className="border border-gray-800 bg-gray-900/50 hover:bg-gray-900/70 transition-colors duration-200">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${getTypeColor(feedback.type)}/20`}>
                            {getTypeIcon(feedback.type)}
                          </div>
                          <div>
                            <h3 className="font-bold text-white">{feedback.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-gray-400 text-sm">{feedback.user}</span>
                              <span className="text-gray-600">•</span>
                              <span className="text-gray-500 text-sm">{feedback.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < feedback.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-700"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4">{feedback.message}</p>
                      
                      <div className="flex items-center justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-yellow-400 hover:bg-gray-800"
                          onClick={() => handleVote(feedback.id)}
                        >
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          Upvote ({feedback.votes})
                        </Button>
                        <span className="text-xs text-gray-500">Click to vote</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Info & Stats */}
          <div className="space-y-6">
            {/* Tips Card */}
            <Card className="border border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Tips for Great Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Be specific and provide examples",
                  "Include steps to reproduce bugs",
                  "Share your use case context",
                  "Suggest solutions if possible",
                  "One idea per feedback request"
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 group hover:bg-gray-800/30 p-2 rounded-lg transition-colors">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                    <p className="text-gray-400 text-sm group-hover:text-gray-300">{tip}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="border border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-yellow-500" />
                  Our Feedback Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Total Feedback Received", value: "1,245", color: "text-yellow-400" },
                  { label: "Features Implemented", value: "89", color: "text-green-400" },
                  { label: "Average Response Time", value: "2.4 days", color: "text-blue-400" },
                  { label: "Community Votes", value: "4,892", color: "text-purple-400" }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-800/30 rounded-lg transition-colors">
                    <span className="text-gray-400 text-sm">{stat.label}</span>
                    <span className={`font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Roadmap Preview */}
            <Card className="border border-gray-800 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-yellow-500" />
                  What We're Working On
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { feature: "Mobile App", votes: 156 },
                  { feature: "Custom AI Models", votes: 89 },
                  { feature: "Advanced Analytics", votes: 112 }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-800/30 rounded-lg transition-colors">
                    <span className="text-gray-300">{item.feature}</span>
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-yellow-500/50" />
                      <span className="text-gray-400 text-sm">{item.votes}</span>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full mt-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-600"
                  onClick={() => navigate("/roadmap")}
                >
                  View Full Roadmap
                </Button>
              </CardContent>
            </Card>

            {/* Thank You Card */}
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-900/30 shadow-xl">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">Thank You! 💛</h3>
                <p className="text-gray-400 text-sm">
                  Every piece of feedback helps us improve DocXtract for everyone.
                </p>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start border-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-700"
                onClick={() => navigate("/docs")}
              >
                <FileText className="w-4 h-4 mr-2" />
                Documentation
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-700"
                onClick={() => navigate("/queries")}
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Support Center
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900/80 border-t border-gray-800 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Need immediate help?{" "}
              <Button
                variant="link"
                className="text-yellow-500 hover:text-yellow-400 p-0 h-auto"
                onClick={() => navigate("/queries")}
              >
                Visit Support Center
              </Button>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}