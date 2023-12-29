const Sequelize = require("sequelize");
const sequelize = require("../../utils/database");

const Aggregations = sequelize.define(
    "Aggregations",
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        location_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        leader_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        province: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },
);

module.exports = Aggregations;
