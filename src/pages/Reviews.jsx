import React, { useState } from 'react';
import { Star, ThumbsUp, MessageCircle, Filter } from 'lucide-react';

const Reviews = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      recipeTitle: "Creamy Chicken Alfredo",
      recipeImage: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 5,
      comment: "Absolutely delicious! The cream sauce was perfectly smooth and the chicken was tender. My family loved it and asked for seconds.",
      author: "Sarah Johnson",
      date: "2024-01-20",
      helpful: 12
    },
    {
      id: 2,
      recipeTitle: "Chocolate Chip Cookies",
      recipeImage: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4,
      comment: "Great recipe! The cookies came out soft and chewy just like I wanted. I added a pinch of sea salt on top which made them even better.",
      author: "Mike Chen",
      date: "2024-01-18",
      helpful: 8
    },
    {
      id: 3,
      recipeTitle: "Fresh Garden Salad",
      recipeImage: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 5,
      comment: "Perfect summer salad! The dressing was light and refreshing. I used vegetables from my own garden and it was amazing.",
      author: "Emma Davis",
      date: "2024-01-15",
      helpful: 15
    },
    {
      id: 4,
      recipeTitle: "Beef Tacos",
      recipeImage: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4,
      comment: "Very tasty tacos! The seasoning blend was spot on. Next time I'll add more lime juice to brighten up the flavors even more.",
      author: "Carlos Rodriguez",
      date: "2024-01-12",
      helpful: 6
    },
    {
      id: 5,
      recipeTitle: "Homemade Pizza",
      recipeImage: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 5,
      comment: "Best pizza dough recipe I've tried! The crust was crispy on the outside and soft inside. Will definitely make this again.",
      author: "Lisa Thompson",
      date: "2024-01-10",
      helpful: 20
    }
  ];

  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true;
    if (filter === 'high') return review.rating >= 4;
    if (filter === 'low') return review.rating < 4;
    return true;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'helpful') return b.helpful - a.helpful;
    return 0;
  });

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recipe Reviews</h1>
          <p className="text-gray-600">See what our community is saying about their cooking experiences</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-700">Filter by Rating:</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Reviews</option>
                <option value="high">4+ Stars</option>
                <option value="low">Below 4 Stars</option>
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
                <option value="rating">Highest Rating</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {sortedReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex space-x-4">
                {/* Recipe Image */}
                <img
                  src={review.recipeImage}
                  alt={review.recipeTitle}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                
                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {review.recipeTitle}
                    </h3>
                    <div className="flex items-center space-x-1 mt-1 sm:mt-0">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>By {review.author}</span>
                      <span>•</span>
                      <span>{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-orange-600 transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{review.helpful}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-orange-600 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Reviews Message */}
        {sortedReviews.length === 0 && (
          <div className="text-center py-12">
            <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Reviews Found</h2>
            <p className="text-gray-600">Try adjusting your filters to see more reviews.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;