"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  altText: string;
}

const imagemodal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl, altText }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const touchRef = useRef<{ startDistance: number; startPosition: { x: number; y: number } } | null>(null);

  if (!isOpen) return null;

  // Desktop: Hover-based zoom
  const handleMouseEnter = () => {
    setIsZoomed(true);
    setZoomLevel(2);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isZoomed || !imageRef.current) return;

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width; // 0 to 1
    const y = (e.clientY - top) / height; // 0 to 1

    // Constrain panning for 2x zoom
    const maxX = width * (zoomLevel - 1) * 0.25; // Reduced for stability
    const maxY = height * (zoomLevel - 1) * 0.25;
    setPosition({
      x: Math.min(Math.max((0.5 - x) * maxX, -maxX), maxX), // Center-based, smooth
      y: Math.min(Math.max((0.5 - y) * maxY, -maxY), maxY),
    });
  };

  // Mobile: Pinch-to-zoom (unchanged)
  const getTouchDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    if (e.touches.length === 2) {
      e.preventDefault(); // Prevent browser zoom
      touchRef.current = {
        startDistance: getTouchDistance(e.touches),
        startPosition: { x: position.x, y: position.y },
      };
      setIsZoomed(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
    if (!imageRef.current || e.touches.length !== 2 || !touchRef.current) return;

    e.preventDefault(); // Prevent scrolling
    const currentDistance = getTouchDistance(e.touches);
    const scaleChange = currentDistance / touchRef.current.startDistance;
    const newZoomLevel = Math.min(Math.max(zoomLevel * scaleChange, 1), 3); // 1x to 3x

    const { width, height } = imageRef.current.getBoundingClientRect();
    const maxX = width * (newZoomLevel - 1) * 0.5;
    const maxY = height * (newZoomLevel - 1) * 0.5;

    // Update zoom and constrain panning
    setZoomLevel(newZoomLevel);
    setPosition({
      x: Math.min(Math.max(position.x, -maxX), maxX),
      y: Math.min(Math.max(position.y, -maxY), maxY),
    });
  };

  const handleTouchEnd = () => {
    touchRef.current = null;
    if (zoomLevel <= 1) {
      setIsZoomed(false);
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-white/90 backdrop-blur-lg p-4 rounded-2xl border border-pink-300/60 shadow-2xl shadow-pink-200/40 max-w-[80vw] max-h-[80vh]"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 bg-pink-500 text-white p-1.5 rounded-full hover:bg-pink-600 transition-all duration-300 z-10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>
        <div className="relative overflow-hidden max-w-[80vw] max-h-[80vh]">
          <img
            ref={imageRef}
            src={imageUrl}
            alt={altText}
            className="max-w-[80vw] max-h-[80vh] object-contain rounded-xl cursor-zoom-in touch-pinch-zoom"
            style={{
              transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
              transition: isZoomed && zoomLevel === 2 ? "transform 0.1s ease-out" : "none",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onError={(e) => { e.currentTarget.src = "/placeholder.jpg"; }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default imagemodal;
