"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Eye, EyeOff, Mail, Lock, Sparkles, Heart, ArrowRight } from "lucide-react";
import Navbar from "../navbar";
import Footer from "../footer";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      setSuccess(result.message || "Registration successful!");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-rose-100 overflow-hidden relative flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center p-4">
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
          <motion.div
            className="absolute top-1/3 right-1/4 w-28 h-28 bg-rose-200/20 rounded-full blur-2xl"
            variants={glowVariants}
            animate="animate"
            transition={{ delay: 1.5 }}
          />
        </div>

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
        <motion.div
          className="absolute top-1/4 left-1/3 text-pink-400/30"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 0.5 }}
        >
          <Heart className="h-10 w-10" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 right-1/3 text-rose-400/30"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1.2 }}
        >
          <Sparkles className="h-8 w-8" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-10 text-pink-300/50"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 0.8 }}
        >
          <Heart className="h-6 w-6" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 left-20 text-rose-300/50"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1.8 }}
        >
          <Sparkles className="h-7 w-7" />
        </motion.div>

        <motion.div
          className="relative z-10 w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30 relative overflow-hidden"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-pink-50/10 to-rose-100/10 rounded-3xl" />
            <div className="relative z-10">
              <motion.div className="text-center mb-8" variants={itemVariants}>
                <motion.div
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-100/80 to-rose-100/80 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-200/50 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="h-4 w-4 text-pink-500 animate-pulse" />
                  <span className="text-sm font-medium text-pink-700">CraftedWithLove</span>
                </motion.div>
                <motion.h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                  Create Your Account
                </motion.h1>
                <motion.p className="text-gray-600 mt-2" variants={itemVariants}>
                  Join our crafting community
                </motion.p>
              </motion.div>

              {error && (
                <motion.div
                  className="text-red-500 text-sm mb-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  className="text-green-500 text-sm mb-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {success}
                </motion.div>
              )}

              <motion.form onSubmit={handleSubmit} className="space-y-6" variants={itemVariants}>
                <motion.div className="relative" whileFocus={{ scale: 1.02 }} variants={itemVariants}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 pl-12 rounded-2xl bg-white/60 backdrop-blur-sm border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400">
                    <User className="h-5 w-5" />
                  </div>
                </motion.div>

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

                <motion.div className="relative" whileFocus={{ scale: 1.02 }} variants={itemVariants}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 pl-12 pr-12 rounded-2xl bg-white/60 backdrop-blur-sm border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </motion.button>
                </motion.div>

                <motion.div className="flex items-center text-sm" variants={itemVariants}>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-pink-300 text-pink-500 focus:ring-pink-500 focus:ring-2"
                    />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 overflow-hidden ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  whileHover={{
                    scale: isLoading ? 1 : 1.02,
                    boxShadow: isLoading ? "none" : "0 20px 40px rgba(0,0,0,0.2)",
                  }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  variants={itemVariants}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    {isLoading ? "Registering..." : "Register"}
                    {!isLoading && (
                      <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </motion.form>

              <motion.div className="text-center mt-6" variants={itemVariants}>
                <span className="text-gray-600">Already have an account? </span>
                <motion.a
                  href="/login"
                  className="text-pink-600 hover:text-pink-700 font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign in here
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

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

      <Footer />
    </div>
  );
};

export default RegisterPage;