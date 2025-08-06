import React from 'react'
import { Play, Search as SearchIcon, Loader2 } from "lucide-react";
import { Link} from "react-router-dom";

const SearchResults = ({ results, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="text-white animate-spin" size={48} />
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-20">
        <SearchIcon className="text-gray-600 mx-auto mb-4" size={64} />
        <h3 className="text-white text-xl font-semibold mb-2">No results found</h3>
        <p className="text-gray-400">Try searching with different keywords</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4 md:px-12 py-8">
      {results.map((item) => (
        <Link 
          key={item.id}
          to={`/movie/${item.id}`}
          className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-[280px] md:h-[320px] object-cover rounded-lg"
              onError={(e) => {
                const target = e.target;
                target.src = 'https://images.unsplash.com/photo-1489599687443-08de695baaaf?w=500';
              }}
            />
            <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
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
  );
};


export default SearchResults
