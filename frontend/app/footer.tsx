"use client";

import React from "react";
import Link from "next/link";
import { Heart, Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Footer() {
  return (
    <footer className="relative bg-gray-900/95 backdrop-blur-xl text-white py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div className="space-y-4" initial="hidden" animate="visible" variants={itemVariants}>
            <div className="flex items-center space-x-2 group cursor-pointer">
              <Heart className="h-6 w-6 text-pink-500 group-hover:text-pink-400 transition-colors duration-300 group-hover:scale-110" />
              <span className="text-xl font-bold group-hover:text-pink-100 transition-colors duration-300">CrochetStory</span>
            </div>
            <p className="text-gray-400">
              Handcrafted crochet treasures made with love and care in India.
            </p>
          </motion.div>

          {[
            {
              title: "Quick Links",
              links: [
                { name: "Home", href: "/" },
                { name: "Products", href: "/products" },
                { name: "Contact", href: "/contact" },
              ],
            },
            {
              title: "Categories",
              links: [
                { name: "Gift Articles", href: "/products/gift-articles" },
                { name: "Hair Accessories", href: "/products/hair-accessories" },
                { name: "Home Decor", href: "/products/home-decor" },
                { name: "Others", href: "/products/others" },
              ],
            },
          ].map((section, index) => (
            <motion.div
              key={index}
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{ delay: (index + 1) * 0.2 }}
            >
              <h3 className="font-semibold text-pink-200">{section.title}</h3>
              <div className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={link.href}
                    className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 hover:text-pink-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            transition={{ delay: 0.6 }}
          >
            <h3 className="font-semibold text-pink-200">Contact Info</h3>
            <div className="space-y-3">
              {[
                { icon: Phone, text: "+91 72659 24325" },
                { icon: Mail, text: "crochetstory@gmail.com" },
                { icon: MapPin, text: "Ahmedabad, Gujarat, India" },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <contact.icon className="h-4 w-4 text-pink-500 group-hover:text-pink-400 transition-colors duration-300" />
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                    {contact.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-gray-800/50 backdrop-blur-sm mt-12 pt-8 text-center"
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          transition={{ delay: 0.8 }}
        >
          <p className="text-gray-400">
            © 2025 CrochetStory. Made with ❤️ for handmade creations. All prices in ₹.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
