import React, { useEffect, useState } from "react";
import "./App.css";
import configEnv from "./configEnv";
import Spinner from "./components/spinner/Spinner";

const App = () => {
  const APP_ID = configEnv.APP_ID;
  const APP_KEY = configEnv.APP_KEY;

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

      {isLoading ? <Spinner /> : <div className="eachRecipe">
        
        </div>
      }
    </div>
  );
}

export default App;
