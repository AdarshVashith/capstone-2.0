import React from 'react';
import './RecipePage.css'; // Make sure to create matching styles

function RecipePage() {
  return (
    <div className="recipe-page">
      <header className="recipe-header">
        <h1>Find Recipes</h1>
        <div className="search-container">
          <input type="text" placeholder="Search recipes, ingredients, or cuisines..." />
          <button className="search-btn">
            🔍 Search
          </button>
        </div>
        <div className="filters">
          <select>
            <option>All Cuisines</option>
            <option>Italian</option>
            <option>Asian</option>
          </select>
          <select>
            <option>All Diets</option>
            <option>Vegetarian</option>
            <option>Vegan</option>
          </select>
          <select>
            <option>Any Time</option>
            <option>Under 30 mins</option>
            <option>1 hour</option>
          </select>
        </div>
      </header>

      <main className="recipes-list">
        <h2>All Recipes <span>(6 recipes)</span></h2>
        <div className="recipe-cards">
          <div className="card">
            <img src="https://via.placeholder.com/250" alt="Dish" />
            <div className="card-content">
              <h3>Spaghetti Carbonara</h3>
              <p>⏱ 30 mins • 👥 4 servings</p>
              <span className="tag">Italian</span>
            </div>
          </div>

          <div className="card">
            <img src="https://via.placeholder.com/250" alt="Dish" />
            <div className="card-content">
              <h3>Vegetable Stir Fry</h3>
              <p>⏱ 20 mins • 👥 2 servings</p>
              <span className="tag">Asian</span>
            </div>
          </div>

          {/* Add more cards similarly */}
        </div>
      </main>
    </div>
  );
}

export default RecipePage;
