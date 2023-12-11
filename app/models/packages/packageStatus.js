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
        type: Sequelize.ENUM,
        values: [
            "Sent",
            "In Transit",
            "Delivering",
            "Received",
            "Returning",
            "Returned",
        ],
        allowNull: false,
    },
    current_location: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = PackageStatus;