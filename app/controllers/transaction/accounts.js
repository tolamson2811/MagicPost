const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const Locations = require("../../models/locations/locations");
const Transactions = require("../../models/locations/transactions");
const Accounts = require("../../models/users/accounts");
const Employees = require("../../models/users/employees");

async function createNewTransaction(province, district, leader_id) {
    try {
        // Nếu đã có điểm giao dịch thì trả về điểm giao dịch đó
        const transactionDoc = await Transactions.findOne({ where: { province: province, district: district } });
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

exports.createLeaderAccount = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Tạo tài khoản trưởng điểm giao dịch thất bại!");
        error.statusCode = 422;
        res.status(422).json({
            message: "Tạo tài khoản trưởng điểm giao dịch thất bại!",
            errors: errors.array(),
        });
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
        const result = await createNewTransaction(province, district, newAccount.id);

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

