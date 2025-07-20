import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Users, Heart } from 'lucide-react';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock recipe data - In real app, this would come from API
  const featuredRecipes = [
    {
      id: 1,
      title: "Creamy Chicken Alfredo",
      image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400",
      cookTime: 30,
      servings: 4,
      rating: 4.8
    },
    {
      id: 2,
      title: "Chocolate Chip Cookies",
      image: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400",
      cookTime: 25,
      servings: 24,
      rating: 4.9
    },
    {
      id: 3,
      title: "Fresh Garden Salad",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      cookTime: 15,
      servings: 2,
      rating: 4.6
    },
    {
      id: 4,
      title: "Beef Tacos",
      image: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=400",
      cookTime: 20,
      servings: 6,
      rating: 4.7
    },
    {
      id: 5,
      title: "Vegetable Stir Fry",
      image: "https://images.pexels.com/photos/1998634/pexels-photo-1998634.jpeg?auto=compress&cs=tinysrgb&w=400",
      cookTime: 15,
      servings: 3,
      rating: 4.5
    },
    {
      id: 6,
      title: "Homemade Pizza",
      image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400",
      cookTime: 45,
      servings: 8,
      rating: 4.9
    }
  ];

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const filtered = featuredRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setRecipes(filtered);
      setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    setRecipes(featuredRecipes);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Kitchen
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover delicious recipes from around the world
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex rounded-lg overflow-hidden shadow-lg">
                <input
                  type="text"
                  placeholder="Search for recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-6 py-4 text-gray-900 text-lg focus:outline-none"
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-orange-700 hover:bg-orange-800 px-6 py-4 transition-colors disabled:opacity-50"
                >
                  <Search className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recipes Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          {searchTerm ? `Search Results for "${searchTerm}"` : 'Featured Recipes'}
        </h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <Link
                key={recipe.id}
                to={`/recipe/${recipe.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center justify-between text-gray-600 text-sm">
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
                  <button className="mt-4 w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2">
                    <span>View Recipe</span>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {recipes.length === 0 && !loading && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No recipes found for "{searchTerm}"</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setRecipes(featuredRecipes);
              }}
              className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
            >
              Show All Recipes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;