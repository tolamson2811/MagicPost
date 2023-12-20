const express = require("express");
const { body } = require("express-validator");

const Accounts = require("../models/users/accounts");
const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// PUT /auth/signup
router.put(
    "/signup",
    [
        body("email")
            .isEmail()
            .withMessage("Please enter a valid email")
            .custom(async (value, { req }) => {
                const accountDoc = await Accounts.findOne({ where: { email: value } });
                if (accountDoc) {
                    throw new Error("Email đã tồn tại!");
                }
            })
            .normalizeEmail(),

        body("password").trim().isLength({ min: 5 }),
    ],
    authController.signup
);

// POST /auth/login
router.post("/login", authController.login);

// PUT /auth/updateaccount
router.put(
    "/updateaccount/:account_id",
    isAuth,
    [
        body("currentPassword").trim().isLength({ min: 5 }),
        body("newPassword").trim().isLength({ min: 5 }),
        body("confirmPassword")
            .trim()
            .isLength({ min: 5 })
            .custom((value, { req }) => {
                if (value !== req.body.newPassword) {
                    throw new Error("Confirm password does not match!");
                }
                return true;
            }),
    ],
    authController.updateInfo
);

// DELETE /auth/deleteaccount
router.delete(
    "/deleteaccount/:account_id",
    isAuth,
    [body("password").trim().isLength({ min: 5 })],
    authController.deleteAccount
);

module.exports = router;
