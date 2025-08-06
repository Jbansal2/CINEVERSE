import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-12">
        {/* Social Media Links */}
        <div className="flex space-x-6 mb-8">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Facebook size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Youtube size={24} />
          </a>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Press</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">News</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Account</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Media Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Cookie Settings</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Corporate Information</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-white transition-colors">Gift Cards</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Investor Relations</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Jobs</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Ways to Watch</Link></li>
            </ul>
          </div>
        </div>

        {/* Service Code */}
        <div className="mb-6">
          <button className="border border-gray-600 text-gray-400 px-4 py-2 text-sm hover:border-gray-400 transition-colors">
            Service Code
          </button>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-6 border-t border-gray-800">
          <div className="text-sm mb-4 md:mb-0">
            <p>&copy; 2024 CineVerse. All rights reserved.</p>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <Link to="#" className="hover:text-white transition-colors">Audio and Subtitles</Link>
            <Link to="#" className="hover:text-white transition-colors">Audio Description</Link>
            <select className="bg-transparent border border-gray-600 px-3 py-1 text-gray-400 focus:outline-none focus:border-gray-400">
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}