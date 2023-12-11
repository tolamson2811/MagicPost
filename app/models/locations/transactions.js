const Sequelize = require("sequelize");
const sequelize = require("../../utils/database");

const Transactions = sequelize.define("Transactions", {
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
    deleivered_quantity: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
    },
    return_quantity: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
    },
});

module.exports = Transactions;