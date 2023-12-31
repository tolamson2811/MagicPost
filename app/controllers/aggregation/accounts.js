const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const Locations = require("../../models/locations/locations");
const Aggregations = require("../../models/locations/aggregations");
const Accounts = require("../../models/users/accounts");
const Employees = require("../../models/users/employees");

async function createNewAggregation(province, leader_id) {
    try {
        // Nếu đã có điểm tập kết thì trả về điểm tập kết đó
        const aggregationDoc = await Aggregations.findOne({
            where: { province: province },
        });
        if (aggregationDoc) {
            return aggregationDoc;
        }

        const location = new Locations({
            type: "Aggregation",
        });

        const newLocation = await location.save();

        const aggregation = new Aggregations({
            location_id: newLocation.id,
            leader_id: leader_id,
            province: province,
        });

        const result = await aggregation.save();

        return result;
    } catch (err) {
        throw err;
    }
}

exports.createLeaderAccount = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        const error = new Error(errorMessage);
        error.statusCode = 422;
        next(error);
        return;
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const province = req.body.province;

    try {
        //Kiểm tra xem điểm tập kết đã có trưởng điểm chưa
        const aggregationDoc = await Aggregations.findOne({
            where: { province: province },
        });
        if (aggregationDoc.leader_id) {
            const error = new Error(
                "Tỉnh/Thành phố này đã có trưởng điểm tập kết!"
            );
            error.statusCode = 422;
            throw error;
        }

        // Tạo tài khoản mới trong bảng account
        const hashedPw = await bcrypt.hash(password, 12);
        const account = new Accounts({
            email: email,
            name: name,
            password: hashedPw,
            role: "Aggregation Lead",
        });

        const newAccount = await account.save();

        // Tạo điểm tập kết mới trong bảng aggregation
        const result = await createNewAggregation(province, newAccount.id);

        // Tạo tài khoản nhân viên mới trong bảng employee
        const employee = new Employees({
            account_id: newAccount.id,
            location_id: result.location_id,
            role: newAccount.role,
            name: newAccount.name,
        });

        await employee.save();

        //Lưu leader_id vào aggregation
        result.leader_id = newAccount.id;
        await result.save();

        // Trả về response
        res.status(201).json({
            message: "Tạo tài khoản trưởng điểm tập kết thành công!",
            account: {
                id: newAccount.id,
                email: newAccount.email,
                name: newAccount.name,
                role: newAccount.role,
                location_id: result.location_id,
                aggregation_id: result.id,
                province: result.province,
            },
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//Tạo tài khoản nhân viên tập kết
exports.createNewAggregationEmployee = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        const error = new Error(errorMessage);
        error.statusCode = 422;
        next(error);
        return;
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const location_id = req.body.location_id;

    try {
        // Tạo tài khoản mới trong bảng account
        const hashedPw = await bcrypt.hash(password, 12);
        const account = new Accounts({
            email: email,
            name: name,
            password: hashedPw,
            role: "Aggregation Employee",
        });

        const newAccount = await account.save();

        // Tạo tài khoản nhân viên mới trong bảng employee
        const employee = new Employees({
            account_id: newAccount.id,
            location_id: location_id,
            role: newAccount.role,
        });

        const aggregation_employee = await employee.save();

        // Trả về response
        res.status(201).json({
            message: "Tạo tài khoản nhân viên tập kết thành công!",
            aggregation_employee: {
                id: aggregation_employee.id,
                account_id: newAccount.id,
                location_id: location_id,
                email: newAccount.email,
                role: newAccount.role,
            },
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//Lấy danh sách tài khoản nhân viên tập kết
exports.getAllAggregationEmployee = async (req, res, next) => {
    const location_id = req.query.location_id;

    try {
        const aggregation_employee = await Employees.findAll({
            where: { role: "Aggregation Employee", location_id: location_id },
            attributes: ["id", "account_id", "location_id"],
            include: [
                {
                    model: Accounts,
                    attributes: ["email"],
                },
            ],
        });

        let employees = [];
        for (let employee in aggregation_employee) {
            let employeeInfo = {
                id: aggregation_employee[employee].account_id,
                email: aggregation_employee[employee].Account.email,
            };
            employees.push(employeeInfo);
        }

        res.status(200).json({
            aggregation_employee: employees,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//Xóa tài khoản nhân viên tập kết
exports.deleteAggregationEmployee = async (req, res, next) => {
    const account_id = req.params.account_id;
    try {
        const account = await Accounts.findByPk(account_id);
        if (!account) {
            const error = new Error("Không tìm thấy tài khoản!");
            error.statusCode = 404;
            throw error;
        }

        await account.destroy();

        res.status(200).json({
            message: "Xóa tài khoản nhân viên tập kết thành công!",
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
