"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../navbar";
import Footer from "../footer";
import ImageModal from "../imagemodal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ArrowProps {
  onClick?: () => void;
}

// Custom Arrow Components
const CustomPrevArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <div
      className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-pink-500/80 hover:bg-pink-500 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm border-2 border-white/30"
      onClick={onClick}
    >
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </div>
  );
};

const CustomNextArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <div
      className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-pink-500/80 hover:bg-pink-500 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm border-2 border-white/30"
      onClick={onClick}
    >
      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    </div>
  );
};

const categories = [
  {
    name: "Home Decor",
    emoji: "🏠",
    description: "Beautiful handcrafted items to decorate your home.",
    route: "/products/home-decor",
  },
  {
    name: "Hair Accessories",
    emoji: "🎀",
    description: "Stylish accessories to complement your hairstyle.",
    route: "/products/hair-accessories",
  },
  {
    name: "Gift Articles",
    emoji: "🎁",
    description: "Perfect gifts made with love for your loved ones.",
    route: "/products/gift-articles",
  },
  {
    name: "Others",
    emoji: "✨",
    description: "Unique handcrafted items for every occasion.",
    route: "/products/others",
  },
];

const featuredProducts = [
  {
    name: "Cozy Crochet Blanket",
    description: "Soft, warm, and handcrafted with premium yarn.",
    image: "/products/blanket.jpg",
    route: "/products/home-decor",
    categoryRoute: "/products/home-decor",
  },
  {
    name: "Floral Hair Scrunchie",
    description: "Elegant and stylish, perfect for any outfit.",
    image: "/products/scrunchie.jpg",
    route: "/products/hair-accessories",
    categoryRoute: "/products/hair-accessories",
  },
  {
    name: "Gift Basket Set",
    description: "A curated set of crochet gifts for special occasions.",
    image: "/products/gift-basket.jpg",
    route: "/products/gift-articles",
    categoryRoute: "/products/gift-articles",
  },
];

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleImageClick = (imageUrl: string) => {
    console.log("Image clicked:", imageUrl); // Debug log
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: false,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  // Animation variants for Framer Motion
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-rose-100 overflow-x-hidden relative">
      {/* Subtle Crochet Background */}
      <div
        className="absolute inset-0 opacity-10 bg-repeat bg-[url('/crochet-pattern.png')] bg-cover bg-fixed z-0"
        style={{ backgroundSize: "500px 500px" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-pink-50/50 to-rose-100/50 z-0"></div>

      {/* Custom Carousel Styles */}
      <style jsx global>{`
        .slick-dots {
          bottom: -35px !important;
        }
        
        .slick-dots li button:before {
          color: rgba(236, 72, 153, 0.6) !important;
          font-size: 10px !important;
        }
        
        .slick-dots li.slick-active button:before {
          color: rgba(236, 72, 153, 1) !important;
        }
      `}</style>

      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-10 lg:py-10">
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
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center space-y-2"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-100/80 to-rose-100/80 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-200/50">
              <Sparkles className="h-4 w-4 text-pink-500 animate-spin" style={{ animationDuration: "3s" }} />
              <span className="text-sm font-medium text-pink-700">Explore Our Creations</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-50/30 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center space-y-4 mb-4"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-pink-700 bg-clip-text text-transparent">
              Select a Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our handcrafted crochet collections, tailored for every style and occasion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                className="group"
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                transition={{ delay: index * 0.2 }}
              >
                <Link
                  href={category.route}
                  className="bg-white/30 backdrop-blur-lg p-6 rounded-2xl shadow-md border border-white/40 hover:scale-105 transform transition duration-300 block"
                >
                  <div className="text-center space-y-2">
                    <motion.span
                      className="text-4xl mb-2 block"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {category.emoji}
                    </motion.span>
                    <h2 className="text-xl font-semibold text-gray-800 group-hover:text-pink-700 transition-colors duration-300">
                      {category.name}
                    </h2>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-50/30 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center space-y-4 mb-12"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-pink-700 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover some of our most loved handcrafted creations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.name}
                className="group"
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                transition={{ delay: index * 0.2 }}
              >
                <Link
                  href={product.route}
                  className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-md border border-white/40 hover:scale-105 transform transition duration-300 block"
                >
                  <div className="space-y-4">
                    <div className="h-48 bg-gradient-to-br from-pink-200/80 to-rose-200/80 backdrop-blur-sm rounded-xl relative overflow-hidden group-hover:from-pink-300/80 group-hover:to-rose-300/80 transition-all duration-500">
                      <Slider {...carouselSettings}>
                        <div className="w-full h-48" onClick={(e) => { e.preventDefault(); handleImageClick(product.image || "/placeholder.jpg"); }}>
                          <img
                            src={product.image || "/placeholder.jpg"}
                            alt={product.name}
                            className="w-full h-full object-cover cursor-zoom-in hover:scale-[1.02] transition-transform duration-300"
                            onError={(e) => { e.currentTarget.src = "/placeholder.jpg"; }}
                          />
                        </div>
                      </Slider>
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 backdrop-blur-[1px] pointer-events-none"></div>
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-pink-700 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{product.description}</p>
                      <Link href={product.categoryRoute}>
                        <motion.button
                          className="group/btn relative bg-white text-pink-600 px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-pink-200/40 border-2 border-pink-300/60 hover:border-pink-400 overflow-hidden hover:bg-pink-50/80 mt-2"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            <span>Explore Now</span>
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-rose-50 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={selectedImage}
        altText="Enlarged product image"
      />

      <Footer />
    </div>
  );
};

export default Products;