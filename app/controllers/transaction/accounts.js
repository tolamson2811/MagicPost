const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const Locations = require("../../models/locations/locations");
const Transactions = require("../../models/locations/transactions");
const Accounts = require("../../models/users/accounts");
const Employees = require("../../models/users/employees");

async function createNewTransaction(province, district, leader_id) {
    try {
        // Nếu đã có điểm giao dịch thì trả về điểm giao dịch đó
        const transactionDoc = await Transactions.findOne({
            where: { province: province, district: district },
        });
        if (transactionDoc) {
            return transactionDoc;
        }

        const location = new Locations({
            type: "Transaction",
        });

        const newLocation = await location.save();

        const transaction = new Transactions({
            location_id: newLocation.id,
            leader_id: leader_id,
            province: province,
            district: district,
        });

        const result = await transaction.save();

        return result;
    } catch (err) {
        throw err;
    }
}

//Tạo tài khoản trưởng điểm giao dịch
exports.createLeaderAccount = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        const error = new Error(errorMessage);
        error.statusCode = 422;
        next(error);
        return
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const province = req.body.province;
    const district = req.body.district;

    try {
        //Kiểm tra xem điểm giao dịch đã có trưởng điểm chưa
        const transactionDoc = await Transactions.findOne({
            where: { province: province, district: district },
        });
        if (transactionDoc) {
            const error = new Error(
                "Quận/huyện này đã có trưởng điểm giao dịch!"
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
            role: "Transaction Lead",
        });

        const newAccount = await account.save();

        // Tạo điểm giao dịch mới trong bảng transaction
        const result = await createNewTransaction(
            province,
            district,
            newAccount.id
        );

        // Tạo tài khoản nhân viên mới trong bảng employee
        const employee = new Employees({
            account_id: newAccount.id,
            location_id: result.location_id,
            role: newAccount.role,
            name: newAccount.name,
        });

        await employee.save();

        // Trả về response
        res.status(201).json({
            message: "Tạo tài khoản trưởng điểm giao dịch thành công!",
            account: {
                id: newAccount.id,
                email: newAccount.email,
                name: newAccount.name,
                role: newAccount.role,
                location_id: result.location_id,
                transaction_id: result.id,
                province: result.province,
                district: result.district,
            },
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//Tạo tài khoản nhân viên giao dịch
exports.createNewTransactionEmployee = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        const error = new Error(errorMessage);
        error.statusCode = 422;
        next(error);
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
            role: "Transaction Employee",
        });

        const newAccount = await account.save();

        // Tạo tài khoản nhân viên mới trong bảng employee
        const employee = new Employees({
            account_id: newAccount.id,
            location_id: location_id,
            role: newAccount.role,
        });

        const transaction_employee = await employee.save();

        // Trả về response
        res.status(201).json({
            message: "Tạo tài khoản nhân viên giao dịch thành công!",
            transaction_employee: {
                id: transaction_employee.id,
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

//Lấy danh sách tài khoản nhân viên giao dịch
exports.getAllTransactionEmployee = async (req, res, next) => {
    const location_id = req.query.location_id;
    try {
        const transaction_employee = await Employees.findAll({
            where: { role: "Transaction Employee", location_id: location_id },
            attributes: ["id", "account_id", "location_id"],
            include: [
                {
                    model: Accounts,
                    attributes: ["email"],
                },
            ],
        });

        let employees = [];
        for (let employee in transaction_employee) {
            let employeeInfo = {
                id: transaction_employee[employee].account_id,
                email: transaction_employee[employee].Account.email,
            };
            employees.push(employeeInfo);
        }

        res.status(200).json({
            message: "Lấy danh sách tài khoản nhân viên giao dịch thành công!",
            transaction_employee: employees,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//Xóa tài khoản nhân viên giao dịch
exports.deleteTransactionEmployee = async (req, res, next) => {
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
            message: "Xóa tài khoản nhân viên giao dịch thành công!"
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
