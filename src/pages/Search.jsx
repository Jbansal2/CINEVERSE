import { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Play, Search as SearchIcon, Loader2, X } from "lucide-react";
import Footer from "../components/Footer";
import { Link, useSearchParams } from "react-router-dom";
import { searchMulti, formatContent, GENRE_MAP } from "../lib/tmdb";
import Header from "../components/ui/header";



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

const PopularSearches = () => {
  const popularSearches = [
    "Stranger Things", "Breaking Bad", "The Office", "Marvel", "Harry Potter",
    "Game of Thrones", "Friends", "Money Heist", "The Witcher", "Squid Game"
  ];

  return (
    <div className="px-4 md:px-12 py-8">
      <h2 className="text-white text-xl font-semibold mb-6">Popular Searches</h2>
      <div className="flex flex-wrap gap-3">
        {popularSearches.map((search, index) => (
          <button
            key={index}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm transition-colors"
            onClick={() => {
              const searchInput = document.getElementById('search-input');
              if (searchInput) {
                searchInput.value = search;
                searchInput.dispatchEvent(new Event('input', { bubbles: true }));
              }
            }}
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const searchInputRef = useRef(null);

  const formatTMDBContent = (item) => {
    const isMovie = 'title' in item;
    const mainGenre = item.genre_ids[0] ? GENRE_MAP[item.genre_ids[0]] || 'Unknown' : 'Unknown';
    
    return {
      ...formatContent(item),
      genre: mainGenre
    };
  };

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const data = await searchMulti(searchQuery);
      const formattedResults = data.results
        .filter((item) => item.media_type !== 'person')
        .slice(0, 24)
        .map(formatTMDBContent);
      
      setResults(formattedResults);
      
      setSearchParams({ q: searchQuery });
    } catch (error) {
      console.error('Error searching:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }

    const urlQuery = searchParams.get('q');
    if (urlQuery) {
      setQuery(urlQuery);
      performSearch(urlQuery);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(query);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
    setSearchParams({});
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Header />
      
      <div className="pt-24 pb-8">
        <div className="px-4 md:px-12 mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                ref={searchInputRef}
                id="search-input"
                type="text"
                placeholder="Search for movies, TV shows..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setTimeout(() => {
                    if (e.target.value === query) {
                      performSearch(e.target.value);
                    }
                  }, 500);
                }}
                className="w-full pl-12 pr-12 py-4 text-lg bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-netflix-red focus:ring-netflix-red"
              />
              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </form>
        </div>

        {hasSearched ? (
          <div>
            <div className="px-4 md:px-12 mb-4">
              <h2 className="text-white text-xl font-semibold">
                {loading ? 'Searching...' : `Search Results${query ? ` for "${query}"` : ''}`}
              </h2>
            </div>
            <SearchResults results={results} loading={loading} />
          </div>
        ) : (
          <PopularSearches />
        )}

        <Footer />
      </div>
    </div>
  );
}