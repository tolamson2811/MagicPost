const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const isAuth = require("../middleware/is-auth");

const transactionAccountController = require("../controllers/transaction/accounts");
const transactionController = require('../controllers/transaction/transaction')

const Transactions = require("../models/locations/transactions");
const Accounts = require("../models/users/accounts");

// PUT /transaction/leader/account/create
router.put(
    "/leader/account/create",
    isAuth,
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
        body("location_id").custom(async (value, { req }) => {
            const transactionDoc = await Transactions.findOne({
                where: { location_id: value },
            });
            if (!transactionDoc) {
                throw new Error("Điểm giao dịch không tồn tại!");
            }
        }),
    ],
    transactionAccountController.createNewTransactionEmployee
);

//GET /transaction/leader/account/list
router.get(
    "/leader/account/list",
    transactionAccountController.getAllTransactionEmployee
);

//DELETE /transaction/leader/account/delete/:account_id
router.delete(
    "/leader/account/delete/:account_id",
    isAuth,
    transactionAccountController.deleteTransactionEmployee
);

//GET /transaction/location/id?province=...&district=...
router.get(
    "/location/id",
    transactionController.getLocationIdOfTransactionByName
);

//GET /transaction/list
router.get("/list", transactionController.getAllTransactions);

//GET /transaction/package/statistics
router.get(
    "/package/statistics",
    transactionController.getPackageStatistics
);

module.exports = router;
