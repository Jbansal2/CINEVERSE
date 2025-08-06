import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Play,  ChevronLeft, ChevronRight, Heart, Bookmark, Trash2 } from "lucide-react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { getPopularMovies, getTopRatedTVShows, formatContent, getBackdropUrl, GENRE_MAP } from "../lib/tmdb";
import Header from "../components/ui/header";

const MOCK_USER_LIST = [];

const EmptyState = () => (
  <div className="text-center py-20 px-4">
    <Bookmark className="text-gray-600 mx-auto mb-6" size={80} />
    <h3 className="text-white text-2xl font-semibold mb-4">Your list is empty</h3>
    <p className="text-gray-400 mb-8 max-w-md mx-auto">
      Browse our extensive catalog and add movies and shows to your personal list. 
      Your favorites will appear here for easy access.
    </p>
    <div className="space-y-4">
      <Link to="/">
        <Button className="bg-netflix-red hover:bg-red-700 text-white px-8 py-3 mr-4">
          Browse Home
        </Button>
      </Link>
      <Link to="/movies">
        <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-3 mr-4">
          Browse Movies
        </Button>
      </Link>
      <Link to="/tv-shows">
        <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-3">
          Browse TV Shows
        </Button>
      </Link>
    </div>
  </div>
);

const RecommendationsSection = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatTMDBContent = (item) => {
    const mainGenre = item.genre_ids[0] ? GENRE_MAP[item.genre_ids[0]] || 'Unknown' : 'Unknown';
    
    return {
      ...formatContent(item),
      genre: mainGenre
    };
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const [popularMovies, topRatedShows] = await Promise.all([
          getPopularMovies(),
          getTopRatedTVShows()
        ]);

        const combinedResults = [
          ...popularMovies.results.slice(0, 5).map(formatTMDBContent),
          ...topRatedShows.results.slice(0, 5).map(formatTMDBContent)
        ];

        const shuffled = combinedResults.sort(() => 0.5 - Math.random());
        setRecommendations(shuffled.slice(0, 8));
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="px-4 md:px-12 py-8">
        <h2 className="text-white text-2xl font-semibold mb-6">Recommended for You</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-800 animate-pulse rounded-lg h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-12 py-8">
      <h2 className="text-white text-2xl font-semibold mb-6">Recommended for You</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {recommendations.map((item) => (
          <Link 
            key={item.id}
            to={`/movie/${item.id}`}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <img 
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target;
                  target.src = 'https://images.unsplash.com/photo-1489599687443-08de695baaaf?w=500';
                }}
              />
              <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
              </div>
              <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                ★ {item.rating}
              </div>
              <div className="absolute top-2 left-2 bg-netflix-red text-white text-xs px-2 py-1 rounded font-semibold">
                {item.type === 'movie' ? 'MOVIE' : 'TV'}
              </div>
            </div>
            <h3 className="text-white text-sm font-medium mt-2 truncate">{item.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

const ContentRow = ({ title, content, icon, onRemove }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const maxScroll = Math.max(0, (content.length - 6) * 200);

  const scrollLeft = () => {
    setScrollPosition(Math.max(0, scrollPosition - 1200));
  };

  const scrollRight = () => {
    setScrollPosition(Math.min(maxScroll, scrollPosition + 1200));
  };

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
              <div key={item.id} className="min-w-[180px] md:min-w-[200px] cursor-pointer transform transition-all duration-300 hover:scale-105 group relative">
                <Link to={`/movie/${item.id}`}>
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
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                      <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                    </div>
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      ★ {item.rating}
                    </div>
                    <div className="absolute top-2 left-2 bg-netflix-red text-white text-xs px-2 py-1 rounded font-semibold">
                      {item.type === 'movie' ? 'MOVIE' : 'TV'}
                    </div>
                    {item.dateAdded && (
                      <div className="absolute bottom-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        Added {new Date(item.dateAdded).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </Link>
                
                {onRemove && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(item.id);
                    }}
                    className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
                
                <div className="mt-2">
                  <h3 className="text-white text-sm font-medium truncate">{item.title}</h3>
                  <p className="text-gray-400 text-xs">{item.genre} • {item.year}</p>
                </div>
              </div>
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

export default function MyList() {
  const [userList, setUserList] = useState(MOCK_USER_LIST);

  const removeFromList = (id) => {
    setUserList(prev => prev.filter(item => item.id !== id));
  };

  const hasContent = userList.length > 0;

  return (
    <div className="bg-black min-h-screen">
      <Header />
      
      <div className="pt-20">
        {hasContent ? (
          <div className="pb-16">
            <div className="px-4 md:px-12 py-8">
              <h1 className="text-white text-4xl font-bold mb-2">My List</h1>
              <p className="text-gray-400">Your personal collection of movies and TV shows</p>
            </div>
            
            <ContentRow 
              title="My Watchlist" 
              content={userList.filter(item => !item.dateAdded)} 
              icon={<Bookmark className="text-blue-500" size={20} />}
              onRemove={removeFromList}
            />
            <ContentRow 
              title="Recently Added" 
              content={userList.filter(item => item.dateAdded)} 
              icon={<Heart className="text-netflix-red fill-current" size={20} />}
              onRemove={removeFromList}
            />
          </div>
        ) : (
          <EmptyState />
        )}
        
        <RecommendationsSection />

        <Footer />
      </div>
    </div>
  );
}