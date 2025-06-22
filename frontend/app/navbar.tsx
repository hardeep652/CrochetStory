"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Animation variants for Framer Motion
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.nav
      className="bg-white/80 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-white/20"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Animation */}
          <motion.div className="flex items-center space-x-2 group cursor-pointer" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <div className="relative">
              <Heart className="h-8 w-8 text-pink-500 group-hover:text-pink-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent group-hover:from-pink-700 group-hover:to-rose-600 transition-all duration-300">
              CraftedWithLove
            </span>
          </motion.div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <motion.div className="flex items-center space-x-8 bg-white/40 backdrop-blur-lg rounded-full px-6 py-2 border border-white/30" variants={itemVariants}>
              <Link href="/" className="relative text-gray-700 hover:text-pink-600 font-medium transition-all duration-300 group">
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-pink-100/50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
              <Link href="/products" className="relative text-gray-700 hover:text-pink-600 font-medium transition-all duration-300 group">
                <span className="relative z-10">Products</span>
                <div className="absolute inset-0 bg-pink-100/50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
              <Link href="/contact" className="relative text-gray-700 hover:text-pink-600 font-medium transition-all duration-300 group">
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-pink-100/50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
            </motion.div>
          </div>
{/* Auth Buttons - Right Side */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/login">
              <motion.div
                className="relative text-pink-600 hover:text-pink-700 font-medium transition-all duration-300 px-4 py-2 rounded-full group overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 to-rose-100/50 backdrop-blur-sm scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
              </motion.div>
            </Link>
            <Link href="/register">
              <motion.div
                className="relative bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl group overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Register</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-pink-600 transition-colors p-2 rounded-full hover:bg-pink-100/50 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation with Glassmorphism */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white/90 backdrop-blur-xl border-t border-white/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-4 py-3 text-gray-700 hover:text-pink-600 font-medium rounded-xl hover:bg-pink-50/80 backdrop-blur-sm transition-all duration-300">Home</Link>
              <Link href="/products" className="block px-4 py-3 text-gray-700 hover:text-pink-600 font-medium rounded-xl hover:bg-pink-50/80 backdrop-blur-sm transition-all duration-300">Products</Link>
              <Link href="/contact" className="block px-4 py-3 text-gray-700 hover:text-pink-600 font-medium rounded-xl hover:bg-pink-50/80 backdrop-blur-sm transition-all duration-300">Contact</Link>
              <div className="px-4 py-2 space-y-2">
                <Link href="/login">
                  <motion.div
                    className="block w-full text-left text-pink-600 hover:text-pink-700 font-medium px-4 py-3 rounded-xl hover:bg-pink-50/80 backdrop-blur-sm transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login
                  </motion.div>
                </Link>
                <Link href="/register">
                  <motion.div
                    className="block w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-3 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}