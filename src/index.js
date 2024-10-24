import "./styles.css"
import nightimage from "./images/night.png";
import morningimage from "./images/morning.png";
import afternoonimage from "./images/afternoon.jpg";
import eveningimage from "./images/evening.png";

let button = document.querySelector("button");
let input = document.querySelector("input");
let content = document.getElementById("content");

button.onclick = () => {
    fetchWeatherData(input.value)
    .then((weatherData) => {
        content.innerHTML = "";
        let data = {};
        const { temp,feelslike,humidity,snow,windspeed,uvindex,conditions,sunrise,sunset } = weatherData.currentConditions;
        data.temp = temp;
        data.feelslike = feelslike;
        data.humidity = humidity;
        data.snow = snow;
        data.windspeed = windspeed;
        data.uvindex = uvindex;
        data.conditions = conditions;
        data.sunrise = sunrise;
        data.sunset = sunset;

        let background = document.createElement("img");

        console.log(weatherData.tzoffset);

        let currentTime = getCurrentTimeInOffset(weatherData.tzoffset);

        let timeofday = getTimeOfDay(currentTime,sunrise,sunset);
        
        if(timeofday === "morning"){
            background.src = morningimage;
        }else if(timeofday === "afternoon"){
            background.src = afternoonimage;
        }else if(timeofday === "evening"){
            background.src = eveningimage;
        }else{
            background.src = nightimage;
        }
        content.appendChild(background);

        Object.keys(data).forEach((key) => {
            const title = document.createElement("h2");
            title.textContent = `${key} : ${data[key]}`;
            content.appendChild(title);
        })
    })
}

function getTimeOfDay(currentTime, sunriseTime, sunsetTime) {
    const endOfMorning = "12:00:00"; // Define the end of morning
    const endOfEvening = "18:00:00"; // Define the end of evening
  
    if (currentTime < sunriseTime) {
      return "night"; // Before sunrise
    } else if (currentTime >= sunriseTime && currentTime < endOfMorning) {
      return "morning"; // Between sunrise and noon
    } else if (currentTime >= endOfMorning && currentTime < endOfEvening) {
      return "afternoon"; // Between noon and 6 PM
    } else if (currentTime >= endOfEvening && currentTime < sunsetTime) {
      return "evening"; // Between 6 PM and sunset
    } else if (currentTime >= sunsetTime) {
      return "night"; // After sunset
    }
}



function getCurrentTimeInOffset(offsetHours) {
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const offsetInMinutes = offsetHours * 60;
    const localTime = new Date(utcTime + offsetInMinutes * 60000);
    
    const hours = String(localTime.getHours()).padStart(2, '0');
    const minutes = String(localTime.getMinutes()).padStart(2, '0');
    const seconds = String(localTime.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

async function fetchWeatherData(location) {
    try {
        let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=3MJ2RA58RMTK83F5V2DPKQKJG&contentType=json`);
        let weatherData = await response.json()
        return weatherData;
    } catch (error) {
        console.log(error)
    }
}