document.addEventListener("DOMContentLoaded", () => {
  const weatherForm = document.getElementById("weatherForm");
  const weatherResult = document.getElementById("weatherResult");

  weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value.trim();

    if (city === "") {
      alert("Please enter a city.");
      return;
    }

    try {
      const response = await fetch(`/weather?city=${city}`);
      const weatherData = await response.json();

      // Check if the API response contains valid weather data
      if (weatherData.cod !== "404" && weatherData.cod !== "400") {
        weatherResult.innerHTML = "";

        const cityName = document.createElement("h2");
        cityName.textContent = `Weather in ${weatherData.name}, ${weatherData.sys.country}`;
        weatherResult.appendChild(cityName);

        // Convert Kelvin to Celsius
        const temperatureCelsius = weatherData.main.temp - 273.15;
        // Convert Celsius to Fahrenheit
        const temperatureFahrenheit = (temperatureCelsius * 9) / 5 + 32;

        const temperature = document.createElement("p");
        temperature.textContent = `Temperature: ${temperatureFahrenheit.toFixed(
          2
        )}°F`;
        weatherResult.appendChild(temperature);

        const description = document.createElement("p");
        description.textContent = `Description: ${weatherData.weather[0].description}`;
        weatherResult.appendChild(description);
      } else {

        if (weatherData.cod === "500") {
          alert("Internal Server Error. Please try again later.");
        } else {
          alert("City not found. Please enter a valid city.");
        }
      }
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      alert(
        "An error occurred while fetching weather data. Please try again later."
      );
    }
  });
});
