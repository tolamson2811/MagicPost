const Transactions = require("../../models/locations/transactions");
const Employees = require("../../models/users/employees");
const Accounts = require("../../models/users/accounts");
const PackagesStatus = require("../../models/packages/packageStatus");

exports.getLocationIdOfTransactionByName = async (req, res, next) => {
    const province = req.query.province;
    const district = req.query.district;

    try {
        const transaction = await Transactions.findOne({
            where: { province: province, district: district },
        });

        if (!transaction) {
            const error = new Error("Không tìm thấy điểm giao dịch này!");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json(transaction.location_id);
    } catch (err) {
        next(err);
    }
};

exports.getAllTransactions = async (req, res, next) => {
    try {
        let result = [];
        const transactions = await Transactions.findAll();
        for (let transaction of transactions) {
            const employee = await Employees.findAll({
                where: { location_id: transaction.location_id },
            });
            if (transaction.leader_id) {
                const leader = await Accounts.findOne({
                    where: { id: transaction.leader_id },
                });
                result.push({
                    id: transaction.location_id,
                    address: `${transaction.district}, ${transaction.province}`,
                    leader: leader.email,
                    employee_quantity: employee.length,
                });
            } else {
                result.push({
                    id: transaction.location_id,
                    address: `${transaction.district}, ${transaction.province}`,
                    leader: "Chưa có",
                    employee_quantity: employee.length,
                });
            }
        }
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

exports.getPackageStatistics = async (req, res, next) => {
    const sequelize = require("sequelize");
    try {
        let result = [];
        const transactions = await Transactions.findAll();
        for (let transaction of transactions) {
            const packages = await PackagesStatus.findAll({
                attributes: [
                    [sequelize.fn("max", sequelize.col("id")), "id"],
                    "package_id",
                    [sequelize.fn("max", sequelize.col("status")), "status"],
                    [
                        sequelize.fn("max", sequelize.col("fail_reason")),
                        "fail_reason",
                    ],
                    [
                        sequelize.fn("max", sequelize.col("location_id")),
                        "location_id",
                    ],
                    [
                        sequelize.fn("max", sequelize.col("shipper_id")),
                        "shipper_id",
                    ],
                    [
                        sequelize.fn("max", sequelize.col("createdAt")),
                        "createdAt",
                    ],
                    [
                        sequelize.fn("max", sequelize.col("updatedAt")),
                        "updatedAt",
                    ],
                ],
                where: {
                    location_id: transaction.location_id,
                },
                group: ["package_id"],
                order: [["createdAt", "DESC"]],
            });
            result.push({
                id: transaction.location_id,
                address: `${transaction.district}, ${transaction.province}`,
                package_quantity: packages.length,
            });
        }
        res.status(200).json(result);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
