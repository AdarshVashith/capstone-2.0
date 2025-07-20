import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Heart, Clock, Users, Trash2, Star, Filter } from 'lucide-react';

const Favorites = () => {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock favorites data - In real app, this would come from Firebase
  const mockFavorites = [
    {
      id: 1,
      title: "Creamy Chicken Alfredo",
      image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400",
      cookTime: 30,
      servings: 4,
      rating: 4.8,
      userRating: 5,
      dateAdded: "2024-01-15",
      category: "Main Course"
    },
    {
      id: 3,
      title: "Fresh Garden Salad",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      cookTime: 15,
      servings: 2,
      rating: 4.6,
      userRating: 4,
      dateAdded: "2024-01-10",
      category: "Salad"
    },
    {
      id: 6,
      title: "Homemade Pizza",
      image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400",
      cookTime: 45,
      servings: 8,
      rating: 4.9,
      userRating: 5,
      dateAdded: "2024-01-05",
      category: "Main Course"
    },
    {
      id: 2,
      title: "Chocolate Chip Cookies",
      image: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400",
      cookTime: 25,
      servings: 24,
      rating: 4.9,
      userRating: 5,
      dateAdded: "2024-01-08",
      category: "Dessert"
    }
  ];

  useEffect(() => {
    if (currentUser) {
      // In real app, fetch user's favorites from Firebase
      setFavorites(mockFavorites);
    }
  }, [currentUser]);

  const removeFavorite = (recipeId) => {
    setFavorites(favorites.filter(recipe => recipe.id !== recipeId));
  };

  const updateUserRating = (recipeId, newRating) => {
    setFavorites(favorites.map(recipe => 
      recipe.id === recipeId 
        ? { ...recipe, userRating: newRating }
        : recipe
    ));
  };

  const filteredFavorites = favorites.filter(recipe => {
    if (filter === 'all') return true;
    if (filter === 'high-rated') return recipe.userRating >= 4;
    if (filter === 'recent') return new Date(recipe.dateAdded) > new Date('2024-01-10');
    return recipe.category.toLowerCase() === filter.toLowerCase();
  });

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.dateAdded) - new Date(a.dateAdded);
    if (sortBy === 'oldest') return new Date(a.dateAdded) - new Date(b.dateAdded);
    if (sortBy === 'rating') return b.userRating - a.userRating;
    if (sortBy === 'cookTime') return a.cookTime - b.cookTime;
    return a.title.localeCompare(b.title);
  });

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating 
            ? 'text-yellow-500 fill-current' 
            : 'text-gray-300'
        } ${interactive ? 'cursor-pointer hover:text-yellow-400 transition-colors' : ''}`}
        onClick={interactive && onStarClick ? () => onStarClick(i + 1) : undefined}
      />
    ));
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your favorites</p>
          <Link
            to="/login"
            className="px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorite Recipes</h1>
          <p className="text-gray-600">Your collection of saved recipes ({favorites.length} recipes)</p>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-700">Filter:</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Favorites</option>
                <option value="high-rated">High Rated (4+ stars)</option>
                <option value="recent">Recently Added</option>
                <option value="main course">Main Course</option>
                <option value="dessert">Dessert</option>
                <option value="salad">Salad</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="rating">My Rating</option>
                <option value="cookTime">Cook Time</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Favorites Grid */}
        {sortedFavorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedFavorites.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                    <button
                      onClick={() => removeFavorite(recipe.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Remove from favorites"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-orange-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                    {recipe.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {recipe.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-gray-600 text-sm mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{recipe.cookTime} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{recipe.servings} servings</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">★</span>
                      <span>{recipe.rating}</span>
                    </div>
                  </div>

                  {/* User Rating */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Your Rating:</p>
                    <div className="flex space-x-1">
                      {renderStars(recipe.userRating, true, (rating) => updateUserRating(recipe.id, rating))}
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mb-4">
                    Added on {new Date(recipe.dateAdded).toLocaleDateString()}
                  </p>

                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="block w-full bg-orange-600 text-white text-center py-2 rounded-md hover:bg-orange-700 transition-colors"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {filter === 'all' ? 'No Favorites Yet' : 'No Recipes Match Your Filter'}
            </h2>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? 'Start exploring recipes and save your favorites!' 
                : 'Try adjusting your filter to see more recipes.'
              }
            </p>
            <div className="space-x-4">
              {filter !== 'all' && (
                <button
                  onClick={() => setFilter('all')}
                  className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Clear Filter
                </button>
              )}
              <Link
                to="/"
                className="px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                Discover Recipes
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;