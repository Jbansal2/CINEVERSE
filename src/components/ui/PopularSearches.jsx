import React from 'react'

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

export default PopularSearches
