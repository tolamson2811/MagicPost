const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const bcrypt = require("bcryptjs");

//routes
const authRoutes = require("./routes/auth");
const managerRoutes = require("./routes/manager");
const transactionRoutes = require("./routes/transaction");
const aggregationRoutes = require("./routes/aggregation");
const packageRoutes = require("./routes/package");
//models
const Accounts = require("./models/users/accounts");
const Customers = require("./models/users/customers");
const Employees = require("./models/users/employees");
const Locations = require("./models/locations/locations");
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
app.use("/manager", managerRoutes);
app.use("/transaction", transactionRoutes);
app.use("/aggregation", aggregationRoutes);
app.use("/package", packageRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});

Accounts.hasOne(Customers, { foreignKey: "account_id", sourceKey: "id" });
Accounts.hasOne(Employees, { foreignKey: "account_id", sourceKey: "id" });
Accounts.hasOne(Aggregations, {
    foreignKey: "leader_id",
    sourceKey: "id",
});
Accounts.hasOne(Transactions, {
    foreignKey: "leader_id",
    sourceKey: "id",
});

Customers.belongsTo(Accounts, {
    foreignKey: "account_id",
    targetKey: "id",
    onDelete: "CASCADE",
});
Customers.hasMany(Packages, { foreignKey: "sender_id", sourceKey: "id" });

Employees.belongsTo(Accounts, {
    foreignKey: "account_id",
    targetKey: "id",
    onDelete: "CASCADE",
});
Employees.belongsTo(Locations, {
    foreignKey: "location_id",
    targetKey: "id",
    onDelete: "CASCADE",
});

Locations.hasMany(Employees, { foreignKey: "location_id", sourceKey: "id" });
Locations.hasOne(Aggregations, {
    foreignKey: "location_id",
    sourceKey: "id",
    onDelete: "CASCADE",
});
Locations.hasOne(Transactions, {
    foreignKey: "location_id",
    sourceKey: "id",
    onDelete: "CASCADE",
});

Aggregations.belongsTo(Locations, {
    foreignKey: "location_id",
    targetKey: "id",
    onDelete: "CASCADE",
});
Aggregations.belongsTo(Accounts, {
    foreignKey: "leader_id",
    targetKey: "id",
    onDelete: "CASCADE",
});

Transactions.belongsTo(Locations, {
    foreignKey: "location_id",
    targetKey: "id",
    onDelete: "CASCADE",
});
Transactions.belongsTo(Accounts, {
    foreignKey: "leader_id",
    targetKey: "id",
    onDelete: "CASCADE",
});

Packages.hasOne(PackagesDetail, {
    foreignKey: "package_id",
    sourceKey: "id",
    onDelete: "CASCADE",
});
Packages.belongsTo(Customers, {
    foreignKey: "sender_id",
    targetKey: "id",
    onDelete: "CASCADE",
});
PackagesDetail.belongsTo(Packages, {
    foreignKey: "package_id",
    targetKey: "id",
    onDelete: "CASCADE",
});
Packages.hasMany(PackageStatus, {
    foreignKey: "package_id",
    sourceKey: "id",
    onDelete: "CASCADE",
});
PackageStatus.belongsTo(Packages, {
    foreignKey: "package_id",
    targetKey: "id",
});

sequelize
    .sync()
    .then(async (result) => {
        // Kiểm tra xem đã có tài khoản manager nào chưa
        const managerExists = await Accounts.findOne({
            where: { role: "Manager" },
        });

        // Nếu chưa có, tạo một tài khoản manager
        if (!managerExists) {
            const password = process.env.MANAGER_PASSWORD;
            const hashedPw = await bcrypt.hash(password, 12);
            await Accounts.create({
                email: "manager@gmail.com",
                password: hashedPw,
                role: "Manager",
            });
        }

        app.listen(8080);
    })
    .catch((err) => {
        console.log(err);
    });
