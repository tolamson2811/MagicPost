const Sequelize = require("sequelize");
const sequelize = require("../../utils/database");

const Aggregations = sequelize.define("Aggregations", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    incoming_quantity: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
    },
    onstock_quantity: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
    },
    outgoing_quantity: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
    },
});

module.exports = Aggregations;