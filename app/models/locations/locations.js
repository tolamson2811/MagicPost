const Sequelize = require("sequelize");
const sequelize = require("../../utils/database");

const Locations = sequelize.define("Locations", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: Sequelize.ENUM,
        values: ["Aggregation", "Transaction"],
        allowNull: false,
    },
});

module.exports = Locations;
