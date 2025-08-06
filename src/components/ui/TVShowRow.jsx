import { useState} from "react";
import { Link } from "react-router-dom";
import { Play, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";


const TVShowRow = ({ title, shows, loading }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const maxScroll = Math.max(0, (shows.length - 6) * 200);

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
            className="flex transition-transform duration-500 ease-in-out gap-2"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {shows.map((show) => (
              <Link 
                key={show.id}
                to={`/movie/${show.id}`}
                className="min-w-[180px] md:min-w-[200px] cursor-pointer transform transition-all duration-300 hover:scale-105 group"
              >
                <div className="relative">
                  <img 
                    src={show.image} 
                    alt={show.title}
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
                    ★ {show.rating}
                  </div>
                  <div className="absolute top-2 left-2 bg-netflix-red text-white text-xs px-2 py-1 rounded font-semibold">
                    TV
                  </div>
                </div>
                <div className="mt-2">
                  <h3 className="text-white text-sm font-medium truncate">{show.title}</h3>
                  <p className="text-gray-400 text-xs">{show.genre} • {show.year}</p>
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

export default TVShowRow
