const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed.");
        error.statusCode = 422;
        res.status(422).json({
            message: "Validation failed.",
            errors: errors.array(),
        });
        return;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    try {
        const hashedPw = await bcrypt.hash(password, 12);
        console.log(hashedPw);
        const user = new User({
            email: email,
            name: name,
            password: hashedPw,
        });
        const result = await user.save();
        res.status(201).json({
            message: "User created",
            userId: result.id,
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
        const user = await User.findOne({ where: { email: email } });
        console.log(user);
        if (!user) {
            res.status(401).json({
                message: "A user with this email could not be found.",
            });
            return;
        }
        const userLoaded = user;
        const isEqual = await bcrypt.compare(password, user.password);
        // const isEqual = password === user.password;
        if (!isEqual) {
            res.status(401).json({
                message: "Wrong password!",
            });
            return;
        }
        const token = jwt.sign(
            {
                email: userLoaded.email,
                userId: userLoaded.id.toString(),
            },
            "somesupersecretsecret",
            { expiresIn: "1h" }
        );
        res.status(200).json({
            token: token,
            userId: userLoaded.id.toString(),
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
