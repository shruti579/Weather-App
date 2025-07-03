import React, { useEffect, useRef, useState } from 'react'
import'./Weather.css'
import search_icon from'../Assets/search.png'
import clear_icon from'../Assets/clear.png'
import cloud_icon from'../Assets/cloud.png'
import drizzle_icon from'../Assets/drizzle.png'
import wind_icon from'../Assets/wind.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import humidity_icon from'../Assets/humidity.png'
const Weather = () => {
  
  const [weatherData,setWeatherData]=useState(false);
  const allIcons={
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "010d":rain_icon,
    "010n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon
  }
  const inputRef=useRef()

  const search=async(city)=>{
    if(city===""){
      alert("Enter city name");
      return;
    }
    try{
      // const apiKey = '69e0224c305c19cc91b9df3bcff9108e'; 
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
     
      const response=await fetch(url)
      const data=await response.json()

      if (!response.ok){
        alert(data.message);
        return;
      }
      console.log(data)
      
      const icon=allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData(
        {
          humidity:data.main.humidity,
          windSpeed:data.wind.speed,
          temperature:Math.floor(data.main.temp),
          location:data.name,
          icon:icon
        }
      )
    }catch(error){
  setWeatherData(false);
  console.log("Error in fetching weather Data")
    }
  }
  // useEffect is used here to fetch weather data for a default city ("New York") as soon as the component mounts.
    useEffect(()=>{
      search("New York");
    },[])     
  
   // Function to handle Enter key press event
   const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      search(inputRef.current.value);
    }
  };

  return (
    <>
    <div className='weather'>
        <div className='search-bar'>
         <input  ref={inputRef} type='text' placeholder='Search'  onKeyDown={handleKeyPress}/>
         <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
        </div>

        {weatherData?
        <>
<img  className='weather-icon' src={weatherData.icon} alt=""/>
        <p className='temp'>{weatherData.temperature}°c</p>  {/*changes*/}
        <p className='location'>{weatherData.location}</p>  {/*changes*/}
        <div className='weather-data'>
            <div className='col'>
              <img src={humidity_icon} alt=""/>
              <div>
                <p>{weatherData.humidity}%</p> {/*changes*/}
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind_icon} alt=""/>
              <div>
                <p>{weatherData.windSpeed} km/h</p>  {/*changes*/}
                <span>Wind Speed</span>
              </div>
            </div>
        </div>
        </>
        :
        <>
        </>}
        
    </div>
    </>
  )
}

export default Weather