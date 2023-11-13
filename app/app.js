const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");

//routes
const authRoutes = require("./routes/auth");

//models
const Accounts = require("./models/users/accounts");
const Customers = require("./models/users/customers");
const Aggregations = require("./models/locations/aggregations");
const Transactions = require("./models/locations/transactions");
const Packages = require("./models/packages/packages");
const PackagesDetail = require("./models/packages/packagesDetail");
const PackageStatus = require("./models/packages/packageStatus");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    // const data = error.data;
    // res.status(status).json({ message: message, data: data });
    res.status(status).json({ message: message });
});

Accounts.hasMany(Customers, { foreignKey: "account_id", sourceKey: "id" });
Customers.belongsTo(Accounts, { foreignKey: "account_id", targetKey: "id" });

Aggregations.hasMany(Transactions, {
    foreignKey: "aggregation_id",
    sourceKey: "id",
});
Transactions.belongsTo(Aggregations, {
    foreignKey: "aggregation_id",
    targetKey: "id",
});

Packages.hasMany(PackagesDetail, { foreignKey: "package_id", sourceKey: "id" });
Packages.belongsTo(Customers, { foreignKey: "sender_id", targetKey: "id" });
PackagesDetail.belongsTo(Packages, {
    foreignKey: "package_id",
    targetKey: "id",
});
Packages.hasMany(PackageStatus, { foreignKey: "package_id", sourceKey: "id" });
PackageStatus.belongsTo(Packages, {
    foreignKey: "package_id",
    targetKey: "id",
});

sequelize
    .sync()
    .then((result) => {
        console.log(result);
        app.listen(8080);
    })
    .catch((err) => {
        console.log(err);
    });
