import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight, 
  Loader2, 
  Shield, 
  Sparkles,
  User,
  AlertCircle,
  CheckCircle
} from "lucide-react";
const BACKEND_URL = import.meta.env.VITE_API_URL;
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const login = useAuthStore((state) => state.login);

  // Form validation
  useEffect(() => {
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };

    const isValidEmail = validateEmail(email);
    const isValidPassword = password.length >= 6;

    setEmailError(isValidEmail || email === "" ? "" : "Please enter a valid email");
    setPasswordError(isValidPassword || password === "" ? "" : "Password must be at least 6 characters");

    setIsFormValid(isValidEmail && isValidPassword);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await login(email, password);

      if (res.success) {
        toast.success("Login successful! Redirecting...");
        
        // Add a small delay for better UX
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // GOOGLE LOGIN HANDLER
  const handleGoogleSuccess = async (credentialResponse) => {
    setIsGoogleLoading(true);
    
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/auth/google`,
        { token: credentialResponse.credential },
        { withCredentials: true }
      );

      // Save login details in Zustand
      useAuthStore.getState().setAuth(res.data.user, res.data.token);

      toast.success("Google Login Successful!");
      
      // Add a small delay for better UX
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);

    } catch (err) {
      console.error(err);
      toast.error("Google login failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Demo account login
  const handleDemoLogin = () => {
    setEmail("demo@docxtract.com");
    setPassword("demopassword123");
    setIsFormValid(true);
    toast.success("Demo credentials filled. Click Login to continue.");
  };

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
      transition: { duration: 0.5 }
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: "0 0 0 2px rgba(234, 179, 8, 0.3)" }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/20 rounded-full"
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
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
        className="relative w-full max-w-md"
      >
        {/* Card with glass effect */}
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-800 shadow-2xl overflow-hidden">
          {/* Header section with gradient */}
          <div className="bg-gradient-to-r from-yellow-400/10 via-black to-yellow-400/10 p-8 text-center border-b border-gray-800">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500">
                <Sparkles className="w-8 h-8 text-black" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                DocXtract
              </h1>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white"
            >
              Welcome Back
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 mt-2"
            >
              Sign in to your account to continue
            </motion.p>
          </div>

          {/* Form section */}
          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-8 space-y-6"
          >
            {/* Email Input */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <motion.input
                  whileFocus="focus"
                  variants={inputVariants}
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full pl-12 pr-4 py-3 bg-gray-800 border ${
                    emailError ? "border-red-500" : "border-gray-700"
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading || isGoogleLoading}
                />
                {email && !emailError && (
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
                {emailError && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-400 text-sm mt-2 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {emailError}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Password Input */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </motion.button>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <motion.input
                  whileFocus="focus"
                  variants={inputVariants}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full pl-12 pr-12 py-3 bg-gray-800 border ${
                    passwordError ? "border-red-500" : "border-gray-700"
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading || isGoogleLoading}
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
              <AnimatePresence>
                {passwordError && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-400 text-sm mt-2 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {passwordError}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Remember Me & Demo Account */}
            <motion.div variants={itemVariants} className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-yellow-400 bg-gray-800 border-gray-700 rounded focus:ring-yellow-500 focus:ring-2"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDemoLogin}
                className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-1"
              >
                <User className="w-4 h-4" />
                Try Demo Account
              </motion.button>
            </motion.div>

            {/* Login Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={!isFormValid || isLoading || isGoogleLoading}
                whileHover={isFormValid ? { scale: 1.02 } : {}}
                whileTap={isFormValid ? { scale: 0.98 } : {}}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                  isFormValid && !isLoading
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-2xl hover:shadow-yellow-400/30"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </motion.button>
            </motion.div>

            {/* Divider */}
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900 text-gray-400">Or continue with</span>
              </div>
            </motion.div>

            {/* Google Login */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center"
            >
              <div className="relative">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error("Google login failed")}
                  theme="filled_black"
                  size="large"
                  shape="rectangular"
                  width="300"
                />
                {isGoogleLoading && (
                  <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center rounded-lg">
                    <Loader2 className="w-6 h-6 animate-spin text-yellow-400" />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Security Note */}
            <motion.div
              variants={itemVariants}
              className="p-4 bg-gray-800/50 rounded-xl border border-gray-700"
            >
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-400">
                  Your login is secure and encrypted. We never share your data with third parties.
                </p>
              </div>
            </motion.div>

            {/* Signup Link */}
            <motion.div variants={itemVariants} className="text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/register")}
                  className="text-yellow-400 hover:text-yellow-300 font-semibold inline-flex items-center gap-1"
                >
                  Create account
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </p>
            </motion.div>
          </motion.form>
        </div>

        {/* Floating security badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
        >
          {/* <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-sm rounded-full border border-gray-700">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">SSL Secured</span>
          </div> */}
        </motion.div>
      </motion.div>
    </div>
  );
}