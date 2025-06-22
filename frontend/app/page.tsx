"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Heart, Star, ArrowRight, Phone, Mail, MapPin, Sparkles, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface FilteredSliderProps {
  children: React.ReactNode;
  [key: string]: any;
}

const FilteredSlider: React.FC<FilteredSliderProps> = ({ children, ...props }) => {
  const filteredProps = { ...props };
  delete filteredProps.currentSlide;
  delete filteredProps.slideCount;
  return <Slider {...filteredProps}>{children}</Slider>;
};

export default function CrochetHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const floatVariants = {
    animate: (i: number) => ({
      y: [-8, 8, -8],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        y: { repeat: Infinity, duration: 3.5, delay: i * 0.4 },
        opacity: { repeat: Infinity, duration: 3.5, delay: i * 0.4 },
      },
    }),
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 slides to create the "behind each other" effect
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: true,
    centerMode: true,
    centerPadding: '0px',
    focusOnSelect: true,
    prevArrow: (
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-pink-500/80 hover:bg-pink-500 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm border-2 border-white/30">
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    ),
    nextArrow: (
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-pink-500/80 hover:bg-pink-500 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm border-2 border-white/30">
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    ),
  };

  const crochetProducts = [
    { image: "/crochet1.jpg" },
    { image: "/crochet2.jpg" },
    { image: "/crochet3.jpg" },
    { image: "/crochet4.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-rose-100 overflow-x-hidden relative">
      <div className="absolute inset-0 opacity-10 bg-repeat bg-[url('/crochet-pattern.png')] bg-cover bg-fixed z-0" style={{ backgroundSize: '500px 500px' }}></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-pink-50/50 to-rose-100/50 z-0"></div>

      <motion.nav
        className="bg-white/80 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-white/20"
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div className="flex items-center space-x-2 group cursor-pointer" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <div className="relative">
                <Heart className="h-8 w-8 text-pink-500 group-hover:text-pink-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent group-hover:from-pink-700 group-hover:to-rose-600 transition-all duration-300">
                CraftedWithLove
              </span>
            </motion.div>

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

            <div className="hidden md:flex items-center space-x-3">
              <Link href="/login">
                <motion.div
                  className="relative text-pink-600 hover:text-pink-700 font-medium transition-all duration-300 px-4 py-2 rounded-full group overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Login</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 to-rose-100/50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </motion.div>
              </Link>
              <Link href="/register">
                <motion.div
                  className="relative bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 font-semibold hover:scale-105 group overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Register</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              </Link>
            </div>

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

      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-pink-200/30 rounded-full blur-xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ repeat: Infinity, duration: 4 }}
          ></motion.div>
          <motion.div
            className="absolute top-40 right-20 w-32 h-32 bg-rose-200/20 rounded-full blur-2xl"
            animate={{ y: [-10, 10, -10], opacity: [0.2, 0.4, 0.2] }}
            transition={{ repeat: Infinity, duration: 3 }}
          ></motion.div>
          <motion.div
            className="absolute bottom-20 left-1/4 w-16 h-16 bg-purple-200/40 rounded-full blur-lg"
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ repeat: Infinity, duration: 5, delay: 1 }}
          ></motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative h-28 mb-8 flex flex-col items-center justify-center space-y-2">
            <motion.div
              className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent"
              custom={0}
              animate="animate"
              variants={floatVariants}
            >
              Crafted with Passion
            </motion.div>
            <motion.div
              className="text-2xl font-semibold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent"
              custom={1}
              animate="animate"
              variants={floatVariants}
            >
              Timeless Crochet Art
            </motion.div>
            <motion.div
              className="absolute top-2 left-1/4 text-lg opacity-50"
              custom={2}
              animate="animate"
              variants={floatVariants}
            >
              ❤️
            </motion.div>
            <motion.div
              className="absolute top-4 right-1/4 text-lg opacity-50"
              custom={3}
              animate="animate"
              variants={floatVariants}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute top-8 left-1/3 text-lg opacity-50"
              custom={4}
              animate="animate"
              variants={floatVariants}
            >
              🧶
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <div className="carousel-container">
              <FilteredSlider {...carouselSettings}>
                {crochetProducts.map((product, index) => (
                  <motion.div
                    key={index}
                    className="relative slide-item"
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative w-[500px] h-[500px] bg-gradient-to-br from-pink-100/80 to-rose-100/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/30 shadow-2xl flex items-center justify-center">
                      <Image
                        src={product.image}
                        alt="Crochet Product"
                        width={500}
                        height={500}
                        className="w-[500px] h-[500px] object-cover"
                        onError={(e) => { e.currentTarget.src = "/placeholder-crochet.jpg"; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <Link href="/products">
                          <motion.button
                            className="group relative bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-xl overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="relative z-10 flex items-center space-x-2">
                              <span>Explore Now</span>
                              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </FilteredSlider>
            </div>
          </motion.div>
        </div>

        <style jsx global>{`
          .carousel-container {
            position: relative;
            width: 100%;
            height: 600px;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: visible !important;
          }
          .slick-slider {
            width: 100%;
            height: 600px;
          }
          .slick-list {
            overflow: visible !important;
            height: 600px !important;
          }
          .slick-track {
            display: flex !important;
            align-items: center !important;
            height: 600px !important;
          }
          .slick-slide {
            transition: all 0.5s ease !important;
            opacity: 0.5 !important;
            transform: scale(0.8) !important;
            z-index: 1 !important;
            margin: 0 20px !important;
          }
          .slick-slide img {
            width: 500px !important;
            height: 500px !important;
            object-fit: cover !important;
          }
          .slick-slide.slick-center {
            opacity: 1 !important;
            transform: scale(1.5) !important; /* Expand to "cover the screen" */
            z-index: 10 !important;
          }
          .slick-slide:not(.slick-center) {
            transform: scale(0.8) translateX(0) !important; /* Slightly behind effect */
          }
          .slick-slide.slick-center ~ .slick-slide {
            transform: scale(0.8) translateX(50px) !important; /* Offset to the right */
          }
          .slick-slide:not(.slick-center):not(.slick-center ~ .slick-slide) {
            transform: scale(0.8) translateX(-50px) !important; /* Offset to the left */
          }
          .slick-dots {
            bottom: -40px !important;
          }
          .slick-dots li button:before {
            color: rgba(236, 72, 153, 0.6) !important;
            font-size: 12px !important;
          }
          .slick-dots li.slick-active button:before {
            color: rgba(236, 72, 153, 1) !important;
          }
        `}</style>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-50/30 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-pink-700 bg-clip-text text-transparent">
              Why Choose Our Crochet?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every piece is crafted with premium materials and years of expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Made with Love", desc: "Each piece is crafted with care and attention to every detail", delay: 0 },
              { icon: Star, title: "Premium Quality", desc: "Using only the finest yarns and materials for lasting beauty", delay: 0.2 },
              { icon: Gift, title: "Custom Orders", desc: "Personalized creations tailored to your specific needs", delay: 0.4 },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group"
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                transition={{ delay: feature.delay }}
              >
                <div className="relative text-center space-y-4 p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/30 hover:bg-white/80 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-100/40 to-rose-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  <div className="relative z-10">
                    <motion.div
                      className="bg-gradient-to-br from-pink-500 to-rose-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg"
                      whileHover={{ scale: 1.1 }}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-pink-700 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-500"></div>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
              Ready to Add Some Handmade Magic to Your Life?
            </h2>
            <p className="text-xl text-pink-100">
              Browse our collection or contact us for custom orders
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <motion.button
                  className="group relative bg-white/90 backdrop-blur-sm text-pink-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-white/30 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Browse Products</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  className="group relative border-2 border-white/80 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Get in Touch</span>
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative bg-gray-900/95 backdrop-blur-xl text-white py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              className="space-y-4 w-full"
              initial="hidden"
              animate="visible"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-2 group cursor-pointer">
                <Heart className="h-6 w-auto text-pink-500 group-hover:text-pink-400 transition-colors duration-300 group-hover:scale-110" />
                <span className="text-xl font-bold group-hover:text-pink-100 transition-all duration-300">CraftedWithLove</span>
              </div>
              <p className="text-gray-400">
                Collecting beautiful handmade products with love and expertise.
              </p>
            </motion.div>

            {[
              { title: "Quick Links", links: [{ name: "Home", href: "/" }, { name: "Products", href: "/products" }, { name: "About", href: "/about" }, { name: "Contact", href: "/contact" }] },
              { title: "Categories", links: [{ name: "Baby Items", href: "/categories/baby" }, { name: "Home Decor", href: "/categories/decor" }, { name: "Accessories", href: "/categories/accessories" }, { name: "Custom Orders", href: "/categories/custom" }] },
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
                    <Link key={linkIndex} href={link.href} className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 hover:text-pink-200">
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
                  { icon: Phone, text: "+1 (555) 123-4567" },
                  { icon: Mail, text: "hello@craftedwithlove.com" },
                  { icon: MapPin, text: "Your City, State" },
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <contact.icon className="h-4 w-4 text-pink-500 group-hover:text-pink-400 transition-colors duration-300" />
                    <span className="text-gray-400 group-hover:text-white transition-colors duration-300">{contact.text}</span>
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
              © 2025 CraftedWithLove. Made with ❤️ for handmade creations.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}