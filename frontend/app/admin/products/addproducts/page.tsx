"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Sparkles, Heart, ArrowRight, Package, List, X } from "lucide-react";
import Navbar from "../../../navbar";
import Footer from "../../../footer";
import { useRouter } from "next/navigation";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    price: "",
    category: "",
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const categories = [
    { display: "Home Decor", value: "Home Decor" },
    { display: "Gift Articles", value: "Gift Articles" },
    { display: "Others", value: "Others" },
    { display: "Hair Accessories", value: "Hair Accessories" },
  ];

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ;
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
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-5, 5, -5],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
      if (newFiles.length !== files.length) {
        setError("All files must be images (jpg, png, etc.)");
        return;
      }
      if (imageFiles.length + newFiles.length > 5) {
        setError("Maximum 5 images allowed");
        return;
      }
      const updatedFiles = [...imageFiles, ...newFiles];
      setImageFiles(updatedFiles);
      setImagePreviews(updatedFiles.map((file) => URL.createObjectURL(file)));
      setError(null);
      e.target.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
    URL.revokeObjectURL(imagePreviews[index]);
  };

  useEffect(() => {
    return () => imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
  }, [imagePreviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (
      !formData.product_name ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      imageFiles.length === 0
    ) {
      setError("All fields are required, including at least one image!");
      setLoading(false);
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      setError("Price must be a valid positive number!");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("product_name", formData.product_name);
    data.append("description", formData.description);
    data.append("price", price.toString());
    data.append("category", formData.category);
    imageFiles.forEach((file) => data.append("imageURLs", file));

    try {
      // ✅ Include HTTP Basic auth
      const authHeader = "Basic " + btoa("hardeep:shiv");

      const response = await fetch(
        `${BACKEND_URL}/api/products/admin/addproduct`,
        {
          method: "POST",
          body: data,
          headers: {
            Authorization: authHeader,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to add product");
      }

      const result = await response.text();
      alert(result);

      router.push(`/products`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
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
          className="relative z-10 w-full max-w-lg"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30 relative overflow-hidden"
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
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
                  <span className="text-sm font-medium text-pink-700">Admin Panel</span>
                </motion.div>

                <motion.h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                  Add New Product
                </motion.h1>

                <motion.p className="text-gray-600 mt-2" variants={itemVariants}>
                  Create a new crochet masterpiece
                </motion.p>
              </motion.div>

              <motion.form onSubmit={handleSubmit} className="space-y-6" variants={itemVariants}>
                {/* Product Name */}
                <motion.div className="relative" whileFocus={{ scale: 1.02 }} variants={itemVariants}>
                  <input
                    type="text"
                    name="product_name"
                    placeholder="Product Name"
                    value={formData.product_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 pl-12 rounded-2xl bg-white/60 backdrop-blur-sm border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400">
                    <Package className="h-5 w-5" />
                  </div>
                </motion.div>

                {/* Category */}
                <motion.div className="relative" whileFocus={{ scale: 1.02 }} variants={itemVariants}>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 pl-12 rounded-2xl bg-white/60 backdrop-blur-sm border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-gray-600"
                    required
                  >
                    <option value="" disabled>Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.display}</option>
                    ))}
                  </select>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400">
                    <List className="h-5 w-5" />
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div className="relative" whileFocus={{ scale: 1.02 }} variants={itemVariants}>
                  <textarea
                    name="description"
                    placeholder="Product Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 resize-y"
                    rows={4}
                    required
                  />
                </motion.div>

                {/* Price */}
                <motion.div className="relative" whileFocus={{ scale: 1.02 }} variants={itemVariants}>
                  <input
                    type="number"
                    name="price"
                    placeholder="Price (USD)"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 pl-12 rounded-2xl bg-white/60 backdrop-blur-sm border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    step="0.01"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400">
                    <span className="text-lg">$</span>
                  </div>
                </motion.div>

                {/* Images */}
                <motion.div className="relative" variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Images (up to 5)</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-pink-200/50 border-dashed rounded-2xl cursor-pointer bg-white/60 backdrop-blur-sm hover:bg-pink-50/80 transition-all duration-300">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-6 w-6 text-pink-400 mb-2" />
                        <p className="text-sm text-gray-600">{imageFiles.length > 0 ? `${imageFiles.length} image(s) selected` : "Upload images"}</p>
                      </div>
                      <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                    </label>
                  </div>
                  {imagePreviews.length > 0 && (
                    <motion.div className="mt-4 flex gap-2 overflow-x-auto pb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                      {imagePreviews.map((preview, idx) => (
                        <div key={idx} className="relative">
                          <img src={preview} alt={`Preview-${idx}`} className="h-40 w-40 object-cover rounded-2xl" />
                          <motion.button
                            type="button"
                            className="absolute top-2 right-2 bg-rose-500 text-white rounded-full p-1 hover:bg-rose-600"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemoveImage(idx)}
                          >
                            <X className="h-4 w-4" />
                          </motion.button>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>

                {/* Error */}
                {error && (
                  <motion.p className="text-red-500 text-sm text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {error}
                  </motion.p>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  className="group relative w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  variants={itemVariants}
                  disabled={loading}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>{loading ? "Adding..." : "Add Product"}</span>
                    {!loading && (
                      <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </motion.form>
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

export default AddProduct;
