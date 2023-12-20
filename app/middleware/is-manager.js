const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error = new Error("Không có quyền thực hiện hành động này!");
        error.statusCode = 401;
        next(error)
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, jwtSecret);
    } catch (error) {
        error.statusCode = 500;
        next(error)
    }
    if (!decodedToken || decodedToken.role !== "Manager") {
        const error = new Error("Không có quyền thực hiện hành động này!");
        error.statusCode = 401;
        next(error)
    }
    req.userId = decodedToken.account_id;
    next();
};
