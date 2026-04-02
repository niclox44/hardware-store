const { Sequelize } = require("sequelize");
require("dotenv").config();

/**
 * TODO: Configurați conexiunea la baza de date utilizând Sequelize.
 * Acest fișier ar trebui să:
 * 1. Încarce variabilele de mediu pentru configurarea bazei de date.
 * 2. Inițializeze o instanță Sequelize cu setările corespunzătoare.
 * 3. Configureze pool-ul de conexiuni pentru o gestionare eficientă a resurselor.
 * 4. Exportă instanța Sequelize pentru a fi utilizată în întreaga aplicație.
 */

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
);

module.exports = sequelize;
