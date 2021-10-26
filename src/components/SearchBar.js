import React, { useState } from 'react';


function SearchBar({getWeather}) {

    const [query, setQuery] = useState("");

    const handleEnter = (event) => {
        if (event.key === "Enter") {
            getWeather(query);
            setQuery("");
        }
    }

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search City or Zip Code" 
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyPress={handleEnter}
            ></input>
            
        </div>
    );

}

export default SearchBar;