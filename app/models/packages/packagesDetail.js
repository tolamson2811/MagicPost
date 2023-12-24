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
    sender_detail_address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sender_phone: {
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
    receiver_detail_address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    receiver_phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.ENUM,
        values: ["Tài liệu", "Hàng hóa"],
        allowNull: false,
    },
    weight: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = PackagesDetail;
