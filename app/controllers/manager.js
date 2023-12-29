const Accounts = require("../models/users/accounts");
const Transactions = require("../models/locations/transactions");
const Aggregations = require("../models/locations/aggregations");
const Locations = require("../models/locations/locations");
const Employees = require("../models/users/employees");

// Lất tất cả trưởng điểm
exports.getAllEmployees = async (req, res, next) => {
    try {
        let employees = [];

        const employeesLoaded = await Employees.findAll({
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
            } else {
                continue;
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
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

// Lấy thông tin nhân viên công ty theo ID
exports.getEmployeeById = async (req, res, next) => {
    try {
        const account_id = req.params.account_id;
        const employee = await Employees.findOne({
            where: { account_id: account_id },
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
        if (!employee) {
            const error = new Error("Không tìm thấy tài khoản nhân viên!");
            error.statusCode = 404;
            throw error;
        }

        let location = "";
        let role = "";
        if (employee.Account.role === "Transaction Lead") {
            role = "Trưởng điểm giao dịch";
            location =
                employee.Location.Transaction.district +
                ", " +
                employee.Location.Transaction.province;
        } else if (employee.Account.role === "Aggregation Lead") {
            role = "Trưởng điểm tập kết";
            location = employee.Location.Aggregation.province;
        } else if (employee.Account.role === "Transaction Employee") {
            role = "Nhân viên giao dịch";
            location =
                employee.Location.Transaction.district +
                ", " +
                employee.Location.Transaction.province;
        } else if (employee.Account.role === "Aggregation Employee") {
            role = "Nhân viên tập kết";
            location = employee.Location.Aggregation.province;
        }

        let employeeInfo = {
            id: employee.account_id,
            email: employee.Account.email,
            role: role,
            location: location,
            location_id: employee.Location.id,
        };

        res.status(200).json({ ...employeeInfo });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

// Xóa nhân viên công ty
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
