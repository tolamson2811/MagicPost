const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        required: true,
    },
    password: {
        type: Sequelize.STRING,
        required: true,
    },
    name: {
        type: Sequelize.STRING,
        required: true,
    },
});

module.exports = User;
