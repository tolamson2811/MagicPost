const Transactions = require("../../models/locations/transactions");

exports.getLocationIdOfTransactionByName = async (req, res, next) => {
    const province = req.query.province;
    const district = req.query.district;

    try {
        const transaction = await Transactions.findOne({
            where: { province: province, district: district },
        });

        if (!transaction) {
            const error = new Error("Không tìm thấy điểm giao dịch này!");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json(transaction.location_id);
    } catch (err) {
        next(err);
    }
};
