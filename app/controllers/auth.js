const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Accounts = require("../models/users/accounts");

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Đăng ký thất bại!");
        error.statusCode = 422;
        res.status(422).json({
            message: "Đăng ký thất bại!",
            errors: errors.array(),
        });
        return;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const role = req.body.role;
    try {
        const hashedPw = await bcrypt.hash(password, 12);

        const account = new Accounts({
            email: email,
            name: name,
            password: hashedPw,
            role: role || "Customer",
        });
        const result = await account.save();

        res.status(201).json({
            message: "Tạo tài khoản thành công!",
            id: result.id,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const account = await Accounts.findOne({ where: { email: email } });
        if (!account) {
            res.status(401).json({
                message: "Email không tồn tại!",
            });
            return;
        }
        const accountLoaded = account;
        const isEqual = await bcrypt.compare(password, account.password);
        if (!isEqual) {
            res.status(401).json({
                message: "Sai mật khẩu!",
            });
            return;
        }
        const token = jwt.sign(
            {
                email: accountLoaded.email,
                account_id: accountLoaded.id.toString(),
            },
            "somesupersecretsecret",
            { expiresIn: "1h" }
        );
        res.status(200).json({
            email: email,
            token: token,
            id: accountLoaded.id.toString(),
            expiresIn: 3600,
            role: accountLoaded.role,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateInfo = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Cập nhật thông tin thất bại!");
        error.statusCode = 422;
        res.status(422).json({
            message: "Cập nhật thông tin thất bại!",
            errors: errors.array(),
        });
        return;
    }

    const account_id = req.params.account_id;
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    try {
        const account = await Accounts.findOne({ where: { id: account_id } });
        if (!account) {
            res.status(401).json({
                message: "Email không tồn tại!",
            });
            return;
        }

        //check entered current pass is correct
        const checkCurrentPass = await bcrypt.compare(
            currentPassword,
            account.password
        );
        if (!checkCurrentPass) {
            res.status(401).json({
                message: "Sai mật khẩu hiện tại!",
            });
            return;
        }

        const hashedPw = await bcrypt.hash(newPassword, 12);
        await Accounts.update(
            { password: hashedPw },
            { where: { id: account_id } }
        );
        res.status(200).json({
            message: "Cập nhật thông tin thành công!",
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteAccount = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Xóa tài khoản thất bại!");
        error.statusCode = 422;
        res.status(422).json({
            message: "Xóa tài khoản thất bại!",
            errors: errors.array(),
        });
        return;
    }

    const account_id = req.params.account_id;
    const password = req.body.password;

    try {
        const account = await Accounts.findOne({ where: { id: account_id } });
        if (!account) {
            res.status(401).json({
                message: "Không thể tìm thấy tài khoản!",
            });
            return;
        }
        const checkPassword = await bcrypt.compare(password, account.password);
        if (!checkPassword) {
            res.status(401).json({
                message: "Sai mật khẩu hiện tại!",
            });
            return;
        }
        await Accounts.destroy({ where: { id: account_id } });
        res.status(200).json({
            message: "Xóa tài khoản thành công!",
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
