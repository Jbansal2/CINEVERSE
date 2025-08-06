import React from 'react'
import { useState, useEffect} from "react";
import { Play, Plus, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./button";


const AutoScrollHeroSection = ({ heroContent }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isManualControl, setIsManualControl] = useState(false);

    useEffect(() => {
        if (isManualControl || heroContent.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroContent.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isManualControl, heroContent.length]);

    const goToNext = () => {
        setIsManualControl(true);
        setCurrentIndex((prev) => (prev + 1) % heroContent.length);
        setTimeout(() => setIsManualControl(false), 10000);
    };

    const goToPrev = () => {
        setIsManualControl(true);
        setCurrentIndex((prev) => (prev - 1 + heroContent.length) % heroContent.length);
        setTimeout(() => setIsManualControl(false), 10000);
    };

    const goToSlide = (index) => {
        setIsManualControl(true);
        setCurrentIndex(index);
        setTimeout(() => setIsManualControl(false), 10000);
    };

    if (heroContent.length === 0) {
        return (
            <div className="relative h-screen bg-gray-900">
                <div className="relative z-10 h-full flex items-center justify-center">
                    <Loader2 className="text-white animate-spin" size={48} />
                </div>
            </div>
        );
    }

    const currentContent = heroContent[currentIndex];

    return (
        <div className="relative h-screen overflow-hidden">
            {heroContent.map((content, index) => (
                <div
                    key={`${content.id}-${content.title}`} // Unique key
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={content.backdrop}
                        alt={content.title}
                        className="w-full h-full object-cover"
                        onLoad={() => console.log(`Backdrop loaded for ${content.title}: ${content.backdrop}`)}
                        onError={(e) => {
                            console.error(`Backdrop failed to load for ${content.title}: ${content.backdrop}`);
                            e.target.src = 'https://placehold.co/1200x675?text=No+Image';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>
            ))}

            <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-3 z-20 transition-all duration-300"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-3 z-20 transition-all duration-300"
            >
                <ChevronRight size={24} />
            </button>

            <div className="relative z-10 h-full flex items-center px-4 md:px-12">
                <div className="max-w-2xl">
                    <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 transition-all duration-500">
                        {currentContent.title}
                    </h1>
                    <div className="flex items-center space-x-4 mb-4">
                        <span className="text-yellow-500 font-semibold">★ {currentContent.rating}</span>
                        <span className="text-white">{currentContent.year}</span>
                        <span className="text-white">{currentContent.type === 'movie' ? 'Movie' : 'TV Series'}</span>
                        <span className="text-gray-400">{currentContent.genre}</span>
                    </div>
                    <p className="text-white text-lg mb-8 leading-relaxed line-clamp-3 transition-all duration-500">
                        {currentContent.overview}
                    </p>

                    <div className="flex space-x-4 mb-8">
                        <Link to={`/movie/${currentContent.id}`}>
                            <Button className="bg-white text-black hover:bg-gray-200 flex items-center space-x-2 px-8 py-3 text-lg font-semibold">
                                <Play size={20} fill="currentColor" />
                                <span>Play</span>
                            </Button>
                        </Link>
                        <Button variant="secondary" className="bg-gray-600 bg-opacity-70 text-white hover:bg-opacity-50 flex items-center space-x-2 px-8 py-3 text-lg font-semibold">
                            <Plus size={20} />
                            <span>My List</span>
                        </Button>
                    </div>

                    <div className="flex space-x-2">
                        {heroContent.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? 'bg-netflix-red scale-125'
                                        : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AutoScrollHeroSection
