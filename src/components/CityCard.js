import React from 'react';

function CityCard({ city, deleteCard, selectCard, unit }) {

    const handleDelete = (event) => {
        deleteCard(city);
        event.stopPropagation();
    }

    const handleSelect = () => {
        selectCard(city)
    }

    return(
    (Object.keys(city).length !== 0) ?
        (<div onClick={handleSelect}>
            <div className={city.isSelected ? "city-card-selected" : "city-card"}>
                <div className="btn-container">
                        <button className={city.isSelected ? "delete-btn-selected" : "delete-btn"} onClick={handleDelete}>
                            <i className="fa fa-close"></i>
                        </button>
                </div>
                <p className="location">{city.location.name}, {(city.location.region !== "") ? city.location.region : city.location.country}</p>
                <p className="temp">{(unit === "F") ? Math.round(city.weather.temp_f) : Math.round(city.weather.temp_c)}&deg;{unit}</p>
                <img id="main-cond" src={`http://openweathermap.org/img/wn/${city.weather.icon}@2x.png`} alt="icon" />
                <p className="description">{city.weather.desc}</p>     
            </div>
        </div>
        ) : null
    );
}

export default CityCard;