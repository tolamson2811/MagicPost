const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/is-auth");

const packageController = require("../controllers/package");
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
    packageController.createNewOrder
);

// Lấy danh sách đơn hàng theo từng location_id
router.get("/list", packageController.getPackgesByTransaction);

// lấy chi tiết đơn hàng
router.get("/detail/:package_id", packageController.getPackageDetail);

// Thêm trạng thái đơn hàng
router.post("/status/add", isAuth, packageController.addPackageStatus);

// Lấy danh đơn hàng đang 
// GET /package/list/transport?location_id=
router.get("/list/transport", packageController.getDeliveringPackage);

// Lấy danh sách đơn hàng đã giao
// GET /package/list/delivered?location_id=
router.get("/list/delivered", packageController.getDeliveredPackage);

// GET /package/list/failed?location_id=
router.get("/list/failed", packageController.getFailedDeliveryPackage);

//GET package/detail/delivery/:package_id
router.get("/detail/delivery/:package_id", packageController.getDeliveryStatus);

module.exports = router;
