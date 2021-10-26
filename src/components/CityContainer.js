import React from 'react';
import CityCard from './CityCard';

function CityContainer( {cities, deleteCard, selectCard, unit }) {

    return (
        <div className="cities-container">
            {cities.map(city => <CityCard deleteCard={deleteCard} selectCard={selectCard} city={city} unit={unit}/>)}
        </div>
    );

}

export default CityContainer;