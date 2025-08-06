import { useState, useEffect, useRef } from "react";
import { Input } from "../components/ui/input";
import {  Search as SearchIcon, X } from "lucide-react";
import Footer from "../components/Footer";
import {  useSearchParams } from "react-router-dom";
import { searchMulti, formatContent, GENRE_MAP } from "../lib/tmdb";
import Header from "../components/ui/header";
import PopularSearches from "../components/ui/PopularSearches";
import SearchResults from "../components/ui/SearchResults";



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