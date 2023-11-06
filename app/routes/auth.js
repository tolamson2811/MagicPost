const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const authController = require("../controllers/auth");

const router = express.Router();

// PUT /auth/signup
router.put(
    "/signup",
    [
        body("email")
            .isEmail()
            .withMessage("Please enter a valid email")
            .custom(async (value, { req }) => {
                const userDoc = await User.findOne({ where: { email: value } });
                if (userDoc) {
                    throw new Error("Email address already exists");
                }
            })
            .normalizeEmail(),

        body("password").trim().isLength({ min: 5 }),
        body("name").trim().not().isEmpty(),
    ],
    authController.signup
);

// POST /auth/login
router.post("/login", authController.login);

// PUT /auth/updateaccount
router.put(
    "/updateaccount/:userId",
    [
        body("name").trim().not().isEmpty(),
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
    "/deleteaccount/:userId",
    [body("password").trim().isLength({ min: 5 })],
    authController.deleteAccount
);

module.exports = router;
