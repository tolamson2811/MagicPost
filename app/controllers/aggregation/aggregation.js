const Aggregations = require("../../models/locations/aggregations");

exports.getLocationIdOfAggregationByName = async (req, res, next) => {
    const name = req.query.name;

    try {
        const aggregation = await Aggregations.findOne({
            where: { province: name },
        });

        if (!aggregation) {
            const error = new Error("Không tìm thấy điểm tập kết này!");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json(aggregation.location_id);
    } catch (err) {
        next(err);
    }
};
