const Sequelize = require("sequelize");
const sequelize = require("../../utils/database");

const Packages = sequelize.define("Packages", {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    sender_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
})

module.exports = Packages;