import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { Play, Plus, ThumbsUp,  Share2,  ArrowLeft, Star } from "lucide-react";

const TrailerHeroSection = ({
  contentId,
  contentType,
  backdropUrl,
  title,
  content,
  isMovie,
  releaseDate,
  runtime
}) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const formatDate = (dateString) => {
    return new Date(dateString).getFullYear().toString();
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Use mock data directly since API is failing
        const mockTrailerKey = contentType === 'movie' ? 'BdJKm16Co6M' : 'bjqEWgDVPe0';
        setTrailerKey(mockTrailerKey);
        setTimeout(() => {
          setIsPlaying(true);
        }, 1000);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [contentId, contentType]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {trailerKey && !loading ? (
          <div className="w-full h-full relative">
            <iframe
              key={`${trailerKey}-${isPlaying}`}
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=${isPlaying ? 1 : 0}&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${trailerKey}&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&enablejsapi=1&origin=${window.location.origin}`}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-1/2 left-1/2 w-full h-full min-w-full min-h-full object-cover"
              style={{
                transform: 'translate(-50%, -50%) scale(1.2)',
                transformOrigin: 'center center',
                pointerEvents: isPlaying ? 'none' : 'auto'
              }}
            />
          </div>
        ) : (
          <img
            src={backdropUrl}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target;
              target.src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200';
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {!loading && (!trailerKey || (trailerKey && !isPlaying)) && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-20"
          onClick={handlePlayPause}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-8 hover:bg-white/30 transition-all duration-300 hover:scale-110">
            <Play className="text-white w-16 h-16 ml-2" fill="currentColor" />
          </div>
        </div>
      )}

      <div className="relative z-10 h-full flex items-center px-4 md:px-12">
        <div className="max-w-3xl">
          <Link
            to="/"
            className="inline-flex items-center text-white hover:text-gray-300 mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Browse
          </Link>

          <h1 className="text-white text-4xl md:text-7xl font-bold mb-6">{title}</h1>

          <div className="flex items-center space-x-6 mb-6">
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-500 fill-current" size={20} />
              <span className="text-white font-semibold">{content.vote_average.toFixed(1)}</span>
            </div>
            <span className="text-white">{formatDate(releaseDate)}</span>
            <span className="text-white">{runtime}</span>
            <span className="text-white">{isMovie ? 'Movie' : 'TV Series'}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {content.genres?.map((genre) => (
              <span key={genre.id} className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                {genre.name}
              </span>
            ))}
          </div>

          <p className="text-white text-lg mb-8 leading-relaxed max-w-2xl">
            {content.overview}
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <Button
              className="bg-white text-black hover:bg-gray-200 flex items-center space-x-2 px-8 py-3 text-lg font-semibold"
              onClick={trailerKey ? handlePlayPause : undefined}
            >
              <Play size={20} fill="currentColor" />
              <span>{trailerKey ? (isPlaying ? 'Pause Trailer' : 'Play Trailer') : 'Play'}</span>
            </Button>
            <Button variant="secondary" className="bg-gray-600 bg-opacity-70 text-white hover:bg-opacity-50 flex items-center space-x-2 px-8 py-3 text-lg font-semibold">
              <Plus size={20} />
              <span>My List</span>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black flex items-center space-x-2 px-6 py-3">
              <ThumbsUp size={18} />
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black flex items-center space-x-2 px-6 py-3">
              <Share2 size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerHeroSection
