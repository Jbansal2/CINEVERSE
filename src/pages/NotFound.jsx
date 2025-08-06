import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="bg-netflix-red hover:bg-red-700 text-white flex items-center space-x-2">
              <Home size={20} />
              <span>Go Home</span>
            </Button>
          </Link>
          <Link to="/search">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black flex items-center space-x-2">
              <Search size={20} />
              <span>Search Content</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}