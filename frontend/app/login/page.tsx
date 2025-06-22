"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Sparkles, Heart, ArrowRight } from "lucide-react";
import Navbar from "../navbar"; // Import from app/Navbar.tsx
import Footer from "../footer"; // Import from app/Footer.tsx

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-5, 5, -5],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
    alert("Login successful!");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-rose-100 overflow-hidden relative flex flex-col">
      <Navbar /> {/* Added Navbar at the top */}

      {/* Main Content (Centered Login Form) */}
      <div className="flex-grow flex items-center justify-center p-4">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl"
            variants={glowVariants}
            animate="animate"
          />
          <motion.div
            className="absolute bottom-20 right-20 w-40 h-40 bg-rose-200/30 rounded-full blur-3xl"
            variants={glowVariants}
            animate="animate"
            transition={{ delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-300/20 rounded-full blur-2xl"
            variants={glowVariants}
            animate="animate"
            transition={{ delay: 2 }}
          />
        </div>

        {/* Floating Decorative Elements */}
        <motion.div
          className="absolute top-16 right-16 text-pink-300/40"
          variants={floatingVariants}
          animate="animate"
        >
          <Heart className="h-8 w-8" />
        </motion.div>
        <motion.div
          className="absolute bottom-16 left-16 text-rose-300/40"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        >
          <Sparkles className="h-6 w-6" />
        </motion.div>

        {/* Main Login Container */}
        <motion.div
          className="relative z-10 w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Glass Card */}
          <motion.div
            className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30 relative overflow-hidden"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-pink-50/10 to-rose-100/10 rounded-3xl" />

            <div className="relative z-10">
              {/* Header */}
              <motion.div className="text-center mb-8" variants={itemVariants}>
                <motion.div
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-100/80 to-rose-100/80 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-200/50 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="h-4 w-4 text-pink-500 animate-pulse" />
                  <span className="text-sm font-medium text-pink-700">CraftedWithLove</span>
                </motion.div>

                <motion.h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                  Welcome Back
                </motion.h1>

                <motion.p className="text-gray-600 mt-2" variants={itemVariants}>
                  Sign in to your crafting account
                </motion.p>
              </motion.div>

              {/* Form */}
              <motion.form onSubmit={handleSubmit} className="space-y-6" variants={itemVariants}>
                <motion.div className="relative" whileFocus={{ scale: 1.02 }} variants={itemVariants}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 pl-12 rounded-2xl bg-white/60 backdrop-blur-sm border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400">
                    <Mail className="h-5 w-5" />
                  </div>
                </motion.div>

                <motion.div className="relative" whileFocus={{ scale: 1.02 }} variants={itemVariants}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 pl-12 pr-12 rounded-2xl bg-white/60 backdrop-blur-sm border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </motion.button>
                </motion.div>

                <motion.div className="flex items-center justify-between text-sm" variants={itemVariants}>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-pink-300 text-pink-500 focus:ring-pink-500 focus:ring-2"
                    />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <motion.a
                    href="#"
                    className="text-pink-600 hover:text-pink-700 font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    Forgot password?
                  </motion.a>
                </motion.div>

                <motion.button
                  type="submit"
                  className="group relative w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 overflow-hidden"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  variants={itemVariants}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Sign In</span>
                    <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </motion.form>

              {/* Register Link */}
              <motion.div className="text-center mt-6" variants={itemVariants}>
                <span className="text-gray-600">Don't have an account? </span>
                <motion.a
                  href="/register"
                  className="text-pink-600 hover:text-pink-700 font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create one here
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Decorative Text */}
          <motion.div className="text-center mt-8" variants={itemVariants}>
            <p className="text-gray-500 text-sm flex items-center justify-center space-x-1">
              <span>Made with</span>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                <Heart className="h-4 w-4 text-pink-500 fill-current" />
              </motion.div>
              <span>for crafters</span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      <Footer /> {/* Added Footer at the bottom */}
    </div>
  );
};

export default LoginPage;