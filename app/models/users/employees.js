const Sequelize = require("sequelize");
const sequelize = require("../../utils/database");

const Employees = sequelize.define("Employees", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    // ID nơi làm việc
    location_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    role: {
        type: Sequelize.ENUM,
        values: [
            "Aggregation Lead",
            "Transaction Lead",
            "Aggregation Employee",
            "Transaction Employee",
        ],
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});

module.exports = Employees;
