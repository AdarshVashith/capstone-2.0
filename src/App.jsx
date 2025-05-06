import './App.css'
import x from './content/vid.mp4'

function App() {
  return (
    <div className="vif">
      <video autoPlay loop muted className="background-clip"> 
        <source src={x} type="video/mp4" />
      </video>

      <div className="overlay">
        <div className="top-nav">
          <div className="logo">Home Recipes</div>
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="./RecipePage.jsx">Recipes</a>
            <a href="#">Favorites</a>
            <a href="#">About</a>
          </div>
        </div>

        <div className="main-content">
          <h1>KITCHEN</h1>
          <p>Discover delicious recipes for every occasion</p>
          <div className="search-bar">
            <input type="text" placeholder="Search recipes" />
            <button><span role="img" aria-label="search"></span> Search</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
