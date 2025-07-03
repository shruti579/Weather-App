import React, { useState } from "react";
import "./Weather.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import wind_icon from "../Assets/wind.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import humidity_icon from "../Assets/humidity.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const [city, setCity] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "010d": rain_icon,
    "010n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async () => {
    if (city === "") {
      alert("Enter city name"); // This will now show the alert before making the API request
      return; // Stop execution of the function
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message); // Show the API's error message if the request fails
        return; // Stop execution if the response is not ok
      }

      console.log(data);
      setWeatherData(data);
      setCity(""); // Reset city input field
    } catch (error) {
      console.log("Error in fetching weather data");
      setWeatherData(false);
    }
  };

  const handleClick = () => {
    search();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search(); // Trigger the search function when the Enter key is pressed
    }
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          value={city}
          type="text"
          placeholder="Search"
          onChange={handleChange}
          onKeyDown={handleKeyPress} // Listen for key presses
        />
        <img src={search_icon} alt="" onClick={handleClick} />
      </div>

      {weatherData ? (
        <>
          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt=""
          />
          <p className="temp">{Math.floor(weatherData.main.temp)}°c</p>
          <p className="location">{weatherData.name}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.main.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.wind.speed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
