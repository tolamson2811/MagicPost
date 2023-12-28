const Aggregations = require("../../models/locations/aggregations");
const Accounts = require("../../models/users/accounts");
const Employees = require("../../models/users/employees");
const PackagesStatus = require("../../models/packages/packageStatus");

exports.getLocationIdOfAggregationByName = async (req, res, next) => {
    const name = req.query.name;

    try {
        const aggregation = await Aggregations.findOne({
            where: { province: name },
        });

        if (!aggregation) {
            const error = new Error("Không tìm thấy điểm tập kết này!");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json(aggregation.location_id);
    } catch (err) {
        next(err);
    }
};

exports.getAllAggregation = async (req, res, next) => {
    try {
        let result = [];
        const aggregations = await Aggregations.findAll();
        for (let aggregation of aggregations) {
            const employee = await Employees.findAll({
                where: { location_id: aggregation.location_id },
            });
            const leader = await Accounts.findOne({
                where: { id: aggregation.leader_id },
            });
            result.push({
                id: aggregation.location_id,
                address: aggregation.province,
                leader: leader.email,
                employee_quantity: employee.length,
            });
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
        const aggregations = await Aggregations.findAll();
        for (let aggregation of aggregations) {
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
                    location_id: aggregation.location_id,
                },
                group: ["package_id"],
                order: [["createdAt", "DESC"]],
            });
            result.push({
                id: aggregation.location_id,
                address: aggregation.province,
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
