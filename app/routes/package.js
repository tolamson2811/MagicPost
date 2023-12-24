const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/is-auth");

const transactinPackageController = require("../controllers/transaction/package");
const { body } = require("express-validator");

// POST /package/create
router.post(
    "/create",
    isAuth,
    body("sender_name").trim().not().isEmpty(),
    body("sender_province").trim().not().isEmpty(),
    body("sender_district").trim().not().isEmpty(),
    body("sender_ward").trim().not().isEmpty(),
    body("sender_detail_address").trim().not().isEmpty(),
    body("sender_phone").trim().not().isEmpty(),
    body("receiver_name").trim().not().isEmpty(),
    body("receiver_province").trim().not().isEmpty(),
    body("receiver_district").trim().not().isEmpty(),
    body("receiver_ward").trim().not().isEmpty(),
    body("receiver_detail_address").trim().not().isEmpty(),
    body("receiver_phone").trim().not().isEmpty(),
    body("type").trim().not().isEmpty(),
    body("weight").trim().not().isEmpty(),
    body("price").trim().not().isEmpty(),
    body("location_id").trim().not().isEmpty(),
    transactinPackageController.createNewOrder
);

module.exports = router;
