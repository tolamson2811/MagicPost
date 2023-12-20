const Sequelize = require("sequelize");
const sequelize = require("../../utils/database");

const PackagesDetail = sequelize.define("PackagesDetail", {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    sender_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sender_province: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sender_district: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sender_ward: {
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
    receiver_province: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    receiver_district: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    receiver_ward: {
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
    type: {
        type: Sequelize.ENUM,
        values: ["Document", "Parcel"],
        allowNull: false,
    },
    weight: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
});

module.exports = PackagesDetail;
