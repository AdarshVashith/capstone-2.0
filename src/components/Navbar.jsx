import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, Heart, Star, LogOut, User } from 'lucide-react';
import logo from '../assets/logo1.jpeg';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors">
          <img
          src={logo}
          alt="Kitchen Logo"
          className="h-8 w-8 object-contain"
        />
            <span className="text-2xl font-bold">Kitchen</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                isActive('/') ? 'text-orange-600 bg-orange-50' : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            {currentUser && (
              <Link 
                to="/favorites" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  isActive('/favorites') ? 'text-orange-600 bg-orange-50' : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                }`}
              >
                <Heart className="h-4 w-4" />
                <span>Favorites</span>
              </Link>
            )}
            
            <Link 
              to="/reviews" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                isActive('/reviews') ? 'text-orange-600 bg-orange-50' : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
              }`}
            >
              <Star className="h-4 w-4" />
              <span>Reviews</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:block text-sm">{currentUser.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 text-sm text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        <div className="md:hidden pb-4">
          <div className="flex justify-around">
            <Link 
              to="/" 
              className={`flex flex-col items-center py-2 px-1 text-xs ${
                isActive('/') ? 'text-orange-600' : 'text-gray-600'
              }`}
            >
              <Home className="h-5 w-5 mb-1" />
              <span>Home</span>
            </Link>
            
            {currentUser && (
              <Link 
                to="/favorites" 
                className={`flex flex-col items-center py-2 px-1 text-xs ${
                  isActive('/favorites') ? 'text-orange-600' : 'text-gray-600'
                }`}
              >
                <Heart className="h-5 w-5 mb-1" />
                <span>Favorites</span>
              </Link>
            )}
            
            <Link 
              to="/reviews" 
              className={`flex flex-col items-center py-2 px-1 text-xs ${
                isActive('/reviews') ? 'text-orange-600' : 'text-gray-600'
              }`}
            >
              <Star className="h-5 w-5 mb-1" />
              <span>Reviews</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;