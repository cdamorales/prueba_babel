const getAllCitiesQuery =
  "SELECT c.id, c.detailName, p.name as masterName FROM CIUDADES as c INNER JOIN PAISES p ON p.id=c.masterId;";
const getCityQuery =
  "SELECT c.id, c.detailName, p.name as masterName FROM CIUDADES as c INNER JOIN PAISES p ON p.id=c.masterId WHERE c.id = ?;";
const insertCityQuery =
  "INSERT INTO  CIUDADES (detailName, masterId) VALUES (?,?);";
const updateCityQuery =
  "UPDATE CIUDADES SET detailName = ? and masterId=? WHERE id = ?";
const deleteCityQuery = "DELETE FROM CIUDADES WHERE id=?";

const deleteAllCitiesFromCountry = "DELETE FROM CIUDADES WHERE masterId=?";

module.exports.getAllCitiesQuery = getAllCitiesQuery;
module.exports.getCityQuery = getCityQuery;
module.exports.insertCityQuery = insertCityQuery;
module.exports.updateCityQuery = updateCityQuery;
module.exports.deleteCityQuery = deleteCityQuery;
module.exports.deleteAllCitiesFromCountry = deleteAllCitiesFromCountry;
