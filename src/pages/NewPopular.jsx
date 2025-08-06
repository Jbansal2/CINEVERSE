import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Play, Plus, ChevronLeft, ChevronRight, Loader2, Flame, TrendingUp } from "lucide-react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { getTrending, getUpcomingMovies, getTVShowsAiringToday, getNowPlayingMovies, formatContent, getBackdropUrl, GENRE_MAP } from "../lib/tmdb";
import Header from "../components/ui/header";

const ContentRow = ({ title, content, icon, loading }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const maxScroll = Math.max(0, (content.length - 6) * 200);

  const scrollLeft = () => {
    setScrollPosition(Math.max(0, scrollPosition - 1200));
  };

  const scrollRight = () => {
    setScrollPosition(Math.min(maxScroll, scrollPosition + 1200));
  };

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-white text-xl font-semibold mb-4 px-4 md:px-12 flex items-center gap-2">
          {icon}
          {title}
        </h2>
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
      <h2 className="text-white text-xl font-semibold mb-4 px-4 md:px-12 flex items-center gap-2">
        {icon}
        {title}
      </h2>
      <div className="relative group px-4 md:px-12">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out gap-2"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {content.map((item) => (
              <Link 
                key={item.id}
                to={`/movie/${item.id}`}
                className="min-w-[180px] md:min-w-[200px] cursor-pointer transform transition-all duration-300 hover:scale-105 group"
              >
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-[200px] md:h-[240px] object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target;
                      target.src = 'https://images.unsplash.com/photo-1489599687443-08de695baaaf?w=500';
                    }}
                  />
                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                  </div>
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    ★ {item.rating}
                  </div>
                  <div className="absolute top-2 left-2 bg-netflix-red text-white text-xs px-2 py-1 rounded font-semibold">
                    {item.type === 'movie' ? 'MOVIE' : 'TV'}
                  </div>
                </div>
                <div className="mt-2">
                  <h3 className="text-white text-sm font-medium truncate">{item.title}</h3>
                  <p className="text-gray-400 text-xs">{item.genre} • {item.year}</p>
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
            target.src = 'https://images.unsplash.com/photo-1594736797933-d0d617ee3762?w=1200';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>
      
      <div className="relative z-10 h-full flex items-center px-4 md:px-12">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-2 mb-2">
            <Flame className="text-netflix-red" size={20} />
            <span className="text-netflix-red font-semibold uppercase text-sm tracking-wide">New & Popular</span>
          </div>
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">{heroContent.title}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-yellow-500 font-semibold">★ {heroContent.rating}</span>
            <span className="text-white">{heroContent.year}</span>
            <span className="text-white">{heroContent.type === 'movie' ? 'Movie' : 'TV Series'}</span>
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

export default function NewPopular() {
  const [trendingContent, setTrendingContent] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [heroContent, setHeroContent] = useState(null);
  const [loading, setLoading] = useState({
    trending: true,
    upcoming: true,
    nowPlaying: true,
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
        const trendingData = await getTrending('all', 'day');
        const formattedTrending = trendingData.results.slice(0, 10).map(formatTMDBContent);
        setTrendingContent(formattedTrending);
        setLoading(prev => ({ ...prev, trending: false }));

        if (formattedTrending.length > 0) {
          setHeroContent(formattedTrending[0]);
          setLoading(prev => ({ ...prev, hero: false }));
        }

        const upcomingData = await getUpcomingMovies();
        const formattedUpcoming = upcomingData.results.slice(0, 10).map(formatTMDBContent);
        setUpcomingMovies(formattedUpcoming);
        setLoading(prev => ({ ...prev, upcoming: false }));

        const nowPlayingData = await getNowPlayingMovies();
        const formattedNowPlaying = nowPlayingData.results.slice(0, 10).map(formatTMDBContent);
        setNowPlayingMovies(formattedNowPlaying);
        setLoading(prev => ({ ...prev, nowPlaying: false }));

      } catch (error) {
        console.error('Error fetching TMDB data:', error);
        setLoading({
          trending: false,
          upcoming: false,
          nowPlaying: false,
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
        <ContentRow
          title="Trending Today"
          content={trendingContent}
          icon={<TrendingUp className="text-orange-500" size={20} />}
          loading={loading.trending}
        />
        <ContentRow
          title="New Movie Releases"
          content={upcomingMovies}
          icon={<Flame className="text-netflix-red" size={20} />}
          loading={loading.upcoming}
        />
        <ContentRow
          title="Now Playing in Theaters"
          content={nowPlayingMovies}
          icon={<Play className="text-green-500" size={20} />}
          loading={loading.nowPlaying}
        />
      </div>

      <Footer />
    </div>
  );
}
