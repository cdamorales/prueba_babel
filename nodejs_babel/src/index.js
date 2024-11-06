const express = require("express");
const cors = require("cors");
const {
  getAllContries,
  addCountry,
  getCountry,
  updateCountry,
  deleteCountry,
} = require("./controller/CountryController");
const {
  deleteCity,
  updateCity,
  getCity,
  addCity,
  getAllCities,
} = require("./controller/CitiesController");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

app.get("/countries", getAllContries);
app.get("/country/:id", getCountry);
app.put("/country", updateCountry);
app.post("/country", addCountry);
app.delete("/country/:id", deleteCountry);

app.get("/cities", getAllCities);
app.get("/city/:id", getCity);
app.put("/city", updateCity);
app.post("/city", addCity);
app.delete("/city/:id", deleteCity);

app.listen(3000, () => {
  console.log("app listen on 3000");
});
