const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const isAuth = require("../middleware/is-auth");
const Accounts = require("../models/users/accounts");
const Aggregations = require("../models/locations/aggregations");

const aggregationAccountController = require("../controllers/aggregation/accounts");

// PUT /aggregation/leader/account/create
router.put(
    "/leader/account/create",
    isAuth,
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
        const aggregationDoc = await Aggregations.findOne({
            where: { location_id: value },
        });
        if (!aggregationDoc) {
            throw new Error("Điểm tập kết không tồn tại!");
        }
    }),
    aggregationAccountController.createNewAggregationEmployee
);

//GET /aggregation/leader/account/list
router.get(
    "/leader/account/list",
    aggregationAccountController.getAllAggregationEmployee
);

//DELETE /aggregation/leader/account/delete/:account_id
router.delete(
    "/leader/account/delete/:account_id",
    isAuth,
    aggregationAccountController.deleteAggregationEmployee
);

module.exports = router;
