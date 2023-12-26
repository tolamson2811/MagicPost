const { validationResult } = require("express-validator");
const PackagesDetail = require("../models/packages/packagesDetail");
const Packages = require("../models/packages/packages");
const PackagesStatus = require("../models/packages/packageStatus");

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

// Lấy danh sách đơn hàng theo từng địa điểm
exports.getListPackage = async (req, res, next) => {
    const location_id = req.query.location_id;

    try {
        const packageStatuses = await PackagesStatus.findAll({
            where: { location_id: location_id },
        });

        // Sử dụng set để lấy ra các package_status mới nhất
        let mapByPackageId = new Map();
        packageStatuses.forEach((status) => {
            console.log(status.dataValues);

            const currentSatus = mapByPackageId.get(
                status.dataValues.package_id
            );

            if (
                !currentSatus ||
                currentSatus.createdAt < status.dataValues.createdAt
            ) {
                // Cập nhật mapByPackageId với createdAt đã được chuyển đổi
                mapByPackageId.set(
                    status.dataValues.package_id,
                    status.dataValues
                );
            }
        });
        let newPackageStatuses = Array.from(mapByPackageId.values());

        newPackageStatuses = await Promise.all(
            newPackageStatuses.map(async (status) => {
                const packages = await PackagesStatus.findAll({
                    where: { package_id: status.package_id },
                });

                const isLatest = packages.every(
                    (package) => package.createdAt <= status.createdAt
                );

                if (isLatest) {
                    return status;
                }
            })
        );

        newPackageStatuses = newPackageStatuses.filter(Boolean);

        // Lấy thông tin địa điểm đích của đơn hàng
        const promises = newPackageStatuses.map(async (status) => {
            const packageDetail = await PackagesDetail.findOne({
                where: { package_id: status.package_id },
            });
            const detination =
                packageDetail.receiver_detail_address +
                ", " +
                packageDetail.receiver_ward +
                ", " +
                packageDetail.receiver_district +
                ", " +
                packageDetail.receiver_province;
            const createdAt = formatDate(status.createdAt);
            return {
                ...status,
                destination: detination,
                createdAt: createdAt,
            };
        });

        //Lấy ra tất cả trạng thái đơn hàng của điểm giao dịch
        const result = await Promise.all(promises);

        // console.log(result);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

// Lấy thông tin chi tiết đơn hàng
exports.getPackageDetail = async (req, res, next) => {
    const package_id = req.params.package_id;

    try {
        const packageDetail = await PackagesDetail.findOne({
            where: { package_id: package_id },
        });
        const createdAt = formatDate(packageDetail.createdAt);
        const sender_address = `${packageDetail.sender_detail_address}, ${packageDetail.sender_ward}, ${packageDetail.sender_district}, ${packageDetail.sender_province}`;
        const receiver_address = `${packageDetail.receiver_detail_address}, ${packageDetail.receiver_ward}, ${packageDetail.receiver_district}, ${packageDetail.receiver_province}`;
        res.status(200).json({
            id: packageDetail.id,
            sender_name: packageDetail.sender_name,
            sender_address: sender_address,
            sender_phone: packageDetail.sender_phone,
            receiver_name: packageDetail.receiver_name,
            receiver_address: receiver_address,
            receiver_phone: packageDetail.receiver_phone,
            type: packageDetail.type,
            weight: packageDetail.weight,
            price: packageDetail.price,
            createdAt: createdAt,
            package_id: packageDetail.package_id,
        });
    } catch (error) {
        next(error);
    }
};

// Thêm trạng thái của đơn hàng
exports.addPackageStatus = async (req, res, next) => {
    const package_id = req.body.package_id;
    const location_id = req.body.location_id;
    const status = req.body.status;
    const fail_reason = req.body.fail_reason;
    const shipper_id = req.body.shipper_id;
    const time_delivery = req.body.time_delivery;
    const next_destination = req.body.next_destination;

    let package_status = "";
    if (status === "Chuyển đến điểm tập kết") {
        package_status =
            "Đang trung chuyển đến điểm tập kết " + next_destination;
    }

    try {
        const new_package_status = new PackagesStatus({
            package_id: package_id,
            status: package_status,
            fail_reason: fail_reason,
            time_delivery: time_delivery,
            shipper_id: shipper_id,
            location_id: location_id,
        });
        const result = await new_package_status.save();

        res.status(201).json({ ...result.dataValues });
    } catch (error) {
        next(error);
    }
};

// Hàm chuyển đổi ngày thành chuỗi 'dd/mm/yyyy'
function formatDate(date) {
    if (!(date instanceof Date)) {
        // Nếu date không phải là đối tượng Date, thử chuyển đổi từ chuỗi
        date = new Date(date);
    }

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
}
