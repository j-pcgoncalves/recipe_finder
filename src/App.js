import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const APP_ID = process.env.REACT_APP_API_ID;
  const APP_KEY = process.env.REACT_APP_API_KEY;

  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("Turkey");
  const [isLoading, setIsLoading] = useState(true);

  // Limit the api request to a button click because it only has 10 requests per minute
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();

      setRecipes(data.hits);
      setIsLoading(false);
    };

    fetchRecipes();
  }, [isBtnClicked]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateSearch = e => {
    setQuery(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setIsBtnClicked(!isBtnClicked ? true : false);
    setIsLoading(true);
    setTimeout(e => {
      setQuery("");
    }, 10);
  };

  return (
    <div className="App">
      <form className="search-form">
        <input 
          onChange={updateSearch}
          onClick={e => e.target.value === "Turkey" ? e.target.value = "" : null}
          value={query}
          placeholder="Search recipes"
          className="search-bar"
          type="text"
          spellCheck="false"
        />
        <button
          onClick={getSearch}
          className="search-btn"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default App;
