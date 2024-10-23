import "./styles.css"

let button = document.querySelector("button");
let input = document.querySelector("input");
let h2 = document.querySelector("h2");

button.onclick = function(){
    getWeather(input.value);
}

async function getWeather(location) {
    try {
        let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=3MJ2RA58RMTK83F5V2DPKQKJG&contentType=json`);
        let weatherData = await response.json()
        h2.textContent = JSON.stringify(weatherData.currentConditions);
    } catch (error) {
        h2.textContent = `${error}, please try again!`;
        console.log(error)
    }
}