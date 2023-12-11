const Sequelize = require("sequelize");
const sequelize = require("../../utils/database");

const Customers = sequelize.define("Customers", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    phone_number: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.STRING,
    },
});

module.exports = Customers;
