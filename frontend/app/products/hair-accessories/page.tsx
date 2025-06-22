"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send } from "lucide-react";
import Navbar from "../../navbar";
import Footer from "../../footer";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import ImageModal from "../../imagemodal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Product {
  product_name: string;
  description: string;
  price: number;
  imageURLs: string[];
  category: string;
}

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
        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
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
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
      </svg>
    </div>
  );
};

const HairAccessories: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = "http://localhost:8080/api/products/getproducts/hair-accessories";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("API response is not an array");
        }
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleBuyNow = (product: Product) => {
    router.push(`/enquiry?category=${encodeURIComponent("Hair Accessories")}&product=${encodeURIComponent(product.product_name)}&price=${encodeURIComponent(product.price)}&description=${encodeURIComponent(product.description)}`);
  };

  const handleImageClick = (imageUrl: string) => {
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
    adaptiveHeight: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-rose-100 relative overflow-x-hidden">
      <div
        className="absolute inset-0 opacity-10 bg-repeat bg-[url('/crochet-pattern.png')] bg-cover bg-fixed z-0"
        style={{ backgroundSize: "500px 500px" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-pink-50/50 to-rose-100/50 z-0"></div>

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
          <motion.div
            className="absolute bottom-32 left-1/4 w-16 h-16 bg-pink-300/20 rounded-full blur-lg"
            animate={{ x: [-5, 5, -5], opacity: [0.2, 0.4] }}
            transition={{ repeat: Infinity, duration: 5 }}
          ></motion.div>
          <div className="absolute top-1/3 left-8 w-24 h-24 border border-pink-200/20 rounded-lg rotate-12 animate-pulse"></div>
          <div className="absolute top-1/2 right-12 w-16 h-16 border border-rose-200/25 rounded-full animate-bounce" style={{ animationDuration: "3s" }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-20 h-20 border border-pink-300/15 rounded-lg -rotate-6"></div>
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-16 left-16 w-2 h-2 bg-pink-400 rounded-full"></div>
            <div className="absolute top-32 left-32 w-1 h-1 bg-rose-400 rounded-full"></div>
            <div className="absolute top-24 right-24 w-2 h-2 bg-pink-500 rounded-full"></div>
            <div className="absolute top-48 right-48 w-1 h-1 bg-rose-500 rounded-full"></div>
            <div className="absolute bottom-32 left-24 w-2 h-2 bg-pink-400 rounded-full"></div>
            <div className="absolute bottom-48 right-32 w-1 h-1 bg-rose-400 rounded-full"></div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-50/10 via-transparent to-rose-50/10"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-rose-100/5 via-transparent to-transparent"></div>
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
              <span className="text-sm font-medium text-pink-700">Hair Accessories Collection</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 relative z-10">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl z-[-1]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-50/30 to-transparent z-[-1]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center space-y-4 mb-4"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-pink-700 bg-clip-text text-transparent">
              Our Hair Accessories Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our curated selection of handcrafted crochet hair accessories.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {loading ? (
              <p className="text-center text-gray-600 col-span-full">Loading...</p>
            ) : error ? (
              <p className="text-center text-pink-600 col-span-full">{error}</p>
            ) : products.length === 0 ? (
              <p className="text-center text-gray-600 col-span-full">No products found.</p>
            ) : (
              products.map((product, index) => (
                <motion.div
                  key={product.product_name || `product-${index}`}
                  className="group"
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="bg-gradient-to-br from-white via-pink-100/40 to-white backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-pink-300/60 hover:shadow-2xl hover:border-pink-400/80 hover:from-white hover:via-pink-200/50 hover:to-white transform transition-all duration-500 hover:scale-[1.02] hover:shadow-pink-200/40">
                    <div className="space-y-5">
                      <div className="h-[200px] bg-gradient-to-br from-pink-200/80 via-white to-pink-200/80 backdrop-blur-sm rounded-xl relative overflow-hidden group-hover:from-pink-300/90 group-hover:via-white group-hover:to-pink-300/90 transition-all duration-500 shadow-inner border border-pink-300/50">
                        {Array.isArray(product.imageURLs) && product.imageURLs.length > 0 ? (
                          product.imageURLs.length === 1 ? (
                            <img
                              src={product.imageURLs[0] || "/placeholder.jpg"}
                              alt={`${product.product_name || "Hair Accessories crochet product"}`}
                              className="w-full h-full object-cover cursor-zoom-in hover:scale-[1.02] transition-transform duration-300"
                              onClick={() => handleImageClick(product.imageURLs[0] || "/placeholder.jpg")}
                              onError={(e) => { e.currentTarget.src = "/placeholder.jpg"; }}
                            />
                          ) : (
                            <Slider {...carouselSettings}>
                              {product.imageURLs.map((url, idx) => (
                                <div key={idx} className="w-full h-[200px]" onClick={() => handleImageClick(url || "/placeholder.jpg")}>
                                  <img
                                    src={url || "/placeholder.jpg"}
                                    alt={`${product.product_name || "Hair Accessories crochet product"} - Image ${idx + 1}`}
                                    className="w-full h-full object-cover cursor-zoom-in hover:scale-[1.02] transition-transform duration-300"
                                    onError={(e) => { e.currentTarget.src = "/placeholder.jpg"; }}
                                  />
                                </div>
                              ))}
                            </Slider>
                          )
                        ) : (
                          <img
                            src="/placeholder.jpg"
                            alt="Hair Accessories crochet placeholder"
                            className="w-full h-full object-cover cursor-zoom-in hover:scale-[1.02] transition-transform duration-300"
                            onClick={() => handleImageClick("/placeholder.jpg")}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-pink-300/20 via-transparent to-white/40 backdrop-blur-[1px] pointer-events-none"></div>
                      </div>
                      <div className="text-center space-y-3">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-pink-700 transition-colors duration-300 tracking-wide leading-tight drop-shadow-sm">
                          {product.product_name || "Unnamed Product"}
                        </h3>
                        <p className="text-gray-600 text-base line-clamp-2 font-medium leading-relaxed px-2">
                          {product.description || "No description available"}
                        </p>
                      </div>
                      <div className="flex justify-center pt-2">
                        <motion.button
                          className="group/btn relative bg-white text-pink-600 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-pink-200/40 border-2 border-pink-300/60 hover:border-pink-400 overflow-hidden hover:bg-pink-50/80"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleBuyNow(product)}
                        >
                          <span className="relative z-10 flex items-center justify-center space-x-1.5">
                            <Send className="h-3.5 w-3.5" />
                            <span>Inquire Now</span>
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-rose-50 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
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

export default HairAccessories;