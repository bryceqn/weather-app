import React from 'react';

function Forecast({cities, unit}) {

    const forecastData = (cities.filter(c => c.isSelected))[0].forecast;

    
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const displayDate = (day) => {
        let date = new Date(day.dt * 1000);
        let dayOfWeek = weekdays[date.getDay()];
        let dayofMonth = date.getDate();
        console.log(day.weather.icon);
        return (
            <div>
                <span className="day-of-week">{dayOfWeek} </span>
                <span className="day-of-month">{dayofMonth}</span>
            </div>
        );
    }

    const displayTemp = (day) => {
        let maxTemp = Math.round(day.temp.max);
        let minTemp = Math.round(day.temp.min);
        if (unit === "C") {
            maxTemp = Math.round((maxTemp - 32) * (5/9))  
            minTemp = Math.round((minTemp - 32) * (5/9));  
        }
        return (
            <p className="max-min-temps">{maxTemp}&deg;/{minTemp}&deg;</p>
        );
    }

    return (
        <div className="forecast-container">
            {forecastData.map(day => (
                                <div className="forecast-card">
                                        {displayDate(day)}
                                        <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}/>
                                        {displayTemp(day)}
                                </div>))
            }
        </div>
    );

}

export default Forecast;