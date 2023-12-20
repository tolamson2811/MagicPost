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
            "Đã gửi",
            "Đang trung chuyển",
            "Chờ xác nhận điểm giao dịch",
            "Đang ở điêm giao dịch",
            "Chờ xác nhận điểm tập kết",
            "Đang ở điểm tập kết",
            "Đang giao",
            "Đã giao",
            "Giao thành công",
            "Giao thất bại",
        ],
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
});

module.exports = PackageStatus;
