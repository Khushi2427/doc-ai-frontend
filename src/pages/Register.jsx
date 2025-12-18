import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";


import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building,
  Shield,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowRight,
  Sparkles,
  UserPlus,
  AlertCircle,
  ChevronDown,
  BadgeCheck,
  Users
} from "lucide-react";


export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const register = useAuthStore((state) => state.register);

  // Password strength calculator
  useEffect(() => {
    const calculateStrength = (password) => {
      let strength = 0;
      if (password.length >= 8) strength += 1;
      if (/[A-Z]/.test(password)) strength += 1;
      if (/[0-9]/.test(password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;
      return strength;
    };

    setPasswordStrength(calculateStrength(form.password));
  }, [form.password]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    try {
      const res = await register(form.name, form.email, form.password, form.role);

      if (res.success) {
        toast.success("Registration successful! Welcome aboard! 🎉");
        
        // Add a success animation delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        toast.error(res.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (touched[field]) {
      validateForm();
    }
  };

  // Role options
  const roleOptions = [
    {
      value: "user",
      label: "Individual User",
      description: "Personal document processing",
      icon: <User className="w-5 h-5" />
    },
    {
      value: "business",
      label: "Business Account",
      description: "Team collaboration & API access",
      icon: <Building className="w-5 h-5" />
    },
    // {
    //   value: "admin",
    //   label: "Administrator",
    //   description: "System management access",
    //   icon: <Shield className="w-5 h-5" />
    // }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: "0 0 0 3px rgba(234, 179, 8, 0.2)" }
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 1: return "bg-red-500";
      case 2: return "bg-orange-500";
      case 3: return "bg-yellow-500";
      case 4: return "bg-green-500";
      default: return "bg-gray-700";
    }
  };

  const getStrengthText = (strength) => {
    switch (strength) {
      case 1: return "Very Weak";
      case 2: return "Weak";
      case 3: return "Good";
      case 4: return "Strong";
      default: return "Very Weak";
    }
  };

  // Demo registration
  const handleDemoRegistration = () => {
    setForm({
      name: "Demo User",
      email: "demo@docxtract.com",
      password: "DemoPass123!",
      role: "user",
      confirmPassword: "DemoPass123!"
    });
    toast.success("Demo credentials filled. Click Register to continue.");
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">


      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/20 rounded-full"
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-2xl"
      >
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-800 shadow-2xl overflow-hidden">
          {/* Header section */}
          <div className="bg-gradient-to-r from-yellow-400/10 via-black to-yellow-400/10 p-8 text-center border-b border-gray-800">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg">
                <UserPlus className="w-10 h-10 text-black" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Join DocXtract
                </h1>
                <p className="text-gray-400 mt-1">Start your journey with AI-powered document extraction</p>
              </div>
            </motion.div>
          </div>

          <div className="p-8">
            <motion.form
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Two column layout for larger screens */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name Input */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <div className="relative">
                    <motion.input
                      whileFocus="focus"
                      variants={inputVariants}
                      type="text"
                      placeholder="Enter your full name"
                      className={`w-full pl-4 pr-10 py-3 bg-gray-800 border ${
                        errors.name && touched.name ? "border-red-500" : "border-gray-700"
                      } rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors`}
                      value={form.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      disabled={isLoading}
                    />
                    {form.name && !errors.name && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </motion.div>
                    )}
                  </div>
                  <AnimatePresence>
                    {errors.name && touched.name && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Email Input */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <div className="relative">
                    <motion.input
                      whileFocus="focus"
                      variants={inputVariants}
                      type="email"
                      placeholder="you@example.com"
                      className={`w-full pl-4 pr-10 py-3 bg-gray-800 border ${
                        errors.email && touched.email ? "border-red-500" : "border-gray-700"
                      } rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors`}
                      value={form.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      disabled={isLoading}
                    />
                    {form.email && !errors.email && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        <BadgeCheck className="w-5 h-5 text-blue-500" />
                      </motion.div>
                    )}
                  </div>
                  <AnimatePresence>
                    {errors.email && touched.email && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Password Inputs */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Password Input */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <div className="relative">
                    <motion.input
                      whileFocus="focus"
                      variants={inputVariants}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className={`w-full pl-4 pr-12 py-3 bg-gray-800 border ${
                        errors.password && touched.password ? "border-red-500" : "border-gray-700"
                      } rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors`}
                      value={form.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      onBlur={() => handleBlur("password")}
                      disabled={isLoading}
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                  
                  {/* Password Strength Meter */}
                  {form.password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 space-y-2"
                    >
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Password strength:</span>
                        <span className={`font-semibold ${
                          passwordStrength === 1 ? "text-red-400" :
                          passwordStrength === 2 ? "text-orange-400" :
                          passwordStrength === 3 ? "text-yellow-400" : "text-green-400"
                        }`}>
                          {getStrengthText(passwordStrength)}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${passwordStrength * 25}%` }}
                          transition={{ duration: 0.3 }}
                          className={`h-full ${getStrengthColor(passwordStrength)} transition-all duration-300`}
                        />
                      </div>
                      
                      {/* Password Requirements */}
                      <div className="text-xs text-gray-500 space-y-1 mt-2">
                        <div className={`flex items-center gap-2 ${form.password.length >= 8 ? "text-green-400" : ""}`}>
                          {form.password.length >= 8 ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          <span>At least 8 characters</span>
                        </div>
                        <div className={`flex items-center gap-2 ${/[A-Z]/.test(form.password) ? "text-green-400" : ""}`}>
                          {/[A-Z]/.test(form.password) ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          <span>One uppercase letter</span>
                        </div>
                        <div className={`flex items-center gap-2 ${/[0-9]/.test(form.password) ? "text-green-400" : ""}`}>
                          {/[0-9]/.test(form.password) ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          <span>One number</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <AnimatePresence>
                    {errors.password && touched.password && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.password}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Confirm Password Input */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Confirm Password
                  </label>
                  <div className="relative">
                    <motion.input
                      whileFocus="focus"
                      variants={inputVariants}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className={`w-full pl-4 pr-12 py-3 bg-gray-800 border ${
                        errors.confirmPassword && touched.confirmPassword ? "border-red-500" : "border-gray-700"
                      } rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors`}
                      value={form.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      onBlur={() => handleBlur("confirmPassword")}
                      disabled={isLoading}
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                  {form.confirmPassword && form.password === form.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-green-400 text-sm mt-2 flex items-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Passwords match
                    </motion.p>
                  )}
                  <AnimatePresence>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.confirmPassword}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Role Selection */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Account Type
                </label>
                <div className="relative">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white flex items-center justify-between hover:border-yellow-400/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {roleOptions.find(r => r.value === form.role)?.icon}
                      <div className="text-left">
                        <div className="font-medium">
                          {roleOptions.find(r => r.value === form.role)?.label}
                        </div>
                        <div className="text-sm text-gray-400">
                          {roleOptions.find(r => r.value === form.role)?.description}
                        </div>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </motion.button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 w-full mt-2 bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-2xl"
                      >
                        {roleOptions.map((option) => (
                          <motion.button
                            key={option.value}
                            type="button"
                            whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.5)" }}
                            className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                              form.role === option.value ? "bg-yellow-400/10 text-yellow-400" : "text-gray-300"
                            }`}
                            onClick={() => {
                              setForm({ ...form, role: option.value });
                              setIsDropdownOpen(false);
                            }}
                          >
                            <div className={`p-2 rounded-lg ${
                              form.role === option.value ? "bg-yellow-400/20" : "bg-gray-700"
                            }`}>
                              {option.icon}
                            </div>
                            <div>
                              <div className="font-medium">{option.label}</div>
                              <div className="text-sm text-gray-400">{option.description}</div>
                            </div>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  You can change this later in your account settings
                </p>
              </motion.div>

              {/* Demo Registration Button */}
              <motion.div variants={itemVariants} className="text-center">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDemoRegistration}
                  className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-2 justify-center"
                >
                  <Sparkles className="w-4 h-4" />
                  Try Demo Registration
                </motion.button>
              </motion.div>

              {/* Terms and Conditions */}
              <motion.div variants={itemVariants} className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-400">
                  By creating an account, you agree to our{" "}
                  <button type="button" className="text-yellow-400 hover:text-yellow-300">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button type="button" className="text-yellow-400 hover:text-yellow-300">
                    Privacy Policy
                  </button>
                  . Your data is secure and encrypted.
                </p>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isLoading || Object.keys(errors).length > 0}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all relative ${
                    isLoading || Object.keys(errors).length > 0
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-2xl hover:shadow-yellow-400/30"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating Account...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Create Account
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </motion.button>
              </motion.div>

              {/* Login Link */}
              <motion.div variants={itemVariants} className="text-center pt-4 border-t border-gray-800">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/login")}
                    className="text-yellow-400 hover:text-yellow-300 font-semibold inline-flex items-center gap-1"
                  >
                    Sign In Now
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </p>
              </motion.div>
            </motion.form>
          </div>
        </div>

        {/* Floating benefits
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6"
        >
          {[
            { icon: <Shield className="w-4 h-4" />, text: "Secure & Encrypted" },
            { icon: <Sparkles className="w-4 h-4" />, text: "Free Trial" },
            { icon: <BadgeCheck className="w-4 h-4" />, text: "No Credit Card" }
          ].map((benefit, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-sm rounded-full border border-gray-700"
            >
              {benefit.icon}
              <span className="text-sm text-gray-300">{benefit.text}</span>
            </motion.div>
          ))}
        </motion.div> */}
      </motion.div>
    </div>
  );
}