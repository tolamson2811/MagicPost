const Sequelize = require("sequelize");
const sequelize = require("../../utils/database");

const PackagesDetail = sequelize.define("PackagesDetail", {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: Sequelize.ENUM,
        values: ["Document", "Parcel"],
        allowNull: false,
    },
    sender_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sender_address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sender_phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    receiver_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    receiver_address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    receiver_phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = PackagesDetail;