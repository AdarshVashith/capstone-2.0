import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Clock, Users, Star, Heart, ArrowLeft, ChefHat } from 'lucide-react';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [savedUserRating, setSavedUserRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  // Mock recipe data - In real app, this would come from API
  const mockRecipes = {
    1: {
      id: 1,
      title: "Creamy Chicken Alfredo",
      image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800",
      cookTime: 30,
      servings: 4,
      rating: 4.8,
      difficulty: "Medium",
      description: "A rich and creamy pasta dish with tender chicken and a perfectly seasoned alfredo sauce. This restaurant-quality recipe is surprisingly easy to make at home.",
      ingredients: [
        "1 lb fettuccine pasta",
        "2 chicken breasts, sliced",
        "1 cup heavy cream",
        "1/2 cup butter",
        "1 cup grated Parmesan cheese",
        "3 cloves garlic, minced",
        "Salt and pepper to taste",
        "Fresh parsley for garnish",
        "2 tbsp olive oil"
      ],
      instructions: [
        "Cook fettuccine according to package directions. Drain and set aside.",
        "Season chicken with salt and pepper. Heat olive oil in a large skillet over medium-high heat.",
        "Cook chicken until golden brown and cooked through, about 6-7 minutes per side. Remove and slice.",
        "In the same skillet, melt butter and add minced garlic. Cook for 1 minute.",
        "Add heavy cream and bring to a simmer. Cook for 2-3 minutes until slightly thickened.",
        "Remove from heat and stir in Parmesan cheese until melted and smooth.",
        "Add cooked pasta and chicken to the sauce. Toss to combine.",
        "Garnish with fresh parsley and serve immediately."
      ],
      nutrition: {
        calories: 650,
        protein: 35,
        carbs: 45,
        fat: 38
      }
    },
    2: {
      id: 2,
      title: "Chocolate Chip Cookies",
      image: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800",
      cookTime: 25,
      servings: 24,
      rating: 4.9,
      difficulty: "Easy",
      description: "Classic soft and chewy chocolate chip cookies that are crispy on the edges and tender in the center. Perfect for any occasion!",
      ingredients: [
        "2 1/4 cups all-purpose flour",
        "1 tsp baking soda",
        "1 tsp salt",
        "1 cup butter, softened",
        "3/4 cup granulated sugar",
        "3/4 cup brown sugar",
        "2 large eggs",
        "2 tsp vanilla extract",
        "2 cups chocolate chips"
      ],
      instructions: [
        "Preheat oven to 375°F (190°C).",
        "In a bowl, whisk together flour, baking soda, and salt.",
        "In a large bowl, cream together butter and both sugars until light and fluffy.",
        "Beat in eggs one at a time, then add vanilla extract.",
        "Gradually mix in the flour mixture until just combined.",
        "Fold in chocolate chips.",
        "Drop rounded tablespoons of dough onto ungreased baking sheets.",
        "Bake for 9-11 minutes until golden brown around edges.",
        "Cool on baking sheet for 5 minutes before transferring to wire rack."
      ],
      nutrition: {
        calories: 180,
        protein: 2,
        carbs: 24,
        fat: 9
      }
    },
    3: {
      id: 3,
      title: "Fresh Garden Salad",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
      cookTime: 15,
      servings: 2,
      rating: 4.6,
      difficulty: "Easy",
      description: "A vibrant and refreshing salad packed with fresh vegetables and a light vinaigrette dressing. Perfect as a side dish or light meal.",
      ingredients: [
        "4 cups mixed greens",
        "1 cucumber, sliced",
        "2 tomatoes, diced",
        "1/2 red onion, thinly sliced",
        "1 bell pepper, diced",
        "1/4 cup olive oil",
        "2 tbsp balsamic vinegar",
        "1 tsp Dijon mustard",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Wash and dry all vegetables thoroughly.",
        "In a large bowl, combine mixed greens, cucumber, tomatoes, red onion, and bell pepper.",
        "In a small bowl, whisk together olive oil, balsamic vinegar, and Dijon mustard.",
        "Season dressing with salt and pepper to taste.",
        "Pour dressing over salad just before serving.",
        "Toss gently to coat all ingredients evenly.",
        "Serve immediately while vegetables are crisp."
      ],
      nutrition: {
        calories: 120,
        protein: 3,
        carbs: 8,
        fat: 9
      }
    }
  };

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely delicious! My family loved it.",
      date: "2024-01-20"
    },
    {
      id: 2,
      author: "Mike Chen",
      rating: 4,
      comment: "Great recipe, will make again!",
      date: "2024-01-18"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundRecipe = mockRecipes[id];
      if (foundRecipe) {
        setRecipe(foundRecipe);
        setReviews(mockReviews);
        // Simulate loading user's existing rating
        setSavedUserRating(4); // Mock saved rating
      }
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleFavoriteToggle = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setIsFavorite(!isFavorite);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (userRating === 0 || !review.trim()) return;

    const newReview = {
      id: reviews.length + 1,
      author: currentUser.email,
      rating: userRating,
      comment: review,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([newReview, ...reviews]);
    setSavedUserRating(userRating);
    setUserRating(0);
    setReview('');
  };

  const handleQuickRating = (rating) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setSavedUserRating(rating);
    // In real app, save to Firebase here
  };

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating 
            ? 'text-yellow-500 fill-current' 
            : 'text-gray-300'
        } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
        onClick={interactive && onStarClick ? () => onStarClick(i + 1) : undefined}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Recipe Not Found</h2>
          <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-orange-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Recipes</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Recipe Header */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{recipe.title}</h1>
                  <button
                    onClick={handleFavoriteToggle}
                    className={`p-2 rounded-full transition-colors ${
                      isFavorite 
                        ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-6">{recipe.description}</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <Clock className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Cook Time</p>
                    <p className="font-semibold">{recipe.cookTime} min</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <Users className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Servings</p>
                    <p className="font-semibold">{recipe.servings}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <Star className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Rating</p>
                    <p className="font-semibold">{recipe.rating}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <ChefHat className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Difficulty</p>
                    <p className="font-semibold">{recipe.difficulty}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Nutrition Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nutrition (per serving)</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Calories</span>
                  <span className="font-semibold">{recipe.nutrition.calories}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Protein</span>
                  <span className="font-semibold">{recipe.nutrition.protein}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Carbs</span>
                  <span className="font-semibold">{recipe.nutrition.carbs}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fat</span>
                  <span className="font-semibold">{recipe.nutrition.fat}g</span>
                </div>
              </div>
            </div>

            {/* Add Review */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              {/* Quick Rating */}
              {currentUser && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Rating</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Rate this recipe:</span>
                    <div className="flex space-x-1">
                      {renderStars(savedUserRating, true, handleQuickRating)}
                    </div>
                    {savedUserRating > 0 && (
                      <span className="text-sm text-green-600 ml-2">
                        ✓ Rated {savedUserRating} star{savedUserRating !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">Add Your Review</h3>
              {currentUser ? (
                <form onSubmit={handleReviewSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Rating
                    </label>
                    <div className="flex space-x-1">
                      {renderStars(userRating, true, setUserRating)}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Review
                    </label>
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      rows={4}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Share your thoughts about this recipe..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={userRating === 0 || !review.trim()}
                    className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Review
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Please login to add a review</p>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Reviews ({reviews.length})</h3>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex space-x-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700 mb-2">{review.comment}</p>
                      <p className="text-sm text-gray-500">- {review.author}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;