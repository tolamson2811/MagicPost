const express = require('express');
const { body } = require('express-validator');

const Accounts = require("../models/users/accounts");
const createAccountController = require("../../controllers/transaction/createAccount")

const router = express.Router();

// PUT /transaction/signup
router.put(
    "/signup",
    [
        body("email")
            .isEmail()
            .withMessage("Please enter a valid email")
            .custom(async (value, { req }) => {
                const accountDoc = await Accounts.findOne({ where: { email: value } });
                if (accountDoc) {
                    throw new Error("Email address already exists");
                }
            })
            .normalizeEmail(),

        body("password").trim().isLength({ min: 5 }),
    ],
    createAccountController.signup
);