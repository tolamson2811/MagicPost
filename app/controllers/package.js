const { validationResult } = require("express-validator");
const PackagesDetail = require("../models/packages/packagesDetail");
const Packages = require("../models/packages/packages");
const PackagesStatus = require("../models/packages/packageStatus");
const Transactions = require("../models/locations/transactions");
const Aggregations = require("../models/locations/aggregations");
const Locations = require("../models/locations/locations");

const { Op } = require("sequelize");

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

        res.status(201).json(result.id);
    } catch (err) {
        next(err);
    }
};

// Lấy danh sách đơn hàng trong kho của điểm giao dịch
exports.getPackgesByTransaction = async (req, res, next) => {
    const location_id = req.query.location_id;

    try {
        const packageStatuses = await PackagesStatus.findAll({
            where: {
                location_id: location_id,
            },
        });

        // Sử dụng set để lấy ra các package_status mới nhất của đơn hàng thuộc location
        let mapByPackageId = new Map();
        packageStatuses.forEach((status) => {
            const currentSatus = mapByPackageId.get(
                status.dataValues.package_id
            );

            if (
                (!currentSatus ||
                    currentSatus.createdAt < status.dataValues.createdAt) &&
                status.dataValues.status !== "Đang giao hàng" &&
                status.dataValues.status !== "Giao thành công" &&
                status.dataValues.status !==
                    "Đang trung chuyển đến điểm giao dịch"
            ) {
                // Cập nhật mapByPackageId với createdAt đã được chuyển đổi
                mapByPackageId.set(
                    status.dataValues.package_id,
                    status.dataValues
                );
            }
        });

        //Check xem có phải là trạng thái mới nhất của đơn hàng đó không
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

        //Lấy ra tất cả trạng thái đơn hàng của điểm giao dịch
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
        const result = await Promise.all(promises);

        res.status(200).json(result);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

// Lấy danh sách đơn hàng đang chờ xác nhận
exports.getTransactionWaitingPackage = async (req, res, next) => {
    const location_id = req.query.location_id;

    try {
        const packages = await PackagesStatus.findAll({
            where: {
                location_id: location_id,
                status: "Đang trung chuyển đến điểm giao dịch",
            },
        });

        //Check xem có phải là trạng thái mới nhất của đơn hàng đó không
        let newPackageStatuses = await Promise.all(
            packages.map(async (status) => {
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

        //Lấy thông tin chi tiết
        const promises = newPackageStatuses.map(async (status) => {
            // Lấy thông tin điểm giao dịch trước đó của đơn hàng
            const previousStatus = await PackagesStatus.findAll({
                where: {
                    package_id: status.package_id,
                    [Op.or]: [
                        {
                            status: "Đang ở điểm tập kết",
                        },
                    ],
                },
                order: [["createdAt", "DESC"]],
                limit: 1,
            });
            const aggregation = await Aggregations.findOne({
                where: { location_id: previousStatus[0].location_id },
            });
            const from = aggregation.province;

            //Lấy thông tin chi tiết đơn hàng
            const packageDetail = await PackagesDetail.findOne({
                where: { package_id: status.package_id },
            });

            const data = {
                package_id: status.package_id,
                from: from,
                receiver_address: `${packageDetail.receiver_detail_address}, ${packageDetail.receiver_ward}, ${packageDetail.receiver_district}, ${packageDetail.receiver_province}`,
                arrived_time: formatDate(status.createdAt),
            };

            return data;
        });

        const result = await Promise.all(promises);

        res.status(200).json(result);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.getDeliveringPackage = async (req, res, next) => {
    const location_id = req.query.location_id;

    try {
        const packages = await PackagesStatus.findAll({
            where: { location_id: location_id, status: "Đang giao hàng" },
        });

        //Sử dụng set để lấy ra các package_status mới nhất của đơn hàng thuộc location
        let mapByPackageId = new Map();
        packages.forEach((status) => {
            const currentSatus = mapByPackageId.get(
                status.dataValues.package_id
            );

            if (
                (!currentSatus ||
                    currentSatus.createdAt < status.dataValues.createdAt) &&
                status.dataValues.status === "Đang giao hàng"
            ) {
                // Cập nhật mapByPackageId với createdAt đã được chuyển đổi
                mapByPackageId.set(
                    status.dataValues.package_id,
                    status.dataValues
                );
            }
        });

        //Check xem có phải là trạng thái mới nhất của đơn hàng đó không
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

        const promises = newPackageStatuses.map(async (status) => {
            const packageDetail = await PackagesDetail.findOne({
                where: { package_id: status.package_id },
            });
            const data = {
                package_id: status.package_id,
                receiver_name: packageDetail.receiver_name,
                receiver_phone: packageDetail.receiver_phone,
                receiver_address: `${packageDetail.receiver_detail_address}, ${packageDetail.receiver_ward}, ${packageDetail.receiver_district}, ${packageDetail.receiver_province}`,
            };

            return data;
        });

        const result = await Promise.all(promises);

        res.status(200).json(result);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

//Lấy danh sách đơn hàng giao thành công theo location_id
exports.getDeliveredPackage = async (req, res, next) => {
    const location_id = req.query.location_id;

    try {
        const packages = await PackagesStatus.findAll({
            where: { location_id: location_id, status: "Giao thành công" },
        });

        //Lấy thông tin chi tiết
        const promises = packages.map(async (status) => {
            const packageDetail = await PackagesDetail.findOne({
                where: { package_id: status.package_id },
            });
            const data = {
                package_id: status.package_id,
                receiver_name: packageDetail.receiver_name,
                receiver_phone: packageDetail.receiver_phone,
                receiver_address: `${packageDetail.receiver_detail_address}, ${packageDetail.receiver_ward}, ${packageDetail.receiver_district}, ${packageDetail.receiver_province}`,
                time_delivery: formatDate(status.createdAt),
                shipper_id: status.shipper_id,
            };

            return data;
        });

        const result = await Promise.all(promises);

        res.status(200).json(result);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

//Lấy danh sách đơn hàng giao thất bại theo location_id
exports.getFailedDeliveryPackage = async (req, res, next) => {
    const location_id = req.query.location_id;

    try {
        const packages = await PackagesStatus.findAll({
            where: { location_id: location_id, status: "Giao thất bại" },
            order: [["package_id", "ASC"]],
        });

        //Lấy thông tin chi tiết
        const promises = packages.map(async (status) => {
            const packageDetail = await PackagesDetail.findOne({
                where: { package_id: status.package_id },
            });
            const data = {
                package_id: status.package_id,
                receiver_name: packageDetail.receiver_name,
                receiver_phone: packageDetail.receiver_phone,
                receiver_address: `${packageDetail.receiver_detail_address}, ${packageDetail.receiver_ward}, ${packageDetail.receiver_district}, ${packageDetail.receiver_province}`,
                time_delivery: formatDate(status.createdAt),
                shipper_id: status.shipper_id,
                fail_reason: status.fail_reason,
            };

            return data;
        });

        const result = await Promise.all(promises);

        res.status(200).json(result);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

//Lấy trạng thái giao hàng theo package_id
exports.getDeliveryStatus = async (req, res, next) => {
    try {
        const statuses = await PackagesStatus.findAll({
            where: {
                package_id: req.params.package_id,
                [Op.or]: [
                    {
                        status: "Giao thất bại",
                    },
                    {
                        status: "Giao thành công",
                    },
                ],
            },
            order: [["createdAt", "ASC"]],
        });

        let result = [];

        for (let status of statuses) {
            result.push({
                status: status.status,
                time_delivery: formatDate(status.createdAt),
                shipper_id: status.shipper_id,
                fail_reason: status.fail_reason,
            });
        }

        res.status(200).json(result);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

//Lấy đơn hàng đang chờ xác nhận ở điểm tập kết theo location_id
exports.getAggregationWaitingPackage = async (req, res, next) => {
    const location_id = req.query.location_id;

    try {
        const packages = await PackagesStatus.findAll({
            where: {
                location_id: location_id,
                status: "Đang trung chuyển đến điểm tập kết",
            },
        });

        //Check xem có phải là trạng thái mới nhất của đơn hàng đó không
        let newPackageStatuses = await Promise.all(
            packages.map(async (status) => {
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

        //Lấy thông tin chi tiết
        const promises = newPackageStatuses.map(async (status) => {
            // Lấy thông tin điểm giao dịch trước đó của đơn hàng
            const previousStatus = await PackagesStatus.findAll({
                where: {
                    package_id: status.package_id,
                    [Op.or]: [
                        {
                            status: "Đã bàn giao cho đơn vị vận chuyển",
                        },
                        {
                            status: "Đang ở điểm giao dịch",
                        },
                        {
                            status: "Đang ở điểm tập kết",
                        },
                    ],
                },
                order: [["createdAt", "DESC"]],
                limit: 1,
            });
            let from = "";
            const transaction = await Transactions.findOne({
                where: { location_id: previousStatus[0].location_id },
            });
            if (transaction) {
                from = `${transaction.district}, ${transaction.province}`;
            } else {
                const aggregation = await Aggregations.findOne({
                    where: { location_id: previousStatus[0].location_id },
                });
                from = aggregation.province;
            }

            //Lấy thông tin chi tiết đơn hàng
            const packageDetail = await PackagesDetail.findOne({
                where: { package_id: status.package_id },
            });

            const data = {
                package_id: status.package_id,
                from: from,
                receiver_address: `${packageDetail.receiver_detail_address}, ${packageDetail.receiver_ward}, ${packageDetail.receiver_district}, ${packageDetail.receiver_province}`,
                arrived_time: formatDate(status.createdAt),
            };

            return data;
        });

        const result = await Promise.all(promises);

        res.status(200).json(result);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

// Lấy đơn hàng trong kho của điểm tập kết
exports.getAggregationPackageInWarehouse = async (req, res, next) => {
    const location_id = req.query.location_id;

    try {
        const packages = await PackagesStatus.findAll({
            where: {
                location_id: location_id,
                status: "Đang ở điểm tập kết",
            },
        });

        //Check xem có phải là trạng thái mới nhất của đơn hàng đó không
        let newPackageStatuses = await Promise.all(
            packages.map(async (status) => {
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

        //Lấy thông tin chi tiết
        const promises = newPackageStatuses.map(async (status) => {
            //Lấy thông tin chi tiết đơn hàng
            const packageDetail = await PackagesDetail.findOne({
                where: { package_id: status.package_id },
            });

            const data = {
                package_id: status.package_id,
                time_import: formatDate(status.createdAt),
                receiver_address: `${packageDetail.receiver_detail_address}, ${packageDetail.receiver_ward}, ${packageDetail.receiver_district}, ${packageDetail.receiver_province}`,
            };

            return data;
        });

        const result = await Promise.all(promises);

        res.status(200).json(result);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
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

// Lấy tất cả đơn hàng đã xuất kho của điểm giao dịch (bao gồm mang đi giao hàng và chuyển đến điểm tập kết)
exports.getAllTransactionExportPackage = async (req, res, next) => {
    const location_id = req.query.location_id;

    try {
        const packages = await PackagesStatus.findAll({
            where: {
                location_id: location_id,
                [Op.or]: [
                    {
                        status: "Đã bàn giao cho đơn vị vận chuyển",
                    },
                    {
                        status: "Đang ở điểm giao dịch",
                    },
                ],
            },
        });

        // Kiểm tra xem có phải là trạng thái mới nhất của đơn hàng đó không
        let newPackageStatuses1 = await Promise.all(
            // Nếu không phải là mới nhất => hàng đã được chuyển đi nơi khác
            packages.map(async (status) => {
                const packages = await PackagesStatus.findAll({
                    where: { package_id: status.dataValues.package_id },
                });

                const isLatest = packages.every(
                    (package) => package.createdAt <= status.createdAt
                );

                if (!isLatest) {
                    return status.dataValues;
                }
            })
        );
        newPackageStatuses1 = newPackageStatuses1.filter(Boolean);

        //Lấy trạng thái kế tiếp
        const promises1 = newPackageStatuses1.map(async (status) => {
            const packageDetail = await PackagesDetail.findOne({
                where: { package_id: status.package_id },
            });
            const nextStatus = await PackagesStatus.findOne({
                where: {
                    package_id: status.package_id,
                    createdAt: {
                        [Op.gt]: status.createdAt,
                    },
                },
                order: [["createdAt", "ASC"]],
            });

            let next_destination = "";

            if (
                nextStatus.status === "Đang trung chuyển đến điểm tập kết" ||
                nextStatus.status === "Chuyển đến điểm tập kết"
            ) {
                const aggregation = await Aggregations.findOne({
                    where: { location_id: nextStatus.location_id },
                });
                next_destination = `Điểm tập kết: ${aggregation.province}`;
            } else if (nextStatus.status === "Đang giao hàng") {
                const detail_address = `Khách hàng: ${packageDetail.receiver_detail_address}, ${packageDetail.receiver_ward}, ${packageDetail.receiver_district}, ${packageDetail.receiver_province}`;
                next_destination = detail_address;
            }

            const data = {
                package_id: status.package_id,
                time_export: status.createdAt,
                next_destination: next_destination,
            };
            return data;
        });

        let newPackageStatuses2 = await Promise.all(promises1);

        //Sắp xếp theo thời gian gần nhất xuất kho
        newPackageStatuses2.sort((a, b) => {
            return b.time_export - a.time_export;
        });
        //Loại bỏ package_id trùng lặp
        newPackageStatuses2 = newPackageStatuses2.filter(
            (status, index, self) =>
                index ===
                self.findIndex((t) => t.package_id === status.package_id)
        );

        //format lại thời gian
        for (let status of newPackageStatuses2) {
            status.time_export = formatDate(status.time_export);
        }

        res.status(200).json(newPackageStatuses2);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

//Lấy tất cả đơn hàng đã nhập kho của điểm giao dịch (bao gồm đơn hàng chuyển đến từ điểm tập kết và đơn tạo mới)
exports.getAllTransactionImportPackage = async (req, res, next) => {
    const location_id = req.query.location_id;

    try {
        const packageStatuses = await PackagesStatus.findAll({
            where: {
                location_id: location_id,
                [Op.or]: [
                    {
                        status: "Đang ở điểm giao dịch",
                    },
                    {
                        status: "Đã bàn giao cho đơn vị vận chuyển",
                    },
                ],
            },
            order: [["createdAt", "DESC"]],
        });

        // lọc ra các package_status mới nhất của đơn hàng thuộc location
        let mapByPackageId = new Map();
        packageStatuses.forEach((status) => {
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

        //Lấy trạng thái trước khi chuyển đến điểm giao dịch
        const packagePromises = Array.from(mapByPackageId.values()).map(
            async (package) => {
                const previousStatuses = await PackagesStatus.findAll({
                    where: {
                        package_id: package.package_id,
                        [Op.or]: [
                            {
                                status: "Đang ở điểm tập kết",
                            },
                            {
                                status: "Đã bàn giao cho đơn vị vận chuyển",
                            },
                        ],
                    },
                    order: [["createdAt", "DESC"]],
                });

                for (let previousStatus of previousStatuses) {
                    if (package.createdAt > previousStatus.createdAt) {
                        if (previousStatus.status === "Đang ở điểm tập kết") {
                            const aggregation = await Aggregations.findOne({
                                where: {
                                    location_id: previousStatus.location_id,
                                },
                            });
                            return {
                                package_id: package.package_id,
                                time_import: formatDate(package.createdAt),
                                from: `Điểm tập kết: ${aggregation.province}`,
                            };
                        }
                        break;
                    }
                    if (
                        package.status === "Đã bàn giao cho đơn vị vận chuyển"
                    ) {
                        return {
                            package_id: package.package_id,
                            time_import: formatDate(package.createdAt),
                            from: "Khách hàng gửi",
                        };
                    }
                }
            }
        );
        const result = await Promise.all(packagePromises);
        res.status(200).json(result);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.getAllAggregationImportPackage = async (req, res, next) => {
    const location_id = req.query.location_id;

    try {
        const packageStatus = await PackagesStatus.findAll({
            where: {
                location_id: location_id,
                [Op.or]: [
                    {
                        status: "Đang ở điểm tập kết",
                    },
                ],
            },
            order: [["createdAt", "DESC"]],
        });

        // lọc ra các package_status mới nhất của đơn hàng thuộc location
        let mapByPackageId = new Map();
        packageStatus.forEach((status) => {
            const currentSatus = mapByPackageId.get(
                status.dataValues.package_id
            );

            if (
                (!currentSatus ||
                    currentSatus.createdAt < status.dataValues.createdAt) &&
                status.dataValues.status === "Đang ở điểm tập kết"
            ) {
                // Cập nhật mapByPackageId với createdAt đã được chuyển đổi
                mapByPackageId.set(
                    status.dataValues.package_id,
                    status.dataValues
                );
            }
        });

        //Lấy trạng thái trước khi chuyển đến điểm tập kết
        const packagePromises = Array.from(mapByPackageId.values()).map(
            async (package) => {
                const previousStatuses = await PackagesStatus.findAll({
                    where: {
                        package_id: package.package_id,
                        [Op.or]: [
                            {
                                status: "Đang ở điểm giao dịch",
                            },
                            {
                                status: "Đang ở điểm tập kết",
                            },
                            {
                                status: "Đã bàn giao cho đơn vị vận chuyển",
                            },
                        ],
                    },
                    order: [["createdAt", "DESC"]],
                });

                for (let previousStatus of previousStatuses) {
                    if (package.createdAt > previousStatus.createdAt) {
                        if (
                            previousStatus.status === "Đang ở điểm giao dịch" ||
                            previousStatus.status ===
                                "Đã bàn giao cho đơn vị vận chuyển"
                        ) {
                            const transaction = await Transactions.findOne({
                                where: {
                                    location_id: previousStatus.location_id,
                                },
                            });
                            return {
                                package_id: package.package_id,
                                time_import: formatDate(package.createdAt),
                                from: `Điểm giao dịch: ${transaction.district}, ${transaction.province}`,
                            };
                        } else if (
                            previousStatus.status === "Đang ở điểm tập kết"
                        ) {
                            const aggregation = await Aggregations.findOne({
                                where: {
                                    location_id: previousStatus.location_id,
                                },
                            });
                            return {
                                package_id: package.package_id,
                                time_import: formatDate(package.createdAt),
                                from: `Điểm tập kết: ${aggregation.province}`,
                            };
                        }
                        break;
                    }
                }
            }
        );

        const result = await Promise.all(packagePromises);
        res.status(200).json(result);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.getAllAggregationExportPackage = async (req, res, next) => {
    const location_id = req.query.location_id;

    try {
        const packageStatus = await PackagesStatus.findAll({
            where: {
                location_id: location_id,
                [Op.or]: [
                    {
                        status: "Đang ở điểm tập kết",
                    },
                ],
            },
            order: [["createdAt", "DESC"]],
        });

        // lọc ra các package_status mới nhất của đơn hàng thuộc location
        let mapByPackageId = new Map();
        packageStatus.forEach((status) => {
            const currentSatus = mapByPackageId.get(
                status.dataValues.package_id
            );

            if (
                (!currentSatus ||
                    currentSatus.createdAt < status.dataValues.createdAt) &&
                status.dataValues.status === "Đang ở điểm tập kết"
            ) {
                mapByPackageId.set(
                    status.dataValues.package_id,
                    status.dataValues
                );
            }
        });

        //Lấy trạng thái sau khi xuất kho
        const packagePromises = Array.from(mapByPackageId.values()).map(
            async (package) => {
                const nextStatuses = await PackagesStatus.findAll({
                    where: {
                        package_id: package.package_id,
                        [Op.or]: [
                            {
                                status: "Đang trung chuyển đến điểm giao dịch",
                            },
                            {
                                status: "Đang trung chuyển đến điểm tập kết",
                            },
                        ],
                    },
                    order: [["createdAt", "ASC"]],
                });

                for (let nextStatus of nextStatuses) {
                    if (package.createdAt < nextStatus.createdAt) {
                        if (
                            nextStatus.status ===
                            "Đang trung chuyển đến điểm giao dịch"
                        ) {
                            const transaction = await Transactions.findOne({
                                where: {
                                    location_id: nextStatus.location_id,
                                },
                            });
                            return {
                                package_id: package.package_id,
                                time_export: formatDate(nextStatus.createdAt),
                                next_destination: `Điểm giao dịch: ${transaction.district}, ${transaction.province}`,
                            };
                        } else if (
                            nextStatus.status ===
                            "Đang trung chuyển đến điểm tập kết"
                        ) {
                            const aggregation = await Aggregations.findOne({
                                where: {
                                    location_id: nextStatus.location_id,
                                },
                            });
                            return {
                                package_id: package.package_id,
                                time_export: formatDate(nextStatus.createdAt),
                                next_destination: `Điểm tập kết: ${aggregation.province}`,
                            };
                        }
                    }
                }
            }
        );
        const result = await Promise.all(packagePromises);
        res.status(200).json(result);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
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
    switch (status) {
        case "Chuyển đến điểm tập kết":
            package_status = "Đang trung chuyển đến điểm tập kết";
            break;
        case "Giao hàng":
            package_status = "Đang giao hàng";
            break;
        case "Chuyển đến điểm giao dịch":
            package_status = "Đang trung chuyển đến điểm giao dịch";
            break;
        default:
            break;
    }

    try {
        const new_package_status = new PackagesStatus({
            package_id: package_id,
            status: package_status || status,
            fail_reason: fail_reason,
            time_delivery: time_delivery,
            shipper_id: shipper_id,
            location_id: location_id,
        });
        const result = await new_package_status.save();

        res.status(201).json({ ...result.dataValues });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.getPackageProcess = async (req, res, next) => {
    const package_id = req.params.package_id;

    try {
        const statuses = await PackagesStatus.findAll({
            where: { package_id: package_id },
            order: [["createdAt", "ASC"]],
        });

        if (statuses.length === 0) {
            const error = new Error("Không tìm thấy đơn hàng!");
            error.statusCode = 404;
            next(error);
            return
        }

        let process = [];

        for (let status of statuses) {
            let value = status.status;
            if (
                status.status !== "Đang giao hàng" &&
                status.status !== "Giao thất bại" &&
                status.status !== "Giao thành công"
            ) {
                const location = await Locations.findOne({
                    where: { id: status.location_id },
                });
                if (location.type === "Transaction") {
                    const transaction = await Transactions.findOne({
                        where: { location_id: status.location_id },
                    });
                    value +=
                        " " +
                        transaction.district +
                        ", " +
                        transaction.province;
                } else if (location.type === "Aggregation") {
                    const aggregation = await Aggregations.findOne({
                        where: { location_id: status.location_id },
                    });
                    value += " " + aggregation.province;
                }
            }
            process.push({
                time: formatDate(status.createdAt),
                status: value,
            });
        }

        res.status(200).json({
            package_id: package_id,
            createdAt: formatDate(statuses[0].createdAt),
            status: statuses[statuses.length - 1].status,
            process: process,
        });
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
