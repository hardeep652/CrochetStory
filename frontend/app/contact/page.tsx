"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Sparkles, Phone, Mail, MapPin, Send } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Navbar from "../navbar";
import Footer from "../footer";

const Contact = () => {
  // Animation variants for Framer Motion
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const glowVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 0.3,
      scale: 1.2,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact/sendinquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Message sent!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Submission error:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-rose-100 overflow-x-hidden relative">
      {/* Subtle Crochet Background */}
      <div
        className="absolute inset-0 opacity-10 bg-repeat bg-[url('/crochet-pattern.png')] bg-cover bg-fixed z-0"
        style={{ backgroundSize: "500px 500px" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-pink-50/50 to-rose-100/50 z-0"></div>

      <Navbar />

      {/* Contact Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 left-20 w-24 h-24 bg-pink-200/20 rounded-full blur-2xl"
            variants={glowVariants}
            initial="hidden"
            animate="visible"
          ></motion.div>
          <motion.div
            className="absolute bottom-20 right-10 w-32 h-32 bg-rose-200/20 rounded-full blur-3xl"
            variants={glowVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          ></motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-100/80 to-rose-100/80 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-200/50"
              variants={itemVariants}
            >
              <Sparkles className="h-4 w-4 text-pink-500 animate-pulse" />
              <span className="text-sm font-medium text-pink-700">Get in Touch</span>
            </motion.div>
            <motion.h1
              className="text-4xl lg:text-6xl font-bold text-gray-900"
              variants={itemVariants}
            >
              <span>Connect with</span>
              <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent block">
                CrochetStory
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Have questions or custom order ideas? Reach out, and let’s create something special!
            </motion.p>
          </motion.div>

          <motion.div
            className="mt-16 grid md:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Contact Form */}
            <motion.div
              className="bg-white/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/30"
              variants={itemVariants}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-3 rounded-lg bg-white/80 border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                    placeholder="Your Name"
                    required
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-3 rounded-lg bg-white/80 border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                    placeholder="Your Email"
                    required
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-3 rounded-lg bg-white/80 border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 resize-y"
                    placeholder="Your Message"
                    rows={4}
                    required
                    whileFocus={{ scale: 1.01 }}
                  ></motion.textarea>
                </div>
                <motion.button
                  type="submit"
                  className="group relative w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              variants={itemVariants}
            >
              <motion.div
                className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/30"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: Phone, text: "+91 7265924325" },
                    { icon: Mail, text: "crochetstory@gmail.com" },
                    { icon: MapPin, text: "Ahmedabad, India" },
                  ].map((contact, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 group"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="p-2 bg-pink-100/80 rounded-full"
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      >
                        <contact.icon className="h-5 w-5 text-pink-500" />
                      </motion.div>
                      <span className="text-gray-600 group-hover:text-pink-600 transition-colors duration-300">
                        {contact.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="text-center"
                variants={itemVariants}
              >
                <Link href="/products/all">
                  <motion.button
                    className="group relative bg-white/90 backdrop-blur-sm text-pink-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300 border border-pink-200/50 overflow-hidden"
                    whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <Heart className="h-4 w-4" />
                      <span>Explore Our Products</span>
                    </span>
                    <div className="absolute inset-0 bg-pink-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;