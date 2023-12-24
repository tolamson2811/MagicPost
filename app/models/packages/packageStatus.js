const Sequelize = require("sequelize");
const sequelize = require("../../utils/database");

const PackageStatus = sequelize.define("PackageStatus", {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    package_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    fail_reason: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    time_delivery: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    location_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    shipper_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
});

module.exports = PackageStatus;
