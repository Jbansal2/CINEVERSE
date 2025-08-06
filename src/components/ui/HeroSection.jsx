import React from 'react'
import { Button } from "./button";
import { Play, Plus, Loader2 } from "lucide-react";


const HeroSection = ({ heroContent }) => {
  if (!heroContent) {
    return (
      <div className="relative h-screen bg-gray-900">
        <div className="relative z-10 h-full flex items-center justify-center">
          <Loader2 className="text-white animate-spin" size={48} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img 
          src={heroContent.backdrop}
          alt={heroContent.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target;
            target.src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>
      
      <div className="relative z-10 h-full flex items-center px-4 md:px-12">
        <div className="max-w-2xl">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">{heroContent.title}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-yellow-500 font-semibold">★ {heroContent.rating}</span>
            <span className="text-white">{heroContent.year}</span>
            <span className="text-white">TV Series</span>
            <span className="text-gray-400">{heroContent.genre}</span>
          </div>
          <p className="text-white text-lg mb-8 leading-relaxed line-clamp-3">{heroContent.overview}</p>
          
          <div className="flex space-x-4">
            <Button className="bg-white text-black hover:bg-gray-200 flex items-center space-x-2 px-8 py-3 text-lg font-semibold">
              <Play size={20} fill="currentColor" />
              <span>Play</span>
            </Button>
            <Button variant="secondary" className="bg-gray-600 bg-opacity-70 text-white hover:bg-opacity-50 flex items-center space-x-2 px-8 py-3 text-lg font-semibold">
              <Plus size={20} />
              <span>My List</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection
