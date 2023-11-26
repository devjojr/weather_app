const axios = require("axios");

const fetchWeather = async (req, res) => {
  try {
    const city = req.query.city;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    res.json(weatherData);
  } catch (error) {
    console.log("Error fetching weather data:", error.message);
    res
      .status(error.response?.status || 500)
      .json({ cod: "500", message: "Server Error" });
  }
};

module.exports = fetchWeather;
