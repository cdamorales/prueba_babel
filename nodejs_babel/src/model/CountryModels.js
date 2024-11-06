const getAllCountriesQuery = "SELECT c.id, c.name FROM PAISES as c;";
const getCountryQuery = "SELECT c.id, c.name FROM PAISES as c WHERE c.id = ?;";
const insertCountryQuery = "INSERT INTO PAISES (name) VALUES (?);";
const updateCountryQuery = "UPDATE PAISES SET name = ? WHERE id = ?";
const deleteCountryQuery = "DELETE FROM PAISES WHERE id=?";
const getCountryChildrensCountQuery =
  "SELECT COUNT(*) as childrens FROM CIUDADES c INNER JOIN PAISES p ON p.id=c.masterId WHERE p.id=?";
module.exports.getAllCountriesQuery = getAllCountriesQuery;
module.exports.insertCountryQuery = insertCountryQuery;
module.exports.getCountryQuery = getCountryQuery;
module.exports.updateCountryQuery = updateCountryQuery;
module.exports.getCountryChildrensCountQuery = getCountryChildrensCountQuery;
module.exports.deleteCountryQuery = deleteCountryQuery;
