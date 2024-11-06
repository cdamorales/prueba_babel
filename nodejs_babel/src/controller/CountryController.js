const { getConnection } = require("../model/db");
const {
  getAllCountriesQuery,
  insertCountryQuery,
  getCountryQuery,
  updateCountryQuery,
  getCountryChildrensCountQuery,
  deleteCountryQuery,
} = require("../model/CountryModels");

const { deleteAllCitiesFromCountry } = require("../model/CitiesModels");

const getAllContries = async (req, res) => {
  try {
    const connection = await getConnection();
    const [countries, fileds] = await connection.query(getAllCountriesQuery);
    console.log(countries);
    res.status(200).send(countries);
  } catch (error) {
    console.log("🚀 ~ getAllCountriesQuery ~ error:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

const addCountry = async (req, res) => {
  try {
    const body = req.body;
    if (body && body.name) {
      const name = body.name;
      const connection = await getConnection();
      const [countries, fileds] = await connection.query(insertCountryQuery, [
        name,
      ]);
      console.log(countries);
      res.status(201).send({ id: countries.insertId });
    } else {
      res.status(500).send({ msg: "Incorrect Params" });
    }
  } catch (error) {
    console.log("🚀 ~ addCountry ~ error:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

const getCountry = async (req, res) => {
  try {
    const params = req.params;
    if (params && params.id) {
      const id = params.id;
      const connection = await getConnection();
      const [countries, fileds] = await connection.query(getCountryQuery, [id]);
      console.log(countries);
      if (countries.length > 0) {
        res.status(200).send(countries[0]);
      } else {
        res.status(500).send({ msg: "Country not exist" });
      }
    } else {
      res.status(500).send({ msg: "Incorrect Params" });
    }
  } catch (error) {
    console.log("🚀 ~ getCountry ~ error:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};
const updateCountry = async (req, res) => {
  try {
    const body = req.body;
    if (body && body.name && body.id) {
      const name = body.name;
      const id = body.id;
      const connection = await getConnection();
      const [countries, fileds] = await connection.query(updateCountryQuery, [
        name,
        id,
      ]);
      console.log(countries);
      if (countries.affectedRows > 0) {
        res.status(200).send({ id, name });
      } else {
        res.status(500).send({ msg: "Country not exist" });
      }
    } else {
      res.status(500).send({ msg: "Incorrect Params" });
    }
  } catch (error) {
    console.log("🚀 ~ updateCountry ~ error:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const params = req.params;
    if (params && params.id) {
      const id = params.id;
      const connection = await getConnection();
      const [childrensCount, fileds] = await connection.query(
        getCountryChildrensCountQuery,
        [id]
      );
      if (childrensCount.length > 0 && childrensCount[0].childrens > 0) {
        const [deletedChildrens, deletedChildrensFileds] =
          await connection.query(deleteAllCitiesFromCountry, [id]);
        if (deletedChildrens.affectedRows !== childrensCount[0].childrens) {
          res.status(500).send({ msg: "Cant delete Country detail" });
        }
      }
      const [results, fields_delete] = await connection.query(
        deleteCountryQuery,
        [id]
      );
      if (results.affectedRows > 0) {
        res.status(200).send({ id_deleted: id });
      } else {
        res.status(500).send({ msg: "Country not exist" });
      }
    } else {
      res.status(500).send({ msg: "Incorrect Params" });
    }
  } catch (error) {
    console.log("🚀 ~ deleteCountry ~ error:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports.getAllContries = getAllContries;
module.exports.addCountry = addCountry;
module.exports.getCountry = getCountry;
module.exports.updateCountry = updateCountry;
module.exports.deleteCountry = deleteCountry;
