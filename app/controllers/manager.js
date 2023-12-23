const Accounts = require("../models/users/accounts");
const Transactions = require("../models/locations/transactions");
const Aggregations = require("../models/locations/aggregations");
const Locations = require("../models/locations/locations");
const Employees = require("../models/users/employees");

exports.getAllEmployees = async (req, res, next) => {
    try {
        let employees = [];
        const page = req.query.page || 1; // Default to page 1
        const limit = 20; // Number of records per page
        const offset = (page - 1) * limit;

        const totalResult = await Employees.count();
        const totalPages = Math.ceil(totalResult / limit);

        const employeesLoaded = await Employees.findAll({
            limit: limit,
            offset: offset,
            include: [
                {
                    model: Accounts,
                    required: true,
                },
                {
                    model: Locations,
                    include: [
                        {
                            model: Aggregations,
                            required: false,
                        },
                        {
                            model: Transactions,
                            required: false,
                        },
                    ],
                },
            ],
        });

        for (let employee in employeesLoaded) {
            let location = "";
            let role = "";
            if (employeesLoaded[employee].Account.role === "Transaction Lead") {
                role = "Trưởng điểm giao dịch";
                location =
                    employeesLoaded[employee].Location.Transaction.district +
                    ", " +
                    employeesLoaded[employee].Location.Transaction.province;
            } else if (
                employeesLoaded[employee].Account.role === "Aggregation Lead"
            ) {
                role = "Trưởng điểm tập kết";
                location =
                    employeesLoaded[employee].Location.Aggregation.province;
            }

            let employeeInfo = {
                id: employeesLoaded[employee].account_id,
                email: employeesLoaded[employee].Account.email,
                role: role,
                location: location,
            };
            employees.push(employeeInfo);
        }

        res.status(200).json({
            employees: employees,
            totalPages: totalPages,
            totalResult: totalResult,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteEmployee = async (req, res, next) => {
    try {
        const account_id = req.params.account_id;
        const employee = await Accounts.findOne({
            where: { id: account_id },
        });
        if (!employee) {
            const error = new Error("Không tìm thấy tài khoản!");
            error.statusCode = 404;
            throw error;
        }

        await employee.destroy();
        res.status(200).json({ message: "Xóa tài khoản thành công!" });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
