const { validationResult } = require("express-validator");
const PackagesDetail = require("../../models/packages/packagesDetail");
const Packages = require("../../models/packages/packages");
const PackagesStatus = require("../../models/packages/packageStatus");

// Khi tạo một đơn hàng mới phải tạo chi tiết đơn hàng và trạng thái đơn hàng
exports.createNewOrder = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        const error = new Error("Vui lòng nhập đầy đủ thông tin!");
        error.statusCode = 422;
        next(error);
        return;
    }

    const sender_name = req.body.sender_name;
    const sender_province = req.body.sender_province;
    const sender_district = req.body.sender_district;
    const sender_ward = req.body.sender_ward;
    const sender_detail_address = req.body.sender_detail_address;
    const sender_phone = req.body.sender_phone;
    const receiver_name = req.body.receiver_name;
    const receiver_province = req.body.receiver_province;
    const receiver_district = req.body.receiver_district;
    const receiver_ward = req.body.receiver_ward;
    const receiver_detail_address = req.body.receiver_detail_address;
    const receiver_phone = req.body.receiver_phone;
    const type = req.body.type;
    const weight = req.body.weight;
    const price = req.body.price;
    const location_id = req.body.location_id;

    try {
        const new_package = new Packages({});
        await new_package.save();

        const new_package_status = new PackagesStatus({
            package_id: new_package.id,
            location_id: location_id,
            status: "Đã bàn giao cho đơn vị vận chuyển",
        });
        await new_package_status.save();

        const package_detail = new PackagesDetail({
            sender_name: sender_name,
            sender_province: sender_province,
            sender_district: sender_district,
            sender_ward: sender_ward,
            sender_detail_address: sender_detail_address,
            sender_phone: sender_phone,
            receiver_name: receiver_name,
            receiver_province: receiver_province,
            receiver_district: receiver_district,
            receiver_ward: receiver_ward,
            receiver_detail_address: receiver_detail_address,
            receiver_phone: receiver_phone,
            type: type,
            weight: weight,
            price: price,
            package_id: new_package.id,
        });

        const result = await package_detail.save();

        res.status(201).json({
            message: "Tạo đơn hàng thành công!",
            package: result,
        });
    } catch (err) {
        next(err);
    }
};
