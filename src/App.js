import React, { useState, useEffect }from 'react';
import SearchBar from './components/SearchBar';
import CityContainer from './components/CityContainer';
import Forecast from './components/Forecast';

function App() {

  const [cities, setCities] = useState([]);
  const [currentUnit, setCurrentUnit] = useState("F");

  const getWeather = async (query) => {
    try {
      if (cities.length === 4) {
        return;
      }
      let url = `https://api.weatherapi.com/v1/current.json?key=aa59dfe7f903424ead2132024210109&q=${query}`;
      let response = await fetch(url);
      if (!response.ok) {
        alert("The status is wrong! Expected: 200, Was: " + response.status);
        return;
      }
      let data = await response.json();

      url = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.location.lat}&lon=${data.location.lon}&appid=eaf5b769f543ae241ec6dbf053eafaea&units=imperial`
      response = await fetch(url);
      if (!response.ok) {
        alert("The status is wrong! Expected: 200, Was: " + response.status);
        return;
      }
      
      let forecastData = await response.json();

      let newCity = 
              {isSelected: true,
              weather: 
                  {temp_f: data.current.temp_f, 
                  temp_c: data.current.temp_c,
                  desc: data.current.condition.text,
                  icon: forecastData.current.weather[0].icon},

              location: 
                  {name: data.location.name,
                  region: data.location.region,
                  country: data.location.country,
                  lat: data.location.lat,
                  long: data.location.lon},
                
                forecast: forecastData.daily};

      const citiesCopy = cities.map(c => ({...c, isSelected: false}));     
      setCities([...citiesCopy, newCity]);

    } catch (error) {
      alert(error);
    }
  }

  const deleteCard = (city) => {
    let newCities = cities.filter(c => c !== city);
    if (city.isSelected && newCities.length > 0) {
      newCities[0].isSelected = true;
    }
    setCities(newCities);
  }

  const selectCard = (city) => {
    const citiesCopy = cities.map(c => ({...c, isSelected: false}));
    let index = cities.indexOf(city);
    citiesCopy[index].isSelected = true;
    setCities(citiesCopy);
  }

  const handleClick = () => {
    if (currentUnit === "F") {
        setCurrentUnit("C");
    } else {
        setCurrentUnit("F");
    }
}
  
  return (
    <div className="App">
      <button onClick={handleClick} className="units-btn">&deg;{currentUnit}</button>
      <img id="appicon" src="https://image.flaticon.com/icons/png/512/2204/2204335.png" alt="appicon"></img>
      <h1 className="title">Weather App</h1>
      <SearchBar getWeather={getWeather}/>

      <CityContainer 
        cities={cities}
        deleteCard={deleteCard}
        selectCard={selectCard}
        unit={currentUnit}/>


        {(cities.length !== 0) ? (<Forecast cities={cities} unit={currentUnit}/>) : null}

    </div>
  );
}

export default App;
