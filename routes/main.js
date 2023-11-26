const express = require("express");
const router = express.Router();

const fetchWeather = require("../controller/main");

router.route("/weather").get(fetchWeather);

module.exports = router;
