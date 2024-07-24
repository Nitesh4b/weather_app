const apiKey = "1596895628265be20668e7dab6132696";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherImg = document.querySelector(".display img");
const cityName = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidityVal");
const windSpeed = document.querySelector(".windVal");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        console.log(data);

        // Updating elements values
        cityName.innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp) + `°C`;
        humidity.innerHTML = data.main.humidity + `%`;
        windSpeed.innerHTML = data.wind.speed + `km/h`;

        // Updating weather icon images
        if (data.weather[0].main === "Clouds") {
            weatherImg.src = "images/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weatherImg.src = "images/clear.png";
        } else if (data.weather[0].main === "Rain") {
            weatherImg.src = "images/rain.png";
        } else if (data.weather[0].main === "Mist") {
            weatherImg.src = "images/mist.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherImg.src = "images/drizzle.png";
        } else if (data.weather[0].main === "Snow") {
            weatherImg.src = "images/snow.png";
        }
        weatherImg.style.width = "";
    } catch (error) {
        console.error(error);
        // Display error message and image
        cityName.innerHTML = "Enter a valid city name";
        temp.innerHTML = "Error!!";
        humidity.innerHTML = "404 !!";
        windSpeed.innerHTML = "404 !!";
        weatherImg.src = "images/error.webp";
        weatherImg.style.width = "300px";
    }
}

// Handling event calls
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

// Load default city weather information
checkWeather("New York");
