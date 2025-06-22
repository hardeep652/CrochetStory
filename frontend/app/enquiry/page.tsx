"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles, Send } from "lucide-react";
import Navbar from "../navbar";
import Footer from "../footer";
import { useRouter } from "next/navigation";

// Interface for state-cities data
interface StateCities {
  [key: string]: string[];
}

// Indian states and cities data
const indiaStatesAndCities: StateCities = {
  "Andaman and Nicobar Islands": ["Port Blair", "Car Nicobar", "Havelock Island"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  "Chandigarh": ["Chandigarh"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
  "Delhi": ["New Delhi", "Delhi"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  "Haryana": ["Faridabad", "Gurgaon", "Hisar", "Panipat"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Ladakh": ["Leh", "Kargil"],
  "Lakshadweep": ["Kavaratti"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  "Manipur": ["Imphal", "Bishnupur", "Thoubal"],
  "Meghalaya": ["Shillong", "Tura"],
  "Mizoram": ["Aizawl", "Lunglei"],
  "Nagaland": ["Kohima", "Dimapur"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
  "Puducherry": ["Puducherry", "Karaikal"],
  "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Ajmer"],
  "Sikkim": ["Gangtok", "Namchi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
  "Tripura": ["Agartala"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Noida"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Nainital"],
  "West Bengal": ["Kolkata", "Siliguri", "Durgapur", "Asansol"],
};

// Product categories
const categories = ["Home Decor", "Hair Accessories", "Gift Articles", "Others"];

const Enquiry = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    category: "",
    product_name: "",
    price: "",
    description: "",
    name: "",
    phone_number: "",
    state: "",
    city: "",
    additional_details: "",
  });
  const [cities, setCities] = useState<string[]>([]);

  // Read query parameters and pre-fill product details
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const product = query.get("product") || "";
    const price = query.get("price") || "";
    const description = query.get("description") || "";
    const category = query.get("category") || "";
    setFormData((prev) => ({
      ...prev,
      category: decodeURIComponent(category),
      product_name: decodeURIComponent(product),
      price: price ? `₹${parseFloat(price).toFixed(2)}` : "",
      description: decodeURIComponent(description),
      additional_details: product ? `Inquiry about ${decodeURIComponent(product)}` : "",
    }));
  }, []);

  // Update cities when state changes
  useEffect(() => {
    if (formData.state && indiaStatesAndCities[formData.state]) {
      setCities(indiaStatesAndCities[formData.state]);
      setFormData((prev) => ({ ...prev, city: "" })); // Reset city when state changes
    } else {
      setCities([]);
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  }, [formData.state]);

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
        repeatType: "reverse",
      },
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Parse price to integer, removing ₹
      const parsedPrice = formData.price
        ? parseInt(formData.price.replace("₹", "").trim())
        : 0;

      // Parse phone_number to number
      const parsedPhoneNumber = formData.phone_number
        ? parseInt(formData.phone_number.trim())
        : 0;

      // Send fields matching backend model
      const payload = {
        category: formData.category,
        product_name: formData.product_name,
        price: parsedPrice,
        description: formData.description,
        name: formData.name,
        phone_number: parsedPhoneNumber,
        state: formData.state,
        city: formData.city,
        additional_details: formData.additional_details || "No additional details provided",
      };
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/inquiry/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert("Inquiry sent!");
        setFormData({
          category: formData.category,
          product_name: formData.product_name,
          price: formData.price,
          description: formData.description,
          name: "",
          phone_number: "",
          state: "",
          city: "",
          additional_details: "",
        });
        router.push(`/`);
      } else {
        alert("Failed to send inquiry. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-rose-100 overflow-x-hidden relative">
      <div
        className="absolute inset-0 opacity-10 bg-repeat bg-[url('/crochet-pattern.png')] bg-cover bg-fixed z-0"
        style={{ backgroundSize: "500px 500px" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-pink-50/50 to-rose-100/50 z-0"></div>

      <Navbar />

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
              <span className="text-sm font-medium text-pink-700">Product Inquiry</span>
            </motion.div>
            <motion.h1
              className="text-4xl lg:text-6xl font-bold text-gray-900"
              variants={itemVariants}
            >
              <span>Inquire About</span>
              <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent block">
                {formData.product_name || "Your Product"}
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Fill out the form below, and we’ll get back to you about your order!
            </motion.p>
          </motion.div>

          <motion.div
            className="mt-16 max-w-2xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="bg-white/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/30"
              variants={itemVariants}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <motion.select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-3 rounded-lg bg-black border border-pink-200/50 text-gray-600 cursor-not-allowed"
                    disabled
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </motion.select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <motion.input
                    type="text"
                    name="product_name"
                    value={formData.product_name}
                    className="mt-1 w-full px-4 py-3 rounded-lg bg-black border border-pink-200/50 text-gray-600 cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <motion.input
                    type="text"
                    name="price"
                    value={formData.price}
                    className="mt-1 w-full px-4 py-3 rounded-lg bg-black border border-pink-200/50 text-gray-600 cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <motion.textarea
                    name="description"
                    value={formData.description}
                    className="mt-1 w-full px-4 py-3 rounded-lg bg-black border border-pink-200/50 text-gray-600 cursor-not-allowed resize-y"
                    rows={3}
                    readOnly
                  ></motion.textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Your Name</label>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-3 rounded-lg bg-black border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                    placeholder="Your Name"
                    required
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <motion.input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-3 rounded-lg bg-black border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                    placeholder="Your Phone Number"
                    required
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <motion.select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-3 rounded-lg bg-black border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                    required
                    whileFocus={{ scale: 1.01 }}
                  >
                    <option value="">Select State</option>
                    {Object.keys(indiaStatesAndCities).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </motion.select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <motion.select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-3 rounded-lg bg-black border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                    required
                    disabled={!formData.state}
                    whileFocus={{ scale: 1.01 }}
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </motion.select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Additional Details</label>
                  <motion.textarea
                    name="additional_details"
                    value={formData.additional_details}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-3 rounded-lg bg-black border border-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 resize-y"
                    placeholder="Any specific requirements?"
                    rows={4}
                    whileFocus={{ scale: 1.01 }}
                  ></motion.textarea>
                </div>
                <motion.button
                  type="submit"
                  className="group relative w-full rounded-md bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Send Inquiry</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Enquiry;