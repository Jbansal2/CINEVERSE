import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Play, Plus, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { getPopularMovies, getTopRatedMovies, getMoviesByGenre, formatContent,  GENRE_MAP } from "../lib/tmdb";
import Header from "../components/ui/header";

const MovieRow = ({ title, movies, loading }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const maxScroll = Math.max(0, (movies.length - 6) * 200);

  const scrollLeft = () => {
    setScrollPosition(Math.max(0, scrollPosition - 1200));
  };

  const scrollRight = () => {
    setScrollPosition(Math.min(maxScroll, scrollPosition + 1200));
  };

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-white text-xl font-semibold mb-4 px-4 md:px-12">{title}</h2>
        <div className="px-4 md:px-12">
          <div className="flex justify-center items-center h-40">
            <Loader2 className="text-white animate-spin" size={32} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-white text-xl font-semibold mb-4 px-4 md:px-12">{title}</h2>
      <div className="relative group px-4 md:px-12">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out gap-1"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {movies.map((movie) => (
              <Link 
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="min-w-[180px] md:min-w-[200px] cursor-pointer transform transition-all gap-2 duration-300 hover:scale-105 group"
              >
                <div className="relative">
                  <img 
                    src={movie?.image} 
                    alt={movie.title}
                    className="w-full h-[200px] md:h-[240px] object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target;
                      target.src = 'https://images.unsplash.com/photo-1489599687443-08de695baaaf?w=500';
                    }}
                  />
                  <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                  </div>
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    ★ {movie.rating}
                  </div>
                  <div className="absolute bottom-2 left-2 bg-netflix-red text-white text-xs px-2 py-1 rounded font-semibold">
                    MOVIE
                  </div>
                </div>
                <div className="mt-2">
                  <h3 className="text-white text-sm font-medium truncate">{movie.title}</h3>
                  <p className="text-gray-400 text-xs">{movie.genre} • {movie.year}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {scrollPosition > 0 && (
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-r-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        {scrollPosition < maxScroll && (
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-l-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

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
            target.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200';
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
            <span className="text-white">Movie</span>
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

export default function Movies() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [heroContent, setHeroContent] = useState(null);
  const [loading, setLoading] = useState({
    popular: true,
    topRated: true,
    action: true,
    hero: true
  });

  const formatTMDBContent = (item) => {
    const mainGenre = item.genre_ids[0] ? GENRE_MAP[item.genre_ids[0]] || 'Unknown' : 'Unknown';
    
    return {
      ...formatContent(item),
      genre: mainGenre
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularData = await getPopularMovies();
        const formattedPopular = popularData.results.slice(0, 10).map(formatTMDBContent);
        setPopularMovies(formattedPopular);
        setLoading(prev => ({ ...prev, popular: false }));

        if (formattedPopular.length > 0) {
          setHeroContent(formattedPopular[0]);
          setLoading(prev => ({ ...prev, hero: false }));
        }

        const topRatedData = await getTopRatedMovies();
        const formattedTopRated = topRatedData.results.slice(0, 10).map(formatTMDBContent);
        setTopRatedMovies(formattedTopRated);
        setLoading(prev => ({ ...prev, topRated: false }));

        const actionData = await getMoviesByGenre(28);
        const formattedAction = actionData.results.slice(0, 10).map(formatTMDBContent);
        setActionMovies(formattedAction);
        setLoading(prev => ({ ...prev, action: false }));

      } catch (error) {
        console.error('Error fetching TMDB data:', error);
        setLoading({
          popular: false,
          topRated: false,
          action: false,
          hero: false
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <HeroSection heroContent={heroContent} />
      
      <div className="relative z-10 -mt-32 pb-16">
        <MovieRow title="Popular Movies" movies={popularMovies} loading={loading.popular} />
        <MovieRow title="Top Rated Movies" movies={topRatedMovies} loading={loading.topRated} />
        <MovieRow title="Action Movies" movies={actionMovies} loading={loading.action} />
      </div>

      <Footer />
    </div>
  );
}