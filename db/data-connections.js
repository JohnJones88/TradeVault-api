const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql'
});

const connectToDb = async () => {
  try {

    sequelize.sync({ force: false });

    await sequelize.authenticate();
    console.log("Successfully connected to our db")

  } catch (error) {
    console.log(error)

  }
}

module.exports = { sequelize, connectToDb }