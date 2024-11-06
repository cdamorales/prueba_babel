const { getConnection } = require("../model/db");
const {
  updateCityQuery,
  insertCityQuery,
  getCityQuery,
  getAllCitiesQuery,
  deleteCityQuery,
} = require("../model/CitiesModels");

const getAllCities = async (req, res) => {
  try {
    const connection = await getConnection();
    const [cities, fileds] = await connection.query(getAllCitiesQuery);
    console.log(cities);
    res.status(200).send(cities);
  } catch (error) {
    console.log("🚀 ~ getAllCities ~ error:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

const addCity = async (req, res) => {
  try {
    const body = req.body;
    if (body && body.detailName && body.masterId) {
      const detailName = body.detailName;
      const masterId = body.masterId;
      const connection = await getConnection();
      const [results, fileds] = await connection.query(insertCityQuery, [
        detailName,
        masterId,
      ]);
      console.log(results);
      res.status(201).send({ id: results.insertId });
    } else {
      res.status(500).send({ msg: "Incorrect Params" });
    }
  } catch (error) {
    console.log("🚀 ~ addCity ~ error:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

const getCity = async (req, res) => {
  try {
    const params = req.params;
    if (params && params.id) {
      const id = params.id;
      const connection = await getConnection();
      const [cities, fileds] = await connection.query(getCityQuery, [id]);
      console.log(cities);
      if (cities.length > 0) {
        res.status(200).send(cities[0]);
      } else {
        res.status(500).send({ msg: "City not exist" });
      }
    } else {
      res.status(500).send({ msg: "Incorrect Params" });
    }
  } catch (error) {
    console.log("🚀 ~ getCity ~ error:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};
const updateCity = async (req, res) => {
  try {
    const body = req.body;
    if (body && body.detailName && body.id && body.masterId) {
      const detailName = body.detailName;
      const id = body.id;
      const masterId = body.masterId;
      const connection = await getConnection();
      const [cities, fileds] = await connection.query(updateCityQuery, [
        detailName,
        masterId,
        id,
      ]);
      console.log(cities);
      if (cities.affectedRows > 0) {
        res.status(200).send({ id, masterId, detailName });
      } else {
        res.status(500).send({ msg: "City not exist" });
      }
    } else {
      res.status(500).send({ msg: "Incorrect Params" });
    }
  } catch (error) {
    console.log("🚀 ~ updateCity ~ error:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

const deleteCity = async (req, res) => {
  try {
    const params = req.params;
    if (params && params.id) {
      const id = params.id;
      const connection = await getConnection();
      const [results, fields_delete] = await connection.query(deleteCityQuery, [
        id,
      ]);
      if (results.affectedRows > 0) {
        res.status(200).send({ id_deleted: id });
      } else {
        res.status(500).send({ msg: "deleteCity not exist" });
      }
    } else {
      res.status(500).send({ msg: "Incorrect Params" });
    }
  } catch (error) {
    console.log("🚀 ~ deleteCountry ~ error:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports.getAllCities = getAllCities;
module.exports.addCity = addCity;
module.exports.getCity = getCity;
module.exports.updateCity = updateCity;
module.exports.deleteCity = deleteCity;
