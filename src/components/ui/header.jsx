import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search as SearchIcon, Bell, User } from "lucide-react";


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full   z-50 transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="px-4 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-red-400 text-2xl font-bold">CINEVERSE</Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-gray-300 transition-colors">Home</Link>
            <Link to="/tv-shows" className="text-white hover:text-gray-300 transition-colors">TV Shows</Link>
            <Link to="/movies" className="text-white hover:text-gray-300 transition-colors">Movies</Link>
            <Link to="/new-popular" className="text-white hover:text-gray-300 transition-colors">New & Popular</Link>
            <Link to="/my-list" className="text-white hover:text-gray-300 transition-colors">My List</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/search">
            <SearchIcon className="text-white cursor-pointer" size={20} />
          </Link>
          <Bell className="text-white hover:text-gray-300 cursor-pointer" size={20} />
          <div className="w-8 h-8 bg-red-400 rounded flex items-center justify-center cursor-pointer">
            <User className="text-white" size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;