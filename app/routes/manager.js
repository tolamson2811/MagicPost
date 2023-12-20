const express = require("express");
const { body } = require("express-validator");

const Accounts = require("../models/users/accounts");
const aggregationAccountController = require("../controllers/aggregation/accounts");
const transactionAccountController = require("../controllers/transaction/accounts");
const managerController = require("../controllers/manager");

const router = express.Router();

const isManager = require("../middleware/is-manager");

// PUT /manager/account/aggregation/create
router.put(
    "/account/aggregation/create",
    isManager,
    [
        body("email")
            .isEmail()
            .withMessage("Vui lòng nhập email hợp lệ!")
            .custom(async (value, { req }) => {
                const accountDoc = await Accounts.findOne({
                    where: { email: value },
                });
                if (accountDoc) {
                    throw new Error("Email đã tồn tại!");
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
    isManager,
    [
        body("email")
            .isEmail()
            .withMessage("Vui lòng nhập email hợp lệ!")
            .custom(async (value, { req }) => {
                const accountDoc = await Accounts.findOne({
                    where: { email: value },
                });
                if (accountDoc) {
                    throw new Error("Email đã tồn tại!");
                }
            })
            .normalizeEmail(),

        body("password").trim().isLength({ min: 5 }),
        body("province").trim().not().isEmpty(),
        body("district").trim().not().isEmpty(),
    ],
    transactionAccountController.createLeaderAccount
);

// GET /manager/account
router.get(
    "/account",
    managerController.getAllEmployees
);

module.exports = router;
