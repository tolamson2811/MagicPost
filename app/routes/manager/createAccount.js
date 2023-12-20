const express = require("express");
const { body } = require("express-validator");

const Accounts = require("../../models/users/accounts");
const aggregationAccountController = require("../../controllers/aggregation/accounts");
const transactionAccountController = require("../../controllers/transaction/accounts");

const router = express.Router();

// PUT /manager/account/aggregation/create
router.put(
    "/account/aggregation/create",
    [
        body("email")
            .isEmail()
            .withMessage("Please enter a valid email")
            .custom(async (value, { req }) => {
                const accountDoc = await Accounts.findOne({
                    where: { email: value },
                });
                if (accountDoc) {
                    throw new Error("Email address already exists");
                }
            })
            .normalizeEmail(),

        body("password").trim().isLength({ min: 5 }),
        body("province").trim().not().isEmpty(),
    ],
    aggregationAccountController.createLeaderAccount
);

// PUT /manager/account/transaction/create
router.put(
    "/account/transaction/create",
    [
        body("email")
            .isEmail()
            .withMessage("Please enter a valid email")
            .custom(async (value, { req }) => {
                const accountDoc = await Accounts.findOne({
                    where: { email: value },
                });
                if (accountDoc) {
                    throw new Error("Email address already exists");
                }
            })
            .normalizeEmail(),

        body("password").trim().isLength({ min: 5 }),
        body("province").trim().not().isEmpty(),
        body("district").trim().not().isEmpty(),
    ],
    transactionAccountController.createLeaderAccount
);

module.exports = router;
